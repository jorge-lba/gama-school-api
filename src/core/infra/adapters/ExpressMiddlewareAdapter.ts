import { Request, Response, NextFunction } from "express";

import { Middleware } from "../Middleware";

const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const token =
      request.headers?.["x-access-token"] ||
      request.headers?.authorization ||
      "";

    const requestData = {
      accessToken: String(token)?.replace("Bearer ", ""),
      ...(request.headers || {}),
    };

    const httpResponse = await middleware.handle(requestData, request.body);

    if (httpResponse === false) {
      return response.status(200).send();
    }

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);

      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      });
    }
  };
};

export { adaptMiddleware };
