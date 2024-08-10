import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaxiPartiesService } from "./taxiParties.service";
import { TaxiParty } from "./entities/taxiParty.entity";
import { CreateTaxiPartyInput } from "./dto/create-taxiParty.input";
import { IContext } from "src/commons/interfaces/context";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";

@Resolver()
export class TaxiPartiesResolver {
    constructor(
        private readonly taxiPartiesService: TaxiPartiesService,
    ) {}

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => TaxiParty)
    createTaxiParty(
        @Context() context: IContext,
        @Args('createTaxiPartyInput') createTaxiPartyInput: CreateTaxiPartyInput,
    ): Promise<TaxiParty> {
        const userId = context.req.user.id;
        return this.taxiPartiesService.create({createTaxiPartyInput, userId})
    }

    @Query(() => [TaxiParty])
    fetchAllTaxiParty(
    ) {
        return this.taxiPartiesService.findAll();
    }

    @UseGuards(GqlAuthGuard('access'))
    @Query(() => [TaxiParty])
    fetchMyTaxiParties(
        @Context() context: IContext,
    ): Promise<TaxiParty[]> {
        const userId = context.req.user.id;
        return this.taxiPartiesService.findByUserId({userId});
    }

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => TaxiParty)
    joinInTaxiParty(
        @Context() context: IContext,
        @Args("taxiPartyId") taxiPartyId: string,
    ): Promise<TaxiParty> {
        const userId = context.req.user.id;
        return this.taxiPartiesService.joininTaxiParty({userId, taxiPartyId});
    }

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => String)
    leaveTaxiParty(
        @Context() context: IContext,
        @Args("taxiPartyId") taxiPartyId: string,

    ): Promise<string> {
        const userId = context.req.user.id;
        return this.taxiPartiesService.leaveTaxiParty({userId, taxiPartyId});
    }
}