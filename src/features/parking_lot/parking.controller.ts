import { Request, Response } from "express";
import { db } from "../../config/db/db";
import { eq } from "drizzle-orm";
import { parkingLot } from "../../config/db/schema/parkingLot.schema";

export const ParkingController = {
  get: async (req: Request, res: Response) => {
    try {
      const users = await db.select().from(parkingLot);

      return res.status(200).json({
        error: false,
        user: users,
      });
    } catch (error: any) {
      console.log(" error >> ", error);
      return res.status(401).json({
        error: true,
        message: error.message,
      });
    }
  },
  getOne: async (req: Request, res: Response) => {
    try {
      // const users = await db.select().from(parkingLot);
      const id: number = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const users = await db
        .select()
        .from(parkingLot)
        .where(eq(parkingLot.id, id));

      return res.status(200).json({
        error: false,
        user: users,
      });
    } catch (error: any) {
      console.log(" error >> ", error);
      return res.status(401).json({
        error: true,
        message: error.message,
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { name, status, lat, lon, location, space } = req.body;
      const users = await db.insert(parkingLot).values({
        name,
        status,
        lat,
        lon,
        location,
        space,
      });
      return res.status(200).json({
        error: false,
        messge: "user created successfully",
        user: users,
      });
    } catch (error: any) {
      console.log(" error >> ", error);
      return res.status(401).json({
        error: true,
        message: error.message,
      });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const users = await db
        .update(parkingLot)
        .set(req.body)
        .where(eq(parkingLot.id, req.body.id));
      return res.status(200).json({
        error: false,
        messge: "user updated successfully",
        user: users,
      });
    } catch (error) {}
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const users = await db.delete(parkingLot).where(eq(parkingLot.id, id));

      return res.status(200).json({
        error: false,
        messge: "user deleted successfully",
      });
    } catch (error) {}
  },
  getAvailable: async (req: Request, res: Response) => {
    try {
      const users = await db
        .select()
        .from(parkingLot)
        .where(eq(parkingLot.status, 1));

      return res.status(200).json({
        error: false,
        user: users,
      });
    } catch (error: any) {
      console.log(" error >> ", error);
      return res.status(401).json({
        error: true,
        message: error.message,
      });
    }
  },
  makePark: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      const users = await db
        .update(parkingLot)
        .set({ status: 3 })
        .where(eq(parkingLot.id, id));

      return res.status(200).json({
        error: false,
        messge: "parked successfully",
        user: users,
      });
    } catch (error) {}
  },
  makeUnpark: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);

      // const users = await db
      //   .update(parkingLot)
      //   .set({ status: 4 })
      //   .where(eq(parkingLot.id, id));
      const nowTime: any = new Date();
      const parking_lot = await db
        .select()
        .from(parkingLot)
        .where(eq(parkingLot.id, id));

      const parkStartTime: any = new Date(parking_lot[0].updateAt);

      console.log(nowTime, parkStartTime);
      const parkTime = nowTime - parkStartTime;
      const parking_hours = Math.floor(Math.abs(parkTime / (1000 * 60 * 60)));
      const park_rs = parking_hours * 10;
      
      return res.status(200).json({
        error: false,
        messge: "unparked successfully",
        park_rs: park_rs,
      });
    } catch (error) {}
  },
};
