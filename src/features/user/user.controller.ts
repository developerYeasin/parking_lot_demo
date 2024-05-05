import { Request, Response } from "express";
import { userSchema } from "../../config/db/schema/user.schema";
import { db } from "../../config/db/db";
import { eq } from "drizzle-orm";

export const UserController = {
  get: async (req: Request, res: Response) => {
    try {
      const users = await db.select().from(userSchema);

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
      // const users = await db.select().from(userSchema);
      const id: number = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const users = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.id, id));

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
      const { name, email, password } = req.body;
      const users = await db.insert(userSchema).values({
        name,
        email,
        password,
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
        .update(userSchema)
        .set(req.body)
        .where(eq(userSchema.id, req.body.id));
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
      const users = await db.delete(userSchema).where(eq(userSchema.id, id));

      return res.status(200).json({
        error: false,
        messge: "user deleted successfully",
      });
    } catch (error) {}
  },
};
