import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findAll() {
    return this.usersRepo.find();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role?: UserRole,
  ) {
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({
      name,
      email,
      password: hash,
      role: role ?? UserRole.USER,
    });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
