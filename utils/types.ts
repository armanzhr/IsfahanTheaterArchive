export interface People {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  biography: string;
  createdAt: string;
  isDeleted: boolean;
  imagesIDs: [number];
  avatarImageId: number;
}
export interface Roles {
  id: number;
  name: string;
  isDeleted: boolean;
  createdAt: string;
}
export interface Venues {
  id: number;
  name: string;
  address: string;
  createdAt: string;
}
