export interface IStudent {
    id?: number;
    identifier?: string;
    firstName?: string;
    lastName?: string;
    schoolId?: number;
    schoolIdentifier?: string;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public identifier?: string,
        public firstName?: string,
        public lastName?: string,
        public schoolId?: number,
        public schoolIdentifier?: string
    ) { }
}