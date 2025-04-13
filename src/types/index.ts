
export type UserRole = 'owner' | 'seeker';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: UserRole;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  location: string;
  contact: string;
  ownerId: string;
  isRented: boolean;
  createdAt: string;
  imageUrl?: string;
}
