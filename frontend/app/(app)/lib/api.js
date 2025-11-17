// app/(app)/lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function postForm(path, formObj) {
  const body = new URLSearchParams(formObj).toString();
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function login({ username, password }) {
  // OAuth2 password form fields
  return postForm("/auth/login", {
    grant_type: "password",
    username,
    password,
    scope: "",
    client_id: "",
    client_secret: "",
  });
}

export function authFetch(path, opts = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = opts.headers || {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(`${API_BASE}${path}`, { ...opts, headers });
}
