import * as Auth0 from 'auth0-web';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from './exam.model';
import { ExamsApiService } from './exams-api.service';

@Component({
  selector: 'app-exams',
  template: `
    <div>
      <button routerLink="/new-exam">New Exam</button>
      <button (click)="signIn()" *ngIf="!authenticated">Sign In</button>
      <button (click)="signOut()" *ngIf="authenticated">Sign Out</button>
      <p *ngIf="authenticated">Hello, {{ getProfile().name }}</p>
      <ul>
        <li *ngFor="let exam of examsList">
          {{ exam.title }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSubs: Subscription;
  examsList: Exam[];
  authenticated = false;

  constructor(private examsApi: ExamsApiService) {}

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.examsListSubs = this.examsApi.getExams().subscribe(res => {
      this.examsList = res;
    }, console.error);

    const self = this;
    Auth0.subscribe(authenticated => (self.authenticated = authenticated));
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.examsListSubs.unsubscribe();
  }
}
