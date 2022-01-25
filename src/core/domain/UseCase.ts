interface UseCase<T> {
  execute(t: T): Promise<any>;
}

export { UseCase };
