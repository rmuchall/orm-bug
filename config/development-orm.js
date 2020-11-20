module.exports = {
    debug: false,
    validate: true,
    strict: true,
    type: "sqlite",
    dbName: "orm-bug.db",
    entities: ["./src/entities"],
    migrations: {
        tableName: "migrations",
        path: "./src/migrations"
    }
};
