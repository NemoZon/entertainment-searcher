import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPreferences = () => {
  return prisma.preference.findMany({
    include: {
      user: true
    }
  });
};

export const getPreferenceById = (id: string) => {
  return prisma.preference.findUnique({
    where: { id },
    include: {
      user: true
    }
  });
};

export const getUserPreferences = (userId: string) => {
  return prisma.preference.findMany({
    where: {
      user_id: userId
    }
  });
};

export const createPreference = (data: any) => {
  return prisma.preference.create({
    data: {
      category: data.category,
      created_at: new Date(),
      user: {
        connect: { id: data.user_id }
      }
    },
    include: {
      user: true
    }
  });
};

export const updatePreference = (id: string, data: any) => {
  return prisma.preference.update({
    where: { id },
    data: {
      category: data.category
    },
    include: {
      user: true
    }
  });
};

export const deletePreference = (id: string) => {
  return prisma.preference.delete({ where: { id } });
};