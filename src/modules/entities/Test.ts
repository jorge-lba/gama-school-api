import { Entity } from "../../core/domain/Entity";
import { Question } from "./Question";

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

  addQuestion(question: IAddQuestionProps): void {
    const newQuestion = Question.create({
      statement: question.statement,
    });

    newQuestion.includeCorrectAlternatives(question.correctAlternatives);
    newQuestion.includeIncorrectAlternatives(question.incorrectAlternatives);

    this.props.questions?.push(newQuestion);
  }
}

export { Test };
