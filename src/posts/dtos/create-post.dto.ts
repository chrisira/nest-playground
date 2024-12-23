import {
  IsArray,
  IsEnum,
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
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)&$/, {
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
    description: 'array of taggs passed as string values',
    example: '[nestjs,typescript]',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: [];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'They key can be a string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: 'true',
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
