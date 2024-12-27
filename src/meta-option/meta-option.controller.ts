import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dtos/create-post-meta-options.dto';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';

@Controller('meta-option')
export class MetaOptionController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}
  @Post()
  public create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
