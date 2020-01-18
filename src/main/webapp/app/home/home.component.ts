import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { LoginModalService, AccountService, Account } from 'app/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  signedIn: boolean;
  user: any;
  greeting: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private amplifyService: AmplifyService
  ) {}

  ngOnInit() {
    console.log('In ngOnInit');
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      console.log('Auth State User: ' + authState.user);
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

    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
}
