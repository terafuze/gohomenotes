export interface IAfterSchoolProgram {
    id?: number;
    identifier?: string;
    abbreviation?: string;
    name?: string;
}

export class AfterSchoolProgram implements IAfterSchoolProgram {
    constructor(
        public id?: number,
        public identifier?: string,
        public abbreviation?: string,
        public name?: string
    ) { }
}