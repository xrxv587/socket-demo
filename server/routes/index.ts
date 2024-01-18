import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/init", (req, res) => {
	if (!req.session.user) {
		req.session.user = "user" + uuidv4();
	}
	res.send("ok");
});
router.get("/getUser", (req, res) => {
	res.send(req.session.user);
})
router.post("/sendMsg", (req, res) => {});

export default router;