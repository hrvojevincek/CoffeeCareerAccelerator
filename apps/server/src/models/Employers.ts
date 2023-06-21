import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Employers {
  static async createEmployer(
    username: 'string',
    password: string,
    email: string
  ): Promise<Employers> {
    const employer = await prisma.employer.create({
      data: {
        username,
        password,
        email,
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
