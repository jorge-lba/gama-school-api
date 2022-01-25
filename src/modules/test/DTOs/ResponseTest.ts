interface ResponseAlternativeDTO {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ResponseQuestionDTO {
  id: string;
  statement: string;
  alternatives?: ResponseAlternativeDTO[];
}

interface ResponseTestDTO {
  id: string;
  title: string;
  questions: ResponseQuestionDTO[];
}

export { ResponseTestDTO, ResponseQuestionDTO, ResponseAlternativeDTO };
