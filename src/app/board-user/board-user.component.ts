import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dashboard } from '../Models/dashboard';
import { AuthService } from '../_services/auth.service';
import { DashboardService } from '../_services/dashboard.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  hidden1: boolean=false;
  hidden2: boolean=true;
  hidden3: boolean=true;
  url: SafeResourceUrl = "";
  user_role: string = "";
  isLoggedIn = false;
  dashboards: any;
  roles_list: any;
  role: any;
  id_chosen: number=0;
  constructor(private sanitizer: DomSanitizer, private DashboardService: DashboardService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.dashboards = this.getAllDashboardsByRole();
    }
  }

  getdashurl(id: number): void {

    this.DashboardService.getDashURL(id).subscribe(_url => this.url = this.sanitizer.bypassSecurityTrustResourceUrl(_url));
  }

  getAllDashboardsByRole(): Dashboard[] {
    const user = this.tokenStorageService.getUser();
    this.DashboardService.getIdByRole(user.roles[0]).subscribe(res => {
      this.role = res;
      this.DashboardService.getAllDashboardsByRole(Number(this.role)).subscribe(_url => this.dashboards = _url);
    });
    return this.dashboards;
  }
}
