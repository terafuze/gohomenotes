import { IStudent } from 'app/shared/model/student.model';
export interface ITeacher {
    id?: number;
    identifier?: string;
    firstName?: string;
    lastName?: string;
    schoolId?: number;
    schoolIdentifier?: string;
    schoolGradeId?: number;
    schoolGradeIdentifier?: string;
    students?: IStudent[];
    userProfileId?: number;
    userProfileIdentifier?: string;
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public identifier?: string,
        public firstName?: string,
        public lastName?: string,
        public schoolId?: number,
        public schoolIdentifier?: string,
        public schoolGradeId?: number,
        public schoolGradeIdentifier?: string,
        public students?: IStudent[],
        public userProfileId?: number,
        public userProfileIdentifier?: string
    ) { }
}