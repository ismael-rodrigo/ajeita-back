import { Body, Controller, ForbiddenException, Get, Param, Post, UseFilters } from '@nestjs/common';
import { get } from 'http';
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
  @Get(':id')
  async getUser(@Param('id') id: string){
    return await this.userService.getById(id)
  }

}
