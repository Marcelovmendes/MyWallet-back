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
    if (!token) return res.status(401).send("Unauthorized" );
    if (tipo === undefined)
      return res.status(422).send( "invalid parameter" );
  
    const schema = Joi.object({
      value: Joi.number().positive().required(),
      message: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send( "Unprocessable Entity" );
  
    try {
      const session = await db.collection("sessions").findOne({ token });
      if (!session) return res.status(401).send("Unauthorized" );
      const user = await db.collection("Users").findOne({ _id: session.userId });
      if (!user) return res.status(404).send("Not Found" );
      await db.collection("transactions").insertOne({ tipo, ...value, date, userId:session.userId });
      console.log({ tipo, ...value, date });
      res.status(201).send( "Transaction success");
    } catch (err) {
      res.status(500).send("Server Internal Error" );
    }
  };
export async function getTransactions (req, res){
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Unauthorized" );
    console.log("token",token)
    try {
      const session = await db.collection("sessions").findOne({ token });
      if (!session) return res.status(401).send("Unauthorized" );
      const user = await db.collection("Users").findOne({ _id: session.userId });
      if (!user) return res.status(404).send( "Not Found" );
      const transactions = await db.collection("transactions").find({userId: session.userId}).toArray();
      console.log(transactions)
      if (transactions.length === 0)
        return res.status(422).send("No transactions registered");
  
      res.send(transactions);
    } catch (err) {
      res.status(500).send( "Server Internal Error ");
    }
  };