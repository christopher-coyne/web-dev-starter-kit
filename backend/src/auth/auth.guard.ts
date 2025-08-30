import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from '@clerk/backend';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    console.log('🔍 Auth Guard - Headers:', request.headers.authorization);
    console.log(
      '🔍 Auth Guard - Extracted token:',
      token ? 'Token present' : 'No token',
    );

    if (!token) {
      console.log('❌ Auth Guard - No token provided');
      throw new UnauthorizedException('No token provided');
    }

    try {
      console.log('🔑 Auth Guard - Verifying token with Clerk...');
      console.log(
        '🔑 CLERK_SECRET_KEY present:',
        !!process.env.CLERK_SECRET_KEY,
      );

      // Verify the JWT token using Clerk
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      console.log('✅ Auth Guard - Token verified successfully');
      console.log('👤 Auth Guard - User payload:', payload);

      // Attach the user data to the request for use in controllers
      request['user'] = payload;
      return true;
    } catch (error) {
      console.log('❌ Auth Guard - Token verification failed:');
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
