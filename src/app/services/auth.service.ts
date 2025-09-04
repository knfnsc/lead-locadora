import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private activeToken: string;

  constructor(private userService: UserService) {
    this.activeToken = sessionStorage.getItem("token") || "";
  }

  async isAuthenticated(): Promise<boolean> {
    return !!(await this.userService.getUserByToken(this.activeToken));
  }

  async isAdmin(): Promise<boolean> {
    const user = await this.userService.getUserByToken(this.activeToken);
    return user?.isAdmin || false;
  }

  async login(username: string, password: string): Promise<boolean> {
    const userData = await this.userService.getUserByCredentials(
      username,
      password
    );
    if (!userData) return false;

    this.activeToken = userData.token;
    sessionStorage.setItem("token", this.activeToken);

    return true;
  }

  logout(): void {
    this.activeToken = "";
    sessionStorage.setItem("token", this.activeToken);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.userService.getUserByToken(this.activeToken);
  }
}
