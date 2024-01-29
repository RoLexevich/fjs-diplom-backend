import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { IUserService } from './interfaces/IUserService';
import { SearchUserParams } from './interfaces/SearchUserParams';
import { CreateUserDto } from './dto/createUser.dto';
import { ICreateUserResponse } from './interfaces/ICreateUserResponse';
import { GetUsersDto } from './dto/getUsers.dto';
import * as bcrypt from 'bcrypt';
import { IGetUsersResponse } from './interfaces/IGetUsersResponse';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(data: Partial<User>): Promise<UserDocument> {
        const user = new this.userModel(data);
        return user.save();
    }

    async findById(id: ID): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async findAll(params: SearchUserParams): Promise<UserDocument[]> {
        const { limit, offset, email, name, contactPhone } = params;
        const query = {
            email: { $regex: new RegExp(email, 'i') },
            name: { $regex: new RegExp(name, 'i') },
            contactPhone: { $regex: new RegExp(contactPhone, 'i') }
        };
        return this.userModel.find(query).skip(offset).limit(limit);
    }

    async createUser(
        createUserDto: CreateUserDto
    ): Promise<ICreateUserResponse> {
        const { password, email, ...rest } = createUserDto;
        const user: UserDocument | null = await this.findByEmail(email);

        const passwordHash: string = await bcrypt.hash(password, 10);
        const {
            id,
            email: newUserEmail,
            name,
            contactPhone,
            role
        } = await this.create({
            passwordHash,
            email,
            ...rest
        });
        return {
            id,
            email: newUserEmail,
            name,
            contactPhone,
            role
        };
    }

    async getUsers(params: GetUsersDto): Promise<IGetUsersResponse[]> {
        const users: UserDocument[] = await this.findAll(params);
        return users.map((user: UserDocument) => {
            const { id, email, name, contactPhone } = user;
            return {
                id,
                email,
                name,
                contactPhone
            };
        });
    }
}
