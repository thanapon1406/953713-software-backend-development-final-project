// src/services/admin.service.ts
import { $Enums } from "../generated/prisma";
import * as userRepo from "../repositories/user.repository";
import * as constituencyRepo from "../repositories/constituency.repository";

export class AdminService {
 

  public getAllUsers = async () => {
    return await userRepo.findAll();
  };

  
  public createConstituency = async (
    province: string,
    districtNumber: number,
  ) => {

    const existing = await constituencyRepo.findByLocation(
      province,
      districtNumber,
    );

    if (existing) {
      throw new Error(
        `เขตเลือกตั้ง ${province} เขตที่ ${districtNumber} มีอยู่แล้ว`,
      );
    }

    const constituency = await constituencyRepo.create({
      province,
      districtNumber,
      isClosed: false,
    });

    return constituency;
  };}