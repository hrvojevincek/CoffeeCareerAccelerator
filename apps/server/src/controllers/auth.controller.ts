import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateTokenAndSetCookie } from "../lib/generateToken";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const { password, username, email, category } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, email, category },
    });

    if (newUser) {
      generateTokenAndSetCookie(String(newUser.id), res);

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        category: newUser.category,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(String(user.id), res);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      category: user.category,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET as string)
    ) as {
      userId: string;
    };

    if (!decoded) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate new tokens
    generateTokenAndSetCookie(decoded.userId, res);

    res.status(200).json({
      message: "Token refreshed successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        category: user.category,
      },
    });
  } catch (error) {
    console.log("Error in refreshToken controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
