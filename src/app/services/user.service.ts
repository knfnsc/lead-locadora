import { Injectable } from "@angular/core";
import { User } from "../models/user";

const USERS: User[] = [
  {
    id: 1,
    name: "kauan",
    password: "senha123",
    createdAt: new Date(),
    isAdmin: true,
    token: "1",
  },
  {
    id: 2,
    name: "cara",
    password: "senha123",
    createdAt: new Date(),
    isAdmin: false,
    token: "2",
    favoritesID: [],
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
