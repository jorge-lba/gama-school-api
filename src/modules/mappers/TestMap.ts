import { PersistenceTestDTO } from "../DTOs/PersistenceTest";
import { ResponseTestDTO } from "../DTOs/ResponseTest";
import { Test } from "../entities/Test";
import { QuestionMap } from "./QuestionMap";

class TestMap {
  static toDomain(test: PersistenceTestDTO): Test {
    return Test.create(
      {
        title: test.title,
        questions: test.questions.map((item) => QuestionMap.toDomain(item)),
      },
      test.id
    );
  }

  static toPersistence(entity: Test): PersistenceTestDTO {
    return {
      id: entity.id,
      title: entity.title,
      questions: entity.questions.map((item) =>
        QuestionMap.toPersistence(item)
      ),
    };
  }

  static toResponse(entity: Test): ResponseTestDTO {
    return {
      id: entity.id,
      title: entity.title,
      questions: entity.questions.map((item) => QuestionMap.toResponse(item)),
    };
  }
}

export { TestMap };
