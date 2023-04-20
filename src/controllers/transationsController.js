import {db} from "../database/serverData.js"
import dayjs from "dayjs"
import Joi from "joi" 

export async function postTransactions(req, res) {
    const { tipo } = req.params;
    const { authorization } = req.headers;
    console.log(tipo);
    console.log(authorization);
    const token = authorization?.replace("Bearer ", "");
    const date = dayjs().format("DD/MM");
    if (!token) return res.status(401).send({ message: "Unauthorized" });
    if (tipo === undefined)
      return res.status(422).send({ message: "invalid parameter" });
  
    const schema = Joi.object({
      value: Joi.number().positive().required(),
      message: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: tipo });
    if (error) return res.status(422).send({ message: "Unprocessable Entity" });
  
    try {
      await db.collection("transactions").insertOne({ tipo, ...value, date });
      console.log({ tipo, ...value, date });
      res.status(201).send({ message: "Transaction success" });
    } catch (err) {
      res.status(500).send({ message: "Server Internal Error" });
    }
  };
export async function getTransactions (req, res){
    const { Authorization } = req.header;
    const token = Authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ message: "Unauthorized" });
  
    try {
      const transactions = await db.collection("transactions").find().toArray();
      if (transactions.length === 0)
        return res.status(422).send({ message: "No transactions registered" });
  
      res.send(transactions);
    } catch (err) {
      res.status(500).send({ message: "Server Internal Error " });
    }
  };