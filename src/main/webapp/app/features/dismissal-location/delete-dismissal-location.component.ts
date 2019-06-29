import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from './dismissal-location.service';

@Component({
    selector: 'app-delete-dismissal-location',
    templateUrl: './delete-dismissal-location.component.html'
})
export class DeleteDismissalLocationComponent {
    dismissalLocation: IDismissalLocation;

    constructor(
        protected dismissalLocationService: DismissalLocationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dismissalLocationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dismissalLocationListModification',
                content: 'Deleted a dismissalLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-dismissal-location-popup',
    template: ''
})
export class DeleteDismissalLocationPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dismissalLocation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteDismissalLocationComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dismissalLocation = dismissalLocation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/dismissal-locations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/dismissal-locations', { outlets: { popup: null } }]);
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
