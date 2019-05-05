export interface IGuestRequest {
    id?: number;
    identifier?: string;
}

export class GuestRequest implements IGuestRequest {
    constructor(
        public id?: number,
        public identifier?: string
    ) { }
}