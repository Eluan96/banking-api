import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const dbName: any = DB_USERNAME;
const dbUsername: any = DB_USERNAME;
const dbPassword = DB_PASSWORD;
const dbHost = DB_HOST;

export const db = new Sequelize(dbName, dbUsername, dbPassword, {
    dialect: "mysql",
    host: DB_HOST,
    port: 3001,
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },
  })
