"use client";

interface LearningCardProps {
  number: string;
  title: string;
  description: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function LearningCard({ number, title, description, bgColor, textColor }: LearningCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
      <span className={`${bgColor} ${textColor} text-xs font-bold px-2 py-1 rounded shrink-0`}>{number}</span>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export function Summary() {
  return (
    <section className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-lg">
      <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
        🧠 What You Learned
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <LearningCard
          number="1"
          title="Class Decorators"
          bgColor="bg-purple-100 dark:bg-purple-900/30"
          textColor="text-purple-700 dark:text-purple-400"
          description={
            <>
              <strong className="text-slate-900 dark:text-white">Class Decorators</strong> — Sticker on the whole class. <code className="text-purple-600">@Controller</code>, <code className="text-purple-600">@Injectable</code>, <code className="text-purple-600">@Module</code>
            </>
          }
        />
        <LearningCard
          number="2"
          title="Method Decorators"
          bgColor="bg-blue-100 dark:bg-blue-900/30"
          textColor="text-blue-700 dark:text-blue-400"
          description={
            <>
              <strong className="text-slate-900 dark:text-white">Method Decorators</strong> — Sticker on a method. <code className="text-blue-600">@Get</code>, <code className="text-blue-600">@Post</code>, <code className="text-blue-600">@UseGuards</code>
            </>
          }
        />
        <LearningCard
          number="3"
          title="Parameter Decorators"
          bgColor="bg-rose-100 dark:bg-rose-900/30"
          textColor="text-rose-700 dark:text-rose-400"
          description={
            <>
              <strong className="text-slate-900 dark:text-white">Parameter Decorators</strong> — Sticker on a function parameter. <code className="text-rose-600">@Body</code>, <code className="text-rose-600">@Param</code>, <code className="text-rose-600">@Query</code>
            </>
          }
        />
        <LearningCard
          number="4"
          title="Property Decorators"
          bgColor="bg-emerald-100 dark:bg-emerald-900/30"
          textColor="text-emerald-700 dark:text-emerald-400"
          description={
            <>
              <strong className="text-slate-900 dark:text-white">Property Decorators</strong> — Sticker on a property. <code className="text-emerald-600">@Column</code>, <code className="text-emerald-600">@IsEmail</code>, <code className="text-emerald-600">@IsNotEmpty</code>
            </>
          }
        />
        <LearningCard
          number="!"
          title="Decorators = Metadata"
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          textColor="text-amber-700 dark:text-amber-400"
          description={
            <>
              <strong className="text-slate-900 dark:text-white">Decorators = Metadata</strong> — They don&apos;t change your code. They label it so the framework knows how to wire it together.
            </>
          }
        />
        <LearningCard
          number="⚡"
          title="Factory vs Plain"
          bgColor="bg-sky-100 dark:bg-sky-900/30"
          textColor="text-sky-700 dark:text-sky-400"
          description={
            <>
              <strong className="text-slate-900 dark:text-white">Factory vs Plain</strong> — <code>@Logger</code> = plain decorator. <code>@Controller(&apos;users&apos;)</code> = factory that returns a decorator.
            </>
          }
        />
      </div>
    </section>
  );
}
