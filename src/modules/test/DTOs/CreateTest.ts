interface CreateQuestionDTO {
  statement: string;
  correctAlternatives: string[];
  incorrectAlternatives: string[];
}

interface CreateTestDTO {
  title: string;
  questions?: CreateQuestionDTO[];
}

export { CreateTestDTO, CreateQuestionDTO };
