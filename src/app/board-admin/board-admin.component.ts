import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dashboard } from '../Models/dashboard';
import { Role } from '../Models/Role';
import { AuthService } from '../_services/auth.service';
import { DashboardService } from '../_services/dashboard.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  selected = new FormControl(0);
  hidden1: boolean=false;
  hidden2: boolean=true;
  hidden3: boolean=true;
  url: SafeResourceUrl="" ;
  user_role: string ;
  role: string;
  id_chosen: number=0;
  isLoggedIn = false;
  dashboard: Dashboard = new Dashboard;
  dashboards: Dashboard[];
  items: string[];
  roles_list: Role[];

  constructor(private sanitizer: DomSanitizer, private DashboardService: DashboardService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.dashboards = this.getAllDashboardsByRole();
      this.roles_list = this.retrieveAllRoles();
    }
  }


  getdashurl(id: number): void {

    this.DashboardService.getDashURL(id).subscribe(_url => this.url = this.sanitizer.bypassSecurityTrustResourceUrl(_url));
    this.selected.setValue(1);
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
    this.DashboardService.getIdByRole(user.roles[0]).subscribe(res => {
      this.role = res;
      this.DashboardService.getAllDashboardsByRole(Number(this.role)).subscribe(_url => this.dashboards = _url);
    });
    return this.dashboards;
  }

  retrieveAllRoles(): Role[] {
    this.DashboardService.retrieveAllRoles().subscribe(res => {
      this.roles_list = res;
    })
    return this.roles_list;
  }
  
}