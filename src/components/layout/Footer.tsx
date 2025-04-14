'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const socialLinks = [
  { name: 'Spotify', url: '#', icon: 'spotify' },
  { name: 'Instagram', url: '#', icon: 'instagram' },
  { name: 'SoundCloud', url: '#', icon: 'soundcloud' },
  // { name: 'Twitter', url: '#', icon: 'twitter' },
  { name: 'YouTube', url: '#', icon: 'youtube' },
];

// Simple social icon component
const SocialIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500 transition-colors">
      <span className="sr-only">{icon}</span>
      {/* Replace with actual icons in your implementation */}
      <div className="w-4 h-4 text-white">{icon.charAt(0).toUpperCase()}</div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Social Links */}
          <div className="flex space-x-4 mb-8">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.url} aria-label={social.name}>
                <SocialIcon icon={social.icon} />
              </Link>
            ))}
          </div>

          {/* Newsletter - Similar to what Of The Trees might have */}
          <div className="max-w-md w-full mb-12">
            <h3 className="text-center text-lg mb-4">Join the community</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 bg-white/10 text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} DJ NV. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>{' '}
              |{' '}
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;