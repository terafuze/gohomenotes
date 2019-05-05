export interface ITransportationChange {
    id?: number;
    identifier?: string;
}

export class TransportationChange implements ITransportationChange {
    constructor(
        public id?: number,
        public identifier?: string
    ) { }
}