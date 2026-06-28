import { useEffect, useState } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { Channel, Program } from '../types';
import { generateScheduleForChannel } from '../data/channels';

interface ProgrammingGuideProps {
  selectedChannel: Channel;
}

export default function ProgrammingGuide({ selectedChannel }: ProgrammingGuideProps) {
  const [schedule, setSchedule] = useState<Program[]>([]);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  // Load and refresh guide
  useEffect(() => {
    const updateGuide = () => {
      const programs = generateScheduleForChannel(selectedChannel.id);
      setSchedule(programs);

      // Simple current time string
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

      // Calculate progress of current show (all shows are 2-hour blocks starting on even hours)
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const slotStartHour = currentHour % 2 === 0 ? currentHour : currentHour - 1;
      const elapsedMinutes = (currentHour - slotStartHour) * 60 + currentMinutes;
      const percent = Math.min(100, Math.max(0, (elapsedMinutes / 120) * 100));
      setProgressPercent(percent);
    };

    updateGuide();
    const timer = setInterval(updateGuide, 60000); // refresh every minute

    return () => clearInterval(timer);
  }, [selectedChannel]);

  // Map program categories to custom styled colors
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Jornalismo':
      case 'Análise':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Debate':
      case 'Entrevista':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Filme':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Documentário':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Infantil':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  // Check if program is currently airing
  const isCurrentProgram = (progTime: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const slotStartHour = currentHour % 2 === 0 ? currentHour : currentHour - 1;
    const timeHour = parseInt(progTime.split(':')[0], 10);
    return timeHour === slotStartHour;
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-neutral-900/40 border border-neutral-800 rounded-2xl w-full">
      {/* Guide Header */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h3 className="text-white font-bold text-base">Grade de Programação</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-400">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Hora Local: <strong className="text-neutral-100">{currentTimeStr}</strong></span>
        </div>
      </div>

      {/* Guide Timeline Grid */}
      <div className="flex flex-col gap-3">
        {schedule.map((program) => {
          const isAiring = isCurrentProgram(program.time);

          return (
            <div
              key={program.id}
              id={`prog-item-${program.id}`}
              className={`relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                isAiring
                  ? 'bg-amber-500/5 border-amber-500/40 ring-1 ring-amber-500/10'
                  : 'bg-neutral-900/30 border-neutral-800/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Time Indicator */}
                <div className="flex flex-col items-center shrink-0 justify-center">
                  <span className="text-sm font-bold font-mono text-neutral-200">
                    {program.time}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    {program.duration} min
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className={`w-[2px] self-stretch rounded-full ${isAiring ? 'bg-amber-500' : 'bg-neutral-800'}`}></div>

                {/* Show details */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`font-bold text-sm ${isAiring ? 'text-amber-400' : 'text-neutral-200'}`}>
                      {program.title}
                    </h4>
                    {isAiring && (
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-md animate-pulse">
                        No Ar
                      </span>
                    )}
                    <span className={`text-[9px] px-2 py-0.5 rounded-md border font-medium ${getCategoryBadgeClass(program.category)}`}>
                      {program.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 md:line-clamp-1">
                    {program.description}
                  </p>

                  {/* Progress tracker inside the airing item */}
                  {isAiring && (
                    <div className="mt-3 w-full max-w-md">
                      <div className="flex justify-between text-[10px] text-neutral-500 font-medium mb-1.5">
                        <span>Progresso do programa</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra visual hint */}
              {isAiring && (
                <div className="hidden md:flex items-center gap-1.5 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg font-semibold animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sintonizado
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
