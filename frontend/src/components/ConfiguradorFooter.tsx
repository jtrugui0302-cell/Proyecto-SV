import React from 'react';

/**
 * Componente: ConfiguradorFooter
 * Responsabilidad: Mostrar información legal, copyright y redes sociales.
 */
export function ConfiguradorFooter() {
  return (
    <footer className="w-full bg-white-900 text-white border-t-4 border-[#00aec7]">
      <div className="px-4 md:px-8 xl:px-12 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* 1. Copyright */}
        <div className="text-xs text-slate-400">
          © Santiago Vargas {new Date().getFullYear()}
        </div>

        {/* 2. Redes Sociales */}
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider hidden sm:block text-black">
            Síguenos:
          </p>

          <div className="flex items-center gap-2">
            {/* Facebook */}
            <a href="https://www.facebook.com/josesantiagovargassa/" aria-label="Facebook" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 text-white-400 bg-[#0180ff] hover:opacity-80 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H16.7V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6V11H7v3h2.7v8h3.8Z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a href="https://es.pinterest.com/jsantiagovargas/" aria-label="Pinterest" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 text-[#ff0000] hover:opacity-80 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
                <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.335 2.674 8.013 6.471 9.511-.088-.81-.166-2.052.034-2.939l1.241-5.274s-.317-.633-.317-1.57c0-1.471.853-2.57 1.914-2.57.903 0 1.339.677 1.339 1.489 0 .908-.578 2.266-.876 3.527-.249 1.053.528 1.911 1.566 1.911 1.88 0 3.328-1.982 3.328-4.843 0-2.532-1.819-4.301-4.416-4.301-3.002 0-4.763 2.252-4.763 4.577 0 .907.35 1.88.787 2.408.086.104.099.196.073.302l-.291 1.185c-.047.19-.153.23-.353.137-1.319-.613-2.143-2.537-2.143-4.08 0-3.323 2.415-6.375 6.962-6.375 3.655 0 6.496 2.604 6.496 6.085 0 3.631-2.289 6.554-5.466 6.554-1.068 0-2.071-.555-2.415-1.213l-.658 2.503c-.238.914-.881 2.061-1.313 2.76 1.018.314 2.1.484 3.221.484 5.671 0 10.289-4.618 10.289-10.289C22.578 6.617 17.96 2 12.289 2z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a href="https://x.com/jsantiagovargas?lang=es" aria-label="X" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black border border-slate-700 text-white hover:opacity-80 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-6.9L4.7 22H2l7.4-8.5L1 2h7l5 6.4L18.9 2Zm-1.2 18h1.7L8.2 3.9H6.4L17.7 20Z" />
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com/@josesantiagovargas/videos" aria-label="YouTube" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 text-[#ff0000] hover:opacity-80 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/jsantiagovargas/" aria-label="LinkedIn" className="inline-flex items-center justify-center w-8 h-8 rounded-full border bg-[#0267c8] border-slate-700 text-white hover:opacity-80 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M6.5 6.8A2.3 2.3 0 1 0 6.5 2a2.3 2.3 0 0 0 0 4.8ZM4 22h5V8.5H4V22Zm7.5-13.5H16v1.8h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V22h-5v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V22h-5V8.5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
