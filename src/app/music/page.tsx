'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioPlayer from '@/components/audio/AudioPlayer';

// Sample music data
const sampleTracks = [
  {
    id: '1',
    title: 'Cosmic Waves',
    src: '/audio/track1.mp3', // You'll need to add actual audio files
    duration: 180, // 3 minutes
    artwork: '/images/artwork1.jpg', // Add your artwork images
  },
  {
    id: '2',
    title: 'Night Drive',
    src: '/audio/track2.mp3',
    duration: 210, // 3:30 minutes
    artwork: '/images/artwork2.jpg',
  },
  {
    id: '3',
    title: 'Electric Dreams',
    src: '/audio/track3.mp3',
    duration: 195, // 3:15 minutes
    artwork: '/images/artwork3.jpg',
  },
];

// Sample albums data
const albums = [
  {
    id: 'album1',
    title: 'Cosmic Journey EP',
    year: '2023',
    artwork: '/images/album1.jpg',
    tracks: sampleTracks,
  },
  {
    id: 'album2',
    title: 'Midnight Vibes',
    year: '2022',
    artwork: '/images/album2.jpg',
    tracks: sampleTracks.slice(0, 2), // Just reusing sample tracks
  },
];

// Sample singles data
const singles = [
  {
    id: 'single1',
    title: 'Summer Haze',
    year: '2024',
    artwork: '/images/single1.jpg',
    tracks: [sampleTracks[0]], // Just one track
  },
  {
    id: 'single2',
    title: 'City Lights',
    year: '2023',
    artwork: '/images/single2.jpg',
    tracks: [sampleTracks[1]], // Just one track
  },
];

export default function MusicPage() {
  const [selectedRelease, setSelectedRelease] = useState(albums[0]);
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          New Music Coming Soon
        </motion.h1>
        
        {/* <Tabs defaultValue="albums" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="albums" className="text-lg">Albums</TabsTrigger>
            <TabsTrigger value="singles" className="text-lg">Singles</TabsTrigger>
            <TabsTrigger value="remixes" className="text-lg">Remixes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="albums" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <motion.div 
                  key={album.id}
                  onClick={() => setSelectedRelease(album)}
                  className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedRelease.id === album.id 
                      ? 'ring-2 ring-purple-500 scale-105 z-10' 
                      : 'hover:scale-105'
                  }`}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                    {album.artwork && (
                      <img 
                        src={album.artwork} 
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 bg-black/80">
                    <h3 className="font-bold text-lg">{album.title}</h3>
                    <p className="text-gray-400">{album.year} • {album.tracks.length} tracks</p>
                  </div>
                </motion.div>
              ))}
            </div> */}
            
            {/* Selected album details and player */}
            {/* <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-64 aspect-square bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg overflow-hidden flex-shrink-0">
                  {selectedRelease.artwork && (
                    <img 
                      src={selectedRelease.artwork} 
                      alt={selectedRelease.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedRelease.title}</h2>
                  <p className="text-xl text-gray-300 mb-4">{selectedRelease.year}</p>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg mb-2">Tracklist:</h3>
                    {selectedRelease.tracks.map((track, index) => (
                      <div key={track.id} className="flex items-center gap-3 py-2 border-b border-white/10">
                        <span className="text-gray-400">{index + 1}</span>
                        <span>{track.title}</span>
                        <span className="ml-auto text-gray-400">
                          {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Spotify
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Apple Music
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      SoundCloud
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Bandcamp
                    </a>
                  </div>
                </div>
              </div>
              
              <AudioPlayer tracks={selectedRelease.tracks} />
            </motion.div>
          </TabsContent> */}
          
          {/* <TabsContent value="singles" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singles.map((single) => (
                <motion.div 
                  key={single.id}
                  onClick={() => setSelectedRelease(single)}
                  className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedRelease.id === single.id 
                      ? 'ring-2 ring-purple-500 scale-105 z-10' 
                      : 'hover:scale-105'
                  }`}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                    {single.artwork && (
                      <img 
                        src={single.artwork} 
                        alt={single.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 bg-black/80">
                    <h3 className="font-bold text-lg">{single.title}</h3>
                    <p className="text-gray-400">{single.year} • Single</p>
                  </div>
                </motion.div>
              ))}
            </div> */}
            
            {/* Selected single details and player */}
            {/* <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-64 aspect-square bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg overflow-hidden flex-shrink-0">
                  {selectedRelease.artwork && (
                    <img 
                      src={selectedRelease.artwork} 
                      alt={selectedRelease.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedRelease.title}</h2>
                  <p className="text-xl text-gray-300 mb-4">{selectedRelease.year} • Single</p>
                  
                  <div className="space-y-2">
                    {selectedRelease.tracks.map((track) => (
                      <div key={track.id} className="flex items-center gap-3 py-2 border-b border-white/10">
                        <span>{track.title}</span>
                        <span className="ml-auto text-gray-400">
                          {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Spotify
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Apple Music
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      SoundCloud
                    </a>
                  </div>
                </div>
              </div>
              
              <AudioPlayer tracks={selectedRelease.tracks} />
            </motion.div>
          </TabsContent> */}
          
          {/* <TabsContent value="remixes" className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold mb-4">Remixes Coming Soon</h3>
              <p className="text-gray-300 max-w-xl mx-auto">
                Stay tuned for upcoming remix releases and collaborations with other artists.
              </p>
            </div> */}
          {/* </TabsContent> */}
        {/* </Tabs> */}
      </div>
    </div>
  );
}