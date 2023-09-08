import { db } from "../database/serverData.js";
const findUser = async (email) => {
    return await db.collection("Users").findOne({ email });
}
const insertOneUser = async (userData) => {
    const { email, password, name }= userData;
    return await db.collection("Users").insertOne({ email, password, name });
}
const findUserBySession = async (_id) => {
    return await db.collection("Users").findOne({ _id });
}
export const usersRepository = {
    findUser,
    insertOneUser,
    findUserBySession
}