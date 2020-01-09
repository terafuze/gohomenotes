import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { AmplifyService } from 'aws-amplify-angular';
import { StreamingLoggingConfig } from 'aws-sdk/clients/cloudfront';

@Component({
  selector: 'app-signin-callback',
  template: ''
})
export class LogonCallbackComponent implements OnInit, OnDestroy {
  signedIn: boolean;
  user: any;
  greeting: string;

  constructor(
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected amplifyService: AmplifyService
  ) {
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
        this.greeting = 'Hello ' + this.user.username;
        console.log('Greeting: ' + this.greeting);
        this.amplifyService
          .auth()
          .currentSession()
          .then(data => console.log('auth data: ' + data.idToken))
          .catch(err => console.log('auth error: ' + err));
      }
    });
  }

  ngOnInit() {
    console.log('In Callback!');
    var authCode = this.activatedRoute.snapshot.queryParams.code;
    console.log('Auth Code: ' + authCode);
  }

  ngOnDestroy() {}
}
