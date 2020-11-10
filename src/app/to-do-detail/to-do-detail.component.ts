import { Component, OnInit, Input,  ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ToDo } from '../to-do/to-do';
import { ToDoService } from '../../servise/to-do.service';
@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  @Input() toDo: ToDo;
  constructor(
      private route: ActivatedRoute,
      private toDoService: ToDoService,
      private location: Location
) {}

  ngOnInit(): void {
      this.getToDo();
  }
  
  getToDo(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.toDoService.getToDo(id)
          .subscribe(toDo => this.toDo = toDo);
  }
  
  goBack(): void {
      this.location.back();
  }  
  
  save(): void {
      this.toDoService.updateToDo(this.toDo)
      .subscribe(() => this.goBack());
  }

}
