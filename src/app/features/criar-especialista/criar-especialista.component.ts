import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentPreset } from '../../core/models/agent.model';
import { SpecialistStep, SpecialistDraft, WizardOption, EMPTY_DRAFT } from '../../core/models/specialist.model';
import { KnowledgeDocument } from '../../core/models/document.model';
import { KNOWLEDGE_DOCUMENTS } from '../../core/data/documents.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ChatComponent } from '../chat/chat.component';
import { slidePanel, chatEnter, fadeInUp, listStagger } from '../../shared/animations/animations';

@Component({
  selector: 'app-criar-especialista',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ChatComponent],
  templateUrl: './criar-especialista.component.html',
  styleUrl: './criar-especialista.component.scss',
  animations: [slidePanel, chatEnter, fadeInUp, listStagger]
})
export class CriarEspecialistaComponent {
  /** Ordem canônica das etapas do wizard. */
  readonly stepOrder: SpecialistStep[] = ['objetivo', 'prompt', 'skills', 'tools', 'knowledge', 'revisao'];

  /** Rótulos curtos para o indicador de etapas. */
  readonly stepLabels: Record<SpecialistStep, string> = {
    objetivo: 'Objetivo',
    prompt: 'Prompt',
    skills: 'Skills',
    tools: 'Tools',
    knowledge: 'Conhecimento',
    revisao: 'Revisão'
  };

  /** Passo atual do wizard. */
  step: SpecialistStep = 'objetivo';

  /** Índice da etapa mais avançada já alcançada (limita para onde é possível ir). */
  private maxReachedIndex = 0;

  /** Rascunho do especialista em construção. */
  draft: SpecialistDraft = { ...EMPTY_DRAFT };

  /** Campo de entrada do objetivo. */
  objetivoInput = '';

  /** Visibilidade do painel esquerdo (wizard). */
  wizardVisible = true;

  /** Agente de teste ativo no chat (quando o especialista já pode ser testado). */
  testAgent: AgentPreset | null = null;

  // Opções pré-definidas oferecidas pelo orquestrador
  skillOptions: WizardOption[] = [
    { id: 'responder-duvidas', label: 'Responder dúvidas', icon: 'message-circle' },
    { id: 'resumir', label: 'Resumir conteúdo', icon: 'file-text' },
    { id: 'passo-a-passo', label: 'Guiar passo a passo', icon: 'arrow-right' },
    { id: 'classificar', label: 'Classificar / triar', icon: 'clipboard' },
    { id: 'extrair-dados', label: 'Extrair dados', icon: 'database' },
    { id: 'redigir', label: 'Redigir textos', icon: 'wand' }
  ];

  toolOptions: WizardOption[] = [
    { id: 'freshservice', label: 'Abertura de Ticket (Freshservice)', icon: 'ticket' },
    { id: 'busca-web', label: 'Busca na Web', icon: 'search' },
    { id: 'sap', label: 'Consulta SAP', icon: 'building' },
    { id: 'email', label: 'Envio de e-mail', icon: 'file-text' },
    { id: 'relatorios', label: 'Gerar relatórios', icon: 'trending-up' }
  ];

  /** Catálogo de documentos (mockado) disponível para RAG. */
  readonly documentCatalog: KnowledgeDocument[] = KNOWLEDGE_DOCUMENTS;

  /** Filtro de busca aplicado ao catálogo de documentos. */
  documentSearch = '';

  // ---- Fluxo do orquestrador ----

  /** Mensagem-guia do orquestrador conforme o passo atual. */
  get orchestratorMessage(): string {
    switch (this.step) {
      case 'objetivo':
        return 'Para começar, me conte: o que você quer que este agente especialista faça? Descreva o objetivo dele com suas palavras.';
      case 'prompt':
        return 'Com base no objetivo, montei um prompt inicial para o especialista. Revise e ajuste se quiser.';
      case 'skills':
        return 'Quais habilidades este especialista precisa ter? Selecione as que fizerem sentido.';
      case 'tools':
        return 'O especialista vai usar alguma ferramenta ou integração?';
      case 'knowledge':
        return 'Selecione no catálogo os documentos que o especialista deve usar como base para RAG. Ele vai buscar as respostas dentro dos documentos escolhidos.';
      case 'revisao':
        return 'Tudo pronto! Revise o especialista abaixo e teste no chat ao lado.';
    }
  }

  get canAdvanceObjetivo(): boolean {
    return this.objetivoInput.trim().length >= 10;
  }

  /** Passo 1 -> gera o prompt a partir do objetivo. */
  submitObjetivo(): void {
    if (!this.canAdvanceObjetivo) return;
    this.draft.objetivo = this.objetivoInput.trim();
    this.draft.prompt = this.generatePrompt(this.draft.objetivo);
    this.setStep('prompt');
    this.refreshTestAgent();
  }

  /** Gera um prompt (simulado) a partir do objetivo informado. */
  private generatePrompt(objetivo: string): string {
    return [
      `Você é um agente especialista da Drogaria Araujo.`,
      ``,
      `## Objetivo`,
      objetivo,
      ``,
      `## Diretrizes`,
      `- Responda de forma clara, objetiva e cordial, no tom da Araujo.`,
      `- Baseie-se apenas em informações confiáveis; se não souber, diga que não sabe.`,
      `- Peça esclarecimentos quando a solicitação estiver ambígua.`
    ].join('\n');
  }

  goToSkills(): void { this.setStep('skills'); }
  goToTools(): void {
    this.draft.skills = this.skillOptions.filter(o => o.selected).map(o => o.id);
    this.setStep('tools');
  }
  goToKnowledge(): void {
    this.draft.tools = this.toolOptions.filter(o => o.selected).map(o => o.id);
    this.setStep('knowledge');
  }
  goToRevisao(): void {
    this.setStep('revisao');
    this.refreshTestAgent();
  }

  toggleOption(option: WizardOption): void {
    option.selected = !option.selected;
  }

  // ---- Catálogo de documentos (RAG) ----

  /** Documentos do catálogo filtrados pela busca. */
  get filteredDocuments(): KnowledgeDocument[] {
    const q = this.documentSearch.trim().toLowerCase();
    if (!q) return this.documentCatalog;
    return this.documentCatalog.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  /** Um documento está selecionado para o especialista? */
  isDocumentSelected(doc: KnowledgeDocument): boolean {
    return this.draft.documents.includes(doc.id);
  }

  /** Alterna a seleção de um documento do catálogo. */
  toggleDocument(doc: KnowledgeDocument): void {
    const i = this.draft.documents.indexOf(doc.id);
    if (i >= 0) {
      this.draft.documents.splice(i, 1);
    } else {
      this.draft.documents.push(doc.id);
    }
  }

  /** Documentos selecionados (objetos completos), para a revisão. */
  get selectedDocuments(): KnowledgeDocument[] {
    return this.documentCatalog.filter(d => this.draft.documents.includes(d.id));
  }

  /** Vai para uma etapa, atualizando a etapa máxima já alcançada. */
  private setStep(step: SpecialistStep): void {
    this.step = step;
    const idx = this.stepOrder.indexOf(step);
    if (idx > this.maxReachedIndex) this.maxReachedIndex = idx;
  }

  /** Volta para a etapa anterior. */
  back(): void {
    const idx = this.stepOrder.indexOf(this.step);
    if (idx > 0) this.step = this.stepOrder[idx - 1];
  }

  /** Navega diretamente para uma etapa (somente se já foi alcançada). */
  goToStep(step: SpecialistStep): void {
    const idx = this.stepOrder.indexOf(step);
    if (idx <= this.maxReachedIndex) {
      this.step = step;
    }
  }

  /** Índice da etapa atual (para estilizar o indicador). */
  get currentStepIndex(): number {
    return this.stepOrder.indexOf(this.step);
  }

  /** Uma etapa já foi alcançada (fica clicável no indicador)? */
  isStepReachable(step: SpecialistStep): boolean {
    return this.stepOrder.indexOf(step) <= this.maxReachedIndex;
  }

  /** (Re)cria o agente de teste com o estado atual do rascunho. */
  private refreshTestAgent(): void {
    const nome = this.draft.name?.trim() || 'Especialista (rascunho)';
    this.testAgent = {
      id: 'especialista-preview', // id estável: chat não reinicia a cada ajuste
      name: nome,
      description: this.draft.objetivo || 'Especialista em construção.',
      icon: 'cpu',
      color: '#6158B5',
      agents: []
    };
  }

  get selectedSkillLabels(): string[] {
    return this.skillOptions.filter(o => o.selected).map(o => o.label);
  }
  get selectedToolLabels(): string[] {
    return this.toolOptions.filter(o => o.selected).map(o => o.label);
  }

  restart(): void {
    this.step = 'objetivo';
    this.maxReachedIndex = 0;
    this.draft = { ...EMPTY_DRAFT };
    this.objetivoInput = '';
    this.documentSearch = '';
    this.testAgent = null;
    this.skillOptions.forEach(o => o.selected = false);
    this.toolOptions.forEach(o => o.selected = false);
  }

  toggleWizard(): void {
    this.wizardVisible = !this.wizardVisible;
  }
}
