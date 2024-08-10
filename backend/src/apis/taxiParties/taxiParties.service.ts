import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaxiParty } from "./entities/taxiParty.entity";
import { Repository } from "typeorm";
import { ITaxiPartiesServiceCreate, ITaxiPartiesServiceFindByUserId, ITaxiPartiesServiceFindOne, ITaxiPartiesServiceJoinInTaxiParty, ITaxiPartiesServiceLeaveTaxiParty } from "./interfaces/taxiParties-service.interface";
import { TaxiLocationsService } from "../taxiLocations/taxiLocations.service";
import { TaxiPartiesTagsService } from "../taxiPartiesTags/taxiPartiesTags.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class TaxiPartiesService {
    constructor(
        @InjectRepository(TaxiParty)
        private readonly taxiPartiesRepository: Repository<TaxiParty>,
        private readonly taxiLocationsService: TaxiLocationsService,
        private readonly taxiPartiesTagsService: TaxiPartiesTagsService,
        private readonly usersService: UsersService,
    ) {}

    findAll(): Promise<TaxiParty[]> {
        return this.taxiPartiesRepository.find({
            relations: ['startLocation', 'endLocation', 'taxiPartyTags', 'users'],
        });
    }

    findOne({taxiPartyId}: ITaxiPartiesServiceFindOne): Promise<TaxiParty> {
        return this.taxiPartiesRepository.findOne({
            where: { id: taxiPartyId}, relations: ['startLocation', 'endLocation', 'taxiPartyTags', 'users'],
        });
    }

    async findByUserId({userId}: ITaxiPartiesServiceFindByUserId): Promise<TaxiParty[]>{
        // const user = await this.usersService.findOneById({userId})
        // return await this.taxiPartiesRepository.find({ 
        //     where: {users: user}, relations: ['startLocation', 'endLocation', 'taxiPartyTags', 'users'],
        // });

        const taxiParties = await this.taxiPartiesRepository.createQueryBuilder('taxiParty')
        .leftJoinAndSelect('taxiParty.users', 'users')
        .where('users.id = :userId', { userId })
        .leftJoinAndSelect('taxiParty.startLocation', 'startLocation')
        .leftJoinAndSelect('taxiParty.endLocation', 'endLocation')
        .leftJoinAndSelect('taxiParty.taxiPartyTags', 'taxiPartyTags')
        .leftJoinAndSelect('taxiParty.users', 'allUsers')
        .getMany();
        return taxiParties;
    }

    async joininTaxiParty({userId, taxiPartyId}: ITaxiPartiesServiceJoinInTaxiParty): Promise<TaxiParty> {
        const user = await this.usersService.findOneById({userId});
        const taxiParty = await this.findOne({taxiPartyId});
        // if (!user || !taxiParty) {
        //   throw new Error('User or community not found');
        // }
        if (!taxiParty.users) {
            taxiParty.users = []; // users 속성이 초기화되지 않았을 경우 초기화
        }
        taxiParty.users.push(user);
        return this.taxiPartiesRepository.save(taxiParty);
    }

    async create({createTaxiPartyInput, userId}: ITaxiPartiesServiceCreate): Promise<TaxiParty> {
        const {startLocation, endLocation, taxiPartyTags, ...taxiParty} = createTaxiPartyInput;
        
        // 출발 - 도착 
        const startLocation_result = await this.taxiLocationsService.create({taxiLocation: startLocation});
        const endLocation_result = await this.taxiLocationsService.create({taxiLocation: endLocation});
        
        // 택시 태그 등록
        const tagNames = taxiPartyTags.map(el=>el.replace('#', ''));  
        const prevTags = await this.taxiPartiesTagsService.findByNames({tagNames}); 
        const temp = [];                                                            // 이미 있는 태그를 제외한 나머지
        tagNames.forEach(el => {
            const isExists = prevTags.find(prevEl => el === prevEl.name);
            if(!isExists) temp.push({name: el});
        })
        const newTags = await this.taxiPartiesTagsService.bulkInsert({names: temp});
        const tags = [...prevTags, ...newTags.identifiers];

        // 사용자
        const user = await this.usersService.findOneById({userId: userId});

        const result = this.taxiPartiesRepository.save({
            ...taxiParty,
            startLocation: startLocation_result,
            endLocation: endLocation_result,
            taxiPartyTags: tags,
            users: [user],
        });
        return result;
    }

    async delete({taxiPartiesId}) {
        const result = await this.taxiPartiesRepository.delete({id: taxiPartiesId});
        return result.affected ? true:false;
    }

    async leaveTaxiParty({userId, taxiPartyId}: ITaxiPartiesServiceLeaveTaxiParty): Promise<string> {
        const user = await this.usersService.findOneById({userId});
        const taxiParty = await this.findOne({taxiPartyId});
        // if (!user || !taxiParty) {
        //   throw new Error('User or community not found');
        // }

        // 사용자가 속한 택시파티에서 제거
        taxiParty.users = taxiParty.users.filter(u => u.id !== user.id);

        // 택시파티에 사용자가 더 이상 없으면 삭제하거나 다른 처리를 할 수 있음
        if (taxiParty.users.length === 0) {
            // 택시파티를 삭제
            this.taxiPartiesRepository.remove(taxiParty);
        } else {
            // 변경사항 저장
            await this.taxiPartiesRepository.save(taxiParty);
        }

        return taxiParty.id;
    }

}
