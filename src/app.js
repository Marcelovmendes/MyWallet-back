import express from "express";
import { MongoClient, MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import Joi from "joi";

const server = express();

server.use(cors());
server.use(express.json());
dotenv.config();

const MongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await MongoClient.connect();
} catch (err) {
  console.log(err.message);
}
const db = MongoClient.db();

const schemaRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.email().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/).required(),
});
server.post("/cadastro", async (req, res) => {
  try {
    const { error, value } = schemaRegister.validate(req.body);
    const { name, email, password } = value;

    if (error) return res.status(422).send(error.details[0].message);

    const userEmailExists = await db.collection("Registers").findOne({ email });
    if (userEmailExists) return res.status(409).send({ message: "Conflict" }); //"Este email já está cadastrado"

    const userData = { name, email, password };
    await db.collection("Registers").insertOne(userData);
    console.log(userData);

    res.status(201).send("Created");
  } catch (err) {
    console.log(err.message)
  }

});
