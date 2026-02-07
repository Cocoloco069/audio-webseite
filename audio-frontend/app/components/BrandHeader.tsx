// app/components/BrandHeader.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lang, TFunc } from '../i18n/translations';

export default function BrandHeader({
  lang,
  setLang,
  t,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TFunc;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-10 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Zeile 1: Brand + Language (Desktop rechts) */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-100">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[13px] shadow-md shadow-indigo-700/60">
              🎧
            </span>
            <span className="tracking-tight">Audio Tools</span>
          </div>

          {/* Desktop: Language rechts, Mobil: versteckt (kommt unten zentriert) */}
          <div className="hidden sm:flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 shadow-sm shadow-slate-900/60">
              <span>Language</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                className="bg-transparent text-slate-100 text-[11px] border border-slate-700 rounded-full px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

        {/* Zeile 2: Navigation */}
        {/* Desktop: horizontale Buttons */}
        <nav className="hidden sm:block">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <NavLink href="/" label={t('navHome')} />
            <NavLink href="/#tools" label={t('navTools')} />
            <NavLink href="/impressum" label={t('footerImprint')} />
            <NavLink href="/datenschutz" label={t('footerPrivacy')} />
            <NavLink href="/kontakt" label={t('navContact')} />
          </div>
        </nav>

        {/* Mobil: „Menü“-Button + Dropdown */}
        <div className="sm:hidden">
          <button
  type="button"
  onClick={() => setMobileOpen((v) => !v)}
  className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-[12px] font-medium text-slate-100 hover:bg-slate-800 transition-colors"
>
  <span>Menü</span>
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
    <span className="flex flex-col gap-[3px]">
      <span className="block h-[2px] w-4 rounded-full bg-slate-100" />
      <span className="block h-[2px] w-4 rounded-full bg-slate-100" />
      <span className="block h-[2px] w-4 rounded-full bg-slate-100" />
    </span>
  </span>
</button>


          {mobileOpen && (
            <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/95 shadow-xl shadow-slate-950/60 py-2 text-[12px] text-slate-100">
              <MobileItem href="/" onClick={() => setMobileOpen(false)}>
                {t('navHome')}
              </MobileItem>
              <MobileItem
                href="/#tools"
                onClick={() => setMobileOpen(false)}
              >
                {t('navTools')}
              </MobileItem>
              <MobileItem
                href="/impressum"
                onClick={() => setMobileOpen(false)}
              >
                {t('footerImprint')}
              </MobileItem>
              <MobileItem
                href="/datenschutz"
                onClick={() => setMobileOpen(false)}
              >
                {t('footerPrivacy')}
              </MobileItem>
              <MobileItem
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
              >
                {t('navContact')}
              </MobileItem>
            </div>
          )}
        </div>

        {/* Zeile 3: Language mobil – zentriert */}
        <div className="flex justify-center sm:hidden">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 shadow-sm shadow-slate-900/60">
            <span>Language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-transparent text-slate-100 text-[11px] border border-slate-700 rounded-full px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 hover:bg-slate-800/80 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
