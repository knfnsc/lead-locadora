import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <main><router-outlet></router-outlet></main> `,
  styles: [
    `
      main {
        margin: 0;
        padding: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {}
