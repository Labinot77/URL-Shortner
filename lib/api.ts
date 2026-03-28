type RequestOptions = RequestInit & {
  data?: any;
};

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || res.statusText);
  }

  return res.json();
}

export async function apiPost<T>(url: string, data?: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || res.statusText);
  }

  return res.json();
}