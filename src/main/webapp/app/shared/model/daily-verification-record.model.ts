import { Moment } from 'moment';
export interface IDailyVerificationRecord {
    id?: number;
    identifier?: string;
    goHomeNotesReport?: any;
    goHomeNotesReportMimeType?: string;
    timestamp?: any;
}

export class DailyVerificationRecord implements IDailyVerificationRecord {
    constructor(
        public id?: number,
        public identifier?: string,
        goHomeNotesReport?: any,
        goHomeNotesReportMimeType?: string,
        public timestamp?: any
    ) { }
}