import { NextFunction, Request, Response } from "express";

async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization;

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.body.token = token;

    console.log("TOKEN");

    next();
  } else {
    res.sendStatus(403).json({ error: "fix it" });
  }
}

export default checkToken;
