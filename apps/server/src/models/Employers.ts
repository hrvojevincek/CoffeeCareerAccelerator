import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Employers {
  static async create(
    id: number,
    name: string,
    logoUrl: string,
    website: string
  ): Promise<Employers> {
    const job = await prisma.employer.create({
      data: {
        id,
        name,
        logoUrl,
        website,
      },
    });
    return job;
  }

  static async getAll(): Promise<Employers[]> {
    const employers = await prisma.employer.findMany();
    return employers;
  }
}

export default Employers;
