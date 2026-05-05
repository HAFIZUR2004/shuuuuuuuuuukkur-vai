export type TeamMember = {
  name: string;
  role: string;
  description: string;
  image?: string;
};

export const translations = {
  EN: {
    // Navbar
    menu: "Menu",
    services: "Services",
    projects: "Projects",
    about: "About",
    career: "Career",
    contact: "Contact",
    startProject: "Start a Project",
    businessSolutions: "Business Solutions",

    //Footer
    footerDesc:
      "Building scalable networks and technical excellence for global business expansion.",
    solutions: "Solutions",
    protocol: "Protocol",
    terminal: "Terminal",
    returnTop: "Return to Top",
    development: "Development",
    strategy: "Strategy",
    security: "Security",
    corev3: "Core V3",
    uptime: "Uptime",
    nodes: "Nodes",

    //Hero
    heroBadge: "Grow Business Solutions BD",
    heroHeading1: "Your Vision, Our Expertise -",
    heroHeading2: "Engineering Success Together.",
    heroDesc:
      "Your vision combined with our technical expertise will pave the way for future success. We go beyond mere project delivery; we act as your dedicated partner at every step of your business journey, all within an affordable budget. Through cutting-edge AI and high-performance solutions, we will elevate your dreams to extraordinary heights. Consult with our expert team today at no cost to discover the best strategy for your business. We are by your side, always.",
    heroBtnPrimary: "Get a Free Consultation",
    heroBtnSecondary: "Our Success Stories",
    statLabel: "Data SLA",
    statValue: "99.99%",

    //Engineering Protocol
    protocolTitle: "The Engineering",
    protocolTitleItalic: "Protocol.",
    steps: [
      {
        title: "Discovery",
        desc: "Deep-dive audit into existing systems and market opportunities.",
        bgText: "architecture",
      },
      {
        title: "Blueprint",
        desc: "Wireframing the high-fidelity user journey and technical stack mapping.",
        bgText: "code",
      },
      {
        title: "Engineering",
        desc: "Sprinting through development with modular, test-driven architecture.",
        bgText: "speed",
      },
      {
        title: "Optimization",
        desc: "Iterative fine-tuning and deployment on high-speed global nodes.",
        bgText: "global",
      },
    ],

    //Success in Motion
    successBadge: "MILESTONES",
    successTitle: "Success in",
    successTitleGradient: "Motion.",
    successDescription:
      "Delivering excellence through measurable results and client satisfaction",
    stats: [
      {
        title: "Years",
        desc: "Of dedicated craft in digital architecture.",
      },
      {
        title: "Projects",
        desc: "High-impact solutions delivered globally.",
      },
      {
        title: "Client Satisfaction",
        desc: "Satisfaction rate across all partnerships.",
      },
    ],
    trustBadges: {
      projectsCompleted: "8+ Projects Completed",
      fiveStarRating: "5 Star Rating",
      onTimeDelivery: "On-Time Delivery",
      premiumQuality: "Premium Quality",
    },

    // Team Section
    teamHorizontal: {
      badge: "MEET THE COLLECTIVE",
      title: "Our Creative",
      titleGradient: "Collective",
      description:
        "System sovereign operators tasked with the orchestration of planetary-scale technical infrastructure and quantum computational frameworks.",
      prevButton: "Previous",
      nextButton: "Next",
      systemStatus: "SYSTEM STATUS: OPERATIONAL",
      allNodesActive: "ALL NODES ACTIVE",
      members: [
        {
          name: "Hafizur Rahman",
          role: "Technical Consultant",
          company: "",
          image: "/team/hafizur.jpg",
          social: {
            twitter: "https://twitter.com/hafizur",
            github: "https://github.com/hafizur",
            linkedin: "https://linkedin.com/in/hafizur",
            instagram: "https://instagram.com/hafizur",
          },
        },
        {
          name: "Shukur Mahmud",
          role: "Operations Lead",
          company: "",
          image: "/team/Shukur1.png",
          social: {
            twitter: "https://twitter.com/shukur",
            github: "https://github.com/mahmud014",
            linkedin: "in/shukurmahmud",
            instagram: "smanik5588",
          },
        },
        {
          name: "Bibek Bhowmick",
          role: "Senior Software Developer & System Architect",
         company: "",
          image: "/team/bibek.jpeg",
          social: {
            twitter: "https://twitter.com/shukur",
            github: "https://github.com/bibek-totol",
            linkedin: "in/bibekbhowmick",
            instagram: "smanik5588",
          },
        },
        {
          name: "Lal Mahmud",
          role: "Mern Stack Developer",
          company: "",
          image: "/team/lalvai.jpeg",
          social: {
            twitter: "https://twitter.com/sarah",
            github: "https://github.com/sarah",
            linkedin: "https://linkedin.com/in/sarah",
            instagram: "https://instagram.com/sarah",
          },
        },
        {
          name: "Sumaiya Afroza",
          role: "Mern Stack Developer",
          company: "",
          image: "/team/Sumaiya Afroza.jpeg",
          social: {
            twitter: "https://twitter.com/julian",
            github: "https://github.com/julian",
            linkedin: "https://linkedin.com/in/julian",
            instagram: "https://instagram.com/julian",
          },
        },
        {
          name: "Habiba Sultana",
          role: "Mern Stack Developer",
         company: "",
          image: "/team/habiba.jpeg",
          social: {
            twitter: "https://twitter.com/elena",
            github: " https://github.com/coderhabiba",
            linkedin: ": https://www.linkedin.com/in/habiba-anika-00ab163a1/",
            instagram: "https://instagram.com/elena",
          },
        },
      ],
    },

    // premiumReviews
    premiumReviews: {
      badge: "Social Proof",
      title: "Trusted by",
      titleGradient: "Industry Leaders",
      description:
        "Don't just take our word for it — hear from our amazing clients around the world",
      prevButton: "Previous review",
      nextButton: "Next review",
      loadingText: "Loading Reviews",
      loadingSubText: "Please wait",
      noData: "No testimonials available",
      swipeHint: "← Swipe to navigate →",
      trustBadges: {
        rating: "4.9/5 Average Rating",
        happyClients: "200+ Happy Clients",
        projectsDelivered: "50+ Projects Delivered",
        support: "24/7 Support",
      },
      testimonials: [
        {
          name: "Alex Rivera",
          role: "CEO",
          comment:
            "The level of professionalism and technical depth provided was exceptional. Our conversion rate increased by 200% after the redesign.",
          company: "TechVibe",
        },
        {
          name: "Sophia Chen",
          role: "Founder",
          comment:
            "Working with this team was a game-changer. Their understanding of MERN stack and eye for premium animations is unmatched in the industry.",
          company: "GreenLeaf",
        },
        {
          name: "Marcus Thorne",
          role: "Product Manager",
          comment:
            "Fast, reliable, and incredibly creative. The custom dashboard they built for us is now our core competitive advantage.",
          company: "CloudScale",
        },
        {
          name: "Isabella Martinez",
          role: "CTO",
          comment:
            "Absolutely outstanding! The attention to detail and commitment to excellence is rare to find. They delivered ahead of schedule.",
          company: "InnovateHub",
        },
        {
          name: "David Kim",
          role: "Technical Director",
          comment:
            "The best investment we've made this year. The team's expertise in modern web technologies transformed our digital presence completely.",
          company: "DevOps Pro",
        },
      ],
    },

    //contact Us
    secureChannel: "DIRECT ADVISORY GATEWAY",
    initiate: "Evolve",
    connection: "Your Brand",
    contactDesc:
      "Ready to dominate the digital landscape? Reach out through our secure protocol to start building a high-conversion platform that works for your business 24/7.",
    nameLabel: "Name",
    namePlaceholder: "DESIGNATION / ALIAS",
    emailLabel: "Email",
    emailPlaceholder: "ENCRYPTED_ENDPOINT",
    messageLabel: "Write Your Message",
    messagePlaceholder: "TRANSMIT SECURE MESSAGE...",
    executeProtocol: "Execute Protocol",
    successMessage: "Transmission successful. Node will respond within 24h.",
    quantumLine: "Quantum_Line",
    neuralLink: "Neural_Link",
    phone: "+880 1234 567 890",
    email: "contact@growbusiness.solutions",

    // Tech Stack Section
    techStack: {
      title: "The",
      titleGradient: "Atomic",
      titleEnd: "Stack.",
      features: [
        {
          title: "Optimized Core",
          desc: "Latency-tuned server environments for near-zero downtime.",
        },
        {
          title: "Reactive UI",
          desc: "State-driven fluid interfaces with flawless user interactions.",
        },
        {
          title: "Distributed Edge",
          desc: "Global CDN delivery ensuring blazing-fast access everywhere.",
        },
        {
          title: "Ironclad Security",
          desc: "End-to-end encryption and advanced authentication protocols.",
        },
        {
          title: "Scalable Logic",
          desc: "Modular architecture built for long-term maintainability and growth.",
        },
        {
          title: "Smart Insights",
          desc: "Real-time monitoring and user behavior data tracking.",
        },
      ],
      centerText: "MERN+",
      prevButton: "Previous",
      nextButton: "Next",
    },

    // Portfolio Page (for dynamic portfolio component)
    portfolioPage: {
      badge: "Our Portfolio",
      title: "All",
      titleGradient: "Projects",
      description:
        "Explore our complete collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence.",
      viewProject: "View Project",
      loadMore: "Load More Projects",
      stats: {
        totalProjects: "Total Projects",
        clientSatisfaction: "Client Satisfaction",
        support: "Support",
      },
      noProjects: "No projects found.",
      noProjectsDesc:
        "Add some projects from the admin dashboard to see them here.",
      showing: "Showing",
      project: "project",
      projects: "projects",
    },

    // Home Portfolio Section
    homePage: {
      badge: "Featured Work",
      title: "Creative",
      titleGradient: "Artifacts",
      description:
        "Explore our collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence.",
      viewAll: "View All Projects",
      viewProject: "View Project",
      stats: {
        featuredProjects: "Featured Projects",
        clientSatisfaction: "Client Satisfaction",
        support: "Support",
      },
    },

    // Portfolio Gallery (DynamicPortfolioPage এর জন্য)
    portfolio: {
      badge: "Selected Works",
      title: "Creative",
      titleGradient: "Artifacts",
      desc: "Explore our collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence.",
      viewAll: "View All Projects",
      viewProject: "View Project",
      loading: "Loading amazing projects...",
      exploreBtn: "Explore All Artifacts",
      stats: [
        { label: "Projects Delivered", suffix: "+" },
        { label: "Client Satisfaction", suffix: "%" },
        { label: "Support", suffix: "" },
      ],
      noProjects: "No projects found.",
      noProjectsDesc:
        "Add some projects from the admin dashboard to see them here.",
      loadingTexts: [
        "Loading Projects",
        "Fetching Data",
        "Preparing Interface",
        "Almost Ready",
      ],
      pleaseWait: "Please wait",
      complete: "Complete",
    },
  },

  BN: {
    //Navbar
    menu: "মেনু",
    services: "সার্ভিস সমূহ",
    projects: "প্রজেক্ট সমূহ",
    about: "আমাদের সম্পর্কে",
    career: "ক্যারিয়ার",
    contact: "যোগাযোগ",
    startProject: "প্রজেক্ট শুরু করুন",
    businessSolutions: "বিজনেস সলিউশনস",

    //Footer
    footerDesc:
      "বৈশ্বিক ব্যবসায়িক প্রসারের জন্য আমরা তৈরি করি উন্নত নেটওয়ার্ক এবং টেকনিক্যাল শ্রেষ্ঠত্ব।",
    solutions: "সমাধান",
    protocol: "প্রোটোকল",
    terminal: "টার্মিনাল",
    returnTop: "উপরে যান",
    development: "ডেভেলপমেন্ট",
    strategy: "স্ট্র্যাটেজি",
    security: "সিকিউরিটি",
    corev3: "কোর ভি৩",
    uptime: "আপটাইম",
    nodes: "নোড",

    //Hero
    heroBadge: "গ্রো বিজনেস সলিউশনস বিডি",
    heroHeading1: "আপনার লক্ষ্য, আমাদের দক্ষতা -",
    heroHeading2: "একসাথেই গড়ি সফলতা।",
    heroDesc:
      "আপনার স্বপ্নের সাথে আমাদের কারিগরি দক্ষতার সমন্বয় নিশ্চিত করবে ভবিষ্যৎ সাফল্য। আমরা শুধু প্রজেক্ট ডেলিভারি করি না; বরং আপনার ব্যবসার প্রতিটি পদক্ষেপে সাশ্রয়ী বাজেটে আপনার বিশ্বস্ত পার্টনার হিসেবে কাজ করি। অত্যাধুনিক AI এবং হাই-পারফরম্যান্স সলিউশনের মাধ্যমে আমরা আপনার স্বপ্নকে নিয়ে যাব এক অনন্য উচ্চতায়। আপনার ব্যবসার সঠিক কৌশল নির্ধারণে আজই আমাদের বিশেষজ্ঞ টিমের সাথে বিনামূল্যে পরামর্শ করুন। আমরা আছি সবসময় আপনার পাশে।",
    heroBtnPrimary: "ফ্রি কনসালটেশন নিন",
    heroBtnSecondary: "আমাদের সফলতার গল্প",
    statLabel: "ডেটা এসএলএ (SLA)",
    statValue: "৯৯.৯৯%",

    //Engineering Protocol
    protocolTitle: "ইঞ্জিনিয়ারিং",
    protocolTitleItalic: "প্রটোকল",
    steps: [
      {
        title: "অনুসন্ধান",
        desc: "বিদ্যমান সিস্টেম এবং বাজারের সুযোগগুলো গভীরভাবে বিশ্লেষণ করা।",
        bgText: "স্থাপত্য",
      },
      {
        title: "পরিকল্পনা",
        desc: "উচ্চমানের ইউজার জার্নি ডিজাইন এবং টেকনিক্যাল স্ট্যাক ম্যাপ তৈরি করা।",
        bgText: "কোড",
      },
      {
        title: "প্রকৌশল",
        desc: "মডুলার এবং টেস্ট-ড্রিভেন আর্কিটেকচারের মাধ্যমে দ্রুত ডেভেলপমেন্ট সম্পন্ন করা।",
        bgText: "গতি",
      },
      {
        title: "অপ্টিমাইজেশন",
        desc: "ক্রমাগত উন্নতি এবং হাই-স্পিড গ্লোবাল নোডগুলোতে অ্যাপ্লিকেশন স্থাপন করা।",
        bgText: "গ্লোবাল",
      },
    ],

    //Success in Motion
    successBadge: "সাফল্যের মাইলফলক",
    successTitle: "গতিশীল",
    successTitleGradient: "সাফল্য",
    successDescription:
      "পরিমাপযোগ্য ফলাফল এবং ক্লায়েন্ট সন্তুষ্টির মাধ্যমে শ্রেষ্ঠত্ব প্রদান",
    stats: [
      {
        title: "বছর",
        desc: "ডিজিটাল আর্কিটেকচার বা স্থাপত্যে নিবেদিত শিল্পশৈলী।",
      },
      {
        title: "প্রজেক্ট",
        desc: "বিশ্বজুড়ে ডেলিভারি করা হাই-ইমপ্যাক্ট সলিউশন।",
      },
      {
        title: "ক্লায়েন্ট সন্তুষ্টি",
        desc: "প্রতিটি পার্টনারশিপে পূর্ণ সন্তুষ্টির হার।",
      },
    ],
    trustBadges: {
      projectsCompleted: "৮+ প্রজেক্ট সম্পন্ন",
      fiveStarRating: "৫ স্টার রেটিং",
      onTimeDelivery: "সময়ে ডেলিভারি",
      premiumQuality: "প্রিমিয়াম কোয়ালিটি",
    },

    // Team Section
    teamHorizontal: {
      badge: "দলের সাথে সাক্ষাৎ",
      title: "আমাদের ক্রিয়েটিভ",
      titleGradient: "দল",
      description:
        "পৃথিবী-মানের টেকনিক্যাল ইনফ্রাস্ট্রাকচার এবং কোয়ান্টাম কম্পিউটেশনাল ফ্রেমওয়ার্কের অর্কেস্ট্রেশনের জন্য নিযুক্ত সিস্টেম সার্বভৌম অপারেটররা।",
      prevButton: "পূর্ববর্তী",
      nextButton: "পরবর্তী",
      systemStatus: "সিস্টেম স্ট্যাটাস: সক্রিয়",
      allNodesActive: "সকল নোড সক্রিয়",
      members: [
        {
          name: "হাফিজুর রহমান",
          role: "প্রযুক্তি পরামর্শক",
          company: "",
          image: "/team/hafizur.jpg",
          social: {
            twitter: "https://twitter.com/hafizur",
            github: "https://github.com/hafizur",
            linkedin: "https://linkedin.com/in/hafizur",
            instagram: "https://instagram.com/hafizur",
          },
        },
        {
          name: "শুকুর মাহমুদ",
          role: "পরিচালনা প্রধান",
          company: "",
         image: "/team/Shukur1.png",
          social: {
            twitter: "https://twitter.com/shukur",
            github: "https://github.com/mahmud014",
            linkedin: "in/shukurmahmud",
            instagram: "smanik5588",
          },
        },
        {
          name: "বিবেক ভৌমিক",
          role: "সিনিয়র সফটওয়্যার ডেভেলপার এবং সিস্টেম আর্কিটেক্ট",
         company: "",
          image: "/team/bibek.jpeg",
          social: {
            twitter: "https://twitter.com/sarah",
            github: "https://github.com/sarah",
            linkedin: "https://linkedin.com/in/sarah",
            instagram: "https://instagram.com/sarah",
          },
        },
        {
          name: "লাল মাহমুদ",
          role: "মার্ন স্ট্যাক ডেভেলপার",
         company: "",
          image: "/team/lalvai.jpeg",
          social: {
            twitter: "https://twitter.com/sarah",
           github: "https://github.com/bibek-totol",
            linkedin: "in/bibekbhowmick",
            instagram: "https://instagram.com/sarah",
          },
        },
        {
          name: "সুমাইয়া আফরোজা",
          role: "মার্ন স্ট্যাক ডেভেলপার",
         company: "",
          image: "/team/Sumaiya Afroza.jpeg",
          social: {
            twitter: "https://twitter.com",
            github: "https://github.com/sumaiyaAfroza",
            linkedin: "https://www.linkedin.com/in/sumaiya-afroza25/",
            instagram: "https://instagram.com/",
          },
        },
        {
          name: "হাবিবা সুলতানা",
          role: "মার্ন স্ট্যাক ডেভেলপার",
          company: "",
          image: "/team/habiba.jpeg",
          social: {
            twitter: "https://twitter.com/elena",
            github: " https://github.com/coderhabiba",
            linkedin: " https://www.linkedin.com/in/habiba-anika-00ab163a1/",
            instagram: "https://instagram.com/elena",
          },
        },
      ],
    },

    // premiumReviews (Bengali)
    premiumReviews: {
      badge: "সামাজিক প্রমাণ",
      title: "যাদের আস্থা অর্জন করেছি",
      titleGradient: "শিল্প নেতারা",
      description:
        "শুধু আমাদের কথায় বিশ্বাস করবেন না — বিশ্বজুড়ে আমাদের আশ্চর্যজনক ক্লায়েন্টদের কাছ থেকে শুনুন",
      prevButton: "পূর্ববর্তী পর্যালোচনা",
      nextButton: "পরবর্তী পর্যালোচনা",
      swipeHint: "← স্লাইড করুন →",
      loadingText: "পর্যালোচনা লোড হচ্ছে",
      noData: "কোনো পর্যালোচনা পাওয়া যায়নি",
      loadingSubText: "অনুগ্রহ করে অপেক্ষা করুন",
      trustBadges: {
        rating: "৪.৯/৫ গড় রেটিং",
        happyClients: "২০০+ সন্তুষ্ট ক্লায়েন্ট",
        projectsDelivered: "৫০+ প্রজেক্ট ডেলিভারি",
        support: "২৪/৭ সাপোর্ট",
      },
      testimonials: [
        {
          name: "আলেক্স রিভেরা",
          role: "সিইও",
          comment:
            "প্রদত্ত পেশাদারিত্ব এবং প্রযুক্তিগত গভীরতা অসাধারণ ছিল। রিডিজাইনের পরে আমাদের কনভার্সন রেট ২০০% বৃদ্ধি পেয়েছে।",
          company: "টেকভাইব",
        },
        {
          name: "সোফিয়া চেন",
          role: "প্রতিষ্ঠাতা",
          comment:
            "এই টিমের সাথে কাজ করা একটি গেম-চেঞ্জার ছিল। MERN স্ট্যাক এবং প্রিমিয়াম অ্যানিমেশনের প্রতি তাদের বোঝাপড়া শিল্পে অতুলনীয়।",
          company: "গ্রিনলিফ",
        },
        {
          name: "মার্কাস থর্ন",
          role: "প্রোডাক্ট ম্যানেজার",
          comment:
            "দ্রুত, নির্ভরযোগ্য এবং অবিশ্বাস্যভাবে সৃজনশীল। তারা আমাদের জন্য যে কাস্টম ড্যাশবোর্ড তৈরি করেছে তা এখন আমাদের মূল প্রতিযোগিতামূলক সুবিধা।",
          company: "ক্লাউডস্কেল",
        },
        {
          name: "ইসাবেলা মার্টিনেজ",
          role: "সিটিও",
          comment:
            "একদম অসাধারণ! বিস্তারিত মনোযোগ এবং শ্রেষ্ঠত্বের প্রতিশ্রুতি পাওয়া দুর্লভ। তারা সময়ের আগেই ডেলিভারি করেছে।",
          company: "ইনোভেটহাব",
        },
        {
          name: "ডেভিড কিম",
          role: "টেকনিক্যাল ডিরেক্টর",
          comment:
            "এই বছর আমাদের করা সেরা বিনিয়োগ। আধুনিক ওয়েব প্রযুক্তিতে টিমের দক্ষতা আমাদের ডিজিটাল উপস্থিতি সম্পূর্ণরূপে রূপান্তরিত করেছে।",
          company: "ডেভঅপস প্রো",
        },
      ],
    },

    // Contact Us
    secureChannel: "সরাসরি পরামর্শ গেটওয়ে",
    initiate: "আপনার ব্র্যান্ডকে",
    connection: "বিকশিত করুন",
    contactDesc:
      "ডিজিটাল দুনিয়ায় রাজত্ব করতে প্রস্তুত? আপনার বিজনেসের জন্য ২৪/৭ কাজ করবে এমন একটি হাই-কনভার্সন প্ল্যাটফর্ম তৈরি করতে আমাদের নিরাপদ প্রোটোকলের মাধ্যমে যোগাযোগ করুন।",
    nameLabel: "নাম",
    namePlaceholder: "আপনার নাম বা পদবি",
    emailLabel: "ইমেল",
    emailPlaceholder: "আপনার ইমেল অ্যাড্রেস",
    messageLabel: "আপনার বার্তা লিখুন",
    messagePlaceholder: "আপনার বার্তাটি এখানে লিখুন...",
    executeProtocol: "প্রোটোকল কার্যকর করুন",
    successMessage:
      "বার্তা সফলভাবে পাঠানো হয়েছে। ২৪ ঘণ্টার মধ্যে যোগাযোগ করা হবে।",
    quantumLine: "কোয়ান্টাম লাইন",
    neuralLink: "নিউরন লিংক",
    phone: "+৮৮০ ১২৩৪ ৫৬৭ ৮৯০",
    email: "contact@growbusiness.solutions",

    // Tech Stack Section
    techStack: {
      title: "দ্যা",
      titleGradient: "এটমিক",
      titleEnd: "স্ট্যাক।",
      features: [
        {
          title: "অপটিমাইজড কোর",
          desc: "শূন্য ডাউনটাইমের জন্য লেটেন্সি-টিউনড সার্ভার পরিবেশ।",
        },
        {
          title: "রিঅ্যাকটিভ ইউআই",
          desc: "স্টেট-ড্রিভেন ফ্লুইড ইন্টারফেস যা নিখুঁত ইউজার ইন্টারঅ্যাকশন নিশ্চিত করে।",
        },
        {
          title: "ডিস্ট্রিবিউটেড এজ",
          desc: "গ্লোবাল সিডিএন ডেলিভারি যা সর্বত্র দ্রুতগতির অ্যাক্সেস নিশ্চিত করে।",
        },
        {
          title: "আয়রনক্ল্যাড সিকিউরিটি",
          desc: "এন্ড-টু-এন্ড এনক্রিপশন এবং অ্যাডভান্সড অথেন্টিকেশন প্রোটোকল।",
        },
        {
          title: "স্কেলেবল লজিক",
          desc: "দীর্ঘমেয়াদী রক্ষণাবেক্ষণ এবং বৃদ্ধির জন্য মডুলার আর্কিটেকচার।",
        },
        {
          title: "স্মার্ট ইনসাইটস",
          desc: "রিয়েল-টাইম মনিটরিং এবং ইউজার বিহেভিয়ার ডেটা ট্র্যাকিং।",
        },
      ],
      centerText: "MERN+",
      prevButton: "পূর্ববর্তী",
      nextButton: "পরবর্তী",
    },

    // Portfolio Page (for dynamic portfolio component)
    portfolioPage: {
      badge: "আমাদের পোর্টফোলিও",
      title: "সমস্ত",
      titleGradient: "প্রজেক্ট",
      description:
        "আমাদের ডিজিটাল মাস্টারপিসের সম্পূর্ণ সংগ্রহ অন্বেষণ করুন — প্রতিটি প্রজেক্ট সৃজনশীলতা এবং প্রযুক্তিগত শ্রেষ্ঠত্বের সাথে সমাধান করা একটি অনন্য চ্যালেঞ্জকে প্রতিনিধিত্ব করে।",
      viewProject: "প্রকল্প দেখুন",
      loadMore: "আরও প্রকল্প লোড করুন",
      stats: {
        totalProjects: "মোট প্রজেক্ট",
        clientSatisfaction: "ক্লায়েন্ট সন্তুষ্টি",
        support: "সাপোর্ট",
      },
      noProjects: "কোনো প্রজেক্ট পাওয়া যায়নি।",
      noProjectsDesc:
        "এখানে প্রজেক্ট দেখতে অ্যাডমিন ড্যাশবোর্ড থেকে কিছু প্রজেক্ট যোগ করুন।",
      showing: "দেখানো হচ্ছে",
      project: "প্রজেক্ট",
      projects: "প্রজেক্ট",
    },

    // Home Portfolio Section
    homePage: {
      badge: "বৈশিষ্ট্যযুক্ত কাজ",
      title: "ক্রিয়েটিভ",
      titleGradient: "আর্টিফ্যাক্টস",
      description:
        "আমাদের ডিজিটাল মাস্টারপিসের সংগ্রহ অন্বেষণ করুন — প্রতিটি প্রকল্প সৃজনশীলতা এবং প্রযুক্তিগত উৎকর্ষের সাথে সমাধান করা একটি অনন্য চ্যালেঞ্জকে প্রতিনিধিত্ব করে।",
      viewAll: "সব প্রকল্প দেখুন",
      viewProject: "প্রকল্প দেখুন",
      stats: {
        featuredProjects: "বৈশিষ্ট্যযুক্ত প্রকল্প",
        clientSatisfaction: "ক্লায়েন্ট সন্তুষ্টি",
        support: "সাপোর্ট",
      },
    },

    // Portfolio Gallery (DynamicPortfolioPage এর জন্য)
    portfolio: {
      badge: "নির্বাচিত কাজ",
      title: "ক্রিয়েটিভ",
      titleGradient: "আর্টিফ্যাক্টস",
      desc: "আমাদের ডিজিটাল মাস্টারপিসের সংগ্রহ অন্বেষণ করুন — প্রতিটি প্রকল্প সৃজনশীলতা এবং প্রযুক্তিগত উৎকর্ষের সাথে সমাধান করা একটি অনন্য চ্যালেঞ্জকে প্রতিনিধিত্ব করে।",
      viewAll: "সব প্রকল্প দেখুন",
      viewProject: "প্রকল্প দেখুন",
      loading: "প্রকল্প লোড হচ্ছে...",
      exploreBtn: "সব আর্টিফ্যাক্ট দেখুন",
      stats: [
        { label: "প্রকল্প ডেলিভারি", suffix: "+" },
        { label: "ক্লায়েন্ট সন্তুষ্টি", suffix: "%" },
        { label: "সাপোর্ট", suffix: "" },
      ],
      noProjects: "কোনো প্রজেক্ট পাওয়া যায়নি।",
      noProjectsDesc:
        "এখানে প্রজেক্ট দেখতে অ্যাডমিন ড্যাশবোর্ড থেকে কিছু প্রজেক্ট যোগ করুন।",
      loadingTexts: [
        "প্রকল্প লোড হচ্ছে",
        "ডাটা আনছি",
        "ইন্টারফেস প্রস্তুত করছি",
        "প্রায় শেষ",
      ],
      pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন",
      complete: "সম্পূর্ণ",
    },
  },
};

export type LanguageType = keyof typeof translations;
