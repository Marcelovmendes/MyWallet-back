import httpStatus from 'http-status';
import { trasactionsService } from '../services/trasactionsService.js';

export async function postTransactions(req, res) {
  const { tipo } = req.params;
  const { body } = req;
  const { userId } = res.locals;
  if (tipo === undefined)
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send('invalid parameter');
  try {
    await trasactionsService.createTransactions(tipo, body, userId);
    return res.status(httpStatus.CREATED).send('Transaction success');
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function getTransactions(req, res) {
  const { userId } = res.locals;
  try {
    const transactions = await trasactionsService.findManyTransactions(userId);
    res.send(transactions);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
