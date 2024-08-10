import { Module } from "@nestjs/common";
import { TaxiParty } from "./entities/taxiParty.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaxiPartiesResolver } from "./taxiParties.resolver";
import { TaxiPartiesService } from "./taxiParties.service";
import { TaxiPartyTag } from "../taxiPartiesTags/entities/taxiPartyTag.entity";
import { TaxiLocation } from "../taxiLocations/entities/taxiLocation.entity";
import { TaxiPartiesTagsService } from "../taxiPartiesTags/taxiPartiesTags.service";
import { TaxiLocationsService } from "../taxiLocations/taxiLocations.service";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TaxiParty,
            TaxiPartyTag,
            TaxiLocation,
            User,
        ])
    ],
    providers: [
        TaxiPartiesResolver,
        TaxiPartiesService,
        TaxiPartiesTagsService,
        TaxiLocationsService,
        UsersService,
    ],
})
export class TaxiPartiesModule {}