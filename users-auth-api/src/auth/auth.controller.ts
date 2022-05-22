import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { AuthDto, AuthUserDTO } from 'src/dtos/AuthUser.dto';
import { EmailChangeDTO } from 'src/dtos/EmailChangeDTO.dto';
import { PasswordChangeDTO } from 'src/dtos/PasswordChange.dto';
import { AuthService } from './auth.service';
@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    async login(@Body() authUserDTO: AuthDto,
        @Res() res: any,
        @Req() request: Request) {
        const ip: string = request.socket.remoteAddress || request.headers['x-forwarded-for'][0]
        const token = await this.authService.authenticate(authUserDTO);
        res.status(200).json({
            access_token: token,
        });
    }

    //system scope
    @Put("/update-password/:userId")
    async resetPassword(@Body() passwordBody: PasswordChangeDTO,
        @Param('userId') userId: string,
        @Res() res: any) {
        await this.authService.updatePassword(userId, passwordBody.password);
        res.status(200).json({ message: 'OK' });
    }

    @Put("/update-email/:userId")
    async updatePassword(@Body() emailBody: EmailChangeDTO,
        @Param('userId') userId: string,
        @Res() res: any) {
        await this.authService.updateEmail(userId, emailBody.email);
        res.status(200).json({ message: 'OK' });
    }

    @Post('/validate')
    async validate(@Req() request: Request,
        @Res() res: any) {
        const token = request.headers['x-access-token'] as string;
        if (token) {
            const result = await this.authService.validateJWT(token);
            res.status(200).json(result);
        } else {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }

    }
}

