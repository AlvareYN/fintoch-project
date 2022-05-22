import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from 'src/auth/auth.entity';
import { UserController } from './user.controller';
import { UserData } from './user.entity';
import { UserService } from './user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserData,UserAuth]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
