'use client';

import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  tracks: {
    id: string;
    title: string;
    src: string;
    duration: number;
    artwork?: string;
  }[];
  initialTrackIndex?: number;
}

const AudioPlayer = ({ tracks, initialTrackIndex = 0 }: AudioPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  
  const soundRef = useRef<Howl | null>(null);
  const seekRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  // Initialize and load audio
  useEffect(() => {
    // Clean up previous sound
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }
    
    // Clear any existing seek interval
    if (seekRef.current) {
      clearInterval(seekRef.current);
    }
    
    // Create new Howl instance
    soundRef.current = new Howl({
      src: [currentTrack.src],
      html5: true,
      volume: volume,
      onload: () => {
        // Set accurate duration from the loaded audio
        if (soundRef.current) {
          setDuration(soundRef.current.duration());
        }
      },
      onplay: () => {
        setIsPlaying(true);
        startSeekInterval();
      },
      onpause: () => {
        setIsPlaying(false);
        if (seekRef.current) {
          clearInterval(seekRef.current);
        }
      },
      onstop: () => {
        setIsPlaying(false);
        setSeek(0);
        if (seekRef.current) {
          clearInterval(seekRef.current);
        }
      },
      onend: () => {
        // Play next track or loop
        handleNext();
      },
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
      if (seekRef.current) {
        clearInterval(seekRef.current);
      }
    };
  }, [currentTrackIndex]);

  // Update volume when it changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  // Create interval to update seek position
  const startSeekInterval = () => {
    if (seekRef.current) {
      clearInterval(seekRef.current);
    }
    
    seekRef.current = setInterval(() => {
      if (soundRef.current) {
        setSeek(soundRef.current.seek());
      }
    }, 100);
  };

  // Play/pause toggle
  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  // Seek to a specific position
  const handleSeek = (value: number[]) => {
    if (!soundRef.current) return;
    
    const newPosition = value[0];
    soundRef.current.seek(newPosition);
    setSeek(newPosition);
  };

  // Change volume
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Previous track
  const handlePrevious = () => {
    const newIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(newIndex);
  };

  // Next track
  const handleNext = () => {
    const newIndex = currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;
    setCurrentTrackIndex(newIndex);
  };

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-black/60 backdrop-blur-lg rounded-xl p-4 md:p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Album artwork */}
        <motion.div 
          className="w-full md:w-40 h-40 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg overflow-hidden flex-shrink-0"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {currentTrack.artwork && (
            <img 
              src={currentTrack.artwork} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
        
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold">{currentTrack.title}</h3>
            <p className="text-gray-400">Track {currentTrackIndex + 1} of {tracks.length}</p>
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 my-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePrevious}
              className="text-white hover:text-purple-400 hover:bg-white/10"
            >
              <span className="sr-only">Previous</span>
              {/* Skip back icon - replace with your actual icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </Button>
            
            <Button 
              variant="default" 
              size="icon" 
              onClick={togglePlay}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12"
            >
              <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              {/* Play/Pause icon - replace with your actual icon */}
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNext}
              className="text-white hover:text-purple-400 hover:bg-white/10"
            >
              <span className="sr-only">Next</span>
              {/* Skip forward icon - replace with your actual icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <Slider 
          value={[seek]} 
          min={0} 
          max={duration || currentTrack.duration} 
          step={0.1} 
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-1 text-gray-400">
          <span>{formatTime(seek)}</span>
          <span>{formatTime(duration || currentTrack.duration)}</span>
        </div>
      </div>
      
      {/* Volume control */}
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        <Slider 
          value={[volume]} 
          min={0} 
          max={1} 
          step={0.01} 
          onValueChange={handleVolumeChange}
          className="max-w-48 cursor-pointer"
        />
      </div>
      
      {/* Visualizer */}
      <div className="h-6 mt-4">
        {isPlaying && (
          <div className="flex items-end justify-center h-full gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={i}
                className="w-1 bg-purple-500"
                animate={{ 
                  height: [
                    Math.random() * 24, 
                    Math.random() * 24, 
                    Math.random() * 24
                  ]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;