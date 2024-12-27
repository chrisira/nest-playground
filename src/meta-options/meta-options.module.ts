import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsService } from './providers/meta-options.service';
import { MetaOptionController } from 'src/meta-option/meta-option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
  controllers: [MetaOptionController],
})
export class MetaOptionsModule {}
