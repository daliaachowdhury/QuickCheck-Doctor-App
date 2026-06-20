import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';

interface SectionPageProps {
  title: string;
  active: string;
}

export default function SectionPage({ title, active }: SectionPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 pt-4 transition-colors duration-250">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <section className="rounded-[28px] border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:shadow-none lg:p-6 transition-all duration-250">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                QuickCheck
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </h1>
            </div>
            <div className="self-start sm:self-auto">
              <ThemeToggle />
            </div>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            This section is ready for future Supabase data and stays empty until real records are connected.
          </p>

          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 text-sm text-slate-500 dark:text-slate-400">
            No data connected yet.
          </div>
        </section>
      </div>

      <BottomNav active={active} />
    </main>
  );
}
