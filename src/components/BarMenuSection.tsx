import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  FileText,
  Leaf,
  Utensils,
  Sandwich,
  Fish,
  Coffee,
  Wine,
  Martini,
  X,
} from 'lucide-react';
import {
  MENU_ITEMS,
  MENU_LANGUAGE_META,
  MENU_UI_LABELS,
  filterMenuItems,
  type MenuCategoryId,
  type MenuLanguage,
  type MenuItem,
} from '../data/barMenuData';
import type { Locale } from '../data/worldFamilyContent';
import { DiscoBallEmblem } from './BrandGraphics';

interface BarMenuSectionProps {
  siteLocale: Locale;
}

const CATEGORY_ORDER: MenuCategoryId[] = [
  'vegan',
  'burgers',
  'sandwiches',
  'meat_fish',
  'breakfast',
  'drinks',
  'cocktails',
];

export const BarMenuSection: React.FC<BarMenuSectionProps> = ({ siteLocale }) => {
  const [menuLang, setMenuLang] = useState<MenuLanguage>(siteLocale);
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('vegan');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegan' | 'vegetarian' | 'seafood'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);

  // Sync menu language when the user switches the top-bar site locale
  useEffect(() => {
    setMenuLang(siteLocale);
  }, [siteLocale]);

  const ui = MENU_UI_LABELS[menuLang];

  // When user types a search query or picks a dietary filter, show matching items across categories
  const effectiveCategory = searchQuery.trim().length > 0 ? 'all' : activeCategory;

  const filteredItems = filterMenuItems(MENU_ITEMS, {
    category: effectiveCategory,
    dietary: dietaryFilter,
    searchQuery,
    lang: menuLang,
  });

  const getCategoryIcon = (cat: MenuCategoryId) => {
    switch (cat) {
      case 'vegan':
        return <Leaf className="w-4 h-4 shrink-0" />;
      case 'burgers':
        return <Utensils className="w-4 h-4 shrink-0" />;
      case 'sandwiches':
        return <Sandwich className="w-4 h-4 shrink-0" />;
      case 'meat_fish':
        return <Fish className="w-4 h-4 shrink-0" />;
      case 'breakfast':
        return <Coffee className="w-4 h-4 shrink-0" />;
      case 'drinks':
        return <Wine className="w-4 h-4 shrink-0" />;
      case 'cocktails':
        return <Martini className="w-4 h-4 shrink-0" />;
    }
  };

  const categoriesToRender =
    effectiveCategory === 'all'
      ? CATEGORY_ORDER.filter((cat) =>
          filteredItems.some((item) => item.category === cat)
        )
      : [effectiveCategory];

  return (
    <div
      id="bar-speisekarte"
      className="mt-7 pt-7 border-t-2 border-[#e2d2b4] scroll-mt-24"
    >
      {/* Top Rainbow Mosaic Accent Strip matching the PDF Menu Header */}
      <div className="rounded-2xl overflow-hidden border border-[#decb9f] bg-[#f7efde] shadow-[0_10px_30px_rgba(45,32,14,0.08)]">
        <div className="mosaic-strip" aria-hidden="true" />

        {/* Menu Header Area */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-[#fbf6ea] to-[#f4ead4] border-b border-[#e4d5b7]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Emblem + Title + Subtitle */}
            <div className="flex items-center gap-4">
              <DiscoBallEmblem size="sm" className="shrink-0" />
              <div>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#9b6b15]">
                  {ui.sectionSubtitle}
                </p>
                <h4 className="font-script text-3xl sm:text-4xl text-[#1e1a17] leading-tight mt-0.5">
                  {ui.sectionTitle}
                </h4>
              </div>
            </div>

            {/* Right: 7-Language Switcher (DE · EN · ES · GL · FR · IT · TLH) + Original PDF Link */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#e9dbc0] border border-[#d5c29d]"
                role="group"
                aria-label="Speisekarten-Sprache wählen"
              >
                {MENU_LANGUAGE_META.map((langMeta) => (
                  <button
                    key={langMeta.code}
                    type="button"
                    onClick={() => setMenuLang(langMeta.code)}
                    title={langMeta.nativeName}
                    className={`btn-disco-mosaic-3d px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer whitespace-nowrap shrink-0 ${
                      menuLang === langMeta.code
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {langMeta.shortLabel}
                  </button>
                ))}
              </div>

              <a
                href="/assets/aistudio/Carta_WorldFamily_Todos_Idiomas_a0a789dd.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-disco-mosaic-3d inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{ui.pdfDownloadLabel}</span>
              </a>
            </div>
          </div>

          {/* Interactive Category Navigation Tabs (7 Categories + All) */}
          <div
            className="mt-6 flex flex-wrap items-center gap-2.5"
            role="tablist"
            aria-label="Speisekarten-Kategorien"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className={`btn-disco-mosaic-3d inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'all' && searchQuery.trim() === ''
                  ? 'ring-2 ring-white scale-105'
                  : 'opacity-85 hover:opacity-100'
              }`}
            >
              <span>{ui.allCategories}</span>
              <span className="text-[11px] opacity-90">({MENU_ITEMS.length})</span>
            </button>

            {CATEGORY_ORDER.map((catId) => {
              const count = MENU_ITEMS.filter((i) => i.category === catId).length;
              const isSelected = activeCategory === catId && searchQuery.trim() === '';
              return (
                <button
                  key={catId}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(catId);
                    setSearchQuery('');
                  }}
                  className={`btn-disco-mosaic-3d inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'ring-2 ring-white scale-105'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {getCategoryIcon(catId)}
                  <span>{ui.categories[catId]}</span>
                  <span className="text-[11px] opacity-90">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search & Quick Dietary Filter Bar */}
          <div className="mt-4 pt-4 border-t border-[#e5d8be] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#6e6254] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                aria-label={ui.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/90 border border-[#d6c4a0] text-xs sm:text-sm text-[#231f20] placeholder:text-[#857766] focus:outline-none focus:ring-2 focus:ring-[#e5b322]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Suche löschen"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6e6254] hover:text-[#231f20] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: ui.dietaryAll },
                  { id: 'vegan', label: `🌱 ${ui.dietaryVegan}` },
                  { id: 'vegetarian', label: `🧀 ${ui.dietaryVegetarian}` },
                  { id: 'seafood', label: `🐙 ${ui.dietarySeafood}` },
                ] as const
              ).map((filterBtn) => (
                <button
                  key={filterBtn.id}
                  type="button"
                  onClick={() => setDietaryFilter(filterBtn.id)}
                  className={`btn-disco-mosaic-3d px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                    dietaryFilter === filterBtn.id
                      ? 'ring-2 ring-white scale-105'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {filterBtn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dish Cards Content Area */}
        <div className="p-5 sm:p-7 space-y-9 bg-[#faf3e3]">
          {categoriesToRender.map((catId) => {
            const itemsInCat = filteredItems.filter((i) => i.category === catId);
            if (itemsInCat.length === 0) return null;

            return (
              <div key={catId} className="space-y-4">
                {/* Category Header with Rainbow Gradient Line (just like the PDF) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif-editorial text-lg sm:text-xl font-bold uppercase tracking-[0.14em] text-[#1e1a17] flex items-center gap-2">
                      {getCategoryIcon(catId)}
                      <span>{ui.categories[catId]}</span>
                    </h5>
                    <span className="text-xs font-medium text-[#6e6254]">
                      {itemsInCat.length} {itemsInCat.length === 1 ? 'Position' : 'Positionen'}
                    </span>
                  </div>
                  <div
                    className="h-1 w-full rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, #e62429 0%, #f37021 22%, #facc15 45%, #16a34a 68%, #1d70db 85%, #8b2cf5 100%)',
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Dish Grid: 2 Columns on Desktop with Dish Thumbnail, Description, Dotted Leader & Exact Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {itemsInCat.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => setSelectedDishModal(dish)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedDishModal(dish);
                        }
                      }}
                      className="group flex items-start gap-3.5 p-3.5 rounded-xl bg-[#fffcf5] hover:bg-white border border-[#e5d8be] hover:border-[#cfa23c] shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      {/* Small Square Dish Image Thumbnail */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#231f20] shrink-0 border border-[#e2d2b4] shadow-xs">
                        <img
                          src={dish.image}
                          alt={dish.name[menuLang]}
                          referrerPolicy="no-referrer"
                          style={{
                            objectPosition: dish.imageObjectPosition || 'center center',
                          }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Dish Name, Price & Ingredients */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h6 className="font-bold text-[15px] sm:text-base text-[#1e1a17] group-hover:text-[#b87914] transition-colors leading-snug">
                            {dish.name[menuLang]}
                          </h6>
                          <span className="font-serif-editorial font-bold text-base sm:text-lg text-[#c82829] whitespace-nowrap shrink-0 tabular-nums">
                            {dish.price}
                          </span>
                        </div>

                        {/* Recommended House Special Callout */}
                        {dish.recommended && (
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#b87914] mt-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{ui.houseRecommendation}</span>
                          </p>
                        )}

                        {/* Dish Description */}
                        {dish.description && (
                          <p className="text-xs sm:text-[13px] text-[#544a3f] leading-relaxed mt-1">
                            {dish.description[menuLang]}
                          </p>
                        )}

                        {/* Burger "+ mit Pommes 14 €" Secondary Price Row */}
                        {dish.secondaryPrice && (
                          <div className="mt-2 pt-1.5 border-t border-dotted border-[#d8c7a6] flex items-center justify-between text-xs sm:text-[13px] font-bold text-[#2e2823]">
                            <span>{dish.secondaryPrice.label[menuLang]}</span>
                            <span className="font-serif-editorial text-[#c82829] tabular-nums">
                              {dish.secondaryPrice.price}
                            </span>
                          </div>
                        )}

                        {/* Breakfast Add-ons (Bacon, Avocado, Tomato, Mushrooms, Potatoes) */}
                        {dish.addons && dish.addons.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-dotted border-[#d8c7a6] space-y-1">
                            {dish.addons.map((addon, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs text-[#463d34]"
                              >
                                <span>{addon.label[menuLang]}</span>
                                <span className="font-bold text-[#c82829] tabular-nums">
                                  {addon.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="py-10 text-center space-y-3">
              <p className="font-script text-2xl text-[#4a4138]">
                Keine Gerichte für diese Auswahl gefunden.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setDietaryFilter('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2 rounded-full bg-[#f2c438] text-[#1e1a17] text-xs font-bold cursor-pointer"
              >
                {ui.allCategories} anzeigen
              </button>
            </div>
          )}

          {/* Bottom Freshness Guarantee from the PDF */}
          <div className="pt-4 border-t border-[#e4d5b7] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#65594c] italic">
            <span>✳ {ui.freshNote}</span>
            <span className="not-italic font-semibold uppercase tracking-widest text-[11px]">
              THE WORLD FAMILY · GALICIA · FISTERRA
            </span>
          </div>
        </div>
      </div>

      {/* Dish Lightbox Detail Modal when clicking any dish card */}
      {selectedDishModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedDishModal(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl overflow-hidden bg-[#faf3e3] text-[#231f20] border-2 border-[#e2c992] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 w-full bg-[#1c2335]">
              <img
                src={selectedDishModal.image}
                alt={selectedDishModal.name[menuLang]}
                referrerPolicy="no-referrer"
                style={{
                  objectPosition:
                    selectedDishModal.imageObjectPosition || 'center center',
                }}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedDishModal(null)}
                aria-label="Schließen"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-3 px-3.5 py-1 rounded-full bg-[#c82829] text-white font-serif-editorial font-bold text-lg shadow-lg">
                {selectedDishModal.price}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#9b6b15]">
                {ui.categories[selectedDishModal.category]}
              </p>
              <h4 className="font-serif-editorial text-2xl font-bold text-[#1e1a17]">
                {selectedDishModal.name[menuLang]}
              </h4>
              {selectedDishModal.description && (
                <p className="text-sm text-[#3c3530] leading-relaxed">
                  {selectedDishModal.description[menuLang]}
                </p>
              )}

              {selectedDishModal.secondaryPrice && (
                <div className="p-3 rounded-xl bg-[#f1e5cc] flex items-center justify-between text-sm font-bold text-[#1e1a17]">
                  <span>{selectedDishModal.secondaryPrice.label[menuLang]}</span>
                  <span className="text-[#c82829]">
                    {selectedDishModal.secondaryPrice.price}
                  </span>
                </div>
              )}

              {/* Show translations across languages in the detail view */}
              <div className="pt-3 border-t border-[#e2d3b5] text-xs text-[#65594c] space-y-1">
                <p>
                  <strong>ES:</strong> {selectedDishModal.name.es} ·{' '}
                  <strong>EN:</strong> {selectedDishModal.name.en}
                </p>
                <p>
                  <strong>FR:</strong> {selectedDishModal.name.fr} ·{' '}
                  <strong>IT:</strong> {selectedDishModal.name.it} ·{' '}
                  <strong>TLH:</strong> {selectedDishModal.name.tlh}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
