import { authService } from "../services/auth.service.js";
import httpStatus from "http-status";

export async function postSignUp(req, res) {
  const { name, email, password } = req.body;
  try {
    authService.signUp(name, email, password);
    res.status(httpStatus.CREATED).send("Created");
  } catch (err) {
    console.log(err.message);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function postSignIn(req, res) {
  try {
    const { email, password } = req.body;

  const { token, user } =  await authService.signIn(email, password);
    return res.send({ token, user });
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function postLogout(res) {
  const { token } = res.locals;
  try {
    await authService.logout(token);
    res.send("Logout User success");
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Server Internal Error");
  }
}
