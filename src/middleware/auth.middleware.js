import httpStatus from 'http-status';
import { db } from '../database/serverData.js';
import { sessionRepository } from '../repository/sessions.repository.js';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    throw new Error(httpStatus.UNAUTHORIZED, 'Authorization not found');

  const token = authorization?.replace('Bearer ', '');
  if (!token) throw new Error(httpStatus.UNAUTHORIZED, 'Token not found');
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const session = await sessionRepository.findOneSession(token);
    if (!session) throw new Error(httpStatus.UNAUTHORIZED, 'Session not found');
    res.locals.userId = session.userId;
    next();
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
};
