import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { GoHomeNotesUserProfileService } from './user-profile.service';

@Component({
  selector: 'app-delete-user-profile',
  templateUrl: './delete-user-profile.component.html'
})
export class DeleteUserProfileComponent {
  userProfile: IUserProfile;

  constructor(
    protected userProfileService: GoHomeNotesUserProfileService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userProfileService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userProfileListModification',
        content: 'Deleted a userProfile'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-delete-user-profile-popup',
  template: ''
})
export class DeleteUserProfilePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userProfile }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DeleteUserProfileComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.userProfile = userProfile;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-profiles', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-profiles', { outlets: { popup: null } }]);
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
