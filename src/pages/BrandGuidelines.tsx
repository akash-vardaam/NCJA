import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoWhite from "@/assets/logo.png";
import logoColor from "@/assets/logo-color.png";

const BrandGuidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-section-dark text-section-dark-foreground">
          <div className="container-wide mx-auto px-6 lg:px-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Brand Identity</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 max-w-3xl">
              Web Brand Guidelines
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A comprehensive reference for maintaining brand consistency across all digital touchpoints. These guidelines define our visual language, typography, color palette, and component standards.
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 border-b border-border">
          <div className="container-wide mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap gap-3">
              {["Logo", "Color Palette", "Typography", "Spacing & Layout", "Components", "Iconography", "Do's & Don'ts"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  className="px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <GuidelineSection id="logo" title="Logo" subtitle="Our logo is the cornerstone of our brand identity. It should always be used consistently.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <LogoCard label="Primary Logo (Light Background)" bg="bg-background border border-border">
              <img src={logoColor} alt="AS Creative Services Color Logo" className="h-14" />
            </LogoCard>
            <LogoCard label="Reversed Logo (Dark Background)" bg="bg-section-dark">
              <img src={logoWhite} alt="AS Creative Services White Logo" className="h-14" />
            </LogoCard>
          </div>

          <h3 className="text-xl font-display font-semibold mb-4">Clear Space & Minimum Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 rounded-2xl border border-border bg-card">
              <div className="relative inline-block border-2 border-dashed border-primary/30 p-8">
                <img src={logoColor} alt="Logo with clear space" className="h-10" />
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-primary font-mono">1x</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-primary font-mono">1x</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] text-primary font-mono">1x</span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-primary font-mono">1x</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Maintain a minimum clear space equal to the height of the "A" in the logo on all sides.</p>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-card">
              <div className="space-y-6">
                <div>
                  <img src={logoColor} alt="Minimum size" className="h-8" />
                  <p className="text-sm text-muted-foreground mt-2">Minimum digital size: <strong className="text-foreground">120px wide</strong></p>
                </div>
                <div>
                  <img src={logoColor} alt="Minimum print size" className="h-6" />
                  <p className="text-sm text-muted-foreground mt-2">Minimum print size: <strong className="text-foreground">1 inch wide</strong></p>
                </div>
              </div>
            </div>
          </div>
        </GuidelineSection>

        {/* Color Palette */}
        <GuidelineSection id="color-palette" title="Color Palette" subtitle="Our color system is built on HSL values with semantic tokens for consistency across light and dark modes." dark>
          <h3 className="text-xl font-display font-semibold mb-6 text-section-dark-foreground">Primary Colors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <ColorSwatch name="Brand Green" hsl="143, 70%, 41%" hex="#1FB156" token="--primary" />
            <ColorSwatch name="Dark Navy" hsl="220, 25%, 12%" hex="#171D2B" token="--section-dark" />
            <ColorSwatch name="White" hsl="0, 0%, 100%" hex="#FFFFFF" token="--background" />
            <ColorSwatch name="Foreground" hsl="220, 20%, 20%" hex="#293040" token="--foreground" />
          </div>

          <h3 className="text-xl font-display font-semibold mb-6 text-section-dark-foreground">Secondary & UI Colors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <ColorSwatch name="Secondary" hsl="220, 14%, 96%" hex="#F3F4F6" token="--secondary" />
            <ColorSwatch name="Muted Text" hsl="220, 10%, 46%" hex="#6B7280" token="--muted-foreground" />
            <ColorSwatch name="Accent Green" hsl="134, 40%, 95%" hex="#EEFBF0" token="--accent" />
            <ColorSwatch name="Border" hsl="220, 13%, 91%" hex="#E5E7EB" token="--border" />
          </div>

          <h3 className="text-xl font-display font-semibold mb-6 text-section-dark-foreground">Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, hsl(134, 54%, 49%) 0%, hsl(134, 60%, 40%) 100%)" }}>
              <p className="font-display font-semibold text-lg mb-2">Primary Gradient</p>
              <p className="text-sm opacity-80 font-mono">135deg, primary → primary-dark</p>
            </div>
            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(180deg, hsl(220, 25%, 8%) 0%, hsl(220, 25%, 15%) 100%)" }}>
              <p className="font-display font-semibold text-lg mb-2">Dark Gradient</p>
              <p className="text-sm opacity-80 font-mono">180deg, navy-dark → navy-light</p>
            </div>
          </div>
        </GuidelineSection>

        {/* Typography */}
        <GuidelineSection id="typography" title="Typography" subtitle="A carefully paired type system that balances personality with readability.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="p-8 rounded-2xl border border-border bg-card mb-4">
                <p className="text-sm text-primary font-medium uppercase tracking-widest mb-4">Display Font</p>
                <p className="font-display text-5xl font-bold tracking-tight mb-4">DM Sans</p>
                <p className="font-display text-2xl font-semibold text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="font-display text-2xl text-muted-foreground">abcdefghijklmnopqrstuvwxyz</p>
                <p className="font-display text-2xl text-muted-foreground">0123456789</p>
              </div>
              <p className="text-sm text-muted-foreground">Used for all headings (H1–H6), display text, and high-impact elements. Weights: <strong className="text-foreground">600 (Semibold)</strong> and <strong className="text-foreground">700 (Bold)</strong>.</p>
            </div>
            <div>
              <div className="p-8 rounded-2xl border border-border bg-card mb-4">
                <p className="text-sm text-primary font-medium uppercase tracking-widest mb-4">Body Font</p>
                <p className="font-sans text-5xl font-light tracking-tight mb-4">Inter</p>
                <p className="font-sans text-2xl text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="font-sans text-2xl text-muted-foreground">abcdefghijklmnopqrstuvwxyz</p>
                <p className="font-sans text-2xl text-muted-foreground">0123456789</p>
              </div>
              <p className="text-sm text-muted-foreground">Used for body copy, UI labels, navigation, and meta text. Weights: <strong className="text-foreground">300 (Light)</strong>, <strong className="text-foreground">400 (Regular)</strong>, <strong className="text-foreground">500 (Medium)</strong>, <strong className="text-foreground">600 (Semibold)</strong>.</p>
            </div>
          </div>

          <h3 className="text-xl font-display font-semibold mb-6">Type Scale</h3>
          <div className="space-y-6 p-8 rounded-2xl border border-border bg-card">
            <TypeScaleRow tag="H1" size="text-5xl md:text-6xl" example="Page Headline" font="font-display font-bold" />
            <TypeScaleRow tag="H2" size="text-3xl md:text-4xl" example="Section Title" font="font-display font-semibold" />
            <TypeScaleRow tag="H3" size="text-xl md:text-2xl" example="Subsection Title" font="font-display font-semibold" />
            <TypeScaleRow tag="H4" size="text-lg" example="Card Title" font="font-display font-semibold" />
            <TypeScaleRow tag="Body" size="text-base" example="Paragraph text for general content." font="font-sans" />
            <TypeScaleRow tag="Small" size="text-sm" example="Captions, labels, and meta text." font="font-sans text-muted-foreground" />
            <TypeScaleRow tag="Overline" size="text-xs uppercase tracking-widest" example="SECTION LABEL" font="font-sans font-medium text-primary" />
          </div>
        </GuidelineSection>

        {/* Spacing & Layout */}
        <GuidelineSection id="spacing---layout" title="Spacing & Layout" subtitle="Consistent spacing creates rhythm and hierarchy across pages." dark>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 text-section-dark-foreground">Grid System</h3>
              <div className="p-8 rounded-2xl border border-border/20 bg-white/5">
                <div className="grid grid-cols-12 gap-2 mb-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-16 rounded bg-primary/20 flex items-center justify-center text-xs text-primary font-mono">{i + 1}</div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">12-column grid with <strong className="text-section-dark-foreground">max-width: 1280px</strong> (container-wide). Gutters: 24px on mobile, 32px on tablet, 48px on desktop.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 text-section-dark-foreground">Section Spacing</h3>
              <div className="space-y-3">
                <SpacingRow label="Section Padding (mobile)" value="px-6 py-16" pixels="24px / 64px" />
                <SpacingRow label="Section Padding (tablet)" value="px-8 py-24" pixels="32px / 96px" />
                <SpacingRow label="Section Padding (desktop)" value="px-12 py-32" pixels="48px / 128px" />
                <SpacingRow label="Border Radius" value="rounded-2xl" pixels="16px (0.75rem base)" />
                <SpacingRow label="Card Padding" value="p-8" pixels="32px" />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-display font-semibold mb-4 text-section-dark-foreground">Shadow System</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ShadowCard name="Small" token="--shadow-sm" style="0 2px 8px -2px rgba(0,0,0,0.08)" />
            <ShadowCard name="Medium" token="--shadow-md" style="0 8px 24px -4px rgba(0,0,0,0.12)" />
            <ShadowCard name="Large" token="--shadow-lg" style="0 16px 48px -8px rgba(0,0,0,0.16)" />
            <ShadowCard name="Primary" token="--shadow-primary" style="0 8px 24px -4px hsl(134 54% 49% / 0.35)" />
          </div>
        </GuidelineSection>

        {/* Components */}
        <GuidelineSection id="components" title="Components" subtitle="Reusable UI patterns that form the building blocks of every page.">
          <h3 className="text-xl font-display font-semibold mb-6">Buttons</h3>
          <div className="p-8 rounded-2xl border border-border bg-card mb-8">
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <button className="btn-primary">Primary Button</button>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border text-sm font-medium uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors">
                Secondary Button
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider text-primary hover:underline transition-colors">
                Text Button
              </button>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• <strong className="text-foreground">Primary:</strong> Green fill, white text, rounded-full, uppercase tracking, shadow on hover</p>
              <p>• <strong className="text-foreground">Secondary:</strong> Border only, transitions to primary color on hover</p>
              <p>• <strong className="text-foreground">Text:</strong> No background or border, underline on hover</p>
            </div>
          </div>

          <h3 className="text-xl font-display font-semibold mb-6">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-feature">
              <div className="icon-circle mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h4 className="font-display font-semibold text-lg mb-2">Feature Card</h4>
              <p className="text-sm text-muted-foreground">Rounded corners, subtle border, shadow on hover with upward translate.</p>
            </div>
            <div className="card-feature">
              <div className="icon-circle mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <h4 className="font-display font-semibold text-lg mb-2">Interactive Card</h4>
              <p className="text-sm text-muted-foreground">Lifts 4px on hover with shadow transition for tactile feedback.</p>
            </div>
            <div className="card-feature">
              <div className="icon-circle mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
              </div>
              <h4 className="font-display font-semibold text-lg mb-2">Content Card</h4>
              <p className="text-sm text-muted-foreground">Uses icon-circle for visual anchoring with semantic accent colors.</p>
            </div>
          </div>

          <h3 className="text-xl font-display font-semibold mb-6">Overline Labels</h3>
          <div className="p-8 rounded-2xl border border-border bg-card">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-2">Section Label</p>
            <h2 className="text-3xl font-display font-bold mb-4">Paired with a Heading</h2>
            <p className="text-muted-foreground max-w-lg">Overline labels use primary green, uppercase, extra-wide tracking, and small font size. They always sit above a heading to introduce a section.</p>
          </div>
        </GuidelineSection>

        {/* Iconography */}
        <GuidelineSection id="iconography" title="Iconography" subtitle="We use Lucide React icons for a clean, consistent icon language." dark>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {["Menu", "X", "ShoppingCart", "ArrowRight", "ChevronDown", "Mail", "Phone", "MapPin", "Facebook", "Twitter", "Linkedin", "Instagram"].map((name) => (
              <div key={name} className="p-6 rounded-2xl border border-border/20 bg-white/5 flex flex-col items-center gap-3">
                <div className="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/></svg>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl border border-border/20 bg-white/5">
            <p className="text-sm text-muted-foreground">
              <strong className="text-section-dark-foreground">Library:</strong> Lucide React · <strong className="text-section-dark-foreground">Default size:</strong> 24×24 (w-6 h-6) · <strong className="text-section-dark-foreground">Stroke:</strong> 2px · <strong className="text-section-dark-foreground">Icon circles:</strong> 56×56 (w-14 h-14) with accent background
            </p>
          </div>
        </GuidelineSection>

        {/* Do's & Don'ts */}
        <GuidelineSection id="do-s---don-ts" title="Do's & Don'ts" subtitle="Quick reference for maintaining brand integrity.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-display font-semibold text-primary mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" /> Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Use semantic color tokens (--primary, --foreground, etc.)",
                  "Maintain clear space around the logo",
                  "Use DM Sans for headings, Inter for body",
                  "Apply consistent section padding via .section-padding",
                  "Use the primary gradient for high-impact CTAs",
                  "Ensure proper contrast in both light and dark modes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-destructive mb-4 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center">✕</span> Don't
              </h3>
              <ul className="space-y-3">
                {[
                  "Use hardcoded color values in components (e.g., text-white, bg-black)",
                  "Stretch, rotate, or modify the logo proportions",
                  "Mix brand fonts with other typefaces",
                  "Use sharp corners — maintain rounded-2xl for cards",
                  "Place the logo on busy backgrounds without a container",
                  "Override design tokens with inline styles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GuidelineSection>
      </main>
      <Footer />
    </div>
  );
};

/* ── Sub-components ── */

const GuidelineSection = ({ id, title, subtitle, dark, children }: {
  id: string; title: string; subtitle: string; dark?: boolean; children: React.ReactNode;
}) => (
  <section id={id} className={`section-padding ${dark ? "bg-section-dark" : "bg-background"}`}>
    <div className="container-wide mx-auto">
      <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">{title}</p>
      <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${dark ? "text-section-dark-foreground" : "text-foreground"}`}>{title}</h2>
      <p className="text-muted-foreground mb-12 max-w-2xl">{subtitle}</p>
      {children}
    </div>
  </section>
);

const LogoCard = ({ label, bg, children }: { label: string; bg: string; children: React.ReactNode }) => (
  <div>
    <div className={`${bg} rounded-2xl p-12 flex items-center justify-center min-h-[200px]`}>
      {children}
    </div>
    <p className="text-sm text-muted-foreground mt-3">{label}</p>
  </div>
);

const ColorSwatch = ({ name, hsl, hex, token }: { name: string; hsl: string; hex: string; token: string }) => {
  const [copied, setCopied] = useState(false);
  const copyHex = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="rounded-2xl overflow-hidden border border-border/20 bg-white/5">
      <div className="h-24 w-full" style={{ backgroundColor: `hsl(${hsl})` }} />
      <div className="p-4">
        <p className="font-display font-semibold text-section-dark-foreground text-sm">{name}</p>
        <button onClick={copyHex} className="flex items-center gap-1.5 mt-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {hex}
        </button>
        <p className="text-xs font-mono text-muted-foreground mt-1">{token}</p>
      </div>
    </div>
  );
};

const TypeScaleRow = ({ tag, size, example, font }: { tag: string; size: string; example: string; font: string }) => (
  <div className="flex items-baseline gap-6 pb-4 border-b border-border last:border-0 last:pb-0">
    <span className="text-xs font-mono text-primary w-14 flex-shrink-0">{tag}</span>
    <p className={`${size} ${font} tracking-tight`}>{example}</p>
  </div>
);

const SpacingRow = ({ label, value, pixels }: { label: string; value: string; pixels: string }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-border/20 bg-white/5">
    <span className="text-sm text-section-dark-foreground">{label}</span>
    <div className="text-right">
      <span className="text-xs font-mono text-primary">{value}</span>
      <span className="text-xs text-muted-foreground ml-3">{pixels}</span>
    </div>
  </div>
);

const ShadowCard = ({ name, token, style }: { name: string; token: string; style: string }) => (
  <div className="p-6 rounded-2xl bg-white flex flex-col items-center gap-3" style={{ boxShadow: style }}>
    <p className="font-display font-semibold text-foreground text-sm">{name}</p>
    <p className="text-xs font-mono text-muted-foreground">{token}</p>
  </div>
);

export default BrandGuidelines;
