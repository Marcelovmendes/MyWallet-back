import httpStatus from "http-status";
import { db } from "../database/serverData.js";
import { sessionRepository } from "../repository/sessions.repository.js";

export const authenticateToken = async (req, res, next) => {
    const authReader = req.headers["Authorization"];
    if(!authReader) throw new Error(httpStatus.UNAUTHORIZED)

    const token = authReader?.replace("Bearer ", "");

    if(!token) throw new Error(httpStatus.UNAUTHORIZED) 
    try{  
         const { userId } = jwt.verify(token, process.env.JWT_SECRET ||'secret' );
         const session =  await  sessionRepository.findOneSession(token)
         if(!session) throw new Error(httpStatus.UNAUTHORIZED)
         res.locals.userId = userId
        res.locals.token = token
         next()
    }catch(err){
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
    next()
    
}
