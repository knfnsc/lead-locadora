import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { StateService } from "../services/state.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return (
      this.stateService.getUser()?.isAdmin ||
      this.router.createUrlTree(["login"])
    );
  }
}
