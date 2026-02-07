// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private authService: AuthService = new AuthService()) { }

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

  public register = async (req: Request, res: Response) => {
    try {
      // รับค่าจาก Body
      const {
        nationalId,
        firstName,
        lastName,
        address,
        province,
        districtNumber,
      } = req.body;

      // Validate required fields
      if (
        !nationalId ||
        !firstName ||
        !lastName ||
        !province ||
        !districtNumber
      ) {
        return res.status(400).json({
          success: false,
          message:
            "กรุณาระบุข้อมูลให้ครบถ้วน (nationalId, firstName, lastName, province, districtNumber)",
        });
      }

      // เรียก Service เพื่อทำงาน
      const newUser = await this.authService.registerUser(
        nationalId,
        firstName,
        lastName,
        address,
        province,
        parseInt(districtNumber),
      );

      // สร้าง JWT Token
      const token = jwt.sign(
        {
          id: newUser.id,
          nationalId: newUser.nationalId,
          role: newUser.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }, // Token มีอายุ 7 วัน
      );

      // ส่งผลลัพธ์กลับพร้อม Token
      res.status(201).json({
        success: true,
        message: "ลงทะเบียนสำเร็จ",
        data: {
          user: {
            id: newUser.id,
            nationalId: newUser.nationalId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            constituency: newUser.constituency,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { nationalId } = req.body;

      if (!nationalId) {
        return res.status(400).json({
          success: false,
          message: "กรุณาระบุเลขบัตรประชาชน",
        });
      }

      // เรียก Service เพื่อหาผู้ใช้
      const user = await this.authService.loginUser(nationalId);

      // สร้าง JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          nationalId: user.nationalId,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );

      res.status(200).json({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
        data: {
          user: {
            id: user.id,
            nationalId: user.nationalId,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            constituency: user.constituency,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}
