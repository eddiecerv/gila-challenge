"use server";

const API_URL = process.env.API_URL + "/auth";

export async function signIn(credentials: { email: string; password: string }) {
  return await fetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log("Error:", e);
      return e;
    });
}
