import { cookies } from "next/headers";

import { DEFAULT_LANG, type Lang } from "./index";

export async function getActiveLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get("lang")?.value;
  return value === "en" ? "en" : DEFAULT_LANG;
}
