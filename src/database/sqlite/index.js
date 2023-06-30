const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

async function sqliteConnection() {
    
    const database = await sqlite.open({
        filename: path.resolve(__dirname, '..', 'sqLiteDatabase.db'),
        driver: sqlite3.Database
    })

    return database

}

module.exports = sqliteConnection