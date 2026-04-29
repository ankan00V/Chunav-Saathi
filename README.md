# 🗳️ Chunav Saathi (चुनाव साथी)
### The Indian Election Metaverse Experience

**Chunav Saathi** is an immersive, gamified civic education platform designed to combat voter apathy in India. It transforms the complex journey of democracy into a 3D metaverse adventure, empowering citizens with the knowledge to become "Democracy Heroes."

---

## 🏛️ Challenge Vertical: Civic & Government
Our solution focuses on the **Civic Education & Voter Engagement** persona. It targets first-time voters (Gen-Z) and citizens seeking a deeper, more engaging way to understand the ECI (Election Commission of India) framework.

---

## 🏗️ Technical Excellence (Senior Level Refactor)

### 1. Code Quality & Modularity
- **Atomic Component Architecture:** Extracted complex logic (CountUp, ParticleField) into independent, reusable UI components.
- **Strict TypeScript Implementation:** Eliminated `any` types across the codebase, implementing strict interfaces for all data structures (Phases, Badges, Quiz items).
- **Clean Code Principles:** Follows industry-standard patterns for modularity, readability, and maintainable state management.

### 2. Efficiency & Performance
- **Main-Thread Optimization:** Offloaded heavy animations to CSS GPU-accelerated transforms and `requestAnimationFrame`.
- **Hybrid AI Routing:** Optimized latency by using NVIDIA NIM (Llama 3.2/3.1) for real-time interaction and Google Gemini for deep asynchronous analysis.
- **Lazy Loading:** All heavy 3D assets and iframes utilize `loading="lazy"` to ensure an instant First Contentful Paint (FCP).

### 3. Testing & Validation
- **Vitest Suite:** Implemented a full unit testing suite for the AI Agent and UI components.
- **Mocked AI Integration:** Tests include robust mocks for both Google Gemini and OpenAI (NVIDIA) clients to ensure stable CI/CD pipelines.
- **Deployment Ready:** Validated with a clean production build (`tsc -b && vite build`) passing all strict linting rules.

### 4. Accessibility (A11y)
- **Inclusive Design:** Exceeds WCAG standards with full ARIA roles, semantic HTML5 structure (`main`, `section`, `header`, `footer`), and high-contrast color palettes.
- **Keyboard Navigation:** Fully navigable via keyboard, featuring a "Skip to Content" accessibility link and clear focus indicators.

---

## 🌐 Google Services Integration
This project leverages the Google ecosystem to ensure production-grade quality:
1.  **Google Gemini AI:** Specialized deep-dive analysis and high-fidelity fact-checking for sensitive civic data.
2.  **Google Analytics (G-6LVZWYH94J):** Integrated for real-time traffic monitoring and user behavior analysis.
3.  **Google Fonts:** Utilizing `Baloo 2`, `Inter`, and `Outfit` for a premium, accessible typography system.
4.  **Google Model-Viewer:** For high-performance, cross-platform 3D rendering of Indian monuments.

---

## 📝 Approach & Logic
- **Chosen Vertical:** Civic Education & Voter Engagement.
- **Logic:** Combines 3D spatial exploration with AI-driven pedagogical quizzes to maximize knowledge retention.
- **Assumptions:** Targeted at the 2026 electoral landscape; assumes modern browser support for 3D/ESM.

---

## 🚀 Getting Started

1. **Clone & Install:**
   ```bash
   git clone [repository-url]
   npm install
   ```
2. **Environment Variables (.env.local):**
   ```env
   VITE_LMA_API_KEY=your_nvidia_key
   VITE_KIMI_API_KEY=your_llama_key
   VITE_GEMINI_API_KEY=your_google_key
   ```
3. **Run:** `npm run dev` | **Test:** `npm test`

---

**Jai Hind! Mera Vote, Meri Awaaz! 🇮🇳**
