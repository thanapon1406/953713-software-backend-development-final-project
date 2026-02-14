import { Request, Response } from "express";
import { ElectionService } from "../services/election.service";

export class ElectionController {
  constructor(
    private electionService: ElectionService = new ElectionService(),
  ) {}

  createParty = async (req: Request, res: Response) => {
    try {
      const { name, logoUrl, policy } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "กรุณาระบุชื่อพรรค",
        });
      }
      const party = await this.electionService.createParty(
        name,
        logoUrl,
        policy,
      );

      res.status(201).json({
        success: true,
        message: "สร้างพรรคสำเร็จ",
        data: party,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  addCandidate = async (req: Request, res: Response) => {
    try {
      const {
        candidateNumber,
        title,
        firstName,
        lastName,
        imageUrl,
        policy,
        partyId,
        constituencyId,
        userId,
      } = req.body;

      
      if (
        !candidateNumber ||
        !firstName ||
        !lastName ||
        !partyId ||
        !constituencyId ||
        !userId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "กรุณากระบุข้อมูลที่จำเป็น: candidateNumber, firstName, lastName, partyId, constituencyId, userId",
        });
      }

      const candidate = await this.electionService.addCandidate(
        candidateNumber,
        title || null,
        firstName,
        lastName,
        imageUrl || null,
        policy || null,
        partyId,
        constituencyId,
        userId,
      );

      res.status(201).json({
        success: true,
        message: "เพิ่มผู้สมัครสำเร็จ",
        data: candidate,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  closePoll = async (req: Request, res: Response) => {
    try {
      const constituencyId = parseInt(req.params.id as string);

      if (isNaN(constituencyId)) {
        return res.status(400).json({
          success: false,
          message: "Constituency ID ไม่ถูกต้อง",
        });
      }

      const constituency = await this.electionService.closePoll(constituencyId);

      res.status(200).json({
        success: true,
        message: "ปิดการลงคะแนนสำเร็จ",
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