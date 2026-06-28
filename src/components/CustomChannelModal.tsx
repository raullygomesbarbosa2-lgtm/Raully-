import React, { useState } from 'react';
import { X, Tv, Info, Link2, PlusCircle, CheckCircle } from 'lucide-react';
import { Channel, Category } from '../types';

interface CustomChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChannel: (channel: Channel) => void;
}

export default function CustomChannelModal({ isOpen, onClose, onAddChannel }: CustomChannelModalProps) {
  const [name, setName] = useState('');
  const [logoInitials, setLogoInitials] = useState('');
  const [category, setCategory] = useState<Category>('Geral');
  const [streamType, setStreamType] = useState<'hls' | 'youtube'>('hls');
  const [streamUrl, setStreamUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSetExample = (type: 'hls' | 'youtube') => {
    if (type === 'hls') {
      setStreamUrl('https://senado-hls.b-cdn.net/tvsenado/index.m3u8');
      setName('TV Senado');
      setLogoInitials('SEN');
      setCategory('Cultura & Educativos');
      setDescription('Exemplo de canal público brasileiro transmitindo pautas do senado federal brasileiro.');
    } else {
      setStreamUrl('https://www.youtube.com/embed/live_stream?channel=UC4gS0g7st_A6T6zZ8-50eSg');
      setName('CNN Brasil Live');
      setLogoInitials('CNN');
      setCategory('Notícias');
      setDescription('Canal de notícias CNN Brasil transmitido gratuitamente via YouTube Live.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('O nome do canal é obrigatório.');
      return;
    }
    if (!logoInitials.trim() || logoInitials.length > 4) {
      setError('A sigla do logo é obrigatória (máximo 4 letras).');
      return;
    }
    if (!streamUrl.trim()) {
      setError('A URL de transmissão é obrigatória.');
      return;
    }

    // Basic URL format validation
    if (streamType === 'hls' && !streamUrl.includes('.m3u8') && !streamUrl.includes('playlist')) {
      setError('Atenção: Transmissões HLS geralmente requerem links terminando em .m3u8.');
      return;
    }

    if (streamType === 'youtube' && !streamUrl.includes('youtube.com') && !streamUrl.includes('youtu.be')) {
      setError('O link de YouTube deve conter um canal ou vídeo válido.');
      return;
    }

    const colorBgs = [
      'bg-indigo-600',
      'bg-emerald-600',
      'bg-red-600',
      'bg-blue-600',
      'bg-amber-600',
      'bg-purple-600',
      'bg-pink-600',
      'bg-teal-600',
    ];

    const randomBg = colorBgs[Math.floor(Math.random() * colorBgs.length)];

    const newChannel: Channel = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      logo: logoInitials.trim().toUpperCase(),
      logoBg: randomBg,
      category,
      streamUrl: streamUrl.trim(),
      type: streamType,
      description: description.trim() || 'Canal de TV personalizado adicionado pelo usuário.',
      currentShow: 'Programação Customizada',
      nextShow: 'Espaço Aberto',
      isCustom: true,
    };

    onAddChannel(newChannel);
    setSuccess(true);
    
    setTimeout(() => {
      // reset and close after short success animation
      setSuccess(false);
      setName('');
      setLogoInitials('');
      setStreamUrl('');
      setDescription('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-scale-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Tv className="w-5 h-5 text-amber-500" />
            <h3 className="text-white font-bold text-lg">Sintonizar Canal Personalizado</h3>
          </div>
          <button
            id="btn-close-custom-channel-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
            <h4 className="text-white font-bold text-lg">Canal Sintonizado com Sucesso!</h4>
            <p className="text-neutral-400 text-sm mt-1">
              O novo canal foi inserido na categoria "{category}". Sintonizando sinal...
            </p>
          </div>
        ) : (
          <form id="add-custom-channel-form" onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            
            {/* Quick Presets */}
            <div className="bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 block mb-2 uppercase tracking-wider">Sugestões de Teste Rápidas</span>
              <div className="flex flex-wrap gap-2">
                <button
                  id="btn-preset-hls"
                  type="button"
                  onClick={() => handleSetExample('hls')}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-[11px] font-bold text-amber-500 rounded-lg border border-neutral-800 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Link2 className="w-3 h-3" />
                  Preencher HLS (.m3u8)
                </button>
                <button
                  id="btn-preset-youtube"
                  type="button"
                  onClick={() => handleSetExample('youtube')}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-[11px] font-bold text-red-500 rounded-lg border border-neutral-800 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3 h-3" />
                  Preencher YouTube Live
                </button>
              </div>
            </div>

            {/* General input fields grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-400">Nome do Canal</label>
                <input
                  id="input-channel-name"
                  type="text"
                  placeholder="Ex: Globo Rio, Rede Cultura"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="col-span-1 flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-400" title="Sigla do logo">Sigla Logo</label>
                <input
                  id="input-channel-logo"
                  type="text"
                  placeholder="Ex: GLB"
                  maxLength={4}
                  value={logoInitials}
                  onChange={(e) => setLogoInitials(e.target.value.substring(0, 4))}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-center uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-400">Gênero / Categoria</label>
                <select
                  id="select-channel-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="Geral">Geral</option>
                  <option value="Notícias">Notícias</option>
                  <option value="Cultura & Educativos">Cultura & Educativos</option>
                  <option value="Esportes">Esportes</option>
                  <option value="Entretenimento">Entretenimento</option>
                  <option value="Filmes & Séries">Filmes & Séries</option>
                  <option value="Desenhos & Kids">Desenhos & Kids</option>
                  <option value="Religioso">Religioso</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-400">Tipo de Transmissão</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    id="btn-select-type-hls"
                    type="button"
                    onClick={() => setStreamType('hls')}
                    className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      streamType === 'hls'
                        ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-sm shadow-amber-500/10'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    HLS (.m3u8)
                  </button>
                  <button
                    id="btn-select-type-youtube"
                    type="button"
                    onClick={() => setStreamType('youtube')}
                    className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      streamType === 'youtube'
                        ? 'bg-red-600 text-white font-extrabold shadow-sm shadow-red-600/10'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    YouTube Live
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-400">URL da Transmissão (Link de sinal direto)</label>
              <input
                id="input-channel-url"
                type="text"
                placeholder={streamType === 'hls' ? 'Ex: https://dominio.com/fluxo.m3u8' : 'Ex: https://www.youtube.com/embed/live_stream?channel=ID'}
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-400">Descrição do Canal (Opcional)</label>
              <textarea
                id="input-channel-desc"
                placeholder="Insira detalhes sobre a programação..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Error alerts */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Info Hint */}
            <div className="p-3 bg-neutral-950/80 rounded-xl text-[10px] text-neutral-500 leading-relaxed border border-neutral-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-500/60 shrink-0 mt-0.5" />
              <span>
                <strong>Nota sobre segurança:</strong> Os navegadores restringem o carregamento de URLs não-seguras (HTTP) caso o aplicativo esteja rodando em HTTPS. Dê preferência a links seguros com "https://".
              </span>
            </div>

            {/* Form Footer */}
            <div className="mt-2 flex gap-3">
              <button
                id="btn-cancel-custom-channel"
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl cursor-pointer transition-all"
              >
                Cancelar
              </button>
              <button
                id="btn-submit-custom-channel"
                type="submit"
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black rounded-xl cursor-pointer transition-all active:scale-95 shadow-lg shadow-amber-500/10"
              >
                Sintonizar Canal
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
