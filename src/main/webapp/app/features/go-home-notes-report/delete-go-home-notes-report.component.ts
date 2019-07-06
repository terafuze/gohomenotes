import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';
import { GoHomeNotesReportService } from './go-home-notes-report.service';

@Component({
  selector: 'app-delete-go-home-notes-report',
  templateUrl: './delete-go-home-notes-report.component.html'
})
export class DeleteGoHomeNotesReportComponent {
  goHomeNotesReport: IGoHomeNotesReport;

  constructor(
    protected goHomeNotesReportService: GoHomeNotesReportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.goHomeNotesReportService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'goHomeNotesReportListModification',
        content: 'Deleted a goHomeNotesReport'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-delete-go-home-notes-report-popup',
  template: ''
})
export class DeleteGoHomeNotesReportPopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ goHomeNotesReport }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DeleteGoHomeNotesReportComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.goHomeNotesReport = goHomeNotesReport;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/go-home-notes-reports', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/go-home-notes-reports', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
