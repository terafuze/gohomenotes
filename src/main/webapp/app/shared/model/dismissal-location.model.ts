export interface IDismissalLocation {
    id?: number;
    identifier?: string;
    abbreviation?: string;
    assignedPassengers?: number;
    maxGuestsPerStudent?: number;
    maxPassengers?: number;
    name?: string;
    transfersAllowed?: boolean;
}

export class DismissalLocation implements IDismissalLocation {
    constructor(
        public id?: number,
        public identifier?: string,
        public abbreviation?: string,
        public assignedPassengers?: number,
        public maxGuestsPerStudent?: number,
        public maxPassengers?: number,
        public name?: string,
        public transfersAllowed?: boolean
    ) { }
}