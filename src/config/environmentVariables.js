import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

export {
    SERVER_PORT,
    DB_CONNECTION_STRING
}