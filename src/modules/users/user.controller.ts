import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

//   @Post('/validate/:id')
//   async createUser(@Body() body: any, @Param() params) {
//     const user = { email: body.email, _id: params.id };
//     const data = await this.usersService.login(user);
//     return data;
//   }
}
