import { v4 as uuid } from "uuid";

interface AlternativeValues {
  id: string;
  text: string;
  isCorrect: boolean;
}
class Alternative {
  private readonly id: string;
  private readonly text: string;
  private readonly isCorrect: boolean;

  private constructor(text: string, isCorrect: boolean, id?: string) {
    this.id = id || uuid();
    this.text = text;
    this.isCorrect = isCorrect;
  }

  get value(): AlternativeValues {
    return {
      id: this.id,
      text: this.text,
      isCorrect: this.isCorrect,
    };
  }

  static create(text: string, isCorrect: boolean, id?: string): Alternative {
    return new Alternative(text, isCorrect || false, id);
  }

  equals(alternative: Alternative): boolean {
    return this.text === alternative.value.text;
  }
}

export { Alternative };
