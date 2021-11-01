import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcyrpt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUser(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByUsername(userName: string) {
    const user = await this.usersRepository.findOne({ userName });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const password = await bcyrpt.hash(createUserDto.password, 12);
    const user = this.usersRepository.create({ ...createUserDto, password });

    return this.usersRepository.save(user);
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findUser(id);
    const updatedUser = Object.assign(user, attrs);

    return this.usersRepository.save(updatedUser);
  }

  async removeUser(id: number) {
    const user = await this.findUser(id);

    this.usersRepository.remove(user);
  }
}
