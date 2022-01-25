import { Entity } from "../../core/domain/Entity";
import { Alternative } from "./Alternative";

interface IQuestionProps {
  statement: string;
  alternatives?: Alternative[];
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

  get alternatives(): Alternative[] {
    return this.props.alternatives || [];
  }

  get values(): IQuestionValues {
    return {
      id: this.id,
      statement: this.statement,
      alternatives: this.alternatives.map((alternative) => alternative.value),
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
      this.alternatives.find((item) => item.equals(alternative)) !== undefined
    )
      throw new Error(`Alternative "${alternative.value.text}" already exists`);
  }

  private includeAlternative(text: string, isCorrect: boolean): void {
    const alternative = Alternative.create(text, isCorrect);

    this.alternativeAlreadyExists(alternative);

    this.props.alternatives?.push(alternative);
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
      item.equals(alternative)
    );
    this.props.alternatives?.splice(index, 1);
  }

  equalsStatement(question: Question): boolean {
    return this.statement === question.statement;
  }

  countCorrectAlternatives(): number {
    return this.alternatives.filter((item) => item.value.isCorrect).length;
  }

  countIncorrectAlternatives(): number {
    return this.alternatives.filter((item) => !item.value.isCorrect).length;
  }
}

export { Question, IAlternativeValues, IQuestionValues };
