import { HttpException, Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto'
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserResponseDTO } from 'src/dtos/UserDTO.DTO';
import { UserData } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthUserDTO } from 'src/dtos/AuthUser.dto';

@Injectable()
export class UserService {
    private logger: Logger = new Logger('UserService');
    constructor(
        @InjectRepository(UserData) private userRepository: Repository<UserData>
    ) { }

    async saveUser(user: UserDTO): Promise<any> {
        const userId = crypto.createHmac('sha256', process.env.SECRET_KEY).update(user.email).digest('hex');
        const userData = await this.generateUserData(user, userId);
        const result = await this.userRepository.insert(userData);
        console.log(result)
        this.logger.log(`userId ${userId} saved in the database`);
        return userId;
    }


    private async generateUserData(user: UserDTO, userId: string): Promise<UserData> {

        const userData = new UserData();

        userData.id = userId;
        userData.email = user.email;
        userData.address = user.address;
        userData.phone = user.phone;
        userData.firstName = user.firstName;
        userData.lastName = user.lastName;
        userData.birthDate = user.birthDate;
        userData.country = user.country;
        userData.city = user.city;

        userData.userAuth = await this.generateUserAuth({
            userId: userId,
            email: user.email,
            password: user.password
        });

        return userData;
    }

    private async generateUserAuth(authUserDTO: AuthUserDTO): Promise<UserAuth> {

        this.logger.log(`Hashing user ${authUserDTO.userId}`)
        const hash = await argon2.hash(authUserDTO.password);

        const authUser: UserAuth = new UserAuth();
        
        authUser.userId = authUserDTO.userId;
        authUser.hash = hash
        authUser.email = authUserDTO.email;
        authUser.lastLogin = null;
        authUser.active = true;// false to activate the account throw email
        authUser.createdAt = new Date();
        authUser.updatedAt = null;
        authUser.expiresAt = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));

        return authUser;
    }


    async getUser(key: string): Promise<UserResponseDTO> {
        const userData = await this.userRepository.findOne({ id: key });
        if (!userData) throw new HttpException(`User ${key} not found`, 404);
        return userData as UserResponseDTO;
    }


    //improve this method with event emit to remove wallet data
    async deleteUser(key: string): Promise<void> {
        const response = await this.userRepository.delete({ id: key });
    } 
}

