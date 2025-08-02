# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PEE Network is a humorous cryptocurrency-themed landing page built as a modern React application. The project presents a satirical take on blockchain mining with bathroom-themed branding and "mine while you pee" concept. It's a single-page application showcasing various sections about the fictional PEE cryptocurrency.

## Development Commands

### Core Development Workflow
```bash
npm install          # Install dependencies
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on all TypeScript/React files
```

### Development Server
- **Port**: Vite development server typically runs on `http://localhost:5173`
- **Hot Reload**: Automatic page refresh on file changes
- **Fast HMR**: Hot Module Replacement for instant updates

## Architecture & Tech Stack

### Core Technologies
- **React 18** with TypeScript for component development
- **Vite** as build tool and development server
- **Tailwind CSS** for styling with extensive custom theme
- **Lucide React** for consistent icon system

### Project Structure
```
src/
├── App.tsx              # Main app component with section routing
├── main.tsx             # React app entry point
├── index.css            # Global styles and Tailwind imports
├── components/          # Page section components
│   ├── Navigation.tsx   # Header navigation
│   ├── Hero.tsx         # Landing hero section
│   ├── Features.tsx     # Feature showcase
│   ├── Ecosystem.tsx    # Ecosystem overview
│   ├── Roadmap.tsx      # Project roadmap
│   ├── Community.tsx    # Community section
│   ├── Footer.tsx       # Site footer
│   └── PhoneMockup.tsx  # Mobile app mockup component
```

### Component Architecture
- **Single-page layout**: All components rendered in `App.tsx` as sequential sections
- **Responsive design**: Mobile-first approach with lg/xl breakpoints
- **No routing**: Static sections stacked vertically (Navigation → Hero → Features → etc.)
- **Icon integration**: Lucide React icons used throughout for consistency

### Styling System

#### Tailwind Configuration
- **Custom colors**: Extended palette with `yellow-25`, `amber-25` variants
- **Custom fonts**: Inter font family as primary typeface
- **Extensive animations**: 12 custom animations including `float`, `glow`, `shimmer`, `sparkle`
- **Professional shadows**: Multi-layered shadow system with `professional`, `glow`, `premium` variants
- **Backdrop effects**: Custom backdrop blur settings

#### CSS Architecture
- **Global animations**: Defined in `index.css` using `@keyframes`
- **Component-specific styles**: Applied via Tailwind classes in components
- **Theme consistency**: Yellow/amber/orange gradient color scheme throughout
- **Paper-card styling**: Custom card components with yellow paper aesthetic

#### Key Style Patterns
- **Gradient text**: `.gradient-text` class for orange-to-yellow text gradients
- **Paper cards**: `.paper-card` class for yellow paper-like background elements
- **Button styling**: `.btn-primary` for consistent button appearance
- **Professional text**: `.text-professional` for enhanced text rendering
- **Glow effects**: `.glow-effect` for orange glow animations

### TypeScript Configuration
- **Project references**: Uses TypeScript project references with separate app and node configs
- **Strict mode**: Enabled for type safety
- **Modern target**: ES2020 with browser globals
- **Vite integration**: Configured for Vite build system

### ESLint Configuration
- **Modern ESLint**: Uses flat config format (eslint.config.js)
- **React rules**: React hooks and refresh plugins configured
- **TypeScript**: Full TypeScript ESLint integration
- **Build exclusions**: Ignores dist directory

## Development Patterns

### Component Development
- **Functional components**: All components use React functional component pattern
- **TypeScript**: Full TypeScript usage with proper typing
- **Props interface**: Define interfaces for component props when needed
- **Export default**: Components use default exports

### Styling Approach
- **Tailwind-first**: Use Tailwind utility classes primarily
- **Custom animations**: Leverage the extensive custom animation system
- **Responsive design**: Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- **Theme consistency**: Stick to the orange/yellow/amber color scheme

### Content Guidelines
- **Humorous tone**: Maintain the satirical cryptocurrency theme
- **Bathroom puns**: Use toilet/bathroom-related terminology consistently
- **Technical satire**: Parody real cryptocurrency terminology and concepts
- **Visual hierarchy**: Use the established card and section layout patterns

## Build & Deployment

### Production Build
- **Build command**: `npm run build` generates optimized production bundle
- **Output**: Static files in `dist/` directory
- **Optimization**: Vite handles bundling, minification, and asset optimization
- **Preview**: `npm run preview` serves production build locally

### Asset Management
- **Lucide icons**: Excluded from optimization bundle (`vite.config.ts`)
- **Fonts**: Google Fonts (Inter) loaded via CSS import
- **Static assets**: Place in `public/` directory for direct access

## Key Considerations

### Performance
- **Vite optimization**: Fast development and build times
- **Icon optimization**: Lucide React icons excluded from Vite optimization
- **Custom animations**: Extensive animation system may impact performance on low-end devices

### Browser Compatibility
- **Modern browsers**: Targets ES2020+ browsers
- **CSS features**: Uses modern CSS features (backdrop-filter, custom properties)
- **React 18**: Requires modern React support

### Content Management
- **Static content**: All content is hardcoded in components
- **No CMS**: Content changes require code modifications
- **Section-based**: Content organized by section components

### Maintenance
- **TypeScript**: Type safety helps prevent runtime errors
- **ESLint**: Consistent code quality enforcement
- **Component isolation**: Each section is self-contained for easy modification