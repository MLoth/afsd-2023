export interface Bird {
  __typename: string
  id?: string
  name: string
  fullname: string
  category: string
  url: string
  observations?: number
  description: string
  createdAt?: string
  updatedAt?: string
}
