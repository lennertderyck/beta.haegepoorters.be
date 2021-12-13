import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://30ca99c4c91543a686f65a782e853493@o1089819.ingest.sentry.io/6105296",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});