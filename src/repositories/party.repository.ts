import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export const create = async (data: Prisma.PartyCreateInput) => {
  return await prisma.party.create({
    data,
  });
};

export const findById = async (id: number) => {
  return await prisma.party.findUnique({
    where: { id },
  });
};