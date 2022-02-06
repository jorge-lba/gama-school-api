import { Router } from "express";

import { adaptRoute } from "../../../core/infra/adapters/ExpressRoutAdapter";
import { makeAuthenticateAccountController } from "../factories/AuthenticateAccountControllerFactory";
import { makeRegisterAccountController } from "../factories/RegisterAccountControllerFactory";

const accountRoutes = Router();

/**
 * @openapi
 * /:
 * /account:
 *   post:
 *     tags:
 *      - Account
 *     description: Regista um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário.
 *                 example: Leanne Graham
 *               email:
 *                type: string
 *                description: Email do usuário.
 *                example: leanne.graham@emial.com
 *               password:
 *                type: string
 *     responses:
 *       201:
 *         description: O usuário foi criado com sucesso.
 *         content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Account created"
 *               id:
 *                type: string
 *               token:
 *                type: string
 */
accountRoutes.post("/", adaptRoute(makeRegisterAccountController()));

/**
 * @openapi
 * /:
 * /account/authenticate:
 *   post:
 *     tags:
 *      - Account
 *     description: Faz a autenticação de um usuário existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                type: string
 *                description: Email do usuário.
 *                example: leanne.graham@emial.com
 *               password:
 *                type: string
 *     responses:
 *       200:
 *         description: O usuário foi autenticado com sucesso.
 *         content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Account authenticated"
 *               id:
 *                type: string
 *               token:
 *                type: string
 */
accountRoutes.post(
  "/authenticate",
  adaptRoute(makeAuthenticateAccountController())
);

export { accountRoutes };
