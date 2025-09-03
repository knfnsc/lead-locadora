import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUsers(): Promise<User[]> {
    return await this.db.users.toArray();
  }

  async getUser(id: number): Promise<User | null> {
    return (await this.db.users.get(id)) || null;
  }

  async getUserByCredentials(
    name: string,
    password: string
  ): Promise<User | null> {
    return (
      (await this.db.users
        .where("[name+password]")
        .equals([name, password])
        .first()) || null
    );
  }

  async getUserByToken(token: string): Promise<User | null> {
    if (!token) return null;

    return (await this.db.users.where("token").equals(token).first()) || null;
  }

  async createUser(userData: Omit<User, "id">): Promise<number> {
    return (await this.db.users.add(userData as User)) as number;
  }

  async updateUser(updatedUser: User): Promise<void> {
    await this.db.users.put(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.db.users.delete(id);
  }

  async updateUserFavorite(userID: number, movieID: number): Promise<void> {
    await this.db.users
      .where("id")
      .equals(userID)
      .modify((user: any) => {
        user.favoriteID = movieID;
      });
  }
}
