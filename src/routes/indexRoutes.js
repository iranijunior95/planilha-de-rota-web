import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.renderLayout("home");
});

export default router;