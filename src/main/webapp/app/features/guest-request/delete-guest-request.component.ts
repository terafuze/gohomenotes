import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGuestRequest } from 'app/shared/model/guest-request.model';
import { GuestRequestService } from './guest-request.service';

@Component({
    selector: 'app-delete-guest-request',
    templateUrl: './delete-guest-request.component.html'
})
export class DeleteGuestRequestComponent {

    guestRequest: IGuestRequest;

    constructor(
        private guestRequestService: GuestRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.guestRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'guestRequestListModification',
                content: 'Deleted a guestRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-guest-request-popup',
    template: ''
})
export class DeleteGuestRequestPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ guestRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteGuestRequestComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.guestRequest = guestRequest;
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
