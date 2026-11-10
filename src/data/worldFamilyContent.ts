export type Locale = 'de' | 'es' | 'gl' | 'en';

export type SectionId = 'world-family' | 'bar' | 'street-food' | 'garden' | 'applications';

export interface CardItem {
  id: SectionId;
  title: string;
  description: string;
  image: string;
  badgeText: string;
}

export interface SubpageSectionContent {
  id: SectionId;
  bannerTitle: string;
  bannerImage: string;
  heading: string;
  body: string;
  extraParagraph?: string;
  features?: {
    icon: 'music' | 'art' | 'people' | 'heart';
    label: string;
  }[];
  ctaLabel?: string;
}

export interface TranslationContent {
  locale: Locale;
  languageLabel: string;
  nav: {
    worldFamily: string;
    bar: string;
    streetFood: string;
    garden: string;
    applications: string;
  };
  hero: {
    title: string;
    subtitleLine1: string;
    subtitleLine2: string;
    primaryCta: string;
    secondaryCta: string;
    slides: {
      id: string;
      caption: string;
      image: string;
    }[];
  };
  intro: {
    heading: string;
    body: string;
  };
  cards: CardItem[];
  sections: Record<SectionId, SubpageSectionContent>;
  modal: {
    videoTitle: string;
    videoSubtitle: string;
    closeLabel: string;
    inquiryTitle: string;
    inquirySubtitle: string;
    nameLabel: string;
    emailLabel: string;
    topicLabel: string;
    topics: string[];
    messageLabel: string;
    submitLabel: string;
    successTitle: string;
    successMessage: string;
    errorRequired: string;
    errorEmail: string;
  };
  footer: {
    addressTitle: string;
    addressLine: string;
    coordinates: string;
    copyright: string;
    pressLinkLabel: string;
  };
}

export const IMAGES = {
  heroLighthouse: '/src/assets/images/fisterra_lighthouse_sunset_hero_1793857426303.jpg',
  barTerraceMural: '/src/assets/images/world_family_bar_terrace_mural_1793857428400.jpg',
  streetFoodBowl: '/src/assets/images/street_food_chickpea_bowl_1793857429471.jpg',
  gardenHammock: '/src/assets/images/world_family_garden_hammock_1793857432708.jpg',
  zenCairnSunset: '/src/assets/images/fisterra_zen_cairn_sunset_1793857431784.jpg',
  barInteriorCommunal: '/src/assets/images/finisterre_bar_mural_interior_1793857368048.jpg',
  marDeForaCoast: '/assets/aistudio/familysolysombra_305f73fa.jpg',
  discoLogoStage: '/assets/aistudio/LOGO_WFB_DISCOSTYLE_no_background_b5600ece.png',
};

export const CONTENT: Record<Locale, TranslationContent> = {
  de: {
    locale: 'de',
    languageLabel: 'DE',
    nav: {
      worldFamily: 'World Family',
      bar: 'Bar',
      streetFood: 'Street Food',
      garden: 'Garden',
      applications: 'Applications',
    },
    hero: {
      title: 'WorldFamily.art',
      subtitleLine1: 'Kunst · Musik · Begegnung · Pilgerkultur',
      subtitleLine2: 'in Fisterra – am Ende des Camino',
      primaryCta: 'Unsere Welt entdecken',
      secondaryCta: 'Video / Impressionen',
      slides: [
        {
          id: 'cabo-fisterra',
          caption: 'Faro de Fisterra · Kilometer 0.0 am Ende des Jakobswegs',
          image: IMAGES.heroLighthouse,
        },
        {
          id: 'mar-de-fora',
          caption: 'Mar de Fóra · Sonnenuntergang über dem Atlantik in Galicien',
          image: IMAGES.marDeForaCoast,
        },
        {
          id: 'communal-table',
          caption: 'World Family Bar · Musik, Wandkunst & gemeinsamer Tisch seit 2015',
          image: IMAGES.barInteriorCommunal,
        },
      ],
    },
    intro: {
      heading: 'Ein Ort für die World Family',
      body: 'WorldFamily.art verbindet Kunst, Kultur, Gastfreundschaft und die besondere Energie des Camino de Santiago – in unserer Bar in Fisterra, auf der Straße, im Garten und in vielen kreativen Projekten.',
    },
    cards: [
      {
        id: 'world-family',
        title: 'World Family',
        description: 'Idee, Menschen und Kultur der World Family.',
        image: IMAGES.marDeForaCoast,
        badgeText: 'Seit 2014 · Mar de Fóra',
      },
      {
        id: 'bar',
        title: 'World Family Bar',
        description: 'Unsere legendäre Bar in Fisterra – mit Kunst, Musik und offenen Türen.',
        image: IMAGES.barTerraceMural,
        badgeText: 'Realer Ort · Seit 2015',
      },
      {
        id: 'street-food',
        title: 'Street Food',
        description: 'Ehrliches, kreatives Essen – auf der Straße, bei Events und in Fisterra.',
        image: IMAGES.streetFoodBowl,
        badgeText: 'Küche in Bewegung',
      },
      {
        id: 'garden',
        title: 'Garden',
        description: 'Unser Garten – zum Entspannen, Begegnen und Gestalten.',
        image: IMAGES.gardenHammock,
        badgeText: 'Natur & Ruhe',
      },
      {
        id: 'applications',
        title: 'Applications',
        description: 'Mitmachen, unterstützen oder selbst ein Projekt einbringen.',
        image: IMAGES.zenCairnSunset,
        badgeText: 'Mitmachen & Gestalten',
      },
    ],
    sections: {
      'world-family': {
        id: 'world-family',
        bannerTitle: 'World Family',
        bannerImage: IMAGES.marDeForaCoast,
        heading: 'Die Idee der World Family',
        body: 'Die World Family ist eine offene, internationale Gemeinschaft von Reisenden, Künstler*innen, Pilger*innen und Freund*innen – verbunden durch Respekt, Kreativität und die Freude am Leben.',
        extraParagraph: 'Was 2014 am Strand von Mar de Fóra als spontane Begegnung von Menschen aus aller Welt begann, wurde 2015 mit David López und Freund*innen zu einem festen Zuhause in Fisterra.',
      },
      bar: {
        id: 'bar',
        bannerTitle: 'World Family Bar',
        bannerImage: IMAGES.barTerraceMural,
        heading: 'Mehr als eine Bar',
        body: 'Die World Family Bar in Fisterra ist ein Treffpunkt für Pilger*innen, Reisende, Künstler*innen und alle, die das besondere Ende der Welt miteinander teilen möchten.',
        extraParagraph: 'Avenida da Coruña 63, 15155 Fisterra · Hausgemachte Küche, vegetarische & vegane Gerichte, lokaler Fisch, Wandmalereien und gelebte Gastfreundschaft.',
        features: [
          { icon: 'music', label: 'Live-Musik & Jam' },
          { icon: 'art', label: 'Kunst & Ausstellungen' },
          { icon: 'people', label: 'Begegnung & Austausch' },
          { icon: 'heart', label: 'Offene, familiäre Atmosphäre' },
        ],
      },
      'street-food': {
        id: 'street-food',
        bannerTitle: 'Street Food',
        bannerImage: IMAGES.streetFoodBowl,
        heading: 'Kreatives Essen unterwegs',
        body: 'Mit unserem Street-Food-Projekt bringen wir ehrliches, vegetarisches und internationales Essen zu Menschen, Festen und besonderen Orten – verwurzelt in der World-Family-Kultur.',
        extraParagraph: 'Frische Zutaten, warme Gewürze und Rezepte, die Reisende aus aller Welt mit nach Fisterra gebracht haben.',
      },
      garden: {
        id: 'garden',
        bannerTitle: 'Garden',
        bannerImage: IMAGES.gardenHammock,
        heading: 'Ein lebendiger Garten',
        body: 'Unser Garten ist ein Ort der Ruhe, Kreativität und Begegnung – zum Entspannen, Gärtnern, Gestalten und gemeinsamen Feiern.',
        extraParagraph: 'Zwischen Obstbäumen, Hängematten und gemeinschaftlichem Anbau wächst hier eine grüne Oase am Atlantik.',
      },
      applications: {
        id: 'applications',
        bannerTitle: 'Applications',
        bannerImage: IMAGES.zenCairnSunset,
        heading: 'Mitmachen & Gestalten',
        body: 'Du möchtest ein Projekt einbringen, bei uns ausstellen, mitarbeiten, kreativ werden oder die Family unterstützen? Hier findest du alle Möglichkeiten.',
        extraParagraph: 'Darüber hinaus entwickeln wir digitale Werkzeuge für mehrsprachige Menüs, vernetzte Küche und unser lebendiges Kulturarchiv.',
        ctaLabel: 'Jetzt anfragen',
      },
    },
    modal: {
      videoTitle: 'Impressionen aus Fisterra & der World Family Bar',
      videoSubtitle: 'Ein Einblick in unsere Abende voller Musik, Wandkunst, gemeinsamer Mahlzeiten und Sonnenuntergänge am Kap Finisterre.',
      closeLabel: 'Schließen',
      inquiryTitle: 'Mitmachen & Projekt anfragen',
      inquirySubtitle: 'Schreib uns, wenn du Musik machen, Kunst ausstellen, im Garten oder in der Bar mithelfen oder ein eigenes Projekt einbringen möchtest.',
      nameLabel: 'Dein Name',
      emailLabel: 'E-Mail-Adresse',
      topicLabel: 'Bereich / Thema',
      topics: [
        'Kunst & Ausstellung in der Bar',
        'Live-Musik & Jam-Session',
        'Mitarbeit / Volunteering (Bar & Garden)',
        'Street Food & Events',
        'Digitales Projekt / Kulturarchiv',
      ],
      messageLabel: 'Deine Nachricht oder Projektidee',
      submitLabel: 'Anfrage absenden',
      successTitle: 'Danke für deine Nachricht an die World Family!',
      successMessage: 'Wir haben deine Anfrage erhalten und melden uns direkt aus Fisterra bei dir.',
      errorRequired: 'Bitte fülle deinen Namen und deine Nachricht aus.',
      errorEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    },
    footer: {
      addressTitle: 'The World Family Bar · Fisterra',
      addressLine: 'Avenida da Coruña 63 · 15155 Finisterre (A Coruña), Galicien · Tel: +34 981 740 722',
      coordinates: '42°54′ N / 9°15′ W · Am Ende des Camino de Santiago',
      copyright: '© 2026 WorldFamily.art · The World Family Bar Finisterre',
      pressLinkLabel: 'Reportage in der Los Angeles Times (2020)',
    },
  },
  es: {
    locale: 'es',
    languageLabel: 'ES',
    nav: {
      worldFamily: 'World Family',
      bar: 'Bar',
      streetFood: 'Street Food',
      garden: 'Garden',
      applications: 'Applications',
    },
    hero: {
      title: 'WorldFamily.art',
      subtitleLine1: 'Arte · Música · Encuentro · Cultura Peregrina',
      subtitleLine2: 'en Fisterra – al final del Camino',
      primaryCta: 'Descubre nuestro mundo',
      secondaryCta: 'Vídeo / Impresiones',
      slides: [
        {
          id: 'cabo-fisterra',
          caption: 'Faro de Fisterra · Kilómetro 0.0 al final del Camino de Santiago',
          image: IMAGES.heroLighthouse,
        },
        {
          id: 'mar-de-fora',
          caption: 'Mar de Fóra · Puesta de sol sobre el Atlántico en Galicia',
          image: IMAGES.marDeForaCoast,
        },
        {
          id: 'communal-table',
          caption: 'World Family Bar · Música, murales y mesa compartida desde 2015',
          image: IMAGES.barInteriorCommunal,
        },
      ],
    },
    intro: {
      heading: 'Un lugar para la World Family',
      body: 'WorldFamily.art une arte, cultura, hospitalidad y la energía única del Camino de Santiago – en nuestro bar en Fisterra, en la calle, en el jardín y en múltiples proyectos creativos.',
    },
    cards: [
      {
        id: 'world-family',
        title: 'World Family',
        description: 'Idea, personas y cultura de la World Family.',
        image: IMAGES.marDeForaCoast,
        badgeText: 'Desde 2014 · Mar de Fóra',
      },
      {
        id: 'bar',
        title: 'World Family Bar',
        description: 'Nuestro legendario bar en Fisterra – con arte, música y puertas abiertas.',
        image: IMAGES.barTerraceMural,
        badgeText: 'Lugar real · Desde 2015',
      },
      {
        id: 'street-food',
        title: 'Street Food',
        description: 'Comida honesta y creativa – en la calle, en eventos y en Fisterra.',
        image: IMAGES.streetFoodBowl,
        badgeText: 'Cocina en movimiento',
      },
      {
        id: 'garden',
        title: 'Garden',
        description: 'Nuestro jardín – para descansar, encontrarse y crear.',
        image: IMAGES.gardenHammock,
        badgeText: 'Naturaleza y calma',
      },
      {
        id: 'applications',
        title: 'Applications',
        description: 'Participar, apoyar o proponer tu propio proyecto.',
        image: IMAGES.zenCairnSunset,
        badgeText: 'Participar y crear',
      },
    ],
    sections: {
      'world-family': {
        id: 'world-family',
        bannerTitle: 'World Family',
        bannerImage: IMAGES.marDeForaCoast,
        heading: 'La idea de la World Family',
        body: 'World Family es una comunidad internacional abierta de viajeros, artistas, peregrinos y amistades – unidos por el respeto, la creatividad y la alegría de vivir.',
        extraParagraph: 'Lo que comenzó en 2014 cerca de la playa de Mar de Fóra como un encuentro espontáneo se transformó en 2015, junto a David López y amigos, en una casa permanente en Fisterra.',
      },
      bar: {
        id: 'bar',
        bannerTitle: 'World Family Bar',
        bannerImage: IMAGES.barTerraceMural,
        heading: 'Más que un bar',
        body: 'World Family Bar en Fisterra es un punto de encuentro para peregrinos, viajeros, artistas y todas las personas que desean compartir el fin del mundo.',
        extraParagraph: 'Avenida da Coruña 63, 15155 Fisterra · Cocina casera, opciones vegetarianas y veganas, pescado local, murales y hospitalidad auténtica.',
        features: [
          { icon: 'music', label: 'Música en vivo y Jam' },
          { icon: 'art', label: 'Arte y exposiciones' },
          { icon: 'people', label: 'Encuentro e intercambio' },
          { icon: 'heart', label: 'Ambiente abierto y familiar' },
        ],
      },
      'street-food': {
        id: 'street-food',
        bannerTitle: 'Street Food',
        bannerImage: IMAGES.streetFoodBowl,
        heading: 'Comida creativa en movimiento',
        body: 'Con nuestro proyecto de Street Food llevamos cocina honesta, vegetariana e internacional a personas, festivales y lugares especiales – con raíces en la cultura World Family.',
        extraParagraph: 'Ingredientes frescos, especias cálidas y recetas compartidas por viajeros de todo el mundo.',
      },
      garden: {
        id: 'garden',
        bannerTitle: 'Garden',
        bannerImage: IMAGES.gardenHammock,
        heading: 'Un jardín vivo',
        body: 'Nuestro jardín es un espacio de calma, creatividad y encuentro – para relajarse, cultivar la tierra, crear y celebrar en comunidad.',
        extraParagraph: 'Entre árboles, hamacas y cultivo compartido crece un refugio verde junto al Atlántico.',
      },
      applications: {
        id: 'applications',
        bannerTitle: 'Applications',
        bannerImage: IMAGES.zenCairnSunset,
        heading: 'Participar y crear',
        body: '¿Quieres proponer un proyecto, exponer tu arte, colaborar, crear o apoyar a la Family? Aquí encontrarás todas las formas de hacerlo.',
        extraParagraph: 'Además, desarrollamos herramientas digitales para cartas multilingües, cocina conectada y nuestro archivo cultural vivo.',
        ctaLabel: 'Consultar ahora',
      },
    },
    modal: {
      videoTitle: 'Impresiones de Fisterra y World Family Bar',
      videoSubtitle: 'Un recorrido visual por nuestras noches de música, murales, mesa compartida y atardeceres en el cabo Finisterre.',
      closeLabel: 'Cerrar',
      inquiryTitle: 'Participar y proponer un proyecto',
      inquirySubtitle: 'Escríbenos si quieres tocar música, exponer arte, colaborar en el jardín o en el bar, o presentar una idea.',
      nameLabel: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      topicLabel: 'Área / Tema',
      topics: [
        'Arte y exposición en el Bar',
        'Música en vivo y Jam Session',
        'Colaboración / Voluntariado (Bar y Garden)',
        'Street Food y Eventos',
        'Proyecto digital / Archivo cultural',
      ],
      messageLabel: 'Tu mensaje o idea de proyecto',
      submitLabel: 'Enviar solicitud',
      successTitle: '¡Gracias por escribir a la World Family!',
      successMessage: 'Hemos recibido tu propuesta y te responderemos muy pronto desde Fisterra.',
      errorRequired: 'Por favor, completa tu nombre y tu mensaje.',
      errorEmail: 'Por favor, introduce un correo electrónico válido.',
    },
    footer: {
      addressTitle: 'The World Family Bar · Fisterra',
      addressLine: 'Avenida da Coruña 63 · 15155 Finisterre (A Coruña), Galicia · Tel: +34 981 740 722',
      coordinates: '42°54′ N / 9°15′ W · Al final del Camino de Santiago',
      copyright: '© 2026 WorldFamily.art · The World Family Bar Finisterre',
      pressLinkLabel: 'Reportaje en Los Angeles Times (2020)',
    },
  },
  gl: {
    locale: 'gl',
    languageLabel: 'GL',
    nav: {
      worldFamily: 'World Family',
      bar: 'Bar',
      streetFood: 'Street Food',
      garden: 'Garden',
      applications: 'Applications',
    },
    hero: {
      title: 'WorldFamily.art',
      subtitleLine1: 'Arte · Música · Encontro · Cultura Peregrina',
      subtitleLine2: 'en Fisterra – á fin do Camiño',
      primaryCta: 'Descobre o noso mundo',
      secondaryCta: 'Vídeo / Impresións',
      slides: [
        {
          id: 'cabo-fisterra',
          caption: 'Faro de Fisterra · Quilómetro 0.0 á fin do Camiño de Santiago',
          image: IMAGES.heroLighthouse,
        },
        {
          id: 'mar-de-fora',
          caption: 'Mar de Fóra · Solpor sobre o Atlántico en Galicia',
          image: IMAGES.marDeForaCoast,
        },
        {
          id: 'communal-table',
          caption: 'World Family Bar · Música, murais e mesa compartida dende 2015',
          image: IMAGES.barInteriorCommunal,
        },
      ],
    },
    intro: {
      heading: 'Un lugar para a World Family',
      body: 'WorldFamily.art xungue arte, cultura, hospitalidade e a enerxía única do Camiño de Santiago – no noso bar en Fisterra, na rúa, na horta e en moitos proxectos creativos.',
    },
    cards: [
      {
        id: 'world-family',
        title: 'World Family',
        description: 'Idea, persoas e cultura da World Family.',
        image: IMAGES.marDeForaCoast,
        badgeText: 'Dende 2014 · Mar de Fóra',
      },
      {
        id: 'bar',
        title: 'World Family Bar',
        description: 'O noso lendario bar en Fisterra – con arte, música e portas abertas.',
        image: IMAGES.barTerraceMural,
        badgeText: 'Lugar real · Dende 2015',
      },
      {
        id: 'street-food',
        title: 'Street Food',
        description: 'Comida honesta e creativa – na rúa, en eventos e en Fisterra.',
        image: IMAGES.streetFoodBowl,
        badgeText: 'Cociña en movemento',
      },
      {
        id: 'garden',
        title: 'Garden',
        description: 'O noso xardín – para descansar, atoparse e crear.',
        image: IMAGES.gardenHammock,
        badgeText: 'Natureza e acougo',
      },
      {
        id: 'applications',
        title: 'Applications',
        description: 'Participar, apoiar ou achegar o teu propio proxecto.',
        image: IMAGES.zenCairnSunset,
        badgeText: 'Participar e crear',
      },
    ],
    sections: {
      'world-family': {
        id: 'world-family',
        bannerTitle: 'World Family',
        bannerImage: IMAGES.marDeForaCoast,
        heading: 'A idea da World Family',
        body: 'A World Family é unha comunidade internacional aberta de viaxeiros, artistas, peregrinos e amizades – unidos polo respecto, a creatividade e a ledicia de vivir.',
        extraParagraph: 'O que comezou en 2014 preto da praia de Mar de Fóra como un encontro espontáneo converteuse en 2015, con David López e amigos, nun fogar permanente en Fisterra.',
      },
      bar: {
        id: 'bar',
        bannerTitle: 'World Family Bar',
        bannerImage: IMAGES.barTerraceMural,
        heading: 'Máis ca un bar',
        body: 'O World Family Bar en Fisterra é un punto de encontro para peregrinos, viaxeiros, artistas e todas as persoas que queren compartir a fin do mundo.',
        extraParagraph: 'Avenida da Coruña 63, 15155 Fisterra · Cociña caseira, opcións vexetarianas e veganas, peixe da contorna, murais e hospitalidade.',
        features: [
          { icon: 'music', label: 'Música ao vivo e Jam' },
          { icon: 'art', label: 'Arte e exposicións' },
          { icon: 'people', label: 'Encontro e conversa' },
          { icon: 'heart', label: 'Ambiente aberto e familiar' },
        ],
      },
      'street-food': {
        id: 'street-food',
        bannerTitle: 'Street Food',
        bannerImage: IMAGES.streetFoodBowl,
        heading: 'Comida creativa en camiño',
        body: 'Co noso proxecto de Street Food levamos comida honesta, vexetariana e internacional a persoas, festas e lugares especiais – enraizada na cultura World Family.',
        extraParagraph: 'Ingredientes frescos, especias cálidas e receitas achegadas por viaxeiros de todo o mundo.',
      },
      garden: {
        id: 'garden',
        bannerTitle: 'Garden',
        bannerImage: IMAGES.gardenHammock,
        heading: 'Un xardín vivo',
        body: 'O noso xardín é un lugar de acougo, creatividade e encontro – para relaxarse, cultivar a terra, crear e celebrar xuntos.',
        extraParagraph: 'Entre árbores, hamacas e horta comunitaria medra un recuncho verde á beira do Atlántico.',
      },
      applications: {
        id: 'applications',
        bannerTitle: 'Applications',
        bannerImage: IMAGES.zenCairnSunset,
        heading: 'Participar e crear',
        body: 'Queres achegar un proxecto, expoñer canda nós, colaborar, crear ou apoiar á Family? Aquí atoparás todas as posibilidades.',
        extraParagraph: 'Tamén desenvolvemos ferramentas dixitais para cartas multilingües, cociña conectada e o arquivo cultural da comunidade.',
        ctaLabel: 'Consultar agora',
      },
    },
    modal: {
      videoTitle: 'Impresións de Fisterra e World Family Bar',
      videoSubtitle: 'Unha ollada ás nosas noites de música, murais, mesa compartida e solpores no cabo Fisterra.',
      closeLabel: 'Pechar',
      inquiryTitle: 'Participar e propor un proxecto',
      inquirySubtitle: 'Escríbenos se queres tocar música, expoñer arte, colaborar na horta ou no bar, ou achegar unha idea.',
      nameLabel: 'O teu nome',
      emailLabel: 'Enderezo electrónico',
      topicLabel: 'Área / Tema',
      topics: [
        'Arte e exposición no Bar',
        'Música ao vivo e Jam Session',
        'Colaboración / Voluntariado (Bar e Garden)',
        'Street Food e Eventos',
        'Proxecto dixital / Arquivo cultural',
      ],
      messageLabel: 'A túa mensaxe ou idea de proxecto',
      submitLabel: 'Enviar solicitude',
      successTitle: 'Grazas por escribir á World Family!',
      successMessage: 'Recibimos a túa mensaxe e responderémosche moi axiña dende Fisterra.',
      errorRequired: 'Por favor, indica o teu nome e a túa mensaxe.',
      errorEmail: 'Por favor, introduce un correo electrónico válido.',
    },
    footer: {
      addressTitle: 'The World Family Bar · Fisterra',
      addressLine: 'Avenida da Coruña 63 · 15155 Finisterre (A Coruña), Galicia · Tel: +34 981 740 722',
      coordinates: '42°54′ N / 9°15′ W · Á fin do Camiño de Santiago',
      copyright: '© 2026 WorldFamily.art · The World Family Bar Finisterre',
      pressLinkLabel: 'Reportaxe en Los Angeles Times (2020)',
    },
  },
  en: {
    locale: 'en',
    languageLabel: 'EN',
    nav: {
      worldFamily: 'World Family',
      bar: 'Bar',
      streetFood: 'Street Food',
      garden: 'Garden',
      applications: 'Applications',
    },
    hero: {
      title: 'WorldFamily.art',
      subtitleLine1: 'Art · Music · Connection · Pilgrim Culture',
      subtitleLine2: 'in Fisterra – at the end of the Camino',
      primaryCta: 'Discover Our World',
      secondaryCta: 'Video / Impressions',
      slides: [
        {
          id: 'cabo-fisterra',
          caption: 'Faro de Fisterra · Kilometer 0.0 at the end of the Camino de Santiago',
          image: IMAGES.heroLighthouse,
        },
        {
          id: 'mar-de-fora',
          caption: 'Mar de Fóra · Atlantic sunset on the Costa da Morte, Galicia',
          image: IMAGES.marDeForaCoast,
        },
        {
          id: 'communal-table',
          caption: 'World Family Bar · Live music, murals & shared table since 2015',
          image: IMAGES.barInteriorCommunal,
        },
      ],
    },
    intro: {
      heading: 'A Place for the World Family',
      body: 'WorldFamily.art connects art, culture, hospitality and the unmistakable spirit of the Camino de Santiago – in our bar in Fisterra, on the street, in the garden and across creative projects.',
    },
    cards: [
      {
        id: 'world-family',
        title: 'World Family',
        description: 'The spirit, people and culture of the World Family.',
        image: IMAGES.marDeForaCoast,
        badgeText: 'Since 2014 · Mar de Fóra',
      },
      {
        id: 'bar',
        title: 'World Family Bar',
        description: 'Our legendary bar in Fisterra – with art, live music and open doors.',
        image: IMAGES.barTerraceMural,
        badgeText: 'Real Place · Since 2015',
      },
      {
        id: 'street-food',
        title: 'Street Food',
        description: 'Honest, creative food – on the road, at gatherings and in Fisterra.',
        image: IMAGES.streetFoodBowl,
        badgeText: 'Kitchen in Motion',
      },
      {
        id: 'garden',
        title: 'Garden',
        description: 'Our garden – to unwind, connect and cultivate together.',
        image: IMAGES.gardenHammock,
        badgeText: 'Nature & Calm',
      },
      {
        id: 'applications',
        title: 'Applications',
        description: 'Get involved, support us or bring your own creative project.',
        image: IMAGES.zenCairnSunset,
        badgeText: 'Join & Co-Create',
      },
    ],
    sections: {
      'world-family': {
        id: 'world-family',
        bannerTitle: 'World Family',
        bannerImage: IMAGES.marDeForaCoast,
        heading: 'The Idea of the World Family',
        body: 'The World Family is an open, international community of travellers, artists, pilgrims and friends – united by respect, creativity and the joy of living.',
        extraParagraph: 'What began in 2014 near Mar de Fóra beach as a spontaneous gathering of kindred spirits became a permanent home in Fisterra in 2015 with David López and friends.',
      },
      bar: {
        id: 'bar',
        bannerTitle: 'World Family Bar',
        bannerImage: IMAGES.barTerraceMural,
        heading: 'More Than a Bar',
        body: 'The World Family Bar in Fisterra is a gathering place for pilgrims, travellers, artists and everyone who wants to share the special end of the world together.',
        extraParagraph: 'Avenida da Coruña 63, 15155 Fisterra · Home-cooked meals, vegetarian & vegan dishes, local coastal fish, wall murals and warm hospitality.',
        features: [
          { icon: 'music', label: 'Live Music & Jam Sessions' },
          { icon: 'art', label: 'Art & Exhibitions' },
          { icon: 'people', label: 'Connection & Exchange' },
          { icon: 'heart', label: 'Open, Welcoming Atmosphere' },
        ],
      },
      'street-food': {
        id: 'street-food',
        bannerTitle: 'Street Food',
        bannerImage: IMAGES.streetFoodBowl,
        heading: 'Creative Food on the Move',
        body: 'With our Street Food project we bring honest, vegetarian and international dishes to people, festivals and special places – rooted in World Family culture.',
        extraParagraph: 'Fresh coastal ingredients, warm spices and recipes shared by travellers from around the globe.',
      },
      garden: {
        id: 'garden',
        bannerTitle: 'Garden',
        bannerImage: IMAGES.gardenHammock,
        heading: 'A Living Garden',
        body: 'Our garden is a sanctuary of calm, creativity and connection – for relaxing, gardening, creating and celebrating together.',
        extraParagraph: 'Between fruit trees, hammocks and community beds grows a peaceful green haven by the Atlantic.',
      },
      applications: {
        id: 'applications',
        bannerTitle: 'Applications',
        bannerImage: IMAGES.zenCairnSunset,
        heading: 'Get Involved & Co-Create',
        body: 'Want to propose a project, exhibit your art, collaborate, get creative or support the Family? Here you can find every way to join in.',
        extraParagraph: 'We also build digital tools for multilingual menus, connected kitchen workflows and our living cultural archive.',
        ctaLabel: 'Inquire Now',
      },
    },
    modal: {
      videoTitle: 'Impressions from Fisterra & World Family Bar',
      videoSubtitle: 'A glimpse into our evenings of live music, wall murals, shared meals and Atlantic sunsets at Cape Finisterre.',
      closeLabel: 'Close',
      inquiryTitle: 'Get Involved & Propose a Project',
      inquirySubtitle: 'Write to us if you would like to play music, exhibit art, help out in the garden or bar, or bring a creative project.',
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      topicLabel: 'Area / Topic',
      topics: [
        'Art & Exhibition at the Bar',
        'Live Music & Jam Session',
        'Volunteering / Collaboration (Bar & Garden)',
        'Street Food & Events',
        'Digital Project / Cultural Archive',
      ],
      messageLabel: 'Your Message or Project Idea',
      submitLabel: 'Send Inquiry',
      successTitle: 'Thank you for writing to the World Family!',
      successMessage: 'We have received your message and will get back to you from Fisterra.',
      errorRequired: 'Please enter both your name and your message.',
      errorEmail: 'Please enter a valid email address.',
    },
    footer: {
      addressTitle: 'The World Family Bar · Fisterra',
      addressLine: 'Avenida da Coruña 63 · 15155 Finisterre (A Coruña), Galicia · Tel: +34 981 740 722',
      coordinates: '42°54′ N / 9°15′ W · At the Atlantic end of the Camino de Santiago',
      copyright: '© 2026 WorldFamily.art · The World Family Bar Finisterre',
      pressLinkLabel: 'Los Angeles Times Feature (2020)',
    },
  },
};

export interface InquiryFormInput {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: 'required' | 'email';
}

export function validateInquiryForm(input: InquiryFormInput): ValidationResult {
  const trimmedName = input.name.trim();
  const trimmedMessage = input.message.trim();
  const trimmedEmail = input.email.trim();

  if (!trimmedName || !trimmedMessage) {
    return { valid: false, error: 'required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'email' };
  }

  return { valid: true };
}

export function getNextSlideIndex(currentIndex: number, totalSlides: number, direction: 'next' | 'prev'): number {
  if (totalSlides <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % totalSlides;
  }
  return (currentIndex - 1 + totalSlides) % totalSlides;
}
