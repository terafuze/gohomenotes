export interface ITeacher {
    id?: number;
    identifier?: string;
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public identifier?: string
    ) { }
}