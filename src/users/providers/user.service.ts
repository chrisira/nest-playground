import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UserService {
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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

  public findOneById(id: number) {
    return {
      firstName: 'Alice',
      email: 'alice@test.com',
    };
  }
}
