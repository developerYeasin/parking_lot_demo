import express, { Request, Response } from "express";
import { ParkingController } from "../../features/parking_lot/parking.controller";

const router = express.Router();

router.get(`/parking/get`, ParkingController.get);
router.get(`/parking/get/:id`, ParkingController.getOne);
router.post(`/parking/create`, ParkingController.create);
router.put(`/parking/update`, ParkingController.update);
router.delete(`/parking/delete/:id`, ParkingController.delete);

router.get(`/parking/available`, ParkingController.getAvailable);

router.get(`/parking/park/:id`, ParkingController.makePark);
router.get(`/parking/unpark/:id`, ParkingController.makeUnpark);

export default router;
