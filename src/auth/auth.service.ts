import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  // named signUp (not createUser): services handle BUSINESS logic
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    // .findOne() method comes from the base class Repository<T>
    const user = await this.usersRepository.findOne({ username });
    // user.password is the hashed password in db
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    }
    throw new UnauthorizedException('Please check your login credentials'); // 401 unauthorized
  }
}
