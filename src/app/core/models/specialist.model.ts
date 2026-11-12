import { IconName } from '../../shared/components/icon/icon.component';

/** Etapas do wizard conduzido pelo agente orquestrador. */
export type SpecialistStep =
  | 'objetivo'    // O que o usuário quer que o especialista faça
  | 'prompt'      // Prompt gerado pelo orquestrador (revisão)
  | 'skills'      // Habilidades do especialista
  | 'tools'       // Ferramentas/integrações
  | 'knowledge'   // Catálogo de documentos para RAG
  | 'revisao';    // Revisão final

/** Uma habilidade/opção selecionável no wizard. */
export interface WizardOption {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  selected?: boolean;
}

/** Estado completo do especialista sendo construído. */
export interface SpecialistDraft {
  objetivo: string;
  prompt: string;
  skills: string[];
  tools: string[];
  /** IDs dos documentos do catálogo selecionados para RAG. */
  documents: string[];
  name: string;
}

export const EMPTY_DRAFT: SpecialistDraft = {
  objetivo: '',
  prompt: '',
  skills: [],
  tools: [],
  documents: [],
  name: ''
};
