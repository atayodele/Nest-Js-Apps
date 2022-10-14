import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice : AuthService){}

    @Post('signup')
    async signUp(@Body() dto: AuthDto){
        console.log({dto}); 
        return await this.authservice.signUp(dto);
    }

    @Post('signin')
    async signin(@Body() dto: AuthDto){
        return await this.authservice.signIn(dto);
    }
}
