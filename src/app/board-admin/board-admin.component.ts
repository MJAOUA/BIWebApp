import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dashboard } from '../Models/dashboard';
import { Role } from '../Models/Role';
import { DashboardService } from '../_services/dashboard.service';
import { RoleService } from '../_services/role.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  private roles: string[] = [];
  hidden1: boolean = false;
  hidden2: boolean = true;
  hidden3: boolean = true;
  url: SafeResourceUrl = "";
  user_role: string;
  role: string;
  id_chosen: number = 1;
  isLoggedIn = false;
  dashboard: Dashboard = new Dashboard;
  dashboards: Dashboard[];
  items: string[];
  roles_list: Role[];

  constructor(private RoleService: RoleService, private sanitizer: DomSanitizer, private DashboardService: DashboardService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.roles = user.roles;

    if (this.roles.includes('ROLE_ADMIN')) {
      this.isLoggedIn=true;
      this.dashboards = this.getAllDashboards();
      this.roles_list = this.retrieveAllRoles();
    }else this.isLoggedIn=false;
  }


  getdashurl(id: number): void {

    this.DashboardService.getDashURL(id).subscribe(_url => this.url = this.sanitizer.bypassSecurityTrustResourceUrl(_url));
  }

  addDashboard() {
    this.DashboardService.addDashboard(this.dashboard).subscribe(res => {
      console.log(res);
    });
  }

  updateDashboard(id: number) {
    this.DashboardService.updateDashboard(this.dashboard, id).subscribe(res => { console.log("success") })
    window.location.reload();
  }

  getAllDashboardsByRole(): Dashboard[] {
    const user = this.tokenStorageService.getUser();
    this.RoleService.getIdByRole(user.roles[0]).subscribe(res => {
      this.role = res;
      this.DashboardService.getAllDashboardsByRole(Number(this.role)).subscribe(_url => this.dashboards = _url);
    });
    return this.dashboards;
  }

  retrieveAllRoles(): Role[] {
    this.RoleService.retrieveAllRoles().subscribe(res => {
      this.roles_list = res;
    })
    return this.roles_list;
  }

  getAllDashboards(): Dashboard[] {
    const user = this.tokenStorageService.getUser();
    this.RoleService.getIdByRole(user.roles[0]).subscribe(res => {
      this.role = res;
      this.DashboardService.getAllDashboards().subscribe(_url => this.dashboards = _url);
    });
    return this.dashboards;
  }

}