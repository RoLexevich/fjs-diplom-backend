import {
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { HotelsService } from '../hotels/hotels.service';
import { HotelsRoomsService } from '../hotels/hotelsRooms.service';
import { HotelRoomDocument } from '../hotels/schemas/hotelRoom.schema';
import { Hotel, HotelDocument } from '../hotels/schemas/hotel.schema';
import { CreateHotelDto } from './dto/createHotel.dto';
import { UpdateHotelDto } from './dto/updateHotel.dto';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { GetHotelsQueryDto } from './dto/getHotelsQuery.dto';
import { GetRoomsDto } from './dto/getRooms.dto';
import { HotelResponseDto } from './dto/hotelResponse.dto';
import { RoomResponseDto } from './dto/roomResponse.dto';
import { ID } from 'src/types/id';
import { Types } from 'mongoose';

interface IRoomParams {
    description: string;
    hotel: Types.ObjectId;
    images: string[];
}

@Injectable()
export class HotelsApiService {
    constructor(
        private readonly hotelsService: HotelsService,
        private readonly hotelsRoomsService: HotelsRoomsService
    ) {}

    async getRooms(getRoomsDto: GetRoomsDto): Promise<RoomResponseDto[]> {
        try {
            const { isEnabled, ...query } = getRoomsDto;
            const rooms = (await this.hotelsRoomsService.search({
                isEnabled,
                ...query
            })) as (HotelRoomDocument & { hotel: HotelDocument })[];
            return rooms.map((room) => {
                const { id, description, images, hotel } = room;
                return {
                    id,
                    description,
                    images,
                    hotel: {
                        id: hotel.id,
                        title: hotel.title
                    }
                };
            });
        } catch (e) {
            throw new InternalServerErrorException('Ошибка при поиске номеров');
        }
    }

    async getRoom(id: ID): Promise<RoomResponseDto> {
        try {
            const {
                id: roomId,
                description,
                images,
                hotel
            } = (await this.hotelsRoomsService.findById(
                id
            )) as HotelRoomDocument & {
                hotel: HotelDocument;
            };
            return {
                id: roomId,
                description,
                images,
                hotel: {
                    id: hotel.id,
                    description: hotel.description,
                    title: hotel.title
                }
            };
        } catch (e) {
            throw new NotFoundException('Комната отеля не найдена');
        }
    }

    async createHotel(
        createHotelDto: CreateHotelDto
    ): Promise<HotelResponseDto> {
        try {
            const { id, title, description } = (await this.hotelsService.create(
                createHotelDto
            )) as HotelDocument;
            return {
                id,
                title,
                description
            };
        } catch (e) {
            throw new InternalServerErrorException(
                'Ошибка при создании гостиницы'
            );
        }
    }

    async getHotels(
        getHotelsQueryDto: GetHotelsQueryDto
    ): Promise<HotelResponseDto[]> {
        try {
            const hotels = (await this.hotelsService.search(
                getHotelsQueryDto
            )) as HotelDocument[];
            return hotels.map((hotel) => {
                const { id, title, description } = hotel;
                return {
                    id,
                    title,
                    description
                };
            });
        } catch (e) {
            throw new InternalServerErrorException(
                'Ошибка при поиске гостиниц'
            );
        }
    }

    async updateHotel(
        updateHotelDto: UpdateHotelDto
    ): Promise<HotelResponseDto> {
        try {
            const { hotel, ...rest } = updateHotelDto;
            const {
                id: hotelId,
                title,
                description
            } = (await this.hotelsService.update(hotel, rest)) as HotelDocument;
            return {
                id: hotelId,
                title,
                description
            };
        } catch (e) {
            throw new InternalServerErrorException(
                'Ошибка при изменении описания гостиницы'
            );
        }
    }

    async createRoom(createRoomDto: CreateRoomDto) {
        try {
            const { hotel: hotelId, images, ...rest } = createRoomDto;
            const imagesFilenames: string[] = images.map(
                (image: Express.Multer.File) => image.filename
            );
            const roomParams: IRoomParams = {
                hotel: hotelId as Types.ObjectId,
                images: imagesFilenames,
                ...rest
            };
            const room = (await this.hotelsRoomsService.create(
                roomParams
            )) as HotelRoomDocument;
            const hotel = (await this.hotelsService.findById(
                roomParams.hotel
            )) as Hotel;
            if (!hotel) {
                throw new NotFoundException('Гостиница с таким id отсутствует');
            }
            return {
                id: room.id,
                description: room.description,
                isEnabled: room.isEnabled,
                images: room.images,
                hotel: {
                    id: room.hotel,
                    title: hotel.title,
                    description: hotel.description
                }
            };
        } catch (e) {
            throw e;
        }
    }

    async updateRoom(
        updateRoomDto: UpdateRoomDto
    ): Promise<RoomResponseDto | null> {
        try {
            const { room, ...rest } = updateRoomDto;
            const {
                id: roomId,
                description,
                images,
                isEnabled,
                hotel
            } = (await this.hotelsRoomsService.update(
                room,
                rest as {
                    description: string;
                    hotel: Types.ObjectId;
                    isEnabled: boolean;
                    images: Array<string>;
                }
            )) as HotelRoomDocument & { hotel: HotelDocument };
            return {
                id: roomId,
                description,
                images,
                isEnabled,
                hotel: {
                    id: hotel.id,
                    description: hotel.description,
                    title: hotel.title
                }
            };
        } catch (e) {
            throw new InternalServerErrorException(
                'Ошибка при изменении описания номера'
            );
        }
    }
}
