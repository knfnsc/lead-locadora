import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        margin: 0;
        padding: 1rem;
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {}
