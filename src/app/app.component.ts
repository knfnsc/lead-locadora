import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <app-sidebar></app-sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <button id="high-contrast-toggle" (click)="onHighContrastToggle()">
      C
    </button>
  `,
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
    `
      #high-contrast-toggle {
        position: fixed;
        z-index: 2;
        bottom: 1rem;
        right: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  isHighContrastOn: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isHighContrastOn = localStorage.getItem("high-contrast") === "true";
    if (this.isHighContrastOn) {
      this.document.body.classList.add("high-contrast");
    } else {
      this.document.body.classList.remove("high-contrast");
    }
  }

  onHighContrastToggle(): void {
    this.isHighContrastOn = !this.isHighContrastOn;

    if (this.isHighContrastOn) {
      this.document.body.classList.add("high-contrast");
    } else {
      this.document.body.classList.remove("high-contrast");
    }

    localStorage.setItem("high-contrast", this.isHighContrastOn.toString());
  }
}
