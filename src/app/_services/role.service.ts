import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../Models/Role';

const role_url = 'http://localhost:8080/role/';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getIdByRole(role: String): Observable<string> {
    return this.http.get(role_url + 'getIdByRole/' + role, { responseType: 'text' })
  }

  retrieveAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(role_url + 'retrieveAllRoles');
  }
}
