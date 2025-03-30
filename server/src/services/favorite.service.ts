import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFavorites = () => {
  return prisma.favorite.findMany({
    include: {
      user: true,
      event: {
        include: {
          category: true
        }
      }
    }
  });
};

export const getFavoriteById = (id: string) => {
  return prisma.favorite.findUnique({
    where: { id },
    include: {
      user: true,
      event: {
        include: {
          category: true
        }
      }
    }
  });
};

export const getUserFavorites = (userId: string) => {
  return prisma.favorite.findMany({
    where: {
      user_id: userId
    },
    include: {
      event: {
        include: {
          category: true
        }
      }
    }
  });
};

export const createFavorite = (data: any) => {
  return prisma.favorite.create({
    data: {
      created_at: new Date(),
      user: {
        connect: { id: data.user_id }
      },
      event: {
        connect: { id: data.event_id }
      }
    },
    include: {
      user: true,
      event: {
        include: {
          category: true
        }
      }
    }
  });
};

export const deleteFavorite = (id: string) => {
  return prisma.favorite.delete({ where: { id } });
};