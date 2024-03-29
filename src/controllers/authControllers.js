import { authService } from '../services/auth.service.js';
import httpStatus from 'http-status';

export async function postSignUp(req, res) {
  const { name, email, password } = req.body;
  try {
    authService.signUp(name, email, password);
    res.status(httpStatus.CREATED).send('Created');
  } catch (err) {
    console.log(err.message);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function postSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const { token } = await authService.signIn(email, password);
    return res.send({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function postLogout(req, res) {
  const { userId } = res.locals;
  try {
    await authService.logout(userId);
    res.send('Logout User success');
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
