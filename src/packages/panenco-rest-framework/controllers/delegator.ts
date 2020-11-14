import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ClassType } from 'panenco-utilities/classType';

import ControllerBase from './controllerBase';
import { IControllerFunctions } from './controllerFunctions.interface';

export class Delegator<TController extends ControllerBase> {
  private readonly controllerType: {
    new (request: Request, response: Response, next: NextFunction): TController;
  };
  private static wrapper: <T>(handler: () => Promise<T>) => Promise<T> = (
    handler
  ) => handler();

  constructor(controllerType: ClassType<TController>) {
    this.controllerType = controllerType;
  }

  public getFunctions(): IControllerFunctions<TController> {
    const keys = Object.getOwnPropertyNames(this.controllerType.prototype);

    const controllerFunctions: IControllerFunctions<TController> = keys.reduce(
      (object, funcName) => {
        object[funcName] = this.run(funcName as any);
        return object;
      },
      {} as IControllerFunctions<TController>
    );

    return controllerFunctions;
  }

  public static registerWrapper(
    wrapper: <T>(handler: () => Promise<T>) => Promise<T>
  ) {
    this.wrapper = wrapper;
  }

  private run(func: keyof TController): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction) => {
      const controller = new this.controllerType(request, response, next);

      this.validateFunction(controller, func);

      const result = await Delegator.wrapper(() =>
        this.handle(request, controller, func)
      );

      this.validateResult(result, func);

      (response as any).body = result;

      next();
    };
  }

  private async handle(
    request: Request,
    controller: TController,
    func: keyof TController
  ) {
    const input =
      request.body && Object.keys(request.body).length > 0
        ? request.body
        : request.query;
    const handlerResult = await ((controller[func] as unknown) as (
      ...args: any[]
    ) => any)(input, request.params, request.headers);
    return handlerResult;
  }

  private validateResult(result: any, func: keyof TController) {
    // if (result && !(result instanceof ResponseBase)) {
    //   throw new Error(
    //     `${this.controllerType.name}/${func} returned an invalid response object`
    //   );
    // }
  }

  private validateFunction(controller: TController, func: keyof TController) {
    if (controller[func] && typeof controller[func] !== "function") {
      throw new Error(`Unknown controller function ${func}`);
    }
  }
}
