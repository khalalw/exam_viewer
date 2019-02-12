import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as Auth0 from 'auth0-web';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ExamsApiService } from './exams/exams-api.service';

import { ExamsComponent } from './exams/exams.component';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-exam', component: ExamFormComponent },
  { path: '', component: ExamsComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    ExamFormComponent,
    CallbackComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [ExamsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'khalalw.auth0.com',
      audience: 'https://online-exam.kwalker.io',
      clientID: 'eQiYqlalpNQGq5pl1FnnPQCQrodaRUz2`',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams',
    });
  }
}
