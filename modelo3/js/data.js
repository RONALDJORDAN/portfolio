// ==========================================================================
// PORTFOLIO MODELO 3 - DATA CONFIGURATION
// Jordan Ronald - Software Architect & UI/UX Creative Engineer
// ==========================================================================

const portfolioData = {
  profile: {
    name: "Jordan Ronald",
    brand: "InnovCore-TI",
    role: "Full-Stack Engineer & Software Architect",
    specialty: "UI/UX Architecture • C# .NET 8 • Pure C • RPA & Vision",
    experienceYears: "3+",
    location: "Brazil (Available Globally)",
    status: "Open to High-Impact Opportunities",
    email: "ronaldjordan.dev@gmail.com",
    github: "https://github.com/RONALDJORDAN",
    linkedin: "https://linkedin.com/in/ronald-jordan-dev",
    whatsapp: "https://wa.me/5500000000000",
    resume: "assets/curriculo.pdf",
    tagline: "Bridging the chasm between raw low-level performance and fluid, human-centric UI/UX design.",
    stats: [
      { number: "3+", label: "Years Exp" },
      { number: "0-Leak", label: "Pure C Memory" },
      { number: "100%", label: "Async .NET 8" },
      { number: "60 FPS", label: "Silky Smooth UX" }
    ]
  },

  projects: [
    {
      id: "innovrpa",
      category: "rpa",
      title: "INNOVRPA",
      subtitle: "Hybrid Zero-Leak RPA & Vision Engine",
      tag: "Robotics & Computer Vision",
      year: "2025",
      accent: "#10b981",
      image: "assets/projects/innovrpa.jpg",
      repo: "https://github.com/RONALDJORDAN/Inno-RPA",
      overview: "Next-gen robotic automation engine merging pure C memory efficiency with C# WPF .NET 8 and Vision7 computer vision pipelines for zero-latency automation.",
      problem: "Traditional RPA platforms suffer from heavy memory footprints, sluggish image processing, and flaky UI interactions under heavy enterprise loads.",
      solution: "Engineered a hybrid core: Pure C micro-engine for zero-latency pointer scanning and OpenCV pipelines, hooked into a reactive C# WPF interface using MVVM patterns.",
      stack: ["Pure C", "C# .NET 8", "WPF", "OpenCV", "Vision7", "Win32 API"],
      metrics: ["Zero memory leaks over 72h continuous load", "4.2x faster OCR detection", "100% async pipeline"]
    },
    {
      id: "innovstock",
      category: "cloud",
      title: "INNOVSTOCK",
      subtitle: "Real-Time Cloud Inventory PWA",
      tag: "Cloud SaaS Platform",
      year: "2024",
      accent: "#00f2fe",
      image: "assets/projects/innovstock.jpg",
      repo: "https://github.com/RONALDJORDAN/InnovStock",
      overview: "Cloud-native asset tracking PWA with Firebase Realtime Database, integrated QR & barcode scanning, and instant legal document verification.",
      problem: "Physical inventory audits suffer from offline desynchronization, lost tags, and clumsy mobile interfaces during field warehouse scans.",
      solution: "Designed a mobile-first PWA with offline-first indexing, sub-50ms synchronization across nodes, camera-based instant barcode detection and automated PDF generation.",
      stack: ["React", "TypeScript", "Firebase RTDB", "Tailwind CSS", "PWA", "Web Workers"],
      metrics: ["Sub-50ms sync latency", "Offline resilient storage", "Instant barcode recognition"]
    },
    {
      id: "lagoinha",
      category: "enterprise",
      title: "LAGOINHA SMC",
      subtitle: "Full-Stack Management System",
      tag: "Web Platform & CRM",
      year: "2024",
      accent: "#8b5cf6",
      image: "assets/projects/lagoinha.jpg",
      repo: "https://github.com/RONALDJORDAN/Lagoinha-SMC",
      overview: "Scalable congregational management web app orchestrating membership records, financial ledgers, automated reporting and event logistics.",
      problem: "Fragmented spreadsheets and outdated legacy tools caused communication breakdowns and accounting discrepancies across departments.",
      solution: "Built an end-to-end unified management platform featuring role-based access control, dynamic financial ledgers, and responsive member portals.",
      stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
      metrics: ["1,000+ Active Records", "Automated monthly accounting audits", "Role-based security"]
    },
    {
      id: "innovcore",
      category: "enterprise",
      title: "INNOVCORE TI",
      subtitle: "IT Governance & Hardware Telemetry",
      tag: "Enterprise System",
      year: "2023",
      accent: "#38bdf8",
      image: "assets/projects/innovcore.jpg",
      repo: "https://github.com/RONALDJORDAN/InnovCore-TI",
      overview: "Unified corporate IT governance platform delivering hardware lifecycle management, real-time node telemetry and operational inventory audit.",
      problem: "Tracking hardware lifecycles, maintenance schedules, and server room nodes across distributed offices was manual and prone to critical failures.",
      solution: "Created an intuitive governance dashboard with automated hardware health polling, maintenance alerts, and interactive topological network maps.",
      stack: ["C# .NET Core", "React", "REST API", "SQL Server", "Chart.js"],
      metrics: ["Real-time hardware heartbeat monitoring", "Automated warranty alerts", "Comprehensive audit trails"]
    },
    {
      id: "projetos-innov",
      category: "lowlevel",
      title: "PROJETOS INNOV",
      subtitle: "Monorepo & Distributed Architecture",
      tag: "Core Engineering",
      year: "2023",
      accent: "#ec4899",
      image: "assets/projects/projetos.jpg",
      repo: "https://github.com/RONALDJORDAN/Projetos-Innov",
      overview: "High-scale engineering monorepo governing microservices, shared UI contracts, continuous delivery pipelines and distributed API gateways.",
      problem: "Siloed codebases across multiple internal tools led to duplicated authentication routines and inconsistent user experiences.",
      solution: "Consolidated enterprise microservices under a centralized repository with shared design tokens, unified JWT gateway authentication, and shared type definitions.",
      stack: ["TypeScript", "Docker", "Node.js", "CI/CD", "Design Tokens"],
      metrics: ["Shared UI component library", "Single sign-on across all internal tools", "Automated test suites"]
    }
  ],

  skills: [
    {
      id: "01",
      name: "UI/UX & Design Systems",
      category: "Frontend & Interaction",
      level: 95,
      quote: "Crafting fluid micro-animations, accessible tokens, and 60fps responsive interfaces.",
      tags: ["Anime.js", "Design Tokens", "Figma", "Responsive", "Glassmorphism"]
    },
    {
      id: "02",
      name: "C# .NET 8 / WPF & MVVM",
      category: "Enterprise & Desktop",
      level: 92,
      quote: "Asynchronous architectures, enterprise desktop systems, and robust MVVM pipelines.",
      tags: ["C#", ".NET 8", "WPF", "MVVM", "Async", "Dependency Injection"]
    },
    {
      id: "03",
      name: "Pure C & Low-Level Memory",
      category: "Core Engineering",
      level: 88,
      quote: "Zero-leak memory engineering, manual pointer allocation, and microsecond precision.",
      tags: ["Pure C", "Memory Buffers", "Pointers", "Win32", "Performance"]
    },
    {
      id: "04",
      name: "RPA & Computer Vision",
      category: "Intelligent Automation",
      level: 90,
      quote: "Autonomous robotics, OCR screen scraping, and visual object detection pipelines.",
      tags: ["RPA", "Computer Vision", "OpenCV", "OCR", "Automations"]
    },
    {
      id: "05",
      name: "TypeScript & React / Next.js",
      category: "Modern Web",
      level: 94,
      quote: "Scalable reactive state management, server components, and dynamic web apps.",
      tags: ["TypeScript", "React", "Next.js", "Tailwind CSS", "REST"]
    },
    {
      id: "06",
      name: "Cloud & Firebase Real-Time",
      category: "Backend & Cloud",
      level: 86,
      quote: "Real-time distributed synchronization, instant event telemetry, and SaaS backends.",
      tags: ["Firebase RTDB", "Cloud", "PWA", "PostgreSQL", "Node.js"]
    }
  ],

  terminalCommands: {
    help: "Available commands: \n  • projects: View featured portfolio projects\n  • skills: List core technical competencies\n  • about: Learn about Jordan's architecture background\n  • contact: Get direct communication links\n  • hire: Discover why Jordan is the right fit\n  • clear: Clear the terminal console",
    about: "Jordan Ronald is a Full-Stack Engineer and Software Architect with 3+ years of experience blending low-level Pure C precision, enterprise C# .NET 8 reliability, and modern UI/UX design.",
    projects: "Featured Projects:\n  1. INNOVRPA - Pure C & C# .NET 8 Vision Engine\n  2. INNOVSTOCK - Real-Time Cloud Inventory PWA\n  3. LAGOINHA SMC - Congregational Management CRM\n  4. INNOVCORE TI - Hardware Telemetry & Governance\n  5. PROJETOS INNOV - Monorepo & Gateway Architecture",
    skills: "Core Stack:\n  • UI/UX: Anime.js, Design Tokens, Glassmorphism, 60fps UX\n  • Backend & Desktop: C# .NET 8, WPF, MVVM, Pure C\n  • Automation: RPA, Computer Vision, OpenCV, Win32\n  • Web: React, Next.js, TypeScript, Firebase, PostgreSQL",
    contact: "Direct Contacts:\n  • Email: ronaldjordan.dev@gmail.com\n  • GitHub: https://github.com/RONALDJORDAN\n  • LinkedIn: https://linkedin.com/in/ronald-jordan-dev",
    hire: "Why Hire Jordan?\n  ✓ Full-stack breadth + low-level depth\n  ✓ Zero-leak memory discipline in high-concurrency systems\n  ✓ Obsession with silky-smooth UI/UX user experiences\n  ✓ Ready for immediate impact on complex architectures"
  }
};

if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
