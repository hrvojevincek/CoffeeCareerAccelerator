import { PrismaClient, Application } from '@prisma/client';

const prisma = new PrismaClient();

class Applications {
  static async createApplication(
    jobId: number,
    userId: number
  ): Promise<Partial<Application | null>> {
    const application = await prisma.application.create({
      data: {
        jobId,
        userId,
      },
    });
    return application;
  }
}

export default Applications;
