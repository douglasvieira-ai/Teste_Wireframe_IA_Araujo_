import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MOCK_CONVERSATIONS, MOCK_FAVORITES } from '../../../core/data/agents.data';
import { IconComponent, IconName } from '../icon/icon.component';
import { LayoutService } from '../../../core/services/layout.service';

interface NavItem {
  icon: IconName;
  label: string;
  route: string;
  action?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private router = inject(Router);
  layout = inject(LayoutService);
  
  conversations = MOCK_CONVERSATIONS;
  favorites = MOCK_FAVORITES;
  isOnline = true;
  
  // Navegação
  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'palette', label: 'Criar Predefinição Custom', route: '/criar-agente' },
    { icon: 'cpu', label: 'Criar Agente Especialista', route: '/criar-especialista' }
  ];
  
  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'agora';
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return `${Math.floor(days / 7)}sem`;
  }
  
  onNavClick(item: NavItem): void {
    if (item.action === 'new') {
      // Lógica para nova conversa
      this.router.navigate(['/home']);
    }
  }
}
