import { Moment } from 'moment';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';
export interface ISchool {
    id?: number;
    identifier?: string;
    abbreviation?: string;
    afterSchoolPrograms?: IAfterSchoolProgram[];
    dismissalLocations?: IDismissalLocation[];
    goHomeNotesDailyCutoffTime?: Moment;
    goHomeNotesStartDate?: Moment;
    goHomeNotesStopDate?: Moment;
    name?: string;
    schoolGrades?: ISchoolGrade[];
    students?: IStudent[];
    teachers?: ITeacher[];
}

export class School implements ISchool {
    constructor(
        public id?: number,
        public identifier?: string,
        public abbreviation?: string,
        public afterSchoolPrograms?: IAfterSchoolProgram[],
        public dismissalLocations?: IDismissalLocation[],
        public goHomeNotesDailyCutoffTime?: Moment,
        public goHomeNotesStartDate?: Moment,
        public goHomeNotesStopDate?: Moment,
        public name?: string,
        public schoolGrades?: ISchoolGrade[],
        public students?: IStudent[],
        public teachers?: ITeacher[]
    ) { }
}