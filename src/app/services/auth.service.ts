import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StateService } from "./state.service";

const API_SERVER_URL = "http://localhost:8080";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private stateService: StateService, private http: HttpClient) {}

  login(name: string, password: string): boolean {
    this.http
      .post<{ token: string }>(`${API_SERVER_URL}/auth`, { name, password })
      .subscribe((response) => {
        localStorage.setItem("token", response.token);
      });

    this.stateService.setUser({
      id: 1,
      name: "kauan123",
      isAdmin: true,
      createdAt: new Date(),
    });
    return true;
  }

  logout(): void {
    this.stateService.removeUser();
  }
}
