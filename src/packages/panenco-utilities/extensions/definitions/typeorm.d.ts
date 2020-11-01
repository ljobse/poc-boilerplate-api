import { FindConditions, FindOneOptions, ObjectID, ObjectLiteral } from 'typeorm';

declare module "typeorm" {
  interface Repository<Entity extends ObjectLiteral> {
    findSingle(
      id?: string | number | Date | ObjectID,
      options?: FindOneOptions<Entity>
    ): Promise<Entity>;
    findSingle(
      conditions?: FindConditions<Entity>,
      options?: FindOneOptions<Entity>
    ): Promise<Entity>;
  }
}
