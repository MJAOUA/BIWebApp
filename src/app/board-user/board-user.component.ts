import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dashboard } from '../Models/dashboard';
import { DashboardService } from '../_services/dashboard.service';
import { RoleService } from '../_services/role.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  hidden1: boolean = false;
  hidden2: boolean = true;
  url: SafeResourceUrl = "";
  isLoggedIn = false;
  dashboards: Dashboard[];
  id_chosen: number = 0;
  constructor(private RoleService: RoleService, private sanitizer: DomSanitizer, private DashboardService: DashboardService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.dashboards = this.getAllDashboardsByRole();

  }

  getdashurl(id: number): void {

    this.DashboardService.getDashURL(id).subscribe(_url => this.url = this.sanitizer.bypassSecurityTrustResourceUrl(_url));
  }

  getAllDashboardsByRole(): Dashboard[] {

    this.DashboardService.getAllDashboardsByRole(1).subscribe(_url => this.dashboards = _url);

    return this.dashboards;
  }
}
