import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/Users';
import Employers from '../models/Employers';
import jwt from 'jsonwebtoken';
import Cookie from 'universal-cookie';

dotenv.config();

const TypeController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body.data;

      if (!username || !password) {
        throw new Error('Missing parameters');
      }

      const user = await User.findUserByUsername(username);
      if (user) {
        // It's a user login
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Set the user information in a JWT token
        const userData = { username, category: 'user', id: user.id };
        // const token = jwt.sign(userData, process.env.JWT_SECRET as string, {
        //   expiresIn: '1h',
        // });
        // Create a new instance of the Cookie class
        // const cookies = new Cookie(req.headers.cookie);

        // Set the cookie with the JWT token
        // cookies.set('userInfo', token, { maxAge: 3600, httpOnly: true });

        // Send the response
        res.status(200).json(userData);
        //OK
      } else {
        // Check if the username is in the Employers table
        const employer = await Employers.findEmployerByUsername(username);
        if (employer) {
          // It's an employer login
          const isPasswordValid = await bcrypt.compare(
            password,
            employer.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Set the employer information in a JWT token
          const employerData = {
            username,
            category: 'employer',
            id: employer.id,
          };
          const token = jwt.sign(
            employerData,
            process.env.JWT_SECRET as string,
            {
              expiresIn: '1h',
            }
          );

          // Create a new instance of the Cookie class
          const cookies = new Cookie(req.headers.cookie);

          // Set the cookie with the JWT token
          cookies.set('userInfo', token, { maxAge: 3600, httpOnly: true });

          // Send the response
          res.status(200).json(employerData);
        } else {
          throw new Error('Invalid username');
        }
      }
    } catch (e) {
      next(e);
    }
  },

  async authVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.body;
      const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as {
        userId: string;
      };
      if (!userId) {
        throw new Error('userId missing from token');
      }

      const userInfo = await User.findById(parseInt(userId));
      if (userInfo) {
        res.status(201);
        res.json(userInfo);
        return;
      }
      const employerInfo = await Employers.findById(parseInt(userId));
      if (employerInfo) {
        res.status(201);
        res.json(employerInfo);
        return;
      }
      throw new Error('user/employer doesnt exist');
    } catch (e) {
      next(e);
    }
  },
};

export default TypeController;
