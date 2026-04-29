import { useState, useEffect, useRef } from 'react';
import { generateQuizData } from '../utils/ai_agent';
import '../index.css';

// ---- DATA ----
const PHASES = [
  {
    id: 'eci', name: 'ECI — The Guardians', icon: '⚖️', xp: 150,
    color: '#FF6B00', bg: 'rgba(255,107,0,0.15)', shadow: 'rgba(255,107,0,0.25)', glow: 'rgba(255,107,0,0.12)',
    badge: { emoji: '⚖️', label: 'ECI Expert' },
    info: {
      body: `The <strong>Election Commission of India (ECI)</strong> is a constitutional body that runs all elections in India. Founded in <strong>1950</strong>, it is completely independent of the government — no minister can give it orders!\n\nThe ECI announces election dates, enforces the <strong>Model Code of Conduct (MCC)</strong> once elections are declared, transfers officials who are biased, and can even cancel elections in case of violence. The MCC kicks in the moment elections are announced and freezes government announcements of new schemes.`,
      pills: ['Founded: Jan 25, 1950', 'Article 324 of Constitution', '3 Commissioners', 'Model Code of Conduct', 'CEC Cannot Be Removed Easily'],
      steps: [
        { title: "Press Conference", desc: "ECI announces the official dates for polling and counting." },
        { title: "MCC Enforcement", desc: "Model Code of Conduct kicks in instantly. No new govt schemes!" },
        { title: "Observer Deployment", desc: "IAS/IPS officers sent as impartial observers to districts." }
      ]
    },
    quiz: [
      { q: '🏛️ Which article of the Indian Constitution establishes the Election Commission?', opts: ['Article 256', 'Article 324', 'Article 370', 'Article 44'], ans: 1, explain: 'Article 324 of the Constitution vests the superintendence, direction, and control of elections in the ECI.' },
      { q: '📅 When was the Election Commission of India established?', opts: ['1947', '1949', '1950', '1952'], ans: 2, explain: 'The ECI was established on January 25, 1950, the day before India became a republic.' },
      { q: '🚫 What is the MODEL CODE OF CONDUCT?', opts: ['A dress code for MPs', 'Rules governing election campaigns & govt conduct', 'A code for the media', 'A voter registration guide'], ans: 1, explain: 'The MCC is a set of guidelines that political parties and government must follow once elections are announced. It prevents misuse of state resources.' },
      { q: '👑 Who can remove the Chief Election Commissioner?', opts: ['The President alone', 'Parliament via impeachment process', 'The Prime Minister', 'The Supreme Court'], ans: 1, explain: 'The CEC can only be removed by Parliament through an impeachment process, similar to removing a Supreme Court judge — ensuring independence.' },
    ]
  },
  {
    id: 'register', name: 'Voter Registration', icon: '📋', xp: 150,
    color: '#FFB800', bg: 'rgba(255,184,0,0.15)', shadow: 'rgba(255,184,0,0.25)', glow: 'rgba(255,184,0,0.12)',
    badge: { emoji: '🗳️', label: 'Registered Voter' },
    info: {
      body: `To vote in India, you must be on the <strong>Electoral Roll</strong>. You register using <strong>Form 6</strong> on the NVSP portal (nvsp.in) or the Voter Helpline App. You need to be <strong>18 years old</strong> on the qualifying date (January 1st of the year).\n\nOnce registered, you get an <strong>Elector Photo Identity Card (EPIC)</strong> — your Voter ID! If you move, file <strong>Form 8</strong> to update your address. You can also vote without a Voter ID using 12 alternative IDs like Aadhaar, PAN card, or passport.`,
      pills: ['Age: 18+', 'Form 6: New Registration', 'Form 8: Address Change', 'NVSP Portal', 'EPIC (Voter ID Card)', '12 Alternate ID Proofs'],
      steps: [
        { title: "Check Eligibility", desc: "Must be 18+ on Jan 1st and an Indian citizen." },
        { title: "Submit Form 6", desc: "Apply online via NVSP or offline with BLO." },
        { title: "BLO Verification", desc: "Booth Level Officer verifies your address." },
        { title: "EPIC Issued", desc: "Receive your Voter ID card via speed post!" }
      ]
    },
    quiz: [
      { q: '📋 Which FORM is used for new voter registration in India?', opts: ['Form 1', 'Form 6', 'Form 9', 'Form 17'], ans: 1, explain: 'Form 6 is the application form for inclusion of name in the electoral roll for new voters.' },
      { q: '🎂 What is the minimum age to vote in Indian elections?', opts: ['16 years', '18 years', '21 years', '25 years'], ans: 1, explain: 'You must be 18 years old on the qualifying date (January 1st of the election year) to be eligible to vote.' },
      { q: '🌐 What does NVSP stand for?', opts: ['National Voter Service Portal', 'National Voting System Protocol', 'New Voter Survey Program', 'National Vote Submission Process'], ans: 0, explain: 'NVSP stands for National Voter Service Portal (nvsp.in) — the official ECI portal for voter registration and services.' },
      { q: '🆔 What is the EPIC card?', opts: ['An Election Commission Penalty Identification Card', 'Elector Photo Identity Card (Voter ID)', 'Emergency Poll Identity Certificate', 'Electronic Poll Information Card'], ans: 1, explain: 'EPIC stands for Elector Photo Identity Card — your voter ID issued by the ECI.' },
    ]
  },
  {
    id: 'nomination', name: 'Nomination & Campaign', icon: '🎤', xp: 150,
    color: '#FF7EB9', bg: 'rgba(255,126,185,0.15)', shadow: 'rgba(255,126,185,0.25)', glow: 'rgba(255,126,185,0.12)',
    badge: { emoji: '📜', label: 'Constitution Champ' },
    info: {
      body: `To contest a Lok Sabha election, a candidate must be a <strong>citizen of India, at least 25 years old</strong>, and mentally sound. They file a <strong>nomination paper</strong> with the Returning Officer along with a <strong>security deposit (₹25,000</strong> for general seats).\n\nCandidates must submit an <strong>affidavit</strong> declaring criminal records, assets, and education. Party candidates get their party's <strong>election symbol</strong> (like BJP's Lotus or Congress's Hand). Independents get a symbol from the ECI's free list. Campaign spending limits: <strong>₹95 lakh</strong> per Lok Sabha constituency!`,
      pills: ['Age: Min 25 (Lok Sabha)', 'Security Deposit: ₹25,000', 'Affidavit: Criminal & Assets', 'Campaign Limit: ₹95 Lakh', 'Model Code of Conduct', 'NOTA: "None of the Above"'],
      steps: [
        { title: "Notification", desc: "President issues formal election notification." },
        { title: "Filing Nomination", desc: "Candidates submit papers to Returning Officer (RO)." },
        { title: "Scrutiny", desc: "RO checks if papers & affidavits are valid." },
        { title: "Campaign Trail", desc: "2 weeks of rallies, ending 48 hours before voting." }
      ]
    },
    quiz: [
      { q: '👤 What is the MINIMUM AGE to contest a Lok Sabha election?', opts: ['18 years', '21 years', '25 years', '30 years'], ans: 2, explain: 'A candidate must be at least 25 years old to contest Lok Sabha (lower house) elections. For Rajya Sabha, it is 30 years.' },
      { q: '💰 What is the security deposit for a GENERAL category Lok Sabha candidate?', opts: ['₹10,000', '₹25,000', '₹50,000', '₹1,00,000'], ans: 1, explain: 'General category candidates must deposit ₹25,000 (SC/ST candidates pay ₹12,500). The deposit is forfeited if they get less than 1/6th of votes polled.' },
      { q: '📄 What must a candidate DECLARE in their affidavit?', opts: ['Their religion only', 'Assets, criminal record & education', 'Their party loyalty pledge', 'Their future policy promises'], ans: 1, explain: 'Candidates must declare criminal antecedents, movable/immovable assets & liabilities, and educational qualifications in a sworn affidavit.' },
      { q: '🚫 What does NOTA stand for on the EVM?', opts: ['None of the Authorities', 'Not On The Agenda', 'None of the Above', 'No Official Tally Available'], ans: 2, explain: 'NOTA (None of the Above) lets voters reject all candidates. Introduced in 2013 after a Supreme Court order — a powerful democratic tool!' },
    ]
  },
  {
    id: 'polling', name: 'Polling Day', icon: '🗳️', xp: 200,
    color: '#4BDB85', bg: 'rgba(75,219,133,0.12)', shadow: 'rgba(75,219,133,0.2)', glow: 'rgba(75,219,133,0.1)',
    badge: { emoji: '🏛️', label: 'Lok Sabha Legend' },
    info: {
      body: `On polling day, you visit your assigned <strong>polling booth</strong> with your Voter ID (or any of 12 alternate IDs). Your name is verified in the electoral roll. You then vote on an <strong>Electronic Voting Machine (EVM)</strong> — a tamper-proof device used since 2004 in all Indian elections.\n\nAfter pressing your candidate's button, a paper slip prints in the <strong>VVPAT (Voter Verifiable Paper Audit Trail)</strong> machine so you can verify your vote was registered correctly. Your left index finger is marked with <strong>indelible ink</strong> that lasts 2-3 weeks!`,
      pills: ['EVM: Electronic Voting Machine', 'VVPAT: Paper Audit Trail', 'Indelible Ink: Left Index Finger', '543 Lok Sabha Constituencies', 'Booth Agents: Party Representatives', 'Presiding Officer: In Charge'],
      steps: [
        { title: "Mock Poll", desc: "Agents run a 50-vote mock test at 5:30 AM before voting starts." },
        { title: "Verification", desc: "Officer checks your ID and finds your name in the roll." },
        { title: "Inking", desc: "Indelible ink applied to left index finger." },
        { title: "Casting Vote", desc: "Press EVM button, hear the 'BEEP', and verify VVPAT slip!" }
      ]
    },
    quiz: [
      { q: '🖥️ When were EVMs first used in ALL Indian general elections?', opts: ['1998', '2000', '2004', '2009'], ans: 2, explain: 'EVMs were used in all constituencies for the first time in the 2004 Lok Sabha elections. They replaced paper ballots across India.' },
      { q: '📜 What does VVPAT stand for?', opts: ['Voter Verified Poll Audit Tracker', 'Voter Verifiable Paper Audit Trail', 'Verified Voting Protocol And Tracking', 'Voter Validation Paper And Tallying'], ans: 1, explain: 'VVPAT stands for Voter Verifiable Paper Audit Trail — it prints a paper slip showing who you voted for, which you can see for 7 seconds.' },
      { q: '💜 On which finger is indelible ink applied when you vote?', opts: ['Right thumb', 'Right index finger', 'Left index finger', 'Any finger'], ans: 2, explain: 'Indelible (permanent) ink is applied on the left index finger to prevent double voting. It stays for 2-3 weeks!' },
      { q: '🏛️ How many Lok Sabha constituencies are there in India?', opts: ['420', '500', '543', '600'], ans: 2, explain: 'There are 543 constituencies in the Lok Sabha (House of the People). Each elects one MP in a First-Past-The-Post system.' },
    ]
  },
  {
    id: 'counting', name: 'Vote Counting', icon: '📊', xp: 150,
    color: '#6EC6FF', bg: 'rgba(110,198,255,0.12)', shadow: 'rgba(110,198,255,0.2)', glow: 'rgba(110,198,255,0.1)',
    badge: { emoji: '📊', label: 'NOTA Ninja' },
    info: {
      body: `Counting happens at designated <strong>Counting Centres</strong>, usually on a date announced by ECI after polling. EVMs are brought from strong rooms under heavy security. Counting agents of all parties are present.\n\nVotes are counted <strong>round by round</strong> for each polling station. Results stream in real-time on the ECI Results portal. A party needs <strong>272 seats</strong> (simple majority) to form the government alone. If no party reaches this, coalition negotiations begin — called a <strong>Hung Parliament</strong>!`,
      pills: ['272 seats = Simple Majority', '543 Total Lok Sabha Seats', 'Strong Room: EVM Storage', 'Round-by-Round Counting', 'Hung Parliament: No Majority', 'President Invites Largest Party'],
      steps: [
        { title: "Strong Room Opens", desc: "EVMs brought out under heavy CCTV and agent watch." },
        { title: "Postal Ballots First", desc: "Service voters & senior citizen ballots counted first." },
        { title: "EVM Rounds", desc: "EVM results declared round-by-round." },
        { title: "VVPAT Match", desc: "5 random VVPAT machines per assembly segment matched with EVM tally." }
      ]
    },
    quiz: [
      { q: '🏆 How many seats does a party need for a simple majority in the Lok Sabha?', opts: ['251', '272', '300', '321'], ans: 1, explain: 'A party needs 272 seats — more than half of 543 — to have a simple majority and form the government on its own.' },
      { q: '🔒 Where are EVMs stored between polling and counting?', opts: ['Police station', 'District Collector office', 'Strong rooms under 24/7 guard', 'Election Commission HQ'], ans: 2, explain: 'EVMs are stored in strong rooms sealed by returning officers and guarded 24/7 by central forces, with party agents allowed to camp outside.' },
      { q: '🤝 What is a HUNG PARLIAMENT?', opts: ['Parliament that meets for too long', 'When no party gets majority and coalitions form', 'A parliament with too many parties', 'When elections are cancelled'], ans: 1, explain: 'A hung parliament occurs when no single party wins 272+ seats. Coalition governments are then formed through negotiation between parties.' },
      { q: '👑 Who is invited FIRST to form the government after elections?', opts: ['The largest party by seat count', 'The party with most vote share', 'The oldest party in Parliament', 'The party the outgoing PM recommends'], ans: 0, explain: 'The President invites the party (or pre-poll alliance) with the largest number of seats to attempt to form a government and prove majority.' },
    ]
  },
  {
    id: 'govt', name: 'Government is Formed', icon: '🌟', xp: 200,
    color: '#C882FF', bg: 'rgba(200,130,255,0.12)', shadow: 'rgba(200,130,255,0.2)', glow: 'rgba(200,130,255,0.1)',
    badge: { emoji: '🌟', label: 'Chunav Champion' },
    info: {
      body: `Once a party proves majority (via floor test or letter of support), the <strong>President of India</strong> invites its leader to become the <strong>Prime Minister</strong>. The PM then selects the <strong>Council of Ministers</strong> (Cabinet).\n\nThe oath is taken at <strong>Rashtrapati Bhavan</strong>. The President administers the oath of office and secrecy. After oath-taking, the new government must present itself for a <strong>vote of confidence</strong> in Lok Sabha within 30 days. The term of the government is <strong>5 years</strong>, unless it loses majority earlier!`,
      pills: ['PM Invited by President', 'Oath at Rashtrapati Bhavan', 'Council of Ministers (Cabinet)', 'Vote of Confidence: 30 days', 'Government Term: 5 Years', 'President: Constitutional Head'],
      steps: [
        { title: "Majority Proven", desc: "Party or coalition submits letters of support to President." },
        { title: "Invitation", desc: "President formally invites the leader to form government." },
        { title: "Oath Ceremony", desc: "PM and Cabinet take oath at Rashtrapati Bhavan." },
        { title: "Floor Test", desc: "New govt proves its majority on the floor of Lok Sabha." }
      ]
    },
    quiz: [
      { q: '🏛️ Where does the Prime Minister take the oath of office?', opts: ['Parliament House', 'Supreme Court', 'Rashtrapati Bhavan', 'India Gate'], ans: 2, explain: 'The Prime Minister takes the oath of office and secrecy at Rashtrapati Bhavan (the President\'s official residence), administered by the President.' },
      { q: '⏰ Within how many days must a new government prove majority via confidence vote?', opts: ['7 days', '15 days', '30 days', '60 days'], ans: 2, explain: 'A new government must seek a vote of confidence in Lok Sabha within 30 days of being sworn in to prove it commands a majority.' },
      { q: '📅 How long is a normal Lok Sabha term?', opts: ['3 years', '4 years', '5 years', '6 years'], ans: 2, explain: 'The Lok Sabha has a term of 5 years, after which fresh elections must be held. However, it can be dissolved earlier by the President on advice of PM.' },
      { q: '🗣️ Who ADMINISTERS the oath to the Prime Minister?', opts: ['Chief Justice of India', 'Speaker of Lok Sabha', 'President of India', 'Outgoing Prime Minister'], ans: 2, explain: 'The President of India administers the oath of office and secrecy to the Prime Minister and other members of the Union Council of Ministers.' },
    ]
  }
];

const BADGES = [
  { emoji: '⚖️', label: 'ECI Expert', id: 'eci' },
  { emoji: '🗳️', label: 'Registered Voter', id: 'register' },
  { emoji: '📜', label: 'Constitution Champ', id: 'nomination' },
  { emoji: '🏛️', label: 'Lok Sabha Legend', id: 'polling' },
  { emoji: '📊', label: 'NOTA Ninja', id: 'counting' },
  { emoji: '🌟', label: 'Chunav Champion', id: 'govt' },
  { emoji: '🔥', label: 'Quiz Master', id: 'quizmaster' },
  { emoji: '🇮🇳', label: 'Democracy Hero', id: 'allclear' },
];

const RANKS = [
  { min: 0, name: 'Naya Voter 🌱' },
  { min: 200, name: 'Janata Sevak 📋' },
  { min: 400, name: 'Booth Hero 🗳️' },
  { min: 600, name: 'Neta Sahab 🎤' },
  { min: 800, name: 'Lok Nayak 🏛️' },
  { min: 1000, name: 'Chunav Champion 🌟' },
];

export default function ElectionGame() {
  const [xp, setXp] = useState(0);
  const [dp, setDp] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<'none' | 'info' | 'quiz'>('none');
  const [currentPhaseId, setCurrentPhaseId] = useState<string | null>(null);

  // Quiz state
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean, text: string } | null>(null);
  const [showCelebration, setShowCelebration] = useState<any>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [reasoningText, setReasoningText] = useState<string>("");
  const [dynamicQuiz, setDynamicQuiz] = useState<any[] | null>(null);
  const [factIdx, setFactIdx] = useState(0);

  // Intersection Observer for reveal effects
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const FUN_FACTS = [
    "🗳️ Did you know? India's first election took 4 months to complete!",
    "🗻 The highest polling station in the world is in Tashigang, Himachal Pradesh, at 15,256 ft!",
    "🐘 In 1951, the Election Commission used symbols because many voters couldn't read.",
    "🟣 The indelible ink used on your finger is made by only ONE company in Mysore!",
    "📝 NOTA (None of the Above) was introduced in India in 2013.",
    "🏃‍♂️ Election officials once trekked 40km through a jungle just for a single voter in Arunachal Pradesh!"
  ];

  // SUB-COMPONENT: Count Up Animation
  const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      }, { threshold: 1 });

      if (countRef.current) observer.observe(countRef.current);
      return () => observer.disconnect();
    }, [end, duration]);

    return <div ref={countRef}>{count.toLocaleString()}{suffix}</div>;
  };

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setFactIdx(prev => (prev + 1) % FUN_FACTS.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    // Generate stars
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
      starsContainer.innerHTML = '';
      for (let i = 0; i < 80; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * 2 + 0.5;
        s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;--dl:${-Math.random() * 4}s;`;
        starsContainer.appendChild(s);
      }
    }
  }, []);

  const currentPhase = PHASES.find(p => p.id === currentPhaseId);
  const rank = [...RANKS].reverse().find(r => dp >= r.min) || RANKS[0];

  const handleStartJourney = () => {
    document.getElementById('phases-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => openPhase('eci'), 400);
  };

  const openPhase = (id: string) => {
    setCurrentPhaseId(id);
    setActivePanel('info');
    document.getElementById('info-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startQuiz = async () => {
    setActivePanel('quiz');
    setQIdx(0);
    setAnswered(false);
    setFeedback(null);
    setDynamicQuiz(null);
    document.getElementById('quiz-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (currentPhase) {
      setIsGenerating(true);
      setReasoningText("");
      try {
        const quizList = await generateQuizData(currentPhase.name, (reasoningChunk: string) => {
          setReasoningText(prev => prev + reasoningChunk);
        });
        setDynamicQuiz(quizList);
      } catch (error) {
        console.error("Failed to generate dynamic quiz, falling back to static", error);
        setDynamicQuiz(currentPhase.quiz);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleAnswer = (idx: number) => {
    if (answered || !currentPhase) return;
    setAnswered(true);

    const activeQuiz = dynamicQuiz || currentPhase.quiz;
    const q = activeQuiz[qIdx];
    if (idx === q.ans) {
      setFeedback({ correct: true, text: '✅ Sahi jawab! <strong>Shabash!</strong> — ' + q.explain });
      setXp(prev => prev + 30);
      setDp(prev => prev + 50);
    } else {
      setFeedback({ correct: false, text: '❌ Galat hai! Sahi jawab: <strong>' + q.opts[q.ans] + '</strong> — ' + q.explain });
      setDp(prev => prev + 10);
    }
  };

  const nextQuestion = () => {
    if (!currentPhase) return;

    const activeQuiz = dynamicQuiz || currentPhase.quiz;
    if (qIdx + 1 >= activeQuiz.length) {
      // Completed Phase
      if (!completed.includes(currentPhase.id)) {
        const newCompleted = [...completed, currentPhase.id];
        setCompleted(newCompleted);
        setXp(prev => prev + currentPhase.xp);
        setDp(prev => prev + currentPhase.xp);

        let newBadges = [...earnedBadges];
        if (!newBadges.includes(currentPhase.id)) newBadges.push(currentPhase.id);
        if (newCompleted.length >= 6 && !newBadges.includes('allclear')) newBadges.push('allclear');
        if (xp + currentPhase.xp >= 600 && !newBadges.includes('quizmaster')) newBadges.push('quizmaster');

        setEarnedBadges(newBadges);
      }
      setActivePanel('none');
      setShowCelebration(currentPhase);

      // Launch Confetti
      const colors = ['#FF6B00', '#FFB800', '#0B8A3C', '#fff', '#FF7EB9', '#6EC6FF', '#C882FF', '#4BDB85'];
      for (let i = 0; i < 60; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.cssText = `
          left:${Math.random() * 100}vw;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;
          border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
          --dur:${2 + Math.random() * 2}s;
          --delay:${Math.random() * 1}s;
        `;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), (parseFloat(c.style.getPropertyValue('--dur')) + parseFloat(c.style.getPropertyValue('--delay'))) * 1000 + 500);
      }
    } else {
      setQIdx(qIdx + 1);
      setAnswered(false);
      setFeedback(null);
    }
  };

  const closeCelebration = () => {
    setShowCelebration(null);
    document.querySelectorAll('.confetti-piece').forEach(c => c.remove());
    document.getElementById('phases-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // SUB-COMPONENT: Particle Field for atmosphere
  const ParticleField = () => (
    <div className="particle-field">
      {[...Array(25)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          '--d': `${Math.random() * 10 + 15}s`,
          animationDelay: `${Math.random() * 10}s`,
          opacity: Math.random() * 0.5 + 0.1
        } as any}></div>
      ))}
    </div>
  );

  return (
    <>
      <ParticleField />
      <div className="stars" id="stars"></div>

      {/* SIDE TICKERS - Fixed to edges */}
      <div className="ticker-container left">
        <div className="ticker-track down">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="ticker-content">
              <span>VOTE FOR INDIA 🇮🇳</span>
              <span>ECI ESTD. 1950</span>
              <span>ARTICLE 324</span>
              <span>970M VOTERS</span>
              <span>1M+ STATIONS</span>
              <span>MYSORE INK</span>
              <span>NOTA POWER</span>
              <span>VVPAT READY</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ticker-container right">
        <div className="ticker-track up">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="ticker-content">
              <span>DEMOCRACY RULES 🏛️</span>
              <span>1.8Cr NEW VOTERS</span>
              <span>FIRST VOTE 1951</span>
              <span>HIGHEST BOOTH</span>
              <span>CIVIC DUTY</span>
              <span>EVM SECURE</span>
              <span>MODERN INDIA</span>
              <span>POWER TO PEOPLE</span>
            </div>
          ))}
        </div>
      </div>

      <div className="app">
        <nav className="nav">
          <div className="nav-logo">
            चुनाव साथी
            <span>Chunav Saathi</span>
          </div>
          <div className="nav-right">
            <div className="xp-pill">🏆 <span>{xp}</span> XP</div>
          </div>
        </nav>

        <div className="flag-strip"></div>

        <div className="hero">
          {/* Immersive Ambient Orbs for the "Metaverse" feel */}
          <div className="ambient-orb orb-1"></div>
          <div className="ambient-orb orb-2"></div>

          {/* 3D Ashoka Chakra - Google Model Viewer for robust rendering and top-down circular rotation */}
          <div className="chakra-deco" style={{
            width: '400px',
            height: '400px',
            pointerEvents: 'none',
            opacity: 0.35 // Visible enough to frame the text perfectly
          }}>
            {/* @ts-ignore */}
            <model-viewer
              src="/models/ashoka_chakra.glb"
              auto-rotate
              rotation-per-second="30deg"
              camera-orbit="0deg 90deg 105%"
              camera-controls={false}
              interaction-prompt="none"
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
            >
              {/* @ts-ignore */}
            </model-viewer>
          </div>

          <div className="hero-badge" style={{ position: 'relative', zIndex: 2 }}>🇮🇳 India's Civic Adventure</div>
          <h1 style={{ position: 'relative', zIndex: 2 }}>
            <span className="line1">Democracy is</span><br />
            <span className="line2">Your Superpower</span>
          </h1>
          <p className="hero-sub" style={{ position: 'relative', zIndex: 2 }}>
            Master India's election process through 6 epic levels, quizzes &amp; badges. From ECI to the ballot box — become a Chunav Champion! 🗳️
          </p>
          <button 
            className="start-btn" 
            onClick={handleStartJourney} 
            style={{ position: 'relative', zIndex: 2 }}
            aria-label="Begin Your Civic Quest"
          >
            <span className="icon" aria-hidden="true">▶</span> Begin Your Quest
          </button>
        </div>

        {/* CHAMPION STAT ORBS (REVEAL) - UPDATED FOR 2026 SCALE */}
        <div className="reveal-on-scroll" style={{
          display: 'flex', justifyContent: 'center', gap: '30px', padding: '50px 20px',
          flexWrap: 'wrap'
        }}>
          <div className="stat-orb" style={{ '--orb-color': '#FF9933', '--orb-glow': 'rgba(255,153,51,0.3)' } as any}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FF9933', marginBottom: '8px' }}>
              <CountUp end={1000} suffix="M+" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Eligible Voters (2026)</div>
          </div>

          <div className="stat-orb" style={{ '--orb-color': '#FFFFFF', '--orb-glow': 'rgba(255,255,255,0.2)' } as any}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '8px' }}>
              <CountUp end={1.2} suffix="M+" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Polling Stations</div>
          </div>

          <div className="stat-orb" style={{ '--orb-color': '#138808', '--orb-glow': 'rgba(19,136,8,0.3)' } as any}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#138808', marginBottom: '8px' }}>
              <CountUp end={25} suffix="M+" />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Gen-Z First-Timers</div>
          </div>
        </div>

        <div className="score-box">
          <div className="score-left">
            <h3>Democracy Points</h3>
            <p>{dp} DP</p>
          </div>
          <div className="score-right">
            <div className="rank">Current Rank</div>
            <div className="rank-name">{rank.name}</div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <div className="progress-label-text">Your Journey</div>
            <div className="progress-label-xp">{completed.length} / 6 Levels</div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(completed.length / 6) * 100}%` }}></div>
          </div>
        </div>

        {/* GATEWAY OF INDIA - JOURNEY ANCHOR (REVEAL) */}
        <div className="reveal-on-scroll" style={{
          width: '100%',
          height: '350px',
          marginTop: '60px',
          position: 'relative',
          overflow: 'hidden',
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <iframe
            title="Gateway of India 3D Model"
            aria-label="Interactive 3D model of the Gateway of India"
            loading="lazy"
            style={{
              width: '100%',
              height: '500px',
              marginTop: '-80px',
              border: 'none',
              filter: 'drop-shadow(0 0 30px rgba(255,153,51,0.2))',
              pointerEvents: 'auto'
            }}
            frameBorder="0"
            allowFullScreen
            src="https://sketchfab.com/models/38a652e9f3bf49039026ef65ef61ac92/embed?ui_infos=0&ui_watermark=0&ui_hint=0&transparent=1&autostart=1&dnt=1&ui_annotations=0"
          > </iframe>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            fontWeight: '900',
            textShadow: '0 0 10px rgba(255,255,255,0.2)'
          }}>
            Gateway to Civic Mastery
          </div>
        </div>

        <div className="phases-title" id="phases-grid">🗺️ Choose Your Path</div>
        <div className="journey-path">
          <div className="phases-grid">
            {PHASES.map((p, i) => {
              const done = completed.includes(p.id);
              const locked = i > 0 && !completed.includes(PHASES[i - 1].id) && !done;
              const cls = done ? 'completed' : locked ? 'locked' : 'active';
              return (
                <div key={p.id} className={`phase-card ${cls}`}
                  style={{
                    '--phase-color': p.color, '--phase-bg': p.bg,
                    '--phase-shadow': p.shadow, '--phase-glow': p.glow,
                    animationDelay: `${i * 0.08}s`
                  } as any}
                  onClick={() => !locked && openPhase(p.id)}>
                  <span className="phase-icon">{p.icon}</span>
                  <div className="phase-num" style={{ background: p.bg, color: p.color, borderColor: p.color + '40' }}>{i + 1}</div>
                  <div className="phase-name">{p.name}</div>
                  <div className="phase-desc">{p.info.pills.slice(0, 2).join(' · ')}</div>
                  {done ? <div className="phase-check">✅</div> : locked ? <div className="phase-lock">🔒</div> : <div className="phase-xp">+{p.xp} XP</div>}
                </div>
              )
            })}
          </div>
        </div>

        {activePanel === 'info' && currentPhase && (
          <div id="info-panel" style={{ display: 'block' }}>
            <div className="info-header">
              <div>
                <div className="quiz-phase-badge" style={{ background: currentPhase.bg, color: currentPhase.color, borderColor: currentPhase.color + '50' }}>
                  {currentPhase.icon} {currentPhase.name}
                </div>
                <div className="info-title" style={{ marginTop: '10px' }}>Learn: {currentPhase.name}</div>
              </div>
              <button className="quiz-close" onClick={() => setActivePanel('none')}>✕</button>
            </div>
            <div className="info-body" dangerouslySetInnerHTML={{ __html: currentPhase.info.body.replace(/\n/g, '<br><br>') }}></div>

            {/* Timeline Steps */}
            {currentPhase.info.steps && (
              <div className="phase-timeline">
                <h4 className="timeline-header">Timeline & Steps</h4>
                <div className="timeline-track">
                  {currentPhase.info.steps.map((step: any, idx: number) => (
                    <div key={idx} className="timeline-step">
                      <div className="timeline-dot" style={{ borderColor: currentPhase.color, background: currentPhase.bg }}></div>
                      <div className="timeline-content">
                        <div className="step-title" style={{ color: currentPhase.color }}>{step.title}</div>
                        <div className="step-desc">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="fact-pills">
              {currentPhase.info.pills.map((p, i) => (
                <span key={i} className={`fact-pill ${i < 2 ? 'highlight' : ''}`}>{p}</span>
              ))}
            </div>
            <button className="info-quiz-btn" onClick={startQuiz}>⚡ Take the Quiz</button>
          </div>
        )}

        {activePanel === 'quiz' && currentPhase && (
          <div id="quiz-panel" style={{ display: 'block' }}>
            <div className="quiz-header">
              <div className="quiz-phase-badge" style={{ background: currentPhase.bg, color: currentPhase.color, borderColor: currentPhase.color + '50' }}>
                {currentPhase.icon} {currentPhase.name}
              </div>
              <button className="quiz-close" onClick={() => setActivePanel('none')}>✕</button>
            </div>

            {isGenerating ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}>🧠</div>
                <h3 style={{ color: 'var(--gold)', fontFamily: "'Baloo 2', cursive" }}>Chunav Saathi is crafting your custom quiz...</h3>
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.3s ease-in-out'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <p key={factIdx} style={{
                      color: 'var(--gold)',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      marginBottom: '10px',
                      opacity: 0.8
                    }}>
                      {FUN_FACTS[factIdx]}
                    </p>
                    <p style={{
                      color: '#fff',
                      fontSize: '0.85rem',
                      margin: 0,
                      opacity: 0.6,
                      lineHeight: '1.4'
                    }}>
                      {reasoningText || "Initializing AI logic..."}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              (() => {
                const activeQuiz = dynamicQuiz || currentPhase.quiz;
                if (!activeQuiz || !activeQuiz[qIdx]) return null;
                return (
                  <>
                    <div className="quiz-progress">
                      {activeQuiz.map((_, i) => (
                        <div key={i} className={`qp-dot ${i < qIdx ? 'done' : i === qIdx ? 'current' : ''}`}></div>
                      ))}
                    </div>
                    <div className="quiz-q">{activeQuiz[qIdx].q}</div>
                    <div className="options">
                      {activeQuiz[qIdx].opts.map((o: string, i: number) => {
                        let btnCls = 'opt-btn';
                        if (answered) {
                          if (i === activeQuiz[qIdx].ans) btnCls += ' correct';
                          else if (feedback && !feedback.correct) btnCls += ' wrong';
                        }
                        return (
                          <button key={i} className={btnCls} onClick={() => handleAnswer(i)} disabled={answered}>
                            <span className="opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                            {o}
                          </button>
                        )
                      })}
                    </div>
                    {feedback && (
                      <div className={`quiz-feedback ${feedback.correct ? 'correct' : 'wrong'}`} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: feedback.text }}></div>
                    )}
                    {answered && (
                      <button className="quiz-next" style={{ display: 'inline-block' }} onClick={nextQuestion}>Next →</button>
                    )}
                  </>
                );
              })()
            )}
          </div>
        )}

        <div className="badges-section">
          <div className="badges-title">🏅 Your Badges</div>
          <div className="badges-row">
            {BADGES.map((b) => {
              const earned = earnedBadges.includes(b.id);
              return (
                <div key={b.id} className={`badge-item ${earned ? 'earned' : ''}`}>
                  <span className="badge-emoji">{b.emoji}</span>
                  <span className="badge-label">{b.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {showCelebration && (
        <div id="celebration" style={{ display: 'flex' }}>
          <div className="cel-emoji">{showCelebration.badge.emoji}</div>
          <div className="cel-title">{showCelebration.name} Mastered!</div>
          <div className="cel-sub">Badge Unlocked: "{showCelebration.badge.label}"</div>
          <div className="cel-xp">+{showCelebration.xp} XP</div>
          <button className="cel-btn" onClick={closeCelebration}>Continue →</button>
        </div>
      )}

      {/* BHARAT EXPERIENCE CENTER (REVEAL) */}
      <div className="reveal-on-scroll" style={{ padding: '0 20px', position: 'relative' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '100px auto 0',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(15px)',
          borderRadius: '32px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '40px',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          zIndex: 2
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            position: 'relative'
          }}>
            <h2 style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: '2rem',
              background: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Bharat Experience Center
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Explore India's Architectural Legacy in 3D
            </p>

          <div 
            className="info-trigger" 
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              cursor: 'help'
            }}
            aria-haspopup="true"
            aria-label="Interaction Instructions"
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'serif'
              }}
              aria-hidden="true"
            >i</div>

            <div className="info-tooltip" role="tooltip">
              <div style={{ color: '#FF9933', fontWeight: 'bold', marginBottom: '8px' }}>HOW TO INTERACT:</div>
              • 🖱️ <strong>Drag</strong> to rotate monuments<br />
              • 🔍 <strong>Scroll/Pinch</strong> to zoom in/out<br />
              • ✋ <strong>Right-Click</strong> to pan<br />
              • 🏛️ <strong>Click</strong> to focus model
            </div>
          </div>
          </div>

          <div style={{
            width: '100%',
            height: '450px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <iframe 
              title="Monuments Of India 3D Experience" 
              aria-label="3D panoramic exhibit of Indian monuments"
              loading="lazy"
              style={{ 
                width: '100%', 
                height: '600px', 
                border: 'none',
                marginTop: '-70px'
              }}
              frameBorder="0"
              allowFullScreen 
              src="https://sketchfab.com/models/8aea338cebeb4d5b9d0131a9744e958e/embed?ui_infos=0&ui_watermark=0&ui_hint=0&transparent=1&autostart=1&dnt=1&ui_annotations=0"
            > </iframe> 
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        marginTop: '100px',
        padding: '60px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: "'Baloo 2', cursive", color: '#FF9933', marginBottom: '15px', fontSize: '1.8rem' }}>Chunav Saathi Metaverse</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Combating voter apathy by gamifying civic education. Experience the journey of democracy from voter registration to government formation.
            Built for the <strong>India's Civic Adventure</strong> hackathon.
          </p>
          <div style={{ marginTop: '40px', color: '#444', fontSize: '0.8rem' }}>
            © 2026 Chunav Saathi. "Every Vote is a Voice, Every Voice is a Superpower." 🇮🇳
          </div>
        </div>
      </footer>
    </>
  );
}
