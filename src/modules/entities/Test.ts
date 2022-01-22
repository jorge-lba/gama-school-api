import { Entity } from "../../core/domain/Entity";

interface ITestProps {
  title: string;
}

class Test extends Entity<ITestProps> {
  private constructor(props: ITestProps, id?: string) {
    super(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  static create(props: ITestProps, id?: string): Test {
    return new Test(props, id);
  }
}

export { Test };
