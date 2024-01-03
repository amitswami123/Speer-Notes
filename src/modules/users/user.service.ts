import { Inject, Injectable } from '@nestjs/common';

import { Users, UsersModel } from './schema/users.schema';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { SingUpBodyDto } from 'src/modules/auth/dtos/singInBodyDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly usersModel: Model<UsersModel>,
    private jwtService: JwtService,
  ) {}

  async create(body: SingUpBodyDto): Promise<any> {
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    body.password = hashedPassword;
    const createdUser = new this.usersModel(body);
    return createdUser.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
   
    const user = await this.usersModel.findOne({email:email});
   
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<any> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.usersModel.findById(id).exec();
  }

  async update(id: string, body: any): Promise<any> {
    return this.usersModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.usersModel.findByIdAndDelete(id).exec();
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
