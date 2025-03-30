import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();


const API_URL = process.env.AWS_API_URL!;
const API_TOKEN = process.env.AWS_API_TOKEN!;

export const fetchExternalEvents = async (body: any) => {
  // console.log(body)
  const response = await axios.post(
    API_URL,
    body,
    {
      headers: {
        'x-api-key': API_TOKEN,
      },
    }
  );
  // console.log(response.data)
  return response.data;
};

export const getAllEvents = (where = {}) => {
  return prisma.event.findMany({
    where,
    include: {
      category: true
    }
  });
};

export const getEventById = (id: string) => {
  return prisma.event.findUnique({
    where: { id },
    include: {
      category: true  
    }
  });
};

export const createEvent = async (eventData: any) => {
  let categoryId = eventData.category_id;
  
  if (!categoryId && eventData.category) {
    const categoryName = eventData.category;
    
    let category = await prisma.category.findUnique({
      where: { name: categoryName }
    });
    
    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName }
      });
    }
    
    categoryId = category.id;
  }
  
  return prisma.event.create({
    data: {
      ticketmaster_id: eventData.ticketmaster_id,
      name: eventData.name,
      date: new Date(eventData.date),
      location: eventData.location,
      price_min: eventData.price_min,
      price_max: eventData.price_max,
      ticket_url: eventData.ticket_url,
      remaining_places: eventData.remaining_places,
      image_url: eventData.image_url,
      created_at: new Date(),
      category: {
        connect: { id: categoryId }
      }
    },
    include: {
      category: true 
    }
  });
};

export const updateEvent = async (id: string, eventData: any) => {
  const updateData: any = {};
  
  if (eventData.category_id) {
    updateData.category = {
      connect: { id: eventData.category_id }
    };
  } else if (eventData.category) {
    const categoryName = eventData.category;
    
    let category = await prisma.category.findUnique({
      where: { name: categoryName }
    });
    
    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName }
      });
    }
    
    updateData.category = {
      connect: { id: category.id }
    };
  }
  
  if (eventData.name !== undefined) updateData.name = eventData.name;
  if (eventData.date !== undefined) updateData.date = new Date(eventData.date);
  if (eventData.location !== undefined) updateData.location = eventData.location;
  if (eventData.price_min !== undefined) updateData.price_min = eventData.price_min;
  if (eventData.price_max !== undefined) updateData.price_max = eventData.price_max;
  if (eventData.ticket_url !== undefined) updateData.ticket_url = eventData.ticket_url;
  if (eventData.remaining_places !== undefined) updateData.remaining_places = eventData.remaining_places;
  if (eventData.image_url !== undefined) updateData.image_url = eventData.image_url;
  
  return prisma.event.update({ 
    where: { id }, 
    data: updateData,
    include: {
      category: true  
    }
  });
};

export const deleteEvent = (id: string) => {
  return prisma.event.delete({ where: { id } });
};
