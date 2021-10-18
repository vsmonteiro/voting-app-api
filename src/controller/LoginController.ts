import { Request, Response } from "express"
import loginService from "../service/LoginService";

class LoginController {
  async login(req: Request, res: Response) {
    const { email, name } = req.body;

    await loginService.login(email, name);
    res.send();
  }
}

const loginController = new LoginController();
export default loginController;

