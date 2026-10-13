import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "panel_session";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecretKey(): Uint8Array {
  const secret = process.env.PANEL_JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("PANEL_JWT_SECRET is missing or too short (min 32 chars)");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ panel: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

export async function isSessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.panel === true;
  } catch {
    return false;
  }
}

export async function requireSession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token || !(await isSessionToken(token))) {
    throw new Error("unauthorized");
  }
}
