import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../Models/dashboard';
import { Role } from '../Models/Role';
import { DashboardService } from '../_services/dashboard.service';
import { RoleService } from '../_services/role.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private roles: string[] = [];
  role: string;
  isLoggedIn = false;
  dashboard: Dashboard = new Dashboard;
  dashboards: Dashboard[];
  id: any;
  roles_list: Role[];

  constructor(private RoleService: RoleService,private DashboardService: DashboardService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.dashboards = this.getAllDashboards();
    this.roles_list = this.retrieveAllRoles();
  }

  getAllDashboards(): Dashboard[] {
    this.DashboardService.getAllDashboards().subscribe(_url => this.dashboards = _url);
    return this.dashboards;
  }

  getDashboard(id: number): Dashboard {
    this.DashboardService.getOneDashboard(id).subscribe(_dashboard => this.dashboard = _dashboard);
    return this.dashboard;
  }

  deleteDashboard(id: number) {
    this.DashboardService.deleteDashboardById(id).subscribe(() =>
      this.DashboardService.getAllDashboards().subscribe(res => { this.dashboards = res }));
  }

  addDashboard() {
    this.DashboardService.addDashboard(this.dashboard).subscribe(_dashboard => {
      this.dashboard = _dashboard
    });
    window.location.reload();
  }

  retrieveAllRoles(): Role[] {
    this.RoleService.retrieveAllRoles().subscribe(res => {
      this.roles_list = res;
    })
    return this.roles_list;
  }
}
