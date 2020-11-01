import ErrorBase from './errorBase';

class Forbidden extends ErrorBase {
  constructor(reason: string, message: string) {
    super(403, reason, message);
  }
}

export default Forbidden;
