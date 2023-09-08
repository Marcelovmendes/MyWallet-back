import { db } from "../database/serverData.js"
const createTransactions = async (tipo,body,date,userId)=>{
  return await db.collection("transactions").insertOne({ tipo, ...body, date, userId})  

}
const findManyTransactions = async (userId)=>{
  return await db.collection("transactions").find({userId}).toArray()
}
export const transactionsRepository = {
  createTransactions,
  findManyTransactions
}