// src/api/api.ts
export const BASE_URL = "http://10.148.228.78:3000"; // <-- change this

type Json = any;

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getPosts: () => request("/posts"),
  // add more endpoints (createPost, reply...) below as needed
};