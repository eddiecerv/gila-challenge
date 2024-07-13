"use server";

import { Notification } from "@/shared/types/notification.type";
import { parseCookies } from "./cookies";

const API_URL = process.env.API_URL + "/notifications";

export async function createNotification(data: Partial<Notification>) {
  const cookies = await parseCookies();
  const TOKEN = cookies.access_token;

  return await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => {
      return e;
    });
}
