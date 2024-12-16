import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth)
    return [
      {
        firstName: 'John',
        email: 'john@test.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@test.com',
      },
    ];
  }

  public findOneById(id: string) {
    return {
      firstName: 'Alice',
      email: 'alice@test.com',
    };
  }
}
