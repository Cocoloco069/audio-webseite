import { TFunc } from '../i18n/translations';

export default function Footer({ t }: { t: TFunc }) {
  return (
    <footer className="relative z-10 px-4 sm:px-8 pb-5 sm:pb-6 pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-900/80 bg-slate-950/80 backdrop-blur-sm">
      <span>© {new Date().getFullYear()} Audio Silence Remover</span>
      <div className="space-x-4">
        <a
          href="/impressum"
          className="hover:text-slate-300 transition-colors"
        >
          {t('footerImprint')}
        </a>
        <a
          href="/datenschutz"
          className="hover:text-slate-300 transition-colors"
        >
          {t('footerPrivacy')}
        </a>
      </div>
    </footer>
  );
}
