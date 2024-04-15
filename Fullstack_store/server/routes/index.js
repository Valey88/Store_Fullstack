const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");
const checkRole = require("../middleware/checkRoleMiddleware");

router.use("/user", userRouter);
router.use("/type", checkRole("Admin"), typeRouter);
router.use("/brand", checkRole("Admin"), brandRouter);
router.use("/device", checkRole("Admin"), deviceRouter);

module.exports = router;
