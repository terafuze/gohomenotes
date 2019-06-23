
import { Moment } from 'moment';
export interface ITransportationChangeRequest {
    id?: number;
    identifier?: string;
    comments?: string;
    dismissalLocationId?: number;
    dismissalLocationIdentifier?: string;
    eventDate?: Moment;
    studentId?: number;
    studentIdentifier?: string;
    submittedByUsername?: string;
}

export class TransportationChangeRequest implements ITransportationChangeRequest {
    constructor(
        public id?: number,
        public identifier?: string,
        public comments?: string,
        public dismissalLocationId?: number,
        public dismissalLocationIdentifier?: string,
        public eventDate?: Moment,
        public studentId?: number,
        public studentIdentifier?: string,
        public submittedByUsername?: string
    ) { }
}