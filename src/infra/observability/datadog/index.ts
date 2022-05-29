import tracer from "dd-trace";
import StatsD from "hot-shots";

import { datadogConfig } from "./datadogConfig";

export function startDataDog() {
  const dogStatsD = new StatsD();
  dogStatsD.increment("page.views");

  tracer.init({
    env: datadogConfig.env,
    profiling: datadogConfig.profiling,
    logInjection: datadogConfig.logInjection,
  });
}
