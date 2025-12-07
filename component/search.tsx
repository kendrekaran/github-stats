'use client';
import React, { useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import useClickOutside from '@/hooks/useClickOutside';
import {  Search, User, Loader2 } from 'lucide-react';

const transition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.2,
};

function Button({
  children,
  onClick,
  disabled,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <button
      className={`relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className || ''}`}
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function ToolbarDynamic() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <MotionConfig transition={transition}>
      <div className='absolute bottom-8 ' ref={containerRef}>
        <div className='h-full w-full rounded-xl border border-zinc-950/10 bg-white'>
          <motion.div
            animate={{
              // @todo: here I want to remove the width
              width: isOpen ? '300px' : '98px',
            }}
            initial={false}
          >
            <div className='overflow-hidden p-2'>
              {!isOpen ? (
                <div className='flex space-x-2'>
                  <Button disabled ariaLabel='User profile'>
                    <User className='h-5 w-5' />
                  </Button>
                  <Button
                    className='bg-[#F3EFE0]'
                    onClick={() => setIsOpen(true)}
                    ariaLabel='Search notes'
                  >
                    <Search className='h-5 w-5' />
                  </Button>
                </div>
              ) : (
                <div className="w-full flex  gap-2">
                  <div className="relative flex-1 bg-[#F3EFE0]">
                    <input
                      type="text"
                      placeholder="GitHub Username"
                      className="w-full pl-10 pr-4 py-3 bg-[#F3EFE0]  border-2 border-black rounded-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      autoFocus
                    />
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
