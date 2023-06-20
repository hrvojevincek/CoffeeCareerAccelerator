import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Employers {
  static async create(
    id: number,
    name: string,
    logoUrl: string,
    website: string,
    location: string
  ): Promise<Employers> {
    const employer = await prisma.employer.create({
      data: {
        id,
        name,
        logoUrl,
        website,
        location,
      },
    });
    return employer;
  }

  static async getAll(): Promise<Employers[]> {
    const employers = await prisma.employer.findMany();
    return employers;
  }
}

export default Employers;
