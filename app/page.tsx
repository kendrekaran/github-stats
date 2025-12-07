"use client";
import React, { useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { fetchGitHubStats, Stats } from '@/utils/github';
import StatsCard from '@/components/StatsCard';
import ShareButton from '@/components/ShareButton';
import SearchBar from '@/components/SearchBar';

const transition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.2,
};

export default function GithubStatsCard() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFetchStats = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError('');
    setStats(null);

    try {
      const fetchedStats = await fetchGitHubStats(username);
      setStats(fetchedStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionConfig transition={transition}>
      <div className="min-h-screen bg-[#F3EFE0] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-[#0f0f0f] relative">
        <div className='w-full max-w-md mx-auto'>
          {!stats && (
            <SearchBar
              username={username}
              setUsername={setUsername}
              onSearch={handleFetchStats}
              loading={loading}
              hasStats={false}
            />
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 font-medium mb-4 sm:mb-8 animate-bounce text-sm sm:text-base">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {stats && (
            <StatsCard stats={stats} cardRef={cardRef} />
          )}
        </div>

        {stats && (
          <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-10 flex items-center gap-2">
            <ShareButton stats={stats} username={username} cardRef={cardRef} />
            <SearchBar
              username={username}
              setUsername={setUsername}
              onSearch={handleFetchStats}
              loading={loading}
              hasStats={true}
            />
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
