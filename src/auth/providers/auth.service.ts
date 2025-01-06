import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}
  public login(email: string, password: string, id: string) {
    //check user exists in in the database
    //const user = this.usersService.findOneById('1234');

    //login

    //return token
    return 'SAMPLE TOKEN';
  }

  public isAuth() {
    return true;
  }
}
