import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'app-signin-callback',
  template: ''
})
export class LogonCallbackComponent implements OnInit, OnDestroy {
  constructor(
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    console.log('In Callback!');
    var authCode = this.activatedRoute.snapshot.queryParams.code;
    console.log('Auth Code: ' + authCode);
  }

  ngOnDestroy() {}
}
