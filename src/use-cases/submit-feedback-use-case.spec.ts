import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,aklsdjfhalksdjfh',
      })
    ).resolves.not.toThrow();

    expect(await createFeedbackSpy).toHaveBeenCalled();
    expect(await sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,aklsdjfhalksdjfh',
      })
    ).rejects.toThrow();
  });
  it('should not be able to submit a feedback without a comment', async () => {
    expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,aklsdjfhalksdjfh',
      })
    ).rejects.toThrow();
  });
  it('should not be able to submit a feedback without an invalid Image', async () => {
    expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'aklsdjfhalksdjfh',
      })
    ).rejects.toThrow();
  });
});
