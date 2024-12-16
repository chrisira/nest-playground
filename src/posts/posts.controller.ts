import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  @ApiTags('Posts')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
