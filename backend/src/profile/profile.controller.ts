import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/auth.guard';
import { DbUser } from '../auth/db-user.decorator';
import type { User as DbUserType } from '@prisma/client';
import { UserProfileDto } from './dtos/user-profile.dto';
import { StandardResponse } from 'src/dtos/standardResponse';

@ApiTags('profile')
@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Retrieve the authenticated user profile information',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserProfileDto,
  })
  async getCurrentUser(
    @DbUser() dbUser: DbUserType,
  ): Promise<StandardResponse<UserProfileDto>> {
    return StandardResponse.ok(
      await this.profileService.getUserProfile(dbUser.id),
    );
  }
}
