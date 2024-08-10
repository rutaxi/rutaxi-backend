import { Field, ObjectType } from "@nestjs/graphql";
import { TaxiLocation } from "src/apis/taxiLocations/entities/taxiLocation.entity";
import { TaxiPartyTag } from "src/apis/taxiPartiesTags/entities/taxiPartyTag.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TaxiParty {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => Date)
    startTime: Date;

    @Column()
    @Field(() => Boolean)
    isNotmalTaxi: boolean;

    @JoinColumn()
    @OneToOne(() => TaxiLocation)
    @Field(() => TaxiLocation)
    startLocation: TaxiLocation;
    
    @JoinColumn()
    @OneToOne(() => TaxiLocation)
    @Field(() => TaxiLocation)
    endLocation: TaxiLocation;
    
    @JoinTable()
    @ManyToMany(() => TaxiPartyTag, (taxiPartyTags) => taxiPartyTags.taxiParties)
    @Field(() => [TaxiPartyTag])
    taxiPartyTags: TaxiPartyTag[];

    @JoinTable()
    @ManyToMany(() => User, (users) => users.taxiPartys)
    @Field(() => [User])
    users: User[];
}