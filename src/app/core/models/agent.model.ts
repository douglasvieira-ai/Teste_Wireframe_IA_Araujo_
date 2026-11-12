import { IconName } from '../../shared/components/icon/icon.component';

export interface Agent {
  id: string;
  name: string;
  description: string;
  group: AgentGroup;
  color: string;
  icon?: IconName;
  isPreset?: boolean;
}

export interface AgentGroup {
  id: string;
  name: string;
  icon: IconName;
  color: string;
  agents: Agent[];
}

export interface AgentPreset {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  color: string;
  agents: string[]; // IDs dos agentes que compõem o preset
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  agentId: string;
  agentName: string;
  timestamp: Date;
  unread?: boolean;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
  isSystem?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentAgent: Agent | AgentPreset | null;
}
