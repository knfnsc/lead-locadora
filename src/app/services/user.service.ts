import { Injectable } from "@angular/core";
import { User } from "../models/user";

const USERS: User[] = [
  {
    id: 0,
    name: "kauan",
    password: "senha123",
    createdAt: new Date(),
    isAdmin: true,
    token: "token",
  },
];
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  getUserByCredentials(name: string, password: string): User | null {
    return (
      USERS.find((user) => user.name === name && user.password === password) ||
      null
    );
  }

  getUserByToken(token: string): User | null {
    return USERS.find((user) => user.token === token) || null;
  }
}
