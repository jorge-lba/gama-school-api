import { Entity } from "../../core/domain/Entity";
import { Alternative } from "./Alternative";

interface IQuestionProps {
  statement: string;
  alternatives?: Alternative[];
}

class Question extends Entity<IQuestionProps> {
  private constructor(props: IQuestionProps, id?: string) {
    super(props, id);
    this.props.alternatives = [];
  }

  get statement(): string {
    return this.props.statement;
  }

  get alternatives(): Alternative[] {
    return this.props.alternatives || [];
  }

  static create(props: IQuestionProps, id?: string): Question {
    return new Question(props, id);
  }

  includeIncorrectAlternatives(alternatives: string[]): void {
    const incorrectAlternatives = alternatives.map((alternative) =>
      Alternative.create({ text: alternative })
    );

    this.props.alternatives = this.props.alternatives?.concat(
      incorrectAlternatives
    );
  }
}

export { Question };
