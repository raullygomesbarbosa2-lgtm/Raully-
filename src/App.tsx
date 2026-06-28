import React, { useState, useEffect } from 'react';
import { Tv, Flame, Heart, Info, Globe, Shield, RefreshCw, Layers } from 'lucide-react';
import { Channel } from './types';
import { INITIAL_CHANNELS } from './data/channels';

import VideoPlayer from './components/VideoPlayer';
import ChannelList from './components/ChannelList';
import ProgrammingGuide from './components/ProgrammingGuide';
import LiveChat from './components/LiveChat';
import CustomChannelModal from './components/CustomChannelModal';
import SmartTVRemote from './components/SmartTVRemote';

export default function App() {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(INITIAL_CHANNELS[0]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load favorites & custom channels from local storage on mount
  useEffect(() => {
    try {
      // 1. Load favorites
      const savedFavs = localStorage.getItem('brasil_tv_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      // 2. Load custom channels
      const savedCustom = localStorage.getItem('brasil_tv_custom_channels');
      if (savedCustom) {
        const parsedCustom: Channel[] = JSON.parse(savedCustom);
        setChannels([...INITIAL_CHANNELS, ...parsedCustom]);
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  // Handle saving favorites
  const handleToggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('brasil_tv_favorites', JSON.stringify(updated));
  };

  // Handle adding custom channel
  const handleAddChannel = (newChannel: Channel) => {
    const updatedChannels = [...channels, newChannel];
    setChannels(updatedChannels);
    setSelectedChannel(newChannel);

    // Save list of custom channels
    const customOnly = updatedChannels.filter((c) => c.isCustom);
    localStorage.setItem('brasil_tv_custom_channels', JSON.stringify(customOnly));
  };

  // Handle deleting custom channel
  const handleDeleteCustomChannel = (id: string) => {
    const updatedChannels = channels.filter((c) => c.id !== id);
    setChannels(updatedChannels);

    // If deleted active channel, reset to first standard channel
    if (selectedChannel.id === id) {
      setSelectedChannel(INITIAL_CHANNELS[0]);
    }

    // Save list of remaining custom channels
    const customOnly = updatedChannels.filter((c) => c.isCustom);
    localStorage.setItem('brasil_tv_custom_channels', JSON.stringify(customOnly));
  };

  // Trigger stream refresh
  const handleRefreshChannel = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Channel hopping keyboard navigation helpers
  const handlePrevChannel = () => {
    const activeIdx = channels.findIndex((c) => c.id === selectedChannel.id);
    if (activeIdx > 0) {
      setSelectedChannel(channels[activeIdx - 1]);
    } else {
      setSelectedChannel(channels[channels.length - 1]); // Loop to end
    }
  };

  const handleNextChannel = () => {
    const activeIdx = channels.findIndex((c) => c.id === selectedChannel.id);
    if (activeIdx < channels.length - 1) {
      setSelectedChannel(channels[activeIdx + 1]);
    } else {
      setSelectedChannel(channels[0]); // Loop to start
    }
  };

  // Simulate remote button pressing to avoid dual-state syncing
  const triggerPlayerControl = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.click();
    }
  };

  const totalCustom = channels.filter((c) => c.isCustom).length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-20 transition-colors duration-500 relative">
      
      {/* Visual Ambient Cinema Glow Backdrop */}
      {isCinemaMode && (
        <div 
          onClick={() => setIsCinemaMode(false)}
          className="fixed inset-0 bg-black/95 z-30 cursor-pointer animate-fade-in flex items-center justify-center"
        >
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold rounded-full pointer-events-none animate-pulse">
            Clique em qualquer lugar fora para sair do Modo Cinema
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
        
        {/* Header Section */}
        <header className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-900/80 transition-opacity duration-300 ${
          isCinemaMode ? 'opacity-5 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-amber-500/10">
              <Tv className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">Brasil TV Aberta</h1>
                <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SINAIS ATIVOS
                </span>
              </div>
              <p className="text-neutral-400 text-xs mt-0.5">
                Sua central premium de televisão aberta ao vivo. 100% gratuito e direto na web.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live stats metadata */}
            <div className="hidden lg:flex items-center gap-4 bg-neutral-900/60 border border-neutral-900 px-4 py-2 rounded-xl text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Canais: <strong className="text-neutral-200">{channels.length}</strong></span>
              </div>
              <span className="text-neutral-800">|</span>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
                <span>Favoritos: <strong className="text-neutral-200">{favorites.length}</strong></span>
              </div>
            </div>

            <button
              id="btn-add-custom-channel-header"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-amber-500/10 hover:scale-[1.02] active:scale-95 shrink-0"
            >
              Sintonizar Novo Canal
            </button>
          </div>
        </header>

        {/* Live Streaming Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Player Column (Left) */}
          <div className={`lg:col-span-2 flex flex-col gap-6 z-10 transition-transform duration-500 ${
            isCinemaMode ? 'relative z-40 w-full scale-[1.02] md:translate-y-12' : ''
          }`}>
            <VideoPlayer
              key={`${selectedChannel.id}-${refreshKey}`}
              channel={selectedChannel}
              isCinemaMode={isCinemaMode}
              setIsCinemaMode={setIsCinemaMode}
              onRefreshChannel={handleRefreshChannel}
            />

            {/* Programming guide is hidden or low opacity during cinema mode */}
            <div className={`transition-all duration-300 ${isCinemaMode ? 'opacity-0 h-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
              <ProgrammingGuide selectedChannel={selectedChannel} />
            </div>
          </div>

          {/* Sidebar Chat Column (Right) */}
          <div className={`transition-all duration-300 ${
            isCinemaMode ? 'opacity-0 lg:opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <LiveChat selectedChannel={selectedChannel} />
          </div>

        </div>

        {/* Channels Browser Grid Section */}
        <section className={`mt-4 border-t border-neutral-900 pt-8 transition-opacity duration-300 ${
          isCinemaMode ? 'opacity-5 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-white tracking-tight">Grade de Canais</h2>
            </div>
            <p className="text-xs text-neutral-500">
              {INITIAL_CHANNELS.length} Canais Públicos • {totalCustom} Canais Personalizados sintonizados
            </p>
          </div>

          <ChannelList
            channels={channels}
            selectedChannelId={selectedChannel.id}
            onSelectChannel={setSelectedChannel}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onDeleteCustomChannel={handleDeleteCustomChannel}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </section>

        {/* Quick Tips Box */}
        <div className={`mt-6 p-4 bg-neutral-900/40 rounded-2xl border border-neutral-800/60 text-xs text-neutral-400 flex flex-col md:flex-row items-center gap-4 justify-between transition-opacity duration-300 ${
          isCinemaMode ? 'opacity-5 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex items-center gap-2.5">
            <Info className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="leading-relaxed">
              <strong>Dica de uso:</strong> Se algum canal público falhar ao carregar, tente recarregar o sinal ou adicione um sinal IPTV alternativo (.m3u8) usando o botão de sintonização.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 shrink-0 font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>CONEXÃO SEGURA SSL</span>
          </div>
        </div>

        {/* Elegant Footer */}
        <footer className={`mt-12 pt-6 border-t border-neutral-900 text-center text-xs text-neutral-500 transition-opacity duration-300 ${
          isCinemaMode ? 'opacity-5 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tv className="w-4 h-4 text-amber-500/60" />
            <span className="font-bold text-neutral-400">Brasil TV Aberta</span>
            <span className="text-neutral-700">•</span>
            <span>Estabilidade HD</span>
          </div>
          <p>
            Plataforma digital integrada e adaptada para Smart TVs e navegadores móveis.
          </p>
          <div className="mt-4 flex justify-center items-center gap-1.5 text-neutral-600 font-medium">
            <span>Criado com Orgulho no Brasil</span>
            <span className="text-emerald-500">🇧🇷</span>
          </div>
        </footer>

      </div>

      {/* Dynamic Keybinding Remote Controller */}
      <SmartTVRemote
        onPrevChannel={handlePrevChannel}
        onNextChannel={handleNextChannel}
        onToggleMute={() => triggerPlayerControl('btn-toggle-mute')}
        onTogglePlay={() => triggerPlayerControl('btn-play-pause')}
        onToggleFullscreen={() => triggerPlayerControl('btn-toggle-fullscreen')}
      />

      {/* Custom channel modal */}
      <CustomChannelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddChannel={handleAddChannel}
      />
    </div>
  );
}
