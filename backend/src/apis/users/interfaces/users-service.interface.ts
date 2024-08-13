export interface IUsersServiceCreate {
    userName: string;
    email: string;
    password: string;
}

export interface IUsersServiceFindOneByUserName {
    userName: string;
}

export interface IUsersServiceFindOne {
    email: string;
}

export interface IUsersServiceFindOneById {
    userId: string;
}

export interface IUsersServiceIsUserInCommunity {
    userId: string;
    taxiPartyId: string;
}

export interface IUsersServiceUpdate {
    userId: string;
    userName: string;
    oldPassword: string;
    password: string;
}