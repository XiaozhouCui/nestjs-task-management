import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService, // need to import JwtModule in auth module
  ) {}

  // named signUp (not createUser): services handle BUSINESS logic
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    // .findOne() method comes from the base class Repository<T>
    const user = await this.usersRepository.findOne({ username });
    // user.password is the hashed password in db
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      // signing a jwt is async?
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials'); // 401 unauthorized
  }
}
