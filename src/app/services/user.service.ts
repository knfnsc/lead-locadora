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
    favoriteID: 3,
  },
];

@Injectable({
  providedIn: "root",
})
export class UserService {
  getUsers(): User[] {
    return USERS;
  }

  getUser(id: number): User | null {
    return USERS.find((user) => user.id === id) || null;
  }

  getUserByCredentials(name: string, password: string): User | null {
    return (
      USERS.find((user) => user.name === name && user.password === password) ||
      null
    );
  }

  getUserByToken(token: string): User | null {
    return USERS.find((user) => user.token === token) || null;
  }

  deleteUser(id: number): void {
    const index = USERS.findIndex((user) => user.id === id);
    if (index !== -1) {
      USERS.splice(index, 1);
    } else {
      throw new Error(`Usuário com id ${id} não encontrado para exclusão.`);
    }
  }
}
