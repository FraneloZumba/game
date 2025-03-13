import { Component } from "@angular/core"
import { CompatibilityGameComponent } from "./compatibility-game/compatibility-game.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CompatibilityGameComponent],
  template: `
    <div class="app-container">
      <app-compatibility-game></app-compatibility-game>
    </div>
  `,
  styles: [
    `
    .app-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
      padding: 20px;
      transition: all 0.3s ease;
    }
  `,
  ],
})
export class AppComponent {
  title = "Juego Medidor de Parejas"
}

