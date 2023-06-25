import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
  static async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
    return user;
  }

  static async findUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  static async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  static async getUser(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateUser(
    userId: number,
    userName: string,
    city: string
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: userName,
        city,
      },
    });
    return user;
  }
}

export default User;
