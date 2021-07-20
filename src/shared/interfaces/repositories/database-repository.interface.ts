export interface IDatabaseRepository<Entity> {
    create(data: Entity): Promise<Entity>;
    getAll(filters?: Partial<Entity>): Promise<Entity[]>;
    getOne(id: string): Promise<Entity>;
    update(id: string, data: Entity): Promise<Entity>;
    delete(id: string): Promise<Entity>;
}