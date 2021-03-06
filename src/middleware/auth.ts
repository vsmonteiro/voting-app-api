import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

interface TokenPayload {
  tokenId: number;
  iat: number;
  exp: number;
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "");
    const { tokenId } = data as TokenPayload;

    const fetchedToken = await prisma.token.findUnique({
      where: {
        id: tokenId
      },
      include: {
        user: true
      }
    });

    if(!fetchedToken || !fetchedToken.valid || fetchedToken.expiration < new Date()) {
      return res.sendStatus(401);
    }

    req.userId = tokenId;
    return next();
  }
  catch(error) {
    return res.sendStatus(401);
  }
}