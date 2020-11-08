import { getUsers } from '../queries/getUsers.query';

describe("User test", () => {
  it("Should fetch users", async () => {
    const users = getUsers();
    console.log(users);
  });
});
