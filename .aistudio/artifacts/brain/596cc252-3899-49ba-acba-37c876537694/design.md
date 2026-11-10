# WorldFamily.art — Design System & Architektur (`design.md`)

**Projekt:** WorldFamily.art · The World Family Bar (Fisterra / Finisterre, Galicien)  
**Standort:** Avenida da Coruña 63, 15155 Fisterra (A Coruña), Spanien · Km 0.0 am Ende des Camino de Santiago  
**Sprachen:** Webseite in 4 Hauptsprachen (`DE`, `ES`, `GL`, `EN`) · Interaktive Speisekarte in 7 Sprachen (`DE`, `EN`, `ES`, `GL`, `FR`, `IT`, `TLH` Klingonisch)

---

## 1. Visuelle Identität & Marken-Atmosphäre

Das Design von **WorldFamily.art** verbindet die warme, handgemachte Pilger- und Küstenkultur von Fisterra („Costa da Morte“) mit der farbenfrohen, kosmischen Mosaik-Kunst der legendären **World Family Bar**:

1. **Kontrast aus Küsten-Abenddämmerung & warmem Pergament:**
   - **Kopfzeile & Fußzeile:** Tiefes Atlantik-Nachtblau (`#1c2335`) mit halbtransparenter Unschärfe (`backdrop-filter: blur(12px)`).
   - **Hauptoberfläche:** Organisches, warmes Pergamentpapier (`#f5ecd9` / `#faf3e3`) mit feiner Papierfaser-Struktur (`.parchment-surface`) und handgerissenen Papierkanten (`<TornPaperEdge />`) als Übergang zwischen Hero-Fotografie, Wandbild-Banner und Inhaltssektionen.
2. **Das Hauptlogo (Regenbogen-Discokugel im Mosaik-Stil):**
   - Original-Asset: `/assets/aistudio/LOGO_WFB_DISCOSTYLE_no_background_b5600ece.png`
   - Umgeben von einem rotierenden Regenbogen-Lichtschein (`.animate-disco-halo`), sanftem Schweben (`.animate-disco-ball`), funkelnden 8-Punkt-Spiegelreflexen (`.animate-sparkle`) und der metallischen „BAR“-Plakette.
   - **Interaktion:** Beim Überfahren mit der Maus (`onMouseEnter`) rotiert die Discokugel einmal flüssig um **360° um die eigene Achse** (`@keyframes discoSpinOnce`, `0.9s cubic-bezier(0.22, 1, 0.36, 1)`).

---

## 2. Farbpalette & CSS-Design-Tokens

| Token / Rolle | Hex / Wert | Verwendung |
| :--- | :--- | :--- |
| `--parchment` | `#f5ecd9` | Warmer Pergament-Hintergrund der gesamten Seite |
| `--parchment-card` | `#fbf6eb` / `#faf3e3` | Karten-Hintergrund für die 5 Welten & Speisekarten-Gerichte |
| `--parchment-border` | `#e4d5b7` / `#d8c7a6` | Warme Sandstein-Rahmenlinien der Karten |
| `--twilight-header` | `#1c2335` | Sticky-Header & Footer im abendlichen Küstenblau |
| `--ink-dark` | `#231f20` / `#1e1a17` | Primäre Überschriften und Kontrasttexte |
| `--ink-body` | `#3c3530` / `#544a3f` | Fließtexte, Zutatenbeschreibungen und Untertitel |
| `--price-crimson` | `#c82829` | Preisangaben in der Speisekarte (`tabular-nums`) |
| **Disco-Mosaik-Spektrum** | `#e61919` → `#f37021` → `#facc15` → `#16a34a` → `#1d70db` → `#8b2cf5` | Regenbogen-Farbverlauf des Hauptlogos, der 3D-Buttons und der Kategorie-Trennlinien |

---

## 3. Typografie-Hierarchie

Die Typografie kombiniert drei charaktervolle Schriftfamilien (geladen über Google Fonts):

1. **Handschrift-Akzente (`.font-script` — `'Kalam'`, `'Caveat'`, cursive):**
   - Verwendet für den Markenschriftzug `WorldFamily.art`, den Willkommensgruß *„Ein Ort für die World Family ♥“*, die 5 Karten-Titel sowie die großen Banner-Überschriften (*World Family*, *World Family Bar*, *Street Food*, *Garden*, *Applications*).
2. **Editoriale Serifenschrift (`.font-serif-editorial` — `'Fraunces'`, Georgia, serif):**
   - Verwendet für Sektions-Überschriften (*„Mehr als eine Bar“*, *„Die Idee der World Family“*), Speisekarten-Kategorien und Preisangaben.
3. **Klare Sans-Serif für UI & Zutaten (`'Plus Jakarta Sans'`, system-ui, sans-serif):**
   - Verwendet für Navigation, Fließtexte, Zutatenlisten, Suchfeld und Filter-Buttons.

---

## 4. 3D-Disco-Mosaik-Buttons (`.btn-disco-mosaic-3d`)

Alle interaktiven Buttons der Webseite greifen das **Spiegelmosaik-Design des Hauptlogos** in einer plastischen 3D-Ausführung auf:

- **Mehrschichtige Oberfläche (`background-image`):**
  1. **3D-Glanzwölbung (oben hell, unten schattiert):** `linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.14) 44%, rgba(0,0,0,0.24) 54%, rgba(0,0,0,0.42) 100%)`
  2. **Vertikales & horizontales Mosaikkachel-Raster (`8px × 8px`):** `repeating-linear-gradient(90deg, ...)` & `repeating-linear-gradient(0deg, ...)`
  3. **Regenbogen-Spektrum der Discokugel:** `linear-gradient(115deg, #e61919 0%, #f37021 19%, #facc15 38%, #16a34a 58%, #1d70db 79%, #8b2cf5 100%)`
- **Plastischer 3D-Körper (`box-shadow` & `transform`):**
  - **Ruhezustand:** Innere Glanzkante oben (`inset 0 2px 2px rgba(255,255,255,0.9)`), 3D-Sockelkante unten (`0 4px 0 #3b0a45, 0 5px 0 #facc15`) und Tiefenschatten (`0 9px 18px rgba(0,0,0,0.45)`).
  - **Hover (`:hover`):** Hebt sich um `translateY(-2px)` an, verstärkt den Sockelschatten (`0 6px 0 #3b0a45, 0 7px 0 #facc15`) und erhöht die Leuchtkraft (`brightness(1.1) saturate(1.15)`).
  - **Klick (`:active`):** Drückt sich physisch um `translateY(3px)` nach unten ein (`0 1px 0 #3b0a45, 0 2px 0 #facc15`).

---

## 5. Animationen & Interaktionsdesign

### 5.1 Hero-Aufroll-Animation von rechts (`.animate-hero-unroll-right`)
Beim Aufrufen der Webseite fährt der Hero-Inhaltsbereich (`section > div:nth-of-type(3)`) von rechts herein (`translateX(92%)`), beginnt klein und kompakt eingerollt (`scaleX(0.08) scaleY(0.18) rotate(8deg)`, `clip-path: inset(35% 0% 35% 84% round 36px)`) und rollt sich über `1.45s cubic-bezier(0.22, 1, 0.36, 1)` mit leichtem elastischem Overshoot zu seiner vollen Größe auf.

### 5.2 360°-Logo-Rotation bei Maus-Hover (`.animate-logo-spin-once`)
Sobald der Besucher mit der Maus über das Disco-Logo fliegt (`onMouseEnter`), wird die Klasse `.animate-logo-spin-once` aktiviert. Das Logo dreht sich einmal komplett um **360° um die eigene Achse** (`@keyframes discoSpinOnce`) und läuft auch bei kurzem Überfliegen sauber bis zum Ende durch (`onAnimationEnd`).

### 5.3 „Beam-Me-Up“ / Transporter-Navigation (`.beam-curtain` & `.animate-beam-materialize`)
Ein Klick auf die Register **„Bar“**, **„Street Food“**, **„Garden“** oder **„Applications“** in der oberen Navigation scrollt **nicht** nach unten:
- Stattdessen wird die Ansicht sofort auf `scrollTop = 0` geschaltet.
- Ein visueller **Transporter-Lichtvorhang** (`.beam-curtain`) mit vertikalen Energiestrahlen und einer leuchtenden **Scanline** (`.beam-scanline`) fährt über den Bildschirm.
- Die gewählte Sektion materialisiert sich direkt unterhalb der Kopfzeile mit einem Licht- und Skalierungsimpuls (`@keyframes beamMaterialize`).

---

## 6. Seitenarchitektur & die 5 Welten

1. **Hero-Sektion:**
   - Original-Hintergrundbild `/assets/aistudio/familysolysombra_305f73fa.jpg` (*World Family · Sol y Sombra am Strand von Mar de Fóra*).
   - Animiertes Hauptlogo links mit „BAR“-Plakette, rechts `WorldFamily.art` in Handschrift, Untertitel und zwei 3D-Mosaik-CTAs (*„Unsere Welt entdecken →“* & *„▶ Video / Impressionen“*).
2. **Übersichts-Sektion (*„Ein Ort für die World Family ♥“*):**
   - Eingerahmt von handgezeichneten blauen Atlantikwellen (`<HandDrawnWaves />`) und Herz-Icon (`<HandDrawnHeart />`).
   - 5 Pergament-Karten in einer Reihe: **World Family**, **World Family Bar**, **Street Food**, **Garden**, **Applications**.
3. **Panorama-Wandbild-Banner:**
   - Volle Breite mit gerissenen Papierkanten oben und unten sowie dem Motto `ART · MUSIC · PEOPLE · FOOD · NATURE ♥`.
4. **Die 5 Detail-Welten (`<SubpageShowcaseCard />`):**
   - **World Family:** Ursprung 2014 am Strand von Mar de Fóra & Camino-Muschelstein (`Km 0.0 Fisterra`).
   - **World Family Bar:** Treffpunkt seit 2015 in der Avenida da Coruña 63, 4 Kultur-Icons (*Live-Musik & Jam*, *Kunst & Ausstellungen*, *Begegnung & Austausch*, *Offene, familiäre Atmosphäre*), **Originalbilder-Galerie (`FOTOS WFB` & Facebook)** sowie die **vollständige mehrsprachige Speisekarte**.
   - **Street Food:** Ehrliches, vegetarisches und internationales Essen unterwegs mit maßgeschneiderter Food-Truck-Illustration (`<StreetFoodVanIllustration />`).
   - **Garden:** Grüne Oase zum Entspannen und Gärtnern mit Sprossen-Illustration (`<GardenSproutIllustration />`).
   - **Applications:** Mitmachen, Kunst ausstellen oder Projekte einbringen mit Handschlag-Illustration (`<ApplicationsHandshakeIllustration />`) und direktem Anfrage-Modal.

---

## 7. Interaktive Speisekarte (`<BarMenuSection />`)

Basierend auf der Original-PDF (`Carta_WorldFamily_Todos_Idiomas_a0a789dd.pdf`) umfasst die Speisekarte **alle 49 Positionen** in **7 Kategorien** und **7 Sprachen** (`DE`, `EN`, `ES`, `GL`, `FR`, `IT`, `TLH` Klingonisch):

1. **Vegane Gerichte (11 Positionen):** 7 € – 15 € (inkl. *Gemüse-Poke-Bowl – Empfehlung des Hauses*).
2. **Burger (3 Positionen):** Falafel-, Rindfleisch- und Hähnchen-Burger (je **11 €**, **+ mit Pommes 14 €**).
3. **Sandwiches mit Chips (4 Positionen):** 6 € – 10 €.
4. **Fleisch- & Fischgerichte (6 Positionen):** 14 € – 22 € (inkl. *Pulpo a feira*, *Zamburiñas*, *Navajas*, *Tagesfisch*).
5. **Frühstück (5 Positionen + 5 Extras):** 3,50 € – 7 € (inkl. Extras wie Speck, Avocado, Tomate, Pilze, Kartoffeln).
6. **Getränke & Weine (11 Positionen):** Fassbiere, Estrella Galicia, 1906 Reserva, Albariño & Mencía.
7. **Cocktails & Spirituosen (9 Positionen):** Mojitos, Caipirinha, Piña Colada, Sangria, Wermut & galicische Liköre.

---

## 8. Projekt-Dateistruktur

```text
/
├── public/
│   ├── design.md                                                    # Dieses Design-Dokument zum Download
│   └── assets/aistudio/
│       ├── Carta_WorldFamily_Todos_Idiomas_a0a789dd.pdf             # Original-Speisekarte (6 Seiten, mehrsprachig)
│       ├── LOGO_WFB_DISCOSTYLE_no_background_b5600ece.png           # Original-Discokugel-Logo (freigestellt)
│       └── familysolysombra_305f73fa.jpg                            # Originalfoto „Sol y Sombra“ (Mar de Fóra)
└── src/
    ├── App.tsx                                                      # Hauptanwendung, Beam-Navigation, Hero & Footer
    ├── index.css                                                    # Design-Tokens, 3D-Mosaik-Buttons & Keyframes
    ├── components/
    │   ├── BarMenuSection.tsx                                       # Interaktive 7-sprachige Speisekarte (49 Gerichte)
    │   ├── BrandGraphics.tsx                                        # Animiertes Disco-Logo & Line-Art-Illustrationen
    │   ├── Modals.tsx                                               # Galerie-Modal, Anfrage-Modal & „design.md“-Vorschau
    │   ├── SubpageShowcaseCard.tsx                                  # Detailkarten der 5 Welten + „FOTOS WFB“-Galerie
    │   └── TornPaperEdge.tsx                                        # Organische gerissene Papierkanten (SVG)
    └── data/
        ├── barMenuData.ts                                           # Kompletter Datensatz aller 49 Speisen & 7 Sprachen
        ├── worldFamilyContent.ts                                    # Mehrsprachige Seiteninhalte (DE, ES, GL, EN)
        └── worldFamilyContent.test.ts                               # Automatisierte Unit-Tests
```
