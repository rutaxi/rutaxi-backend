import { Field, ObjectType } from "@nestjs/graphql";
import { TaxiParty } from "src/apis/taxiParties/entities/taxiParty.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;
    
    @Column()
    @Field(() => String)
    userName: string;

    // $$
    @Column()
    @Field(() => String)
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => TaxiParty, (taxiPartys) => taxiPartys.users)
    @Field(() => [TaxiParty])
    taxiPartys: TaxiParty[]
}