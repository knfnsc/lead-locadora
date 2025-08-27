import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <main><router-outlet></router-outlet></main> `,
  styles: [
    `
      main {
        min-height: 100vh;
        padding: 2vh;
      }
    `,
  ],
})
export class AppComponent {}
