import { getUsers } from 'apps/users/queries/getUsers.query';
import ControllerBase from 'panenco-rest-framework/controllers/controllerBase';

describe("User test", () => {
  it("Should fetch users", async () => {
    const users = getUsers();
    console.log(users);
    console.log(ControllerBase);
  });
});
