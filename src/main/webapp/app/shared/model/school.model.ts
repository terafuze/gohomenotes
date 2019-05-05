import { Moment } from 'moment';
import { IStudent } from 'app/shared/model/student.model';

export interface ISchool {
    id?: number;
    identifier?: string;
    abbreviation?: string;
    goHomeNotesDailyCutoffTime?: Moment;
    goHomeNotesStartDate?: Moment;
    goHomeNotesStopDate?: Moment;
    name?: string;
    students?: IStudent[];
}

export class School implements ISchool {
    constructor(
        public id?: number,
        public identifier?: string,
        public abbreviation?: string,
        public goHomeNotesDailyCutoffTime?: Moment,
        public goHomeNotesStartDate?: Moment,
        public goHomeNotesStopDate?: Moment,
        public name?: string,
        public students?: IStudent[]
    ) { }
}