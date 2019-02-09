import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ExamsApiService } from './exams/exams-api.service';

import { ExamsComponent } from './exams/exams.component';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'new-exam', component: ExamFormComponent },
  { path: '', component: ExamsComponent },
];
@NgModule({
  declarations: [AppComponent, ExamsComponent, ExamFormComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [ExamsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
