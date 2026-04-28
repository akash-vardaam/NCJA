import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Phone, Mail, Users, Award, Shield, Zap,
  CheckCircle, Globe, Server, Layers, Calendar,
  FileText, TrendingUp, Lock, RefreshCw, ExternalLink, CreditCard, Search, Database, Download, X
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { getThemeAssetUrl } from "@/lib/theme-assets";

const themeAsset = (assetName: string) => getThemeAssetUrl(`assets/${assetName}`);

const logoColor = themeAsset("logo-color.png");
const logoDark = themeAsset("logo-dark.png");
const chrisHoover = themeAsset("chris-hoover.jpg");
const plrbLogo = themeAsset("plrb-logo.png");
const justinWatsonPhoto = themeAsset("justin-watson.jpg");
const casConceptPdf = themeAsset("NCJA_DNA_Concept.pdf");

// ─── Fade-in on scroll wrapper ───────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Animated stat counter ────────────────────────────────────────────────────
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, target, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.floor(v).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

// ─── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About Us", href: "#overview" },
  { label: "Leadership", href: "#team" },
  { label: "Our Experience", href: "#experience" },
  { label: "Our Approach", href: "#approach" },
  { label: "Key Capabilities", href: "#capabilities" },
  { label: "Timeline", href: "#timeline" },
  { label: "Investment", href: "#pricing" },
  { label: "References", href: "#references" },
];

export default function RFI() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [conceptOpen, setConceptOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sectionIds = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSection]);

  useEffect(() => {
    if (!conceptOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConceptOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [conceptOpen]);

  const scrollNav = (dir: "left" | "right") => {
    if (!navRef.current) return;
    navRef.current.scrollBy({ left: dir === "right" ? 200 : -200, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sticky Nav ─────────────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-[hsl(220,25%,10%)/80] backdrop-blur-sm"
      }`}>
        {/* Top bar: logo + CTA */}
        <div className={`container-wide mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`}>
          <img src={scrolled || menuOpen ? logoColor : logoDark} alt="AS Creative Services" className="h-9 md:h-10" />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConceptOpen(true)}
              className={`hidden lg:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-200 ${
                scrolled
                  ? "border-primary/70 text-primary hover:bg-primary hover:text-white"
                  : "border-primary/70 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              View NCJA Concept
            </button>
            <a
              href="https://ascreativeservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                scrolled
                  ? "border-border text-muted-foreground hover:text-primary hover:border-primary"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/50"
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              Visit Our Site
            </a>
            <a href="https://ascreativeservices.com/contact/" target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5">
              Schedule Discussion
            </a>
            <button
              type="button"
              onClick={() => setConceptOpen(true)}
              className="inline-flex lg:hidden items-center gap-2 rounded-full border border-primary/70 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <FileText className="w-3.5 h-3.5" />
              View PDF
            </button>
            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(o => !o)} className="lg:hidden p-2" style={{ color: scrolled || menuOpen ? "hsl(var(--foreground))" : "#fff" }}>
              <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>

        {/* Tab nav bar */}
        <div className={`hidden lg:block border-t transition-all duration-300 ${
          scrolled ? "border-border bg-background/95" : "border-white/10 bg-[hsl(220,25%,8%)]/60"
        }`}>
          <div className="container-wide mx-auto px-6 lg:px-12 relative flex items-center">
            <button
              onClick={() => scrollNav("left")}
              className={`flex-shrink-0 p-1.5 rounded-full transition-all mr-1 ${scrolled ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-white/40 hover:text-white hover:bg-white/10"}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <nav ref={navRef} className="flex items-center gap-0 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1">
              {NAV_LINKS.map((l, i) => {
                const id = l.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    data-section={id}
                    className={`relative flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all duration-200 group ${
                      isActive
                        ? "text-primary"
                        : scrolled
                          ? "text-muted-foreground hover:text-foreground"
                          : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : scrolled
                          ? "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                          : "bg-white/10 text-white/60 group-hover:bg-primary/30 group-hover:text-white"
                    }`}>
                      {i + 1}
                    </span>
                    {l.label}
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-200 ${isActive ? "opacity-100" : "opacity-0"}`} />
                  </a>
                );
              })}
            </nav>
            <button
              onClick={() => scrollNav("right")}
              className={`flex-shrink-0 p-1.5 rounded-full transition-all ml-1 ${scrolled ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-white/40 hover:text-white hover:bg-white/10"}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary py-1 transition-colors">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {conceptOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/88 backdrop-blur-sm px-4 py-6 md:px-8 md:py-9"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cas-concept-title"
        >
          <div className="mx-auto flex h-full max-w-[1728px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex min-h-[92px] items-center justify-between gap-4 border-b border-slate-200 px-6 md:px-8">
              <h2 id="cas-concept-title" className="text-lg font-bold tracking-wide text-slate-700">
                NCJA Concept
              </h2>
              <div className="flex items-center gap-4">
                <a
                  href={casConceptPdf}
                  download="NCJA_DNA_Concept.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/35 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setConceptOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close NCJA concept preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 bg-slate-100">
              <iframe
                title="NCJA Concept PDF preview"
                src={`${casConceptPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(220, 25%, 8%) 0%, hsl(220, 25%, 14%) 60%, hsl(143, 30%, 10%) 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--primary)) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "hsl(var(--primary))" }} />

        <div className="relative container-wide mx-auto px-6 lg:px-12 py-40 text-center">
          <FadeIn>
            <p className="text-primary text-xs font-medium uppercase tracking-[0.25em] mb-6">
              Proposal Submission · NCJA DNA Center Website Design & Development
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.08] mb-6 max-w-5xl mx-auto">
              A Modern Digital Home for the<br />
              <span className="text-gradient">NCJA DNA Center</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
              A flexible, accessible WordPress platform — extended with Laravel-based modules for advanced, database-driven functionality — built to serve the public, researchers, and state and local agencies.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm mb-12">
              <span>Submitted to: <strong className="text-white/70">NCJA DNA Center</strong></span>
              <span className="hidden sm:block text-white/20">·</span>
              <span>In response to: <strong className="text-white/70">DNA Center Website RFP</strong></span>
              <span className="hidden sm:block text-white/20">·</span>
              <span>By: <strong className="text-white/70">AS Creative Services</strong></span>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#overview" className="btn-primary">
                About Us <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#approach"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-sm font-medium uppercase tracking-wider text-white hover:border-primary hover:text-primary transition-colors">
                Our Approach
              </a>
              <a href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-sm font-medium uppercase tracking-wider text-white hover:border-primary hover:text-primary transition-colors">
                <FileText className="w-4 h-4" />
                Investment
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 2: EXECUTIVE SUMMARY / OVERVIEW ─────────────────────── */}
      <section id="overview" className="py-24 md:py-32 bg-background">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">About Us</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 max-w-3xl mx-auto">About AS Creative Services</h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
            <FadeIn className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                AS Creative Services is a digital agency specializing in high-performance websites for associations, nonprofits, advocacy organizations, and membership-based entities. We blend premium design, thoughtful development, and long-term support into solutions that are elegant, scalable, and easy to manage.
              </p>
              {[
                { icon: <Layers className="w-5 h-5" />, text: "Association & nonprofit website specialists" },
                { icon: <Globe className="w-5 h-5" />, text: "Custom WordPress enterprise development" },
                { icon: <Database className="w-5 h-5" />, text: "Laravel modules for database-driven needs" },
                { icon: <Shield className="w-5 h-5" />, text: "WCAG accessibility & long-term maintainability" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="icon-circle flex-shrink-0">{item.icon}</div>
                  <p className="text-foreground font-medium text-lg leading-snug pt-3.5">{item.text}</p>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="card-feature p-10">
                <p className="text-xs text-primary font-medium uppercase tracking-widest mb-6">Primary Contact</p>
                <h3 className="font-display font-bold text-2xl mb-1">Justin Watson</h3>
                <p className="text-muted-foreground mb-6">Technology Strategy & Integration</p>
                <div className="space-y-3 mb-8">
                  <a href="mailto:jwatson@phwmail.email"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">jwatson@phwmail.email</span>
                  </a>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Submitted To</p>
                  <p className="font-semibold text-foreground">NCJA DNA Center</p>
                  <p className="text-sm text-muted-foreground">In response to the DNA Center Website Design & Development RFP</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Executive Summary highlights */}
          <FadeIn delay={0.2} className="mt-16">
            <div className="p-8 rounded-2xl bg-accent border border-primary/20">
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">Executive Summary</p>
              <p className="text-foreground text-lg leading-relaxed mb-4">
                AS Creative Services is pleased to submit this proposal in response to the NCJA DNA Center Website Design &amp; Development RFP. We understand the importance of launching a modern, flexible, highly usable digital platform that serves the public, researchers, and state/local agencies seeking trusted information regarding forensic DNA policy and practice.
              </p>
              <p className="text-foreground text-lg leading-relaxed mb-6">
                Based on the goals outlined in the RFP, we recommend a custom WordPress-based solution with strategic flexibility to complement certain advanced functionality through Laravel-based modules when appropriate for database-driven or application-specific needs. This hybrid approach allows NCJA to benefit from WordPress's ease of content management while preserving future scalability for more complex systems.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Trusted public-facing resource",
                  "Researcher & agency access",
                  "Easy content management",
                  "Future-ready scalability",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 3: PROJECT TEAM ──────────────────────────────────────── */}
      <section id="team" className="py-24 md:py-32 bg-section-dark text-section-dark-foreground">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Leadership</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Key Team Members</h2>
            <p className="text-white/60 text-lg max-w-2xl mb-14 mx-auto">Our principals are engaged from day one. No layers. No disconnect.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Justin Watson",
                title: "Technology Strategy & Integration",
                photo: justinWatsonPhoto,
                items: [
                  "Association & nonprofit technology specialist",
                  "Deep experience in marketing and digital architecture",
                  "Strategic advisor on platform selection and integrations",
                  "Primary contact and project lead",
                ],
              },
              {
                name: "Chris Hoover",
                title: "Creative Director & UX Lead",
                photo: chrisHoover,
                items: [
                  "20+ years in UI/UX and web design",
                  "Award-winning designer",
                  "Led high-profile integrations and large-scale overhauls",
                  "Mobile-first design focused on clarity and accessibility",
                ],
              },
            ].map((person, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all h-full">
                  {person.photo ? (
                    <img src={person.photo} alt={person.name} className="w-20 h-20 rounded-full object-cover mb-6 ring-2 ring-primary/40" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  <h3 className="font-display font-bold text-2xl mb-1 text-white">{person.name}</h3>
                  <p className="text-primary text-sm font-medium mb-6">{person.title}</p>
                  <ul className="space-y-3">
                    {person.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: RELEVANT EXPERIENCE ──────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 bg-background">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Our Experience</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Platforms We've Delivered</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-14">
              AS Creative Services specializes in digital platforms for associations, nonprofits, and mission-driven organizations — including content-rich, research-oriented sites.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { org: "MAFP", url: "https://mafp.org", scope: "Membership site with event workflows & member data integration", cms: "WordPress" },
              { org: "PLRB", url: "https://www.plrb.org", scope: "120,000+ page consolidation, LMS, and AI-powered search", cms: "Laravel + WordPress" },
              { org: "ICRI", url: "https://www.icri.org", scope: "Modern responsive redesign for professional society", cms: "WordPress" },
              { org: "Surety", url: "https://surety.org", scope: "Association platform with member portal and resources", cms: "WordPress" },
            ].map((org, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-feature p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-3xl text-primary">{org.org}</span>
                  </div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">{org.cms}</p>
                  <p className="text-sm text-foreground flex-1 mb-4">{org.scope}</p>
                  <a href={org.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> {org.url.replace("https://", "").replace("www.", "")}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* PLRB Case Study highlight */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10 rounded-2xl border border-primary/30 bg-primary/5">
              <div className="lg:col-span-1 flex flex-col justify-center">
                <img src={plrbLogo} alt="PLRB" className="h-12 mb-4 object-contain object-left" />
                <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">Flagship Case Study</p>
                <p className="font-display font-bold text-5xl text-primary mb-1">
                  <Counter target={120000} suffix="+" />
                </p>
                <p className="text-muted-foreground text-sm">Pages Consolidated</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Challenge", icon: <FileText className="w-4 h-4" />, items: ["Legacy ColdFusion architecture", "Fragmented databases", "No unified platform"] },
                  { label: "Solution", icon: <Zap className="w-4 h-4" />, items: ["Laravel Core Application", "Custom LMS integration", "AI-powered search (Meilisearch + Bedrock)"] },
                  { label: "Outcome", icon: <TrendingUp className="w-4 h-4" />, items: ["Unified scalable platform", "120k+ assets consolidated", "AI summarization live"] },
                ].map((col, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary">{col.icon}</span>
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground">{col.label}</p>
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-muted-foreground text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 5: OUR APPROACH ──────────────────────────────────────── */}
      <section id="approach" className="py-24 md:py-32 bg-section-dark text-section-dark-foreground">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-6">Our Approach</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">A Hybrid WordPress + Laravel Platform</h2>
            <p className="text-white/60 text-lg max-w-2xl mb-14 mx-auto">
              WordPress powers easy, day-to-day content management. Laravel-based modules extend the platform when database-driven or application-specific functionality is required.
            </p>
          </FadeIn>

          {/* Audience pillars */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Public Audiences" },
              { icon: <Search className="w-5 h-5" />, label: "Researchers" },
              { icon: <Shield className="w-5 h-5" />, label: "State & Local Agencies" },
              { icon: <FileText className="w-5 h-5" />, label: "Policy Resources" },
              { icon: <Database className="w-5 h-5" />, label: "Practice Guidance" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
                    {item.icon}
                  </div>
                  <p className="text-white/80 text-sm font-medium leading-snug">{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Platform Architecture */}
          <FadeIn delay={0.2}>
            <div className="mb-6">
              <p className="text-primary text-xs font-bold uppercase tracking-widest text-center mb-8">Platform Architecture</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "CMS",
                    title: "WordPress Core",
                    desc: "Familiar, user-friendly content management for NCJA staff and contributors.",
                    icon: <Globe className="w-5 h-5" />,
                  },
                  {
                    label: "Advanced Modules",
                    title: "Laravel Extensions",
                    desc: "Database-driven applications for research libraries, structured data, and custom tools.",
                    icon: <Database className="w-5 h-5" />,
                  },
                  {
                    label: "Integration Layer",
                    title: "Secure API Hub",
                    desc: "Middleware to securely orchestrate data between WordPress, Laravel, and future systems.",
                    icon: <Server className="w-5 h-5" />,
                  },
                  {
                    label: "Design",
                    title: "Accessible Mobile-First UI",
                    desc: "Modern interface focused on clarity, usability, and WCAG-aligned accessibility.",
                    icon: <Layers className="w-5 h-5" />,
                  },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary">{item.icon}</span>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">{item.label}</p>
                    </div>
                    <p className="font-display font-bold text-lg text-white mb-2">{item.title}</p>
                    <p className="text-white/55 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 6: KEY CAPABILITIES ──────────────────────────────────── */}
      <section id="capabilities" className="py-24 md:py-32 bg-background">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Key Capabilities</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-14">What the Platform Delivers</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "Trusted Public Information",
                icon: <Globe className="w-5 h-5" />,
                items: ["Clear, plain-language explainers on forensic DNA", "Structured policy & practice resources", "Mobile-first reading experience"],
              },
              {
                title: "Researcher & Agency Tools",
                icon: <Database className="w-5 h-5" />,
                items: ["Searchable resource library", "Categorized publications & guidance", "Optional gated access for sensitive materials"],
              },
              {
                title: "Content & Editorial Workflow",
                icon: <FileText className="w-5 h-5" />,
                items: ["WordPress editorial UI for non-technical staff", "Reusable content blocks & templates", "Versioning and review workflows"],
              },
              {
                title: "Search & Discovery",
                icon: <Search className="w-5 h-5" />,
                items: ["Advanced site-wide search", "Faceted filtering by topic, jurisdiction, and type", "Future-ready for AI-supported discovery"],
              },
            ].map((cap, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-feature p-8 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="icon-circle flex-shrink-0">{cap.icon}</div>
                    <h3 className="font-display font-semibold text-xl">{cap.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {cap.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Platform foundations */}
          <FadeIn delay={0.2}>
            <div className="p-8 rounded-2xl bg-secondary border border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6 text-center">Technical Foundations</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "WordPress", desc: "Core CMS" },
                  { name: "Laravel", desc: "Custom modules" },
                  { name: "Managed Hosting", desc: "Performance & uptime" },
                  { name: "Analytics", desc: "Engagement insights" },
                ].map((int, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-background border border-border">
                    <p className="font-semibold text-foreground text-sm mb-1">{int.name}</p>
                    <p className="text-xs text-muted-foreground">{int.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Accessibility */}
          <FadeIn delay={0.3}>
            <div className="mt-6 p-8 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Accessibility</p>
                <p className="font-display font-semibold text-lg text-foreground mb-1">WCAG 2.1 AA Compliance</p>
                <p className="text-muted-foreground text-sm">Includes the optional AS Accessibility adaptive interface for full ADA compliance alignment — important for public-sector audiences.</p>
              </div>
              <a href="https://asaccessibility.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium whitespace-nowrap">
                asaccessibility.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 7: TIMELINE ──────────────────────────────────────────── */}
      <section id="timeline" className="py-24 md:py-32 bg-section-dark text-section-dark-foreground">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Timeline</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Project Timeline</h2>
            <p className="text-white/60 text-lg mb-16">Estimated total project duration: <span className="text-primary font-semibold">5–6 months</span></p>
          </FadeIn>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-white/10 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  phase: "Phase 1",
                  label: "Discovery & Planning",
                  duration: "1 Month",
                  items: ["Stakeholder interviews", "Content & resource audit", "Information architecture"],
                  color: "bg-primary/70",
                },
                {
                  phase: "Phase 2",
                  label: "Design & Content Strategy",
                  duration: "1.5 Months",
                  items: ["UX wireframes", "Visual design system", "Content modeling for resources"],
                  color: "bg-primary/85",
                },
                {
                  phase: "Phase 3",
                  label: "Development",
                  duration: "2.5 Months",
                  items: ["WordPress build", "Laravel modules where needed", "Search & accessibility"],
                  color: "bg-primary",
                },
                {
                  phase: "Phase 4",
                  label: "QA, Training & Launch",
                  duration: "2–3 Weeks",
                  items: ["Cross-browser & accessibility QA", "Staff training", "Public launch & post-launch support"],
                  color: "bg-primary/75",
                },
              ].map((phase, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className="flex flex-col">
                    <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center mb-6 mx-auto md:mx-0 relative`}>
                      <span className="text-white font-bold text-xs text-center leading-tight px-1">{i + 1}</span>
                      <div className={`absolute -inset-1 rounded-full ${phase.color} opacity-30 animate-ping`} style={{ animationDuration: `${3 + i}s` }} />
                    </div>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1 text-center md:text-left">{phase.phase}</p>
                    <h3 className="font-display font-semibold text-xl text-white mb-1 text-center md:text-left">{phase.label}</h3>
                    <p className="text-primary text-xs font-medium mb-4 text-center md:text-left">{phase.duration}</p>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-white/65 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: PRICING ───────────────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 bg-background">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Investment</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-14">Investment Overview</h2>
          </FadeIn>
          <FadeIn className="mb-10">
            <div className="rounded-2xl border-2 border-primary overflow-hidden" style={{ boxShadow: "var(--shadow-primary)" }}>
              <div className="px-6 md:px-10 py-5 bg-primary/5 border-b-2 border-primary flex items-center justify-between">
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Investment Summary</p>
                <p className="text-xs text-muted-foreground hidden md:block">Final scope to be confirmed in discovery</p>
              </div>
              <div className="divide-y divide-border">
                {[
                  { item: "Website Strategy, Design & Development", note: "Discovery, UX, visual system, WordPress + Laravel build, content migration, training", cost: "$39,724" },
                  { item: "AS Creative Managed Hosting (24 Months)", note: "Managed hosting, security updates, uptime monitoring", cost: "$3,776" },
                  { item: "AS Accessibility Services (24 Months)", note: "ADA compliance tooling & monitoring", cost: "$4,800" },
                  { item: "Included 40 Hours Development Services (24 Months)", note: "Post-launch enhancements & support hours", cost: "Included" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-6 md:px-10 py-5 items-center hover:bg-secondary/40 transition-colors">
                    <div className="col-span-12 md:col-span-8">
                      <p className="font-semibold text-foreground text-sm md:text-base">{row.item}</p>
                      <p className="text-xs text-muted-foreground mt-1">{row.note}</p>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:text-right">
                      <p className={`font-display font-bold text-lg md:text-xl ${row.cost === "Included" ? "text-muted-foreground italic" : "text-primary"}`}>
                        {row.cost}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-4 px-6 md:px-10 py-6 items-center bg-primary/5 border-t-2 border-primary">
                <div className="col-span-12 md:col-span-8">
                  <p className="font-display font-bold text-lg md:text-2xl text-foreground">Total Investment</p>
                  <p className="text-xs text-muted-foreground mt-1">All hosting, accessibility, and included development hours bundled into a single fee.</p>
                </div>
                <div className="col-span-12 md:col-span-4 md:text-right">
                  <p className="font-display font-bold text-3xl md:text-4xl text-primary">$48,300</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Ongoing Support */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-secondary border border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Post-Launch Support</p>
                <p className="font-semibold text-foreground mb-3">Flexible Hourly Blocks</p>
                <div className="flex gap-6">
                  <div>
                    <p className="font-display font-bold text-2xl text-primary">$120<span className="text-sm text-muted-foreground font-normal">/hr</span></p>
                    <p className="text-xs text-muted-foreground">Small blocks</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl text-primary">$100<span className="text-sm text-muted-foreground font-normal">/hr</span></p>
                    <p className="text-xs text-muted-foreground">40-hour blocks</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-accent border border-primary/20">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Ownership</p>
                <p className="font-semibold text-foreground mb-2">100% Owned by NCJA</p>
                <p className="text-sm text-muted-foreground">NCJA will own 100% of the website, code, and design deliverables. CMS training and custom documentation for staff workflows included.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 9: REFERENCES ────────────────────────────────────────── */}
      <section id="references" className="py-24 md:py-32 bg-secondary">
        <div className="container-wide mx-auto px-6 lg:px-12">
          <FadeIn className="text-center">
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">References</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-14">Client References</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bryan Falchuk", title: "President & CEO, Property & Liability Resource Bureau", phone: "617-435-4440" },
              { name: "Jen Hirt", title: "AVP Communications, District of Columbia Hospital Association", phone: "703-867-0171" },
              { name: "John McCambridge", title: "Owner, MLM Home Improvement", phone: "703-459-3540" },
              { name: "Matt Hoffman", title: "Town Manager, Town of Kensington", phone: "301-949-2424" },
            ].map((ref, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card-feature p-7 h-full">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1">{ref.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-snug">{ref.title}</p>
                  <div className="space-y-2">
                    <a href={`tel:${ref.phone.replace(/-/g, "")}`}
                      className="flex items-center gap-2 text-xs text-foreground hover:text-primary transition-colors">
                      <Phone className="w-3.5 h-3.5 text-primary" /> {ref.phone}
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section id="closing" className="py-32 md:py-40 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(220, 25%, 8%) 0%, hsl(220, 25%, 14%) 60%, hsl(143, 30%, 10%) 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "hsl(var(--primary))" }} />
        <div className="relative container-wide mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-primary text-xs font-medium uppercase tracking-[0.25em] mb-6">Why AS Creative</p>
            <h2 className="font-display font-bold text-3xl md:text-6xl text-white mb-6 max-w-4xl mx-auto">
              A Future-Ready Platform for the NCJA DNA Center
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              By pairing WordPress's ease of content management with Laravel's flexibility for advanced functionality, NCJA gains a trusted public-facing platform that scales with its mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {[
                "Trusted resource for the public",
                "Easy editorial workflow for staff",
                "Scalable foundation for future tools",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
            <a href="https://ascreativeservices.com/contact/" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-10 py-4">
              Schedule a Discussion <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-white/40 text-sm mt-6">
              Submitted by AS Creative Services · Justin Watson · <a href="mailto:jwatson@phwmail.email" className="hover:text-primary transition-colors">jwatson@phwmail.email</a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-10">
        <div className="container-wide mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoColor} alt="AS Creative Services" className="h-8" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AS Creative Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
