import { ID } from 'src/types/id';

export class CreateRoomDto {
  readonly description: string;
  readonly createdAt: Date;
  readonly hotel: ID;
  images: Express.Multer.File[];
}
