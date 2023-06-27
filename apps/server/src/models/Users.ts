import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
  static async createUser(
    username: string,
    password: string,
    email: string,
    category: string
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
        category,
      },
    });
    return user;
  }

  static async findUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        password: true,
        id: true,
      },
    });
    return user;
  }

  static async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  static async getUser(userId: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        experience: true,
        applications: true,
      },
    });
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateUser(
    userId: number,
    email: string,
    name: string,
    surname: string,
    city: string,
    bio: string
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
        surname,
        city,
        bio,
      },
    });
    return user;
  }
  static async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        category: true,
      },
    });
    if (user === null) {
      throw new Error('User does not exist.');
    }
    return user;
  }
}

export default User;
