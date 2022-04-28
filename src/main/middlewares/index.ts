import { Router } from "express";

import { json } from "express";
import cors from "cors";

const middlewares = Router();

middlewares.use(json());
middlewares.use(cors());

export default middlewares;