import { CreateTaxiPartyInput } from "../dto/create-taxiParty.input";

export interface ITaxiPartiesServiceCreate {
    createTaxiPartyInput: CreateTaxiPartyInput;
    userId: string;
}

export interface ITaxiPartiesServiceFindOne {
    taxiPartyId: string;
}

export interface ITaxiPartiesServiceJoinInTaxiParty {
    userId: string;
    taxiPartyId: string;
}

export interface ITaxiPartiesServiceFindByUserId {
    userId: string;
}

export interface ITaxiPartiesServiceLeaveTaxiParty {
    userId: string;
    taxiPartyId: string;
}