import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbackRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackCreateData {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackCreateData) {
    const { type, comment, screenshot } = request;

    if (!type || !comment) {
      throw new Error('Type and comment are required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot');
    }

    await this.feedbackRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size:16px color: #222">`,
        `<h1>Novo Feedback</h1>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}" />`,
        `</div>`,
      ].join('\n'),
    });
  }
}
