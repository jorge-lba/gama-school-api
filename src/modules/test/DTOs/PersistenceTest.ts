import { PersistenceQuestionDTO } from "./PersistenceQuestion";

interface PersistenceTestDTO {
  id: string;
  title: string;
  questions: PersistenceQuestionDTO[];
}

export { PersistenceTestDTO };
