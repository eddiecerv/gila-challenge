"use server";

import { parseCookies } from "./cookies";

const API_URL = process.env.API_URL + "/categories";

export async function getCategories() {
  const cookies = await parseCookies();
  const TOKEN = cookies.access_token;

  return await fetch(API_URL, {
    headers: {
      Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    },
  })
    .then((res) => res.json())
    .catch((e) => e);
}
