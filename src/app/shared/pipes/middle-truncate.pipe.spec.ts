import { MiddleTruncatePipe } from './middle-truncate.pipe';

describe('MiddleTruncatePipe', () => {
  let pipe: MiddleTruncatePipe;

  beforeEach(() => {
    pipe = new MiddleTruncatePipe();
  });

  it('should check if MiddleTruncate pipe is created.', () => {
    expect(pipe).toBeTruthy();
  });

  it('should check if tranform does not truncate string if value is less then max chars.', () => {
    const value = 'The boy is kicking the ball.';
    const transformed = pipe.transform(value, value.length);
    expect(transformed).toBe(value);
  });

  it('should truncate value is value is greater then max chars.', () => {
    const value = 'The is is running fast.';
    const transformed = pipe.transform(value, 10);
    expect(transformed).toBe('The ...ast.')
  });

  it('should truncate value is value is greater then max chars.', () => {
    const value = 'The is is running fast.';
    const transformed = pipe.transform(value, 10);
    expect(transformed).toBe('The ...ast.')
  });

  it('should truncate value is value is greater then max chars with custom truncate.', () => {
    const value = 'running away.';
    const transformed = pipe.transform(value, 8, '--');
    expect(transformed).toBe('run--ay.')
  });
});
