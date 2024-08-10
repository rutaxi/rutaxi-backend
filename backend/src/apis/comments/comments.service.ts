import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { ICommentsServiceCreate, ICommentsServiceFindAll } from "./interfaces/comments-service.interface";
import { HttpExceptionFilter } from "src/commons/filter/http-exception.filter";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        private readonly usersService: UsersService,
    ) {}

    async findAll({userId, taxiPartyId}: ICommentsServiceFindAll): Promise<Comment[]> {
        const isUserInCommunity = this.usersService.isUserInCommunity({userId, taxiPartyId});
        if(!isUserInCommunity) throw new HttpExceptionFilter();
        return await this.commentsRepository.find({
            where: {taxiParty: {id: taxiPartyId}}, relations: ['writer', 'taxiParty'], order: { sendTime: 'ASC' },
        })
    }

    async create({userId, createCommentInput}: ICommentsServiceCreate): Promise<Comment> {
        const {sendTime, content, taxiPartyId} = createCommentInput;
        const isUserInCommunity = this.usersService.isUserInCommunity({userId, taxiPartyId});
        if(!isUserInCommunity) throw new HttpExceptionFilter();
        
        const result = await this.commentsRepository.save({
            sendTime,
            content,
            writer: {id: userId},
            taxiParty: {id: taxiPartyId},
        })
        return result;
    }
}