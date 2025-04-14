'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const bioRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isBioInView = useInView(bioRef, { once: true, amount: 0.3 });
  
  // GSAP animations
  useEffect(() => {
    if (timelineRef.current) {
      const timelineItems = gsap.utils.toArray('.timeline-item');
      
      timelineItems.forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.h1>
        
        <div className="max-w-6xl mx-auto">
          {/* Artist Intro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
                {/* Replace with actual artist image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 z-10"></div>
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xl">
                  Artist Image
                </div>
              </div>
            </motion.div>
            
            <div ref={bioRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isBioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col justify-center h-full"
              >
                <h2 className="text-3xl font-bold mb-6">DJ NAME</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  DJ NAME is an electronic music producer and DJ known for blending innovative sound design with infectious grooves. With a background in classical training and a passion for cutting-edge technology, DJ NAME creates immersive sonic experiences that transport listeners to new dimensions.
                </p>
                <p className="text-gray-300 mb-6">
                  Having performed at venues and festivals across the globe, DJ NAME has shared stages with some of electronic music's most respected artists. Each performance is a unique journey through bass-heavy rhythms, ethereal melodies, and hypnotic beats that leave audiences spellbound.
                </p>
                <p className="text-gray-300">
                  Beyond the stage, DJ NAME is dedicated to pushing the boundaries of music production, continuously exploring new techniques and sounds that defy conventional genres. With several critically acclaimed releases and a growing international fanbase, DJ NAME is quickly becoming a defining voice in the electronic music scene.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Music Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Music Philosophy</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-200 text-lg mb-6 text-center">
                "Music is the universal language that connects us all. My goal is to create sonic landscapes that evoke emotions and transport listeners to different realms of consciousness."
              </p>
              <p className="text-gray-300 text-center">
                Every production and performance is approached with intention and care, blending technical precision with emotional depth. From the studio to the stage, the mission remains the same: to create meaningful experiences through sound that resonate long after the music stops.
              </p>
            </div>
          </motion.div>
          
          {/* Timeline/Journey */}
          <div ref={timelineRef} className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">The Journey</h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/50"></div>
              
              {/* Timeline Items */}
              <div className="space-y-20">
                {[
                  { year: '2016', title: 'First Release', description: 'Released debut EP "Digital Dreams" which gained support from established artists.' },
                  { year: '2018', title: 'Festival Debut', description: 'First major festival appearance, performing on the emerging artists stage.' },
                  { year: '2020', title: 'Collaboration', description: 'Collaborated with renowned artists on the "Fusion" project, expanding audience reach.' },
                  { year: '2022', title: 'International Tour', description: 'First international tour covering 15 cities across North America and Europe.' },
                  { year: '2023', title: 'Label Launch', description: 'Founded independent label to support emerging artists in the electronic scene.' },
                  { year: '2024', title: 'New Album', description: 'Released critically acclaimed album "Dimensions" showcasing evolved sound and production techniques.' },
                ].map((item, index) => (
                  <div 
                    key={item.year} 
                    className={`timeline-item relative flex ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className={`w-5/12 ${index % 2 === 1 && 'order-2'}`}>
                      <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border-l-4 border-purple-500">
                        <div className="text-purple-400 font-bold text-xl mb-2">{item.year}</div>
                        <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-purple-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Influences */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center">Influences & Inspiration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Nature', description: 'The organic patterns and rhythms found in nature inspire many of the textural elements in my music.' },
                { name: 'Technology', description: 'Embracing new technology and production techniques to push the boundaries of sound design.' },
                { name: 'World Music', description: 'Drawing influence from diverse musical traditions and incorporating global sounds into electronic compositions.' },
                { name: 'Visual Arts', description: 'The interplay between visual aesthetics and sonic landscapes informs both my music and performance visuals.' },
                { name: 'Urban Environment', description: 'City soundscapes and architectural structures influence the rhythm and flow of my productions.' },
                { name: 'Human Connection', description: 'The universal emotions and shared experiences that connect us all are at the core of my musical message.' },
              ].map((influence, index) => (
                <div 
                  key={influence.name}
                  className="bg-black/40 backdrop-blur-sm p-6 rounded-lg hover:bg-black/60 transition-colors"
                >
                  <h3 className="font-bold text-xl mb-3 text-purple-400">{influence.name}</h3>
                  <p className="text-gray-300">{influence.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Experience The Sound</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Whether through headphones or on the dancefloor, DJ NAME's music is designed to be experienced fully and deeply. Dive into the latest releases and catch an upcoming show to be part of the journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/music" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md transition-colors">
                Listen Now
              </a>
              <a href="/shows" className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black px-8 py-3 rounded-md transition-colors">
                Upcoming Shows
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}