import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/user.service';
import { SingInBodyDto, SingUpBodyDto } from './dtos/singInBodyDto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(body: SingUpBodyDto) {
    // const {name, email, password, name} = body;
    return await this.userService.create(body);
  }

  async singIn(body: SingInBodyDto) {
    // const user = { email: body.email, _id: body.id };
    const userData = await this.userService.validateUser(
      body.email,
      body.password,
    );
    if (userData) {
      const data = this.userService.login({
        email: userData.email,
        _id: userData._id,
      });
      return data;
    }
    else{
     throw new HttpException('User not found',400);
    }
  }
}
