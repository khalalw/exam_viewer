import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from './exam.model';
import { ExamsApiService } from './exams-api.service';

@Component({
  selector: 'app-exams',
  template: `
    <div>
      <button routerLink="/new-exam">New Exam</button>
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

  constructor(private examsApi: ExamsApiService) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.examsListSubs = this.examsApi.getExams().subscribe(res => {
      this.examsList = res;
    }, console.error);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.examsListSubs.unsubscribe();
  }
}
