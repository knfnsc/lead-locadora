import { Injectable } from "@angular/core";
import { LoginCredentials } from "../models/login-credentials";
import { PublicUser } from "../models/user";
import { UserService } from "./user.service";
import { UrlSegment } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private activeToken: string;

  constructor(private userService: UserService) {
    this.activeToken = localStorage.getItem("token") || "";
  }

  isAutheticated(): boolean {
    const user = this.userService.getUserByToken(this.activeToken);
    if (user) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const user = this.userService.getUserByToken(this.activeToken);
    if (user) {
      return user.isAdmin;
    }
    return false;
  }

  login(credentials: LoginCredentials): PublicUser | null {
    const user = this.userService.getUserByCredentials(
      credentials.user,
      credentials.password
    );
    if (user) {
      this.activeToken = user.token;
      localStorage.setItem("token", this.activeToken);
      return {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      };
    }

    return null;
  }

  logout(): void {
    this.activeToken = "";
    localStorage.setItem("token", this.activeToken);
  }
}
