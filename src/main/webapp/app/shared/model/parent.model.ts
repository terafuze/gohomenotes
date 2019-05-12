import { IStudent } from 'app/shared/model/student.model';export interface IParent {
    id?: number;
    identifier?: string;
    address?: string;
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
    primaryPhoneNumber?: string;
    secondaryPhoneNumber?: string;
    students?: IStudent[];
    
}

export class Parent implements IParent {
    constructor(
        public id?: number,
        public identifier?: string,
        public address?: string,
        public emailAddress?: string,
        public firstName?: string,
        public lastName?: string,
        public primaryPhoneNumber?: string,
        public secondaryPhoneNumber?: string,
        public students?: IStudent[]
        
    ) { }
}