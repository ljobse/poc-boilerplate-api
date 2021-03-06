import BadRequest from './badRequest';

class ValidationError<T> extends BadRequest {
  public errors: { [K in keyof T]?: string | string[] | object };
  constructor(errors: { [K in keyof T]?: string | string[] | object }) {
    super("ValidationError", "");
    this.errors = errors;
  }
}
export default ValidationError;
