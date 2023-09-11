import supertest from "supertest";
import app from "../src/app.js";
import { cleanDb } from "./services/helpers.js";
import { MongoClient } from "mongodb";
import { generateValidBody } from "./facturies/users.factury.js";
import httpStatus from "http-status";
import dotenv from "dotenv";
dotenv.config();
const server = supertest(app);
let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db = connection.db();
  cleanDb();
});
describe("(POST) /cadastro", () => {
  it("Should create a new user and return 201 statusCode ", async () => {
    const body = generateValidBody();
    const result = await server.post("/cadastro").send(body)
    .expect(httpStatus.CREATED);
  });
});
