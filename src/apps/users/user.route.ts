import { Router } from 'express';
import { Delegator } from 'packages/panenco-rest-framework/controllers/delegator';
import { IRouter } from 'packages/panenco-rest-framework/router.interface';

import { UserController } from './user.controller';

export class UserRoute implements IRouter {
  public router: Router = Router();
  public path = "users";

  constructor() {
    const { getUsers } = new Delegator(UserController).getFunctions();

    this.router.get("", getUsers);
  }
}
