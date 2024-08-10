import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TaxiPartyTag } from "./entities/taxiPartyTag.entity";
import { ITaxiPartiesTagsServiceBulkInsert, ITaxiPartiesTagsServiceFindByNames } from "./interfaces/taxiPartiesTags-service.interface";

@Injectable()
export class TaxiPartiesTagsService {
    constructor(
        @InjectRepository(TaxiPartyTag)
        private readonly taxiPartiesTagsRepository: Repository<TaxiPartyTag>,
    ) {}

    findByNames({tagNames}: ITaxiPartiesTagsServiceFindByNames) {
        return this.taxiPartiesTagsRepository.find({
            where: {name: In(tagNames)}
        });
    }

    bulkInsert({names}: ITaxiPartiesTagsServiceBulkInsert) {
        return this.taxiPartiesTagsRepository.insert(names)
    }
}