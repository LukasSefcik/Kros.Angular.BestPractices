import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoItem, NewTodoItem, TodoListItem, UpdateTodoItem } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    public getTodoList(): Observable<TodoListItem[]> {
        return this.http
            .get<TodoItem[]>(this.createApiUrl('ToDos'))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public getTodo(id: number): Observable<TodoItem> {
        return this.http.get(this.createApiUrl('ToDos', id.toString()))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public addNewTodo(newTodo: NewTodoItem): Observable<any> {
        return this.http.post(this.createApiUrl('ToDos'), newTodo)
            .pipe(
                catchError(handleHttpError)
            );
    }

    public deleteCompletedTodo(): Observable<any> {
        return this.http.delete(this.createApiUrl('ToDos', 'deleteCompleted'))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public deleteTodo(id: number): Observable<any> {
        return this.http.delete(this.createApiUrl('ToDos', id.toString()))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public updateTodo(updateTodo: UpdateTodoItem): Observable<any> {
        return this.http.put(this.createApiUrl('ToDos', updateTodo.id.toString()), updateTodo)
            .pipe(
                catchError(handleHttpError)
            );
    }

    public setTodoDoneState(id: number, isDone: boolean): Observable<any> {
        return this.http.put(this.createApiUrl('ToDos', `changeIsDoneState/${id}`), { isDone })
            .pipe(
                catchError(handleHttpError)
            );
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        const apiUrl = `${environment.apiUrl}/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
