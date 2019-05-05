export interface IDailyVerificationRecord {
    id?: number;
    identifier?: string;
}

export class DailyVerificationRecord implements IDailyVerificationRecord {
    constructor(
        public id?: number,
        public identifier?: string
    ) { }
}