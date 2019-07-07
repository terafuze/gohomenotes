import { IUserProfile } from 'app/shared/model/user-profile.model';

export const enum State {
  MARYLAND = 'MARYLAND',
  VIRGINIA = 'VIRGINIA'
}

export interface IAddress {
  id?: number;
  identifier?: string;
  city?: string;
  line1?: string;
  line2?: string;
  state?: State;
  userProfiles?: IUserProfile[];
  zipCode?: string;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public identifier?: string,
    public city?: string,
    public line1?: string,
    public line2?: string,
    public state?: State,
    public userProfiles?: IUserProfile[],
    public zipCode?: string
  ) {}
}
