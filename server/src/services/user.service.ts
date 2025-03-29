import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = (data: any) => {
  return prisma.user.create({ data });
};

export const updateUser = (id: string, data: any) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const upsertUser = (data: {
  auth0_id: string;
  email: string;
  firstName: string;
  lastName: string;
}) => {
  return prisma.user.upsert({
    where: { auth0_id: data.auth0_id },
    update: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      last_login: new Date(),
      updated_at: new Date(),
    },
    create: {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      last_login: new Date(),
    },
  });
};
