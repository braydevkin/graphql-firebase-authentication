import { IUser } from "src/shared/interfaces/models/user.interface";

import { IDatabaseRepository } from "src/shared/interfaces/repositories/database-repository.interface";

export interface IUserRepository extends IDatabaseRepository<IUser> {
    create(data: IUser): Promise<IUser>
    getAll(filters: Partial<IUser>): Promise<IUser[]>
    getOne(id: string): Promise<IUser>
    update(id: string, data: IUser): Promise<IUser>
    delete(id: string): Promise<IUser>
    recordUserOnFibaseAuth(data: IUser)
}