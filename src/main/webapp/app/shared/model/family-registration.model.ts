import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';
export interface IFamilyRegistration {
    id?: number;
    identifier?: string;
    parentRegistrations?: IParentRegistration[];
    studentRegistrations?: IStudentRegistration[];
}

export class FamilyRegistration implements IFamilyRegistration {
    constructor(
        public id?: number,
        public identifier?: string,
        public parentRegistrations?: IParentRegistration[],
        public studentRegistrations?: IStudentRegistration[]
    ) { }
}