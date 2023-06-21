import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Employers {
  static async createEmployer(
    username: 'string',
    password: string,
    email: string
  ): Promise<Partial<Employers>> {
    const employer = await prisma.employer.create({
      data: {
        username,
        password,
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return employer;
  }

  static async getAll(): Promise<Employers[]> {
    const employers = await prisma.employer.findMany();
    return employers;
  }

  static async updateEmployer(
    employerId: number,
    employerName: string,
    logoUrl: string,
    website: string,
    location: string
  ): Promise<Employers> {
    const employer = await prisma.employer.update({
      where: {
        id: employerId,
      },
      data: {
        name: employerName,
        logoUrl,
        website,
        location,
      },
    });
    return employer;
  }

  static async getEmployer(id: number): Promise<Employers> {
    const employer = await prisma.employer.findUnique({
      where: { id },
    });
    if (employer === null) {
      throw new Error('User not found');
    }
    return employer;
  }
}

export default Employers;
