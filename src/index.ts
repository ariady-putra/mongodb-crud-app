require("dotenv").config();

import { env } from "process";

const port = env.HOSTED ? parseInt(env.PORT!) : 60884;

const frontendDir = env.FRONTEND_DIR ?? "../vinyl-record-frontend";
const frontendBuildDir = env.FRONTEND_BUILD_DIR ?? "dist";
const frontendBuildHTMLfile = env.FRONTEND_BUILD_HTML_FILE ?? "index.html";

import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import path from "path";

const frontendBuildPath = path.join(__dirname, frontendDir, frontendBuildDir);
const frontendHTMLpath = path.join(frontendBuildPath, frontendBuildHTMLfile);

// Serve static files from the frontend
app.use(express.static(frontendBuildPath));

const backend = app.listen(port, () => {
  console.log({ backend: backend.address() });
  if (!env.HOSTED) console.log(`http://localhost:${port}`);
});

import * as api from "./handler";

const serveFrontend = (req: Request, rsp: Response) => rsp.sendFile(frontendHTMLpath);
const notAllowed = (req: Request, rsp: Response) =>
  rsp
    .status(405)
    .appendHeader("Allow", "GET")
    .json({ status: 405, error: `${req.method} ${req.path} not allowed` });

app.get("/api/vinyl-records", api.getAllVinylRecords);

app.get("/api/vinyl-record/:id", api.getVinylRecordByID);
app.post("/api/vinyl-record", api.postVinylRecord);
app.put("/api/vinyl-record/:id", api.putVinylRecordByID);
app.delete("/api/vinyl-record/:id", api.deleteVinylRecordByID);

app.get("*", serveFrontend);
app.all("*", notAllowed);
