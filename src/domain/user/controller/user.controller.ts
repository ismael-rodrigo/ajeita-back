import { Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { Body, Controller, ForbiddenException, Get, Param, Post, UseFilters } from '@nestjs/common';
import { UserCrudService } from '../services/user-crud.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService :UserCrudService
    ) {}

  @Post()
  async registerUser(@Body() req:any) {
    return await this.userService.register(req)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@Req() req: any){
    return await this.userService.getById(req.user.id)
  }

}
