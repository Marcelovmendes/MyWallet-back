import httpStatus from "http-status";
import { sessionRepository } from "../repository/sessions.repository.js";
import { usersRepository } from "../repository/users.repository.js";
import { transactionsRepository } from "../repository/transactions.repository.js";

const createTransactions = async (token, date, body, tipo) => {
  const { session } = checkSession(token);
  const userId = session.userId;
  const transactions = await transactionsRepository.createTransactions(
    userId,
    date,
    body,
    tipo
  );
  return transactions;
};
const findManyTransactions = async (token) => {
  const { session } = checkSession(token);
  const transactions = await transactionsRepository.findManyTransactions(
    session.userId
  );
  if (!transactions.lenght) throw new Error(httpStatus.UNPROCESSABLE_ENTITY);
  return transactions;
};

const checkSession = async (token) => {
  const session = await sessionRepository.findOneSession(token);
  if (!session) throw new Error(httpStatus.UNAUTHORIZED);
  const user = await usersRepository.findUserBySession(session.userId);
  if (!user) throw new Error(httpStatus.NOT_FOUND);
  return session;
};
export const trasactionsService = {
  createTransactions,
  findManyTransactions,
};
