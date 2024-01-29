import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { HotelsApiService } from './hotelsApi.service';
import { GetRoomsDto } from './dto/getRooms.dto';
import { RoomResponseDto } from './dto/roomResponse.dto';
import { GetRoomsQueryDto } from './dto/getRoomsQuery.dto';
import { ID } from 'src/types/id';

@Controller('api/common')
export class HotelsApiCommonController {
    constructor(private readonly hotelsApiService: HotelsApiService) {}

    @Get('hotel-rooms')
    async getRooms(
        @Query()
        query: GetRoomsQueryDto,
        @Req() request: Request & { isEnabled: boolean }
    ): Promise<RoomResponseDto[]> {
        const isEnabled: boolean | undefined = request.isEnabled;
        const getRoomsDto = new GetRoomsDto(query, isEnabled);
        return this.hotelsApiService.getRooms(getRoomsDto);
    }

    @Get('hotel-rooms/:id')
    async getRoom(@Param('id') id: ID): Promise<RoomResponseDto> {
        return this.hotelsApiService.getRoom(id);
    }
}
