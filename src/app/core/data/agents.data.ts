import { Agent, AgentGroup, AgentPreset, Conversation } from '../models/agent.model';

// Presets de Agentes (para a Home)
export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'preset-rh',
    name: 'RH',
    description: 'Preparado para responder as principais dúvidas sobre nosso setor de recursos humanos.',
    icon: 'user',
    color: '#3E8FD6',
    agents: ['rh-araujo-service']
  },
  {
    id: 'preset-financeiro',
    name: 'Financeiro',
    description: 'Tire dúvidas sobre contas a pagar, notas fiscais e processos financeiros.',
    icon: 'dollar-sign',
    color: '#F6A609',
    agents: ['financeiro-araujo-service']
  },
  {
    id: 'preset-atendimento',
    name: 'Atendimento ao Cliente',
    description: 'Apoio para responder solicitações e reclamações dos nossos clientes.',
    icon: 'headset',
    color: '#E8896B',
    agents: ['atendimento-kaizen']
  },
  {
    id: 'preset-farmacia',
    name: 'Farmácia',
    description: 'Informações sobre medicamentos, indicações e políticas de dispensação.',
    icon: 'pill',
    color: '#7C9CE0',
    agents: ['farmaceutico-kaizen', 'servicos-farmaceuticos-araujo-service']
  },
  {
    id: 'preset-ti',
    name: 'Tecnologia (TI)',
    description: 'Suporte para chamados de sistemas, acessos e equipamentos.',
    icon: 'monitor',
    color: '#E03131',
    agents: ['ti-araujo-service', 'equipamentos-araujo-service']
  },
  {
    id: 'preset-marketing',
    name: 'Marketing',
    description: 'Ajuda com campanhas, comunicação de marca e materiais promocionais.',
    icon: 'megaphone',
    color: '#F6A609',
    agents: []
  },
  {
    id: 'preset-ticket',
    name: 'Abertura de Ticket',
    description: 'Abra e acompanhe chamados no Freshservice sem sair do chat.',
    icon: 'ticket',
    color: '#5AB0C4',
    agents: []
  }
];

// Grupos de Agentes (para Criar Agente Personalizado)
export const AGENT_GROUPS: AgentGroup[] = [
  {
    id: 'araujo-service',
    name: 'Araujo Service',
    icon: 'wrench',
    color: '#3E8FD6',
    agents: [
      { id: 'financeiro-araujo-service', name: 'Financeiro', description: 'Fechamento de caixa, gestor financeiro, quebras', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'equipamentos-araujo-service', name: 'Equipamentos e Aplicativos', description: 'Desktop Central, instalação de software', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'troca-devolucao-araujo-service', name: 'Troca e Devolução', description: 'Procedimentos de troca e devolução', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'ti-araujo-service', name: 'TI', description: 'Suporte técnico e sistemas', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'acessos-araujo-service', name: 'Acessos e Permissões', description: 'SAP, Rede, Meu RH', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'araujo-tem-araujo-service', name: 'Araujo Tem', description: 'Pedidos e entregas', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'clique-retire-araujo-service', name: 'Clique e Retire', description: 'FAQ vacinas, locker', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'coletor-araujo-service', name: 'Coletor', description: 'Recebimento, RC, inventário', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'convenio-araujo-service', name: 'Convênio', description: 'Vendas em convênio', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'ifood-araujo-service', name: 'Ifood', description: 'Pedidos parceiros', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'etiquetas-araujo-service', name: 'Etiquetas de Preço', description: 'Impressão de etiquetas', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'lgpd-araujo-service', name: 'LGPD', description: 'Lei de proteção de dados', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'manipulados-araujo-service', name: 'Manipulados', description: 'Controlados e fórmulas', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'pbm-araujo-service', name: 'PBM', description: 'Programa de benefícios', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'sap-araujo-service', name: 'SAP', description: 'Sistema SAP', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'seguranca-araujo-service', name: 'Segurança da Informação', description: 'Políticas de segurança', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'senf-araujo-service', name: 'SENF Lojas', description: 'Sistema SENF', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'servicos-farmaceuticos-araujo-service', name: 'Serviços Farmacêuticos', description: 'Serviços de farmácia', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'siac-araujo-service', name: 'SIAC SCOPE', description: 'Sistema SIAC', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'valid-araujo-service', name: 'Sistema Valid', description: 'Sistema Minus/Valid', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'supervendedor-araujo-service', name: 'Supervendedor', description: 'Programa supervendedor', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'sydle-araujo-service', name: 'Sydle', description: 'Sistema Sydle', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'performa-araujo-service', name: 'Performa', description: 'Avaliação de desempenho', group: {} as AgentGroup, color: '#3E8FD6' },
      { id: 'relatorios-araujo-service', name: 'Relatórios e Painéis', description: 'BI e dashboards', group: {} as AgentGroup, color: '#3E8FD6' }
    ]
  },
  {
    id: 'sesuite',
    name: 'SESUITE',
    icon: 'clipboard',
    color: '#F6A609',
    agents: [
      { id: 'avn-sesuite', name: 'Avisos e Normas (AVN)', description: 'Avisos e normas corporativas', group: {} as AgentGroup, color: '#F6A609' },
      { id: 'for-sesuite', name: 'Formulários (FOR)', description: 'Formulários padrão', group: {} as AgentGroup, color: '#F6A609' },
      { id: 'man-sesuite', name: 'Manuais (MAN)', description: 'Manuais operacionais', group: {} as AgentGroup, color: '#F6A609' },
      { id: 'nor-sesuite', name: 'Normas (NOR)', description: 'Normas internas', group: {} as AgentGroup, color: '#F6A609' },
      { id: 'pop-sesuite', name: 'Procedimentos (POP)', description: 'Procedimentos operacionais', group: {} as AgentGroup, color: '#F6A609' },
      { id: 'lup-sesuite', name: 'Lições de Um Ponto (LUP)', description: 'Lições rápidas', group: {} as AgentGroup, color: '#F6A609' }
    ]
  },
  {
    id: 'kaizen',
    name: 'Projeto Melhor Todo Dia',
    icon: 'target',
    color: '#5AB0C4',
    agents: [
      { id: 'cdist-kaizen', name: 'Centro de Distribuição (CDIST)', description: 'Operações CD', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'dirco-kaizen', name: 'Diretoria Corporativa (DIRCO)', description: 'Diretrizes corporativas', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'ditec-kaizen', name: 'Diretoria Técnica (DITEC)', description: 'Área técnica', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'geadm-kaizen', name: 'Gestão Administrativa (GEADM)', description: 'Administração', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'gecat-kaizen', name: 'Gestão de Categoria (GECAT)', description: 'Categorias de produtos', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'gefin-kaizen', name: 'Gestão Financeira (GEFIN)', description: 'Finanças', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'gegep-kaizen', name: 'GEGEP', description: 'Gestão de pessoas', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'geinf-kaizen', name: 'Gestão de TI (GEINF)', description: 'Tecnologia da informação', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'gejur-kaizen', name: 'GEJUR', description: 'Jurídico', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'geman-kaizen', name: 'Gestão de Manipulados (GEMAN)', description: 'Manipulação', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'gemes-kaizen', name: 'Medicamentos Especiais (GEMES)', description: 'Medicamentos especiais', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'sugep-kaizen', name: 'Gestão de Pessoas (RH)', description: 'Recursos humanos', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'atendimento-kaizen', name: 'Atendimento', description: 'Atendimento ao cliente', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'execucao-kaizen', name: 'Execução Loja', description: 'Operações de loja', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'farmaceutico-kaizen', name: 'Farmacêutico', description: 'Área farmacêutica', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'gestao-gerencial-kaizen', name: 'Gestão Gerencial', description: 'Gestão de lojas', group: {} as AgentGroup, color: '#5AB0C4' },
      { id: 'ritmo-kaizen', name: 'Ferramenta Ritmo', description: 'Sistema Ritmo', group: {} as AgentGroup, color: '#5AB0C4' }
    ]
  },
  {
    id: 'portal',
    name: 'Portal Araujo',
    icon: 'newspaper',
    color: '#7C9CE0',
    agents: [
      { id: 'normas-portal', name: 'Normas e Avisos', description: 'Comunicados do portal', group: {} as AgentGroup, color: '#7C9CE0' },
      { id: 'noticias-portal', name: 'Notícias', description: 'Notícias corporativas', group: {} as AgentGroup, color: '#7C9CE0' }
    ]
  },
  {
    id: 'ppr',
    name: 'PPR',
    icon: 'trending-up',
    color: '#E8896B',
    agents: [
      { id: 'ppr-agent', name: 'PPR', description: 'Programa de participação nos resultados', group: {} as AgentGroup, color: '#E8896B' }
    ]
  }
];

// Conversas recentes mockadas
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Dúvida sobre férias',
    preview: 'Como solicitar férias no sistema?',
    agentId: 'preset-rh',
    agentName: 'RH',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2h atrás
  },
  {
    id: 'conv-2',
    title: 'Nota fiscal pendente',
    preview: 'Preciso emitir uma nota fiscal...',
    agentId: 'preset-financeiro',
    agentName: 'Financeiro',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 dia atrás
  },
  {
    id: 'conv-3',
    title: 'Chamado de TI',
    preview: 'Meu computador está lento',
    agentId: 'preset-ti',
    agentName: 'TI',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 dias atrás
  },
  {
    id: 'conv-4',
    title: 'PBM - Desconto cliente',
    preview: 'Cliente não consegue desconto',
    agentId: 'pbm-araujo-service',
    agentName: 'PBM',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 dias atrás
  },
  {
    id: 'conv-5',
    title: 'Troca de produto',
    preview: 'Procedimento para troca',
    agentId: 'troca-devolucao-araujo-service',
    agentName: 'Troca e Devolução',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 semana atrás
  }
];

// Favoritos mockados
export const MOCK_FAVORITES = [
  { id: 'preset-rh', name: 'Agente RH', color: '#3E8FD6' },
  { id: 'preset-financeiro', name: 'Financeiro', color: '#3E8FD6' },
  { id: 'ti-araujo-service', name: 'TI - Araujo Service', color: '#E03131' }
];



