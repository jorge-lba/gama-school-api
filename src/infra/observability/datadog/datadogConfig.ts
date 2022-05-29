export const datadogConfig = Object.freeze({
  env: process.env.DD_ENV,
  profiling: process.env.DD_PROFILING === "true",
  logInjection: process.env.DD_LOGS_INJECTION === "true",
});
