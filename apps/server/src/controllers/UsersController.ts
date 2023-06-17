// import { NextFunction, Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import User from '../models/Users';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// const UsersController = {
//   async createUser(req: Request, res: Response, next: NextFunction) {
//     try {
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith('Basic ')) {
//         res.status(401).json({ error: 'Unauthorized' });
//         return;
//       }
//       const credentials = Buffer.from(
//         authHeader.split(' ')[1],
//         'base64'
//       ).toString();
//       const [username, password] = credentials.split(':');
//       if (username === undefined) {
//         throw new Error('Missing parameters: username');
//       }
//       if (password === undefined) {
//         throw new Error('Missing parameters: password');
//       }
//       const hashPassword = await bcrypt.hash(password, 10);
//       const user = await User.create(username, hashPassword);
//       res.status(201).json(User);
//     } catch (e) {
//       next(e);
//     }
//   },
//   //!==============================================================LOGIN USER
//   async loginUser(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     try {
//       const authHeader = req.headers.authorization
//       if (!authHeader || !authHeader.startsWith('Basic ')) {
//         res.status(401).json({ error: 'Unauthorized' })
//         return
//       }
//       const credentials = Buffer.from(
//         authHeader.split(' ')[1],
//         'base64'
//       ).toString()
//       const [username, password] = credentials.split(':')
//       const user = await prisma.user.findUnique({
//         where: { username },
//         select: {
//           password: true,
//           username: true,
//           id: true,
//         },
//       })
//       if (
//         user &&
//         (await bcrypt.compare(password, user.password)) &&
//         user?.username === username
//       ) {
//         const secret = process.env.SECRET_SIGN as string

//         if (!secret) {
//           throw new Error('missing secret in .env')
//         }

//         const token = jwt.sign({ userId: user.id }, secret, {
//           expiresIn: '1h',
//         })
//         res.status(201).json({ username, token })
//       } else {
//         res.status(401).json({ error: 'incorrect authentification' })
//       }
//     } catch (e) {
//       next(e)
//     }
//   },

// function getUser() {}
// function getUsers() {}
// function updateUser() {}
// function deleteUser() {}
// function createExperience() {}
// function getExperience() {}
// function updateExperience() {}
// function deleteExperience() {}
// };

// export default UsersController
