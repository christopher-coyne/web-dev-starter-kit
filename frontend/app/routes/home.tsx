import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { getAuth } from "@clerk/react-router/ssr.server";
import { createSsrApiClient } from "../lib/api";

export async function loader(args: Route.LoaderArgs) {
  const { userId, getToken } = await getAuth(args);

  console.log(userId);

  let user = null;

  if (userId && getToken) {
    try {
      // Get the JWT token
      const token = await getToken();
      console.log("JWT Token:", token);

      // Create API client with token
      const apiClient = createSsrApiClient(args.request, async () => token);

      // Make authenticated request to your backend
      const response =
        await apiClient.profile.profileControllerGetCurrentUser();
      user = response.data;

      console.log("User data from backend:", user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
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
  console.log(userId, isSignedIn, user);

  return <Welcome />;
}
