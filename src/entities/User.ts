import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {v4} from "uuid";

@Entity()
export class User {
    @PrimaryKey({ onCreate: () => v4()})
    id: string;

    @Property()
    name: string;
}
