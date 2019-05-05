import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from './school-grade.service';

@Component({
    selector: 'app-delete-school-grade',
    templateUrl: './delete-school-grade.component.html'
})
export class DeleteSchoolGradeComponent {

    schoolGrade: ISchoolGrade;

    constructor(
        private schoolGradeService: SchoolGradeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schoolGradeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'schoolGradeListModification',
                content: 'Deleted a schoolGrade'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-school-grade-popup',
    template: ''
})
export class DeleteSchoolGradePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schoolGrade }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteSchoolGradeComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.schoolGrade = schoolGrade;
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
