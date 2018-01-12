import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../_core/services/task.service';
// PROJECT

@Component({
  selector: 'app-task-categories',
  templateUrl: './task-categories.component.html',
  styleUrls: []
})

export class TaskCategoriesComponent implements OnInit {
  user: any;
  categories = [];
  showCategoryInfo: boolean = false;
  error = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getCategories().subscribe(res => {
      this.categories = res['categories'];
    }, err => {
      this.error = err;
    });
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
