require("dotenv").config();

import { env } from "process";

const port = env.HOSTED ? parseInt(env.PORT!) : 60884;

import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const backend = app.listen(port, () => {
  console.log({ backend: backend.address() });
  if (!env.HOSTED) console.log(`http://localhost:${port}`);
});

import * as api from "./handler";

const notFound = (req: Request, rsp: Response) => {
  rsp.status(404);
  rsp.json({ status: 404, error: `${req.method} ${req.path} not found` });
};

app.get("/api/vinyl-records", api.getAllVinylRecords);

app.get("/api/vinyl-record/:id", api.getVinylRecordByID);
app.post("/api/vinyl-record", api.postVinylRecord);
app.put("/api/vinyl-record/:id", api.putVinylRecordByID);
app.delete("/api/vinyl-record/:id", api.deleteVinylRecordByID);

app.all("*", notFound);
