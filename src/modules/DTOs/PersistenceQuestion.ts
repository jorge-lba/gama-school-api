import { PersistenceAlternativeDTO } from "./PercistenceAlternative";

interface PersistenceQuestionDTO {
  id: string;
  statement: string;
  alternatives: {
    alternative: PersistenceAlternativeDTO;
    isCorrect: boolean;
  }[];
}

export { PersistenceQuestionDTO };
