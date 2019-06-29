import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFamilyRegistration } from 'app/shared/model/family-registration.model';
import { FamilyRegistrationService } from './family-registration.service';

@Component({
    selector: 'app-delete-family-registration',
    templateUrl: './delete-family-registration.component.html'
})
export class DeleteFamilyRegistrationComponent {
    familyRegistration: IFamilyRegistration;

    constructor(
        protected familyRegistrationService: FamilyRegistrationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.familyRegistrationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'familyRegistrationListModification',
                content: 'Deleted a familyRegistration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-family-registration-popup',
    template: ''
})
export class DeleteFamilyRegistrationPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ familyRegistration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteFamilyRegistrationComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.familyRegistration = familyRegistration;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/family-registrations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/family-registrations', { outlets: { popup: null } }]);
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
