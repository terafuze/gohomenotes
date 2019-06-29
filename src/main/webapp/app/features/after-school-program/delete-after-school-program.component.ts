import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgramService } from './after-school-program.service';

@Component({
    selector: 'app-delete-after-school-program',
    templateUrl: './delete-after-school-program.component.html'
})
export class DeleteAfterSchoolProgramComponent {
    afterSchoolProgram: IAfterSchoolProgram;

    constructor(
        protected afterSchoolProgramService: AfterSchoolProgramService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.afterSchoolProgramService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'afterSchoolProgramListModification',
                content: 'Deleted a afterSchoolProgram'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-after-school-program-popup',
    template: ''
})
export class DeleteAfterSchoolProgramPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ afterSchoolProgram }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteAfterSchoolProgramComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.afterSchoolProgram = afterSchoolProgram;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/after-school-programs', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/after-school-programs', { outlets: { popup: null } }]);
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
