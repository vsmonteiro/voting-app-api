import emailService from "./EmailService";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

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
              email,
            },
            create: {
              email,
              name: name ?? email,
            },
          },
        },
      },
    });

    await emailService.sendEmailToken(email, emailToken);
  }

  async authenticate(email: string, emailToken: string) {
    const token = await prisma.token.findUnique({
      where: {
        emailToken,
      },
      include: {
        user: true,
      },
    });

    if (!token?.valid) {
      return {
        Error: "Token is not valid"
      }
    }

    if (token.expiration < new Date()) {
      return {
        Error: "Token expired"
      }
    }

    if (token.user?.email === email) {
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 10);

      const createdToken = await prisma.token.create({
        data: {
          type: "api",
          expiration: tokenExpiration,
          user: {
            connect: {
              email
            }
          },
        }
      });

      await prisma.token.update({
        where: {
          id: token.id
        },
        data: {
          valid: false
        }
      });

      const authToken = this.generateAuthToken(createdToken.id);

      return {
        "Authorization": authToken
      };
    }
  }

  generateAuthToken(tokenId: number) {
    const jwtPayload = { tokenId };

    return jwt.sign(jwtPayload, process.env.JWT_SECRET || "", {
      algorithm: "HS256",
      noTimestamp: true
    });
  }

  generateEmailToken() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }
}

const loginService = new LoginService();
export default loginService;
