import { Router } from "express";
import homeController from "../controllers/homeController.js";

const router = Router();

router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', homeController.viewHome);

export default router;