export interface IParent {
    id?: number;
    identifier?: string;
    address?: string;
    emailAddress?: string;
    familyId?: number;
    familyIdentifier?: string;
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
}

export class Parent implements IParent {
    constructor(
        public id?: number,
        public identifier?: string,
        public address?: string,
        public emailAddress?: string,
        public familyId?: number,
        public familyIdentifier?: string,
        public firstName?: string,
        public lastName?: string,
        public primaryPhoneNumber?: string,
        public secondaryPhoneNumber?: string
    ) { }
}