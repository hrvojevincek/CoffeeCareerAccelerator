import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ! DO KOKIES IN SESSION - as youll have clerk

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        category: true,
        name: true,
        surname: true,
        city: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protectRoute middleware", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
