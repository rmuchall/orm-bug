import {config} from "dotenv";
import path from "path";
import {Log} from "./Log";

export abstract class Config {
    private static isInitialized = false;

    static ormDropSchema: boolean;
    static ormUpdateSchema: boolean;
    static ormRunMigrations: boolean;

    static initialize(): void {
        if (Config.isInitialized) {
            throw new Error("Config already initialized");
        }

        Log.info(`Config: Environment = [${process.env.NODE_ENV}]`);
        config({
            path: path.resolve(process.cwd(), `config/${process.env.NODE_ENV}.env`)
        });

        Config.ormDropSchema = process.env.ORM_DROP_SCHEMA!.toLowerCase() === "true";
        Config.ormUpdateSchema = process.env.ORM_UPDATE_SCHEMA!.toLowerCase() === "true";
        Config.ormRunMigrations = process.env.ORM_RUN_MIGRATIONS!.toLowerCase() === "true";

        Config.isInitialized = true;
    }
}
