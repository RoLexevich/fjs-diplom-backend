import { ID } from 'src/types/id';

export class UpdateHotelDto {
    readonly title: string;
    readonly description: string;
    updatedAt?: Date;
    createdAt?: Date;
    readonly hotel: ID;

    constructor(
        title: string,
        description: string,
        hotel: ID,
        updatedAt?: Date,
        createdAt?: Date
    ) {
        this.title = title;
        this.description = description;
        this.hotel = hotel;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }
}
