import React from 'react';
import { Stats } from '@/utils/github';

interface StatsCardProps {
  stats: Stats;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function StatsCard({ stats, cardRef }: StatsCardProps) {
  return (
    <div ref={cardRef} className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Image Section */}
      <div className="relative mb-4 sm:mb-6 w-full flex justify-center">
        <div className="relative w-full">
          <img 
            src="/git.png" 
            alt="Git decoration" 
            className="w-full h-auto"
          />
          <img 
            src={stats.avatarUrl} 
            alt="GitHub profile" 
            className="absolute top-4 right-4 w-full h-full max-w-68 max-h-68 sm:max-w-86 sm:max-h-86 md:max-w-88 md:max-h-88 lg:max-w-90 lg:max-h-90 border-2 border-black shadow-lg object-cover"
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-x-8 sm:gap-x-16 md:gap-x-24 mt-4 sm:mt-8 w-full'>
        {/* Left Column */}
        <div className="flex flex-col w-full">
          {/* Top Languages */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-medium">Top Languages</h3>
            <ol className="space-y-1.5 sm:space-y-2">
              {stats.languages.map((lang, index) => (
                <li key={lang} className="text-base sm:text-xl font-semibold flex items-baseline">
                  <span className="text-sm sm:text-base font-medium text-gray-400 w-5 sm:w-6">{index + 1}</span>
                  {lang}
                </li>
              ))}
            </ol>
          </div>

          {/* Minutes Coded */}
          <div className="mt-auto">
            <h3 className="text-sm sm:text-base text-gray-600 mb-2 font-medium">Minutes Coded</h3>
            <div className="flex items-baseline flex-wrap gap-3">
              <span className="text-xl sm:text-3xl max-w-48 sm:max-w-64 line-clamp-1 truncate text-ellipsis font-extrabold tracking-tight">
                ~{stats.minutes} min
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='flex flex-col w-full'>
          {/* Top Projects */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-medium">Top Projects</h3>
            <ol className="space-y-1.5 sm:space-y-2">
              {stats.projects.map((project, index) => (
                <li key={project} className="text-base sm:text-xl font-semibold flex items-baseline truncate">
                  <span className="text-sm sm:text-base font-medium text-gray-400 w-5 sm:w-6 shrink-0">{index + 1}</span>
                  <span className="truncate">{project}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Domain */}
          <div className="mt-auto">
            <h3 className="text-sm sm:text-base text-gray-600 mb-2 font-medium">Domain</h3>
            <div className="text-xl sm:text-3xl line-clamp-2 truncate text-ellipsis font-extrabold tracking-tight leading-tight">
              {stats.domain}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

