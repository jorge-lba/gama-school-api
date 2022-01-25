import { PersistenceAlternativeDTO } from "./PersistenceAlternative";

interface PersistenceQuestionDTO {
  id: string;
  statement: string;
  alternatives: PersistenceAlternativeDTO[];
}

export { PersistenceQuestionDTO };
