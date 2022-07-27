import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Dashboard } from '../Models/dashboard';
import { Role } from '../Models/Role';
import { DashboardService } from '../_services/dashboard.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  check: number = 0;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.roles = user.roles;
    if (this.isLoggedIn && this.roles.includes('ROLE_ADMIN')) {
      this.check = 1;

    } else if (this.isLoggedIn && this.roles.includes('ROLE_USER')) {
      this.check = 2;
    } else this.check = 0;
  }
}
