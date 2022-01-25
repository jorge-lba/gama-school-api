import { request } from "../http/request";

describe("Integration - Create Test", () => {
  it("should create a new test", async () => {
    const response = await request.post("/test").send({
      title: "test",
      questions: [
        {
          statement: "Question 1",
          correctAlternatives: ["Correct Alternative 1"],
          incorrectAlternatives: ["Incorrect Alternative 1"],
        },
      ],
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Test created");
  });
});
