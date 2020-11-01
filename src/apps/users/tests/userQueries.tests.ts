import { getUsers } from 'apps/users/queries/getUsers.query';

describe("User test", () => {
  it("Should fetch users", async () => {
    const users = getUsers();
    console.log(users);
  });
});
