import { Module } from "@nestjs/common";
import { CommentsResolver } from "./comments.resolver";
import { CommentsService } from "./comments.service";
import { UsersService } from "../users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { User } from "../users/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Comment,
            User,
        ])
    ],

    providers: [
        CommentsResolver,
        CommentsService,
        UsersService,
    ],
})
export class CommentsModule {}