// src/services/users.service.ts
import { BaseService } from './base.service';
import { User } from '../models/user.model';

export class UsersService extends BaseService {
  async createUser(userData: Partial<User>): Promise<User> {
    const response = await this.request
      .post(this.getFullUrl('users'))
      .send(userData)
      .expect(201);
    
    return this.handleResponse<User>(response);
  }

  async getUser(userId: string): Promise<User> {
    const response = await this.request
      .get(this.getFullUrl(`users/${userId}`))
      .expect(200);
    
    return this.handleResponse<User>(response);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await this.request
      .patch(this.getFullUrl(`users/${userId}`))
      .send(userData)
      .expect(200);
    
    return this.handleResponse<User>(response);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.request
      .delete(this.getFullUrl(`users/${userId}`))
      .expect(204);
  }

  async listUsers(page = 1, limit = 10): Promise<User[]> {
    const response = await this.request
      .get(this.getFullUrl('users'))
      .query({ page, limit })
      .expect(200);
    
    return this.handleResponse<User[]>(response);
  }
}
