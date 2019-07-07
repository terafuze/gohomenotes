export interface IAfterSchoolProgram {
  id?: number;
  identifier?: string;
  abbreviation?: string;
  name?: string;
  schoolId?: number;
  schoolIdentifier?: string;
}

export class AfterSchoolProgram implements IAfterSchoolProgram {
  constructor(
    public id?: number,
    public identifier?: string,
    public abbreviation?: string,
    public name?: string,
    public schoolId?: number,
    public schoolIdentifier?: string
  ) {}
}
