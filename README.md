# 🗳️ Chunav Saathi (चुनाव साथी)
### The Indian Election Metaverse Experience

**Chunav Saathi** is an immersive, gamified civic education platform designed to combat voter apathy in India. It transforms the complex journey of democracy into a 3D metaverse adventure, empowering citizens with the knowledge to become "Democracy Heroes."

---

## 🏛️ Challenge Vertical: Civic & Government
Our solution focuses on the **Civic Education & Voter Engagement** persona. It targets first-time voters (Gen-Z) and citizens seeking a deeper, more engaging way to understand the ECI (Election Commission of India) framework.

---

## 🧠 Approach & Logic

### 1. Hybrid AI Architecture (NVIDIA + Google)
To balance lightning-fast response times with high-fidelity civic accuracy, we implemented a hybrid model router:
- **NVIDIA NIM (Llama 3.2 3B):** Powers the core "Chunav Saathi" chat guide for instant, punchy conversational responses.
- **NVIDIA NIM (Llama 3.1 8B):** Generates dynamic, topic-specific MCQs for the gamified learning path.
- **Google Gemini 1.5 Flash:** Acts as the **Specialized High-Fidelity Fact-Checker**. It provides "Expert Deep-Dives" on complex constitutional topics, ensuring the highest reliability for sensitive civic information.

### 2. Gamified Progression Logic
The app uses a 6-phase "Civic Quest":
- **ECI Guardians** → **Registration** → **Nomination** → **Polling** → **Counting** → **Government Formation**.
- Users earn **XP (Experience Points)** and unlock **Badges** for each mastered level.
- **Dynamic Quiz Generation:** Unlike static apps, our AI generates custom quizzes based on the current level, ensuring a unique learning experience every time.

---

## 🛠️ How it Works

### ✨ Immersive Metaverse UI
- **3D Interactive Monuments:** Integrated Google's `<model-viewer>` for high-performance 3D rendering of Indian architectural landmarks (Ashoka Chakra, Gateway of India).
- **Particle & Star Fields:** A cinematic backdrop built with optimized CSS animations to minimize CPU load while maintaining a premium feel.
- **Real-time Stat Pulse:** Live-pulsing statistics (Eligible Voters, Polling Stations) simulate a "living" democratic database.

### 🗳️ Core Features
- **AI Chat Guide:** A Hindi-English (Hinglish) speaking AI that explains election laws in simple, celebratory terms.
- **Interactive Timeline:** Visualizes the chronological steps of an election, from the Model Code of Conduct to the Vote of Confidence.
- **Accessibility First:** Fully ARIA-compliant navigation, "Skip to Content" support, and high-contrast visuals for inclusive civic engagement.

---

## 🌐 Google Services Integration
This project leverages the Google ecosystem to ensure production-grade quality:
1.  **Google Gemini AI:** Specialized deep-dive analysis and parallel reasoning for quiz facts.
2.  **Google Analytics (gtag):** Integrated real-time traffic monitoring and user engagement tracking.
3.  **Google Fonts:** Utilizing `Baloo 2` and `Outfit` for a modern, culturally resonant aesthetic.
4.  **Google Model-Viewer:** For robust, cross-platform 3D rendering of civic monuments.

---

## 📝 Assumptions & Constraints
- **Data Period:** The app assumes a 2026 electoral landscape to align with future-ready civic initiatives.
- **Connectivity:** Assumes active API access for NVIDIA and Google endpoints (local fallback logic is included for resilience).
- **Security:** API keys are managed via environment variables to ensure safe, responsible implementation.

---

## 🚀 Getting Started

1. **Clone the repo:** `git clone [repository-url]`
2. **Setup Environment:** Create a `.env.local` with your `VITE_LMA_API_KEY`, `VITE_KIMI_API_KEY`, and `VITE_GEMINI_API_KEY`.
3. **Install & Run:**
   ```bash
   npm install
   npm run dev
   ```

---

**Jai Hind! Mera Vote, Meri Awaaz! 🇮🇳**
