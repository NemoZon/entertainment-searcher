import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllLocations = () => {
  return prisma.location.findMany({
    include: {
      user: true
    }
  });
};

export const getLocationById = (id: string) => {
  return prisma.location.findUnique({
    where: { id },
    include: {
      user: true
    }
  });
};

export const getUserLocations = (userId: string) => {
  return prisma.location.findMany({
    where: {
      user_id: userId
    }
  });
};

export const createLocation = (data: any) => {
  return prisma.location.create({
    data: {
      city: data.city,
      postal_code: data.postal_code,
      country: data.country,
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

export const updateLocation = (id: string, data: any) => {
  const updateData: any = {};
  
  if (data.city !== undefined) updateData.city = data.city;
  if (data.postal_code !== undefined) updateData.postal_code = data.postal_code;
  if (data.country !== undefined) updateData.country = data.country;
  
  return prisma.location.update({
    where: { id },
    data: updateData,
    include: {
      user: true
    }
  });
};

export const deleteLocation = (id: string) => {
  return prisma.location.delete({ where: { id } });
};