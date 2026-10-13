export const MESSAGE_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMin: 3,
  emailMax: 254,
  messageMin: 10,
  messageMax: 4000,
} as const;

export const HONEYPOT_FIELD = "_gotcha";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type MessageErrorKey = "email" | "form" | "message" | "name";

export type MessageFormState = {
  errors?: Partial<Record<MessageErrorKey, true>>;
  ok: boolean;
  values?: { email: string; message: string; name: string };
};

function trimmed(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function isHoneypotFilled(formData: FormData): boolean {
  return trimmed(formData, HONEYPOT_FIELD) !== "";
}

export function validateMessage(formData: FormData): {
  email: string;
  errors?: Partial<Record<MessageErrorKey, true>>;
  message: string;
  name: string;
} {
  const name = trimmed(formData, "name");
  const email = trimmed(formData, "email").toLowerCase();
  const message = trimmed(formData, "message");

  const errors: Partial<Record<MessageErrorKey, true>> = {};

  if (name.length < MESSAGE_LIMITS.nameMin || name.length > MESSAGE_LIMITS.nameMax) {
    errors.name = true;
  }

  if (
    email.length < MESSAGE_LIMITS.emailMin ||
    email.length > MESSAGE_LIMITS.emailMax ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.email = true;
  }

  if (
    message.length < MESSAGE_LIMITS.messageMin ||
    message.length > MESSAGE_LIMITS.messageMax
  ) {
    errors.message = true;
  }

  return Object.keys(errors).length > 0
    ? { email, errors, message, name }
    : { email, message, name };
}
