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
    const user = await this.db.users.get(id);
    return user || null;
  }

  async getUserByCredentials(
    name: string,
    password: string
  ): Promise<User | null> {
    const user = await this.db.users
      .where("[name+password]")
      .equals([name, password])
      .first();
    return user || null;
  }

  async getUserByToken(token: string): Promise<User | null> {
    if (!token) return null;

    const user = await this.db.users.where("token").equals(token).first();
    return user || null;
  }

  async createUser(userData: Omit<User, "id">): Promise<number> {
    const existingUser = await this.db.users
      .where("name")
      .equals(userData.name)
      .first();

    if (existingUser) {
      throw new Error("Usuário");
    }

    const id = await this.db.users.add(userData as User);
    return id as number;
  }

  async updateUser(updatedUser: User): Promise<void> {
    if (!updatedUser.id) {
      throw new Error("User ID is required for update");
    }

    const existingUser = await this.db.users.get(updatedUser.id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    await this.db.users.put(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await this.db.users.get(id);
    if (!existingUser) {
      throw new Error(`Usuário com id ${id} não encontrado para exclusão.`);
    }

    await this.db.users.delete(id);
  }

  async updateUserFavorite(userID: number, movieID: number): Promise<void> {
    const user = await this.db.users.get(userID);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.isAdmin) {
      throw new Error("Admin users cannot have favorite movies");
    }

    // Use Dexie's modify method which is more flexible
    await this.db.users
      .where("id")
      .equals(userID)
      .modify((user: any) => {
        user.favoriteID = movieID;
      });
  }
}
