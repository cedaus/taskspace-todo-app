import {Component, OnInit} from '@angular/core';
// PROJECT

@Component({
  selector: 'app-task-categories',
  templateUrl: './task-categories.component.html',
  styleUrls: []
})

export class TaskCategoriesComponent implements OnInit {
  user: any;
  showCategoryInfo: boolean = false;
  error = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  // Button Triggers
  reset() {
    this.error = null;
    this.showCategoryInfo = false;
  }
  add() {
    this.error = null;
    this.showCategoryInfo = true;
  }
  close() {
    this.error = null;
    this.showCategoryInfo = false;
  }
}
