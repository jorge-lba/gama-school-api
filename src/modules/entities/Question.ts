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

  private includeAlternative(text: string, isCorrect: boolean): void {
    this.props.alternatives?.push({
      alternative: Alternative.create({ text }),
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
}

export { Question };
