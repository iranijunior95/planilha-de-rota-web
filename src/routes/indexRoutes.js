import { Router } from "express";
import homeController from "../controllers/homeController.js";
import funcionariosWebRoutes from "../routes/web/funcionariosWebRoutes.js";
import funcionariosApiRoutes from "../routes/api/funcionariosApiRoutes.js";

const router = Router();

//Rotas Web
router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', homeController.viewHome);

router.use('/funcionarios', funcionariosWebRoutes);

//Rotas API
router.use('/api/funcionarios', funcionariosApiRoutes);

export default router;