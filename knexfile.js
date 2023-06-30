const path = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "sqLiteDatabase.db") 
    },

    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knexQueryBuilder", "migrations")
    },

    useNullAsDefault: true

  }

};
