import { Request, Response } from "express"
import loginService from "../service/LoginService";

class LoginController {
  async login(req: Request, res: Response) {
    const { email, name } = req.body;

    await loginService.login(email, name);
    res.send();
  }

  async authenticate(req: Request, res: Response) {
    const { email, emailToken } = req.body;

    const response = await loginService.authenticate(email, emailToken);

    if(response?.Error) {
      res.json({
        message: response.Error
      })
      .sendStatus(401);
    }

    return res.json(response);
  }
}

const loginController = new LoginController();
export default loginController;

