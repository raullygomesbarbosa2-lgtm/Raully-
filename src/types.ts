export interface Channel {
  id: string;
  name: string;
  logo: string;
  logoBg: string; // Tailwind background color for fallback icon
  category: Category;
  streamUrl: string;
  type: 'hls' | 'youtube';
  description: string;
  currentShow: string;
  nextShow: string;
  isCustom?: boolean;
  backupUrl?: string;
  backupType?: 'hls' | 'youtube';
}

export type Category = 
  | 'Geral' 
  | 'Notícias' 
  | 'Cultura & Educativos' 
  | 'Esportes' 
  | 'Entretenimento' 
  | 'Filmes & Séries'
  | 'Desenhos & Kids'
  | 'Religioso'
  | 'Favoritos'
  | 'Personalizados';

export interface Program {
  id: string;
  title: string;
  time: string; // Format "HH:MM"
  duration: number; // in minutes
  description: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  avatarColor: string;
  timestamp: string;
  reaction?: string;
}
