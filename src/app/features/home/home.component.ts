import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AGENT_PRESETS } from '../../core/data/agents.data';
import { AgentPreset } from '../../core/models/agent.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ChatComponent } from '../chat/chat.component';
import { slidePanel, chatEnter, fadeInUp, listStagger } from '../../shared/animations/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IconComponent, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [slidePanel, chatEnter, fadeInUp, listStagger]
})
export class HomeComponent {
  presets = AGENT_PRESETS;

  /** Agente atualmente aberto no chat (null = nenhum). */
  selectedAgent: AgentPreset | null = null;

  /** Controla a visibilidade do painel de presets. */
  presetsVisible = true;

  // Mock user data
  user = {
    name: 'Nome Sobrenome',
    email: 'nome.sobrenome@araujo.com.br',
    initials: 'NS'
  };

  selectPreset(preset: AgentPreset): void {
    // Abre o preset no chat ao lado, sem fechar o painel de presets.
    this.selectedAgent = preset;
  }

  isActive(preset: AgentPreset): boolean {
    return this.selectedAgent?.id === preset.id;
  }

  togglePresets(): void {
    this.presetsVisible = !this.presetsVisible;
  }
}
