'use client';

import { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from 'react-icons/fa';

interface HeroVideoProps {
  src: string;
  muted?: boolean;
  volume?: number;
  loop?: boolean;
  title: string;
  subtitle?: string;
}

export default function HeroVideo({ src, muted: initialMuted = true, volume = 1, loop = true, title, subtitle }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = initialMuted;
    setIsMuted(initialMuted);

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Autoplay prevented, falling back to muted');
        if (!video.muted) {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(e => console.log('Muted autoplay failed', e));
        }
      }
    };

    playVideo();

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [src, volume, initialMuted]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-900 group">
      <video
        ref={videoRef}
        loop={loop}
        muted={isMuted}
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      
      {/* Text Overlay */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center z-10 pointer-events-none">
        <h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4" 
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            className="text-white text-lg max-w-2xl font-medium" 
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        {/* Audio Control - Only show if audio was requested (initialMuted=false) */}
        {!initialMuted && (
          <button 
            onClick={toggleMute}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all cursor-pointer backdrop-blur-sm"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
