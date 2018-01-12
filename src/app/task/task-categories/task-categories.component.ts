import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../_core/services/task.service';
import {TaskCategory} from '../../_core/models/task.models';
import {constructAll} from '../../_core/helpers/base.utils';
// PROJECT

@Component({
  selector: 'app-task-categories',
  templateUrl: './task-categories.component.html',
  styleUrls: []
})

export class TaskCategoriesComponent implements OnInit {
  user: any;
  categories: TaskCategory[] = [];
  category: TaskCategory = new TaskCategory({});
  showCategoryInfo: boolean = false;
  error = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getCategories().subscribe(res => {
      this.categories = constructAll(res['categories'], TaskCategory);
    }, err => {
      this.error = err;
    });
  }

  refreshCategory() {
    this.category = new TaskCategory({});
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

  // Actions on Categories
  saveCategory() {
    this.error = null;
    if (this.preSaveCategory()) {
      this.taskService.createCategory(this.category).subscribe(res => {
        this.postSaveCategory(new TaskCategory(res));
      }, err => {
        this.error = err;
      });
    }
  }

  // Pre & Post Actions
  preSaveCategory() {
    if (!this.category.name) {
      this.error = 'Please fill the category name!'
      return false;
    }
    return true;
  }
  postSaveCategory(category) {
    this.categories.unshift(category);
    this.close();
    this.refreshCategory();
  }
}
