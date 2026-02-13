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
export const findById = async (id: number) => {
  return await prisma.constituency.findUnique({
    where: { id },
  });
};

export const create = async (data: Prisma.ConstituencyCreateInput) => {
  return await prisma.constituency.create({
    data,
  });
};

export const close = async (id: number) => {
  return await prisma.constituency.update({
    where: { id },
    data: { isClosed: true },
  });
};

export const findAll = async () => {
  return await prisma.constituency.findMany({
    orderBy: [{ province: "asc" }, { districtNumber: "asc" }],
  });
};

export const findByProvince = async (province: string) => {
  return await prisma.constituency.findMany({
    where: { province },
    orderBy: { districtNumber: "asc" },
  });
};

export const findWithResults = async (id: number) => {
  return await prisma.constituency.findUnique({
    where: { id },
    include: {
      candidates: {
        include: {
          party: true,
          votes: true,
        },
        orderBy: {
          candidateNumber: "asc",
        },
      },
    },
  });
};