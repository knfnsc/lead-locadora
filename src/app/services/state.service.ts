import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private loggedUser = new BehaviorSubject<User | null>(null);

  constructor() {}

  getUser(): User | null {
    return this.loggedUser.getValue();
  }

  setUser(user: User): void {
    this.loggedUser.next(user);
  }

  removeUser(): void {
    this.loggedUser.next(null);
  }
}
