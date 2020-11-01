import NotFound from 'packages/panenco-rest-framework/errors/notFound';
import { BaseEntity, Connection, EntityManager, FindOneOptions, getConnection, ObjectType, QueryRunner } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import ExpressContext from '../expressContext';

Connection.prototype.createEntityManager = function (
  queryRunner?: QueryRunner
): EntityManager {
  const em = ExpressContext.get("entityManager");
  if (em) {
    return em;
  }
  return new EntityManager(this, queryRunner);
};

BaseEntity.getRepository = function <T>(this: ObjectType<T>): Repository<T> {
  const connection = getConnection();
  const em = connection.createEntityManager();
  return em.getRepository(this);
};

Repository.prototype.findSingle = async function <Entity>(
  idOrConditions?: any,
  options?: FindOneOptions<Entity>
): Promise<Entity> {
  try {
    return await this.findOneOrFail(idOrConditions, options);
  } catch (error) {
    if (error.name === "EntityNotFound") {
      throw new NotFound(`${this.target.name}${NotFound.name}`, error.message);
    }
    throw error;
  }
};
