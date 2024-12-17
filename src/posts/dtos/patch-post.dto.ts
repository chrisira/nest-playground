import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'the Id fot the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
