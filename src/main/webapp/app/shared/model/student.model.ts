export interface IStudent {
    id?: number;
    identifier?: string;
    familyId?: number;
    familyIdentifier?: string;
    firstName?: string;
    lastName?: string;
    schoolId?: number;
    schoolIdentifier?: string;
    schoolGradeId?: number;
    schoolGradeIdentifier?: string;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public identifier?: string,
        public familyId?: number,
        public familyIdentifier?: string,
        public firstName?: string,
        public lastName?: string,
        public schoolId?: number,
        public schoolIdentifier?: string,
        public schoolGradeId?: number,
        public schoolGradeIdentifier?: string
    ) { }
}