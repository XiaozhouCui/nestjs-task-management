import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

// create repository for Users table
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // hash the password
    const salt: string = await bcrypt.genSalt();
    const hasedPassword: string = await bcrypt.hash(password, salt);

    // "this" is the instance of UsersRepository
    const user = this.create({ username, password: hasedPassword });
    // save to db
    try {
      await this.save(user);
    } catch (error) {
      if (error.code == 23505) {
        // duplicate username
        throw new ConflictException('Username already exists'); // 409 conflict
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
