import { Moment } from 'moment';
export interface IGoHomeNotesReport {
  id?: number;
  identifier?: string;
  eventDate?: Moment;
  finalized?: boolean;
  generatedByUsername?: string;
  goHomeNotesReport?: any;
  goHomeNotesReportMimeType?: string;
  schoolId?: number;
  schoolIdentifier?: string;
  timestamp?: any;
}

export class GoHomeNotesReport implements IGoHomeNotesReport {
  constructor(
    public id?: number,
    public identifier?: string,
    public eventDate?: Moment,
    public finalized?: boolean,
    public generatedByUsername?: string,
    goHomeNotesReport?: any,
    goHomeNotesReportMimeType?: string,
    public schoolId?: number,
    public schoolIdentifier?: string,
    public timestamp?: any
  ) {}
}
