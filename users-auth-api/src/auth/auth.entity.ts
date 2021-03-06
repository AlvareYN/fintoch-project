import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserAuth {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
    userId: string;
    @Column("text")
    hash: string;
    @Column("text", {
        unique: true
    })
    email: string;
    @Column("date", {
        nullable: true
    })
    lastLogin: Date;
    @Column("boolean")
    active: boolean;
    @Column("date", {
        nullable: true
    })
    createdAt: Date;
    @Column("date", {
        nullable: true
    })
    updatedAt: Date;
    @Column('date', {
        nullable: false
    })
    expiresAt: Date;
}