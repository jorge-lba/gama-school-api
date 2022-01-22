import { Entity } from "../../core/domain/Entity";

interface IQuestionProps {
  statement: string;
}

class Question extends Entity<IQuestionProps> {
  private constructor(props: IQuestionProps, id?: string) {
    super(props, id);
  }

  get statement(): string {
    return this.props.statement;
  }

  static create(props: IQuestionProps, id?: string): Question {
    return new Question(props, id);
  }
}

export { Question };
