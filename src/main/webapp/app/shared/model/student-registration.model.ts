export interface IStudentRegistration {
  id?: number;
  identifier?: string;
  familyRegistrationId?: number;
  familyRegistrationIdentifier?: string;
  firstName?: string;
  lastName?: string;
  schoolGradeId?: number;
  schoolGradeIdentifier?: string;
}

export class StudentRegistration implements IStudentRegistration {
  constructor(
    public id?: number,
    public identifier?: string,
    public familyRegistrationId?: number,
    public familyRegistrationIdentifier?: string,
    public firstName?: string,
    public lastName?: string,
    public schoolGradeId?: number,
    public schoolGradeIdentifier?: string
  ) {}
}
