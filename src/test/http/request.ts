import supertest from "supertest";

import { app } from "../../infra/http/app";

const request = supertest(app);

export { request };
