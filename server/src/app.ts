import express, { Request, Response, NextFunction } from 'express';
import mysql from 'mysql2';
import { HttpError } from "http-errors";

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { db } from './config';
import accountRoutes from './routes/accountRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/account', accountRoutes)

db.sync({})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

  

// Your CRUD routes go here

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
