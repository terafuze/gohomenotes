import { Moment } from 'moment';
export interface IEarlyPickupRequest {
    id?: number;
    identifier?: string;
    comments?: string;
    eventDate?: Moment;
    pickupPerson?: string;
    pickupPersonPhone?: string;
    pickupTime?: Moment;
    returning?: boolean;
    returnTime?: Moment;
    studentId?: number;
    studentIdentifier?: string;
    submittedByUsername?: string;
}

export class EarlyPickupRequest implements IEarlyPickupRequest {
    constructor(
        public id?: number,
        public identifier?: string,
        public comments?: string,
        public eventDate?: Moment,
        public pickupPerson?: string,
        public pickupPersonPhone?: string,
        public pickupTime?: Moment,
        public returning?: boolean,
        public returnTime?: Moment,
        public studentId?: number,
        public studentIdentifier?: string,
        public submittedByUsername?: string
    ) {}
}
