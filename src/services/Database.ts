import {Log} from "./Log";
import {Config} from "./Config";
import {EntityRepository, MikroORM} from "@mikro-orm/core";
import {User} from "../entities/User";

export abstract class Database {
    static mikroOrm: MikroORM;
    static userRepository: EntityRepository<User>;

    static async initialize(): Promise<void> {
        if (Database.mikroOrm) {
            throw new Error("Database is already initialized");
        }

        const mikroOrm = await MikroORM.init();
        Database.mikroOrm = mikroOrm;
        Database.userRepository = mikroOrm.em.getRepository(User);
        Log.info("Database: Connected");

        // Drop schema
        const generator = Database.mikroOrm.getSchemaGenerator();
        if (Config.ormDropSchema) {
            Log.info("Database: Dropping schema");
            await generator.dropSchema();
        }

        // Update schema
        if (Config.ormUpdateSchema) {
            Log.info("Database: Updating schema");
            await generator.updateSchema();
        }

        // Run migrations
        if (Config.ormRunMigrations) {
            const migrator = Database.mikroOrm.getMigrator();
            Log.info("Database: Executing migrations");
            await migrator.up();
        }
    }
}
