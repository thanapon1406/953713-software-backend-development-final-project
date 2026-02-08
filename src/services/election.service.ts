// src/services/election.service.ts
import * as userRepo from "../repositories/user.repository";
import * as constituencyRepo from "../repositories/constituency.repository";
import * as partyRepo from "../repositories/party.repository";
import * as candidateRepo from "../repositories/candidate.repository";

export class ElectionService {


  public createParty = async (
    name: string,
    logoUrl?: string,
    policy?: string,
  ) => {
    return await partyRepo.create({ name, logoUrl, policy });
  };

 
  public addCandidate = async (
    candidateNumber: number,
    title: string | null,
    firstName: string,
    lastName: string,
    imageUrl: string | null,
    policy: string | null,
    partyId: number,
    constituencyId: number,
    userId: number,
  ) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new Error(`ไม่พบผู้ใช้ ID: ${userId}`);
    }

    if (user.constituencyId !== constituencyId) {
      throw new Error(
        `ผู้ใช้ไม่ได้อาศัยอยู่ในเขตเลือกตั้ง ID: ${constituencyId} ไม่สามารถลงสมัครในเขตนี้ได้`,
      );
    }

    const party = await partyRepo.findById(partyId);
    if (!party) {
      throw new Error(`ไม่พบพรรค ID: ${partyId}`);
    }

    const constituency = await constituencyRepo.findById(constituencyId);
    if (!constituency) {
      throw new Error(`ไม่พบเขตเลือกตั้ง ID: ${constituencyId}`);
    }

    return await candidateRepo.create({
      candidateNumber,
      title,
      firstName,
      lastName,
      imageUrl,
      policy,
      user: { connect: { id: userId } },
      party: { connect: { id: partyId } },
      constituency: { connect: { id: constituencyId } },
    });
  };


//   public closePoll = async (constituencyId: number) => {
//     const constituency = await constituencyRepo.findById(constituencyId);

//     if (!constituency) {
//       throw new Error(`ไม่พบเขตเลือกตั้ง ID: ${constituencyId}`);
//     }

//     if (constituency.isClosed) {
//       throw new Error(`เขตเลือกตั้งนี้ปิดการลงคะแนนไปแล้ว`);
//     }

//     return await constituencyRepo.close(constituencyId);
//   };

  
}
