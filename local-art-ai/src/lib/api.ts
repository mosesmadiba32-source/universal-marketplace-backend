export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; status?: number };

export async function apiFetch<T>(input: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
      return {
        success: false,
        error: typeof payload === "string" ? payload : payload?.message ?? "Request failed",
        status: response.status,
      };
    }

    return { success: true, data: payload as T };
  } catch {
    return {
      success: false,
      error: "Network error",
    };
  }
}
