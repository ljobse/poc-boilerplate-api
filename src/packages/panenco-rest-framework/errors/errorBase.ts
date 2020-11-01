class ErrorBase extends Error {
  public code: number;
  public reason: string;

  constructor(code: number, reason?: string, message?: string) {
    super(message);
    this.code = code;
    this.reason = reason || this.constructor.name;
  }
}

export default ErrorBase;
