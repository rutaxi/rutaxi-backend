import { Response } from "express";
import { User } from "src/apis/users/entities/user.entity";
import { IAuthUser, IContext } from "src/commons/interfaces/context";

export class IAuthServiceLogin {
    userName: string;
    password: string;
    context: IContext;
}

export class IAuthServiceGetAccessToken {
    user: User | IAuthUser['user'];
}

export class IAuthServiceSetRefreshToken {
    user: User;
    res: Response;
}

export class IAuthServiceRestoreAccessToken {
    user: IAuthUser['user'];
}