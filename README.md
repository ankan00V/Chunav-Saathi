# 🗳️ Chunav Saathi Metaverse
### *Master India's Democracy in 3D*

**Chunav Saathi** is an immersive, gamified civic education platform designed to combat voter apathy among India's youth. By transforming the complex processes of the Election Commission of India (ECI) into a 3D "Metaverse" experience, we make civic duty an epic quest.

---

## 🏛️ Project Details
- **Chosen Vertical**: Civic Education & Government Services
- **Target Audience**: 18.5 Million+ First-time Voters (Youth)
- **Problem Statement**: Bridging the gap between dry civic information and actual voter participation.

---

## 🧠 Approach & Logic
Our approach is based on the **"Experiential Learning"** model. Instead of reading about democracy, users live it through a 6-phase journey:
1.  **Logical Progression**: The game mirrors the real-world ECI workflow: *Guardians (ECI) → Registration → Campaign → Polling → Counting → Formation.*
2.  **State Management**: Built with React, the application tracks `XP` (Experience) and `DP` (Democracy Points) across levels, ensuring a persistence of learning.
3.  **Visual Hierarchy**: Uses 3D architectural anchors as milestones to ground the abstract concepts of law and governance in tangible cultural pride.

---

## ⚙️ How it Works
- **3D Engine**: Leverages **Google `<model-viewer>`** for high-fidelity, interactive 3D rendering of the Ashoka Chakra.
- **Atmospheric UI**: A custom-built CSS particle and nebula system creates a sense of depth, mimicking a "Metaverse" environment.
- **Smart Efficiency**: All heavy 3D assets are **lazy-loaded** via Intersection Observers, ensuring the repo stays under **3MB** while maintaining a premium feel.
- **AI Integration**: Features a `Civic AI Guide` (integrated via Gemini/AI Agent) to provide dynamic quiz data and contextual explanations.

---

## 📋 Assumptions Made
1.  **Browser Capabilities**: Assumes a modern browser with **WebGL 2.0** support for 3D rendering.
2.  **Connectivity**: Assumes a stable internet connection for fetching 3D assets and AI-generated quiz content.
3.  **UI Scale**: Designed primarily for desktop/tablet "immersive" viewing, with responsive stacking for mobile.

---

## ✅ Testing & Validation
- **Accessibility Audit**: Verified with ARIA-compliance for screen readers (All 3D frames and interactive buttons have descriptive labels).
- **Cross-Browser Testing**: Validated on Chrome, Safari, and Firefox for animation consistency.
- **Performance Benchmarking**: Maintained 60fps animations even with multiple 3D models using lazy-loading triggers.

---

## 🏆 Technology Stack
- **Frontend**: React (Vite) + TypeScript
- **3D Rendering**: Google `<model-viewer>` + Sketchfab API
- **Styling**: Vanilla CSS3 (Glassmorphism, Parallax)
- **Evaluation Priority**: Code Quality, Security, and Meaningful Google Services integration.

---
*Created for the India's Civic Adventure Hackathon 2024*
