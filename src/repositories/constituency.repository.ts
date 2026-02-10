// src/repositories/constituency.repository.ts
import { Prisma } from "../generated/prisma";
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

/**
 * Find constituency by ID
 */
export const findById = async (id: number) => {
  return await prisma.constituency.findUnique({
    where: { id },
  });
};

