import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/user.decorator';
import { DbUser } from '../auth/db-user.decorator';
import type { ClerkUser } from '../auth/types';
import type { User as DbUserType } from '@prisma/client';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  async getCurrentUser(@User() user: ClerkUser, @DbUser() dbUser: DbUserType) {
    // Fetch the complete user profile from database
    const userProfile = await this.profileService.getUserProfile(dbUser.id);

    return {
      message: 'Authenticated user profile',
      user: {
        id: user.sub,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      profile: userProfile, // Complete database user profile
    };
  }
}
