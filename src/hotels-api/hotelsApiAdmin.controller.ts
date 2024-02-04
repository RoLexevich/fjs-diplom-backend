import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';

import { CreateHotelDto } from './dto/createHotel.dto';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateHotelDto } from './dto/updateHotel.dto';
import { HotelsApiService } from './hotelsApi.service';
import { GetHotelsQueryDto } from './dto/getHotelsQuery.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { HotelResponseDto } from './dto/hotelResponse.dto';
import { RoomResponseDto } from './dto/roomResponse.dto';
import { UpdateHotelBodyDto } from './dto/updateHotelBody.dto';
import { UpdateRoomBodyDto } from './dto/updateRoomBody.dto';
import { ID } from 'src/types/id';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multerOptions from 'config/multerOptions';

@Controller('api/admin')
export class HotelsApiAdminController {
  constructor(private readonly hotelsApiService: HotelsApiService) {}


  @Post('hotels')
  async createHotel(
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<HotelResponseDto> {
    return this.hotelsApiService.createHotel(createHotelDto);
  }

  @Get('hotels')
  async getHotels(
    @Query() getHotelsDto: GetHotelsQueryDto,
  ): Promise<HotelResponseDto[]> {
    return this.hotelsApiService.getHotels(getHotelsDto);
  }


  @Put('hotels/:id')
  async updateHotel(
    @Body() body: UpdateHotelBodyDto,
    @Param('id') hotelId: ID,
  ): Promise<HotelResponseDto> {
    const updateHotelDto = new UpdateHotelDto(
      body.title,
      body.description,
      hotelId,
      body.updatedAt
    );
    return this.hotelsApiService.updateHotel(updateHotelDto);
  }


  @Post('hotel-rooms')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async createRoom(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<RoomResponseDto> {
    console.log("createRoomDto",createRoomDto);

    console.log("images");
    console.log(images);
    createRoomDto.images = images;
    return this.hotelsApiService.createRoom(createRoomDto);
  }

  @Put('hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async updateRoom(
    @UploadedFiles() uploadImages: Array<Express.Multer.File>,
    @Param('id') roomId: ID,
    @Body()
    body: UpdateRoomBodyDto,
  ): Promise<RoomResponseDto | null> {
    const newImagesFilenames: string[] = uploadImages.map(
      (image: Express.Multer.File) => image.filename,
    );
    body.images = body.images
      ? body.images.concat(newImagesFilenames)
      : newImagesFilenames;
    const updateRoomDto = new UpdateRoomDto(roomId, body);
    return this.hotelsApiService.updateRoom(updateRoomDto);
  }
  
}
