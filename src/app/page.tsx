'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Howl } from 'howler';
import gsap from 'gsap';

// Dynamically import Three.js components to prevent SSR issues
const ThreeDBackground = dynamic(() => import('@/components/3d/ThreeDBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/50" />
});

export default function Home() {
  const audioRef = useRef<Howl | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio setup
  useEffect(() => {
    // Create audio instance (would connect to your audio file)
    audioRef.current = new Howl({
      src: ['/audio/preview.mp3'], // Add a sample track
      volume: 0.5,
      preload: true,
      html5: true,
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.unload();
      }
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      const sections = gsap.utils.toArray('.animate-section');
      
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  // Audio play handler
  const handlePlayDemo = () => {
    if (audioRef.current) {
      if (audioRef.current.playing()) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Three.js Background */}
      <div className="fixed inset-0 -z-10">
        <ThreeDBackground />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90 z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 z-10 text-center"
        >
          <motion.h1 
            className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            DJ NV
          </motion.h1>
          
          {/* <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Experience the fusion of electronic beats and immersive soundscapes
          </motion.p> */}
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6"
              onClick={handlePlayDemo}
            >
              Play Demo
            </Button>
            <Link href="/shows">
              <Button 
                variant="outline" 
                size="lg"
                className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-6"
              >
                Upcoming Shows
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Latest Releases Section */}
      <section className="py-20 animate-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Latest Releases</h2>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="h-60 bg-gradient-to-br from-purple-500/30 to-blue-500/30"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Track Title {item}</h3>
                  <p className="text-gray-400 mb-4">Released: April {item + 10}, 2024</p>
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                      Listen Now
                    </Button>
                    <div className="flex space-x-2">
                      <span className="text-sm text-gray-400">Spotify</span>
                      <span className="text-sm text-gray-400">Apple</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          
          <div className="text-center mt-12">
            <Link href="/music">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View All Releases
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tour Dates Preview */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/30 animate-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Upcoming Shows</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { date: 'APR 20', venue: 'Electric Ballroom', location: 'Los Angeles, CA' },
              { date: 'MAY 15', venue: 'Bass Arena', location: 'Miami, FL' },
              { date: 'JUN 10', venue: 'Sound Factory', location: 'Chicago, IL' },
            ].map((show, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row justify-between items-center bg-black/50 backdrop-blur-sm p-6 rounded-lg hover:bg-black/70 transition-colors"
              >
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
                  <div className="text-xl font-bold text-purple-400">{show.date}</div>
                  <div>
                    <div className="font-medium text-lg">{show.venue}</div>
                    <div className="text-gray-400">{show.location}</div>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white min-w-24">
                  Tickets
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shows">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View All Shows
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 animate-section">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Stay Connected</h2>
            <p className="text-center mb-8 text-gray-300">
              Subscribe to get updates on new releases, upcoming shows, and exclusive content
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-black/50 rounded-md border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}