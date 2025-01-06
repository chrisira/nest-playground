import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,
    /**
     * Inject posts repository
     */

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Inject metaOptions repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });
    return posts;
  }

  /***
   * creating new posts
   */

  public async create(@Body() createPostDto: CreatePostDto) {
    // create post

    let post = this.postsRepository.create(createPostDto);

    // return the created post
    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    // find the post by id
    let post = await this.postsRepository.findOneBy({ id });

    // deleting the post
    await this.postsRepository.delete(id);

    // delete meta options

    await this.metaOptionsRepository.delete(post.metaOptions.id);

    // confirmation

    return { deleted: true, id };
  }
}
