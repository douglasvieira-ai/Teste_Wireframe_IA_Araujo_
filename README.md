# Hub Multiagêntico - IA Araujo

Interface de chat multiagêntico para a Drogaria Araujo, permitindo interação com agentes especialistas de diferentes áreas.

## 🚀 Funcionalidades

- **Presets de Agentes**: Agentes pré-configurados para áreas específicas (RH, Financeiro, TI, etc.)
- **Criar Agente Personalizado**: Monte seu próprio conjunto de agentes combinando especialistas de diferentes grupos
- **Chat Interativo**: Interface de chat moderna com sugestões de perguntas
- **Sidebar Completa**: Navegação, favoritos, conversas recentes

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Build para produção
npm run build
```

## 🎨 Design System

O projeto segue o design system da IA Araujo com:

- **Tema escuro** como padrão
- **Cor primária**: `#00D18C` (verde Araujo)
- **Fontes**: Inter (corpo) e Montserrat (títulos)

### Cores dos Agentes

| Grupo | Cor |
|-------|-----|
| Araujo Service | `#00D18C` |
| SESUITE | `#3B82F6` |
| Projeto Melhor Todo Dia | `#F59E0B` |
| Portal Araujo | `#8B5CF6` |
| PPR | `#EC4899` |

## 📁 Estrutura

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Interfaces e tipos
│   │   └── data/            # Dados mockados dos agentes
│   ├── shared/
│   │   └── components/
│   │       └── sidebar/     # Componente da sidebar
│   └── features/
│       ├── home/            # Página inicial com presets
│       ├── criar-agente/    # Criar agente personalizado
│       └── chat/            # Interface de chat
├── styles.scss              # Estilos globais e design system
└── index.html
```

## 🔧 Grupos de Agentes Disponíveis

1. **🛠️ Araujo Service** (24 agentes)
   - Financeiro, TI, Troca/Devolução, PBM, SAP, etc.

2. **📋 SESUITE** (6 agentes)
   - AVN, FOR, MAN, NOR, POP, LUP

3. **🎯 Projeto Melhor Todo Dia** (17 agentes)
   - GEFIN, GEGEP, Farmacêutico, Atendimento, etc.

4. **📰 Portal Araujo** (2 agentes)
   - Normas e Avisos, Notícias

5. **💰 PPR** (1 agente)
   - PPR

## 🔗 Rotas

| Rota | Descrição |
|------|-----------|
| `/home` | Página inicial com presets |
| `/criar-agente` | Criar agente personalizado |
| `/chat/:agentId` | Chat com um agente específico |

## 📝 Próximos Passos

- [ ] Integração com backend da IA Araujo
- [ ] Autenticação SSO
- [ ] Persistência de conversas
- [ ] Favoritos dinâmicos
- [ ] Histórico de mensagens
