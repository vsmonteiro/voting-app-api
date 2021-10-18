import sendgrid from "@sendgrid/mail";

class EmailService {
  async sendEmailToken(email: string, token: string) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
    const message = {
      to: email,
      from: process.env.EMAIL_SENDGRID!,
      subject: "Login token for Voting APP",
      text: `The login token for the Voting APP is ${token}`,
    };

    try {
      return await sendgrid.send(message);
    } catch (error) {
      console.error(error);
    }
  }
}

const emailService = new EmailService();
export default emailService;
