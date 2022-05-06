import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '3a3a99d122a310',
    pass: 'c3d3cf11566497',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { subject, body } = data;

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Pedro Moreno <nennogabriel@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
