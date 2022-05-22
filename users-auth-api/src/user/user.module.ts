import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserData } from './user.entity';
import { UserService } from './user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserData]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
