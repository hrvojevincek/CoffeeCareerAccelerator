import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class Jobs {
  static async create(
    title: string,
    categories: string,
    description: string,
    location: string,
    money: string,
    employerId?: number
  ): Promise<Jobs> {
    const job = await prisma.job.create({
      data: {
        title,
        categories,
        description,
        location,
        money,
        employer: {
          connect: { id: employerId },
        },
      },
    });
    return job;
  }

  static async getAll(): Promise<Jobs[]> {
    const jobs = await prisma.job.findMany({
      include: {
        employer: true,
      },
    });
    return jobs;
  }

  static async getJob(id: number): Promise<Jobs> {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: true,
      },
    });
    return job as unknown as Jobs;
  }

  static async deleteJob(id: number): Promise<Jobs> {
    const job = await prisma.job.delete({
      where: { id },
    });
    return job;
  }

  static async findByCategory(category: string): Promise<Jobs[]> {
    return (await prisma.job.findMany({
      where: {
        categories: category,
      },
      include: {
        employer: true,
      },
    })) as unknown as Jobs[];
  }
}

export default Jobs;
