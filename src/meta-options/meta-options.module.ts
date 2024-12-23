import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';

@Module({

    imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionsModule {}
