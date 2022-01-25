import { Repository } from "../../core/domain/Repository";
import { Test } from "../entities/Test";

interface TestRepository extends Repository<Test> {
  getTestById(testId: string): Promise<Test>;
}

export { TestRepository };
