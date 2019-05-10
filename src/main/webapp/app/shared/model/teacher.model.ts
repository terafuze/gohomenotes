export interface ITeacher {
    id?: number;
    identifier?: string;
    firstName?: string;
    lastName?: string;
    schoolId?: number;
    schoolIdentifier?: string;
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public identifier?: string,
        public firstName?: string,
        public lastName?: string,
        public schoolId?: number,
        public schoolIdentifier?: string
    ) { }
}