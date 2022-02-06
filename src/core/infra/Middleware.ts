import { HttpResponse } from "./HttpResponse";

interface Middleware<T = any, U = any> {
  handle: (httpRequest: T, httpBody?: U) => Promise<HttpResponse | false>;
}

export { Middleware };
