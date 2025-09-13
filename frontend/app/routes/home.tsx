import type { Route } from "./+types/home";
import { Welcome } from "~/components/pages/home/home";
import { getAuth } from "@clerk/react-router/ssr.server";
import { createApiClient } from "../lib/api";

export async function loader(args: Route.LoaderArgs) {
  const { userId, getToken } = await getAuth(args);

  let user = null;

  if (userId && getToken) {
    try {
      const token = await getToken();

      const apiClient = createApiClient(args.request, async () => token);
      const response = await apiClient.profile.profileControllerGetCurrentUser({
        secure: true,
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
