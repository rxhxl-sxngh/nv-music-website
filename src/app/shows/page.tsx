'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample shows data
const upcomingShows : any[] = [
  // {
  //   id: '1',
  //   date: 'APR 20, 2024',
  //   venue: 'Electric Ballroom',
  //   city: 'Los Angeles',
  //   state: 'CA',
  //   ticketUrl: 'https://tickets.example.com/1',
  //   soldOut: false,
  // }
];

const pastShows = [
  {
    id: 'p1',
    date: 'FEB 28, 2024',
    venue: 'Secret Society',
    city: 'College Station',
    state: 'TX',
  }
];

export default function ShowsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter shows based on search query
  const filteredUpcomingShows = upcomingShows.filter(show => {
    const searchString = `${show.venue} ${show.city} ${show.state}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });
  
  const filteredPastShows = pastShows.filter(show => {
    const searchString = `${show.venue} ${show.city} ${show.state}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tour Dates
        </motion.h1>
        
        <motion.div 
          className="max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            type="text"
            placeholder="Search by venue or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-400"
          />
        </motion.div>
        
        <Tabs defaultValue="upcoming" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 w-full max-w-xs mx-auto mb-10">
            <TabsTrigger value="upcoming" className="text-lg">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="text-lg">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8">
            {filteredUpcomingShows.length === 0 ? (
              <div className="text-center py-12 bg-black/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No shows found</h3>
                <p className="text-gray-400">Try adjusting your search or check back later for new tour dates.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredUpcomingShows.map((show, index) => (
                  <motion.div 
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 border-l-4 border-purple-500">
                      <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
                        <div className="text-center md:text-left">
                          <div className="text-xl font-bold text-purple-400">{show.date}</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="font-medium text-lg">{show.venue}</div>
                          <div className="text-gray-400">{show.city}, {show.state}</div>
                        </div>
                      </div>
                      
                      {show.soldOut ? (
                        <Button disabled className="bg-gray-700 text-gray-300 cursor-not-allowed min-w-28">
                          Sold Out
                        </Button>
                      ) : (
                        <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white min-w-28">
                            Tickets
                          </Button>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="py-8 text-center">
              <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Want to see a show in your city?</h3>
                <p className="text-gray-300 mb-6">
                  Let us know where you'd like to see the next performance!
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Request a Show
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-8">
            {filteredPastShows.length === 0 ? (
              <div className="text-center py-12 bg-black/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No past shows found</h3>
                <p className="text-gray-400">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPastShows.map((show, index) => (
                  <motion.div 
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between p-6">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center md:text-left">
                          <div className="text-xl font-bold text-gray-400">{show.date}</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="font-medium text-lg">{show.venue}</div>
                          <div className="text-gray-500">{show.city}, {show.state}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}