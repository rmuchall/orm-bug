import pino from "pino";

export const Log = pino({
    name: "orm-bug",
    level: "trace",
    prettyPrint: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss"
    }
});
