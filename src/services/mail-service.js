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
      subject: 'Активация аккаунта на сервисе Note App',
      text: '',
      html: `
			<div>
				<h1>Активация аккаунта на сервисе Note App</h1>
				<p>Вы зарегистрировались на сайте <a href="${process.env.URL_CLIENT}">Note App</a>, чтобы пользоваться сервисом — нужно подтвердить ваш почтовый адрес, для этого нажмите на ссылку <a href="${link}">«Активировать аккаунт»</a></p>
			</div>
			`,
    });
  }
}

export default new MailCervice();
