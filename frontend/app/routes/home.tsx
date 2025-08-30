import type { Route } from "./+types/home";
import { Welcome } from "~/components/pages/home/home";
import { getAuth } from "@clerk/react-router/ssr.server";
import { createApiClient } from "../lib/api";

export async function loader(args: Route.LoaderArgs) {
  const { userId, getToken } = await getAuth(args);

  console.log(userId);

  let user = null;

  if (userId && getToken) {
    try {
      // Get the JWT token
      const token = await getToken();
      console.log(
        "🎫 Frontend - JWT Token:",
        token ? `${token.substring(0, 50)}...` : "No token"
      );

      // Create API client with token
      const apiClient = createApiClient(args.request, async () => token);

      console.log("🌐 Frontend - Making API request to /profile/me");

      // Make authenticated request to your backend
      const response = await apiClient.profile.profileControllerGetCurrentUser({
        secure: true, // Explicitly enable security worker
      });
      user = await response.json();

      console.log("✅ Frontend - User data from backend:", user);
    } catch (error) {
      console.error("❌ Frontend - Failed to fetch user data:", error);
    }
  }

  return {
    userId,
    isSignedIn: !!userId,
    user,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { userId, isSignedIn, user } = loaderData;
  console.log("userId, isSignedIn, user", userId, isSignedIn, user);

  return <Welcome user={user} isSignedIn={isSignedIn} />;
}
