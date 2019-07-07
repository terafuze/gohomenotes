export interface IUserProfile {
  id?: number;
  identifier?: string;
  emailAddress?: string;
  firstName?: string;
  homeAddressId?: number;
  homeAddressIdentifier?: string;
  lastName?: string;
  parentId?: number;
  parentIdentifier?: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  teacherId?: number;
  teacherIdentifier?: string;
  userId?: number;
  userIdentifier?: string;
}

export class UserProfile implements IUserProfile {
  constructor(
    public id?: number,
    public identifier?: string,
    public emailAddress?: string,
    public firstName?: string,
    public homeAddressId?: number,
    public homeAddressIdentifier?: string,
    public lastName?: string,
    public parentId?: number,
    public parentIdentifier?: string,
    public primaryPhoneNumber?: string,
    public secondaryPhoneNumber?: string,
    public teacherId?: number,
    public teacherIdentifier?: string,
    public userId?: number,
    public userIdentifier?: string
  ) {}
}
