import { InputType, OmitType } from "@nestjs/graphql";
import { TaxiLocation } from "../entities/taxiLocation.entity";

@InputType()
export class TaxiLocationInput extends OmitType(
    TaxiLocation, 
    ['id'], 
    InputType
) {}