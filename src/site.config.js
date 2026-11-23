/**
 * SITE CONFIG — every word, image, link and venture on the site lives here.
 * Edit this file only; the components read from it.
 * Anything marked TODO still needs a real value. In `npm run dev` the browser
 * console lists every TODO link that is still "#".
 *
 * Images: put files in /public/images and reference them as "/images/<file>".
 * A missing image falls back to a monochrome placeholder or the monogram.
 */
const SITE = {
  name: "Rashid",

  // Search engines + link previews (WhatsApp, LinkedIn, X…)
  seo: {
    title: "Rashid — Entrepreneur & Founder of BEEZY Solutions",
    description: "Founder of BEEZY Solutions. I help businesses grow, and I'm building the next set of ideas for a changing world.",
    url: "https://rashid.beezysolutions.com", // live address — used for canonical, share image URLs and the sitemap
    locale: "en_IN",
    twitterHandle: "", // TODO: e.g. "@yourhandle"
  },

  // Form delivery. Paste a Formspree (or compatible) endpoint, e.g. "https://formspree.io/f/abcdwxyz".
  // Leave empty and the forms show a friendly "not set up yet" message instead of pretending to send.
  forms: {
    contactEndpoint: "https://formspree.io/f/mnpdopyk",
    newsletterEndpoint: "", // TODO
  },

  nav: [
    { label: "About", href: "#story" },
    { label: "Ventures", href: "#ventures" },
    { label: "Thought Leadership", href: "#beliefs" },
    { label: "Connect", href: "#contact" },
  ],
  navCta: { label: "Let's Talk", href: "#contact" },

  hero: {
    eyebrow: "Entrepreneur · Business Consultant · Founder",
    // Headline is split into parts so one phrase can be set in italic.
    headline: [
      { text: "Hi, I'm Rashid." },
      { text: "I build businesses," },
      { text: "and I help others build theirs.", italic: true },
    ],
    subheadline: "Founder of BEEZY Solutions. I help businesses grow, and I'm building the next set of ideas for a changing world.",
    // Source photo lives in /assets; `npm run build` makes optimised AVIF/WebP/JPEG sizes from it.
    portrait: { name: "portrait", alt: "Portrait of Rashid", position: "50% 12%", width: 1333, height: 2000 }, // position = crop focal point
    caption: ["Kochi, India", "Founder, BEEZY Solutions"],
    primaryCta: { label: "Read My Story", href: "#story" },
    secondaryCta: { label: "Have a Project? Let's Talk", href: "#contact" },
  },


  stats: [
    { value: 350, suffix: "+", label: "Brands worked with" },
    { value: 6, suffix: "+", label: "Countries: India, Saudi Arabia, UAE, Egypt, UK, Australia" },
    { value: 6, suffix: "+", label: "Ventures live and on the way" },
  ],

  story: {
    eyebrow: "My Story",
    heading: "It started in my father's restaurant in Saudi Arabia.",
    pullQuote: "That restaurant was my first classroom.",
    // Short timeline drawn from the story — edit freely
    timeline: [
      { place: "Saudi Arabia", note: "11 years of childhood. Working in my father's restaurant from around 10." },
      { place: "Malappuram → Kochi", note: "Back to Kerala, then Kochi for a BBA and a step out of my comfort zone." },
      { place: "Small businesses", note: "Vehicles, land and clothing, started during my studies." },
      { place: "BEEZY Solutions", note: "Launched during my BBA. 350+ brands in 3+ years." },
      { place: "Next: the GCC", note: "Where my story began." },
    ],
    intro: [
      "I spent 11 years of my childhood in Saudi Arabia. I was around 10 when I started working in my father's restaurant there. He's a businessman, and that restaurant was my first classroom.",
      "I learned how to talk to customers. I learned that people come back to a place where they're treated well. I watched my father handle money, stock, suppliers and bad days, and still open the doors the next morning.",
      "For my higher studies, I moved back to Kerala. I'm from Malappuram, a place where everyone loves football. To break out of my comfort zone and explore new opportunities, I moved to Kochi to study a BBA (Bachelor of Business Administration). But what I know about business didn't come from a degree or a classroom. It came from doing business, starting in my father's own restaurant.",
    ],
    chapters: [
      {
        title: "From small businesses to real ones",
        paragraphs: [
          "During my studies, I started small businesses of my own: vehicles, land and clothing. Some were tiny. Some were risky. Every one of them taught me something new about people, money and patience.",
          "One trip stands out. I travelled to Bangalore, bought clothes wholesale straight from the factories, and brought them back to sell in Kerala. The complete stock sold out within 3 days. That gave me the encouragement to go all in on business.",
          "One by one, they started to work. And I noticed something. The businesses that grew weren't always the ones with the best product. They were the ones people knew about and trusted.",
        ],
      },
      {
        title: "Why I started BEEZY Solutions",
        paragraphs: [
          "That lesson became BEEZY Solutions, my digital marketing and business consulting company. I launched it while I was still doing my BBA.",
          "I wanted to give other business owners what I had to learn the hard way: how to get seen, how to sell, and how to build systems that let a business grow without the owner doing everything.",
          "We've worked with 350+ brands across 6+ countries in 3+ years, including India, Saudi Arabia, the UAE, Egypt, the UK and Australia.",
        ],
      },
      {
        title: "Where I am now",
        paragraphs: [
          "I'm still that kid from my father's restaurant, just with bigger plans. Today I'm a full-time entrepreneur, with my own company and a strong team behind me. Together, we're building new ventures in education, real estate and youth empowerment workshops. Next, I plan to take my own businesses into the GCC, where my story began.",
          "And I'm always open to your next good idea.",
        ],
      },
    ],
  },

  beliefs: {
    eyebrow: "What I Believe",
    heading: "A few things the restaurant taught me",
    items: [
      { title: "People first.", text: "Every business is really about people: customers, staff and partners. Treat them well and the numbers follow." },
      { title: "Know your numbers.", text: "Passion starts a business. Numbers keep it alive." },
      { title: "Build systems, not dependence.", text: "A business that can't run without you is a job, not a business." },
      { title: "Keep learning.", text: "The world changes fast, especially now with AI. I'd rather learn early than catch up late." },
      { title: "Help others grow.", text: "The best part of my work is watching someone else's business take off." },
    ],
  },

  ventures: {
    eyebrow: "My Ventures",
    heading: "What I'm building",
    intro: "Four ventures live today, and more on the way.", // short line under the heading — edit or set to ""
    // Photo beside the heading. Source: assets/at-work.jpg (728×892) → optimised by `npm run images`.
    image: { name: "at-work", alt: "Rashid at his desk, mid-conversation in a meeting", width: 728, height: 892, position: "62% 35%", caption: ["At work", "BEEZY Solutions"] },
    items: [
      {
        name: "BEEZY Solutions",
        role: "Digital marketing and business consulting",
        description: "We help businesses get seen, get leads and grow. From strategy to execution, we handle the work that brings customers through the door.",
        services: ["Digital marketing", "Performance marketing", "Branding", "Video production", "Website development", "Business consulting"],
        proof: "350+ brands across 6+ countries in 3+ years.",
        cta: { label: "Visit BEEZY Solutions", href: "https://www.beezysolutions.in/" },
        logo: "", // TODO: e.g. "/images/beezy-solutions.png" once the file is in public/images
        monogram: "BS",
        featured: true,
      },
      {
        name: "Hot Deals Kochi",
        role: "A Kochi-based community",
        description: "We introduce the new businesses and offers launching in Kochi.",
        proof: "2+ years and growing.",
        cta: { label: "Follow Hot Deals Kochi", href: "https://www.instagram.com/hotdealskochi/" },
        logo: "", // TODO: e.g. "/images/hot-deals-kochi.png" once the file is in public/images
        monogram: "HD",
      },
      {
        name: "ROF Global",
        role: "Business networking",
        description: "A business networking platform that brings business owners, founders and professionals together to share ideas, find partners and grow.",
        cta: { label: "Join ROF Global", href: "https://rofglobal.in/" },
        logo: "", // TODO: e.g. "/images/rof-global.png" once the file is in public/images
        monogram: "RG",
      },
      {
        name: "Behind the Founder",
        role: "Real stories of the people behind the brands",
        description: "Every brand has a founder, and every founder has a story. Behind the Founder showcases those journeys, the struggles and the lessons, so others can learn from them and feel inspired to start.",
        cta: { label: "Watch the Stories", href: "#" }, // TODO: link
        logo: "", // TODO: e.g. "/images/behind-the-founder.png" once the file is in public/images
        monogram: "BF",
      },
    ],
  },

  comingSoon: {
    eyebrow: "Coming Soon",
    heading: "What's next",
    intro: "The world is changing fast. These are the ventures I'm building for what comes next.",
    items: [
      {
        name: "BEEZY Productions",
        tag: "Video production for the digital age",
        text: "Videos made to perform: Meta-optimised ads, brand films and AI-powered videos that stop the scroll and bring results.",
      },
      {
        name: "BEEZY Academy",
        tag: "A sales and marketing academy",
        text: "AI is changing how people work, and many are losing jobs because of it. BEEZY Academy teaches the skills that keep you valuable: sales, marketing, and how to use AI instead of being replaced by it. This isn't just a course. It's a movement to help people take back control of their careers.",
      },
      {
        name: "Real Estate Venture (name to be revealed)",
        tag: "Finding the right property, made simple",
        text: "A real estate company built on trust, helping people find the right property without the usual confusion.",
      },
      {
        name: "Youth Empowerment Workshops (upcoming)",
        tag: "Career skills for the next generation",
        text: "Practical workshops for young people on cracking interviews, presenting themselves with confidence, and getting ready for the working world.",
      },
    ],
    cta: { label: "Get Notified When We Launch", href: "#notify" },
  },

  contact: {
    eyebrow: "Have a Project in Mind?",
    heading: "Got an idea? Let's build it together.",
    text: "Some of my best work started with a simple conversation. If you have a new business idea, a project you want to launch, or a business that's ready for its next stage, I'd love to hear about it.",
    listTitle: "Reach out to me for:",
    reasons: [
      "New business ideas and partnerships",
      "Growing or scaling an existing business",
      "Brand collaborations",
      "Speaking at events and workshops",
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "project", label: "What's your project about?", type: "textarea", required: true },
    ],
    button: "Let's Talk",
    emailSubject: "New enquiry from your website", // subject line of the email you receive
    careersNote: "Looking for a job? This page is for projects and partnerships. For careers, please contact the BEEZY Solutions team at",
    careersLink: { label: "[careers email or careers page link]", href: "#" }, // TODO
  },

  connect: {
    eyebrow: "Connect With Me",
    heading: "Let's stay connected",
    text: "I share what I learn about business, marketing and growth almost every day. Follow along.",
    email: "rashidp.connect@gmail.com", // shown as a fallback under the contact form
    whatsapp: "917907324803",          // digits with country code, used for the wa.me chat link
    whatsappDisplay: "+91 79073 24803", // how the number is shown to visitors
    socials: [
      { name: "Instagram", href: "https://www.instagram.com/rashyee__/", icon: "instagram" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/rashid-p-3838a8287/", icon: "linkedin" },
      { name: "Facebook", href: "https://www.facebook.com/share/1F79xp3dvk/", icon: "facebook" }, // share link; swap for the profile URL (facebook.com/yourname) when handy
      { name: "YouTube", href: "https://www.youtube.com/@rashid-beezy", icon: "youtube" },
      { name: "WhatsApp", href: "https://wa.me/917907324803", icon: "whatsapp" },
      { name: "Email", href: "mailto:rashidp.connect@gmail.com", icon: "email" },
    ],
    subscribeLabel: "Subscribe for Updates",
    subscribePlaceholder: "Your email address",
    subscribeButton: "Notify Me",
  },

  footer: {
    line1: "Rashid · Founder, BEEZY Solutions",
    line2: "", // optional second footer line (removed at the client's request)
    copyright: "© 2026 Rashid. All rights reserved.",
  },
};

export default SITE;
