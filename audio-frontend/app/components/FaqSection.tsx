// app/components/FaqSection.tsx
import { TFunc } from '../i18n/translations';

export default function FaqSection({ t }: { t: TFunc }) {
  return (
    <section className="mt-4 sm:mt-6 border-t border-slate-800/80 pt-4 sm:pt-6 space-y-4">
      <h2 className="text-sm sm:text-base font-semibold text-slate-100">
        {t('faqTitle')}
      </h2>

      <div className="space-y-3 text-xs sm:text-sm text-slate-300">
        <div>
          <p className="font-medium text-slate-100">{t('faqQ1')}</p>
          <p>{t('faqA1')}</p>
        </div>

        <div>
          <p className="font-medium text-slate-100">{t('faqQ2')}</p>
          <p>{t('faqA2')}</p>
        </div>

        <div>
          <p className="font-medium text-slate-100">{t('faqQ3')}</p>
          <p>{t('faqA3')}</p>
        </div>

        <div>
          <p className="font-medium text-slate-100">{t('faqQ4')}</p>
          <p>{t('faqA4')}</p>
        </div>
      </div>
    </section>
  );
}
