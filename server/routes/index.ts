import { Router } from "express";

const router = Router();

router.post("/init", (req, res) => {
	req.session.user = "user" + Date.now();
	res.send("ok");
});
router.get("/getUser", (req, res) => {
	res.send(req.session.user);
})
router.post("/sendMsg", (req, res) => {});

export default router;