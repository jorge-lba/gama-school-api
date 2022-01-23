import { PersistenceQuestionDTO } from "../DTOs/PersistenceQuestion";
import { Alternative } from "../entities/Alternative";
import { Question } from "../entities/Question";

class QuestionMap {
  static toDomain(question: PersistenceQuestionDTO): Question {
    const alternatives = question.alternatives.map((item) => ({
      alternative: Alternative.create(item.alternative.text),
      isCorrect: item.isCorrect,
    }));

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
      alternatives: entity.alternatives.map((item) => ({
        alternative: {
          text: item.alternative.value,
        },
        isCorrect: item.isCorrect,
      })),
    };
  }
}

export { QuestionMap };
