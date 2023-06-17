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

  // static async update(id: number, newUsername: string): Promise<User> {
  //   const { username } = await prisma.user.update({
  //     where: { id },
  //     data: { username: newUsername },
  //   });
  //   return User;
  // }

  // static async findById(id: number): Promise<User | null> {
  //   const record = await prisma.user.findUnique({
  //     where: { id },
  //     include: {
  //       following: true,
  //       attending: true,
  //     },
  //   });
  //   if (record === null) {
  //     throw new Error('User does not exist.');
  //   }
  //   const { username } = record;
  //   return record;
  // }

  //   static async findByUsername(username: string): Promise<User | null> {
  //     const record = await prisma.user.findUnique({
  //       where: { username },
  //       include: {
  //         following: true,
  //         attending: true,
  //       },
  //     })
  //     if (record === null) {
  //       throw new Error('User does not exist.')
  //     }
  //     const { id, following, attending } = record
  //     return new User(id, username, following, attending)
  //   }
}

export default User;
