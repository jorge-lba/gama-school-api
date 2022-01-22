import { Entity } from "../../core/domain/Entity";
import { Alternative } from "./Alternative";

interface IAlternativeProps {
  alternative: Alternative;
  isCorrect: boolean;
}
interface IQuestionProps {
  statement: string;
  alternatives?: IAlternativeProps[];
}

class Question extends Entity<IQuestionProps> {
  private constructor(props: IQuestionProps, id?: string) {
    super(props, id);
    this.props.alternatives = [];
  }

  get statement(): string {
    return this.props.statement;
  }

  get alternatives(): IAlternativeProps[] {
    return this.props.alternatives || [];
  }

  static create(props: IQuestionProps, id?: string): Question {
    return new Question(props, id);
  }

  includeIncorrectAlternatives(alternatives: string[]): void {
    const incorrectAlternatives = alternatives.map((alternative) => ({
      alternative: Alternative.create({ text: alternative }),
      isCorrect: false,
    }));

    this.props.alternatives = this.props.alternatives?.concat(
      incorrectAlternatives
    );
  }

  includeCorrectAlternatives(alternatives: string[]): void {
    const correctAlternatives = alternatives.map((alternative) => ({
      alternative: Alternative.create({ text: alternative }),
      isCorrect: true,
    }));

    this.props.alternatives =
      this.props.alternatives?.concat(correctAlternatives);
  }
}

export { Question };
