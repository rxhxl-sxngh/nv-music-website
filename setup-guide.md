# DJ Website Setup Guide

This guide will help you set up and deploy your immersive DJ website built with Next.js, Vite, Tailwind CSS, and various animation/3D libraries.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional but recommended)

## Getting Started

Follow these steps to set up your project:

### 1. Create Next.js Project

First, create a new Next.js project with the app router:

```bash
npx create-next-app@latest dj-website
```

When prompted, choose:
- ✅ Would you like to use TypeScript?
- ✅ Would you like to use ESLint?
- ✅ Would you like to use Tailwind CSS?
- ✅ Would you like to use `src/` directory?
- ✅ Would you like to use App Router?
- ❓ Would you like to customize the default import alias? (Choose based on preference)

### 2. Change to Project Directory

```bash
cd dj-website
```

### 3. Install Required Dependencies

```bash
# Install animation libraries
npm install framer-motion gsap

# Install audio library
npm install howler

# Install 3D libraries
npm install three @react-three/fiber @react-three/drei

# Install noise library for particle effects
npm install noisejs

# Install react-hook-form for form handling
npm install react-hook-form

# Install postprocessing for Three.js effects
npm install postprocessing
```

### 4. Set Up shadcn/ui Components

```bash
npx shadcn-ui@latest init
```

Follow the prompts to complete setup. Then install the components we're using:

```bash
npx shadcn-ui@latest add button tabs input slider select textarea
```

### 5. Project Structure

Create the following directory structure to match our components:

```bash
mkdir -p src/components/{ui,layout,3d,audio}
mkdir -p src/hooks
mkdir -p src/app/{music,shows,about,contact}
mkdir -p public/{images,audio}
```

### 6. Add Sample Media Files

For the website to function correctly with the audio player, add some sample audio files:

```bash
# Create placeholder audio files
touch public/audio/track1.mp3
touch public/audio/track2.mp3
touch public/audio/track3.mp3
```

You should replace these with actual audio files from your DJ friend.

Also, add some placeholder images for the album/track artwork:

```bash
# Create image directories
mkdir -p public/images/{artwork,albums,artists}
```

### 7. Copy Components

Now copy all the component files from the codebase we've provided:

- `src/app/layout.tsx` - Main layout with header and footer
- `src/components/layout/Header.tsx` - Navigation header
- `src/components/layout/Footer.tsx` - Website footer
- `src/app/page.tsx` - Homepage with 3D background
- `src/components/3d/ThreeDBackground.tsx` - Three.js background
- `src/components/audio/AudioPlayer.tsx` - Howler.js audio player
- `src/app/music/page.tsx` - Music releases page
- `src/app/shows/page.tsx` - Tour dates page
- `src/app/contact/page.tsx` - Contact and booking page

### 8. Customize for Your DJ

Now, personalize the website for your DJ friend:

1. **Update DJ Name**: Search through the files and replace "DJ NAME" with your friend's actual DJ name.

2. **Replace Artwork**: Replace the placeholder artwork paths with real artwork.

3. **Update Tour Dates**: Modify the sample data in `src/app/shows/page.tsx` with actual tour dates.

4. **Update Music**: Add real track information and audio files.

5. **Update Contact Info**: Put real contact information in the contact page.

6. **Customize Colors**: Modify the color scheme in the components (currently purple-based) to match your DJ's brand.

### 9. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your website!

## Adding Real Media Content

### Audio Files

For the audio player to work properly, you'll need to add actual audio files to the `public/audio/` directory. The Howler.js library supports various formats, but MP3 is recommended for broad compatibility.

To improve user experience, you may want to create shorter preview versions of tracks rather than full-length songs.

### Images

Add the following types of images to enhance the website:

1. **Logo**: Add your DJ's logo for the header
2. **Album Artwork**: High-quality square images for each release
3. **Artist Photos**: Professional photos for the about page
4. **Background Textures**: Custom textures that can be used in the Three.js background

## Optimizing for Production

Before deploying, run the following to create an optimized build:

```bash
npm run build
```

This will generate a production-ready version of your site in the `.next` directory.

## Deployment Options

Here are some recommended ways to deploy your DJ website:

1. **Vercel** (easiest for Next.js projects):
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**:
   Connect your GitHub repository to Netlify and configure the build settings.

3. **GitHub Pages**:
   Use a GitHub Action to automate deployment to GitHub Pages.

## Extending the Project

Some ideas for future enhancements:

1. **Music Visualizations**: Extend the audio player with canvas-based visualizations
2. **Mailing List Integration**: Connect the newsletter form to a service like Mailchimp
3. **Live Stream Integration**: Add Twitch/YouTube embedding for live streams
4. **Merchandise Store**: Add a shop section with Shopify integration
5. **Blog/Updates**: Add a news or blog section
6. **Photo Gallery**: Create a media section with photos from shows

## Troubleshooting

- **Three.js Issues**: If you see errors related to Three.js, make sure you're using dynamic imports with `{ ssr: false }` flag.
- **Audio Playback**: If audio doesn't play, check browser console for CORS issues or file path problems.
- **Mobile Responsiveness**: Test thoroughly on mobile devices and adjust layouts as needed.

## Maintenance

To keep your website up to date:

1. Regularly update dependencies:
   ```bash
   npm update
   ```

2. Monitor performance and SEO with tools like Google Lighthouse.

3. Regularly add new content (releases, tour dates, etc.) to keep the site fresh.

Enjoy your new immersive DJ website!
