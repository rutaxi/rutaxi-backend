import { Field, ObjectType } from "@nestjs/graphql";
import { TaxiParty } from "src/apis/taxiParties/entities/taxiParty.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TaxiPartyTag {
    replace(arg0: string, arg1: string): any {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @ManyToMany(() => TaxiParty, (taxiParties) => taxiParties.taxiPartyTags)
    @Field(() => [TaxiParty])
    taxiParties: TaxiParty[];
}