import { Entity } from "../../core/domain/Entity";
import { Alternative } from "./Alternative";
import { IQuestionValues, Question } from "./Question";

interface ITestProps {
  title: string;
  questions?: Question[];
}

interface IAddQuestionProps {
  statement: string;
  correctAlternatives: string[];
  incorrectAlternatives: string[];
}

interface ITestValues {
  id?: string;
  title: string;
  questions?: IQuestionValues[];
}

class Test extends Entity<ITestProps> {
  private constructor(props: ITestProps, id?: string) {
    super(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  get questions(): Question[] {
    return this.props.questions || [];
  }

  get values(): ITestValues {
    return {
      title: this.title,
      questions: this.questions.map((item) => item.values),
    };
  }

  static create(props: ITestProps, id?: string): Test {
    return new Test(
      {
        title: props.title,
        questions: props.questions || [],
      },
      id
    );
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

  listAlternativesByQuestionId(id: string): Alternative[] {
    const question = this.questions.find((item) => item.id === id);
    return question?.alternatives || [];
  }

  countQuestions(): number {
    return this.props.questions?.length || 0;
  }
}

export { Test, ITestValues };
