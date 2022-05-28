import StatsD from "hot-shots";
const dogStatsD = new StatsD();

// Increment a counter.
dogStatsD.increment("page.views");
