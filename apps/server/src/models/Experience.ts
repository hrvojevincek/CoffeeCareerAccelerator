import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Experience {
  static async createExp(
    jobtitle: string,
    company: string,
    dates: string,
    description: string,
    userId: number
  ): Promise<Partial<Experience | null>> {
    const experience = await prisma.experience.create({
      data: {
        jobtitle,
        company,
        dates,
        description,
        userId,
      },
    });
    return experience;
  }

  static async getAll(userId: number): Promise<Experience[]> {
    const exp = await prisma.experience.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    return exp;
  }
}

export default Experience;
