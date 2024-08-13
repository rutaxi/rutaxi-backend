import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { IContext } from "src/commons/interfaces/context";
import { TaxiPartiesService } from "../taxiParties/taxiParties.service";

@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly taxiPartiesService: TaxiPartiesService,
    ) {}

    @UseGuards(GqlAuthGuard('access'))
    @Query(() => String)
    fetchUser(
        @Context() context: IContext,
    ): string {
        console.log('=================');
        console.log(context.req.user);
        console.log('=================');

        return '인가에 성공하였습니다.';
    }

    @Mutation(() => User)
    createUser(
        @Args('userName') userName: string,
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<User> {
        return this.usersService.create({userName, email, password});
    }
    

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => User)
    updateUser(
        @Context() context: IContext,
        @Args('userName') userName: string,
        @Args('oldPassword') oldPassword: string,
        @Args('password') password: string,
    ): Promise<User> {
        const userId = context.req.user.id;
        return this.usersService.update({userId, userName, oldPassword, password});
    }
}