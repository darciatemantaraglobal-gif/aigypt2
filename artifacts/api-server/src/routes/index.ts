import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import progressRouter from "./progress";
import adminRouter from "./admin";
import midtransRouter from "./midtrans";
import qrisRouter from "./qris";

const router: IRouter = Router();

router.use(authRouter);
router.use(progressRouter);
router.use(adminRouter);
router.use(midtransRouter);
router.use(qrisRouter);
router.use(healthRouter);

export default router;
