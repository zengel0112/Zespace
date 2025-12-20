# Modern React Frontend Project

A modern, responsive frontend project built with React, TypeScript, Vite, Tailwind CSS, GSAP, and Framer Motion.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - High-performance animations
- **Framer Motion** - Component-level animations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   └── index.ts
├── pages/              # Page components
│   ├── Hero.tsx
│   ├── Home.tsx
│   └── index.ts
├── layouts/            # Layout components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MainLayout.tsx
│   └── index.ts
├── hooks/              # Custom React hooks
│   ├── useScrollPosition.ts
│   ├── useDarkMode.ts
│   └── index.ts
├── lib/                # Utility functions
│   └── utils.ts
├── animations/         # Animation variants
│   ├── fadeIn.ts
│   └── index.ts
├── styles/             # Global styles
│   └── globals.css
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd myapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Note: The project uses Tailwind CSS v4 which requires `@tailwindcss/postcss` package. This should already be installed, but if you encounter build errors, run:
   ```bash
   npm install @tailwindcss/postcss
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Features

### Components

- **Button** - Animated button with multiple variants (primary, secondary, outline) and sizes
- **Card** - Reusable card component with hover effects
- **Container** - Responsive container with max-width constraints

### Layouts

- **Navbar** - Fixed navigation bar with scroll effects and dark mode toggle
- **Footer** - Animated footer with multiple sections
- **MainLayout** - Main layout wrapper combining Navbar and Footer

### Animations

- **Hero Section** - Smooth fade-in and slide-up animations using Framer Motion
- **GSAP Effects** - Scroll-triggered image reveals and parallax effects
- **Staggered Animations** - Sequential entrance animations for elements

### Responsive Design

The project includes responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Dark Mode

Built-in dark mode support with:
- Toggle button in navbar
- Smooth transitions
- LocalStorage persistence
- System preference detection

## 📝 Code Examples

### Animated Headline with Framer Motion

```tsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Your Headline
</motion.h1>
```

### GSAP Parallax Scroll Effect

```tsx
useEffect(() => {
  gsap.from(".hero-img", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });
}, []);
```

### Using Reusable Components

```tsx
import { Button, Card, Container } from './components';

<Container maxWidth="xl">
  <Card hover>
    <h2>Card Title</h2>
    <p>Card content</p>
  </Card>
  <Button variant="primary" size="lg">
    Click Me
  </Button>
</Container>
```

## 🎯 Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints
- Dark mode settings

### Animation Variants

Pre-defined animation variants are available in `src/animations/fadeIn.ts`:
- `fadeInUp` - Fade in with upward motion
- `fadeIn` - Simple fade in
- `staggerContainer` - Staggered children animations

## 📦 Dependencies

- `react` & `react-dom` - React library
- `typescript` - TypeScript support
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin
- `framer-motion` - Animation library
- `gsap` - Animation library

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using modern web technologies
