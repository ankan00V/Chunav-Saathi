# 🗳️ Chunav Saathi Metaverse
### *Master India's Democracy in 3D*

**Chunav Saathi** is an immersive, gamified civic education platform designed to combat voter apathy among India's youth. By transforming the complex processes of the Election Commission of India (ECI) into a 3D "Metaverse" experience, we make civic duty an epic quest.

---

## 🌟 Key Features
- **Immersive 3D Anchors**: Integrated high-fidelity models of the Ashoka Chakra, Gateway of India, and other national monuments using **Google Model Viewer** and Sketchfab.
- **Strategic Civic Journey**: 6 interactive levels covering everything from ECI's Article 324 to the final government formation.
- **Bharat Experience Center**: A 3D museum exhibit showcasing India's architectural legacy as a backdrop for civic pride.
- **Dynamic Gamification**: Earn XP, collect badges (like 'Constitution Champ' and 'Nota Ninja'), and climb the ranks from 'Naya Voter' to 'Chunav Champion'.
- **Real-Time Data**: Strategic stats on India's 970M+ voters and 1M+ polling stations to highlight the scale of the world's largest democracy.

---

## 🛠️ Technology Stack
- **Frontend**: React (Vite) + TypeScript
- **3D Rendering**: Google `<model-viewer>` + Sketchfab Embed API
- **Styling**: Vanilla CSS3 (Glassmorphism, Parallax Particles, Nebula Atmospheric Effects)
- **Animations**: Intersection Observer API + CSS Keyframes + Cubic Bezier Curves
- **Optimization**: Lazy-loading iframes, Asset compression, ARIA-standard accessibility

---

## 🏆 Hackathon Evaluation Compliance

### 1. Code Quality
- **Modular Component Architecture**: Decoupled game logic, UI components, and 3D rendering.
- **Type Safety**: Fully typed with TypeScript to ensure runtime stability.

### 2. Efficiency
- **Asset Optimization**: Implemented `loading="lazy"` for all heavy 3D assets.
- **Render Performance**: Used Intersection Observers to trigger animations only when in-viewport, reducing CPU overhead.

### 3. Accessibility (ARIA)
- Full ARIA suite: `aria-label`, `role="tooltip"`, `aria-haspopup`, and `aria-hidden` tags across all 3D viewers and interactive elements.
- High-contrast Glassmorphism for readability.

### 4. Google Services
- **Google Model Viewer**: Powering the high-performance Ashoka Chakra hero anchor.
- **Google Fonts**: Utilizing 'Baloo 2' and 'Inter' for a professional, premium aesthetic.

---

## 🚀 Vision
"Every Vote is a Voice, Every Voice is a Superpower." Chunav Saathi aims to be the digital bridge that connects the 18M+ first-time voters to the heart of Indian democracy.

---
*Created for India's Civic Adventure Hackathon 2024*
