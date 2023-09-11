import httpStatus from 'http-status';
import { transactionsRepository } from '../repository/transactions.repository.js';
import dayjs from 'dayjs';
const createTransactions = async (tipo, body, userId) => {
  const date = dayjs().format('DD/MM');
  const transactions = await transactionsRepository.createTransactions(
    tipo,
    body,
    date,
    userId,
  );
  return transactions;
};
const findManyTransactions = async (userId) => {
  const transactions =
    await transactionsRepository.findManyTransactions(userId);
  if (!transactions.length)
    return new Error(httpStatus.UNPROCESSABLE_ENTITY, 'Transactions not found');
  return transactions;
};

export const trasactionsService = {
  createTransactions,
  findManyTransactions,
};
