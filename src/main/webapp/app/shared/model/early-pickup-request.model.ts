export interface IEarlyPickupRequest {
    id?: number;
    identifier?: string;
}

export class EarlyPickupRequest implements IEarlyPickupRequest {
    constructor(
        public id?: number,
        public identifier?: string
    ) { }
}