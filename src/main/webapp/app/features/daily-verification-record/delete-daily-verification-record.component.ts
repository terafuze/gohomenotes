import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';
import { DailyVerificationRecordService } from './daily-verification-record.service';

@Component({
    selector: 'app-delete-daily-verification-record',
    templateUrl: './delete-daily-verification-record.component.html'
})
export class DeleteDailyVerificationRecordComponent {

    dailyVerificationRecord: IDailyVerificationRecord;

    constructor(
        private dailyVerificationRecordService: DailyVerificationRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dailyVerificationRecordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dailyVerificationRecordListModification',
                content: 'Deleted a dailyVerificationRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-daily-verification-record-popup',
    template: ''
})
export class DeleteDailyVerificationRecordPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dailyVerificationRecord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteDailyVerificationRecordComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dailyVerificationRecord = dailyVerificationRecord;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
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
