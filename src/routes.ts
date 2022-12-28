import { Router } from "express";
import cors from "cors";
import controller from "./controllers/Result";

const routes = Router();

routes.get("/getResult/:address", controller.getResult);

export default routes;
