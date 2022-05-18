import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches, MaxLength } from "class-validator";

export interface UserSchema {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    birthDate: Date;
    phone: string;
    country: string;
    city: string;
}

export class UserDTO {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    @MaxLength(50)
    password: string;
    @IsNotEmpty()
    address: string;
    birthDate: Date;
    @IsNotEmpty()
    @IsPhoneNumber('CL')
    phone: string;
    @IsNotEmpty()
    country: string;
    @IsNotEmpty()
    city: string;
}

