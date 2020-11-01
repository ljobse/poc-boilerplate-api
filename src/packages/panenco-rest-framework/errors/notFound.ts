import ErrorBase from './errorBase';

class NotFound extends ErrorBase {
  constructor(reason: string, message: string) {
    super(404, reason, message);
  }
}

export default NotFound;
