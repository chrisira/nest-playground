import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsService } from './providers/meta-options.service';

@Module({

    imports: [TypeOrmModule.forFeature([MetaOption])],

    providers: [MetaOptionsService],
})
export class MetaOptionsModule {}
