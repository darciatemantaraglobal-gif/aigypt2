import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import progressRouter from "./progress";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(authRouter);
router.use(progressRouter);
router.use(adminRouter);
router.use(healthRouter);

export default router;
