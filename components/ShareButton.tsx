'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Copy, Download } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import { captureCard, copyCardToClipboard, downloadCard } from '@/utils/canvas';
import { Stats } from '@/utils/github';

interface ShareButtonProps {
  stats: Stats;
  username: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function ShareButton({ stats, username, cardRef }: ShareButtonProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside(shareContainerRef, () => {
    setIsShareOpen(false);
  });

  const handleCopy = async () => {
    const canvas = await captureCard(cardRef, stats);
    if (canvas) {
      try {
        await copyCardToClipboard(canvas);
        setIsShareOpen(false);
      } catch (error) {
        console.error('Error copying card:', error);
      }
    }
  };

  const handleDownload = async () => {
    const canvas = await captureCard(cardRef, stats);
    if (canvas) {
      try {
        downloadCard(canvas, username);
        setIsShareOpen(false);
      } catch (error) {
        console.error('Error downloading card:', error);
      }
    }
  };

  return (
    <div ref={shareContainerRef} className="relative">
      <div className="rounded-xl border border-zinc-950/10 bg-white shadow-lg">
        <motion.div
          animate={{
            width: isShareOpen ? '120px' : '56px',
          }}
          initial={false}
        >
          <div className="overflow-hidden p-2 bg-[#F3EFE0] border rounded-lg border-neutral-300">
            {!isShareOpen ? (
              <button
                onClick={() => setIsShareOpen(true)}
                className="relative flex h-9 w-9 shrink-0 cursor-pointer bg-[#F3EFE0] scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
                aria-label="Share card"
              >
                <Share2 className="h-5 w-5" />
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-[#F3EFE0]">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={handleCopy}
                  className="relative flex bg-[#F3EFE0] h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
                  aria-label="Copy card"
                >
                  <Copy className="h-5 w-5" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={handleDownload}
                  className="relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] bg-[#F3EFE0]"
                  aria-label="Download card"
                >
                  <Download className="h-5 w-5" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

