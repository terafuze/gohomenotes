export interface ISchoolGrade {
    id?: number;
    identifier?: string;
    abbreviation?: string;
    name?: string;
}

export class SchoolGrade implements ISchoolGrade {
    constructor(
        public id?: number,
        public identifier?: string,
        public abbreviation?: string,
        public name?: string
    ) { }
}