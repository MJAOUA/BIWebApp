import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

const API_URL = 'http://localhost:8080/api/test/';
const USER_URL = 'http://localhost:8080/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUserRole(user_id: number): Observable<string> {
    return this.http.get(USER_URL + 'CurrentUserRole/' + user_id, { responseType: 'text' })
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(USER_URL + 'getAllUsers')
  }

  deleteUser(id: number) {
    return this.http.delete(USER_URL + 'deleteUser/' + id);
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(USER_URL+'getUser/'+id);
  }
}
