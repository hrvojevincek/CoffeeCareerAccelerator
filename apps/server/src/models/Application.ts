import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Application {
  static async createApplication(data: {
    jobId: number;
    userId: number;
  }): Promise<Partial<Application | null>> {
    const existingApplication = await prisma.application.findUnique({
      where: { userId_jobId: { userId: data.userId, jobId: data.jobId } },
    });
    if (existingApplication) {
      throw new Error('Application already exists for this user and job');
    }

    const application = await prisma.application.create({
      data: {
        job: {
          connect: {
            id: data.jobId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
    return application;
  }
}

export default Application;
