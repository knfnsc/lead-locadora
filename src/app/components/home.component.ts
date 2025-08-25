import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <app-sidebar></app-sidebar>
    <p>home works!</p>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
