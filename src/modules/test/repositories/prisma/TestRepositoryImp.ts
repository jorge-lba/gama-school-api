import { Prisma, Test as TestModel } from "@prisma/client";

import { PrismaDatabase } from "../../../../infra/prisma";
import { PersistenceQuestionDTO } from "../../DTOs/PersistenceQuestion";
import { Test } from "../../entities/Test";
import { TestMap } from "../../mappers/TestMap";
import { TestRepository } from "../TestRepository";

class TestRepositoryImp implements TestRepository {
  private testModel: Prisma.TestDelegate<TestModel>;

  constructor(prismaDatabase: PrismaDatabase) {
    this.testModel = prismaDatabase.prisma.test;
  }

  async getTestById(testId: string): Promise<Test> {
    const test = await this.testModel.findUnique({
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

    return TestMap.toDomain({
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
    });
  }

  async exists(test: Test): Promise<boolean> {
    const exists = await this.testModel.findUnique({
      where: {
        id: test.id,
      },
      select: {
        id: true,
      },
    });

    return !!exists;
  }

  delete(t: Test): Promise<any> {
    throw new Error("Method not implemented.");
  }

  private makeQueryToCreateAlternatives(question: PersistenceQuestionDTO) {
    return question.alternatives.map((alternative) => ({
      id: alternative.id,
      text: alternative.text,
      isCorrect: alternative.isCorrect,
    }));
  }

  async save(test: Test): Promise<{ id: string }> {
    const value = TestMap.toPersistence(test);
    const questionConnections = value.questions.map((question) => ({
      question: {
        create: {
          id: question.id,
          statement: question.statement,
          alternatives: {
            create: this.makeQueryToCreateAlternatives(question),
          },
        },
      },
    }));

    const testAlreadyExists = await this.exists(test);

    if (testAlreadyExists) {
      const connectOrCreate = value.questions.map((question) => ({
        where: {
          testId_questionId: {
            questionId: question.id,
            testId: test.id,
          },
        },
        create: {
          question: {
            create: {
              id: question.id,
              statement: question.statement,
              alternatives: {
                create: this.makeQueryToCreateAlternatives(question),
              },
            },
          },
        },
        update: {
          question: { connect: { id: question.id } },
        },
      }));

      const persistence = await this.testModel.update({
        where: {
          id: test.id,
        },
        data: {
          title: value.title,
          questions: { upsert: connectOrCreate },
        },
      });

      return { id: persistence.id };
    } else {
      const persistence = await this.testModel.create({
        data: {
          id: value.id,
          title: value.title,
          questions: {
            create: questionConnections,
          },
        },
      });

      return { id: persistence.id };
    }
  }
}

export { TestRepositoryImp };
