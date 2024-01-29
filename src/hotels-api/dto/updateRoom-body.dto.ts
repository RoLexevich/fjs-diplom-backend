import { ID } from "src/types/id";

export class UpdateRoomBodyDto {
  description: string;

  hotel: ID;

  isEnabled: boolean;

  images: Array<Express.Multer.File | string>;
}
