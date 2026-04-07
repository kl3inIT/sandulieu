import axios, { type AxiosRequestConfig } from "axios";

export type ApiClientOptions = AxiosRequestConfig;

export const apiClient = axios.create({
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "object" &&
        error.response?.data &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : error.message || "Yêu cầu thất bại.";

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  }
);

export async function getJson<TResponse>(
  url: string,
  config?: ApiClientOptions
): Promise<TResponse> {
  const response = await apiClient.get<TResponse>(url, config);
  return response.data;
}

export async function postJson<TResponse>(
  url: string,
  body?: unknown,
  config?: ApiClientOptions
): Promise<TResponse> {
  const response = await apiClient.post<TResponse>(url, body, config);
  return response.data;
}

export async function putJson<TResponse>(
  url: string,
  body?: unknown,
  config?: ApiClientOptions
): Promise<TResponse> {
  const response = await apiClient.put<TResponse>(url, body, config);
  return response.data;
}

export async function deleteJson<TResponse = void>(
  url: string,
  config?: ApiClientOptions
): Promise<TResponse> {
  const response = await apiClient.delete<TResponse>(url, config);
  return response.data;
}

export default apiClient;
