import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usersRepository } from '../repository/users.repository.js';
import { sessionRepository } from '../repository/sessions.repository.js';

const signUp = async (name, email, password) => {
  const userEmailExists = await usersRepository.findUser(email);
  if (userEmailExists) throw new Error(httpStatus.CONFLICT);

  const userData = { name, email, password: bcrypt.hashSync(password, 10) };
  await usersRepository.insertOneUser(userData);
};
const signIn = async (email, password) => {
  const user = await usersRepository.findUser(email);
  if (!user) throw new Error(httpStatus.NOT_FOUND);

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) throw new Error(httpStatus.UNAUTHORIZED);

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');
  await sessionRepository.createSession(user, token);
  return { token };
};
const logout = async (userId) => {
  await sessionRepository.deleteSession(userId);
};
export const authService = {
  signUp,
  signIn,
  logout,
};
