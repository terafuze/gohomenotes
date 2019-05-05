import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHostRequest } from 'app/shared/model/host-request.model';
import { HostRequestService } from './host-request.service';

@Component({
    selector: 'app-delete-host-request',
    templateUrl: './delete-host-request.component.html'
})
export class DeleteHostRequestComponent {

    hostRequest: IHostRequest;

    constructor(
        private hostRequestService: HostRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hostRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hostRequestListModification',
                content: 'Deleted a hostRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-host-request-popup',
    template: ''
})
export class DeleteHostRequestPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hostRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteHostRequestComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hostRequest = hostRequest;
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
