import { TFunc } from '../../i18n/translations';

export default function SoonContent({
  t,
  onBack,
}: {
  t: TFunc;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4 sm:space-y-5 text-center max-w-2xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          {t('soonTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">{t('soonBody')}</p>
      </header>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-100 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>{t('tabSilence')}</span>
        </button>
      </div>
    </div>
  );
}
