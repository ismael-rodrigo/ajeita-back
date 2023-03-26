import { Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { Body, Controller, ForbiddenException, Get, Param, Post, UseFilters } from '@nestjs/common';
import { UserCrudService } from '../services/user-crud.service';
import { RegisterUserInputDto, RegisterUserOutputDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService :UserCrudService
    ) {}

  @Post()
  async registerUser(@Body() registerUserInput:RegisterUserInputDto): Promise<RegisterUserOutputDto> {
    const result = await this.userService.register(registerUserInput)
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@Req() req: any){
    return await this.userService.getById(req.user.id)
  }

}
