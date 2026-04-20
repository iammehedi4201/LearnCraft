import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Enhanced CodeBlock component specifically designed for pedagogy.
 * Separates code, inline comments, and provides a distinguishable layout.
 */
export const EnhancedCodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  // Split code into lines and process comments
  const lines = code.split('\n');

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-2 uppercase tracking-wider">
            {language}
          </span>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-0 overflow-x-auto selection:bg-blue-100 dark:selection:bg-blue-900/40">
        <table className="w-full border-collapse table-fixed min-w-full">
          <tbody>
            {lines.map((line, idx) => {
              const trimmedLine = line.trim();
              const isComment = trimmedLine.startsWith('//');
              const hasInlineComment = line.includes('//') && !isComment;
              
              // Highlight specific keywords for better pedagogy
              const isDecorator = trimmedLine.startsWith('@');
              const isInterface = trimmedLine.startsWith('interface ');
              const isClass = trimmedLine.startsWith('export class ') || trimmedLine.startsWith('class ');

              let codePart = line;
              let commentPart = '';
              
              if (hasInlineComment) {
                const commentIndex = line.indexOf('//');
                codePart = line.substring(0, commentIndex);
                commentPart = line.substring(commentIndex);
              }

              return (
                <tr key={idx} className="group hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                  {/* Line Number */}
                  <td className="w-12 px-2 py-0.5 text-right text-[10px] text-slate-300 dark:text-slate-700 select-none border-r border-slate-100 dark:border-slate-800/50 font-mono align-top pt-1.5">
                    {idx + 1}
                  </td>
                  {/* Code Line */}
                  <td className="px-4 py-1 font-mono text-[13px] leading-6 whitespace-pre">
                    <div className="flex flex-wrap items-baseline">
                      {isComment ? (
                        <span className="text-slate-400 dark:text-slate-500 italic font-sans decoration-slate-300 dark:decoration-slate-700 underline-offset-4 decoration-dotted">
                          {line}
                        </span>
                      ) : (
                        <>
                          <span className={`
                            ${isDecorator ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}
                            ${isInterface || isClass ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}
                            ${!isDecorator && !isInterface && !isClass ? 'text-slate-700 dark:text-slate-300' : ''}
                          `}>
                            {codePart}
                          </span>
                          {commentPart && (
                            <span className="text-emerald-600/70 dark:text-emerald-500/60 italic ml-4 font-sans text-xs tracking-tight bg-emerald-50/50 dark:bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-500/10 opacity-70 group-hover:opacity-100 transition-all duration-300">
                              {commentPart}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface ExplainerSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'info' | 'warning' | 'danger' | 'success';
}

export const ExplainerSection: React.FC<ExplainerSectionProps> = ({ 
  title, 
  children, 
  icon, 
  variant = 'info' 
}) => {
  const settings = {
    info: {
      container: "bg-blue-50/40 dark:bg-blue-500/5 border-blue-200/50 dark:border-blue-500/20 text-blue-900 dark:text-blue-100",
      accent: "bg-blue-500",
      icon: "text-blue-600 dark:text-blue-400"
    },
    warning: {
      container: "bg-amber-50/40 dark:bg-amber-500/5 border-amber-200/50 dark:border-amber-500/20 text-amber-900 dark:text-amber-100",
      accent: "bg-amber-500",
      icon: "text-amber-600 dark:text-amber-400"
    },
    danger: {
      container: "bg-red-50/40 dark:bg-red-500/5 border-red-200/50 dark:border-red-500/20 text-red-900 dark:text-red-100",
      accent: "bg-red-500",
      icon: "text-red-600 dark:text-red-400"
    },
    success: {
      container: "bg-emerald-50/40 dark:bg-emerald-500/5 border-emerald-200/50 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-100",
      accent: "bg-emerald-500",
      icon: "text-emerald-600 dark:text-emerald-400"
    }
  };

  return (
    <div className={`my-8 p-0 rounded-2xl border ${settings[variant].container} overflow-hidden shadow-sm flex`}>
      {/* Visual Accent Strip */}
      <div className={`w-1.5 shrink-0 ${settings[variant].accent} opacity-60`} />
      
      <div className="p-5 flex gap-5 w-full">
        {icon && (
          <div className={`mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center ${settings[variant].icon}`}>
            {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
          </div>
        )}
        <div className="space-y-1.5 flex-grow">
          <h4 className="font-black text-[11px] uppercase tracking-[0.1em] opacity-60">{title}</h4>
          <div className="text-[14px] leading-relaxed font-medium">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
