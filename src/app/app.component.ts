import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { LayoutService } from './core/services/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-layout" [class.sidebar-collapsed]="layout.sidebarCollapsed()">
      <app-sidebar />
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      position: relative;
    }

    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
      background-color: var(--color-app-bg);
      min-width: 0;
    }

    .app-layout {
      background-color: var(--color-app-bg);
    }
  `]
})
export class AppComponent {
  layout = inject(LayoutService);
}
