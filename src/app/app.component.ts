import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService } from './to-do.service';
import { Task } from 'src/app/to-do.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'to-do';
  tasks: Task[] = [];
  sub = new Subscription();
  constructor(
    private toDoService: ToDoService
  ){}
  ngOnInit(): void {
    this.getTasks();
    this.getNovaTask();
  }
  getTasks(){
    this.tasks = this.toDoService.getTasks();
  }
  getNovaTask(){
    this.sub = this.toDoService.emiteNovaTask.subscribe(
      res => this.getTasks()
    );
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

