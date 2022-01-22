import { Entity } from "../../core/domain/Entity";

interface IAlternativeProps {
  text: string;
}

class Alternative extends Entity<IAlternativeProps> {
  private constructor(props: IAlternativeProps, id?: string) {
    super(props, id);
  }

  get text(): string {
    return this.props.text;
  }

  static create(props: IAlternativeProps, id?: string): Alternative {
    return new Alternative(props, id);
  }
}

export { Alternative };
