import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';

@Component({
  selector: 'app-view-go-home-notes-report',
  templateUrl: './view-go-home-notes-report.component.html'
})
export class ViewGoHomeNotesReportComponent implements OnInit {
  goHomeNotesReport: IGoHomeNotesReport;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ goHomeNotesReport }) => {
      this.goHomeNotesReport = goHomeNotesReport;
    });
  }

  previousState() {
    window.history.back();
  }
}
