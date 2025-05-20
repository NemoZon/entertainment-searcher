import axios from "axios";
import {describe, expect, test, beforeEach} from '@jest/globals';
import { deleteUser, getAllUsers } from "../../src/services/user.service";

const AxiosInstance  = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const deleteAllUsers = async () => {
  const users = await getAllUsers();
  await Promise.all(users.map(async (user) => 
    deleteUser(user.id)
  ));
}

describe('Users endpoints', () => {
  beforeEach(async () => {
    await deleteAllUsers();
  });
  describe('POST /api/users', () => {
    test('Create one user', async () => {
      await AxiosInstance.post('/users', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        auth0_id: 'password123',
      });
      const users = await getAllUsers();    
      expect(users.length).toBe(1);
      expect(users[0].firstName).toBe('John');
      expect(users[0].lastName).toBe('Doe');
      expect(users[0].email).toBe('john.doe@gmail.com');
      expect(users[0].auth0_id).not.toBe('password123');
    })
    test('Create users with the same email', async () => {
      await AxiosInstance.post('/users', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        auth0_id: 'password123',
      });
      let users = await getAllUsers();
      expect(users.length).toBe(1);
      try {
        await AxiosInstance.post('/users', {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          auth0_id: 'password123',
        });
      } catch (error) {}
      users = await getAllUsers();
      expect(users.length).toBe(1);
    })
  })
});

