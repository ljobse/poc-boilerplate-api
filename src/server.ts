import express from 'express';
import glob from 'glob';
import { Delegator } from 'packages/panenco-rest-framework/controllers/delegator';
import { IRouter } from 'packages/panenco-rest-framework/router.interface';
import ExpressContext from 'packages/panenco-utilities/expressContext';
import { registerExtensions } from 'packages/panenco-utilities/extensions';
import path from 'path';
import { getConnection } from 'typeorm';

export class Server {
  private host: express.Application;

  constructor() {
    this.host = express();
    this.registerDelegatorWrapper();
    registerExtensions();
  }
  public start() {
    this.registerRouters();
    this.listen();
  }

  public listen() {
    this.host.listen(process.env.PORT, () => {
      console.log(
        `App listening on the port ${process.env.PORT} in env ${process.env.NODE_ENV}`
      );
    });
  }

  private registerRouters() {
    const routes = importClassesFromDirectories([
      `${__dirname}/**/*.route{.ts,.js}`,
    ]);

    routes.forEach((route) => {
      const activated = new route();
      this.host.use(`/api/${activated.path}`, activated.router);
    });
  }

  private registerDelegatorWrapper() {
    Delegator.registerWrapper(async (handler) => {
      const result = await getConnection().transaction(async (em) => {
        ExpressContext.set("entityManager", em);
        return await handler();
      });
      return result;
    });
  }
}

const importClassesFromDirectories = (
  directories: string[]
): [new () => IRouter] => {
  const allFiles = directories.reduce((allDirs, dir) => {
    return allDirs.concat(glob.sync(path.normalize(dir)));
  }, [] as string[]);

  const dirs = allFiles
    .filter(
      (file) =>
        !file.endsWith(".d.ts") &&
        (file.endsWith(".ts") || file.endsWith(".js"))
    )
    .map((file) => require(path.resolve(file)));

  return loadFileClasses(dirs, []);
};

const loadFileClasses = (exported: any, allLoaded: Function[]) => {
  if (typeof exported === "function") {
    allLoaded.push(exported);
  } else if (Array.isArray(exported)) {
    exported.forEach((i: any) => loadFileClasses(i, allLoaded));
  } else if (typeof exported === "object" && exported !== null) {
    Object.keys(exported).forEach((key) =>
      loadFileClasses(exported[key], allLoaded)
    );
  }
  return allLoaded as any;
};
