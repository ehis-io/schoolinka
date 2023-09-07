import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserWithGoogle } from './dto/create-user-with-google.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { randomNumber } from 'src/utilities/utils';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository, // private jwtService: JwtService, //
  ) {}

  async createUser(createUser: CreateUserDto) {
    return await this.userRepository.createUser(createUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async deleteUser(id: string) {
    const deleteUser = {
      firstName: 'Deleted',
      lastName: 'Account',
      email: `${randomNumber()}@gmail.com`,
      phone: '',
      profilePics: '',
    };
    await this.userRepository.update(id, deleteUser);
    await this.userRepository.softDelete(id);
    return {
      statusCode: HttpStatus.OK,
      status: true,
      message: 'user deleted successfully',
    };
  }
}
