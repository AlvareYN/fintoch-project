import { IsNotEmpty, Matches, MaxLength } from "class-validator";

export class PasswordChangeDTO {
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    @MaxLength(50)
    password: string;
}