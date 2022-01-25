type HttpResponse = {
  statusCode: number;
  body: any;
};

function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  };
}

function created<T = undefined>(body: T): HttpResponse {
  return {
    statusCode: 201,
    body,
  };
}

function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  };
}

function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
}

function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  };
}

function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  };
}

function fail(error: Error) {
  console.log(error);

  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  };
}

export {
  HttpResponse,
  ok,
  created,
  clientError,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  tooMany,
  fail,
};
