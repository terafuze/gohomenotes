import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistrationService } from './student-registration.service';

@Component({
    selector: 'app-delete-student-registration',
    templateUrl: './delete-student-registration.component.html'
})
export class DeleteStudentRegistrationComponent {
    studentRegistration: IStudentRegistration;

    constructor(
        protected studentRegistrationService: StudentRegistrationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentRegistrationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentRegistrationListModification',
                content: 'Deleted a studentRegistration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-student-registration-popup',
    template: ''
})
export class DeleteStudentRegistrationPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentRegistration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteStudentRegistrationComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.studentRegistration = studentRegistration;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/student-registrations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/student-registrations', { outlets: { popup: null } }]);
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
