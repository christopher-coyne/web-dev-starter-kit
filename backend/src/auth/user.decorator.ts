import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ClerkUser } from './types';

interface RequestWithUser extends Request {
  user?: ClerkUser;
}

export const User = createParamDecorator(
  (
    data: keyof ClerkUser | undefined,
    ctx: ExecutionContext,
  ): ClerkUser | string | undefined => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return data ? (user?.[data] as string) : user;
  },
);
