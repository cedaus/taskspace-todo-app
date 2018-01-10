import {Component, OnInit} from '@angular/core';
// PROJECT
import {TaskService} from '../../_core/services/task.service';
import {Task, ReverseTask} from '../../_core/models/task.models';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: []
})

export class TaskListsComponent implements OnInit {
  categories = [];
  selectedCategoryID: null;
  // Task
  completedTasks: Task[] = [];
  incompletedTasks: Task[] = [];
  task: Task = new Task({});
  // Toggles
  showCompleted = false;
  showTaskInfo: boolean = false;

  // Errors, Modals, Loaders
  error = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getCategories().subscribe(res => {
      this.categories = res['categories'];
      this.selectCategory(this.categories[0]);
    }, err => {
      this.error = err;
    });
  }

  selectCategory(category) {
    this.selectedCategoryID = category.id;
    this.taskService.getTasksForCategory(category.id).subscribe((res) => {
      this.completedTasks = this.segregateTasks(res['tasks'], true);
      this.incompletedTasks = this.segregateTasks(res['tasks'], false);
      this.reset();
    }, err => {
      this.error = err;
    });
  }

  segregateTasks(tasks, completed: boolean) {
    return tasks.filter(function(task) {
      return task.completed === completed;
    });
  }

  // Button Triggers
  reset() {
    this.error = null;
    this.showCompleted = false;
    this.showTaskInfo = false;
  }
  add() {
    this.error = null;
    this.showTaskInfo = true;
  }
  close() {
    this.error = null;
    this.showTaskInfo = false;
  }

  // Actions on Tasks
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
    if (this.preSaveTask()) {
      const context = new ReverseTask(this.task);
      this.taskService.createTask(context).subscribe(res => {
        this.postSaveTask(new Task(res));
      }, err => {
        this.error = err;
      });
    }
  }

  // Pre Actions
  preSaveTask() {
    if (!this.task.title) {
      this.error = 'Please fill the task title!'
      return false;
    }
    return true;
  }

  // Post Actions
  postToggleTask(task) {
    if (task.completed) {
      this.completedTasks.push(task);
      this.incompletedTasks = this.incompletedTasks.filter(item => {
        return item.id !== task.id;
      });
    } else {
      this.incompletedTasks.push(task);
      this.completedTasks = this.completedTasks.filter(item => {
          return item.id !== task.id;
      });
    }
  }
  postDeleteTask(task) {
    if (task.completed) {
      this.completedTasks = this.completedTasks.filter(item => {
          return item.id !== task.id;
      });
    } else {
      this.incompletedTasks = this.incompletedTasks.filter(item => {
        return item.id !== task.id;
      });
    }
  }
  postSaveTask(task) {
    this.refreshTask();
    if (task.completed) {
      this.completedTasks.push(task);
    } else {
      this.incompletedTasks.push(task);
    }
    this.showCompleted = task.completed;
    this.close();
  }
}
