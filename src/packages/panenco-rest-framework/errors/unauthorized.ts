import ErrorBase from './errorBase';

class Unauthorized extends ErrorBase {
  constructor(reason: string, message: string) {
    super(401, reason, message);
  }
}

export default Unauthorized;
