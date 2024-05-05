// src/app.ts
import express from "express";
import { Request, Response } from "express";
import userRouter from "./config/router/userRouter";
import parkingRouter from "./config/router/parkingRouter";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors({ origin: true, credentials: true }))

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript! this is dev site");
});
app.use("/", userRouter);
app.use("/", parkingRouter);

export default app;
