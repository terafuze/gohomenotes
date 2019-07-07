export interface IParentRegistration {
  id?: number;
  identifier?: string;
  address?: string;
  emailAddress?: string;
  familyRegistrationId?: number;
  familyRegistrationIdentifier?: string;
  firstName?: string;
  lastName?: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
}

export class ParentRegistration implements IParentRegistration {
  constructor(
    public id?: number,
    public identifier?: string,
    public address?: string,
    public emailAddress?: string,
    public familyRegistrationId?: number,
    public familyRegistrationIdentifier?: string,
    public firstName?: string,
    public lastName?: string,
    public primaryPhoneNumber?: string,
    public secondaryPhoneNumber?: string
  ) {}
}
