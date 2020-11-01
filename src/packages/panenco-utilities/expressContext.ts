import { createNamespace } from 'cls-hooked';

const ns = createNamespace("app");
export default class ExpressContext {
  public static middleware(req: unknown, res: unknown, next: Function) {
    ns.run(() => next());
  }

  public static get(key: any) {
    if (ns?.active) {
      return ns.get(key);
    }
  }
  public static set(key: any, value: any) {
    if (ns?.active) {
      return ns.set(key, value);
    }
  }
}
