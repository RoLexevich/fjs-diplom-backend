import { ID } from 'src/types/id';

class Hotel {
  id: ID;

  title: string;

  description?: string;
}

export class RoomResponseDto {
  id: ID;

  description: string;

  images: string[];


  isEnabled?: boolean;

  hotel: Hotel;
}
