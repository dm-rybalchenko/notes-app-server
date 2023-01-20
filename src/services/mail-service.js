import nodemailer from 'nodemailer';


class MailCervice {
  constructor() {
    this.tarnsporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.tarnsporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Фктивация аккаунта на ' + process.env.URL_CLIENT,
      text: '',
      html: `
			<div>
				<h1>Для активации аккаунта перейдите по ссылке</h1>
				<a href="${link}">${link}</a>
			</div>
			`,
    });
  }
}

export default new MailCervice();
