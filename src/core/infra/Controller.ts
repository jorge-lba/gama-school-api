import { HttpResponse } from "./HttpResponse";

interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}

export { Controller };
