import { Entity } from "../../core/domain/Entity";
import { IAlternativeProps, Question } from "./Question";

interface ITestProps {
  title: string;
  questions?: Question[];
}

interface IAddQuestionProps {
  statement: string;
  correctAlternatives: string[];
  incorrectAlternatives: string[];
}

class Test extends Entity<ITestProps> {
  private constructor(props: ITestProps, id?: string) {
    super(props, id);
    this.props.questions = [];
  }

  get title(): string {
    return this.props.title;
  }

  get questions(): Question[] {
    return this.props.questions || [];
  }

  static create(props: ITestProps, id?: string): Test {
    return new Test(props, id);
  }

  questionAlreadyExists(question: Question) {
    const questionExists = this.questions.find((item) =>
      item.equalsStatement(question)
    );

    if (questionExists) {
      throw new Error(`Question "${question.statement}" already exists`);
    }
  }

  addQuestion(question: IAddQuestionProps): void {
    const newQuestion = Question.create({
      statement: question.statement,
    });

    this.questionAlreadyExists(newQuestion);

    newQuestion.includeCorrectAlternatives(question.correctAlternatives);
    newQuestion.includeIncorrectAlternatives(question.incorrectAlternatives);

    this.props.questions?.push(newQuestion);
  }

  removeQuestionById(id: string): void {
    this.props.questions?.splice(
      this.props.questions?.findIndex((item) => item.id === id),
      1
    );
  }

  listAlternativesByQuestionId(id: string): IAlternativeProps[] {
    const question = this.questions.find((item) => item.id === id);
    return question?.alternatives || [];
  }
}

export { Test };
