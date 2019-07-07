import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';
export interface ISchoolGrade {
  id?: number;
  identifier?: string;
  abbreviation?: string;
  name?: string;
  schoolId?: number;
  schoolIdentifier?: string;
  studentRegistrations?: IStudentRegistration[];
  students?: IStudent[];
  teachers?: ITeacher[];
}

export class SchoolGrade implements ISchoolGrade {
  constructor(
    public id?: number,
    public identifier?: string,
    public abbreviation?: string,
    public name?: string,
    public schoolId?: number,
    public schoolIdentifier?: string,
    public studentRegistrations?: IStudentRegistration[],
    public students?: IStudent[],
    public teachers?: ITeacher[]
  ) {}
}
