import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInBodyDto, SingUpBodyDto } from './dtos/singInBodyDto';

@Controller('api/auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    signUp(@Body() body : SingUpBodyDto){
        return this.authService.signUp(body);
    }

    @Post('/login')
    signIn(@Body() body : SingInBodyDto){
        return this.authService.singIn(body);
    }



}
