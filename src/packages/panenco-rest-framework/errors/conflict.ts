import ErrorBase from './errorBase';

class Conflict extends ErrorBase {
  constructor(reason: string, message: string) {
    super(409, reason, message);
  }
}

export default Conflict;
