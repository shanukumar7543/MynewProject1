export interface Folder {
  _id?: string;
  organizationID: string;
  name: string;
  default?: boolean;
}

export interface VidyChat {
  userId: string;
  organizationId: string;
  publicLink: string;
  startStep: string;
  endStep: string;
  folder: string;
  name: string;
  contactDetails: boolean;
  language: string;
  // S3Link: {
  //   fileName: string;
  //   url: string;
  //   bucket: string;
  // };
  // overlaytext: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  thumbnail?: string;
}
