import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOkResponse({
  //   description: 'Create an admin user and returns a token',
  // })
  // @Post('admin')
  // createAdmin(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createAdmin(createUserDto);
  // }

  @ApiOkResponse({
    description: 'Create a player user and returns a token',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
