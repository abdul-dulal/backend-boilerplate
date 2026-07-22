import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import globalErrorHandler from "./app/middleware/globalErrorHandler";
import routers from "./app/routes";
import httpStatus from "http-status";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routers);

// Global Error Handler
// app.use(globalErrorHandler);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: "Not Fount",
//     errorMessages: [{ path: "", message: "Api not found" }],
//   });
//   next();
// });

export default app;
