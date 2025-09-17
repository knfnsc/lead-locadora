import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { StateService } from "../services/state.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return (
      !!this.stateService.getUser() || this.router.createUrlTree(["login"])
    );
  }
}
