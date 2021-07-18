import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

// use PASSPORT to create the auth mechanism
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    // need super when access constructor of a derived class
    super({
      // use the secret from auth module
      secretOrKey: 'topSecret51',
      // grab jwt from client
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // at this point, we already know the token is valid
  // overwrite the default validate() method from base class
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    // fetch user from db
    const user: User = await this.usersRepository.findOne({ username });
    // handle error
    if (!user) {
      throw new UnauthorizedException(); // 401
    }
    // return user: passport is going to inject the user into the request object of our controller, so we always have access to the user
    return user;
  }
}
