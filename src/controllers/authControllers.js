import {schemaRegister, schemaLogin} from "../models/signSchema.js"
import {v4 as uuid} from 'uuid'
import {db} from "../database/serverData.js"
import bcrypt from "bcrypt"

export async function postSignUp (req, res) {
    const { error, value } = schemaRegister.validate(req.body, {
      abortEarly: false,
    });
    const { name, email, password } = value;
    console.log(value)
    if (error) return res.status(422).send(error.details[0].message);
    try {
      const userEmailExists = await db.collection("Users").findOne({ email });
      if (userEmailExists) return res.status(409).send({ message: "Conflict" }); //"Este email já está cadastrado"
  
      const hash = bcrypt.hashSync(password, 10);
  
      const userData = { name, email, password: hash };
      await db.collection("Users").insertOne(userData);
  
      res.status(201).send("Created");
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: "Server Internal Error" });
    }
  };
export async function postSignIn(req, res) {
    try {
      const { error, value } = schemaLogin.validate(req.body, {
        abortEarly: false,
      });
      const { email, password } = value;
      console.log(email, password);
      if (error) return res.status(422).send(error.details[0].message);
  
      const user = await db.collection("Users").findOne({ email });
      if (!user) return res.status(404).send({ message: "Not Found" });
  
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({ userId: user._id, token });
        console.log({ userId: user._id, token });
        res.send(token);
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  };