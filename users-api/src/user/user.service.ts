import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { UserDTO, UserSchema } from 'src/utils/types.utils';
import * as crypto from 'crypto'
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class UserService {
    private logger: Logger = new Logger('UserService');
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private httpService: HttpService
    ) { }

    async saveUser(user: UserDTO): Promise<any> {
        const { password, ...data } = user;

        const userId = crypto.createHmac('sha256', process.env.SECRET_KEY).update(user.email).digest('hex');
        this.logger.log(`generating userId: ${userId}`);
        const response = await this.redis.exists(userId);

        if (response === 1) {
            this.logger.log(`userId ${userId} Already Exist in the database`);
            throw new HttpException(`User Already Exist in the database`, 409);
        }

        const result = await this.redis.call('JSON.SET', userId, '$', JSON.stringify(data));
        this.logger.log(`userId ${userId} saved in the database`);

        if (result !== 'OK') throw new HttpException(`Error saving user in the database`, 500);

        try {
            await lastValueFrom(this.httpService.post(process.env.AUTH_API_URL + "auth/register", {
                userId: userId,
                email: user.email,
                password: password
            }).pipe(
                map(response => response)
            ));
        } catch (error) {
            await this.deleteUser(userId)
            this.logger.log(`userId ${userId} deleted from the database, because of error in auth service`);
            throw new HttpException(`Something went wrong`, 500);
        }

        return userId;
    }

    async getUser(key: string): Promise<UserSchema> {
        const result = await this.redis.call('JSON.GET', key, '$');
        return JSON.parse(result as string)[0] as UserSchema;
    }


    async deleteUser(key: string): Promise<void> {
        await this.redis.call('JSON.DEL', key, '$');
    }
}

