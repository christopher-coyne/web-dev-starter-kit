import type { Route } from "./+types/$";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Not Found - Web Dev Starter Kit" },
    {
      name: "description",
      content: "The page you're looking for doesn't exist",
    },
  ];
}

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved, deleted, or you might have typed the URL
            incorrectly.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors duration-200"
          >
            Go Back Home
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or use the navigation above to find what you're looking for.
          </p>
        </div>
      </div>
    </main>
  );
}
