import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
    @Field(() => Date)
    sendTime: Date;
    
    @Field(() => String)
    content: string; 

    @Field(() => String)
    taxiPartyId: string;
}