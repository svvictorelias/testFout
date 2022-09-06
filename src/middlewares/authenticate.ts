const { verify } = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";

interface IUserJwt {
  id: string;
}



export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  

  if (!authHeader) {
    return res.status(401).send({ error: "Token missing!" });
  }

  try {
  const [, token] = authHeader.split(" ");
  
    const decoded = verify(token, process.env.JWT_SECRET) as IUserJwt;

    req.user = {
      id: decoded.id
    };

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token invalid!" });
  }
};
