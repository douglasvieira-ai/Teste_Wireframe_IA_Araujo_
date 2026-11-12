import { IconName } from '../../shared/components/icon/icon.component';

/**
 * Documento do catálogo de conhecimento.
 * Representa um arquivo interno que pode ser selecionado para o
 * especialista fazer RAG (recuperação semântica) em cima.
 */
export interface KnowledgeDocument {
  id: string;
  name: string;
  /** Categoria/área de origem (ex.: RH, Financeiro, TI). */
  category: string;
  /** Formato do arquivo exibido como etiqueta (PDF, DOCX, XLSX...). */
  type: string;
  /** Tamanho aproximado, apenas para exibição. */
  size: string;
  /** Resumo curto do conteúdo do documento. */
  description: string;
  icon?: IconName;
}
