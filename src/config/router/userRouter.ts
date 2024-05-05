import express, { Request, Response } from "express";
import { UserController } from "../../features/user/user.controller";

const router = express.Router();

router.get(`/user/get`, UserController.get);
router.get(`/user/get/:id`, UserController.getOne);
router.post(`/user/create`, UserController.create);
router.put(`/user/update`, UserController.update);
router.delete(`/user/delete/:id`, UserController.delete);

export default router;
