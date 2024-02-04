import { ID } from 'src/types/id';

export class UpdateRoomBodyDto {
    description: string;
    hotel: ID;
    updatedAt: Date;
    isEnabled: boolean;
    images: Array<Express.Multer.File | string>;
}
