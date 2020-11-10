import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { ToDo} from '../to-do/to-do';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private toDoUrl = 'api/toDoes';  // URL to web api
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }



  getTest(){
    return "ok";
  }
  
 /** GET ToDoes from the server */
  getToDoes(): Observable<ToDo[]> {
      return this.http.get<ToDo[]>(this.toDoUrl)
          .pipe(
           tap(_ => this.log('fetched toDoes')),
              catchError(this.handleError<ToDo[]>('getToDo', []))
      );
  }
  
  /** GET ToDo by id. Will 404 if id not found */
  getToDo(id: number): Observable<ToDo> {
      const url = `${this.toDoUrl}/${id}`;
    return this.http.get<ToDo>(url).pipe(
    tap(_ => this.log(`fetched toDo id=${id}`)),
    catchError(this.handleError<ToDo>(`getToDo id=${id}`))
    );
  }
        
  /** PUT: update the toDo on the server */
  updateToDo(toDo: ToDo): Observable<any> {
    return this.http.put(this.toDoUrl, toDo, this.httpOptions).pipe(
      tap(_ => this.log(`updated toDo id=${toDo.id}`)),
      catchError(this.handleError<any>('updateToDo'))
    );
  }     
  
  /** POST: add a new ToDo to the server */
  addToDo(toDo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.toDoUrl, toDo, this.httpOptions).pipe(
      tap((newToDo: ToDo) => this.log(`added ToDo id=${newToDo.id}`)),
      catchError(this.handleError<ToDo>('addToDo'))
    );
  }
  
  /** DELETE: delete the ToDo from the server */
  deleteToDo(toDo: ToDo | number): Observable<ToDo> {
    const id = typeof toDo === 'number' ? toDo : toDo.id;
    const url = `${this.toDoUrl}/${id}`;

    return this.http.delete<ToDo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted toDo id=${id}`)),
      catchError(this.handleError<ToDo>('deleteToDo'))
    );
  }                 
      
  /* GET ToDo whose name contains search term */
  searchToDoes(term: string): Observable<ToDo[]> {
    if (!term.trim()) {
      // if not search term, return empty ToDoes array.
      return of([]);
    }
    return this.http.get<ToDo[]>(`${this.toDoUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found toDoes matching "${term}"`) :
         this.log(`no todoes matching "${term}"`)),
      catchError(this.handleError<ToDo[]>('searchToDoes', []))
    );
  } 
                 
  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
private handleError<T>(operation = 'operation', result?: T) {
return (error: any): Observable<T> => {

  // TODO: send the error to remote logging infrastructure
   console.error(error); // log to console instead

  // TODO: better job of transforming error for user consumption
  this.log(`${operation} failed: ${error.message}`);

  // Let the app keep running by returning an empty result.
  return of(result as T);
};
}    
      
  /** Log a ToDoService message with the MessageService */
      private log(message: string) {
      this.messageService.add(`ToDoService: ${message}`);
  }

}
