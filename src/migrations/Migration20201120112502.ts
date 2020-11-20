import { Migration } from '@mikro-orm/migrations';
import {Database} from "../services/Database";
import {Log} from "../services/Log";

export class Migration20201120112502 extends Migration {

  async up(): Promise<void> {
    Log.debug("Executing migration... begin");
    const newUser = Database.userRepository.create({
      name: "Rob"
    });

    // Application hangs here
    await Database.userRepository.persistAndFlush(newUser);

    Log.debug("Executing migration... done");
  }

}
