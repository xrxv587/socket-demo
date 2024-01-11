import { Router } from "express";

const router = Router();
router.post("/init", (req, res) => {
	res.send("ok");
});

export default router;