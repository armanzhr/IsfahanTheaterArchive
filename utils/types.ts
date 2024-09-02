export interface People {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  biography: string;
  createdAt: string;
  isDeleted: boolean;
  imagesIDs: [number];
}
