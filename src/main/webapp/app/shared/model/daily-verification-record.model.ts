import { Moment } from 'moment';
export interface IDailyVerificationRecord {
    id?: number;
    identifier?: string;
    goHomeNotesReport?: any;
    goHomeNotesReportContentType?: string;
    timestamp?: any;
}

export class DailyVerificationRecord implements IDailyVerificationRecord {
    constructor(
        public id?: number,
        public identifier?: string,
        goHomeNotesReport?: any,
        goHomeNotesReportContentType?: string,
        public timestamp?: any
    ) { }
}