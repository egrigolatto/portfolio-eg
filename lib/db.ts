import { neon } from "@neondatabase/serverless";

type NeonSql = ReturnType<typeof neon>;

let client: NeonSql | undefined;

export function getDb(): NeonSql {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  client ??= neon(url);
  return client;
}
