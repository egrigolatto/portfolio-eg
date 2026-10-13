const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

const attempts = new Map<string, { count: number; resetAt: number }>();

export function registerFailedAttempt(key: string): void {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  current.count += 1;
}

export function isRateLimited(key: string): boolean {
  const current = attempts.get(key);

  if (!current) return false;
  if (current.resetAt <= Date.now()) {
    attempts.delete(key);
    return false;
  }

  return current.count >= MAX_ATTEMPTS;
}
