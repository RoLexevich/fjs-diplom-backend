import { ID } from "src/types/id";
import { User, UserDocument } from "../schemas/user.schema";
import { SearchUserParams } from "./SearchUserParams";

export interface IUserService {
    create(data: Partial<User>): Promise<UserDocument>;

    findById(id: ID): Promise<UserDocument | null>;

    findByEmail(email: string): Promise<UserDocument | null>;

    findAll(params: SearchUserParams): Promise<UserDocument[]>;
}
