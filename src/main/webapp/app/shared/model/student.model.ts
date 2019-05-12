import { IParent } from 'app/shared/model/parent.model';export interface IStudent {
    id?: number;
    identifier?: string;
    firstName?: string;
    lastName?: string;
    parents?: IParent[];
    
    schoolId?: number;
    schoolIdentifier?: string;
    schoolGradeId?: number;
    schoolGradeIdentifier?: string;
    teacherId?: number;
    teacherIdentifier?: string;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public identifier?: string,
        public firstName?: string,
        public lastName?: string,
        public parents?: IParent[],
        
        public schoolId?: number,
        public schoolIdentifier?: string,
        public schoolGradeId?: number,
        public schoolGradeIdentifier?: string,
        public teacherId?: number,
        public teacherIdentifier?: string
    ) { }
}