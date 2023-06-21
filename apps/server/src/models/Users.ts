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

  static async getAllUsers(): Promise<User> {
    const users = await prisma.user.findMany();
    return users;
  }
}

export default User;
