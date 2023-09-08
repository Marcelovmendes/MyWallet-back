
const findOneSession = async (token) => {
    return await db.collection("sessions").findOne({ token });
}
const createSession = async (user, token) => {
    return await db.collection("sessions").insertOne({ userId:user._id, token });
}
const deleteSession = async (token) => {
    return await db.collection("sessions").deleteOne({ token });
}
export const sessionRepository = {
    findOneSession,
    createSession,
    deleteSession
}