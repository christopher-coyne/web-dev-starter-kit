import { Rocket, User } from "lucide-react";

interface WelcomeProps {
  user?: any;
  isSignedIn: boolean;
}

export function Welcome({ user, isSignedIn }: WelcomeProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <Rocket className="w-16 h-16 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Web Dev Starter Kit
        </h1>

        {/* User Profile Section */}
        {isSignedIn && user && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                User Profile
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Username:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {user.username}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Role:
                </span>
                <p className="text-gray-600 dark:text-gray-400 capitalize">
                  {user.role?.toLowerCase()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Clerk ID:
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                  {user.clerkId}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Created:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tech Stack Summary */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="text-left">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Frontend
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• React Router</li>
                <li>• Shadcn UI</li>
                <li>• Tailwind CSS</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Backend
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• NestJS</li>
                <li>• Clerk Auth</li>
                <li>• PostgreSQL</li>
                <li>• Prisma ORM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
