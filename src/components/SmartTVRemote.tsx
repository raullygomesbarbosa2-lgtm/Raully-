import { useEffect, useState } from 'react';
import { Tv, Play, VolumeX, Maximize, Keyboard, Eye, EyeOff, HelpCircle } from 'lucide-react';

interface SmartTVRemoteProps {
  onPrevChannel: () => void;
  onNextChannel: () => void;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  onToggleFullscreen: () => void;
}

export default function SmartTVRemote({
  onPrevChannel,
  onNextChannel,
  onToggleMute,
  onTogglePlay,
  onToggleFullscreen,
}: SmartTVRemoteProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Set up global keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside input or textarea to avoid overriding writing
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onPrevChannel();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onNextChannel();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          onToggleMute();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          onToggleFullscreen();
          break;
        case ' ':
          e.preventDefault();
          onTogglePlay();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevChannel, onNextChannel, onToggleMute, onTogglePlay, onToggleFullscreen]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Visual remote expanded panel */}
      {isOpen && (
        <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-2xl mb-3 w-64 animate-scale-up text-xs flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Controle Inteligente
            </span>
            <button
              id="btn-close-remote-help"
              onClick={() => setIsOpen(false)}
              className="text-[10px] text-neutral-500 hover:text-white"
            >
              Fechar
            </button>
          </div>

          <p className="text-neutral-400 leading-relaxed text-[11px]">
            Você pode controlar a TV utilizando as teclas de atalho do seu teclado:
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Canal Anterior</span>
              <kbd className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-neutral-300">▲ Seta Cima</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Próximo Canal</span>
              <kbd className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-neutral-300">▼ Seta Baixo</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Mudar Volume / Mudo</span>
              <kbd className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-neutral-300">Teclado M</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Tela Cheia</span>
              <kbd className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-neutral-300">Teclado F</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Play / Pause</span>
              <kbd className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-neutral-300">Espaço</kbd>
            </div>
          </div>

          <div className="mt-1 pt-2 border-t border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500">Navegação adaptada para Smart TV</span>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        id="btn-toggle-remote-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 bg-amber-500 text-neutral-950 hover:bg-amber-600 font-bold rounded-full shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Mostrar atalhos de teclado"
      >
        <Keyboard className="w-4 h-4" />
        <span className="text-xs">Atalhos</span>
        {isOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
