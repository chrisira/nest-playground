import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  maxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'this is the title for the blogpost',
    example: 'this is a title',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: 'Possible values "post","page","story","series" ',
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: "For example -  'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug  should be all small letters and uses only "-" and without spaces. For example "my-url',
  })
  slug: string;
  @ApiProperty({
    enum: postStatus,
    description: 'refer to all possible values',
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'this a content of the post',
    example: 'post content',
  })
  @IsString()
  @IsOptional()
  content?: string;
  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example: '{serialized object}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'blogpost image',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'the date on which the blog post is published ',
  })
  @IsISO8601()
  @IsOptional()
  publishOn: Date;
  @ApiPropertyOptional({
    description: 'array of tags passed as number values',
    example: '[1,2]',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'meta value is a json string',
          example: '{"sidebarEnabled":true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  authorId: number;
}
