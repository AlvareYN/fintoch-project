import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from 'src/dtos/UserDTO.DTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post()
    async saveUser(@Body() user: UserDTO, @Res() res: Response) {
        const userId = await this.userService.saveUser(user);
        res.status(201).json({ userId });
    }

    @Get("/:userId")
    async getUser(@Param("userId") userId: string, @Res() res: Response) {
        const user = await this.userService.getUser(userId); 
        res.status(200).send(user);
    }

    
}
