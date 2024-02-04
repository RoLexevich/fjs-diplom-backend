import { ID } from "src/types/id";

export class HotelResponseDto {
  id: ID;
  title: string;
  createdAt: Date;
  description: string;
  updatedAt: Date;
}
