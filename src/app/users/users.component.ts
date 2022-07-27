import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: User[];
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  id: any;
  user: User;
  private roles: string[] = [];

  constructor(private tokenStorageService: TokenStorageService, private token: TokenStorageService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.roles = user.roles;

    if (this.roles.includes('ROLE_ADMIN')) {
      this.isLoggedIn = true;
      this.user = this.token.getUser();
      this.users = this.getAllUsers();
    } else this.isLoggedIn = false;
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {

        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    /* this.userService.getAllUsers().subscribe(res => { this.users = res }); */
  }

  getAllUsers(): User[] {
    this.userService.getAllUsers().subscribe(_users => this.users = _users);
    return this.users;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() =>
      this.userService.getAllUsers().subscribe(res => { this.users = res }));
  }

  getUser(id: number): User {
    this.userService.getUser(id).subscribe(_users => this.user = _users);
    return this.user;
  }
}
