import { Router } from "express";
import funcionariosWebController from "../../controllers/web/funcionariosWebController.js";

const routeWebEmployees = Router();

routeWebEmployees.get('/', funcionariosWebController.indexEmployees);

export default routeWebEmployees;