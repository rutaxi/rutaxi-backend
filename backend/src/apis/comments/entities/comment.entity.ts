import { Field, ObjectType } from "@nestjs/graphql";
import { TaxiParty } from "src/apis/taxiParties/entities/taxiParty.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => Date)
    sendTime: Date;
    
    @Column()
    @Field(() => String)
    content: string;

    @ManyToOne(() => User)
    @Field(() => User)
    writer: User;

    @ManyToOne(() => TaxiParty)
    @Field(() => TaxiParty)
    taxiParty: TaxiParty;   
}