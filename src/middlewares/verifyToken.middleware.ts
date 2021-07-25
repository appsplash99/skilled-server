import jwt from 'jsonwebtoken';
import consola from 'consola';
import { jwtSecret } from '../config/constants';
import { IRequest, IResponse, INextFunction } from '../interfaces/express.interface';
/**
 * To all private/protected routes
 * pass the below function as a middleware
 */

export const verifyToken = (req: IRequest, res: IResponse, next: INextFunction) => {
  // consuming token at each request from request headers
  // const token = req.header('auth-token')

  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access Denied');

  try {
    // verifying token passsed by user
    // in comparison with server's .env TOKEN_SECRET
    const verifiedUser = jwt.verify(token, jwtSecret);

    // inject user: userId key-value pair in request
    req.userId = verifiedUser;
    return next();
  } catch (error) {
    consola.error(new Error('Invalid Token'), error);
    return res.status(401).json({ success: false, messgge: 'Unauthorized User' });
  }
};
