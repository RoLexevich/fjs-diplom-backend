import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { GetUsersDto } from '../users/dto/getUsers.dto';
import { ICreateUserResponse } from './interfaces/ICreateUserResponse';
import { IGetUsersResponse } from './interfaces/IGetUsersResponse';
import { UsersService } from './users.service';

@Controller('api')
export class UseController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post('admin/users')
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<ICreateUserResponse> {
        return this.userService.createUser(createUserDto);
    }

    @Get('admin/users')
    async getUsersAsAdmin(
        @Query() getUsersDto: GetUsersDto
    ): Promise<IGetUsersResponse[]> {
        return this.userService.getUsers(getUsersDto);
    }

    @Get('manager/users')
    async getUsersAsManager(
        @Query() getUsersDto: GetUsersDto
    ): Promise<IGetUsersResponse[]> {
        return this.userService.getUsers(getUsersDto);
    }
}
