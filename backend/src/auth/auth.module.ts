import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
