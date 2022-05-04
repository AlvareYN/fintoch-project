import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailChangeDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}