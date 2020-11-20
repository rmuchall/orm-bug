import {Log} from "./services/Log";
import {Config} from "./services/Config";
import {Database} from "./services/Database";

Config.initialize();

(async () => {
    try {
        await Database.initialize();
        Log.debug("Database initialized successfully.");
    }
    catch (error) {
        Log.error("Database: Connection error");
        Log.error(error);
    }
})();
