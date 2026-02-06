// src/repositories/constituency.repository.ts
import { prisma } from "../lib/prisma";

export const findByLocation = async (
  province: string,
  districtNumber: number,
) => {
  return await prisma.constituency.findUnique({
    where: {
      province_districtNumber: {
        province,
        districtNumber,
      },
    },
  });
};
