import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Sparkles, MessageSquare } from 'lucide-react';
import { ChatMessage, Channel } from '../types';
import { CHAT_COMMENT_TEMPLATES, CHAT_USERS, CHAT_EMOJIS } from '../data/channels';

interface LiveChatProps {
  selectedChannel: Channel;
}

const AVATAR_COLORS = [
  'bg-emerald-500',
  'bg-sky-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-fuchsia-500',
  'bg-yellow-500',
];

export default function LiveChat({ selectedChannel }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [viewerCount, setViewerCount] = useState(1240);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate initial messages & simulate viewer count oscillation
  useEffect(() => {
    // Generate 6 random starting comments
    const initialMsgs: ChatMessage[] = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const msgTime = new Date(now.getTime() - i * 30000);
      const user = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
      const text = CHAT_COMMENT_TEMPLATES[Math.floor(Math.random() * CHAT_COMMENT_TEMPLATES.length)];
      const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      const emoji = Math.random() > 0.65 ? CHAT_EMOJIS[Math.floor(Math.random() * CHAT_EMOJIS.length)] : undefined;

      initialMsgs.push({
        id: `init-${i}`,
        user,
        text,
        avatarColor: color,
        timestamp: msgTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        reaction: emoji,
      });
    }

    setMessages(initialMsgs);
    setViewerCount(Math.floor(Math.random() * 800 + 1200));

    // Cleanup and trigger on channel change
  }, [selectedChannel]);

  // Handle auto scrolling to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate incoming live viewer comments
  useEffect(() => {
    const streamCommentInterval = setInterval(() => {
      // Periodic new message
      const now = new Date();
      const user = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
      
      // Customize message sometimes depending on category
      let text = CHAT_COMMENT_TEMPLATES[Math.floor(Math.random() * CHAT_COMMENT_TEMPLATES.length)];
      if (selectedChannel.category === 'Notícias' && Math.random() > 0.5) {
        text = "Fato bizarro, tô chocado com as notícias.";
      } else if (selectedChannel.category === 'Esportes' && Math.random() > 0.5) {
        text = "GOLAÇO! O jogo tá de tirar o fôlego!";
      }

      const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      const emoji = Math.random() > 0.7 ? CHAT_EMOJIS[Math.floor(Math.random() * CHAT_EMOJIS.length)] : undefined;

      const newMsg: ChatMessage = {
        id: `live-${Date.now()}`,
        user,
        text,
        avatarColor: color,
        timestamp: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        reaction: emoji,
      };

      setMessages((prev) => [...prev.slice(-30), newMsg]); // Keep last 30 messages max
      
      // Oscillate audience count
      setViewerCount((prev) => Math.max(100, prev + Math.floor(Math.random() * 21 - 10)));
    }, 5500);

    return () => clearInterval(streamCommentInterval);
  }, [selectedChannel]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const now = new Date();
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      user: 'Você',
      text: inputVal.trim(),
      avatarColor: 'bg-amber-500 ring-2 ring-amber-400',
      timestamp: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const storedVal = inputVal.trim();
    setInputVal('');

    // Trigger an automatic organic-looking viewer reply to the user's comment
    setTimeout(() => {
      const replyUser = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
      const replies = [
        `Concordo plenamente com você, @Você!`,
        `Kkkkk verdade, @Você.`,
        `Disse tudo! É bem por aí mesmo.`,
        `Nossa, sim! Que massa seu comentário.`,
        `Faz sentido, @Você 👏👏`,
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      const replyColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          user: replyUser,
          text: replyText,
          avatarColor: replyColor,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1800);
  };

  const addEmojiReaction = (emoji: string) => {
    const now = new Date();
    const reactionMessage: ChatMessage = {
      id: `reaction-${Date.now()}`,
      user: 'Você',
      text: `reagiu com ${emoji}`,
      avatarColor: 'bg-amber-500',
      timestamp: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      reaction: emoji,
    };
    setMessages((prev) => [...prev, reactionMessage]);
  };

  return (
    <div className="flex flex-col h-[500px] bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden w-full lg:w-[350px] shrink-0">
      {/* Chat Title / Audience Stats */}
      <div className="flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-500" />
          <h3 className="text-white font-bold text-sm">Chat da Transmissão</h3>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-bold text-red-400">
          <Users className="w-3.5 h-3.5" />
          <span>{viewerCount.toLocaleString('pt-BR')} assistindo</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        id="chat-messages-scroll-area"
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent"
      >
        <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/80 text-center mb-2">
          <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1 animate-pulse" />
          <p className="text-[10px] text-neutral-400">
            Você está sintonizado no chat do canal <strong className="text-amber-500">{selectedChannel.name}</strong>. Seja amigável!
          </p>
        </div>

        {messages.map((msg) => {
          const isUser = msg.user === 'Você';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 text-xs transition-all animate-fade-in ${
                isUser ? 'bg-amber-500/5 p-1.5 rounded-lg border border-amber-500/10' : ''
              }`}
            >
              {/* Avatar Initial Circle */}
              <div className={`w-6 h-6 shrink-0 rounded-full text-[10px] font-bold text-white flex items-center justify-center uppercase shadow-xs ${msg.avatarColor}`}>
                {msg.user.substring(0, 2)}
              </div>

              {/* Msg Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className={`font-extrabold truncate ${isUser ? 'text-amber-400' : 'text-neutral-300'}`}>
                    {msg.user}
                  </span>
                  {isUser && (
                    <span className="text-[8px] bg-amber-500 text-neutral-950 font-black px-1 py-0.2 rounded-sm tracking-wide">
                      AUTOR
                    </span>
                  )}
                  <span className="text-[9px] text-neutral-500 font-mono ml-auto">
                    {msg.timestamp}
                  </span>
                </div>
                <p className={`mt-0.5 leading-relaxed break-words ${isUser ? 'text-amber-100 font-medium' : 'text-neutral-400'}`}>
                  {msg.text}
                </p>
              </div>

              {/* Emoji reaction overlay */}
              {msg.reaction && (
                <div className="text-sm self-center select-none animate-bounce">
                  {msg.reaction}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Reaction Emoji bar */}
      <div className="flex items-center justify-around py-1.5 px-3 bg-neutral-950/60 border-t border-neutral-950">
        {CHAT_EMOJIS.slice(0, 6).map((emoji) => (
          <button
            key={emoji}
            id={`btn-react-emoji-${emoji}`}
            onClick={() => addEmojiReaction(emoji)}
            className="text-base hover:scale-125 hover:rotate-6 active:scale-95 transition-all p-1 cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Chat Form Footer */}
      <form
        id="chat-live-message-form"
        onSubmit={handleSendMessage}
        className="p-3 bg-neutral-900 border-t border-neutral-800/80 flex gap-2"
      >
        <input
          id="chat-message-input"
          type="text"
          placeholder="Enviar mensagem para a live..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          maxLength={100}
          className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
        />
        <button
          id="btn-chat-send-message"
          type="submit"
          disabled={!inputVal.trim()}
          className="p-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:bg-neutral-800 text-neutral-950 rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
