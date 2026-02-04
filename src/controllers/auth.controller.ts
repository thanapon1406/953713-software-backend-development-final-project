// src/controllers/auth.controller.ts
import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  public getProfile = async (req: Request, res: Response) => {
    try {
      // from middleware
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "กรุณาล็อกอินเข้าสู่ระบบ",
        });
      }
      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}
