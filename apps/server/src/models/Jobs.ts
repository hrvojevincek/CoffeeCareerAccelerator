import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class Jobs {
  static async create(
    id: number,
    title: string,
    description: string,
    location: string,
    employerId: number
  ): Promise<Jobs> {
    const job = await prisma.job.create({
      data: {
        id,
        title,
        description,
        location,
        employerId,
      },
    });
    return job;
  }

  static async getAll(): Promise<Jobs[]> {
    const jobs = await prisma.job.findMany();
    return jobs;
  }
}

export default Jobs;
