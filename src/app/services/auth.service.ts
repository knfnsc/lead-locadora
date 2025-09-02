import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private activeToken: string;

  constructor(private userService: UserService, private router: Router) {
    this.activeToken = localStorage.getItem("token") || "";
  }

  isAuthenticated(): boolean {
    return !!this.userService.getUserByToken(this.activeToken);
  }

  isAdmin(): boolean {
    return this.userService.getUserByToken(this.activeToken)?.isAdmin || false;
  }

  login(user: string, password: string): boolean {
    const userData = this.userService.getUserByCredentials(user, password);
    if (!userData) return false;

    this.activeToken = userData.token;
    localStorage.setItem("token", this.activeToken);
    this.router.navigate(["/"]);
    return true;
  }

  logout(): void {
    this.activeToken = "";
    localStorage.setItem("token", this.activeToken);
    this.router.navigate(["/login"]);
  }
}
