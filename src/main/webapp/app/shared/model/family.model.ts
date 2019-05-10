import { IStudent } from 'app/shared/model/student.model';
import { IParent } from 'app/shared/model/parent.model';
export interface IFamily {
    id?: number;
    identifier?: string;
    children?: IStudent[];
    parent?: IParent[];
}

export class Family implements IFamily {
    constructor(
        public id?: number,
        public identifier?: string,
        public children?: IStudent[],
        public parent?: IParent[]
    ) { }
}