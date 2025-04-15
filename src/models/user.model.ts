// src/models/user.model.ts
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  role?: 'admin' | 'user' | 'moderator';
  isActive?: boolean;
}

export interface UserCreateRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
