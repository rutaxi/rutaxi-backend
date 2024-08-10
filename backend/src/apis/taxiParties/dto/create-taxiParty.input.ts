import { Field, InputType } from "@nestjs/graphql";
import { TaxiLocationInput } from "src/apis/taxiLocations/dto/taxi-location.input";

@InputType()
export class CreateTaxiPartyInput {
    @Field(() => String)
    name: string;

    @Field(() => Date)
    startTime: Date;

    @Field(() => Boolean)
    isNotmalTaxi: boolean;

    @Field(() => TaxiLocationInput)
    startLocation: TaxiLocationInput;
    
    @Field(() => TaxiLocationInput)
    endLocation: TaxiLocationInput;
    
    @Field(() => [String])
    taxiPartyTags: string[];

    // @Field(() => String)
    // ownerId: string;
}