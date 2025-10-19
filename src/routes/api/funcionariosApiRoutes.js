import { Router } from "express";
import funcionariosApiController from "../../controllers/api/funcionariosApiController.js";

const routeApiEmployees = Router();

routeApiEmployees.get('/', funcionariosApiController.getAll);
routeApiEmployees.get('/:id', funcionariosApiController.getById);
routeApiEmployees.post('/filtrar', funcionariosApiController.search);
routeApiEmployees.post('/', funcionariosApiController.save);
routeApiEmployees.put('/:id', funcionariosApiController.update);
routeApiEmployees.delete('/:id', funcionariosApiController.remove);

export default routeApiEmployees;