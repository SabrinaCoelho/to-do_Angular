import { EventEmitter, Injectable } from '@angular/core';

export class Task{
  nome: string;
  concluido: boolean;
  constructor(nome: string, concluido: boolean){
    this.nome = nome;
    this.concluido = concluido;
  }
  /* get nome(): string {
    return this.nome;
  }
  get concluido(): boolean {
    return this.concluido;
  }
  set nome(value) {
    this.nome = value;
  }
  set concluido(value) {
    this.concluido = value;
  } */
}

@Injectable({
  providedIn: 'root'
})

export class ToDoService {

  private tasks: Task[] = [];

  emiteNovaTask = new EventEmitter<any>();

  constructor() { }

  getTasks(): Task[]{
    return this.getLocalStorage();
  }
  addTask(taskForm: any){
    let novaTask = new Task(taskForm['novaTask'], false);
    //pegar situacao atual
    this.tasks = this.getLocalStorage();
    //add task
    this.tasks.push(novaTask);
    //devolver
    this.updateLocalStorage();
  }
  getLocalStorage(){
    if(localStorage.getItem("tasks")){//existe
      //transforma p obj
      return JSON.parse(localStorage.getItem("tasks")!);
    }else{//se nao tem CRIA
      return localStorage.setItem("tasks", "[]");
    }
  }
  updateLocalStorage(){
    const tasksStr = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksStr);
    this.emiteNovaTask.emit();
  }
  setConcluido(idTask: number){
    this.tasks = this.getLocalStorage();
    this.tasks[idTask].concluido = !this.tasks[idTask].concluido;//ok com poo?
    this.updateLocalStorage();
  }
  removerTask(idTask: number){
    this.tasks = this.getLocalStorage();
    this.tasks.splice(idTask, 1);
    this.updateLocalStorage();
  }
  editaTask(idTask: number, valor: string){
    this.tasks = this.getLocalStorage();
    this.tasks[idTask].nome = valor;
    this.updateLocalStorage();
  }
}
