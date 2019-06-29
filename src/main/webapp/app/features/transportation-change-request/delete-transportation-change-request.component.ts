import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequestService } from './transportation-change-request.service';

@Component({
    selector: 'app-delete-transportation-change-request',
    templateUrl: './delete-transportation-change-request.component.html'
})
export class DeleteTransportationChangeRequestComponent {
    transportationChangeRequest: ITransportationChangeRequest;

    constructor(
        protected transportationChangeRequestService: TransportationChangeRequestService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportationChangeRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportationChangeRequestListModification',
                content: 'Deleted a transportationChangeRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-transportation-change-request-popup',
    template: ''
})
export class DeleteTransportationChangeRequestPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportationChangeRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteTransportationChangeRequestComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportationChangeRequest = transportationChangeRequest;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/transportation-change-requests', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/transportation-change-requests', { outlets: { popup: null } }]);
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
