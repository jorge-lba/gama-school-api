import {
  Prisma,
  Test as TestModel,
  Alternative as AlternativeModel,
} from "@prisma/client";

import { PrismaDatabase } from "../../../../infra/prisma";
import { Test } from "../../entities/Test";
import { TestMap } from "../../mappers/TestMap";
import { TestRepository } from "../TestRepository";

class TestRepositoryImp implements TestRepository {
  private testModel: Prisma.TestDelegate<TestModel>;
  private alternativeModel: Prisma.AlternativeDelegate<AlternativeModel>;

  constructor(prismaDatabase: PrismaDatabase) {
    this.testModel = prismaDatabase.prisma.test;
    this.alternativeModel = prismaDatabase.prisma.alternative;
  }

  getTestById(testId: string): Promise<Test> {
    const test = this.testModel.findUnique({
      where: {
        id: testId,
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                alternatives: true,
              },
            },
          },
        },
      },
    });

    return test.then((test) =>
      TestMap.toDomain({
        id: test!.id,
        title: test!.title,
        questions: test!.questions.map((question) => ({
          id: question.question.id,
          statement: question.question.statement,
          alternatives: question.question.alternatives.map((alternative) => ({
            id: alternative.id,
            text: alternative.text,
            isCorrect: alternative.isCorrect,
            questionId: alternative.questionId,
          })),
        })),
      })
    );
  }

  exists(t: Test): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(t: Test): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async save(test: Test): Promise<{ id: string }> {
    const value = TestMap.toPersistence(test);
    const questionConnections = value.questions.map((question) => ({
      question: {
        create: {
          id: question.id,
          statement: question.statement,
        },
      },
    }));
    const persistence = await this.testModel.create({
      data: {
        id: value.id,
        title: value.title,
        questions: {
          create: questionConnections,
        },
      },
    });

    const alternatives = value.questions
      .map((question) => question.alternatives)
      .flat();
    await this.alternativeModel.createMany({
      data: alternatives,
    });

    return { id: persistence.id };
  }
}

export { TestRepositoryImp };
