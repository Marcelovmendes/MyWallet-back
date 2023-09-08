import dayjs from "dayjs";
import httpStatus from "http-status";
import { trasactionsService } from "../services/trasactionsService.js";

export async function postTransactions(req, res) {
  const { tipo } = req.params;
  const { token } = res.locals;
  const { body } = req;
  const date = dayjs().format("DD/MM");
  if (tipo === undefined)
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send("invalid parameter");
  try {
    await trasactionsService.createTransactions(token, date, body);
    res.status(httpStatus.CREATED).send("Transaction success");
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function getTransactions(res) {
  const { token } = res.locals;
  try {
    const transactions = await trasactionsService.findManyTransactions(token);
    res.send(transactions);
  } catch (err) {
    res.status(500).send("Server Internal Error ");
  }
}
