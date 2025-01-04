import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task.model';
import {TaskStatus} from '../models/task-status.enum';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, { withCredentials: true });
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task, { withCredentials: true });
  }

  getTaskById(id: number | undefined): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  deleteTask(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  getAllTasks(): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get<Task[]>(`${this.baseUrl}`, { headers, withCredentials: true });
  }

  filterTasks(status: TaskStatus): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get<Task[]>(`${this.baseUrl}/filter?status=${status}`, { headers, withCredentials: true });
  }

  searchTasks(keyword: string): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get<Task[]>(`${this.baseUrl}/search?keyword=${keyword}`, { headers, withCredentials: true });
  }
}

