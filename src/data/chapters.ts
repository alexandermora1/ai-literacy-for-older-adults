export interface Topic {
  id: number;
  title: string;
  description: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
}

export interface Chapter {
  id: number;
  title: string;
  icon: string;
  topics: Topic[];
  activities: Activity[];
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Introduksjon til KI',
    icon: '🤖',
    topics: [
      { id: 1, title: 'Hva er kunstig intelligens?', description: 'Lær hva KI er og hvordan det fungerer' },
      { id: 2, title: 'KI i hverdagen', description: 'Se hvordan KI allerede er en del av livet ditt' },
      { id: 3, title: 'Fordeler med KI', description: 'Oppdag hva KI kan hjelpe deg med' },
      { id: 4, title: 'KI og mennesker', description: 'Forstå samspillet mellom KI og mennesker' },
      { id: 5, title: 'Oppsummering', description: 'Gjennomgang av det du har lært om KI' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Introduksjon til KI', description: 'Test kunnskapen din om det du har lært' },
    ],
  },
  {
    id: 2,
    title: 'Bygge selvtillit med KI',
    icon: '💪',
    topics: [
      { id: 1, title: 'Kom i gang med KI', description: 'Dine første steg med KI-verktøy' },
      { id: 2, title: 'Still spørsmål til KI', description: 'Lær å formulere gode spørsmål' },
      { id: 3, title: 'Forstå svarene', description: 'Slik tolker du det KI forteller deg' },
      { id: 4, title: 'Prøv det selv', description: 'Øv deg på å bruke KI i praksis' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Selvtillit med KI', description: 'Test det du har lært i dette kapittelet' },
    ],
  },
  {
    id: 3,
    title: 'Generativ KI',
    icon: '✨',
    topics: [
      { id: 1, title: 'Hva er generativ KI?', description: 'Lær om KI som lager nytt innhold' },
      { id: 2, title: 'Lag tekst med KI', description: 'Bruk KI til å skrive brev og meldinger' },
      { id: 3, title: 'Lag bilder med KI', description: 'Utforsk KI-verktøy for bilder' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Generativ KI', description: 'Test kunnskapen din om generativ KI' },
      { id: 2, title: 'Utfordring: Lag noe nytt', description: 'Bruk KI til å lage noe kreativt selv' },
    ],
  },
  {
    id: 4,
    title: 'KI i smarthjem',
    icon: '🏠',
    topics: [
      { id: 1, title: 'Smarte hjem og KI', description: 'Introduksjon til KI i hjemmet' },
      { id: 2, title: 'Stemmeassistenter', description: 'Lær å bruke Siri, Alexa og Google' },
      { id: 3, title: 'KI i hvitevarer', description: 'Smarte apparater i hverdagen' },
      { id: 4, title: 'Sikkerhet i smarthjem', description: 'Hold hjemmet ditt trygt' },
    ],
    activities: [
      { id: 1, title: 'Quiz: KI i smarthjem', description: 'Test det du har lært om smarthjem' },
    ],
  },
  {
    id: 5,
    title: 'Hold deg trygg med KI',
    icon: '🛡️',
    topics: [
      { id: 1, title: 'KI og personvern', description: 'Forstå hva KI vet om deg' },
      { id: 2, title: 'Falsk informasjon', description: 'Gjenkjenn innhold laget av KI' },
      { id: 3, title: 'Trygg bruk av KI', description: 'Gode vaner når du bruker KI' },
      { id: 4, title: 'Dine rettigheter', description: 'Lær om dine digitale rettigheter' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Trygg med KI', description: 'Test det du har lært om sikkerhet' },
    ],
  },
  {
    id: 6,
    title: 'Avslutt kurset',
    icon: '🏁',
    topics: [],
    activities: [
      { id: 1, title: 'Avsluttende spørreskjema', description: 'Ta det avsluttende spørreskjemaet og fullfør kurset' },
    ],
  },
];

export function getChapterById(id: number): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}
