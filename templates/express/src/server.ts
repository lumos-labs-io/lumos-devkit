import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api", router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Lumos Express demo at http://localhost:${port}`));
