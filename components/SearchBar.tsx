'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowLeft, Loader2 } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
  loading: boolean;
  hasStats: boolean;
}

export default function SearchBar({ username, setUsername, onSearch, loading, hasStats }: SearchBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useClickOutside(searchContainerRef, () => {
    if (hasStats) {
      setIsSearchOpen(false);
    }
  });

  if (!hasStats) {
    return (
      <div className="w-full flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="GitHub Username"
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-transparent border-2 border-black rounded-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            autoFocus={isSearchOpen}
          />
          <Search className="absolute left-3 top-3.5 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        </div>
        <button 
          onClick={onSearch}
          disabled={loading}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors text-sm sm:text-base"
        >
          {loading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : 'Generate'}
        </button>
      </div>
    );
  }

  return (
    <div ref={searchContainerRef} className="rounded-xl border border-zinc-950/10 bg-white shadow-lg">
      <motion.div
        animate={{
          width: isSearchOpen ? (isMobile ? 'calc(100vw - 2rem)' : '300px') : '56px',
        }}
        initial={false}
      >
        <div className="overflow-hidden p-2 bg-[#F3EFE0] border rounded-lg border-neutral-300">
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative flex h-9 w-9 shrink-0 cursor-pointer bg-[#F3EFE0] scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
              aria-label="Search GitHub username"
            >
              <Search className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-[#F3EFE0]">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
                aria-label="Close search"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="relative w-full bg-[#F3EFE0]">
                <input
                  type="text"
                  placeholder="GitHub Username"
                  className="h-9 w-full rounded-lg bg-[#F3EFE0] border border-zinc-950/10 p-2 text-sm sm:text-base text-zinc-900 placeholder-zinc-500 focus:outline-hidden"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSearch();
                    }
                  }}
                  autoFocus
                />
              </div>
              <button
                onClick={onSearch}
                disabled={loading}
                className="relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                aria-label="Generate stats"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

