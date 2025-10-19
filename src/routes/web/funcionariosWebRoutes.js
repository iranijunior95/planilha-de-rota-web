import { Router } from "express";
import funcionariosWebController from "../../controllers/web/funcionariosWebController.js";

const routeWebEmployees = Router();

routeWebEmployees.get('/', funcionariosWebController.indexEmployees);
routeWebEmployees.get('/detalhes/:id', funcionariosWebController.employeeDetails);

export default routeWebEmployees;