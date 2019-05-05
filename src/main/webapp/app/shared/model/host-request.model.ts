import { Moment } from 'moment';
export interface IHostRequest {
    id?: number;
    identifier?: string;
    comments?: string;
    confirmationNotes?: string;
    confirmed?: boolean;
    confirmedByUsername?: string;
    eventDate?: Moment;
    manuallyConfirmed?: boolean;
    submittedByUsername?: string;
}

export class HostRequest implements IHostRequest {
    constructor(
        public id?: number,
        public identifier?: string,
        public comments?: string,
        public confirmationNotes?: string,
        public confirmed?: boolean,
        public confirmedByUsername?: string,
        public eventDate?: Moment,
        public manuallyConfirmed?: boolean,
        public submittedByUsername?: string
    ) { }
}