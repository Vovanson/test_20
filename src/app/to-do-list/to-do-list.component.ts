import { Component, OnInit } from '@angular/core';
import { ToDo } from '../to-do/to-do';
import { ToDoService } from '../../servise/to-do.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  toDoes: ToDo[];

  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
      this.getToDoes();
  }
  
  getToDoes(): void {
      this.toDoService.getToDoes()
          .subscribe(toDoes => {this.toDoes = toDoes;
          console.log(toDoes)});
  }
  
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.toDoService.addToDo({ name } as ToDo)
        .subscribe(toDo => {
          this.toDoes.push(toDo);
        });
  }
  
  delete(toDo: ToDo): void {
      this.toDoes = this.toDoes.filter(h => h !== toDo);
      this.toDoService.deleteToDo(toDo).subscribe();
    }
}
