import { useState } from 'react';
import { Search, Star, Tv, Trash2, Heart, Plus } from 'lucide-react';
import { Channel, Category } from '../types';

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId: string;
  onSelectChannel: (channel: Channel) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onDeleteCustomChannel: (id: string) => void;
  onOpenAddModal: () => void;
}

const CATEGORIES: Category[] = [
  'Geral',
  'Notícias',
  'Cultura & Educativos',
  'Esportes',
  'Entretenimento',
  'Filmes & Séries',
  'Desenhos & Kids',
  'Religioso',
  'Favoritos',
  'Personalizados'
];

export default function ChannelList({
  channels,
  selectedChannelId,
  onSelectChannel,
  favorites,
  onToggleFavorite,
  onDeleteCustomChannel,
  onOpenAddModal,
}: ChannelListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');

  // Filter channels based on search query and selected category
  const filteredChannels = channels.filter((channel) => {
    const matchesSearch =
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'Todos') {
      return matchesSearch;
    } else if (activeCategory === 'Favoritos') {
      return favorites.includes(channel.id) && matchesSearch;
    } else if (activeCategory === 'Personalizados') {
      return channel.isCustom && matchesSearch;
    } else {
      return channel.category === activeCategory && matchesSearch;
    }
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Search and Quick Filters Header */}
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-between w-full">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5 pointer-events-none" />
          <input
            id="search-channel-input"
            type="text"
            placeholder="Buscar canais por nome, gênero ou descrição..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
          />
        </div>

        {/* Categories Carousel / Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          <button
            id="filter-category-all"
            onClick={() => setActiveCategory('Todos')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'Todos'
                ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Todos
          </button>
          
          {CATEGORIES.map((cat) => {
            const isFav = cat === 'Favoritos';
            const isCustom = cat === 'Personalizados';
            const count = channels.filter(c => {
              if (isFav) return favorites.includes(c.id);
              if (isCustom) return c.isCustom;
              return c.category === cat;
            }).length;

            return (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {isFav && <Heart className={`w-3.5 h-3.5 ${activeCategory === cat ? 'fill-neutral-950' : 'fill-rose-500/10 text-rose-500'}`} />}
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${activeCategory === cat ? 'bg-neutral-950/20 text-neutral-900' : 'bg-neutral-800 text-neutral-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}

          <button
            id="btn-add-custom-channel-trigger"
            onClick={onOpenAddModal}
            className="ml-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Adicionar Canal
          </button>
        </div>
      </div>

      {/* Grid of Channels */}
      {filteredChannels.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl">
          <Tv className="w-12 h-12 text-neutral-600 mb-4 stroke-1 animate-pulse" />
          <h4 className="text-white font-bold">Nenhum canal sintonizado</h4>
          <p className="text-neutral-500 text-sm max-w-sm mt-1">
            Não encontramos nenhum canal nesta categoria ou com os termos pesquisados.
          </p>
          <div className="mt-4 flex gap-3">
            {(activeCategory !== 'Todos' || searchQuery !== '') && (
              <button
                id="btn-clear-search-filters"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Todos');
                }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl cursor-pointer transition-all"
              >
                Limpar Filtros
              </button>
            )}
            <button
              id="btn-add-channel-empty-state"
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold rounded-xl cursor-pointer transition-all"
            >
              Criar Canal Customizado
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredChannels.map((channel) => {
            const isSelected = channel.id === selectedChannelId;
            const isFavorite = favorites.includes(channel.id);

            return (
              <div
                key={channel.id}
                id={`channel-card-${channel.id}`}
                onClick={() => onSelectChannel(channel)}
                className={`group relative flex flex-col justify-between p-4 bg-neutral-900/60 hover:bg-neutral-900 border rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-amber-500 bg-neutral-900 ring-2 ring-amber-500/15 scale-[1.01] shadow-xl'
                    : 'border-neutral-800/80 hover:border-neutral-700 hover:-translate-y-0.5 shadow-md'
                }`}
              >
                {/* Card Header Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* Channel Logo */}
                    <div className={`w-11 h-11 shrink-0 flex items-center justify-center font-black rounded-xl text-sm shadow-md tracking-wider text-white ${channel.logoBg}`}>
                      {channel.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1 text-sm">
                        {channel.name}
                      </h4>
                      <p className="text-[10px] text-neutral-500 tracking-wide font-mono mt-0.5">
                        {channel.category}
                      </p>
                    </div>
                  </div>

                  {/* Favorite / Control buttons inside Card */}
                  <div className="flex items-center gap-1.5 onClickPrevent" onClick={(e) => e.stopPropagation()}>
                    <button
                      id={`btn-fav-channel-${channel.id}`}
                      onClick={() => onToggleFavorite(channel.id)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-400 hover:bg-neutral-800 transition-all cursor-pointer"
                      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    {channel.isCustom && (
                      <button
                        id={`btn-del-custom-channel-${channel.id}`}
                        onClick={() => onDeleteCustomChannel(channel.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                        title="Excluir canal personalizado"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Live Schedule Snippet */}
                <div className="mt-4 pt-3 border-t border-neutral-800/50 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-neutral-500">No Ar Agora</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-300 line-clamp-1">
                    {channel.currentShow}
                  </p>
                  <p className="text-[10px] text-neutral-500 line-clamp-1">
                    A Seguir: {channel.nextShow}
                  </p>
                </div>

                {/* Active Overlay Line */}
                {isSelected && (
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
