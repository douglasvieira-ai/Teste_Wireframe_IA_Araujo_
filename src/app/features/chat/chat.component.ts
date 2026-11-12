import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, HostBinding, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AGENT_PRESETS, AGENT_GROUPS } from '../../core/data/agents.data';
import { Message, AgentPreset } from '../../core/models/agent.model';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { messageIn, fadeInUp } from '../../shared/animations/animations';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations: [messageIn, fadeInUp]
})
export class ChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  /** Quando fornecido, o chat usa este agente (modo embutido). */
  @Input() agent: AgentPreset | null = null;

  /** Modo embutido: sem padding/moldura própria (já está dentro de um card). */
  @Input() @HostBinding('class.embedded') embedded = false;

  /** Mostra um botão no header para reexibir o painel lateral (quando escondido). */
  @Input() showExpandButton = false;

  /** Emitido ao clicar no botão de reexibir o painel lateral. */
  @Output() expandPanel = new EventEmitter<void>();

  private route = inject(ActivatedRoute);

  messages: Message[] = [];
  inputMessage = '';
  isTyping = false;
  currentAgent: AgentPreset | null = null;
  agentId = '';

  get agentIcon(): IconName {
    return this.currentAgent?.icon ?? 'bot';
  }

  suggestedQuestions = [
    'Como solicitar férias?',
    'Política de reembolso',
    'Consultar holerite'
  ];

  ngOnInit(): void {
    if (this.agent) {
      // Modo embutido: agente vem por Input
      this.setAgent(this.agent);
    } else {
      // Modo rota: lê o id da URL
      this.agentId = this.route.snapshot.paramMap.get('agentId') || '';
      this.setAgent(this.resolveAgentById(this.agentId));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['agent'];
    if (!change || change.firstChange || !this.agent) return;

    const prev = change.previousValue as AgentPreset | null;

    if (!prev || prev.id !== this.agent.id) {
      // Trocou de agente (id diferente): reinicia a conversa.
      this.setAgent(this.agent);
    } else {
      // Mesmo agente, composição mudou: atualiza sem apagar a conversa.
      this.updateComposition(this.agent);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  /**
   * Atualiza a composição do agente (nome, descrição, especialistas) mantendo
   * a conversa em andamento, e registra uma nota do sistema sobre a mudança.
   */
  private updateComposition(agent: AgentPreset): void {
    const prevCount = this.currentAgent?.agents?.length ?? 0;
    const newCount = agent.agents?.length ?? 0;
    this.currentAgent = agent;

    if (newCount !== prevCount) {
      const diff = newCount - prevCount;
      const verbo = diff > 0 ? 'adicionado' : 'removido';
      const plural = Math.abs(diff) > 1 ? 's' : '';
      this.messages.push({
        id: `system-${Date.now()}`,
        role: 'assistant',
        content: `_Composição atualizada: ${Math.abs(diff)} especialista${plural} ${verbo}${plural}. Agora combino ${newCount} especialista${newCount === 1 ? '' : 's'}._`,
        timestamp: new Date(),
        isSystem: true
      });
    }
  }

  /** Define o agente atual, reinicia as mensagens e mostra a saudação. */
  private setAgent(agent: AgentPreset | null): void {
    this.currentAgent = agent;
    this.messages = [];
    this.inputMessage = '';
    this.isTyping = false;
    this.addWelcomeMessage();
  }

  /** Resolve um agente a partir de um id (preset, custom ou de grupo). */
  private resolveAgentById(id: string): AgentPreset | null {
    const preset = AGENT_PRESETS.find(p => p.id === id);
    if (preset) return preset;

    if (id.startsWith('custom-')) {
      return {
        id,
        name: 'Agente Personalizado',
        description: 'Seu conjunto multiagêntico customizado',
        icon: 'palette',
        color: '#3E8FD6',
        agents: []
      };
    }

    for (const group of AGENT_GROUPS) {
      const found = group.agents.find(a => a.id === id);
      if (found) {
        return {
          id: found.id,
          name: found.name,
          description: found.description,
          icon: group.icon,
          color: found.color,
          agents: [found.id]
        };
      }
    }
    return null;
  }

  private addWelcomeMessage(): void {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: `Olá! Sou o agente ${this.currentAgent?.name || 'IA Araujo'}. ${this.currentAgent?.description || 'Como posso ajudar você hoje?'}`,
      role: 'assistant',
      timestamp: new Date()
    };
    this.messages.push(welcomeMessage);
  }

  sendMessage(): void {
    if (!this.inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: this.inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    this.messages.push(userMessage);
    this.inputMessage = '';

    this.simulateAgentResponse(userMessage.content);
  }

  private simulateAgentResponse(userMessage: string): void {
    this.isTyping = true;

    setTimeout(() => {
      this.isTyping = false;

      const response: Message = {
        id: `assistant-${Date.now()}`,
        content: this.generateMockResponse(userMessage),
        role: 'assistant',
        timestamp: new Date()
      };
      this.messages.push(response);
    }, 1500 + Math.random() * 1000);
  }

  private generateMockResponse(userMessage: string): string {
    const responses = [
      `Entendi sua dúvida sobre "${userMessage.substring(0, 30)}...". Deixa eu consultar nossa base de conhecimento para te dar a melhor resposta.`,
      `Boa pergunta! Com base nas informações que tenho sobre o tema, posso te explicar que...`,
      `Vou te ajudar com isso! De acordo com nossos procedimentos internos...`,
      `Encontrei algumas informações relevantes para sua pergunta. Veja bem...`
    ];

    return responses[Math.floor(Math.random() * responses.length)] +
      '\n\n*Esta é uma resposta simulada. Em produção, o agente consultará a base de conhecimento real.*';
  }

  useSuggestion(question: string): void {
    this.inputMessage = question;
    this.sendMessage();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  /** Remove marcadores simples de markdown (usado nas notas de sistema). */
  stripMarkdown(text: string): string {
    return text.replace(/[*_]/g, '');
  }
}
