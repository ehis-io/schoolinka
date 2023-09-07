import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: CreateUserDto) {
    const payload = this.create(user);
    return await this.save(payload);
  }

  async findUserByEmail(email: string) {
    const user = await this.createQueryBuilder('user')
      .where('user.email =:email', { email: email })
      .getOne();

    if (user) return user;
    return null;
  }
}
