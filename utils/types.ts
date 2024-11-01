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
  startYear: number;
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
export interface Media {
  id: number;
  url: string;
  alt: string;
  title: string;
}
export interface MediaModel {
  alt: string;
  title: string;
  file: File;
}
export interface Show {
  id: number;
  posterImageId: number;
  posterImageUrl: string;
  posterImageAlt: string;
  posterImageTitle: string;
  slug: string;
  imagesIDs: number[] | any;
  title: string;
  description: string;
  metaDescription: string;
  showTimes: {
    id?: number;
    showId?: number;
    venueId?: number;
    startDate?: string;
    endDate?: string;
    showTimeStart?: string;
    isDeleted?: boolean;
  }[];
  showPeopleRoles: {
    id?: number;
    showId?: number;
    personId: number;
    roleId: number;
    createdAt?: string;
    isDeleted?: boolean;
    firstName?: string;
    lastName?: string;
    startYear: number;
    avatarImageId: number;
  }[];
}
export interface ShowInclusive {
  id: number;
  title: string;
  posterImageId: number;
  posterImageUrl: string;
  posterImageAlt: string;
  posterImageTitle: string;
  slug: string;
}
export interface ShowResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: ShowInclusive[];
}
export interface OneShowResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  posterImageId: number;
  posterImageUrl: string;
  posterImageTitle: string;
  posterImageAlt: string;
  images: {
    id: number;
    url: string;
    alt: string;
    title: string;
    isDeleted: boolean;
    createdAt: string;
  }[];
  showPeopleRoles: ShowPeople[];
  showTimes: ShowTimes[];
}
export interface ShowTimes {
  venueName: string;
  venueAddress: string;
  startDate: string;
  endDate: string;
  showTimeStart: string;
}
export interface ShowPeople {
  id?: number;
  roleId?: number;
  personId?: number;
  name: string;
  firstName?: string;
  lastName?: string;
  startYear?: number;
  slug?: string;
  avatarImageUrl?: string;
}
export interface SelectedFile {
  id: number;
  title?: string;
  alt?: string;
  file: File;
  previewSrc: string;
}
export interface Users {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: ("Admin" | "User" | "Support")[];
}
export interface Changes {
  id: 0;
  entityName: string;
  entityId: 0;
  requesterUserId: 0;
  requesterUser: {
    id: 0;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: true;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: true;
    twoFactorEnabled: true;
    lockoutEnd: string;
    lockoutEnabled: true;
    accessFailedCount: 0;
    firstName: string;
    lastName: string;
    isActive: true;
  };
  status: 0;
  changes: string;
  createdAt: string;
}
