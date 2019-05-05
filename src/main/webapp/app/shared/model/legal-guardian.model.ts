export interface ILegalGuardian {
    id?: number;
    identifier?: string;
}

export class LegalGuardian implements ILegalGuardian {
    constructor(
        public id?: number,
        public identifier?: string
    ) { }
}