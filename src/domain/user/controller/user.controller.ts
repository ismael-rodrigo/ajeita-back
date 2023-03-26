import { Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { Body, Controller,  Get, Param, Post } from '@nestjs/common';
import { UserCrudService } from '../services/user-crud.service';
import { RegisterUserInputDto, UserAuthenticatedResponse, UserPublicResponse } from './dtos/user.dto';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService :UserCrudService
  ) {}

  @Post()
  async registerUser(@Body() registerUserInput:RegisterUserInputDto): Promise<UserAuthenticatedResponse> {
    const result = await this.userService.register(registerUserInput)
    return plainToClass(UserAuthenticatedResponse , result)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getUser(@Req() req: any):Promise<UserAuthenticatedResponse>{
    const user = await this.userService.getById(req.user.id)
    return plainToClass(UserAuthenticatedResponse , user)
  }

  @Get(':id')
  async getUserPublic(@Param('id') id: string):Promise<UserPublicResponse>{
    const user = await this.userService.getById(id)
    return plainToClass(UserPublicResponse , user)
  }
}
