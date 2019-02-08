import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExamsApiService } from './exams/exams-api.service';
import { Exam } from './exams/exam.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
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
