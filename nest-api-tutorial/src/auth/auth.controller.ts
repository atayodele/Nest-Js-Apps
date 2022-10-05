import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservice : AuthService){}

    @Post('signup')
    signUp(){
        return this.authservice.signUp();
    }

    @Post('signin')
    signin(){
        return this.authservice.signIn();
    }
}
