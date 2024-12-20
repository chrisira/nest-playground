import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { MetaOptionController } from './meta-option/meta-option.controller';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [User,Post],
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'secret',
        host: 'localhost',
        database: 'db_nest_playground',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController, MetaOptionController],
  providers: [AppService],
})
export class AppModule {}
