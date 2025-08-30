import { Api } from "../types/api/Api";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create API client with Clerk token support
export function createApiClient(getToken?: () => Promise<string | null>) {
  return new Api({
    baseUrl: apiUrl,
    baseApiParams: {
      credentials: "include",
    },
    // Security worker that automatically adds the Bearer token to requests
    securityWorker: async () => {
      if (!getToken) return {};

      const token = await getToken();
      if (!token) return {};

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  });
}

// Default client for client-side usage (without authentication)
// This should be replaced with authenticated clients in components
export const api = createApiClient();

// SSR-aware API client factory
export function createSsrApiClient(
  request?: Request,
  getToken?: () => Promise<string | null>
) {
  if (typeof window !== "undefined") {
    // Client-side: use authenticated client if getToken is provided
    return createApiClient(getToken);
  }

  // Server-side: handle both cookies and tokens
  const cookie = request?.headers.get("cookie");

  return new Api({
    baseUrl: apiUrl,
    baseApiParams: {
      credentials: "include",
      headers: cookie ? { cookie } : {},
    },
    securityWorker: async () => {
      if (!getToken) return {};

      const token = await getToken();
      if (!token) return {};

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  });
}
