"use server";

import { cookies } from "next/headers";

export async function parseCookies() {
  const cookieStore = cookies();
  const cookieMap = cookieStore.getAll();
  const cookieObject = Object.fromEntries(
    cookieMap.map((cookie) => [cookie.name, cookie.value])
  );
  return cookieObject;
}
