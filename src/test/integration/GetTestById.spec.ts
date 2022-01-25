import { PrismaDatabase } from "../../infra/prisma";
import { Test } from "../../modules/entities/Test";
import { TestRepositoryImp } from "../../modules/repositories/prisma/TestRepositoryImp";
import { request } from "../http/request";

describe("Integration - Get Test By Id", () => {
  let TEST_ID: string;

  it("should get test by id", async () => {
    const response = await request.get(`/test/${TEST_ID}`).send();

    expect(response.status).toBe(200);
    expect(response.body.data.id).toEqual(TEST_ID);
  });

  beforeAll(async () => {
    const testRepository = new TestRepositoryImp(PrismaDatabase.instance);

    const test = Test.create({
      title: "test",
    });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    const { id } = await testRepository.save(test);
    TEST_ID = id;
  });
});
