import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// type Employer = {
//   username: string;
//   password: string;
//   email: string;
//   category: string;
// };

class Employers {
  static async createEmployer(
    username: string,
    password: string,
    email: string,
    category: string
  ): Promise<Partial<Employers>> {
    const employer = await prisma.employer.create({
      data: {
        username,
        password,
        email,
        category,
      },
      select: {
        id: true,
        username: true,
        email: true,
        category: true,
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

  static async findEmployerByUsername(username: string) {
    const employer = await prisma.employer.findUnique({
      where: {
        username,
      },
      select: {
        password: true,
        id: true,
      },
    });
    return employer;
  }

  static async findById(id: number): Promise<Employers | null> {
    const employer = await prisma.employer.findUnique({
      where: { id },
      select: {
        username: true,
        category: true,
      },
    });
    if (employer === null) {
      throw new Error('User does not exist.');
    }
    return employer;
  }
}

export default Employers;
