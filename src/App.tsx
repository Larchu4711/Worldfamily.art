import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  ChevronDown,
  Menu,
  X,
  MapPin,
  ExternalLink,
  Download,
} from 'lucide-react';
import {
  CONTENT,
  IMAGES,
  type Locale,
  type SectionId,
} from './data/worldFamilyContent';
import {
  DiscoBallEmblem,
  HandDrawnWaves,
  HandDrawnHeart,
} from './components/BrandGraphics';
import { TornPaperEdge } from './components/TornPaperEdge';
import { SubpageShowcaseCard } from './components/SubpageShowcaseCard';
import { VideoImpressionsModal, InquiryModal } from './components/Modals';
import { CosmicParticleBeamCanvas } from './components/CosmicParticleBeamCanvas';
import type { ParticlePoint } from './utils/particlePhysics';

export default function App() {
  const [locale, setLocale] = useState<Locale>('de');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeSectionFilter, setActiveSectionFilter] = useState<SectionId | 'all'>('all');
  const [beamedSection, setBeamedSection] = useState<SectionId | null>(null);
  const [beamState, setBeamState] = useState<{
    isActive: boolean;
    phase: 'idle' | 'dissolving' | 'exploding';
    targetPoint: ParticlePoint | null;
    pendingDestination: SectionId | null | 'home';
  }>({
    isActive: false,
    phase: 'idle',
    targetPoint: null,
    pendingDestination: null,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isWorldDropdownOpen, setIsWorldDropdownOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const t = CONTENT[locale];
  const currentHeroSlide = t.hero.slides[activeSlideIndex] || t.hero.slides[0];

  const findTargetCoordinates = (targetSelector: string, fallbackEl?: HTMLElement | null): ParticlePoint => {
    try {
      const el = document.querySelector(targetSelector) as HTMLElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (Number.isFinite(rect.left) && Number.isFinite(rect.top) && rect.width > 0) {
          el.classList.remove('btn-energy-absorbing');
          void el.offsetWidth;
          el.classList.add('btn-energy-absorbing');
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
      }
      if (fallbackEl) {
        const rect = fallbackEl.getBoundingClientRect();
        if (Number.isFinite(rect.left) && Number.isFinite(rect.top) && rect.width > 0) {
          fallbackEl.classList.remove('btn-energy-absorbing');
          void fallbackEl.offsetWidth;
          fallbackEl.classList.add('btn-energy-absorbing');
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
      }
    } catch {
      // fallback safely
    }
    return { x: window.innerWidth * 0.5, y: 40 };
  };

  const handleBeamToSection = (sectionId: SectionId, e?: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    setIsWorldDropdownOpen(false);

    if (beamState.isActive) return;

    const targetPoint = findTargetCoordinates(
      `[data-nav-target="${sectionId}"]`,
      e?.currentTarget as HTMLElement
    );

    setBeamState({
      isActive: true,
      phase: 'dissolving',
      targetPoint,
      pendingDestination: sectionId,
    });
  };

  const handleBeamHome = (e?: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    setIsWorldDropdownOpen(false);

    if (beamState.isActive) return;

    const targetPoint = findTargetCoordinates(
      '[data-nav-target="home"]',
      e?.currentTarget as HTMLElement
    );

    setBeamState({
      isActive: true,
      phase: 'dissolving',
      targetPoint,
      pendingDestination: 'home',
    });
  };

  const handleParticleMidpoint = () => {
    if (beamState.pendingDestination === 'home') {
      setBeamedSection(null);
      setActiveSectionFilter('all');
    } else if (beamState.pendingDestination) {
      setBeamedSection(beamState.pendingDestination);
    }
    setBeamState((prev) => ({ ...prev, phase: 'exploding' }));
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleParticleComplete = () => {
    setBeamState({
      isActive: false,
      phase: 'idle',
      targetPoint: null,
      pendingDestination: null,
    });
    document.querySelectorAll('.btn-energy-absorbing').forEach((el) => {
      el.classList.remove('btn-energy-absorbing');
    });
  };

  const handleScrollToOverview = () => {
    const el = document.getElementById('world-family-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadDesignMd = async () => {
    try {
      const res = await fetch('/design.md');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'design.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.location.href = '/design.md';
    }
  };

  const sectionOrder: SectionId[] = [
    'world-family',
    'bar',
    'street-food',
    'garden',
    'applications',
  ];

  const visibleSections =
    activeSectionFilter === 'all'
      ? sectionOrder
      : sectionOrder.filter((id) => id === activeSectionFilter);

  return (
    <div className="min-h-screen flex flex-col parchment-surface text-[#231f20]">
      {/* =====================================================================
          COSMIC PARTICLE BEAM PORTAL CANVAS
          (Page dissolves into particles -> vortex into button -> fountain explosion)
         ===================================================================== */}
      <CosmicParticleBeamCanvas
        isActive={beamState.isActive}
        targetPoint={beamState.targetPoint}
        onMidpoint={handleParticleMidpoint}
        onComplete={handleParticleComplete}
      />

      {/* =====================================================================
          TOP NAVIGATION BAR (Matches the dark twilight header in the mockup)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#1c2335]/95 backdrop-blur-md text-white border-b border-white/15 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Lockup (Mini Disco Ball Emblem + Handwritten WorldFamily.art) */}
          <a
            href="#top"
            data-nav-target="home"
            onClick={(e) => {
              e.preventDefault();
              handleBeamHome(e);
            }}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group cursor-pointer"
          >
            <DiscoBallEmblem size="sm" />
            <span className="font-script text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#f2c438] transition-colors">
              WorldFamily.art
            </span>
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links matching the mockup */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-[15px] font-medium text-white/90"
          >
            {/* World Family dropdown link */}
            <div className="relative">
              <button
                type="button"
                data-nav-target="world-family"
                onClick={() => setIsWorldDropdownOpen((prev) => !prev)}
                aria-expanded={isWorldDropdownOpen}
                className={`inline-flex items-center gap-1.5 py-2 hover:text-[#f2c438] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  beamedSection === 'world-family' ? 'text-[#f2c438] font-bold' : ''
                }`}
              >
                <span>{t.nav.worldFamily}</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
              </button>

              {isWorldDropdownOpen && (
                <div
                  onMouseLeave={() => setIsWorldDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-56 rounded-xl bg-[#1c2335] border border-white/20 shadow-xl py-2 z-50"
                >
                  <button
                    type="button"
                    onClick={(e) => handleBeamHome(e)}
                    className="w-full text-left px-4 py-2 text-sm text-[#f2c438] font-semibold hover:bg-white/10 transition-colors cursor-pointer border-b border-white/10"
                  >
                    ✦ Startseite (Übersicht)
                  </button>
                  {t.cards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={(e) => handleBeamToSection(card.id, e)}
                      className="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-[#f2c438] transition-colors cursor-pointer"
                    >
                      {card.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              data-nav-target="bar"
              onClick={(e) => handleBeamToSection('bar', e)}
              className={`bg-white text-[#1c2335] hover:bg-[#fffdf7] hover:text-[#0b0f19] font-bold text-xs sm:text-sm px-4 sm:px-5 py-1.5 rounded-full border border-black/10 shadow-[0_3px_10px_rgba(0,0,0,0.32)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105 hover:shadow-[0_5px_15px_rgba(0,0,0,0.45)] ${
                beamedSection === 'bar'
                  ? 'ring-2 ring-[#f2c438] bg-[#fffaf0] text-[#0b0f19] shadow-[0_0_16px_rgba(242,196,56,0.6)] scale-105'
                  : ''
              }`}
            >
              {t.nav.bar}
            </button>
            <button
              type="button"
              data-nav-target="street-food"
              onClick={(e) => handleBeamToSection('street-food', e)}
              className={`bg-white text-[#1c2335] hover:bg-[#fffdf7] hover:text-[#0b0f19] font-bold text-xs sm:text-sm px-4 sm:px-5 py-1.5 rounded-full border border-black/10 shadow-[0_3px_10px_rgba(0,0,0,0.32)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105 hover:shadow-[0_5px_15px_rgba(0,0,0,0.45)] ${
                beamedSection === 'street-food'
                  ? 'ring-2 ring-[#f2c438] bg-[#fffaf0] text-[#0b0f19] shadow-[0_0_16px_rgba(242,196,56,0.6)] scale-105'
                  : ''
              }`}
            >
              {t.nav.streetFood}
            </button>
            <button
              type="button"
              data-nav-target="garden"
              onClick={(e) => handleBeamToSection('garden', e)}
              className={`bg-white text-[#1c2335] hover:bg-[#fffdf7] hover:text-[#0b0f19] font-bold text-xs sm:text-sm px-4 sm:px-5 py-1.5 rounded-full border border-black/10 shadow-[0_3px_10px_rgba(0,0,0,0.32)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105 hover:shadow-[0_5px_15px_rgba(0,0,0,0.45)] ${
                beamedSection === 'garden'
                  ? 'ring-2 ring-[#f2c438] bg-[#fffaf0] text-[#0b0f19] shadow-[0_0_16px_rgba(242,196,56,0.6)] scale-105'
                  : ''
              }`}
            >
              {t.nav.garden}
            </button>
            <button
              type="button"
              data-nav-target="applications"
              onClick={(e) => handleBeamToSection('applications', e)}
              className={`bg-white text-[#1c2335] hover:bg-[#fffdf7] hover:text-[#0b0f19] font-bold text-xs sm:text-sm px-4 sm:px-5 py-1.5 rounded-full border border-black/10 shadow-[0_3px_10px_rgba(0,0,0,0.32)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105 hover:shadow-[0_5px_15px_rgba(0,0,0,0.45)] ${
                beamedSection === 'applications'
                  ? 'ring-2 ring-[#f2c438] bg-[#fffaf0] text-[#0b0f19] shadow-[0_0_16px_rgba(242,196,56,0.6)] scale-105'
                  : ''
              }`}
            >
              {t.nav.applications}
            </button>
          </nav>

          {/* Zone 3: Language Selector (DE v) + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                aria-label="Sprache wählen"
                aria-expanded={isLangDropdownOpen}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/25 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.languageLabel}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isLangDropdownOpen && (
                <div
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                  className="absolute right-0 mt-1.5 w-28 rounded-xl bg-[#1c2335] border border-white/20 shadow-xl py-1.5 z-50"
                >
                  {(['de', 'es', 'gl', 'en'] as Locale[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLocale(lang);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer ${
                        locale === lang
                          ? 'bg-[#f2c438] text-[#1e1a17]'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <span>{lang.toUpperCase()}</span>
                      {locale === lang && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button (matches mobile phone mockup top-right) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Menü öffnen"
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#181e2e] border-t border-white/15 px-6 py-4 space-y-2">
            <button
              type="button"
              onClick={handleBeamHome}
              className="block w-full text-left py-2.5 text-base font-semibold text-[#f2c438] border-b border-white/10 cursor-pointer"
            >
              ✦ Startseite
            </button>
            {t.cards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleBeamToSection(card.id)}
                className="block w-full text-left py-2.5 text-base font-medium text-white/90 hover:text-[#f2c438] border-b border-white/10 last:border-0 cursor-pointer"
              >
                {card.title}
              </button>
            ))}
          </div>
        )}
      </header>

      <main
        id="top"
        className={`flex-1 transition-all duration-300 ${
          beamState.phase === 'dissolving'
            ? 'page-particle-dissolving'
            : beamState.phase === 'exploding'
            ? 'page-particle-emerging'
            : ''
        }`}
      >
        {beamedSection ? (
          /* =====================================================================
             BEAMED DESTINATION VIEW (Matches the individual subpage mockups on the right!)
             Appears immediately beneath the top header without scrolling down.
             ===================================================================== */
          <section
            key={`beamed-${beamedSection}`}
            className="py-5 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            {/* Beamed Subpage Header Bar: Back to Overview & Quick Subpage Switcher */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#f0e4cc]/90 p-2.5 sm:p-3 rounded-2xl border border-[#dec99f] shadow-sm">
              <button
                type="button"
                onClick={(e) => handleBeamHome(e)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-xs sm:text-sm font-bold text-[#231f20] shadow-sm border border-[#d8c59e] hover:border-[#c5ab7d] transition-all hover:-translate-x-0.5 cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4 text-[#cf9110]" />
                <span>
                  {locale === 'de'
                    ? '← Zurück zur Gesamtübersicht'
                    : locale === 'es'
                    ? '← Volver a la vista general'
                    : locale === 'gl'
                    ? '← Volver á vista xeral'
                    : '← Back to full overview'}
                </span>
              </button>

              {/* Quick Subpage Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5" role="tablist" aria-label="Welten wechseln">
                {t.cards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    role="tab"
                    aria-selected={beamedSection === card.id}
                    onClick={(e) => handleBeamToSection(card.id, e)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      beamedSection === card.id
                        ? 'bg-[#1c2335] text-[#f2c438] shadow-sm ring-1 ring-[#f2c438]'
                        : 'bg-white/80 hover:bg-white text-[#4a4138] border border-[#dec99f]'
                    }`}
                  >
                    {card.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Materialized Target Section Card right at the top of the viewport */}
            <SubpageShowcaseCard
              section={t.sections[beamedSection]}
              siteLocale={locale}
              isHighlighted={true}
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />
          </section>
        ) : (
          <div key="home-view">
        {/* =====================================================================
            HERO SECTION (Faro de Fisterra Sunset, Camino Shell Stone & Disco Ball)
           ===================================================================== */}
        <section className="relative w-full min-h-[540px] lg:min-h-[620px] flex flex-col justify-between overflow-hidden bg-[#1c2230] text-white">
          {/* Background Coastal Sunset Image */}
          <img
            src="/assets/aistudio/familysolysombra_305f73fa.jpg"
            alt={currentHeroSlide.caption}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
          />

          {/* Lighter atmospheric Sunset Scrim so the golden Camino shell stone & lighthouse shine through */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#141824]/50 via-[#141824]/25 to-black/15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25"
            aria-hidden="true"
          />

          {/* Main Hero Content: Centered composition matching Figma blueprint screenshot_1_bc084aaa.png */}
          <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 lg:py-10 my-auto animate-hero-unroll-right flex flex-col items-center text-center">
            {/* Center Stage: Glowing Rainbow Mosaic Disco Ball Logo + Metallic BAR Badge */}
            <div className="flex flex-col items-center justify-center -mb-2 sm:-mb-3">
              <DiscoBallEmblem size="lg" showBarBadge={true} />
            </div>

            {/* Handwritten "WorldFamily.art" centered directly below the BAR badge */}
            <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight tracking-wide mt-1">
              {t.hero.title}
            </h1>

            {/* Subtitle Lines */}
            <div className="mt-3 space-y-1 text-base sm:text-xl lg:text-2xl text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-2xl px-2">
              <p>{t.hero.subtitleLine1}</p>
              <p className="text-sm sm:text-base text-white/85 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {t.hero.subtitleLine2}
              </p>
            </div>

            {/* Dual Action Buttons ("Unsere Welt entdecken ->" + "[> Video / Impressionen]") */}
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleScrollToOverview}
                className="btn-disco-mosaic-3d w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-base cursor-pointer whitespace-nowrap shrink-0 shadow-lg"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="btn-disco-mosaic-3d w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-base cursor-pointer whitespace-nowrap shrink-0 shadow-lg"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Carousel Dots (3 dots as shown in the mockup) */}
            <div className="pt-4 flex items-center justify-center gap-3" role="tablist" aria-label="Hero Impressionen">
              {t.hero.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlideIndex === idx}
                  aria-label={slide.caption}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeSlideIndex === idx
                      ? 'w-3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] scale-110'
                      : 'w-2.5 bg-white/55 hover:bg-white/85'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Organic Torn Paper Bottom Edge into Parchment Section */}
          <div className="relative z-20 -mb-px">
            <TornPaperEdge position="top" fill="#f5ecd9" />
          </div>
        </section>

        {/* =====================================================================
            5-COLUMN OVERVIEW SECTION ("Ein Ort für die World Family ♥")
           ===================================================================== */}
        <section
          id="world-family-overview"
          className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {/* Handwritten Heading with Blue Wave Squiggles and Heart on a single line */}
          <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
              <HandDrawnWaves className="hidden md:block" />
              <h2 className="font-script text-3xl sm:text-4xl lg:text-[44px] text-[#1e1a17] inline-flex items-center justify-center gap-2.5 leading-tight sm:whitespace-nowrap">
                <span>{t.intro.heading}</span>
                <HandDrawnHeart />
              </h2>
              <HandDrawnWaves flip className="hidden md:block" />
            </div>
            {/* Mobile-only underline wave */}
            <div className="flex md:hidden justify-center mb-3">
              <HandDrawnWaves />
            </div>

            <p className="text-base sm:text-lg text-[#2c2621] leading-relaxed font-medium max-w-3xl mx-auto">
              {t.intro.body}
            </p>
          </div>

          {/* 5-Column Parchment Cards Row (Exactly matching the 5 cards in the mockup) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {t.cards.map((card) => (
              <div
                key={card.id}
                onClick={(e) => handleBeamToSection(card.id, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBeamToSection(card.id);
                  }
                }}
                className="group parchment-card rounded-2xl p-2.5 flex flex-col justify-between text-center transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Card Thumbnail: 5th card crops directly into the authentic Sun & Moon Mosaic Mural */}
                  <div className="relative h-36 sm:h-40 w-full rounded-xl overflow-hidden bg-[#231f20] mb-3.5 shadow-sm">
                    {card.id === 'applications' ? (
                      <img
                        src={IMAGES.barTerraceMural}
                        alt="World Family Sun and Moon Mosaic Mural"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[86%_42%] scale-150 group-hover:scale-[1.6] transition-transform duration-300"
                      />
                    ) : (
                      <img
                        src={card.image}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Handwritten Script Card Title */}
                  <h3 className="font-script text-2xl text-[#1e1a17] group-hover:text-[#b87914] transition-colors px-1">
                    {card.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-xs sm:text-[13.5px] text-[#3c3530] leading-snug mt-1.5 px-2">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Arrow Affordance (→) */}
                <div className="pt-3 pb-1 flex justify-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[#231f20] group-hover:bg-[#f2c438]/35 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            FULL-WIDTH WORLD FAMILY BAR TERRACE & SUN/MOON MURAL BANNER
            ("ART · MUSIC · PEOPLE · FOOD · NATURE ♥")
           ===================================================================== */}
        <section className="relative w-full overflow-hidden my-2 bg-[#1c2230]">
          {/* Top Torn Paper Edge overlapping the top of the mural photograph */}
          <div className="absolute inset-x-0 top-0 z-20">
            <TornPaperEdge position="bottom" fill="#f5ecd9" />
          </div>

          <div className="relative h-72 sm:h-96 lg:h-[420px] w-full">
            <img
              src={IMAGES.barTerraceMural}
              alt="World Family Bar Fisterra — Art Music People Food Nature Mural"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25"
              aria-hidden="true"
            />

            {/* Painted Mural Callout Overlay */}
            <div className="absolute bottom-12 sm:bottom-14 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white z-10">
              <div>
                <p className="font-script text-3xl sm:text-4xl text-[#f2c438] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  World Family Bar · Fisterra
                </p>
                <p className="text-xs sm:text-sm text-white/95 font-medium drop-shadow">
                  Avenida da Coruña 63 · Seit 2015 am Ende des Camino de Santiago
                </p>
              </div>

              <div className="inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase bg-black/55 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span>ART</span>
                <span>·</span>
                <span>MUSIC</span>
                <span>·</span>
                <span>PEOPLE</span>
                <span>·</span>
                <span>FOOD</span>
                <span>·</span>
                <span>NATURE</span>
                <span className="text-red-400">♥</span>
              </div>
            </div>
          </div>

          {/* Bottom Torn Paper Edge rising into the Parchment Subpages Section */}
          <div className="absolute inset-x-0 bottom-0 z-20">
            <TornPaperEdge position="top" fill="#f5ecd9" />
          </div>
        </section>

        {/* =====================================================================
            DETAILED SUBPAGE SECTIONS (The 5 Showcase Cards from the right side of the mockup)
           ===================================================================== */}
        <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          {/* Interactive Filter Bar so visitors can view all 5 worlds or focus on one */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-[#dfd0b2]">
            <div>
              <h2 className="font-script text-3xl sm:text-4xl text-[#1e1a17]">
                {t.nav.worldFamily} · Welten &amp; Projekte
              </h2>
            </div>

            <div
              className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-[#eadbc0]/75 border border-[#d8c5a2]"
              role="group"
              aria-label="Bereich filtern"
            >
              <button
                type="button"
                onClick={() => setActiveSectionFilter('all')}
                className={`btn-disco-mosaic-3d px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSectionFilter === 'all'
                    ? 'ring-2 ring-white scale-105'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                Alle (5)
              </button>
              {t.cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveSectionFilter(card.id)}
                  className={`btn-disco-mosaic-3d px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                    activeSectionFilter === card.id
                      ? 'ring-2 ring-white scale-105'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {card.title}
                </button>
              ))}
            </div>
          </div>

          {/* Layout matching the mockup:
              Top 3 full-width horizontal cards (World Family, World Family Bar, Street Food)
              Bottom 2 side-by-side cards (Garden, Applications) */}
          <div className="space-y-8">
            {visibleSections
              .filter((id) => id === 'world-family' || id === 'bar' || id === 'street-food')
              .map((id) => (
                <SubpageShowcaseCard
                  key={id}
                  section={t.sections[id]}
                  siteLocale={locale}
                  isHighlighted={activeSectionFilter === id}
                  onOpenInquiry={() => setIsInquiryModalOpen(true)}
                />
              ))}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {visibleSections
                .filter((id) => id === 'garden' || id === 'applications')
                .map((id) => (
                  <SubpageShowcaseCard
                    key={id}
                    section={t.sections[id]}
                    siteLocale={locale}
                    isHighlighted={activeSectionFilter === id}
                    onOpenInquiry={() => setIsInquiryModalOpen(true)}
                  />
                ))}
            </div>
          </div>
        </section>
          </div>
        )}
      </main>

      {/* =====================================================================
          FOOTER (Quiet, warm Finisterre address, LA Times story link & links)
         ===================================================================== */}
      <footer className="bg-[#1c2335] text-white/90 border-t border-white/15 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/15">
            <div className="md:col-span-5 flex items-center gap-4">
              <DiscoBallEmblem size="sm" />
              <div>
                <p className="font-script text-2xl sm:text-3xl text-white">
                  WorldFamily.art
                </p>
                <p className="text-xs sm:text-sm text-slate-300">
                  {t.footer.coordinates}
                </p>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-200">
              <div className="space-y-1">
                <p className="font-semibold text-[#f2c438] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{t.footer.addressTitle}</span>
                </p>
                <p>{t.footer.addressLine}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadDesignMd}
                  className="btn-disco-mosaic-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>design.md herunterladen</span>
                </button>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Avenida+da+Coru%C3%B1a+63%2C+15155+Fisterra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-disco-mosaic-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.latimes.com/world-nation/story/2020-01-21/spain-pilgrims"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-disco-mosaic-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
                >
                  <span>{t.footer.pressLinkLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              {(['de', 'es', 'gl', 'en'] as Locale[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={`uppercase font-semibold cursor-pointer ${
                    locale === lang ? 'text-[#f2c438]' : 'hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <VideoImpressionsModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        content={t}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        content={t}
      />
    </div>
  );
}
