import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AGENT_GROUPS } from '../../core/data/agents.data';
import { Agent, AgentGroup, AgentPreset } from '../../core/models/agent.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ChatComponent } from '../chat/chat.component';
import { PresetsService } from '../../core/services/presets.service';
import { slidePanel, chatEnter, fadeInUp, listStagger } from '../../shared/animations/animations';

interface GroupState {
  expanded: boolean;
  allSelected: boolean;
}

@Component({
  selector: 'app-criar-agente',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ChatComponent],
  templateUrl: './criar-agente.component.html',
  styleUrl: './criar-agente.component.scss',
  animations: [slidePanel, chatEnter, fadeInUp, listStagger]
})
export class CriarAgenteComponent {
  private presetsService = inject(PresetsService);

  groups = AGENT_GROUPS;
  selectedAgents: Set<string> = new Set();
  groupStates: Map<string, GroupState> = new Map();

  /** Agente customizado ativo no chat (null = ainda montando). */
  activeAgent: AgentPreset | null = null;

  /** Visibilidade do painel de seleção. */
  selectionVisible = true;

  /** Modo de salvar predefinição: o painel esquerdo vira formulário. */
  savingPreset = false;
  presetName = '';
  presetDescription = '';
  presetSaved = false;

  constructor() {
    // Inicializar estados dos grupos
    this.groups.forEach(group => {
      this.groupStates.set(group.id, {
        expanded: true,
        allSelected: false
      });
    });
  }
  
  get selectedCount(): number {
    return this.selectedAgents.size;
  }
  
  get totalAgents(): number {
    return this.groups.reduce((sum, g) => sum + g.agents.length, 0);
  }
  
  get selectedAgentsList(): Agent[] {
    const agents: Agent[] = [];
    this.groups.forEach(group => {
      group.agents.forEach(agent => {
        if (this.selectedAgents.has(agent.id)) {
          agents.push(agent);
        }
      });
    });
    return agents;
  }
  
  toggleGroup(group: AgentGroup): void {
    const state = this.groupStates.get(group.id)!;
    state.expanded = !state.expanded;
  }
  
  toggleGroupSelection(group: AgentGroup, event: Event): void {
    event.stopPropagation();
    const state = this.groupStates.get(group.id)!;
    
    if (state.allSelected) {
      // Desselecionar todos do grupo
      group.agents.forEach(agent => {
        this.selectedAgents.delete(agent.id);
      });
      state.allSelected = false;
    } else {
      // Selecionar todos do grupo
      group.agents.forEach(agent => {
        this.selectedAgents.add(agent.id);
      });
      state.allSelected = true;
    }
    this.syncActiveAgent();
  }
  
  toggleAgent(agent: Agent, group: AgentGroup): void {
    if (this.selectedAgents.has(agent.id)) {
      this.selectedAgents.delete(agent.id);
    } else {
      this.selectedAgents.add(agent.id);
    }
    
    // Atualizar estado do grupo
    const state = this.groupStates.get(group.id)!;
    state.allSelected = group.agents.every(a => this.selectedAgents.has(a.id));

    this.syncActiveAgent();
  }
  
  isAgentSelected(agent: Agent): boolean {
    return this.selectedAgents.has(agent.id);
  }
  
  isGroupSelected(group: AgentGroup): boolean {
    return this.groupStates.get(group.id)?.allSelected ?? false;
  }
  
  isGroupExpanded(group: AgentGroup): boolean {
    return this.groupStates.get(group.id)?.expanded ?? true;
  }
  
  isGroupPartiallySelected(group: AgentGroup): boolean {
    const selected = group.agents.filter(a => this.selectedAgents.has(a.id)).length;
    return selected > 0 && selected < group.agents.length;
  }
  
  removeAgent(agent: Agent): void {
    this.selectedAgents.delete(agent.id);
    
    // Atualizar estado dos grupos
    this.groups.forEach(group => {
      const state = this.groupStates.get(group.id)!;
      state.allSelected = group.agents.every(a => this.selectedAgents.has(a.id));
    });

    this.syncActiveAgent();
  }

  /** Id estável da sessão de chat atual (mantido enquanto o chat não é reiniciado). */
  private sessionId: string | null = null;

  /** Monta o objeto do agente customizado a partir da seleção atual. */
  private buildAgent(id: string): AgentPreset {
    const nomes = this.selectedAgentsList.map(a => a.name);
    const resumo = nomes.slice(0, 3).join(', ') + (nomes.length > 3 ? ` e mais ${nomes.length - 3}` : '');
    return {
      id,
      name: 'Agente Personalizado',
      description: this.selectedCount > 0
        ? `Combinação de ${this.selectedCount} especialista${this.selectedCount === 1 ? '' : 's'}: ${resumo}.`
        : 'Nenhum especialista selecionado.',
      icon: 'palette',
      color: '#3E8FD6',
      agents: Array.from(this.selectedAgents)
    };
  }

  createCustomAgent(): void {
    if (this.selectedCount === 0) return;

    // Cria a sessão de chat com um id estável (não muda ao reajustar a seleção).
    this.sessionId = 'custom-' + Date.now();
    this.activeAgent = this.buildAgent(this.sessionId);
  }

  /**
   * Sincroniza o agente ativo com a seleção atual, EM TEMPO REAL, mantendo a
   * mesma sessão de chat (mesmo id) para não reiniciar a conversa.
   * Se todos forem desmarcados, fecha o chat e volta ao preview.
   */
  private syncActiveAgent(): void {
    if (!this.sessionId) return; // chat ainda não foi aberto

    if (this.selectedCount === 0) {
      // Sem especialistas: encerra a sessão e volta ao preview.
      this.activeAgent = null;
      this.sessionId = null;
      return;
    }

    // Reconstrói mantendo o mesmo id -> o chat atualiza a composição sem resetar.
    this.activeAgent = this.buildAgent(this.sessionId);
  }

  /** Fecha o chat e volta a mostrar apenas a montagem/preview. */
  resetAgent(): void {
    this.activeAgent = null;
    this.sessionId = null;
  }

  toggleSelection(): void {
    this.selectionVisible = !this.selectionVisible;
  }

  // ============================================
  // SALVAR PREDEFINIÇÃO
  // ============================================

  /** Abre o formulário de salvar predefinição (painel esquerdo vira form). */
  openSaveForm(): void {
    if (this.selectedCount === 0) return;
    // Garante que o painel esquerdo (onde o form aparece) esteja visível.
    this.selectionVisible = true;
    this.savingPreset = true;
    this.presetSaved = false;
    this.presetName = '';
    this.presetDescription = '';
  }

  /** Cancela e volta para a lista de seleção. */
  cancelSaveForm(): void {
    this.savingPreset = false;
  }

  get canSavePreset(): boolean {
    return this.presetName.trim().length > 0 && this.selectedCount > 0;
  }

  /** Salva a predefinição custom no serviço e confirma. */
  savePreset(): void {
    if (!this.canSavePreset) return;

    const preset: AgentPreset = {
      id: 'preset-custom-' + Date.now(),
      name: this.presetName.trim(),
      description: this.presetDescription.trim() ||
        `Predefinição com ${this.selectedCount} especialista${this.selectedCount === 1 ? '' : 's'}.`,
      icon: 'sparkles',
      color: '#E03131',
      agents: Array.from(this.selectedAgents)
    };

    this.presetsService.addCustomPreset(preset);
    this.presetSaved = true;
  }

  /** Fecha a confirmação e volta para a seleção. */
  finishSave(): void {
    this.savingPreset = false;
    this.presetSaved = false;
  }
}
