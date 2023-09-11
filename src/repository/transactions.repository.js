import { db } from '../database/serverData.js';
const createTransactions = async (tipo, body, date, userId) => {
  const transaction = await db
    .collection('transactions')
    .insertOne({ tipo, ...body, date, userId: userId });
  return transaction;
};
const findManyTransactions = async (userId) => {
  const transaction = await db
    .collection('transactions')
    .find({ userId })
    .toArray();
  return transaction;
};
export const transactionsRepository = {
  createTransactions,
  findManyTransactions,
};
