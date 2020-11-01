import { NextFunction, Request, Response } from 'express';

import { RequestContext } from './requestContext';

export default class ControllerBase {
  protected readonly context: RequestContext;

  constructor(request: Request, response: Response, next: NextFunction) {
    this.context = new RequestContext(request, response, next);
  }
}
