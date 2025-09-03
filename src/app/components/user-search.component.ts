import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, from } from "rxjs";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-user-search",
  template: `
    <app-sidebar></app-sidebar>
    <input type="text" [formControl]="searchControl" (input)="onSearch()" />
    <ul>
      <li *ngFor="let user of filteredUsers" [routerLink]="[user.id]">
        {{ user.name }} | Criado em: {{ user.createdAt | date }}
        <button *ngIf="isAdmin$ | async" [routerLink]="[user.id, 'edit']">
          Editar
        </button>
      </li>
    </ul>
    <p *ngIf="filteredUsers.length === 0">Nenhum usuário encontrado</p>
  `,
  styles: [],
})
export class UserSearchComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchControl = new FormControl("");
  isAdmin$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isAdmin$ = from(this.authService.isAdmin());

    try {
      this.users = await this.userService.getUsers();
      this.filteredUsers = this.users;
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  onSearch(): void {
    const search = this.searchControl.value;
    this.filteredUsers = !search?.trim()
      ? this.users
      : this.users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase().trim())
        );
  }
}
