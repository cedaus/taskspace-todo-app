import {Component, OnInit, ViewChild} from '@angular/core';
// PROJECT
import {TaskService} from '../../_core/services/task.service';
import {Task, ReverseTask, TaskCategory} from '../../_core/models/task.models';
import {constructAll, bool} from '../../_core/helpers/base.utils';
import {StorageService} from '../../_core/services/storage.service';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: []
})

export class TaskListsComponent implements OnInit {
  categories = [];
  selectedCategoryID: null;
  // Task
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  task: Task = new Task({});
  // Toggles
  showCompleted = false;
  showImportant = false;
  showTaskInfo: boolean = false;

  // Errors, Modals, Loaders
  error = null;

  constructor(private taskService: TaskService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.showImportant = bool(this.storageService.get('showImportant'));
    this.taskService.getCategories().subscribe(res => {
      this.categories = constructAll(res['categories'], TaskCategory);
      const categoryID = this.storageService.get('categoryID') || this.categories[0].id;
      this.selectCategory(categoryID);
    }, err => {
      this.error = err;
    });
  }

  selectCategory(category_id) {
    this.selectedCategoryID = category_id;
    this.storageService.set('categoryID', this.selectedCategoryID);
    this.getTasks();
  }

  toggleImportant() {
    this.showImportant = !this.showImportant;
    this.storageService.set('showImportant', this.showImportant);
    this.filterTasks();
  }

  // Button Triggers
  reset() {
    this.error = null;
    this.showCompleted = false;
    this.showTaskInfo = false;
  }
  add() {
    this.error = null;
    this.refreshTask();
    this.showTaskInfo = true;
  }
  close() {
    this.error = null;
    this.showTaskInfo = false;
  }
  edit(task) {
    this.task = task;
    this.error = null;
    this.showTaskInfo = true;
  }

  // Actions on Tasks
  getTasks() {
    this.taskService.getTasksForCategory(this.selectedCategoryID).subscribe((res) => {
      this.allTasks = constructAll(res['tasks'], Task);
      this.filterTasks();
      this.reset();
    }, err => {
      this.error = err;
    });
  }

  filterTasks() {
    this.filteredTasks = this.allTasks.filter((item) => {
      if (this.showImportant) {
        return item.completed === this.showCompleted && item.important === true;
      } else {
        return item.completed === this.showCompleted;
      }
    });
  }

  refreshTask() {
    this.task = new Task({});
  }

  toggleTask(task) {
    this.error = null;
    const context = {task_id: task.id, completed: !task.completed};
    this.taskService.updateTask(task.id, context).subscribe(res => {
      this.postToggleTask(new Task(res));
    }, err => {
      this.error = err;
    });
  }
  deleteTask(task) {
    this.error = null;
    this.taskService.deleteTask(task.id).subscribe(res => {
      this.postDeleteTask(task);
    }, err => {
      this.error = err;
    });
  }
  saveTask() {
    this.error = null;
    this.task['categoryId'] = this.task['categoryId'] || this.selectedCategoryID;
    if (this.preSaveTask() && !this.task.id) {
      const context = new ReverseTask(this.task);
      this.taskService.createTask(context).subscribe(res => {
        this.postCreateTask(new Task(res));
      }, err => {
        this.error = err;
      });
    } else if (this.preSaveTask() && this.task.id) {
      const context = new ReverseTask(this.task);
      this.taskService.updateTask(this.task.id, context).subscribe(res => {
        this.postUpdateTask(new Task(res));
      }, err => {
        this.error = err;
      });
    }
  }

  // Pre Actions
  preSaveTask() {
    if (!this.task.title) {
      this.error = 'Please fill the task title!';
      return false;
    }
    return true;
  }

  // Post Actions
  postToggleTask(task) {
    /*Order Matters*/
    this.allTasks = this.allTasks.filter(item => {
        return item.id !== task.id;
    });
    this.allTasks.push(task);
    this.filterTasks();
  }
  postDeleteTask(task) {
    /*Order Matters*/
    this.allTasks = this.allTasks.filter(item => {
        return item.id !== task.id;
    });
    this.filterTasks();
  }
  postCreateTask(task) {
    /*Order Matters*/
    this.refreshTask();
    this.allTasks.push(task);
    this.showCompleted = task.completed;
    this.filterTasks();
    this.close();
  }
  postUpdateTask(task) {
    this.allTasks = this.allTasks.map((item) => {
      if (item.id === task.id) {
        return task;
      } else {
        return item;
      }
    });
    this.showCompleted = task.completed;
    this.filterTasks();
    this.close();
  }
}
