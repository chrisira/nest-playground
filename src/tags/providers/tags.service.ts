import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}
  public async create(createdTagDto: CreateTagDto) {
    this.tagsRepository.create(createdTagDto);
    return await this.tagsRepository.save(createdTagDto);
  }

  public async findMultipleTags(tags: number[]) {
    let results = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
    return results;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { deleted: true, id };
  }
}
