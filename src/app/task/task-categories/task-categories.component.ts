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
  carouselState = 0;
  // Errors, Modals, Loaders
  error = null;
  loading: boolean = true;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getCategories().subscribe(res => {
      this.loading = false;
      this.categories = constructAll(res['categories'], TaskCategory);
    }, err => {
      this.loading = false;
      this.error = err;
    });
  }

  refreshCategory() {
    this.category = new TaskCategory({});
  }

  toggleCarousel(num) {
    this.carouselState = num;
  }

  // Button Triggers
  reset() {
    this.error = null;
    this.showCategoryInfo = false;
  }
  add() {
    this.error = null;
    this.refreshCategory();
    this.showCategoryInfo = true;
    this.carouselState = 0;
  }
  close() {
    this.error = null;
    this.showCategoryInfo = false;
    this.carouselState = 0;
  }
  edit(category) {
    this.category = category;
    this.error = null;
    this.showCategoryInfo = true;
    this.carouselState = 0;
  }

  // Actions on Categories
  saveCategory() {
    this.error = null;
    if (this.preSaveCategory() && !this.category.id) {
      this.taskService.createCategory(this.category).subscribe(res => {
        this.category = new TaskCategory(res);
        this.postCreateCategory();
      }, err => {
        this.error = err;
      });
    } else if (this.preSaveCategory() && this.category.id) {
      const context = {name: this.category.name};
      this.taskService.updateCategory(this.category.id, context).subscribe(res => {
        this.category = new TaskCategory(res);
        this.postUpdateCategory();
      }, err => {
        this.error = err;
      });
    }
  }
  deleteCategory() {
    this.error = null;
    this.taskService.deleteCategory(this.category.id).subscribe(res => {
      this.postDeleteCategory();
    }, err => {
      this.error = err;
    });
  }

  // Pre & Post Actions
  preSaveCategory() {
    if (!this.category.name) {
      this.error = 'Please fill the category name!'
      return false;
    }
    return true;
  }
  postCreateCategory() {
    this.categories.unshift(this.category);
    this.close();
    this.refreshCategory();
  }
  postUpdateCategory() {
    this.categories = this.categories.map((item) => {
      if (item.id === this.category.id) {
        return this.category;
      } else {
        return item;
      }
    })
    this.close();
    this.refreshCategory();
  }
  postDeleteCategory() {
    this.categories = this.categories.filter(item => {
      return item.id !== this.category.id;
    });
    if (!this.categories.length) {
      this.ngOnInit();
    }
    this.close();
    this.refreshCategory();
  }
}
