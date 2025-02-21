import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// TODO: verify the token exists and add the user data to the request object
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers['authorization'];
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECREY_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401);
  }
};
