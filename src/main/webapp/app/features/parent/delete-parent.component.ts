import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';

@Component({
    selector: 'app-delete-parent',
    templateUrl: './delete-parent.component.html'
})
export class DeleteParentComponent {
    parent: IParent;

    constructor(protected parentService: ParentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parentListModification',
                content: 'Deleted a parent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-delete-parent-popup',
    template: ''
})
export class DeleteParentPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeleteParentComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parent = parent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/parents', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/parents', { outlets: { popup: null } }]);
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
