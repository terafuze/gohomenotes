import { Moment } from 'moment';
export interface IGuestRequest {
    id?: number;
    identifier?: string;
    comments?: string;
    confirmationNotes?: string;
    confirmed?: boolean;
    confirmedByUsername?: string;
    eventDate?: Moment;
    guestStudentId?: number;
    guestStudentIdentifier?: string;
    hostStudentId?: number;
    hostStudentIdentifier?: string;
    manuallyConfirmed?: boolean;
    submittedByUsername?: string;
}

export class GuestRequest implements IGuestRequest {
    constructor(
        public id?: number,
        public identifier?: string,
        public comments?: string,
        public confirmationNotes?: string,
        public confirmed?: boolean,
        public confirmedByUsername?: string,
        public eventDate?: Moment,
        public guestStudentId?: number,
        public guestStudentIdentifier?: string,
        public hostStudentId?: number,
        public hostStudentIdentifier?: string,
        public manuallyConfirmed?: boolean,
        public submittedByUsername?: string
    ) {}
}
