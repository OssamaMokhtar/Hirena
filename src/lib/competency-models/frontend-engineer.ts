import type { Skill, SkillCategory, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Frontend fundamentals
  'html-semantics': {
    id: 'html-semantics', name: 'HTML & Semantics',
    description: 'Semantic HTML5: proper element usage, accessibility implications, document structure, forms, tables, SEO fundamentals.',
    category: 'frontend-fundamentals', level: 0,
  },
  'css-core': {
    id: 'css-core', name: 'CSS Core',
    description: 'CSS fundamentals: selectors, specificity, cascade, box model, positioning, display types, units, colors, typography, media queries.',
    category: 'frontend-fundamentals', level: 0,
  },
  'javascript-dom': {
    id: 'javascript-dom', name: 'JavaScript & DOM',
    description: 'DOM manipulation, events, event delegation, async programming, fetch API, Web APIs (localStorage, sessionStorage, cookies, geolocation).',
    category: 'frontend-fundamentals', level: 0,
  },
  'browser-essentials': {
    id: 'browser-essentials', name: 'Browser Essentials',
    description: 'Browser rendering pipeline, critical rendering path, repaint/reflow, browser storage, service workers, web workers, browser dev tools proficiency.',
    category: 'frontend-fundamentals', level: 0,
  },
  'accessibility-standards': {
    id: 'accessibility-standards', name: 'Accessibility Standards',
    description: 'WCAG 2.1/2.2, ARIA attributes, screen reader testing, keyboard navigation, color contrast, focus management, accessible forms and components.',
    category: 'frontend-fundamentals', level: 0,
  },
  // Frameworks & libraries
  'react-concepts': {
    id: 'react-concepts', name: 'React Concepts',
    description: 'Components, JSX, props, state, hooks (useState, useEffect, useContext, custom hooks), component lifecycle, React rendering behavior.',
    category: 'frameworks-libraries', level: 0,
  },
  'state-management': {
    id: 'state-management', name: 'State Management',
    description: 'State management approaches: local state, prop drilling, Context API, Redux/Zustand/Jotai, server state (React Query, SWR), choosing the right approach.',
    category: 'frameworks-libraries', level: 0,
  },
  'component-architecture': {
    id: 'component-architecture', name: 'Component Architecture',
    description: 'Component design: composition vs inheritance, presentational vs container components, compound components, render props, higher-order components, component reusability.',
    category: 'frameworks-libraries', level: 0,
  },
  'framework-ecosystem': {
    id: 'framework-ecosystem', name: 'Framework Ecosystem',
    description: 'React ecosystem: React Router, Next.js basics, component libraries (MUI, Chakra, Shadcn), form libraries (React Hook Form, Formik), testing library.',
    category: 'frameworks-libraries', level: 0,
  },
  // CSS & styling
  'css-layouts': {
    id: 'css-layouts', name: 'CSS Layouts',
    description: 'Flexbox, CSS Grid, responsive design techniques, container queries, intrinsic sizing, layout patterns, multi-column layouts.',
    category: 'css-styling', level: 0,
  },
  'css-architecture': {
    id: 'css-architecture', name: 'CSS Architecture',
    description: 'CSS methodology: BEM, CSS Modules, CSS-in-JS (styled-components, Emotion), Tailwind utility-first, design tokens, theming, design systems.',
    category: 'css-styling', level: 0,
  },
  'responsive-design': {
    id: 'responsive-design', name: 'Responsive & Adaptive Design',
    description: 'Mobile-first design, responsive breakpoints, fluid typography, responsive images (srcset, picture), touch targets, adaptive layouts.',
    category: 'css-styling', level: 0,
  },
  'animations': {
    id: 'animations', name: 'Animations & Transitions',
    description: 'CSS transitions, keyframe animations, animation performance (transform, opacity), easing functions, animation libraries (Framer Motion, GSAP), reduced motion.',
    category: 'css-styling', level: 0,
  },
  // Web essentials
  'web-performance-core': {
    id: 'web-performance-core', name: 'Web Performance Core',
    description: 'Core Web Vitals (LCP, FID/INP, CLS), performance budgeting, code splitting, lazy loading, image optimization, bundle analysis, caching strategies.',
    category: 'web-essentials', level: 0,
  },
  'seo-fundamentals': {
    id: 'seo-fundamentals', name: 'SEO Fundamentals',
    description: 'On-page SEO: meta tags, semantic HTML, structured data (JSON-LD), sitemaps, robots.txt, canonical URLs, Open Graph, Twitter cards.',
    category: 'web-essentials', level: 0,
  },
  'web-security-basics': {
    id: 'web-security-basics', name: 'Web Security Basics',
    description: 'XSS, CSRF, CORS, content security policy (CSP), sanitization, secure cookies, HTTPS, OAuth basics, security headers.',
    category: 'web-essentials', level: 0,
  },
  'web-standards': {
    id: 'web-standards', name: 'Web Standards & APIs',
    description: 'Modern Web APIs: Fetch, Intersection Observer, Resize Observer, Notification, Geolocation, Clipboard, File API, Web Components basics.',
    category: 'web-essentials', level: 0,
  },
  // Testing
  'frontend-testing': {
    id: 'frontend-testing', name: 'Frontend Testing',
    description: 'Component testing, integration testing, E2E testing (Cypress, Playwright), React Testing Library, mocking, test strategy for frontend.',
    category: 'testing', level: 0,
  },
  'testing-strategies': {
    id: 'testing-strategies', name: 'Testing Strategies',
    description: 'Testing pyramid for frontend, what to test (behavior vs implementation), visual regression testing, accessibility testing, performance testing basics.',
    category: 'testing', level: 0,
  },
  // Performance optimization
  'performance-profiling': {
    id: 'performance-profiling', name: 'Performance Profiling',
    description: 'Chrome DevTools Performance panel, Lighthouse, WebPageTest, profiling React renders (React DevTools), identifying bottlenecks, flame charts.',
    category: 'performance-optimization', level: 0,
  },
  'bundle-optimization': {
    id: 'bundle-optimization', name: 'Bundle Optimization',
    description: 'Code splitting strategies, tree shaking, dynamic imports, bundle analysis (webpack-bundle-analyzer), reducing bundle size, lazy loading routes/components.',
    category: 'performance-optimization', level: 0,
  },
  'render-optimization': {
    id: 'render-optimization', name: 'Render Optimization',
    description: 'React rendering optimization: memo, useMemo, useCallback, virtualization (react-window), avoiding unnecessary re-renders, selective hydration.',
    category: 'performance-optimization', level: 0,
  },
  // Accessibility
  'aria-advanced': {
    id: 'aria-advanced', name: 'Advanced ARIA',
    description: 'Complex ARIA patterns: dialogs, tabs, menus, autocomplete, sliders, live regions, aria-live, role composition, testing with screen readers.',
    category: 'accessibility', level: 0,
  },
  'a11y-testing': {
    id: 'a11y-testing', name: 'Accessibility Testing',
    description: 'Automated accessibility testing (axe, eslint-plugin-jsx-a11y), manual testing with screen readers (NVDA, VoiceOver, JAWS), accessibility audit process.',
    category: 'accessibility', level: 0,
  },
  // Collaboration
  'design-handoff': {
    id: 'design-handoff', name: 'Design Handoff & Collaboration',
    description: 'Working with designers: design systems, Figma-to-code workflow, design tokens, component mapping, design reviews, implementing designs with fidelity.',
    category: 'collaboration', level: 0,
  },
  'frontend-code-review': {
    id: 'frontend-code-review', name: 'Frontend Code Review',
    description: 'Reviewing frontend code: markup semantics, accessibility, performance, styling, component design, testing. Giving constructive feedback.',
    category: 'collaboration', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'frontend-fundamentals', name: 'Frontend Fundamentals', description: 'Core web technologies: HTML, CSS, JavaScript, browser', skills: ['html-semantics', 'css-core', 'javascript-dom', 'browser-essentials', 'accessibility-standards'], weight: 22 },
  { id: 'frameworks-libraries', name: 'Frameworks & Libraries', description: 'React and ecosystem: concepts, state management, component architecture', skills: ['react-concepts', 'state-management', 'component-architecture', 'framework-ecosystem'], weight: 22 },
  { id: 'css-styling', name: 'CSS & Styling', description: 'CSS layout, architecture, responsive design, animations, theming', skills: ['css-layouts', 'css-architecture', 'responsive-design', 'animations'], weight: 16 },
  { id: 'web-essentials', name: 'Web Essentials', description: 'Performance, SEO, security, web standards and APIs', skills: ['web-performance-core', 'seo-fundamentals', 'web-security-basics', 'web-standards'], weight: 14 },
  { id: 'testing', name: 'Testing', description: 'Frontend testing: component, integration, E2E, test strategy', skills: ['frontend-testing', 'testing-strategies'], weight: 10 },
  { id: 'performance-optimization', name: 'Performance Optimization', description: 'Profiling, bundle optimization, render optimization', skills: ['performance-profiling', 'bundle-optimization', 'render-optimization'], weight: 8 },
  { id: 'accessibility', name: 'Accessibility', description: 'WCAG, ARIA, screen reader testing, a11y audit', skills: ['aria-advanced', 'a11y-testing'], weight: 6 },
  { id: 'collaboration', name: 'Collaboration', description: 'Design handoff, code review, teamwork', skills: ['design-handoff', 'frontend-code-review'], weight: 2 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Frontend Engineer', minLevel: 0, expected: { 'frontend-fundamentals': 1, 'frameworks-libraries': 1, 'css-styling': 1, 'web-essentials': 1, testing: 1, 'performance-optimization': 1, accessibility: 1, collaboration: 1 }, description: 'Entry-level. Building UI components under guidance. Learning framework and CSS. Focusing on fundamentals and clean code.' },
  { title: 'Frontend Engineer', minLevel: 2, expected: { 'frontend-fundamentals': 2, 'frameworks-libraries': 2, 'css-styling': 2, 'web-essentials': 2, testing: 2, 'performance-optimization': 2, accessibility: 2, collaboration: 2 }, description: 'Core role. Building features independently. Writing tests. Considering performance and accessibility. Collaborating with designers.' },
  { title: 'Senior Frontend Engineer', minLevel: 3, expected: { 'frontend-fundamentals': 3, 'frameworks-libraries': 3, 'css-styling': 3, 'web-essentials': 3, testing: 3, 'performance-optimization': 3, accessibility: 3, collaboration: 3 }, description: 'Operates independently. Owns complex features. Mentors juniors. Makes architectural decisions. Strong in performance and accessibility.' },
  { title: 'Lead Frontend Engineer', minLevel: 4, expected: { 'frontend-fundamentals': 3, 'frameworks-libraries': 4, 'css-styling': 4, 'web-essentials': 3, testing: 3, 'performance-optimization': 4, accessibility: 3, collaboration: 4 }, description: 'Technical leader for frontend. Sets patterns and standards. Drives component library/design system. Balances tech with mentorship.' },
  { title: 'Principal Frontend Engineer', minLevel: 5, expected: { 'frontend-fundamentals': 4, 'frameworks-libraries': 5, 'css-styling': 5, 'web-essentials': 4, testing: 4, 'performance-optimization': 5, accessibility: 4, collaboration: 5 }, description: 'Senior technical leader across multiple teams. Sets frontend architecture. Drives technical strategy. Recognized expert.' },
  { title: 'Frontend Architect', minLevel: 5, expected: { 'frontend-fundamentals': 4, 'frameworks-libraries': 5, 'css-styling': 5, 'web-essentials': 4, testing: 4, 'performance-optimization': 5, accessibility: 4, collaboration: 5 }, description: 'Architect for frontend systems. Evaluates technology choices. Sets long-term direction. Balances technical excellence with business needs.' },
  { title: 'Frontend Engineering Manager', minLevel: 5, expected: { 'frontend-fundamentals': 3, 'frameworks-libraries': 3, 'css-styling': 3, 'web-essentials': 3, testing: 2, 'performance-optimization': 3, accessibility: 2, collaboration: 5 }, description: 'People manager for frontend team. Hires, develops, manages engineers. Balances people leadership with technical guidance.' },
  { title: 'Director of Frontend', minLevel: 6, expected: { 'frontend-fundamentals': 3, 'frameworks-libraries': 3, 'css-styling': 2, 'web-essentials': 2, testing: 2, 'performance-optimization': 3, accessibility: 2, collaboration: 6 }, description: 'Leads multiple frontend teams. Sets frontend strategy. Manages managers. Focus on organizational effectiveness and quality.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
