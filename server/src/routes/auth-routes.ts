import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; //password hashing

// TODO: If the user exists and the password is correct, return a JWT token
export const login = async (req: Request, res: Response) => {
   const { username, password } = req.body;

  let user;
  
  try {
    user = await User.findOne({
      where: { username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  let passwordIsValid;

try {
    passwordIsValid = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json ({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login); 

export default router;
