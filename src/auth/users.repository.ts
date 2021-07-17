import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

// create repository for Users table
@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
