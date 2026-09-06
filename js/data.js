// Jordan Ronald - Portfolio Data Configuration
const portfolioData = {
  profile: {
    name: "Jordan Ronald",
    brand: "InnovCore-TI",
    titleLine1: "Software",
    titleLine2: "Architect",
    subRole: "Full-Stack Engineer (Pleno) • 3 Years Experience",
    location: "Based in Brazil",
    status: "Open to work",
    email: "ronaldjordan.dev@gmail.com",
    github: "https://github.com/RONALDJORDAN",
    linkedin: "https://linkedin.com/in/ronald-jordan-dev",
    whatsapp: "https://wa.me/5500000000000",
    resume: "assets/curriculo.pdf",
    badgeLabel: "Jordan Ronald",
    badgeSub: "Mid-Level • 3 Yrs Exp"
  },
  
  skills: [
    { 
      id: "01", 
      name: "FULL-STACK ARCHITECTURE", 
      category: "Full-Stack Engineering",
      color: "#10b981",
      quote: "Building bridges between frontend magic and backend resilience.",
      tags: ["Next.js", "React", ".NET 8", "Full-Stack"]
    },
    { 
      id: "02", 
      name: "C# .NET 8 / WPF", 
      category: "Desktop & Enterprise Systems",
      color: "#38bdf8",
      quote: "High-performance enterprise desktop & asynchronous system architectures.",
      tags: ["C#", ".NET 8", "WPF", "MVVM", "Async"]
    },
    { 
      id: "03", 
      name: "PURE C / LOW-LEVEL", 
      category: "Low-Level & Memory Engineering",
      color: "#f59e0b",
      quote: "Zero-leak memory engineering, raw pointers and microsecond precision.",
      tags: ["Pure C", "Memory", "Pointers", "Low-Level"]
    },
    { 
      id: "04", 
      name: "RPA / COMPUTER VISION", 
      category: "Intelligent Robotics & Vision",
      color: "#ec4899",
      quote: "Intelligent autonomous robotics replacing thousands of manual hours.",
      tags: ["RPA", "Computer Vision", "Automation", "OCR"]
    },
    { 
      id: "05", 
      name: "TYPESCRIPT / REACT", 
      category: "Modern Reactive Frontend",
      color: "#6366f1",
      quote: "Modern reactive state, fluid micro-interactions and silky 60fps UX.",
      tags: ["TypeScript", "React", "Tailwind", "GSAP"]
    },
    { 
      id: "06", 
      name: "CLOUD & FIREBASE RTDB", 
      category: "Real-Time Cloud & Distributed Data",
      color: "#a855f7",
      quote: "Distributed real-time synchronization, instant telemetry and scale.",
      tags: ["Firebase RTDB", "Cloud", "PWA", "Real-Time"]
    },
    { 
      id: "07", 
      name: "API DESIGN & REST", 
      category: "Backend & Microservice Contracts",
      color: "#14b8a6",
      quote: "Clean contracts, robust security schemas and resilient microservices.",
      tags: ["REST", "Microservices", "Auth", "API Gateways"]
    },
    { 
      id: "08", 
      name: "HIGH PERFORMANCE OPT", 
      category: "Performance & Sub-Millisecond Profiling",
      color: "#06b6d4",
      quote: "From algorithmic complexity to UI frame drops, every millisecond counts.",
      tags: ["Optimization", "Algorithms", "Profilers", "60 FPS"]
    }
  ],

  projects: [
    {
      id: "01",
      title: "INNOVRPA",
      subtitle: "Hybrid Zero-Leak RPA Engine",
      tag: "Robotics & Vision Engine",
      year: "2025",
      color: "#10b981", // Emerald Neon
      image: "assets/projects/innovrpa.jpg",
      page: "innovrpa.html",
      link: "https://github.com/RONALDJORDAN/Inno-RPA",
      description: "Next-gen robotic automation engine merging pure C memory efficiency with C# WPF .NET 8 and Vision7 computer vision pipelines for zero-latency automation."
    },
    {
      id: "02",
      title: "INNOVSTOCK",
      subtitle: "Real-Time Cloud Inventory PWA",
      tag: "Cloud SaaS Platform",
      year: "2024",
      color: "#4158ac", // Electric Cobalt
      image: "assets/projects/innovstock.jpg",
      page: "innovstock.html",
      link: "https://github.com/RONALDJORDAN/InnovStock",
      description: "Cloud-native asset tracking PWA with Firebase Realtime Database, integrated QR & barcode scanning, and instant legal document verification."
    },
    {
      id: "03",
      title: "LAGOINHA SMC",
      subtitle: "Full-Stack Management System",
      tag: "Web Platform & CRM",
      year: "2024",
      color: "#6a8cef", // Royal Indigo
      image: "assets/projects/lagoinha.jpg",
      page: "lagoinha-smc.html",
      link: "https://github.com/RONALDJORDAN/Lagoinha-SMC",
      description: "Scalable congregational management web app orchestrating membership records, financial ledgers, automated reporting and event logistics."
    },
    {
      id: "04",
      title: "INNOVCORE TI",
      subtitle: "IT Governance & Hardware Telemetry",
      tag: "Enterprise System",
      year: "2023",
      color: "#8b5cf6", // Ultraviolet Neon
      image: "assets/projects/innovcore.jpg",
      page: "innovcore-ti.html",
      link: "https://github.com/RONALDJORDAN/InnovCore-TI",
      description: "Unified corporate IT governance platform delivering hardware lifecycle management, real-time node telemetry and operational inventory audit."
    },
    {
      id: "05",
      title: "PROJETOS INNOV",
      subtitle: "Monorepo & Distributed Architecture",
      tag: "Core Engineering",
      year: "2023",
      color: "#ec4899", // Neon Fuchsia
      image: "assets/projects/projetos.jpg",
      page: "projetos-innov.html",
      link: "https://github.com/RONALDJORDAN/Projetos-Innov",
      description: "High-scale engineering monorepo governing microservices, shared UI contracts, continuous delivery pipelines and distributed API gateways."
    }
  ]
};

if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
