// src/controllers/admin.controller.ts
import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  constructor(private adminService: AdminService = new AdminService()) {}



 getAllUsers = async (req: Request, res: Response) => {

    try {
     const users = await this.adminService.getAllUsers();

      res.status(200).json({
        success: true,
         data: users,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };


 createConstituency = async (req: Request, res: Response) => {
    try {
      const { province, districtNumber } = req.body;

      if (!province || !districtNumber) {
        return res.status(400).json({
          success: false,
          message: "กรุณาระบุ province และ districtNumber",
        });
      }

      const constituency = await this.adminService.createConstituency(
        province,
        districtNumber,
      );

      res.status(201).json({
        success: true,
        message: "สร้างเขตเลือกตั้งสำเร็จ",
        data: constituency,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}