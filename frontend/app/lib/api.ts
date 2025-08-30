import { Api } from "../types/api/Api";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Unified API client factory that works for both SSR and client-side
export function createApiClient(
  request?: Request,
  getToken?: () => Promise<string | null>
) {
  if (typeof window !== "undefined") {
    // Client-side: use authenticated client
    return new Api({
      baseUrl: apiUrl,
      baseApiParams: {
        // No credentials needed - using JWT tokens only
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

  // Server-side: handle both cookies and tokens

  return new Api({
    baseUrl: apiUrl,
    baseApiParams: {
      // No credentials needed - using JWT tokens only
      headers: {},
      secure: !!getToken, // Enable security worker when token is available
    },
    securityWorker: async () => {
      console.log("🔐 API Client - Security worker called");
      if (!getToken) {
        console.log("🔐 API Client - No getToken function provided");
        return {};
      }

      const token = await getToken();

      if (!token) {
        console.log("🔐 API Client - No token returned");
        return {};
      }

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
  });
}

// Default client for basic usage (without authentication)
export const api = createApiClient();
