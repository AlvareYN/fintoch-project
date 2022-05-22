import { UserAuth } from 'src/auth/auth.entity';
import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';

@Entity()
export class UserData {
    @PrimaryColumn("text")
    id: string;
    @Column("text")
    firstName: string;
    @Column("text")
    lastName: string;
    @Column("text", {
        unique: true
    })
    email: string;
    @Column("text")
    address: string;
    @Column("date")
    birthDate: Date;
    @Column("text")
    @Column("text", {
        unique: true
    })
    phone: string;
    @Column("text")
    country: string;
    @Column("text")
    city: string;
    @OneToOne(() => UserAuth)
    userAuth: UserAuth;
}


