import { CreateCommentInput } from "../dto/create-comment.input";

export interface ICommentsServiceCreate {
    userId: string;
    createCommentInput: CreateCommentInput;
}

export interface ICommentsServiceFindAll {
    userId: string;
    taxiPartyId: string;
}