import { Injectable } from "@angular/core";
import { StateService } from "./state.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private stateService: StateService) {}

  login(username: string, password: string): boolean {
    this.stateService.setUser({
      id: 1,
      name: "kauan",
      createdAt: new Date(),
      isAdmin: true,
    });
    return true;
  }

  logout(): void {
    this.stateService.removeUser();
  }
}
