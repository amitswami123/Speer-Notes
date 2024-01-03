import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/modules/users/schema/users.schema';

@Module({
  // imports: [UsersModule],
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  JwtModule.register({
    secret: 'jsflj8843bf843djfjfdjh34893489',
    signOptions: { expiresIn: '1h' },
  }),

],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
