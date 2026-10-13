"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { isRateLimited, registerFailedAttempt } from "@/lib/rate-limit";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  requireSession,
} from "@/lib/session";

import { getDb } from "@/lib/db";

function verifyPassword(input: string): boolean {
  const expected = process.env.PANEL_PASSWORD;

  if (!expected) {
    throw new Error("PANEL_PASSWORD is not configured");
  }

  const provided = createHmac("sha256", expected).update(input).digest();
  const actual = createHmac("sha256", expected).update(expected).digest();

  return timingSafeEqual(provided, actual);
}

function safeFrom(value: FormDataEntryValue | null): string {
  const from = typeof value === "string" ? value : "";

  if (from.startsWith("/inbox") && !from.startsWith("//")) {
    return from;
  }

  return "/inbox";
}

async function clientKey(): Promise<string> {
  const forwarded = (await headers()).get("x-forwarded-for");

  return forwarded?.split(",")[0]?.trim() || "local";
}

export async function loginAction(formData: FormData): Promise<void> {
  const from = safeFrom(formData.get("from"));
  const key = await clientKey();

  if (isRateLimited(key)) {
    redirect("/inbox/login?error=limited");
  }

  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    registerFailedAttempt(key);
    redirect("/inbox/login?error=invalid");
  }

  const token = await createSessionToken();
  const isProduction = process.env.NODE_ENV === "production";

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/inbox",
    sameSite: "lax",
    secure: isProduction,
  });

  redirect(from);
}

export async function logoutAction(): Promise<void> {
  await requireSession();
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/inbox" });
  redirect("/inbox/login");
}

function parseId(formData: FormData): string {
  const id = String(formData.get("id") ?? "");

  if (!/^\d{1,19}$/.test(id)) {
    throw new Error("invalid message id");
  }

  return id;
}

export async function toggleReadAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = parseId(formData);
  const db = getDb();

  await db`update messages set read = not read where id = ${id}`;
  revalidatePath("/inbox");
}

export async function deleteAction(formData: FormData): Promise<void> {
  await requireSession();

  if (formData.get("confirm") !== "si") {
    return;
  }

  const id = parseId(formData);
  const db = getDb();

  await db`delete from messages where id = ${id}`;
  revalidatePath("/inbox");
}
