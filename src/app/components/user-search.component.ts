import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-user-search",
  template: `
    <app-sidebar></app-sidebar>
    <input
      type="text"
      id="search"
      [formControl]="searchControl"
      (input)="onSearch()"
    />
    <ol>
      <li *ngFor="let user of filteredUsers">
        <h2 [routerLink]="[user.id]">
          {{ user.name }}
        </h2>
        <button *ngIf="!user.isAdmin" [routerLink]="[user.id, 'edit']">
          Editar
        </button>
        <button *ngIf="!user.isAdmin" (click)="onDelete(user)">Excluir</button>
      </li>
    </ol>
    <p *ngIf="filteredUsers.length === 0">Nenhum usuário encontrado</p>
  `,
  styles: [
    `
      #search {
        margin-bottom: 2rem;
        height: 2rem;
        min-width: 200px;
        font-size: 1rem;
        outline: 1px solid #c1c1c1;
        border-radius: 8px;

        margin-left: 200px;
      }

      ol {
        margin-left: 200px;
        width: calc(100% - 200px);
      }

      li {
        background: #c1c1c1;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        text-align: left;
        cursor: pointer;

        & > h2 {
          font-size: 1.5rem;
          font-weight: bolder;
          margin: 0;
          margin-bottom: 0.5rem;
        }
      }
    `,
  ],
})
export class UserSearchComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchControl = new FormControl("");

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
    this.filteredUsers = this.users;
  }

  onSearch(): void {
    const search = this.searchControl.value;
    this.filteredUsers = !search?.trim()
      ? this.users
      : this.users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase().trim())
        );
  }

  async onDelete(user: User): Promise<void> {
    await this.userService.deleteUser(user.id);
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser?.id === user.id) {
      await this.authService.logout();
      this.router.navigate(["/login"]);
      return;
    }
    this.users = await this.userService.getUsers();
    this.onSearch();
  }
}
