import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number,
    @Query('page',new DefaultValuePipe(1),ParseIntPipe) page: Number,
  ) {
    console.log(limit);
    console.log(page);
    console.log(id);
    return 'You sent a get request to users endpoint';
  }
  @Post()
  public createUsers(@Body() request: any) {
    console.log(request);
    return 'You sent a post request to users endpoint';
  }
}
