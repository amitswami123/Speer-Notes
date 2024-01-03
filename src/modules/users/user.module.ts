import { Module } from '@nestjs/common';

import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  JwtModule.register({
    secret: 'jsflj8843bf843djfjfdjh34893489',
    signOptions: { expiresIn: '1h' },
  }),

],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}


// imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],