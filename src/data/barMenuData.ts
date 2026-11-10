export type MenuLanguage = 'de' | 'en' | 'es' | 'gl' | 'fr' | 'it' | 'tlh';

export type MenuCategoryId =
  | 'vegan'
  | 'burgers'
  | 'sandwiches'
  | 'meat_fish'
  | 'breakfast'
  | 'drinks'
  | 'cocktails';

export type DietaryTag = 'vegan' | 'vegetarian' | 'seafood' | 'meat' | 'drinks';

export interface LocalizedText {
  de: string;
  en: string;
  es: string;
  gl: string;
  fr: string;
  it: string;
  tlh: string;
}

export interface MenuAddon {
  label: LocalizedText;
  price: string;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  dietary: DietaryTag;
  price: string;
  secondaryPrice?: {
    label: LocalizedText;
    price: string;
  };
  addons?: MenuAddon[];
  recommended?: boolean;
  image: string;
  imageObjectPosition?: string;
  name: LocalizedText;
  description?: LocalizedText;
}

export const MENU_IMAGES = {
  veganTapas: '/src/assets/images/menu_vegan_poke_padron_tapas_1793858884970.jpg',
  burgerFries: '/src/assets/images/menu_artisan_burger_fries_1793858887365.jpg',
  bocadilloCrisps: '/src/assets/images/menu_galician_bocadillo_crisps_1793858888018.jpg',
  pulpoSeafood: '/src/assets/images/menu_pulpo_seafood_plancha_1793858890346.jpg',
  breakfastSpread: '/src/assets/images/menu_breakfast_pancakes_eggs_1793858890485.jpg',
  cocktailsWine: '/src/assets/images/menu_cocktails_galician_wine_1793858893081.jpg',
  streetFoodBowl: '/src/assets/images/street_food_chickpea_bowl_1793857429471.jpg',
  barInteriorTable: '/src/assets/images/finisterre_bar_mural_interior_1793857368048.jpg',
};

export const MENU_LANGUAGE_META: {
  code: MenuLanguage;
  shortLabel: string;
  nativeName: string;
}[] = [
  { code: 'de', shortLabel: 'DE', nativeName: 'Deutsch' },
  { code: 'en', shortLabel: 'EN', nativeName: 'English' },
  { code: 'es', shortLabel: 'ES', nativeName: 'Español' },
  { code: 'gl', shortLabel: 'GL', nativeName: 'Galego' },
  { code: 'fr', shortLabel: 'FR', nativeName: 'Français' },
  { code: 'it', shortLabel: 'IT', nativeName: 'Italiano' },
  { code: 'tlh', shortLabel: 'TLH', nativeName: "tlhIngan Hol (Klingon)" },
];

export interface MenuUiLabels {
  sectionTitle: string;
  sectionSubtitle: string;
  freshNote: string;
  allCategories: string;
  searchPlaceholder: string;
  dietaryAll: string;
  dietaryVegan: string;
  dietaryVegetarian: string;
  dietarySeafood: string;
  houseRecommendation: string;
  pdfDownloadLabel: string;
  categories: Record<MenuCategoryId, string>;
}

export const MENU_UI_LABELS: Record<MenuLanguage, MenuUiLabels> = {
  de: {
    sectionTitle: 'Unsere Speisekarte · La Carta',
    sectionSubtitle: 'Vegane · Vegetarische & Meeresküche · Galicien',
    freshNote: 'Alle Gerichte werden aus frischen Produkten frisch zubereitet.',
    allCategories: 'Alle Bereiche',
    searchPlaceholder: 'Gericht oder Zutat suchen (z.B. Falafel, Pulpo, Albariño)...',
    dietaryAll: 'Alle',
    dietaryVegan: 'Vegan',
    dietaryVegetarian: 'Vegetarisch',
    dietarySeafood: 'Meeresküche',
    houseRecommendation: 'Empfehlung des Hauses',
    pdfDownloadLabel: 'Original-Speisekarte (PDF)',
    categories: {
      vegan: 'Vegane Gerichte',
      burgers: 'Burger',
      sandwiches: 'Sandwiches mit Chips',
      meat_fish: 'Fleisch- & Fischgerichte',
      breakfast: 'Frühstück',
      drinks: 'Getränke & Weine',
      cocktails: 'Cocktails & Spirituosen',
    },
  },
  en: {
    sectionTitle: 'Our Menu · La Carta',
    sectionSubtitle: 'Vegan · Vegetarian & Seafood Cuisine · Galicia',
    freshNote: 'All dishes are made with fresh produce and prepared to order.',
    allCategories: 'All Categories',
    searchPlaceholder: 'Search dish or ingredient (e.g. Falafel, Octopus, Albariño)...',
    dietaryAll: 'All',
    dietaryVegan: 'Vegan',
    dietaryVegetarian: 'Vegetarian',
    dietarySeafood: 'Seafood',
    houseRecommendation: 'House Recommendation',
    pdfDownloadLabel: 'Original Menu (PDF)',
    categories: {
      vegan: 'Vegan Dishes',
      burgers: 'Burgers',
      sandwiches: 'Sandwiches with Crisps',
      meat_fish: 'Meat & Fish Dishes',
      breakfast: 'Breakfast',
      drinks: 'Drinks & Wines',
      cocktails: 'Cocktails & Spirits',
    },
  },
  es: {
    sectionTitle: 'Nuestra Carta · World Family Bar',
    sectionSubtitle: 'Cocina Vegana · Vegetariana & del Mar · Galicia',
    freshNote: 'Todos los platos llevan productos frescos y se elaboran al momento.',
    allCategories: 'Todas las secciones',
    searchPlaceholder: 'Buscar plato o ingrediente (ej. Falafel, Pulpo, Albariño)...',
    dietaryAll: 'Todos',
    dietaryVegan: 'Vegano',
    dietaryVegetarian: 'Vegetariano',
    dietarySeafood: 'Del Mar',
    houseRecommendation: 'Plato recomendado',
    pdfDownloadLabel: 'Carta Original (PDF)',
    categories: {
      vegan: 'Raciones Veganas',
      burgers: 'Hamburguesas',
      sandwiches: 'Bocadillos con Patatas',
      meat_fish: 'Raciones Omnívoras',
      breakfast: 'Desayunos',
      drinks: 'Bebidas y Vinos',
      cocktails: 'Cócteles',
    },
  },
  gl: {
    sectionTitle: 'A Nosa Carta · World Family Bar',
    sectionSubtitle: 'Cociña Vegana · Vexetariana & do Mar · Galicia',
    freshNote: 'Todos os pratos levan produtos frescos e elabóranse ao momento.',
    allCategories: 'Todas as seccións',
    searchPlaceholder: 'Buscar prato ou ingrediente (ex. Falafel, Polbo, Albariño)...',
    dietaryAll: 'Todos',
    dietaryVegan: 'Vegano',
    dietaryVegetarian: 'Vexetariano',
    dietarySeafood: 'Do Mar',
    houseRecommendation: 'Prato recomendado',
    pdfDownloadLabel: 'Carta Orixinal (PDF)',
    categories: {
      vegan: 'Racións Veganas',
      burgers: 'Hamburguesas',
      sandwiches: 'Bocadillos con Patacas',
      meat_fish: 'Racións Omnívoras',
      breakfast: 'Almorzos',
      drinks: 'Bebidas e Viños',
      cocktails: 'Cócteles',
    },
  },
  fr: {
    sectionTitle: 'Notre Carte · World Family Bar',
    sectionSubtitle: 'Cuisine Végane · Végétarienne & de la Mer · Galice',
    freshNote: 'Tous les plats sont préparés à la minute avec des produits frais.',
    allCategories: 'Toutes les catégories',
    searchPlaceholder: 'Rechercher un plat ou ingrédient (ex. Falafel, Poulpe, Albariño)...',
    dietaryAll: 'Tous',
    dietaryVegan: 'Végane',
    dietaryVegetarian: 'Végétarien',
    dietarySeafood: 'Mer & Poisson',
    houseRecommendation: 'Plat recommandé',
    pdfDownloadLabel: 'Carte Originale (PDF)',
    categories: {
      vegan: 'Plats Végans',
      burgers: 'Burgers',
      sandwiches: 'Sandwichs avec Chips',
      meat_fish: 'Plats Viande & Poisson',
      breakfast: 'Petits Déjeuners',
      drinks: 'Boissons & Vins',
      cocktails: 'Cocktails',
    },
  },
  it: {
    sectionTitle: 'Il Nostro Menu · World Family Bar',
    sectionSubtitle: 'Cucina Vegana · Vegetariana & di Mare · Galizia',
    freshNote: 'Tutti i piatti sono preparati al momento con prodotti freschi.',
    allCategories: 'Tutte le categorie',
    searchPlaceholder: 'Cerca piatto o ingrediente (es. Falafel, Polpo, Albariño)...',
    dietaryAll: 'Tutti',
    dietaryVegan: 'Vegano',
    dietaryVegetarian: 'Vegetariano',
    dietarySeafood: 'Di Mare',
    houseRecommendation: 'Piatto consigliato',
    pdfDownloadLabel: 'Menu Originale (PDF)',
    categories: {
      vegan: 'Piatti Vegani',
      burgers: 'Hamburger',
      sandwiches: 'Panini con Patatine',
      meat_fish: 'Piatti di Carne e Pesce',
      breakfast: 'Colazioni',
      drinks: 'Bevande e Vini',
      cocktails: 'Cocktail',
    },
  },
  tlh: {
    sectionTitle: "Soj tetlh · World Family Bar",
    sectionSubtitle: "naH Soj · Ha'DIbaH Soj · bIQ'a' Soj · QALISYA",
    freshNote: "Hoch Soj chu' 'ej DaH vutlu'",
    allCategories: 'Hoch Soj',
    searchPlaceholder: 'Soj nej (valavel, pulpo, albarInyo)...',
    dietaryAll: 'Hoch',
    dietaryVegan: 'naH Soj',
    dietaryVegetarian: 'naH & ngavyaw’',
    dietarySeafood: "bIQ'a' Soj",
    houseRecommendation: "nISwI' Soj",
    pdfDownloadLabel: 'PDF Soj tetlh',
    categories: {
      vegan: 'naH Soj',
      burgers: 'HamburgheSa',
      sandwiches: "boqaDIlo 'ej chIpmey",
      meat_fish: "Ha'DIbaH 'ej ghotI'",
      breakfast: 'po Soj',
      drinks: 'bIQmey',
      cocktails: 'qoqtelmey',
    },
  },
};

export const MENU_ITEMS: MenuItem[] = [
  // ===========================================================================
  // 1. VEGAN DISHES (VEGANE GERICHTE) — 11 ITEMS
  // ===========================================================================
  {
    id: 'padron-peppers',
    category: 'vegan',
    dietary: 'vegan',
    price: '10 €',
    image: MENU_IMAGES.veganTapas,
    imageObjectPosition: '58% 22%',
    name: {
      de: 'Padrón-Paprika',
      en: 'Padrón peppers',
      es: 'Pimientos del padrón',
      gl: 'Pementos de Padrón',
      fr: 'Piments du padrón',
      it: 'Peperoni del padrón',
      tlh: 'pImyentoS patron',
    },
    description: {
      de: '400gr Padrón-Paprika in Olivenöl gebraten',
      en: '400gr of Padrón peppers fried in olive oil',
      es: '400gr de pimientos del padrón fritos en oliva',
      gl: '400gr de pementos de Padrón fritos en aceite de oliva',
      fr: "400gr de piments du padrón frits à l'huile d'olive",
      it: "400gr di peperoni del padrón fritti in olio d'oliva",
      tlh: "loSvatlh gr pImyentoS, 'olIv 'aq'e' vutlu'",
    },
  },
  {
    id: 'four-potatoes',
    category: 'vegan',
    dietary: 'vegan',
    price: '11 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '82% 72%',
    name: {
      de: 'Die 4 Kartoffeln der Welt',
      en: 'The 4 potatoes of the world',
      es: 'Las 4 patatas del mundo',
      gl: 'As 4 patacas do mundo',
      fr: 'Les 4 pommes de terre du monde',
      it: 'Le 4 patate del mondo',
      tlh: "qo' patata loS",
    },
    description: {
      de: 'Lokale Kartoffel, Yuca, Süßkartoffel und Banane als Chips frittiert, mit veganen Saucen',
      en: 'Local potato, cassava, sweet potato and banana, fried as crisps with vegan sauces',
      es: 'Patata local, yuca, patata dulce y banana fritas tipo chips con salsas veganas',
      gl: 'Pataca local, iuca, batata e plátano fritos tipo chips con salsas veganas',
      fr: 'Pomme de terre locale, manioc, patate douce et banane frites façon chips, avec sauces véganes',
      it: 'Patata locale, manioca, patata dolce e banana fritte tipo chips con salse vegane',
      tlh: "naDev patata, yuqa, patata na', 'ej banana; chIpmey rur, naH tlhagh tlhej",
    },
  },
  {
    id: 'falafel-6pcs',
    category: 'vegan',
    dietary: 'vegan',
    price: '9 €',
    image: MENU_IMAGES.veganTapas,
    imageObjectPosition: '78% 78%',
    name: {
      de: 'Falafel mit Saucen, 6 Stück',
      en: 'Falafel with sauces, 6 pcs.',
      es: 'Falafel solo con salsas 6 und.',
      gl: 'Falafel con salsas, 6 uds.',
      fr: 'Falafels avec sauces, 6 pièces',
      it: 'Falafel con salse, 6 pz.',
      tlh: 'valavel, jav',
    },
    description: {
      de: 'Hausgemachte Falafel, mit Fenchel gewürzt',
      en: 'Homemade falafel spiced with fennel',
      es: 'Falafel hecho en casa y especiado con hinojo',
      gl: 'Falafel feito na casa e especiado con fiúncho',
      fr: 'Falafels maison épicés au fenouil',
      it: 'Falafel fatto in casa aromatizzato al finocchio',
      tlh: "juHDaq chenmoHlu' valavel, HInojo tlhej",
    },
  },
  {
    id: 'falafel-salad',
    category: 'vegan',
    dietary: 'vegan',
    price: '12 €',
    image: MENU_IMAGES.streetFoodBowl,
    imageObjectPosition: '42% 55%',
    name: {
      de: 'Falafel mit Salat',
      en: 'Falafel with salad',
      es: 'Falafel con ensalada',
      gl: 'Falafel con ensalada',
      fr: 'Falafels avec salade',
      it: 'Falafel con insalata',
      tlh: "valavel 'ej 'enSalaDa",
    },
    description: {
      de: 'Hausgemachte Falafel auf einem Bett aus jungen Blattsalaten, Tomate, Zwiebel und mehr… & vegane Saucen',
      en: 'Homemade falafel on a bed of baby leaves, tomato, onion and more… & vegan sauces',
      es: 'Falafel casero servido en una cama de brotes tiernos, tomate, cebolla y más… & salsas vegan',
      gl: 'Falafel caseiro servido nunha cama de brotes tenros, tomate, cebola e máis… & salsas veganas',
      fr: 'Falafels maison servis sur un lit de jeunes pousses, tomate, oignon et plus… & sauces véganes',
      it: 'Falafel della casa servito su un letto di germogli teneri, pomodoro, cipolla e altro… & salse vegane',
      tlh: "valavel, naH Sor mach QaD, tomate, cheb, 'ej latlh… naH tlhagh tlhej",
    },
  },
  {
    id: 'vegetable-poke-bowl',
    category: 'vegan',
    dietary: 'vegan',
    price: '15 €',
    recommended: true,
    image: MENU_IMAGES.veganTapas,
    imageObjectPosition: '24% 68%',
    name: {
      de: 'Gemüse-Poke-Bowl',
      en: 'Vegetable poke bowl',
      es: 'Poke boll de verduras',
      gl: 'Poke bowl de verduras',
      fr: 'Poke bowl de légumes',
      it: 'Poke bowl di verdure',
      tlh: "naH poqe' HIvje'",
    },
    description: {
      de: 'Quinoa in der Mitte, 2 sautierte Gemüsesorten, Sprossen und ein Salat (Empfehlung des Hauses)',
      en: 'Real quinoa in the centre, 2 sautéed vegetables, sprouts and a salad (house recommendation)',
      es: 'Quinoa real en el centro, 2 salteados de verduras, un germinado y una ensalada (plato recomendado)',
      gl: 'Quinoa real no centro, 2 salteados de verduras, xermolados e unha ensalada (prato recomendado)',
      fr: 'Quinoa au centre, 2 poêlées de légumes, germes et une salade (plat recommandé)',
      it: "Quinoa al centro, 2 saltati di verdure, germogli e un'insalata (piatto consigliato)",
      tlh: "botlhDaq qInowa; cha' naH vutlu'bogh, naH mach, 'ej 'enSalaDa (nISwI' Soj)",
    },
  },
  {
    id: 'guacamole-nachos',
    category: 'vegan',
    dietary: 'vegan',
    price: '12 €',
    image: MENU_IMAGES.veganTapas,
    imageObjectPosition: '30% 48%',
    name: {
      de: 'Guacamole mit Nachos',
      en: 'Guacamole with nachos',
      es: 'Guacamole con Nachos',
      gl: 'Guacamole con Nachos',
      fr: 'Guacamole aux nachos',
      it: 'Guacamole con nachos',
      tlh: "ghuaqamole 'ej nachoS",
    },
    description: {
      de: '2 Avocados mit Pico-de-Gallo-Salsa (Tomate, Zwiebel, Paprika) und Nachos',
      en: '2 avocados mixed with pico de gallo salsa (tomato, onion, pepper) and nachos',
      es: '2 aguacates mezclados con salsa pico de gallo (tomate, cebolla, pimiento) y nachos',
      gl: '2 aguacates mesturados con salsa pico de gallo (tomate, cebola, pemento) e nachos',
      fr: '2 avocats mélangés à une salsa pico de gallo (tomate, oignon, poivron) et nachos',
      it: '2 avocado mescolati con salsa pico de gallo (pomodoro, cipolla, peperone) e nachos',
      tlh: "cha' 'aghuaqate, pIqo De ghayo tlhagh (tomate, cheb, pImyento) 'ej nachoS",
    },
  },
  {
    id: 'pasta-vegetables',
    category: 'vegan',
    dietary: 'vegan',
    price: '13 €',
    image: MENU_IMAGES.barInteriorTable,
    imageObjectPosition: '50% 68%',
    name: {
      de: 'Pasta mit Gemüse',
      en: 'Pasta with vegetables',
      es: 'Pasta con Vejetales',
      gl: 'Pasta con Verduras',
      fr: 'Pâtes aux légumes',
      it: 'Pasta con verdure',
      tlh: 'paSta naH tlhej',
    },
    description: {
      de: 'Zucchini, Aubergine, Zwiebel, Pilze, Lauch, Tomatensauce und viel mehr Gemüse!!!! (auf Wunsch mit veganem Käse oder Käse nach Wahl)',
      en: 'Courgette, aubergine, onion, mushrooms, leeks, tomato sauce and plenty more veg!!!! (ask for it with vegan cheese or the cheese of your choice)',
      es: 'Calabacín, berenjena, cebolla, setas, puerros, salsa de tomate y más vejetales!!!! (pídela con queso vegano o a elegir)',
      gl: 'Cabaciña, berenxena, cebola, cogomelos, porros, salsa de tomate e moitas máis verduras! (con queixo vegano ou a elixir)',
      fr: "Courgette, aubergine, oignon, champignons, poireaux, sauce tomate et bien d'autres légumes !!!! (à demander avec fromage végane ou au choix)",
      it: 'Zucchine, melanzane, cipolla, funghi, porri, salsa di pomodoro e tante altre verdure!!!! (chiedila con formaggio vegano o a scelta)',
      tlh: "quqInI, berenjena, cheb, SetaS, puero, tomate tlhagh, 'ej naH law'!!!! (naH tlhagh yIchup)",
    },
  },
  {
    id: 'millefeuille-pepper-crisps',
    category: 'vegan',
    dietary: 'vegan',
    price: '12 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '75% 65%',
    name: {
      de: 'Millefeuille von gerösteter Paprika und Chips',
      en: 'Roasted pepper and crisp millefeuille',
      es: 'Milhoja de pimientos asados y chips',
      gl: 'Milfollas de pementos asados e chips',
      fr: 'Millefeuille de poivrons grillés et chips',
      it: 'Millefoglie di peperoni arrostiti e chips',
      tlh: "pImyento meQpu' 'ej chIpmey",
    },
    description: {
      de: 'Türmchen aus gerösteter Paprika und Kartoffelchips auf frischem Spinat',
      en: 'Timbale of roasted peppers and potato crisps served on fresh spinach',
      es: 'Timbal de pimientos asados y patatas chips servidos sobre espinaca fresca',
      gl: 'Timbal de pementos asados e patacas chips servidos sobre espinaca fresca',
      fr: 'Timbale de poivrons grillés et de chips servie sur épinards frais',
      it: 'Timballo di peperoni arrostiti e patatine servito su spinaci freschi',
      tlh: "pImyento meQpu' 'ej patata chIpmey, 'eSpInaqa chu'Daq",
    },
  },
  {
    id: 'world-family-salad',
    category: 'vegan',
    dietary: 'vegan',
    price: '9 €',
    image: MENU_IMAGES.streetFoodBowl,
    imageObjectPosition: '35% 50%',
    name: {
      de: 'World-Family-Salat',
      en: 'World Family salad',
      es: 'Ensalada World Family',
      gl: 'Ensalada World Family',
      fr: 'Salade World Family',
      it: 'Insalata World Family',
      tlh: "qo' qorDu' 'enSalaDa",
    },
    description: {
      de: 'Verschiedene Blattsalate, Spinat und Produkte der Saison',
      en: 'Assorted lettuces, spinach and seasonal produce',
      es: 'Diferentes lechugas, espinacas y productos de temporada',
      gl: 'Diferentes leitugas, espinacas e produtos de tempada',
      fr: 'Différentes laitues, épinards et produits de saison',
      it: 'Diverse lattughe, spinaci e prodotti di stagione',
      tlh: "naH Sor pIm, 'eSpInaqa, 'ej poH naH",
    },
  },
  {
    id: 'soup-of-the-day',
    category: 'vegan',
    dietary: 'vegan',
    price: '9 €',
    image: MENU_IMAGES.streetFoodBowl,
    imageObjectPosition: '50% 60%',
    name: {
      de: 'Tagessuppe',
      en: 'Soup of the day',
      es: 'Sopa del día',
      gl: 'Sopa do día',
      fr: 'Soupe du jour',
      it: 'Zuppa del giorno',
      tlh: 'jaj Supa',
    },
    description: {
      de: 'Hausgemachte Gemüsesuppen und -cremes',
      en: 'Homemade vegetable soups and creams',
      es: 'Sopas y cremas de verdura o sopa hechas en casa',
      gl: 'Sopas e cremas de verdura feitas na casa',
      fr: 'Soupes et veloutés de légumes faits maison',
      it: 'Zuppe e vellutate di verdure fatte in casa',
      tlh: "juHDaq chenmoHlu' naH Supa 'ej naH ro'",
    },
  },
  {
    id: 'local-potatoes',
    category: 'vegan',
    dietary: 'vegan',
    price: '7 €',
    image: MENU_IMAGES.burgerFries,
    imageObjectPosition: '78% 58%',
    name: {
      de: 'Kartoffeln aus der Region',
      en: 'Local potatoes',
      es: 'Patatas del país',
      gl: 'Patacas do país',
      fr: 'Pommes de terre du pays',
      it: 'Patate del paese',
      tlh: 'naDev patata',
    },
    description: {
      de: 'Galicische Pataca do país, in Olivenöl gebraten, mit hausgemachten Saucen',
      en: 'Galician pataca do país fried in olive oil, with house sauces',
      es: 'Pataca do país gallega frita en aceite de oliva, con salsas de la casa',
      gl: 'Pataca do país galega frita en aceite de oliva, con salsas da casa',
      fr: "Pataca do país galicienne frite à l'huile d'olive, avec sauces maison",
      it: "Pataca do país galiziana fritta in olio d'oliva, con salse della casa",
      tlh: "QALISYA patata, 'olIv 'aq'e' vutlu', juH tlhagh tlhej",
    },
  },

  // ===========================================================================
  // 2. BURGERS (11 € / + mit Pommes 14 €) — 3 ITEMS
  // ===========================================================================
  {
    id: 'carnivora-burger',
    category: 'burgers',
    dietary: 'meat',
    price: '11 €',
    secondaryPrice: {
      label: {
        de: '+ mit Pommes',
        en: '+ with chips',
        es: '+ con patatas fritas',
        gl: '+ con patacas fritas',
        fr: '+ avec frites',
        it: '+ con patatine fritte',
        tlh: "+ patata vutlu'bogh tlhej",
      },
      price: '14 €',
    },
    image: MENU_IMAGES.burgerFries,
    imageObjectPosition: '36% 52%',
    name: {
      de: 'CarniVora-Burger',
      en: 'CarniVora burger',
      es: 'Hamburguesa CarniVora',
      gl: 'Hamburguesa CarniVora',
      fr: 'Burger CarniVora',
      it: 'Hamburger CarniVora',
      tlh: 'HamburgheSa qarnIvora',
    },
    description: {
      de: 'Blattsalate, Zwiebel, Tomate, Gewürzgurke, 175gr Rindfleisch, Ei, Bacon und Cheddar',
      en: 'Lettuce, onion, tomato, gherkin, 175gr beef patty, egg, bacon and cheddar cheese',
      es: 'Lechugas, cebolla, tomate, pepinillo, carne ternera 175gr, huevo, bacon y queso chedar',
      gl: 'Leitugas, cebola, tomate, cogombro, carne de tenreira 175gr, ovo, bacon e queixo cheddar',
      fr: 'Laitues, oignon, tomate, cornichon, steak de bœuf 175gr, œuf, bacon et cheddar',
      it: 'Lattuga, cipolla, pomodoro, cetriolino, carne di manzo 175gr, uovo, bacon e cheddar',
      tlh: "naH Sor, cheb, tomate, peqInIlo, wa'vatlh SochmaH vagh gr Ha'DIbaH, QIm, beqon, 'ej chedar",
    },
  },
  {
    id: 'vegetarian-burger',
    category: 'burgers',
    dietary: 'vegetarian',
    price: '11 €',
    secondaryPrice: {
      label: {
        de: '+ mit Pommes',
        en: '+ with chips',
        es: '+ con patatas fritas',
        gl: '+ con patacas fritas',
        fr: '+ avec frites',
        it: '+ con patatine fritte',
        tlh: "+ patata vutlu'bogh tlhej",
      },
      price: '14 €',
    },
    image: MENU_IMAGES.burgerFries,
    imageObjectPosition: '48% 58%',
    name: {
      de: 'Vegetarischer Burger',
      en: 'Vegetarian burger',
      es: 'Hamburguesa Vejetariana',
      gl: 'Hamburguesa Vexetariana',
      fr: 'Burger végétarien',
      it: 'Hamburger vegetariano',
      tlh: 'HamburgheSa naH',
    },
    description: {
      de: 'Spinat, Zwiebel, Tomate, hausgemachtes Gemüse-Patty, Gewürzgurke, Ei, Ziegenkäse, Paprika und Zucchini',
      en: 'Spinach, onion, tomato, homemade veggie patty, gherkin, egg, goat cheese, red pepper and courgette',
      es: 'Espinaca, cebolla, tomate, carne vejetal casera, pepinillo, huevo, queso de cabra, pimiento morrón y calabacín',
      gl: 'Espinaca, cebola, tomate, hamburguesa vexetal caseira, cogombro, ovo, queixo de cabra, pemento e cabaciña',
      fr: 'Épinards, oignon, tomate, steak végétal maison, cornichon, œuf, fromage de chèvre, poivron et courgette',
      it: 'Spinaci, cipolla, pomodoro, burger vegetale della casa, cetriolino, uovo, formaggio di capra, peperone e zucchine',
      tlh: "'eSpInaqa, cheb, tomate, juH naH Ha'DIbaH rurbogh, peqInIlo, QIm, ngavyaw' ngogh, pImyento, 'ej quqInI",
    },
  },
  {
    id: 'vegan-burger',
    category: 'burgers',
    dietary: 'vegan',
    price: '11 €',
    secondaryPrice: {
      label: {
        de: '+ mit Pommes',
        en: '+ with chips',
        es: '+ con patatas fritas',
        gl: '+ con patacas fritas',
        fr: '+ avec frites',
        it: '+ con patatine fritte',
        tlh: "+ patata vutlu'bogh tlhej",
      },
      price: '14 €',
    },
    image: MENU_IMAGES.burgerFries,
    imageObjectPosition: '40% 62%',
    name: {
      de: 'Veganer Burger',
      en: 'Vegan burger',
      es: 'Hamburguesa Vegana',
      gl: 'Hamburguesa Vegana',
      fr: 'Burger végane',
      it: 'Hamburger vegano',
      tlh: 'HamburgheSa naH neH',
    },
    description: {
      de: 'Blattsalat, Zwiebel, Tomate, Gewürzgurke, Zucchini und Aubergine, hausgemachtes Gemüse-Patty, Pilze, Paprika und veganer Käse',
      en: 'Salad leaves, onion, tomato, gherkin, courgette and aubergine, homemade veggie patty, mushrooms, red pepper and vegan cheese',
      es: 'Hojas de ensalada, cebolla, tomate, pepinillo, calabacín y berenjena, carne vejetal casera, setas, pimiento morrón y queso vegano',
      gl: 'Follas de ensalada, cebola, tomate, cogombro, cabaciña e berenxena, hamburguesa vexetal caseira, cogomelos, pemento e queixo vegano',
      fr: 'Feuilles de salade, oignon, tomate, cornichon, courgette et aubergine, steak végétal maison, champignons, poivron et fromage végane',
      it: 'Foglie di insalata, cipolla, pomodoro, cetriolino, zucchine e melanzane, burger vegetale della casa, funghi, peperone e formaggio vegano',
      tlh: "naH Sor, cheb, tomate, peqInIlo, quqInI, berenjena, juH naH Ha'DIbaH rurbogh, SetaS, pImyento, 'ej naH ngogh",
    },
  },

  // ===========================================================================
  // 3. SANDWICHES WITH CRISPS (SANDWICHES MIT CHIPS) — 4 ITEMS
  // ===========================================================================
  {
    id: 'ham-sandwich',
    category: 'sandwiches',
    dietary: 'meat',
    price: '9 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '45% 55%',
    name: {
      de: 'Sandwich mit Schinken',
      en: 'Ham sandwich',
      es: 'Bocadillo de jamón',
      gl: 'Bocadillo de xamón',
      fr: 'Sandwich au jambon',
      it: 'Panino con prosciutto',
      tlh: 'jamon boqaDIlo',
    },
    description: {
      de: 'Blattsalat, Tomate, Serrano-Schinken und Olivenöl. Serviert mit Kartoffelchips',
      en: 'Lettuce, tomato, serrano ham and olive oil. Served with potato crisps',
      es: 'Lechuga, tomate, jamón serrano y aceite. Servido con patatas chips',
      gl: 'Leituga, tomate, xamón serrano e aceite de oliva. Servido con patacas chips',
      fr: "Laitue, tomate, jambon serrano et huile d'olive. Servi avec des chips",
      it: 'Lattuga, pomodoro, prosciutto serrano e olio. Servito con patatine chips',
      tlh: "naH Sor, tomate, Serano jamon, 'ej 'olIv 'aq'e'. patata chIpmey tlhej",
    },
  },
  {
    id: 'squid-sandwich',
    category: 'sandwiches',
    dietary: 'seafood',
    price: '9 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '52% 52%',
    name: {
      de: 'Sandwich mit Calamares',
      en: 'Squid sandwich',
      es: 'Bocadillo de calamar',
      gl: 'Bocadillo de luras',
      fr: 'Sandwich aux calamars',
      it: 'Panino con calamari',
      tlh: 'qalamar boqaDIlo',
    },
    description: {
      de: '125gr frittierte Calamares mit Blattsalat, Tomate und Aioli. Serviert mit Kartoffelchips',
      en: '125gr of fried squid with lettuce, tomato and aioli. Served with potato crisps',
      es: '125gr de calamar frito con lechuga, tomate y alioli. Servido con patatas chips',
      gl: '125gr de luras fritas con leituga, tomate e alioli. Servido con patacas chips',
      fr: '125gr de calamars frits avec laitue, tomate et aïoli. Servi avec des chips',
      it: '125gr di calamari fritti con lattuga, pomodoro e aioli. Servito con patatine chips',
      tlh: "wa'vatlh cha'maH vagh gr qalamar vutlu'bogh, naH Sor, tomate, 'ej 'ayolI. patata chIpmey tlhej",
    },
  },
  {
    id: 'falafel-sandwich',
    category: 'sandwiches',
    dietary: 'vegan',
    price: '9 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '60% 58%',
    name: {
      de: 'Sandwich mit Falafel',
      en: 'Falafel sandwich',
      es: 'Bocadillo de falafel',
      gl: 'Bocadillo de falafel',
      fr: 'Sandwich au falafel',
      it: 'Panino con falafel',
      tlh: 'valavel boqaDIlo',
    },
    description: {
      de: 'Blattsalat, Zucchini und Aubergine, 3 Falafelbällchen und Sauce. Serviert mit Chips',
      en: 'Lettuce, courgette and aubergine, 3 falafel balls and sauce. Served with crisps',
      es: 'Lechuga, calabacín y berenjena, 3 bolitas de falafel y salsa. Servido con chips',
      gl: 'Leituga, cabaciña e berenxena, 3 boliñas de falafel e salsa. Servido con chips',
      fr: 'Laitue, courgette et aubergine, 3 boulettes de falafel et sauce. Servi avec des chips',
      it: 'Lattuga, zucchine e melanzane, 3 polpette di falafel e salsa. Servito con chips',
      tlh: 'naH Sor, quqInI, berenjena, wej valavel, \'ej tlhagh. chIpmey tlhej',
    },
  },
  {
    id: 'vegetarian-sandwich',
    category: 'sandwiches',
    dietary: 'vegetarian',
    price: '9 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '40% 58%',
    name: {
      de: 'Vegetarisches Sandwich',
      en: 'Vegetarian sandwich',
      es: 'Bocadillo vegetariano',
      gl: 'Bocadillo vexetariano',
      fr: 'Sandwich végétarien',
      it: 'Panino vegetariano',
      tlh: 'naH boqaDIlo',
    },
    description: {
      de: 'Spinat, Tomate, Ziegenkäse, Honig und Walnüsse. Serviert mit Kartoffelchips',
      en: 'Spinach, tomato, goat cheese, honey and walnuts. Served with potato crisps',
      es: 'Espinacas, tomate, queso de cabra, miel y nueces. Servido con patatas chips',
      gl: 'Espinacas, tomate, queixo de cabra, mel e noces. Servido con patacas chips',
      fr: 'Épinards, tomate, fromage de chèvre, miel et noix. Servi avec des chips',
      it: 'Spinaci, pomodoro, formaggio di capra, miele e noci. Servito con patatine chips',
      tlh: "'eSpInaqa, tomate, ngavyaw' ngogh, mIyel, 'ej nuweS. patata chIpmey tlhej",
    },
  },

  // ===========================================================================
  // 4. MEAT & FISH DISHES (FLEISCH- & FISCHGERICHTE) — 6 ITEMS
  // ===========================================================================
  {
    id: 'grilled-fish-of-the-day',
    category: 'meat_fish',
    dietary: 'seafood',
    price: '19 €',
    recommended: true,
    image: MENU_IMAGES.pulpoSeafood,
    imageObjectPosition: '50% 45%',
    name: {
      de: 'Fisch des Tages vom Grill',
      en: 'Grilled fish of the day',
      es: 'Pescado del día a la plancha',
      gl: 'Peixe do día á prancha',
      fr: 'Poisson du jour grillé',
      it: 'Pesce del giorno alla piastra',
      tlh: "jaj ghotI' meQmoHlu'bogh",
    },
    description: {
      de: 'Fisch aus Fisterra vom Grill mit Kartoffeln und Salat',
      en: 'Fish from Fisterra, grilled, with potatoes and salad',
      es: 'Pescado de Fisterra a la plancha con patatas y ensalada',
      gl: 'Peixe de Fisterra á prancha con patacas e ensalada',
      fr: 'Poisson de Fisterra grillé avec pommes de terre et salade',
      it: 'Pesce di Fisterra alla piastra con patate e insalata',
      tlh: "FISTERRA ghotI', patata 'ej 'enSalaDa tlhej",
    },
  },
  {
    id: 'grilled-octopus',
    category: 'meat_fish',
    dietary: 'seafood',
    price: '20 €',
    recommended: true,
    image: MENU_IMAGES.pulpoSeafood,
    imageObjectPosition: '28% 72%',
    name: {
      de: 'Oktopus vom Grill',
      en: 'Grilled octopus',
      es: 'Pulpo a la plancha',
      gl: 'Polbo á prancha',
      fr: 'Poulpe grillé',
      it: 'Polpo alla piastra',
      tlh: "pulpo meQmoHlu'bogh",
    },
    description: {
      de: '200gr Oktopus (2 Tentakel) auf Kartoffelbett, mit Knoblauch und Cognac sautiert',
      en: '200gr of octopus (2 tentacles) served on a bed of potato, sautéed with garlic and brandy',
      es: '200gr de pulpo (2 rayos) servido sobre cama de patata y salteado con ajo y coñac',
      gl: '200gr de polbo (2 tentáculos) servido sobre cama de pataca e salteado con allo e coñac',
      fr: "200gr de poulpe (2 tentacules) servi sur lit de pommes de terre, sauté à l'ail et au cognac",
      it: '200gr di polpo (2 tentacoli) servito su letto di patate e saltato con aglio e cognac',
      tlh: "cha'vatlh gr pulpo (cha' 'uS); patataDaq, 'ajo 'ej qonyaq tlhej",
    },
  },
  {
    id: 'fried-squid-potatoes',
    category: 'meat_fish',
    dietary: 'seafood',
    price: '18 €',
    image: MENU_IMAGES.bocadilloCrisps,
    imageObjectPosition: '48% 52%',
    name: {
      de: 'Frittierte Calamares mit Kartoffeln',
      en: 'Fried squid with potatoes',
      es: 'Calamar frito con patatas',
      gl: 'Luras fritas con patacas',
      fr: 'Calamars frits avec pommes de terre',
      it: 'Calamari fritti con patate',
      tlh: "qalamar vutlu'bogh 'ej patata",
    },
    description: {
      de: '300gr geputzte Calamares mit Kartoffeln und Salat',
      en: '300gr of cleaned squid with potatoes and salad',
      es: '300gr de calamar limpio con patatas y ensalada',
      gl: '300gr de luras limpas con patacas e ensalada',
      fr: '300gr de calamars nettoyés avec pommes de terre et salade',
      it: '300gr di calamari puliti con patate e insalata',
      tlh: "wejvatlh gr qalamar Say', patata 'ej 'enSalaDa tlhej",
    },
  },
  {
    id: 'king-prawns-garlic',
    category: 'meat_fish',
    dietary: 'seafood',
    price: '20 €',
    image: MENU_IMAGES.pulpoSeafood,
    imageObjectPosition: '76% 62%',
    name: {
      de: 'Riesengarnelen mit Knoblauch',
      en: 'King prawns with garlic',
      es: 'Gambón con ajo',
      gl: 'Gambón ao allo',
      fr: "Gambas à l'ail",
      it: "Gamberoni all'aglio",
      tlh: "ghambon 'ajo tlhej",
    },
    description: {
      de: '12 Riesengarnelen in Olivenöl und Knoblauch zubereitet',
      en: '12 king prawns cooked in olive oil and garlic',
      es: '12 piezas de gambón pasado con aceite de oliva y ajo',
      gl: '12 pezas de gambón cociñadas en aceite de oliva e allo',
      fr: "12 grosses gambas cuisinées à l'huile d'olive et à l'ail",
      it: "12 gamberoni cotti con olio d'oliva e aglio",
      tlh: "wa'maH cha' ghambon, 'olIv 'aq'e' 'ej 'ajo tlhej",
    },
  },
  {
    id: 'meat-with-potatoes',
    category: 'meat_fish',
    dietary: 'meat',
    price: '12 €',
    image: MENU_IMAGES.burgerFries,
    imageObjectPosition: '72% 55%',
    name: {
      de: 'Fleisch mit Kartoffeln',
      en: 'Meat with potatoes',
      es: 'Carne con patatas',
      gl: 'Carne con patacas',
      fr: 'Viande avec pommes de terre',
      it: 'Carne con patate',
      tlh: "Ha'DIbaH 'ej patata",
    },
    description: {
      de: '350gr Schweinefleisch mit Paprika mariniert, serviert mit Pommes',
      en: '350gr of paprika-marinated pork served with chips',
      es: '350gr de carne de cerdo empimentonada y servida con patatas fritas',
      gl: '350gr de carne de porco adobada con pemento e servida con patacas fritas',
      fr: '350gr de porc au paprika servi avec des frites',
      it: '350gr di carne di maiale alla paprika servita con patatine fritte',
      tlh: "wejvatlh vaghmaH gr Ha'DIbaH Doq, patata vutlu'bogh tlhej",
    },
  },
  {
    id: 'caprese-salad',
    category: 'meat_fish',
    dietary: 'vegetarian',
    price: '11 €',
    image: MENU_IMAGES.veganTapas,
    imageObjectPosition: '50% 45%',
    name: {
      de: 'Caprese-Salat',
      en: 'Caprese salad',
      es: 'Ensalada capresse',
      gl: 'Ensalada Caprese',
      fr: 'Salade caprese',
      it: 'Insalata caprese',
      tlh: "qapreSe 'enSalaDa",
    },
    description: {
      de: 'Spinatbett, galicische Tomate und Burrata mit Basilikum',
      en: 'Bed of spinach, Galician tomato and burrata cheese with basil',
      es: 'Cama de espinaca, tomate gallego y queso burrata con basílico',
      gl: 'Cama de espinaca, tomate galego e queixo burrata con alfábega',
      fr: "Lit d'épinards, tomate galicienne et burrata au basilic",
      it: 'Letto di spinaci, pomodoro galiziano e burrata con basilico',
      tlh: "'eSpInaqa, QALISYA tomate, buratha ngogh, 'ej baSIl",
    },
  },

  // ===========================================================================
  // 5. BREAKFAST (FRÜHSTÜCK) — 5 ITEMS + ADD-ONS
  // ===========================================================================
  {
    id: 'two-eggs-with-toast',
    category: 'breakfast',
    dietary: 'vegetarian',
    price: '5 €',
    image: MENU_IMAGES.breakfastSpread,
    imageObjectPosition: '56% 78%',
    name: {
      de: '2 Eier mit Toast',
      en: '2 eggs with toast',
      es: '2 huevos con tostadas',
      gl: '2 ovos con torradas',
      fr: '2 œufs avec toasts',
      it: '2 uova con toast',
      tlh: "cha' QIm 'ej toStaDa",
    },
    description: {
      de: 'Frisch zubereitet mit knusprigem Toast · Extras nach Wahl:',
      en: 'Freshly prepared with toasted bread · Optional extras:',
      es: 'Preparados al momento con tostadas · Extras a elegir:',
      gl: 'Preparados ao momento con torradas · Extras a elixir:',
      fr: 'Préparés à la minute avec toasts · Suppléments au choix :',
      it: 'Preparate al momento con toast · Extra a scelta:',
      tlh: "DaH vutlu' · latlh Soj:",
    },
    addons: [
      {
        label: {
          de: '+ 2 Streifen Bacon',
          en: '+ 2 rashers of bacon',
          es: '+ 2 tiras de bacon',
          gl: '+ 2 tiras de bacon',
          fr: '+ 2 tranches de bacon',
          it: '+ 2 fette di bacon',
          tlh: "+ cha' beqon",
        },
        price: '1 €',
      },
      {
        label: {
          de: '+ 1 Avocado',
          en: '+ 1 avocado',
          es: '+ 1 aguacate',
          gl: '+ 1 aguacate',
          fr: '+ 1 avocat',
          it: '+ 1 avocado',
          tlh: "+ wa' 'aghuaqate",
        },
        price: '2 €',
      },
      {
        label: {
          de: '+ 1 Tomate',
          en: '+ 1 tomato',
          es: '+ 1 tomate',
          gl: '+ 1 tomate',
          fr: '+ 1 tomate',
          it: '+ 1 pomodoro',
          tlh: "+ wa' tomate",
        },
        price: '1 €',
      },
      {
        label: {
          de: '+ 1 Portion Pilze',
          en: '+ 1 portion of mushrooms',
          es: '+ 1 porción setas',
          gl: '+ 1 ración de cogomelos',
          fr: '+ 1 portion de champignons',
          it: '+ 1 porzione di funghi',
          tlh: "+ wa' SetaS",
        },
        price: '1 €',
      },
      {
        label: {
          de: '+ Kartoffeln (Pommes, Hashbrown)',
          en: '+ Potatoes (chips, hash brown)',
          es: '+ Patatas (fritas, hassbrow)',
          gl: '+ Patacas (fritas, hash brown)',
          fr: '+ Pommes de terre (frites, hash brown)',
          it: '+ Patate (fritte, hash brown)',
          tlh: "+ patata (vutlu'bogh, HaSbro)",
        },
        price: '2 €',
      },
    ],
  },
  {
    id: 'fresh-orange-juice',
    category: 'breakfast',
    dietary: 'vegan',
    price: '3 €',
    image: MENU_IMAGES.breakfastSpread,
    imageObjectPosition: '84% 52%',
    name: {
      de: 'Frisch gepresster Orangensaft',
      en: 'Freshly squeezed orange juice',
      es: 'Jugo de naranja natural',
      gl: 'Zume de laranxa natural',
      fr: "Jus d'orange pressé",
      it: "Spremuta d'arancia",
      tlh: "naranja bIQ chu'",
    },
  },
  {
    id: 'sweet-pancakes-honey',
    category: 'breakfast',
    dietary: 'vegetarian',
    price: '6 €',
    image: MENU_IMAGES.breakfastSpread,
    imageObjectPosition: '22% 62%',
    name: {
      de: 'Süße Pfannkuchen mit Honig',
      en: 'Sweet pancakes with honey',
      es: 'Pankekes dulces con miel',
      gl: ' filloas / Pancakes doces con mel',
      fr: 'Pancakes sucrés au miel',
      it: 'Pancake dolci con miele',
      tlh: "panqeq 'ej mIyel",
    },
  },
  {
    id: 'toast-with-butter',
    category: 'breakfast',
    dietary: 'vegetarian',
    price: '3 €',
    image: MENU_IMAGES.breakfastSpread,
    imageObjectPosition: '68% 82%',
    name: {
      de: 'Toast mit Butter',
      en: 'Toast with butter',
      es: 'Tostadas con mantequilla',
      gl: 'Torradas con manteiga',
      fr: 'Toasts au beurre',
      it: 'Toast con burro',
      tlh: "toStaDa 'ej mantequIya",
    },
  },
  {
    id: 'fruit-bowl',
    category: 'breakfast',
    dietary: 'vegan',
    price: '5 €',
    image: MENU_IMAGES.breakfastSpread,
    imageObjectPosition: '54% 50%',
    name: {
      de: 'Obstschale',
      en: 'Fruit bowl',
      es: 'Boll de frutas',
      gl: 'Cunca de froita fresca',
      fr: 'Coupe de fruits',
      it: 'Coppa di frutta',
      tlh: "naH HIvje'",
    },
  },

  // ===========================================================================
  // 6. DRINKS & GALICIAN WINES (GETRÄNKE) — 11 ITEMS
  // ===========================================================================
  {
    id: 'soft-drink',
    category: 'drinks',
    dietary: 'drinks',
    price: '2,70 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '20% 60%',
    name: {
      de: 'Softdrink',
      en: 'Soft drink',
      es: 'Refresco',
      gl: 'Refresco',
      fr: 'Boisson fraîche',
      it: 'Bibita',
      tlh: 'HIq Hutlh bIQ',
    },
  },
  {
    id: 'kombucha',
    category: 'drinks',
    dietary: 'vegan',
    price: '4 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '38% 68%',
    name: {
      de: 'Kombucha (alkoholfrei)',
      en: 'Kombucha (non-alcoholic)',
      es: 'Kombucha (no alcohol)',
      gl: 'Kombucha (sen alcohol)',
      fr: 'Kombucha (sans alcool)',
      it: 'Kombucha (analcolico)',
      tlh: 'qombucha (HIq Hutlh)',
    },
  },
  {
    id: 'ginger-beer',
    category: 'drinks',
    dietary: 'vegan',
    price: '4 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '42% 72%',
    name: {
      de: 'Ginger Beer (alkoholfrei)',
      en: 'Ginger Beer (non-alcoholic)',
      es: 'Ginger Beer (no alcohol)',
      gl: 'Ginger Beer (sen alcohol)',
      fr: 'Ginger Beer (sans alcool)',
      it: 'Ginger Beer (analcolico)',
      tlh: "ghInjer bIra' (HIq Hutlh)",
    },
  },
  {
    id: 'draught-beer-220',
    category: 'drinks',
    dietary: 'drinks',
    price: '2,50 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '82% 65%',
    name: {
      de: 'Bier vom Fass 220cl (Caña)',
      en: 'Draught beer 220cl',
      es: 'Caña 220cl',
      gl: 'Cana de cervexa 220cl',
      fr: 'Bière pression 220cl',
      it: 'Birra alla spina 220cl',
      tlh: "bIra' mach 220cl",
    },
  },
  {
    id: 'pint-660',
    category: 'drinks',
    dietary: 'drinks',
    price: '5 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '84% 62%',
    name: {
      de: 'Pint 660cl',
      en: 'Pint 660cl',
      es: 'Pinta 660cl',
      gl: 'Pinta 660cl',
      fr: 'Pinte 660cl',
      it: 'Pinta 660cl',
      tlh: 'pInta 660cl',
    },
  },
  {
    id: 'house-red-wine',
    category: 'drinks',
    dietary: 'drinks',
    price: '3 €',
    image: MENU_IMAGES.barInteriorTable,
    imageObjectPosition: '54% 58%',
    name: {
      de: 'Hausrotwein',
      en: 'House red wine',
      es: 'Vino tinto de la casa',
      gl: 'Viño tinto da casa',
      fr: 'Vin rouge maison',
      it: 'Vino rosso della casa',
      tlh: 'juH HIq Doq',
    },
  },
  {
    id: 'rioja-reserva',
    category: 'drinks',
    dietary: 'drinks',
    price: '3 €',
    image: MENU_IMAGES.barInteriorTable,
    imageObjectPosition: '55% 60%',
    name: {
      de: 'Rioja Reserva',
      en: 'Rioja reserva wine',
      es: 'Vino rioja reserva',
      gl: 'Viño Rioja Reserva',
      fr: 'Vin rioja reserva',
      it: 'Vino rioja reserva',
      tlh: 'rIoja reServa HIq',
    },
  },
  {
    id: 'mencia-galician',
    category: 'drinks',
    dietary: 'drinks',
    price: '3 €',
    recommended: true,
    image: MENU_IMAGES.barInteriorTable,
    imageObjectPosition: '56% 58%',
    name: {
      de: 'Mencía (galicisch)',
      en: 'Mencía wine (Galician)',
      es: 'Vino mencía (gallego)',
      gl: 'Viño Mencía (galego)',
      fr: 'Vin mencía (galicien)',
      it: 'Vino mencía (galiziano)',
      tlh: 'menSIya HIq (QALISYA)',
    },
  },
  {
    id: 'house-white-wine',
    category: 'drinks',
    dietary: 'drinks',
    price: '3 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '62% 62%',
    name: {
      de: 'Hausweißwein',
      en: 'House white wine',
      es: 'Vino blanco de la casa',
      gl: 'Viño branco da casa',
      fr: 'Vin blanc maison',
      it: 'Vino bianco della casa',
      tlh: 'juH HIq chIS',
    },
  },
  {
    id: 'albarino-galician',
    category: 'drinks',
    dietary: 'drinks',
    price: '3 €',
    recommended: true,
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '62% 58%',
    name: {
      de: 'Albariño (galicisch)',
      en: 'Albariño wine (Galician)',
      es: 'Vino albariño (gallego)',
      gl: 'Viño Albariño (galego)',
      fr: 'Vin albariño (galicien)',
      it: 'Vino albariño (galiziano)',
      tlh: "'albarInyo HIq (QALISYA)",
    },
  },
  {
    id: 'godello-ribeiro',
    category: 'drinks',
    dietary: 'drinks',
    price: '3 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '60% 60%',
    name: {
      de: 'Godello oder Ribeiro (galicisch)',
      en: 'Godello or Ribeiro (Galician)',
      es: 'Godello o riveiro (gallego)',
      gl: 'Godello ou Ribeiro (galego)',
      fr: 'Godello ou ribeiro (galicien)',
      it: 'Godello o ribeiro (galiziano)',
      tlh: 'ghoDeyo, rIbeyro (QALISYA)',
    },
  },

  // ===========================================================================
  // 7. COCKTAILS & SPIRITS (COCKTAILS) — 9 ITEMS
  // ===========================================================================
  {
    id: 'gin-tonic',
    category: 'cocktails',
    dietary: 'drinks',
    price: '6 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '18% 62%',
    name: {
      de: 'Gin Tonic & Ähnliches',
      en: 'Gin tonic & similar',
      es: 'Gin tonic & similares',
      gl: 'Gin tonic e similares',
      fr: 'Gin tonic & similaires',
      it: 'Gin tonic & simili',
      tlh: 'jIn tonIq',
    },
  },
  {
    id: 'whisky-sour',
    category: 'cocktails',
    dietary: 'drinks',
    price: '8 €',
    recommended: true,
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '42% 68%',
    name: {
      de: 'Whisky Sour',
      en: 'Whisky sour',
      es: 'Whisky sour',
      gl: 'Whisky sour',
      fr: 'Whisky sour',
      it: 'Whisky sour',
      tlh: "wISqI' Sawer",
    },
  },
  {
    id: 'moscow-mule',
    category: 'cocktails',
    dietary: 'drinks',
    price: '7 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '40% 70%',
    name: {
      de: 'Moscow Mule',
      en: 'Moscow mule',
      es: 'Moscow mule',
      gl: 'Moscow mule',
      fr: 'Moscow mule',
      it: 'Moscow mule',
      tlh: 'moSqow myul',
    },
  },
  {
    id: 'caipirinha',
    category: 'cocktails',
    dietary: 'drinks',
    price: '7 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '18% 66%',
    name: {
      de: 'Caipirinha',
      en: 'Caipirinha',
      es: 'Caipiriña',
      gl: 'Caipiriña',
      fr: 'Caïpirinha',
      it: 'Caipirinha',
      tlh: 'qaypIrInya',
    },
  },
  {
    id: 'mojito',
    category: 'cocktails',
    dietary: 'drinks',
    price: '7 €',
    recommended: true,
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '16% 64%',
    name: {
      de: 'Mojito',
      en: 'Mojito',
      es: 'Mojito',
      gl: 'Mojito',
      fr: 'Mojito',
      it: 'Mojito',
      tlh: 'mojIto',
    },
  },
  {
    id: 'pina-colada',
    category: 'cocktails',
    dietary: 'drinks',
    price: '7 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '22% 60%',
    name: {
      de: 'Piña Colada',
      en: 'Piña Colada',
      es: 'Piña Colada',
      gl: 'Piña Colada',
      fr: 'Piña Colada',
      it: 'Piña Colada',
      tlh: 'pInya qolaDa',
    },
  },
  {
    id: 'whisky-gin-neat',
    category: 'cocktails',
    dietary: 'drinks',
    price: '5 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '60% 60%',
    name: {
      de: 'Whisky · Gin (pur)',
      en: 'Whisky · Gin (neat)',
      es: 'Whisky · Gin (solo)',
      gl: 'Whisky · Gin (só)',
      fr: 'Whisky · Gin (sec)',
      it: 'Whisky · Gin (liscio)',
      tlh: "wISqI' · jIn (mob)",
    },
  },
  {
    id: 'galician-liqueurs',
    category: 'cocktails',
    dietary: 'drinks',
    price: '4 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '42% 65%',
    name: {
      de: 'Galicische Liköre mit Eis',
      en: 'Galician liqueurs on ice',
      es: 'Licores gallegos con hielo',
      gl: 'Licores galegos con xeo',
      fr: 'Liqueurs galiciennes avec glaçons',
      it: 'Liquori galiziani con ghiaccio',
      tlh: 'QALISYA HIq chuch tlhej',
    },
  },
  {
    id: 'shots',
    category: 'cocktails',
    dietary: 'drinks',
    price: '3 €',
    image: MENU_IMAGES.cocktailsWine,
    imageObjectPosition: '82% 65%',
    name: {
      de: 'Shots',
      en: 'Shots',
      es: 'Chupitos',
      gl: 'Chupitos',
      fr: 'Shots',
      it: 'Shot',
      tlh: 'HIq mach',
    },
  },
];

export interface FilterMenuOptions {
  category: MenuCategoryId | 'all';
  dietary: 'all' | 'vegan' | 'vegetarian' | 'seafood';
  searchQuery: string;
  lang: MenuLanguage;
}

export function filterMenuItems(
  items: MenuItem[],
  options: FilterMenuOptions
): MenuItem[] {
  const query = options.searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (options.category !== 'all' && item.category !== options.category) {
      return false;
    }

    if (options.dietary === 'vegan' && item.dietary !== 'vegan') {
      return false;
    }
    if (
      options.dietary === 'vegetarian' &&
      item.dietary !== 'vegan' &&
      item.dietary !== 'vegetarian'
    ) {
      return false;
    }
    if (options.dietary === 'seafood' && item.dietary !== 'seafood') {
      return false;
    }

    if (query.length > 0) {
      const nameText = item.name[options.lang].toLowerCase();
      const descText = (item.description?.[options.lang] || '').toLowerCase();
      if (!nameText.includes(query) && !descText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}
