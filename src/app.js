import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

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
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/)
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
server.post("/cadastro", async (req, res) => {
    const { error, value } = schemaRegister.validate(req.body,{abortEarly: false});
    const { name, email, password } = value;

    if (error) return res.status(422).send(error.details[0].message);
  try {

    const userEmailExists = await db.collection("Users").findOne({ email });
    if (userEmailExists) return res.status(409).send({ message: "Conflict" }); //"Este email já está cadastrado"

    const hash = bcrypt.hashSync(password, 10);

    const userData = { name, email, password: hash };
    await db.collection("Users").insertOne(userData);
    console.log(userData);

    res.status(201).send("Created");
  } catch (err) {
    console.log(err.message);
    res.status(500).send({message:"Server Internal Error"});
  }
});
server.post("/", async (req, res) => {
  const { error, value } = schemaLogin.validate(req.body,{abortEarly:false});
  const { email, password } = value;
  try {
    if(!email || !password) return res.status(422).send({message :'Todos os campos são obrigatórios' });

    if (error) return res.status(422).send(error.details[0].message);

    const user = await db.collection("Users").findOne({ email });
    if (!user) return res.status(404).send({message:'Not Found'});

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({userId: user._id,token})
      res.status(200).send(token);
    }else{
        res.status(401).send('Unauthorized')
    }
  } catch (err) {
    res.status(500).send('Internal server error')
  }
});
