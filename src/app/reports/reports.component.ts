import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  currentUser: any;
  public serviceUrl: string;
  public serverUrl: string;
  isLoggedIn = false;

  constructor(private token: TokenStorageService) {
    this.serviceUrl = 'http://localhost:54370/reporting/site/site1/reports/c42ad646-88e8-420b-ba86-b62853b6be7e/Reporting/Test';
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
    }
  }
}
