import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TaxiLocation {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column({type: 'decimal', precision: 9, scale: 6})
    @Field(() => Float)
    lat: number;

    @Column({type: 'decimal', precision: 9, scale: 6})
    @Field(() => Float)
    lng: number;
}