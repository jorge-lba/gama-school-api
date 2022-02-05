import { Router } from "express";

import { accountRoutes } from "./account.router";
import { testRoutes } from "./test.router";

const router = Router();

router.use("/test", testRoutes);
router.use("/account", accountRoutes);

export { router };
