import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

// @UseInterceptors(new SerializeInterceptor(UserDto))
@Serialize(UserDto)
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('auth/register')
  registerUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.findUser(parseInt(id));
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(parseInt(id));
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(parseInt(id), updateUserDto);
  }
}
