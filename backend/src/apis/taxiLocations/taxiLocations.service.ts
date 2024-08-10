import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaxiLocation } from "./entities/taxiLocation.entity";
import { Repository } from "typeorm";

@Injectable()
export class TaxiLocationsService {
    constructor(
        @InjectRepository(TaxiLocation)
        private readonly taxiLocationsRepository: Repository<TaxiLocation>,
    ) {}

    create({taxiLocation}) {
        return this.taxiLocationsRepository.save({
            ...taxiLocation,
        });
    }}