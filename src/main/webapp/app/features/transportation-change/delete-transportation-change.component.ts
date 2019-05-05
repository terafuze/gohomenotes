import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportationChange } from 'app/shared/model/transportation-change.model';
import { TransportationChangeService } from './transportation-change.service';

@Component({
    selector: 'app-delete-transportation-change',
    templateUrl: './delete-transportation-change.component.html'
})
export class DeleteTransportationChangeComponent {

    transportationChange: ITransportationChange;

    constructor(
        private transportationChangeService: TransportationChangeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportationChangeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportationChangeListModification',
                content: 'Deleted a transportationChange'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-transportation-change-popup',
    template: ''
})
export class DeleteTransportationChangePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportationChange }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteTransportationChangeComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportationChange = transportationChange;
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
