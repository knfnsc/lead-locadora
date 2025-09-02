import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-user-search",
  template: `
    <app-sidebar></app-sidebar>
    <input type="text" [formControl]="searchControl" (input)="onSearch()" />
    <ul>
      <li *ngFor="let user of filteredUsers" [routerLink]="[user.id]">
        {{ user.name }} | Criado em: {{ user.createdAt.toLocaleString() }}
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
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
}
