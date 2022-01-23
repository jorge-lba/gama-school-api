class Alternative {
  private readonly text: string;

  private constructor(text: string) {
    this.text = text;
  }

  get value(): string {
    return this.text;
  }

  static create(text: string): Alternative {
    return new Alternative(text);
  }

  equals(alternative: Alternative): boolean {
    return this.text === alternative.value;
  }
}

export { Alternative };
