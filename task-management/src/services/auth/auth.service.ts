import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { UsersRepository } from 'src/repository/users.repository';
import { JwtPayload } from 'src/utils/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // console.log(authCredentialsDto)
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });
    // const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const access_token: string = await this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}