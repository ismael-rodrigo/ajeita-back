import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common/decorators";
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login( @Req() req: any ){
        return this.authService.login(req.user.id)
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Get('refresh')
    async refresh( @Req() req: any ){
        return this.authService.generateTokens({ sub : req.user.id })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('verify')
    async verify(){
        return { status : 'ok' }
    }

}