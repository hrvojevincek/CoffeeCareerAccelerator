import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { atob } from 'buffer';

const saltRounds = 10;

const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password, saltRounds);
};
const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

const getUserFromBearerAuth = (authorization: string) => {
  const [username, password] = atob(authorization).split(':');
  return { username, password };
};

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '90000s',
  });
};

const checkToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export {
  hashPassword,
  checkPassword,
  getUserFromBearerAuth,
  generateToken,
  checkToken,
};
