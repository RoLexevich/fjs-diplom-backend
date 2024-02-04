import { ID } from 'src/types/id';

export class UpdateRoomDto {
    readonly room: ID;
    readonly description: string;
    readonly hotel: ID;
    readonly updatedAt: Date;
    readonly isEnabled: boolean;
    readonly images: Array<Express.Multer.File | string>;

    constructor(
        room: ID,
        query: {
            description: string;
            hotel: ID;
            updatedAt: Date;
            isEnabled: boolean;
            images: Array<Express.Multer.File | string>;
        }
    ) {
        const { description, hotel, isEnabled, images, updatedAt } = query;
        this.room = room;
        this.description = description;
        this.hotel = hotel;
        this.updatedAt = updatedAt;
        this.isEnabled = isEnabled;
        this.images = images;
    }
}
