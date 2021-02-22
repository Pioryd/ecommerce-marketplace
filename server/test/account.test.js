const server = require("./helper/server");

const AccountModel = require("../src/models/account");

const SIGN_IN = { email: "some@email.com", password: "123123" };
const account = { token: "" };

// The tests order matters
describe("Account", () => {
  beforeAll(async () => {
    console.error = () => {};

    await server.initialize();
  });
  afterAll(async () => {
    await server.terminate();
  });

  test("POST /accounts", async () => {
    await server.request
      .post("/accounts")
      .send(SIGN_IN)
      .expect(200)
      .then((response) => {
        account.token = response.body.token;
      });
  });

  test("POST /accounts/sign-in", async () => {
    await server.request
      .post("/accounts/sign-in")
      .send(SIGN_IN)
      .expect(200)
      .then((response) => {
        account.token = response.body.token;
      });
  });

  test("PUT /accounts", async () => {
    const newPassword = "456456";

    await server.request
      .put("/accounts")
      .send({ oldPassword: SIGN_IN.password, newPassword })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);

    // change back to previous
    await server.request
      .put("/accounts")
      .send({ oldPassword: newPassword, newPassword: SIGN_IN.password })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);
  });

  test("GET /accounts", async () => {
    await server.request
      .get("/accounts")
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        account.id = response.body.id;
        account.itemsWatching = response.body.itemsWatching;
      });
  });

  test("POST /accounts/refresh-token", async () => {
    // If too fast get new token after create one, then will equal
    await new Promise((r) => setTimeout(r, 1100));

    await server.request
      .post("/accounts/refresh-token")
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(response.body.token).not.toEqual(account.token);
        account.token = response.body.token;
      });
  });

  describe("POST /accounts/recover", () => {
    test("correct way", async () => {
      if (process.env.EMAIL_SERVICE_NAME == null) return;

      await server.request
        .post("/accounts/recover")
        .send({ email: SIGN_IN.email })
        .expect(200)
        .then((response) => {
          expect(response.body.token).not.toEqual(account.token);
          account.token = response.body.token;
        });

      let result = await AccountModel.findOne(
        { id: SIGN_IN.email },
        { _id: 0, recover_password: 1 }
      );
      expect(result).not.toBe(null);
      expect(result.recover_password).not.toBe(null);
      expect(result.recover_password).not.toBe("");

      await server.request
        .post("/accounts/sign-in")
        .send({ email: SIGN_IN.email, password: result.recover_password })
        .expect(200)
        .then((response) => {
          account.token = response.body.token;
        });

      // change back to previous
      await server.request
        .put("/accounts")
        .send({
          oldPassword: result.recover_password,
          newPassword: SIGN_IN.password
        })
        .set("Authorization", "Bearer " + account.token)
        .expect(200);
    });

    test("use first wrong password and then old one", async () => {
      if (process.env.EMAIL_SERVICE_NAME == null) return;

      await server.request
        .post("/accounts/recover")
        .send({ email: SIGN_IN.email })
        .expect(200)
        .then((response) => {
          expect(response.body.token).not.toEqual(account.token);
          account.token = response.body.token;
        });

      await server.request
        .post("/accounts/sign-in")
        .send({ email: SIGN_IN.email, password: "123456" })
        .expect(500)
        .then((response) => {
          account.token = response.body.token;
        });
      {
        let result = await AccountModel.findOne(
          { id: SIGN_IN.email },
          { _id: 0, recover_password: 1 }
        );
        expect(result).not.toBe(null);
        expect(result.recover_password).not.toBe("");
      }

      await server.request
        .post("/accounts/sign-in")
        .send(SIGN_IN)
        .expect(200)
        .then((response) => {
          account.token = response.body.token;
        });
      {
        let result = await AccountModel.findOne(
          { id: SIGN_IN.email },
          { _id: 0, recover_password: 1 }
        );
        expect(result).not.toBe(null);
        expect(result.recover_password).toBe("");
      }
    });
  });

  test("DELETE /accounts", async () => {
    {
      let result = await AccountModel.findOne(
        { id: SIGN_IN.email },
        { _id: 0, recover_password: 1 }
      );
      expect(result).not.toBe(null);
    }
    await server.request
      .delete("/accounts")
      .send({ password: SIGN_IN.password })
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(response.body.token).not.toEqual(account.token);
        account.token = response.body.token;
      });
    {
      let result = await AccountModel.findOne(
        { id: SIGN_IN.email },
        { _id: 0, recover_password: 1 }
      );
      expect(result).toBe(null);
    }
  });
});
