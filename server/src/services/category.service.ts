import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = () => {
  return prisma.category.findMany();
};

export const getCategoryById = (id: string) => {
  return prisma.category.findUnique({ where: { id } });
};

// export const createCategory = (data: { name: string }) => {
//   return prisma.category.create({ data });
// };

// export const updateCategory = (id: string, data: { name: string }) => {
//   return prisma.category.update({
//     where: { id },
//     data,
//   });
// };

export const deleteCategory = (id: string) => {
  return prisma.category.delete({ where: { id } });
};
