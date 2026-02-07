import { Lang } from '../i18n/translations';

export default function BrandHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <header className="relative z-10 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="flex w-full items-center gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[13px] shadow-md shadow-indigo-700/60">
            🎧
          </span>
          <span className="tracking-tight">Audio Tools</span>
        </div>
        <div className="flex-1 flex justify-center sm:justify-end">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800/80 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-300 shadow-sm shadow-slate-900/60">
            <span>Language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-transparent text-slate-100 text-[10px] sm:text-[11px] border border-slate-700 rounded-full px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
