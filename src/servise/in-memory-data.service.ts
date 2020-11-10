import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ToDo } from '../app/to-do/to-do';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService {
      createDb() {
        const toDoes = [
          { id: 11, name: 'Read1', done:30 },
          { id: 12, name: 'Write', done:100 },
          { id: 13, name: 'Made', done:50  },
          { id: 14, name: 'Read2', done:0  },
          { id: 15, name: 'Write2', done:10  }
        ];
    return {toDoes};
  }
  
  // Overrides the genId method to ensure that a planet always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // planet id + 1.
  genId(toDoes: ToDo[]): number {
    return toDoes.length > 0 ? Math.max(...toDoes.map(toDo => toDo.id)) + 1 : 11;
  }
  constructor() { }
}
