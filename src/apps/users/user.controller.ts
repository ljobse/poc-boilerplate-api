import ControllerBase from 'panenco-rest-framework/controllers/controllerBase';

import { getUsers } from './queries/getUsers.query';

export class UserController extends ControllerBase {
  public async getUsers() {
    return getUsers();
  }
}
