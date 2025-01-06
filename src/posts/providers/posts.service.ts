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
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
    return posts;
  }

  /***
   * creating new posts
   */

  public async create(@Body() createPostDto: CreatePostDto) {
    // Find author from database based on authorId

   let author =  await this.usersService.findOneById(createPostDto.authorId);

    // create post

    let post = this.postsRepository.create({...createPostDto, author:author});

    // return the created post
    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    // find the post by id
    let post = await this.postsRepository.findOneBy({ id });

    // // deleting the post
    await this.postsRepository.delete(id);

    // // delete meta options

    // await this.metaOptionsRepository.delete(post.metaOptions.id);

    // let inversePost = await this.metaOptionsRepository.find({
    //   where: { id: post.metaOptions.id },
    //   relations: {
    //     post: true,
    //   },
    // });

    // console.log(inversePost);

    // confirmation

    return { deleted: true, id };
  }
}
