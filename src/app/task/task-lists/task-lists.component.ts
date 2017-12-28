import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../_core/services/task.service';
// PROJECT

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: []
})

export class TaskListsComponent implements OnInit {
  selected_category_id = 1;
  completed_tasks = [];
  incompleted_tasks = [];
  showCompleted = false;
  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasksForCategory(this.selected_category_id).subscribe((res) => {
      this.completed_tasks = this.segregateTasks(res['tasks'], true);
      this.incompleted_tasks = this.segregateTasks(res['tasks'], false);
    }, err => {});
  }

  segregateTasks(tasks, completed: boolean) {
    return tasks.filter(function(task) {
      console.log(task);
      return task.completed === completed;
    });
  }
}
