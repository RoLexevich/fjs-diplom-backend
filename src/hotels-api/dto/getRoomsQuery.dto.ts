import { ID } from 'src/types/id';

export class GetRoomsQueryDto {
  limit?: number;

  offset?: number;

  hotel: ID;
}
