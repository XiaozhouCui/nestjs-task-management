import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// create a custom decorator to get user from request
export const GetUser = createParamDecorator(
  // _data is for unused parameter
  (_data, ctx: ExecutionContext): User => {
    // get req body whenever req comes in
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
