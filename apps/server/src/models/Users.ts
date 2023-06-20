import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
  static async create(
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
}

export default User;
