import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UserService) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'test title',
        content: 'test content',
      },
      {
        user: user,
        title: 'test title 2',
        content: 'test content 2',
      },
    ];
  }
}
