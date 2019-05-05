import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';
import { EarlyPickupRequestService } from './early-pickup-request.service';

@Component({
    selector: 'app-delete-early-pickup-request',
    templateUrl: './delete-early-pickup-request.component.html'
})
export class DeleteEarlyPickupRequestComponent {

    earlyPickupRequest: IEarlyPickupRequest;

    constructor(
        private earlyPickupRequestService: EarlyPickupRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.earlyPickupRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'earlyPickupRequestListModification',
                content: 'Deleted a earlyPickupRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-early-pickup-request-popup',
    template: ''
})
export class DeleteEarlyPickupRequestPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ earlyPickupRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteEarlyPickupRequestComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.earlyPickupRequest = earlyPickupRequest;
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
