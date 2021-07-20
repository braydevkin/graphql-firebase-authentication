import { IProduct } from "src/shared/interfaces/models/product.interface";

import { IDatabaseRepository } from "src/shared/interfaces/repositories/database-repository.interface";

export interface IProductRepository extends IDatabaseRepository<IProduct> {
    create(data: IProduct): Promise<IProduct>
    getAll(filters: Partial<IProduct>): Promise<IProduct[]>
    getOne(id: string): Promise<IProduct>
    update(id: string, data: IProduct): Promise<IProduct>
    delete(id: string): Promise<IProduct>
}