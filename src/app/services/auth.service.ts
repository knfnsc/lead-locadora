import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginCredentials } from "../models/login-credentials";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private activeToken: string;

  constructor(private userService: UserService, private router: Router) {
    this.activeToken = localStorage.getItem("token") || "";
  }

  isAutheticated(): boolean {
    return !!this.userService.getUserByToken(this.activeToken);
  }

  isAdmin(): boolean | undefined {
    const user = this.userService.getUserByToken(this.activeToken);
    return user?.isAdmin;
  }

  login(credentials: LoginCredentials): boolean {
    const user = this.userService.getUserByCredentials(
      credentials.user,
      credentials.password
    );
    if (user) {
      this.activeToken = user.token;
      localStorage.setItem("token", this.activeToken);
      this.router.navigate([""]);
      return true;
    }
    return false;
  }

  logout(): void {
    this.activeToken = "";
    localStorage.setItem("token", this.activeToken);
    this.router.navigate(["login"]);
  }
}
