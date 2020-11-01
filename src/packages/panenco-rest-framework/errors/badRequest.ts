import ErrorBase from './errorBase';

class BadRequest extends ErrorBase {
  constructor(reason: string, message: string) {
    super(400, reason, message);
  }
}

export default BadRequest;
