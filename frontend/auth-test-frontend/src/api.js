const API_BASE = "http://localhost:5005";

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET", // 🔥 FIX
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.token && {
        Authorization: `Bearer ${options.token}`,
      }),
    },
    body: options.body,
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
