import { IsEmail, IsHash, IsNotEmpty, IsUUID, Matches, MaxLength } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    @MaxLength(50)
    password: string;

}

export class AuthUserDTO {
    @IsNotEmpty()
    @IsHash('sha256')
    userId?: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    @MaxLength(50)
    password: string;

}