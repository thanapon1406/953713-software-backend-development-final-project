import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export const create = async (data: Prisma.CandidateCreateInput) => {
  return await prisma.candidate.create({
    data,
    include: {
      user: true,
      party: true,
      constituency: true,
    },
  });
};

export const findById = async (id: number) => {
  return await prisma.candidate.findUnique({
    where: { id },
    include: {
      party: true,
      constituency: true,
    },
  });
};

export const findByConstituency = async (constituencyId: number) => {
  return await prisma.candidate.findMany({
    where: { constituencyId },
    include: {
      party: true,
      votes: true,
    },
    orderBy: {
      candidateNumber: "asc",
    },
  });
};