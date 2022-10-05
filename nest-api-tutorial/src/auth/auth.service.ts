import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signUp(){
        return { mesage: "Register Nav" }
    }

    signIn(){
        return { mesage: "Login Nav" }
    }
}
