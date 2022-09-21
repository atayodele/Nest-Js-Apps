import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}