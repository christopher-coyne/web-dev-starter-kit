# Authentication with Clerk

This module provides authentication using Clerk JWT tokens.

## Setup

### Environment Variables

Add the following environment variables to your `.env` file:

```env
# Clerk Authentication
CLERK_JWT_KEY="your_clerk_jwt_key_here"
CLERK_ISSUER_URL="https://your-instance.clerk.accounts.dev"
```

### Getting Clerk Credentials

1. Go to your Clerk Dashboard
2. Navigate to JWT Templates
3. Copy your JWT Key
4. Copy your Issuer URL (found in the API Keys section)

## Usage

### Protecting Routes

Use the `@UseGuards(AuthGuard)` decorator on controllers or individual routes:

```typescript
@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  // All routes in this controller require authentication
}
```

### Accessing User Information

Use the `@User()` decorator to access the authenticated user:

```typescript
@Get('me')
getCurrentUser(@User() user: ClerkUser) {
  return {
    id: user.sub,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
  };
}
```

### Frontend Integration

From your React frontend, include the Clerk token in the Authorization header:

```typescript
const token = await auth.getToken();
const response = await fetch('/api/profile/me', {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## How It Works

1. **AuthGuard**: Intercepts requests and verifies the JWT token from the Authorization header
2. **Token Verification**: Uses Clerk's `verifyToken` function to validate the JWT
3. **User Data**: Attaches the decoded user information to the request object
4. **Access Control**: Only allows requests with valid tokens to proceed
