import cors from "cors";
import { config } from "dotenv-flow";
import express, { Request, Response } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { openapiSpecification } from "./doc/swagger";

config({ silent: true });

import { router } from './routes' // eslint-disable-line

const app = express();

app.use(
  cors({
    exposedHeaders: ["x-total-count", "Content-Type", "Content-Length"],
  })
);

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(router);

app.use(
  "/public",
  express.static(path.join(process.cwd(), "/public"), {
    index: false,
  })
);

app.get("/", (request: Request, response: Response) => {
  return response.json({
    message: "School Tests API",
  });
});

app.get("/docs", (request: Request, response: Response) => {
  return response.sendFile(path.join(process.cwd(), "./public/index.html"));
});

app.use(
  "/docs/swagger",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

export { app };
