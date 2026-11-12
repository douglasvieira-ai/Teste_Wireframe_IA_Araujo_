import { KnowledgeDocument } from '../models/document.model';

/**
 * Catálogo (mockado) de documentos de conhecimento da Drogaria Araujo.
 * O usuário seleciona quais documentos o especialista usará como base de RAG.
 * Dados fictícios apenas para apresentação.
 */
export const KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-manual-rh',
    name: 'Manual do Colaborador 2026',
    category: 'RH',
    type: 'PDF',
    size: '2.4 MB',
    description: 'Políticas internas, benefícios, férias e normas de conduta.',
    icon: 'user'
  },
  {
    id: 'doc-ferias-beneficios',
    name: 'Guia de Férias e Benefícios',
    category: 'RH',
    type: 'DOCX',
    size: '860 KB',
    description: 'Regras de solicitação de férias, VR, VT e plano de saúde.',
    icon: 'file-text'
  },
  {
    id: 'doc-contas-pagar',
    name: 'Procedimento de Contas a Pagar',
    category: 'Financeiro',
    type: 'PDF',
    size: '1.1 MB',
    description: 'Fluxo de aprovação de notas fiscais e prazos de pagamento.',
    icon: 'dollar-sign'
  },
  {
    id: 'doc-fechamento-caixa',
    name: 'Fechamento de Caixa no SAP',
    category: 'Financeiro',
    type: 'PDF',
    size: '3.2 MB',
    description: 'Passo a passo do fechamento diário e tratamento de erros.',
    icon: 'building'
  },
  {
    id: 'doc-medicamentos',
    name: 'Bulário e Indicações de Medicamentos',
    category: 'Farmácia',
    type: 'XLSX',
    size: '5.8 MB',
    description: 'Base de medicamentos, princípios ativos e contraindicações.',
    icon: 'pill'
  },
  {
    id: 'doc-dispensacao',
    name: 'Política de Dispensação',
    category: 'Farmácia',
    type: 'PDF',
    size: '740 KB',
    description: 'Regras de venda controlada e exigência de receituário.',
    icon: 'clipboard'
  },
  {
    id: 'doc-chamados-ti',
    name: 'Catálogo de Serviços de TI',
    category: 'TI',
    type: 'PDF',
    size: '1.6 MB',
    description: 'Tipos de chamado, SLAs e procedimentos de abertura.',
    icon: 'monitor'
  },
  {
    id: 'doc-acessos-sistemas',
    name: 'Guia de Acessos e Sistemas',
    category: 'TI',
    type: 'DOCX',
    size: '920 KB',
    description: 'Solicitação de acessos, redefinição de senha e VPN.',
    icon: 'settings'
  },
  {
    id: 'doc-atendimento-cliente',
    name: 'Manual de Atendimento ao Cliente',
    category: 'Atendimento',
    type: 'PDF',
    size: '2.0 MB',
    description: 'Scripts de atendimento, tom de voz e tratamento de reclamações.',
    icon: 'headset'
  },
  {
    id: 'doc-faq-loja',
    name: 'FAQ Operação de Loja',
    category: 'Operação',
    type: 'DOCX',
    size: '1.3 MB',
    description: 'Dúvidas frequentes de operadores sobre rotinas da loja.',
    icon: 'help-circle'
  }
];
