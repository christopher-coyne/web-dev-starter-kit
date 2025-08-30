import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

interface RequestWithDbUser extends Request {
  dbUser?: User;
}

export const DbUser = createParamDecorator(
  (
    data: keyof User | undefined,
    ctx: ExecutionContext,
  ): User | User[keyof User] | undefined => {
    const request = ctx.switchToHttp().getRequest<RequestWithDbUser>();
    const dbUser = request.dbUser;

    return data ? dbUser?.[data] : dbUser;
  },
);
