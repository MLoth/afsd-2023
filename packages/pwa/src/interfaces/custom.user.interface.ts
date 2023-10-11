export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface CustomUser {
  id?: string
  uid: string
  locale?: string
  role: Role
  createdAt?: string
  updatedAt?: string
}
