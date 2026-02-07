import { Tool } from '../types/ui';
import { TFunc } from '../i18n/translations';

export default function ToolTabs({
  activeTool,
  setActiveTool,
  t,
}: {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  t: TFunc;
}) {
  return (
    <div className="flex justify-center mb-3 sm:mb-4">
      <div className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-800/80 p-1 text-[11px] sm:text-xs">
        <button
          type="button"
          onClick={() => setActiveTool('silence')}
          className={
            'px-3 sm:px-4 py-1 rounded-full font-medium transition-colors ' +
            (activeTool === 'silence'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/60'
              : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/80')
          }
        >
          {t('tabSilence')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTool('soon')}
          className={
            'px-3 sm:px-4 py-1 rounded-full font-medium transition-colors ' +
            (activeTool === 'soon'
              ? 'bg-slate-800 text-slate-50 shadow-sm shadow-slate-900/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80')
          }
        >
          {t('tabSoon')}
        </button>
      </div>
    </div>
  );
}
