import { Injectable, signal } from '@angular/core';
import { AGENT_PRESETS } from '../data/agents.data';
import { AgentPreset } from '../models/agent.model';

@Injectable({ providedIn: 'root' })
export class PresetsService {
  /** Presets base (fixos) do sistema. */
  readonly basePresets = signal<AgentPreset[]>([...AGENT_PRESETS]);

  /** Predefinições criadas pelo usuário nesta sessão. */
  readonly customPresets = signal<AgentPreset[]>([]);

  /** Adiciona uma nova predefinição custom. */
  addCustomPreset(preset: AgentPreset): void {
    this.customPresets.update(list => [...list, preset]);
  }

  /** Todos os presets (base + custom) para exibição. */
  allPresets(): AgentPreset[] {
    return [...this.basePresets(), ...this.customPresets()];
  }
}
