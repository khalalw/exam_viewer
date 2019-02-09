import { Component, OnInit } from '@angular/core';
import { ExamsApiService } from '../exams/exams-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-form',
  template: `
    <div>
      <h2>New Exam</h2>
      <label for="exam-title">Title</label>
      <input id="exam-title" (keyup)="updateTitle($event)" />
      <button (click)="saveExam()">Save Exam</button>
    </div>
  `,
  styleUrls: ['./exam-form.component.scss'],
})
export class ExamFormComponent implements OnInit {
  exam = { title: '', description: '' };
  constructor(private examsApi: ExamsApiService, private router: Router) {}

  updateTitle(event: any) {
    this.exam.title = event.target.value;
  }

  updateDescrption(event: any) {
    this.exam.description = event.target.value;
  }

  saveExam() {
    this.examsApi
      .saveExam(this.exam)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }

  ngOnInit() {}
}
