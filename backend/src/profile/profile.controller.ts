import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/user.decorator';
import type { ClerkUser } from '../auth/types';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('first-user')
  async getFirstUser() {
    return this.profileService.getFirstUser();
  }

  @Get('me')
  getCurrentUser(@User() user: ClerkUser) {
    return {
      message: 'Authenticated user profile',
      user: {
        id: user.sub,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }
}
