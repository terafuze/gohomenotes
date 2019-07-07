import { IParent } from 'app/shared/model/parent.model';
export interface IStudent {
  id?: number;
  identifier?: string;
  firstName?: string;
  lastName?: string;
  parentId?: number;
  parents?: IParent[];
  schoolId?: number;
  schoolIdentifier?: string;
  schoolGradeId?: number;
  schoolGradeIdentifier?: string;
  teacherId?: number;
  teacherIdentifier?: string;
  teacherFirstName?: string;
  teacherLastName?: string;
}

export class Student implements IStudent {
  static deriveTeacherIdentifier(student: IStudent): IStudent {
    student.teacherIdentifier = student.teacherFirstName + ' ' + student.teacherLastName;
    return student;
  }

  constructor(
    public id?: number,
    public identifier?: string,
    public firstName?: string,
    public lastName?: string,
    public parentId?: number,
    public parents?: IParent[],
    public schoolId?: number,
    public schoolIdentifier?: string,
    public schoolGradeId?: number,
    public schoolGradeIdentifier?: string,
    public teacherId?: number,
    public teacherIdentifier?: string,
    public teacherFirstName?: string,
    public teacherLastName?: string
  ) {}
}
