import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize2, RefreshCw, Signal, AlertCircle, Tv, Zap, Globe } from 'lucide-react';
import { Channel } from '../types';

interface VideoPlayerProps {
  key?: string | number;
  channel: Channel;
  isCinemaMode: boolean;
  setIsCinemaMode: (val: boolean) => void;
  onRefreshChannel: () => void;
}

export default function VideoPlayer({ channel, isCinemaMode, setIsCinemaMode, onRefreshChannel }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signalStrength, setSignalStrength] = useState<'Excelente' | 'Bom' | 'Fraco'>('Excelente');
  const [streamSpeed, setStreamSpeed] = useState('0.0 Mbps');
  const [useBackup, setUseBackup] = useState(false);
  const [streamMode, setStreamMode] = useState<'direct' | 'proxied'>('direct');

  // Clear states when channel changes
  useEffect(() => {
    setIsPlaying(true);
    setHasError(false);
    setErrorMessage('');
    setIsBuffering(true);
    setUseBackup(false);
    setStreamMode('direct');
    
    // Simulate signal telemetry
    const strengths: ('Excelente' | 'Bom' | 'Fraco')[] = ['Excelente', 'Bom'];
    setSignalStrength(strengths[Math.floor(Math.random() * strengths.length)]);
    setStreamSpeed(`${(Math.random() * 5 + 3).toFixed(1)} Mbps`);
  }, [channel]);

  const currentStreamUrl = useBackup && channel.backupUrl ? channel.backupUrl : channel.streamUrl;
  const activeStreamUrl = currentStreamUrl 
    ? (currentStreamUrl.startsWith('/') || currentStreamUrl.startsWith('blob:') 
        ? currentStreamUrl 
        : (streamMode === 'proxied'
            ? `/api/proxy?url=${encodeURIComponent(currentStreamUrl)}`
            : currentStreamUrl))
    : '';

  // HLS stream loading logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cleanup previous hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    setIsBuffering(true);
    setHasError(false);

    // Quick timeout (4s) to support fast fallback and responsive channel changes
    const timeoutDuration = 4000;

    const handlePlaybackFailure = (reason: string) => {
      clearTimeout(timeoutId);
      console.log(`[Playback Failure] Reason: ${reason}. Current state: Mode=${streamMode}, Backup=${useBackup}`);

      if (streamMode === 'direct' && !useBackup) {
        if (channel.backupUrl) {
          console.log('[Fallback Stage 1 -> 2] Direct Main failed. Trying Direct Backup...');
          setUseBackup(true);
        } else {
          console.log('[Fallback Stage 1 -> 3] Direct Main failed (No Backup). Trying Proxied Main...');
          setStreamMode('proxied');
        }
      } else if (streamMode === 'direct' && useBackup) {
        console.log('[Fallback Stage 2 -> 3] Direct Backup failed. Trying Proxied Main...');
        setUseBackup(false);
        setStreamMode('proxied');
      } else if (streamMode === 'proxied' && !useBackup) {
        if (channel.backupUrl) {
          console.log('[Fallback Stage 3 -> 4] Proxied Main failed. Trying Proxied Backup...');
          setUseBackup(true);
        } else {
          console.log('[Fallback Stage 3 -> Error] Proxied Main failed (No Backup). Giving up.');
          setHasError(true);
          setErrorMessage('Não foi possível conectar ao sinal deste canal. O servidor de transmissão ou proxy de backup estão indisponíveis.');
          setIsBuffering(false);
          if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
          }
        }
      } else {
        // streamMode === 'proxied' && useBackup
        console.log('[Fallback Stage 4 -> Error] All signal pathways failed. Giving up.');
        setHasError(true);
        setErrorMessage('Todos os canais de transmissão e servidores de proxy falharam. Por favor, tente novamente mais tarde ou verifique sua conexão.');
        setIsBuffering(false);
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      }
    };

    const timeoutId = setTimeout(() => {
      handlePlaybackFailure('Timeout (15s exceeded)');
    }, timeoutDuration);

    const handleLoadedMetadata = () => {
      clearTimeout(timeoutId);
      setIsBuffering(false);
      if (isPlaying) {
        video.play().catch(() => setIsPlaying(false));
      }
    };

    const handleVideoError = () => {
      handlePlaybackFailure('HTML5 Video Element Error');
    };

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(activeStreamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        clearTimeout(timeoutId);
        setIsBuffering(false);
        if (isPlaying) {
          video.play().catch(() => setIsPlaying(false));
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('HLS Network Error: attempting recovery or fallback...');
              if (data.details === 'manifestLoadError' || data.details === 'levelLoadError') {
                handlePlaybackFailure(`HLS Network Fatal (${data.details})`);
              } else {
                hls.startLoad();
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('HLS Media Error: attempting recovery...');
              hls.recoverMediaError();
              break;
            default:
              handlePlaybackFailure(`HLS Fatal (${data.type})`);
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari native playback
      video.src = activeStreamUrl;
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleVideoError);
    } else {
      handlePlaybackFailure('Browser does not support HLS playback');
    }

    return () => {
      clearTimeout(timeoutId);
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleVideoError);
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeStreamUrl, useBackup]);

  // Adjust volume
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleFullscreen = () => {
    const element = containerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Erro ao ativar tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsBuffering(true);
    setUseBackup(false);
    onRefreshChannel();
  };

  return (
    <div className="w-full flex flex-col">
      {/* Manual Signal Source and Connection Mode Switcher (Fora da tela para não atrapalhar) */}
      {!hasError && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 p-3 bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-neutral-800 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Configuração de Conexão:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Signal switcher if backup URL is available */}
            {channel.backupUrl && (
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                <button
                  id="btn-source-primary"
                  onClick={() => {
                    setUseBackup(false);
                    setHasError(false);
                    setIsBuffering(true);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    !useBackup
                      ? 'bg-amber-500 text-neutral-950 shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  Sinal Principal (IPTV)
                </button>
                <button
                  id="btn-source-backup"
                  onClick={() => {
                    setUseBackup(true);
                    setHasError(false);
                    setIsBuffering(true);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    useBackup
                      ? 'bg-amber-500 text-neutral-950 shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  Sinal Alternativo (IPTV)
                </button>
              </div>
            )}

            {/* Connection Mode Switcher (Direct vs Proxy) */}
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                id="btn-mode-direct"
                onClick={() => {
                  setStreamMode('direct');
                  setHasError(false);
                  setIsBuffering(true);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  streamMode === 'direct'
                    ? 'bg-amber-500 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Conexão direta ultra rápida do seu navegador (Recomendado)"
              >
                <Zap className="w-3.5 h-3.5" />
                Conexão Direta
              </button>
              <button
                id="btn-mode-proxied"
                onClick={() => {
                  setStreamMode('proxied');
                  setHasError(false);
                  setIsBuffering(true);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  streamMode === 'proxied'
                    ? 'bg-amber-500 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Conexão pelo servidor de proxy para burlar restrições"
              >
                <Globe className="w-3.5 h-3.5" />
                Proxy
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        id="video-player-container"
        ref={containerRef}
        className={`relative w-full aspect-video bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 transition-all duration-300 ${
          isCinemaMode ? 'ring-4 ring-amber-500/20 shadow-amber-500/5' : ''
        }`}
      >
        {/* Loading Indicator */}
        {isBuffering && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/90 backdrop-blur-xs z-20">
            <div className="relative w-16 h-16 flex items-center justify-center mb-4">
              <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <Tv className="w-6 h-6 text-amber-500 animate-pulse" />
            </div>
            <p className="text-amber-500 font-medium tracking-wide text-sm animate-pulse">
              CONECTANDO AO SINAL...
            </p>
            <p className="text-neutral-400 text-xs mt-1">Carregando transmissão ao vivo</p>
          </div>
        )}

        {/* Error Handling */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 px-6 text-center z-20">
            <AlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
            <h3 className="text-white text-lg font-bold">Falha na Sintonização</h3>
            <p className="text-neutral-400 text-sm max-w-md mt-2">
              {errorMessage || 'O link de transmissão ao vivo deste canal pode estar instável ou temporariamente indisponível. Verifique se sua internet (Wi-Fi ou dados móveis) está conectada.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                id="btn-retry-stream"
                onClick={handleRetry}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente (Direto)
              </button>
              
              {streamMode === 'direct' && (
                <button
                  id="btn-switch-to-proxy"
                  onClick={() => {
                    setStreamMode('proxied');
                    setHasError(false);
                    setIsBuffering(true);
                  }}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-neutral-900/40"
                >
                  <Globe className="w-4 h-4" />
                  Tentar via Servidor Proxy
                </button>
              )}

              {streamMode === 'proxied' && (
                <button
                  id="btn-switch-to-direct"
                  onClick={() => {
                    setStreamMode('direct');
                    setHasError(false);
                    setIsBuffering(true);
                  }}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-neutral-900/40"
                >
                  <Zap className="w-4 h-4" />
                  Tentar Conexão Direta
                </button>
              )}

              {channel.backupUrl && !useBackup && (
                <button
                  id="btn-switch-to-backup-err"
                  onClick={() => {
                    setUseBackup(true);
                    setHasError(false);
                    setIsBuffering(true);
                  }}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-neutral-900/40"
                >
                  <Tv className="w-4 h-4" />
                  Sinal Alternativo (IPTV)
                </button>
              )}
              {channel.isCustom && (
                <p className="text-neutral-500 text-xs w-full mt-2">
                  Dica: Verifique se o link .m3u8 inserido é válido e ativo.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Player Core Viewport */}
        <div className="w-full h-full relative group">
          <video
            id="hls-video-element"
            ref={videoRef}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
            playsInline
            autoPlay
          />

          {/* Simulated TV Channel Watermark in Top Right */}
          <div className="absolute top-6 right-6 select-none opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none flex items-center gap-2">
            <div className={`px-2.5 py-1 ${channel.logoBg} text-white font-extrabold text-xs tracking-widest rounded shadow-md`}>
              {channel.logo}
            </div>
            <span className="text-white text-xs font-mono tracking-widest uppercase">HD 1080p</span>
          </div>

          {/* Custom Interface Overlay (visible on hover) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
            
            {/* Telemetry info */}
            <div className="flex justify-between items-start w-full">
              <div className="bg-neutral-900/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Signal className="w-3.5 h-3.5" />
                  Sinal {signalStrength}
                </span>
                <span className="text-neutral-500">|</span>
                <span>{streamSpeed}</span>
              </div>

              <div className="bg-neutral-900/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-neutral-800 text-xs text-neutral-200 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>AO VIVO</span>
              </div>
            </div>

            {/* Controls Toolbar */}
            <div className="flex flex-col gap-3 w-full">
              {/* Progress bar (simulated live track) */}
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 bottom-0 bg-amber-500 w-[92%] animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between w-full text-white">
                <div className="flex items-center gap-4">
                  {/* Play / Pause */}
                  <button
                    id="btn-play-pause"
                    onClick={togglePlay}
                    className="p-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  {/* Mute & Volume slider */}
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-toggle-mute"
                      onClick={toggleMute}
                      className="p-1.5 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      id="input-volume-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-amber-500 h-1 rounded-lg cursor-pointer bg-neutral-700"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Cinema Mode Button */}
                  <button
                    id="btn-toggle-cinema-mode"
                    onClick={() => setIsCinemaMode(!isCinemaMode)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      isCinemaMode
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    Modo Cinema
                  </button>

                  {/* Fullscreen */}
                  <button
                    id="btn-toggle-fullscreen"
                    onClick={toggleFullscreen}
                    className="p-1.5 text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Under Player Metadata */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-neutral-900/60 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-lg font-black tracking-wide ${channel.logoBg} text-white shadow-lg`}>
            {channel.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-lg">{channel.name}</h2>
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold bg-neutral-800 border border-neutral-700 text-amber-400 px-2 py-0.5 rounded">
                {channel.category}
              </span>
            </div>
            <p className="text-neutral-400 text-xs mt-1 leading-relaxed max-w-2xl">
              {channel.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 justify-center">
          <span className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase">No ar agora</span>
          <span className="text-amber-500 font-bold text-sm tracking-tight">{channel.currentShow}</span>
          <span className="text-neutral-400 text-[11px] mt-0.5">A seguir: {channel.nextShow}</span>
        </div>
      </div>
    </div>
  );
}
