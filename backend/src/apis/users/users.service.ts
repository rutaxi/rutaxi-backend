import { ConflictException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IUsersServiceCreate, IUsersServiceFindOneById, IUsersServiceFindOneByUserName, IUsersServiceIsUserInCommunity, IUsersServiceUpdate } from "./interfaces/users-service.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    findOneById({userId}: IUsersServiceFindOneById) {
        return this.usersRepository.findOne({where: {id: userId}});
    }

    findOneByUserName({userName}: IUsersServiceFindOneByUserName) {
        return this.usersRepository.findOne({where: {userName}});        
    }

    // 잘 될지 모름
    async isUserInCommunity({userId, taxiPartyId}: IUsersServiceIsUserInCommunity): Promise<boolean> {
        const user = await this.usersRepository.findOne({where: {id: userId}, relations: ['taxiPartys']});
        // if (!user) {
        //   throw new Error('User not found');
        // }
        return user.taxiPartys.some(community => community.id === taxiPartyId);
    }

    async create({userName, password}: IUsersServiceCreate): Promise<User> {
        const user = await this.findOneByUserName({userName});
        if (user) throw new ConflictException('이미 등록된 이메일입니다.');
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usersRepository.save({
            userName,
            password: hashedPassword,
        });
    }

    async update({userId, userName, oldPassword, password}: IUsersServiceUpdate): Promise<User> {
        const user = await this.findOneById({userId})
        const isAuth = await bcrypt.compare(oldPassword, user.password);
        if(!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = this.usersRepository.save({
            ...user,
            userName: userName,
            password: hashedPassword,
        })
        return result;
    }
}