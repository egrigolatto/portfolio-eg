"use server";

import { getDb } from "@/lib/db";
import { isHoneypotFilled, validateMessage } from "@/lib/messages";

import type { MessageFormState } from "@/lib/messages";

export async function submitMessage(
  _previous: MessageFormState,
  formData: FormData,
): Promise<MessageFormState> {
  if (isHoneypotFilled(formData)) {
    return { ok: true };
  }

  const { email, errors, message, name } = validateMessage(formData);
  const values = { email, message, name };

  if (errors) {
    return { errors, ok: false, values };
  }

  try {
    const db = getDb();
    await db`insert into messages (name, email, message) values (${name}, ${email}, ${message})`;
    return { ok: true };
  } catch (error) {
    console.error("contact message insert failed", error);
    return { errors: { form: true }, ok: false, values };
  }
}
