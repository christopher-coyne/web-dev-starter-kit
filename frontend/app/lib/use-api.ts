import { useAuth } from "@clerk/react-router";
import { useMemo } from "react";
import { createApiClient } from "./api";

/**
 * Hook that provides an authenticated API client using Clerk tokens.
 * The client automatically includes the Bearer token in all requests.
 */
export function useApi() {
  const { getToken } = useAuth();

  const apiClient = useMemo(() => {
    return createApiClient(async () => {
      try {
        return await getToken();
      } catch (error) {
        console.warn("Failed to get Clerk token:", error);
        return null;
      }
    });
  }, [getToken]);

  return apiClient;
}

/**
 * Hook that provides a function to make authenticated fetch requests.
 * This is a lower-level alternative to useApi() for custom fetch calls.
 */
export function useAuthenticatedFetch() {
  const { getToken } = useAuth();

  const authenticatedFetch = useMemo(() => {
    return async (url: string, options: RequestInit = {}) => {
      try {
        const token = await getToken();
        const headers = {
          ...options.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        return fetch(url, { ...options, headers });
      } catch (error) {
        console.warn("Failed to get Clerk token for fetch:", error);
        return fetch(url, options);
      }
    };
  }, [getToken]);

  return authenticatedFetch;
}
