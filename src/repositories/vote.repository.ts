import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export const findVoteByUserId = async (userId: number) => {
  return await prisma.vote.findUnique({
    where: { userId },
    include: {
      candidate: {
        include: {
          party: true,
        },
      },
    },
  });
};

export const upsertVote = async (userId: number, candidateId: number) => {
  return await prisma.vote.upsert({
    where: { userId },
    update: {
      candidateId,
      timestamp: new Date(),
    },
    create: {
      userId,
      candidateId,
    },
    include: {
      candidate: {
        include: {
          party: true,
          constituency: true,
        },
      },
      user: {
        include: {
          constituency: true,
        },
      },
    },
  });
};

export const countVotesByCandidate = async (candidateId: number) => {
  return await prisma.vote.count({
    where: { candidateId },
  });
};
