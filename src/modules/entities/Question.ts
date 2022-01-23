import { Entity } from "../../core/domain/Entity";
import { Alternative } from "./Alternative";

interface IAlternative {
  alternative: Alternative;
  isCorrect: boolean;
}
interface IQuestionProps {
  statement: string;
  alternatives?: IAlternative[];
}

interface IAlternativeValues {
  text: string;
  isCorrect: boolean;
}
interface IQuestionValues {
  id?: string;
  statement: string;
  alternatives: IAlternativeValues[] | [];
}

class Question extends Entity<IQuestionProps> {
  private constructor(props: IQuestionProps, id?: string) {
    super(props, id);
  }

  get statement(): string {
    return this.props.statement;
  }

  get alternatives(): IAlternative[] {
    return this.props.alternatives || [];
  }

  get values(): IQuestionValues {
    return {
      statement: this.statement,
      alternatives: this.alternatives.map((item) => ({
        text: item.alternative.value,
        isCorrect: item.isCorrect,
      })),
    };
  }

  static create(props: IQuestionProps, id?: string): Question {
    return new Question(
      {
        statement: props.statement,
        alternatives: props.alternatives || [],
      },
      id
    );
  }

  private alternativeAlreadyExists(alternative: Alternative) {
    if (
      this.alternatives.find((item) => item.alternative.equals(alternative)) !==
      undefined
    )
      throw new Error(`Alternative "${alternative.value}" already exists`);
  }

  private includeAlternative(text: string, isCorrect: boolean): void {
    const alternative = Alternative.create(text);

    this.alternativeAlreadyExists(alternative);

    this.props.alternatives?.push({
      alternative,
      isCorrect,
    });
  }

  includeIncorrectAlternatives(alternatives: string[]): void {
    alternatives.map((alternative) =>
      this.includeAlternative(alternative, false)
    );
  }

  includeCorrectAlternatives(alternatives: string[]): void {
    alternatives.map((alternative) =>
      this.includeAlternative(alternative, true)
    );
  }

  removeAlternative(alternative: Alternative): void {
    const index = this.alternatives.findIndex((item) =>
      item.alternative.equals(alternative)
    );
    this.props.alternatives?.splice(index, 1);
  }

  equalsStatement(question: Question): boolean {
    return this.statement === question.statement;
  }

  countCorrectAlternatives(): number {
    return this.alternatives.filter((item) => item.isCorrect).length;
  }

  countIncorrectAlternatives(): number {
    return this.alternatives.filter((item) => !item.isCorrect).length;
  }
}

export { Question, IAlternativeValues, IAlternative, IQuestionValues };
