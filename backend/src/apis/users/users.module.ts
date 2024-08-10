import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { TaxiPartiesService } from "../taxiParties/taxiParties.service";
import { TaxiParty } from "../taxiParties/entities/taxiParty.entity";
import { TaxiLocation } from "../taxiLocations/entities/taxiLocation.entity";
import { TaxiLocationsService } from "../taxiLocations/taxiLocations.service";
import { TaxiPartiesTagsService } from "../taxiPartiesTags/taxiPartiesTags.service";
import { TaxiPartyTag } from "../taxiPartiesTags/entities/taxiPartyTag.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            TaxiParty,
            TaxiLocation,
            TaxiPartyTag,
        ]),
    ],

    providers: [
        UsersResolver,
        UsersService,
        TaxiPartiesService,
        TaxiLocationsService,
        TaxiPartiesTagsService,
    ],

    exports: [
        UsersService,
    ],
})
export class UsersModule {}