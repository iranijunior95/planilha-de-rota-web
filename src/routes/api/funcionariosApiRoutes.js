import { Router } from "express";
import funcionariosApiController from "../../controllers/api/funcionariosApiController.js";

const routeApiEmployees = Router();

routeApiEmployees.get('/', funcionariosApiController.getAll);
routeApiEmployees.get('/:id', funcionariosApiController.getById);
routeApiEmployees.post('/filtrar', funcionariosApiController.search);
routeApiEmployees.post('/', funcionariosApiController.save);

export default routeApiEmployees;