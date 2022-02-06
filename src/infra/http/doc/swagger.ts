import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GAMA School Tests API",
      version: "1.0.0",
    },
  },
  apis: ["./src/infra/http/routes/**.router.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export { openapiSpecification };
