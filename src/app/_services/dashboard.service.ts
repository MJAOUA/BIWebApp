import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../Models/dashboard';

const dash_url='http://localhost:8080/dashboard/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashURL(id: number): Observable<string> {
    return this.http.get(dash_url+'getDashURL/' + id, {
      responseType: 'text'
    })
  }
  getAllDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(dash_url+'getAllDashboards');
  }

  getOneDashboard(id:number): Observable<Dashboard> {
    return this.http.get<Dashboard>(dash_url+'getDashboardById/'+id);
  }

  addDashboard(Dashboard: Dashboard) {
    return this.http.post<Dashboard>(dash_url+'addDashboard', Dashboard)
  }

  deleteDashboardById(id: number) {
    return this.http.delete(dash_url+'deleteDashboard/' + id);
  }

  getAllDashboardsById(id: number): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(dash_url+ id);
  }

  updateDashboard(Dashboard: Dashboard,id:number):Observable<Dashboard>{
    return this.http.put<Dashboard>(dash_url+'updateDashboard/'+id, Dashboard)
  }

  getAllDashboardsByRole(role:number): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(dash_url+'getAllDashboardsByRole/'+role);
  }

}