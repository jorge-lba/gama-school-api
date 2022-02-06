import { Account } from "./Account";

describe("Entity - Account", () => {
  it("should be create a new account", () => {
    const account = Account.create({
      name: "name",
      email: "email@gmail.com",
      password: "password",
    });

    expect(account.id).toEqual(expect.any(String));
  });
});
