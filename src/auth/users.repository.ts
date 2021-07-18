import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

// create repository for Users table
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // "this" is the instance of UsersRepository
    const user = this.create({ username, password });
    // save to db
    try {
      await this.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code == 23505) {
        // duplicate username
        throw new ConflictException('Username already exists'); // 409 conflict
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
