import path from "path";
import { DateService } from "./src/utils/DateService";

module.exports = {
  PROJECT_ROOT: __dirname,
  VIEWS_ROOT: path.join(__dirname, "src/views/"),
  CORS_CONFIG: {
    origin: true,
    credentials: true,
  },
  LIMITER_CONFIG: {
    windowMs: DateService.minutes(15),
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },
}
