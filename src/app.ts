import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes/api";
import dotenv from 'dotenv'
import { AppError } from "./helpers/appError";
import swaggerFile from "./swagger.json";

dotenv.config()

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', error => {
  throw new AppError(error,500)
});
database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

app.use(express.json());

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error = ${err.message}`
    });
  }
);

app.listen(3333, () => console.log("Server is running in the port 3333"));
