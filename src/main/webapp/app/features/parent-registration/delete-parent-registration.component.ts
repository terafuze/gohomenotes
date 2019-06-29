import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { ParentRegistrationService } from './parent-registration.service';

@Component({
    selector: 'app-delete-parent-registration',
    templateUrl: './delete-parent-registration.component.html'
})
export class DeleteParentRegistrationComponent {
    parentRegistration: IParentRegistration;

    constructor(
        protected parentRegistrationService: ParentRegistrationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parentRegistrationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parentRegistrationListModification',
                content: 'Deleted a parentRegistration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-parent-registration-popup',
    template: ''
})
export class DeleteParentRegistrationPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parentRegistration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteParentRegistrationComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parentRegistration = parentRegistration;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/parent-registrations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/parent-registrations', { outlets: { popup: null } }]);
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
