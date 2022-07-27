import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SidebarModule } from 'primeng/sidebar';
import { MatDividerModule } from '@angular/material/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';

import { BoldReportDesignerModule  } from '@boldreports/angular-reporting-components';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
// Report Designer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';

// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    ReportsComponent,
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatTabsModule,
    AppRoutingModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    SidebarModule,
    MatDividerModule,
    CardModule,
    SplitterModule,
    BoldReportViewerModule,
    BoldReportDesignerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
