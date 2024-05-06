const mysql = require('mysql2/promise');
const config = require('./config');
const app = require('./app');
const sequelize = require('./config/sequelize');
const Models = require('./models');
// Then require the relationships file
// const oAuthAccessTokensModel = require('./oAuthAccessTokens.model');



let server;
async function main() {
    try {
        const connection = await mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database
        });

        console.log('Database connected successfully');

        // Use the connection for queries here

        server = app.listen(config.port, () => {
            console.log(`App is running on port ${config.port}`);
        });
    } catch (error) {
        console.log('Database connection failed: ' + error.message);
        process.exit(1);
    }
}

main();


const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            connection.end(); // Ensure the database connection is closed
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = error => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);