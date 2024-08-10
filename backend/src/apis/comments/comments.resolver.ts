import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommentsService } from "./comments.service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { IContext } from "src/commons/interfaces/context";
import { Comment } from "./entities/comment.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";

@Resolver()
export class CommentsResolver {
    constructor(
        private readonly commentsService: CommentsService, 
    ) {}

    @UseGuards(GqlAuthGuard('access'))
    @Query(() => [Comment])
    fetchComments(
        @Context() context: IContext, 
        @Args("taxiPartyId") taxiPartyId: string,
    ): Promise<Comment[]> {
        const userId = context.req.user.id;
        return this.commentsService.findAll({userId, taxiPartyId});
    }

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => Comment)
    createComment(
        @Context() context: IContext,
        @Args("CreateCommentInput") createCommentInput: CreateCommentInput,
    ): Promise<Comment> {
        const userId = context.req.user.id;
        return this.commentsService.create({userId, createCommentInput});
    }
}