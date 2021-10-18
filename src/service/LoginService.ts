import { PrismaClient } from "@prisma/client";
import emailService from "./EmailService";

const prisma = new PrismaClient();

class LoginService {
  async login(email: string, name?: string) {
    const emailToken = this.generateEmailToken();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 2);

    await prisma.token.create({
      data: {
        type: "email",
        emailToken: emailToken,
        expiration: tokenExpiration,
        user: {
          connectOrCreate: {
            where: {
              email
            },
            create: {
              email,
              name: name ?? email
            }
          }
        }
      }
    });

    await emailService.sendEmailToken(email, emailToken);
  }

  generateEmailToken() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }
}


const loginService = new LoginService();
export default loginService;