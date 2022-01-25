import { PersistenceQuestionDTO } from "../DTOs/PersistenceQuestion";
import { ResponseQuestionDTO } from "../DTOs/ResponseTest";
import { Alternative } from "../entities/Alternative";
import { Question } from "../entities/Question";

class QuestionMap {
  static toDomain(question: PersistenceQuestionDTO): Question {
    const alternatives = question.alternatives.map((alternative) =>
      Alternative.create(
        alternative.text,
        alternative.isCorrect,
        alternative.id
      )
    );

    return Question.create(
      {
        statement: question.statement,
        alternatives,
      },
      question.id
    );
  }

  static toPersistence(entity: Question): PersistenceQuestionDTO {
    return {
      id: entity.id,
      statement: entity.statement,
      alternatives: entity.alternatives.map((alternative) => ({
        ...alternative.value,
        questionId: entity.id,
      })),
    };
  }

  static toResponse(entity: Question): ResponseQuestionDTO {
    return {
      id: entity.id,
      statement: entity.statement,
      alternatives: entity.alternatives.map((alternative) => alternative.value),
    };
  }
}

export { QuestionMap };
