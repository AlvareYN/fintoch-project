import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { AuthDto, AuthUserDTO } from 'src/dtos/AuthUser.dto';
import { Repository } from 'typeorm';
import { UserAuth } from './auth.entity';

@Injectable()
export class AuthService {
    private log = new Logger('AuthService');
    constructor(
        @InjectRepository(UserAuth)
        private usersRepository: Repository<UserAuth>,
        private jwtService: JwtService) { }

    async authenticate(authUserDTO: AuthDto): Promise<string> {
        try {
            const authUser: UserAuth = await this.usersRepository.findOne({ where: { email: authUserDTO.email } });
            if (!authUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            if (!authUser.active) throw new HttpException('User is not active', HttpStatus.UNAUTHORIZED);
            if (await argon2.verify(authUser.hash, authUserDTO.password)) {

                authUser.lastLogin = new Date();
                authUser.expiresAt = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
                this.log.log(`User ${authUser.userId} authenticated returning user metadata`);
                const saveUser = await this.usersRepository.save(authUser)
                const payload = {
                    userId: saveUser.userId,
                    sub: saveUser.email,
                }
                return this.jwtService.sign(payload);
            }
            throw new HttpException(`User with id ${authUser.userId} fails to authenticate`, HttpStatus.UNAUTHORIZED);
        } catch (error) {
            this.log.error(error);
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async updatePassword(userId: string, password: string): Promise<void> {
        try {
            const authUser: UserAuth = await this.usersRepository.findOne({ where: { userId: userId } });
            if (!authUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            authUser.hash = await argon2.hash(password);
            authUser.updatedAt = new Date();
            await this.usersRepository.save(authUser);
        } catch (error) {
            this.log.error(error);
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }

    }

    async updateEmail(userId: string, email: string): Promise<void> {
        const authUser: UserAuth = await this.usersRepository.findOne({ where: { userId } });
        authUser.email = email;
        authUser.updatedAt = new Date();
        await this.usersRepository.save(authUser);

    }

    async updateActive(userId: string, active: boolean): Promise<void> {
        const authUser: UserAuth = await this.usersRepository.findOne({ where: { userId } });
        authUser.active = active;
        authUser.updatedAt = new Date();
        await this.usersRepository.save(authUser);
    }

    async validateJWT(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            this.log.error(error);
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }

    }
}