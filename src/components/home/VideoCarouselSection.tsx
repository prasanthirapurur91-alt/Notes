'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Video, CheckCircle2 } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  previewUrl?: string;
  posterBg: string;
}

export const VideoCarouselSection: React.FC = () => {
  const videoItems: VideoItem[] = [
    {
      id: 'v1',
      title: 'Java Memory Architecture & GC Deep Dive Walkthrough',
      category: 'Programming Notes',
      duration: '4:15',
      description: 'Visual diagram breakdown of Heap vs Stack, Eden Space, Tenured Space, and GC algorithms.',
      posterBg: 'from-neutral-900 via-black to-neutral-950',
    },
    {
      id: 'v2',
      title: 'Token Bucket Rate Limiter System Design Blueprint',
      category: 'System Design Notes',
      duration: '6:30',
      description: 'Distributed rate limiting architecture using Redis Lua scripts, sliding logs, and failovers.',
      posterBg: 'from-black via-neutral-900 to-neutral-950',
    },
    {
      id: 'v3',
      title: 'Playwright Page Object Model & API Test Automation',
      category: 'Testing & Automation Notes',
      duration: '5:45',
      description: 'Step-by-step setup of Playwright POM, dynamic waits, Postman assertions, and Allure reports.',
      posterBg: 'from-neutral-950 via-neutral-900 to-black',
    },
    {
      id: 'v4',
      title: 'LeetCode 14 Algorithmic Patterns & DP Traversal',
      category: 'DSA & Algorithms',
      duration: '7:10',
      description: 'Sliding window, monotonic stack, fast & slow pointers, and dynamic programming state tables.',
      posterBg: 'from-neutral-900 via-black to-neutral-900',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const node = sectionRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  // Auto-advance video carousel every 4 seconds when in viewport and playing
  useEffect(() => {
    if (!isPlaying || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoItems.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, isVisible, videoItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videoItems.length);
  };

  const activeVideo = videoItems[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-black text-white relative overflow-hidden border-t border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700 inline-flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-white" />
            VIDEO LESSON PREVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Visual Notes & Video Previews
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-normal">
            Watch interactive walkthroughs of complex System Design, Java, DSA & Automation topics.
          </p>
        </div>

        {/* Video Player Display Container */}
        <div className="max-w-4xl mx-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-4 sm:p-8 shadow-2xl space-y-6">
          {/* Main Simulated Screen */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-inner group">
            {/* Poster / Simulated Animated Frame */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${activeVideo.posterBg} p-6 sm:p-10 flex flex-col justify-between transition-all duration-700 ease-in-out border border-neutral-800`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md border border-neutral-700">
                  {activeVideo.category}
                </span>
                <span className="text-xs font-mono font-semibold bg-black/80 text-white px-2.5 py-1 rounded-md border border-neutral-800">
                  ⏱ {activeVideo.duration}
                </span>
              </div>

              {/* Animated Screen Graphic */}
              <div className="my-auto text-center space-y-3 z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center mx-auto border border-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5 text-black" />
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white max-w-xl mx-auto line-clamp-2">
                  {activeVideo.title}
                </h3>
              </div>

              {/* Footer Bar inside Video */}
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-neutral-800 z-10">
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-white" /> Auto-playing Video Carousel
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  {currentIndex + 1} / {videoItems.length}
                </span>
              </div>
            </div>

            {/* Play/Pause overlay indicator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-4 right-4 z-20 bg-black hover:bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white" />}
              {isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
            </button>
          </div>

          {/* Description & Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="flex-1">
              <h4 className="text-base font-bold text-white mb-1">
                {activeVideo.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

            {/* Manual Navigation Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center transition-all shadow-md cursor-pointer"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5 px-2">
                {videoItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-white'
                        : 'w-2.5 bg-neutral-800 hover:bg-neutral-700'
                    }`}
                    aria-label={`Go to video ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center transition-all shadow-md cursor-pointer"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
