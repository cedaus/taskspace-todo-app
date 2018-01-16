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
  selectedCategoryID = 1;
  // Task
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  task: Task = new Task({});
  // Toggles
  showCompleted = false;
  showImportant = false;
  taskState: string;
  showTaskInfo: boolean = false;
  showTaskLoader: boolean = true;

  // Errors, Modals, Loaders
  error = null;
  loading: boolean = true;

  constructor(private taskService: TaskService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.showImportant = bool(this.storageService.get('showImportant'));
    this.taskService.getCategories().subscribe(res => {
      this.loading = false;
      this.categories = constructAll(res['categories'], TaskCategory);
      const categoryID = this.storageService.get('categoryID') || this.categories[0].id;
      this.selectCategory(categoryID);
    }, err => {
      this.loading = false;
      this.error = err;
    });
  }

  selectCategory(category_id) {
    this.selectedCategoryID = Number(category_id);
    this.storageService.set('categoryID', this.selectedCategoryID);
    this.showCompleted = false;
    this.getTasks();
  }

  toggleImportant() {
    this.showImportant = !this.showImportant;
    this.storageService.set('showImportant', this.showImportant);
    this.filterTasks();
  }

  toggleTaskState(state) {
    if (state === 'task-list') {
      this.showTaskInfo = false;
      this.showTaskLoader = false;
    } else if (state === 'task-list-loading') {
      this.showTaskInfo = false;
      this.showTaskLoader = true;
    } else if (state === 'task-info') {
      this.showTaskInfo = true;
      this.showTaskLoader = false;
    } else if (state === 'task-info-loading') {
      this.showTaskInfo = true;
      this.showTaskLoader = true;
    }
  }

  // Button Triggers
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
    this.task = Object.assign({}, task);
    this.error = null;
    this.showTaskInfo = true;
  }

  // Actions on Tasks
  getTasks() {
    this.toggleTaskState('task-list-loading');
    this.taskService.getTasksForCategory(this.selectedCategoryID).subscribe((res) => {
      this.allTasks = constructAll(res['tasks'], Task);
      this.filterTasks();
      this.toggleTaskState('task-list');
    }, err => {
      this.error = err;
      this.toggleTaskState('task-list');
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
      this.toggleTaskState('task-info-loading');
      const context = new ReverseTask(this.task);
      this.taskService.createTask(context).subscribe(res => {
        this.postCreateTask(new Task(res));
      }, err => {
        this.error = err;
        this.toggleTaskState('task-info');
      });
    } else if (this.preSaveTask() && this.task.id) {
      this.toggleTaskState('task-info-loading');
      const context = new ReverseTask(this.task);
      this.taskService.updateTask(this.task.id, context).subscribe(res => {
        this.postUpdateTask(new Task(res));
      }, err => {
        this.error = err;
        this.toggleTaskState('task-info');
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
    this.error = null;
    this.toggleTaskState('task-list');
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
    this.error = null;
    this.toggleTaskState('task-list');
  }
}
