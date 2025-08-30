import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from '@clerk/backend';
import { PrismaService } from '../prisma/prisma.service';
import type { ClerkUser } from './types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

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

      // Find or create user in database
      const dbUser = await this.findOrCreateUser(
        payload as unknown as ClerkUser,
      );
      console.log('👤 Auth Guard - Database user:', dbUser);

      // Attach both Clerk user data and database user to the request
      request['user'] = payload;
      request['dbUser'] = dbUser;
      return true;
    } catch (error) {
      console.log('❌ Auth Guard - Token verification failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async findOrCreateUser(clerkUser: ClerkUser) {
    // First, try to find the user by clerkId
    const existingUser = await this.prisma.user.findUnique({
      where: { clerkId: clerkUser.sub },
    });

    if (existingUser) {
      console.log('👤 Auth Guard - User found in database:', existingUser);
      return existingUser;
    }

    // If user doesn't exist, create a new one
    const newUser = await this.prisma.user.create({
      data: {
        clerkId: clerkUser.sub,
        username: clerkUser.email || `user_${clerkUser.sub.slice(-8)}`,
      },
    });

    console.log('👤 Auth Guard - User created in database:', newUser);
    return newUser;
  }
}
