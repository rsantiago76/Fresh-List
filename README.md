# FreshList — Smart Grocery Habits

A production-quality demo SaaS application for building healthier grocery lists with real-time insights and analytics.

## 🌟 Features

### Core Features
- **Interactive Grocery Builder** - Add items with name, category, and processing level
- **Real-time Fresh Ratio Meter** - Live updates as you build your list
- **Smart Suggestions** - Context-aware tips based on your list composition
- **Analytics Dashboard** - Beautiful charts and insights
- **Local Storage Persistence** - Your data persists across sessions
- **Responsive Design** - Works perfectly on all devices
- **Accessibility-first** - WCAG AA compliant focus states

### Pages
1. **Home (/)** - Marketing landing page with animated features
2. **Demo (/demo)** - Interactive grocery builder with localStorage
3. **Dashboard (/dashboard)** - Analytics with Recharts visualizations
4. **Pricing (/pricing)** - Three-tier pricing with gradient borders
5. **Login (/login)** - Mock authentication with localStorage
6. **Settings (/settings)** - User preferences and account management

## 🎨 Design System

### Color Palette
- **Primary (Mint/Emerald)**: `hsl(160, 84%, 39%)`  
- **Accent (Lime)**: `hsl(82, 84%, 46%)`  
- **Secondary (Coral/Orange)**: `hsl(27, 96%, 61%)`  
- **Neutrals**: Warm gray scale from 50-900

### Typography
- **Hero**: 72px / 4.5rem
- **H1**: 36px / 2.25rem  
- **H2**: 30px / 1.875rem  
- **H3**: 24px / 1.5rem  
- **Body**: 16px / 1rem  
- **Caption**: 12px / 0.75rem

### Components
All components use:
- Soft gradient backgrounds
- Rounded corners (8px - 32px)
- Subtle shadows (no harsh borders)
- Smooth animations with Motion (Framer Motion)
- Hover lift effects
- Focus-visible states for accessibility

## 🚀 Tech Stack

- **React 18.3** with TypeScript
- **React Router DOM 7** for routing
- **Tailwind CSS 4** for styling
- **Motion (Framer Motion)** for animations
- **Recharts 2** for data visualization
- **Lucide React** for icons
- **Radix UI** components (installed, ready to use)
- **Vite** for blazing-fast dev server

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AnimatedBlobs.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── DonutChart.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Input.tsx
│   │   ├── Navbar.tsx
│   │   ├── PricingCard.tsx
│   │   └── StatCard.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── DemoPage.tsx (to be created)
│   │   ├── DashboardPage.tsx (to be created)
│   │   ├── PricingPage.tsx (to be created)
│   │   ├── LoginPage.tsx (to be created)
│   │   └── SettingsPage.tsx (to be created)
│   └── App.tsx (router setup)
├── types/
│   └── index.ts
├── utils/
│   ├── storage.ts (localStorage management)
│   └── helpers.ts (calculations, suggestions)
└── styles/
    └── theme.css (design tokens)
```

## 🎯 Key Components

### GroceryBuilder
Interactive list builder with:
- Add/delete items
- Check off purchased items  
- Group by processing level (Fresh/Moderate/Processed)
- Color-coded badges
- Live fresh ratio updates

### FreshRatioMeter
Animated circular progress bar showing:
- Current fresh ratio percentage
- Stats breakdown (fresh/moderate/processed counts)
- Dynamic encouraging messages
- Smooth animations

### SuggestionsPanel
Context-aware tips including:
- "Add more vegetables" (if < 3)
- "Boost your protein" (if < 2)
- "Too many processed items" (if >= 5)
- Congratulations on progress

### Dashboard Charts
- **Donut Chart**: Fresh vs. Processed breakdown
- **Bar Chart**: Items by category
- **Line Chart**: 7-day trend
- **Recent Lists Table**: Shopping history

## 🗂️ Data Management

### localStorage Keys
- `freshlist_current_list` - Current working list
- `freshlist_lists` - Saved/completed lists
- `freshlist_user` - Mock user account

### Data Types
```typescript
interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quality: 'fresh' | 'moderate' | 'processed';
  purchased: boolean;
  createdAt: Date;
}
```

## 🎨 Customization

### Tailwind Config
The design system uses CSS variables exposed to Tailwind. All colors, spacing, and radii are customizable in `/src/styles/theme.css`.

### Adding New Features
1. Create component in `/src/app/components/`
2. Use existing design tokens from theme.css
3. Follow accessibility patterns (focus-visible, aria-labels)
4. Add smooth animations with Motion

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Build Output
```bash
npm run build
# Output in /dist
```

The app is optimized for:
- Fast initial load
- Code splitting
- Asset optimization
- Modern browser support

## 🔐 Security & Privacy

- **No backend required** - Everything runs client-side
- **localStorage only** - No cookies, no tracking
- **No external API calls** - All data stays local
- **Privacy-first** - GDPR compliant by design

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a demo application. Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Credits

- Design inspired by modern SaaS products
- Icons by Lucide
- Charts by Recharts
- Animations by Motion (Framer Motion)

## 📧 Support

For questions or issues, please open a GitHub issue.

---

**Built with 💚 by the FreshList team**
