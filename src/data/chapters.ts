export interface Topic {
  id: number;
  title: string;
  description: string;
  estimertTid?: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  type: 'quiz' | 'activity';
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
      { id: 1, title: 'Hva er KI?', description: 'Lær hva KI er og hvordan maskinlæring og nevrale nettverk fungerer', estimertTid: 'Ca. 2 min' },
      { id: 2, title: 'KI i hverdagen', description: 'Se hvordan KI allerede er en del av hverdagen din', estimertTid: 'Ca. 1 min' },
      { id: 3, title: 'Myter og misforståelser om KI', description: 'Rydd opp i vanlige misforståelser og overdrevne påstander om KI', estimertTid: 'Ca. 2 min' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Introduksjon til KI', description: 'Test kunnskapen din om det du har lært', type: 'quiz' },
    ],
  },
  {
    id: 2,
    title: 'Bygge selvtillit med KI',
    icon: '💪',
    topics: [
      { id: 1, title: 'Personvern og sikkerhet i KI', description: 'Hva skjer med informasjonen din når du bruker KI-verktøy', estimertTid: 'Ca. 1 min' },
      { id: 2, title: 'Frykt og bekymringer – og hva du kan gjøre', description: 'Svar på de vanligste spørsmålene og bekymringene om KI', estimertTid: 'Ca. 1 min' },
      { id: 3, title: 'Hvordan KI lærer og tar beslutninger', description: 'Forstå skjevheter i KI-systemer og «svart boks»-problemet', estimertTid: 'Ca. 2 min' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Selvtillit med KI', description: 'Test det du har lært i dette kapittelet', type: 'quiz' },
    ],
  },
  {
    id: 3,
    title: 'Generativ KI',
    icon: '✨',
    topics: [
      { id: 1, title: 'Hva er generativ KI?', description: 'Lær om KI-teknologien bak ChatGPT og lignende verktøy', estimertTid: 'Ca. 1 min' },
      { id: 2, title: 'Hva kan du bruke generativ KI til?', description: 'Praktiske eksempler på hva KI kan hjelpe deg med i hverdagen', estimertTid: 'Ca. 4 min' },
      { id: 3, title: 'Hvordan skriver du gode spørsmål til KI?', description: 'Tips og eksempler for å formulere gode spørsmål til KI', estimertTid: 'Ca. 3 min' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Generativ KI', description: 'Test kunnskapen din om generativ KI', type: 'quiz' },
    ],
  },
  {
    id: 4,
    title: 'KI i smarthjem',
    icon: '🏠',
    topics: [
      { id: 1, title: 'Hva er smarthjem-teknologi?', description: 'Lær om smarte enheter koblet til internett og hva som gjør dem smarte', estimertTid: 'Ca. 2 min' },
      { id: 2, title: 'Stemmeassistenter', description: 'Slik bruker smarte enheter KI til å lære av vanene dine', estimertTid: 'Ca. 2 min' },
    ],
    activities: [
      { id: 1, title: 'Quiz: KI i smarthjem', description: 'Test det du har lært om smarthjem', type: 'quiz' },
    ],
  },
  {
    id: 5,
    title: 'Hold deg trygg med KI',
    icon: '🛡️',
    topics: [
      { id: 1, title: 'Kjennetegn på KI-svindel og falsk informasjon', description: 'Lær å gjenkjenne deepfakes, phishing og andre KI-baserte trusler', estimertTid: 'Ca. 3 min' },
      { id: 2, title: 'Hvordan vurdere om en KI-kilde er pålitelig', description: 'Tommelfingerregler for å vurdere om KI-svar er til å stole på', estimertTid: 'Ca. 1 min' },
      { id: 3, title: 'KI-etikk og ansvarlig bruk', description: 'Ditt ansvar som bruker og EUs regler for KI', estimertTid: 'Ca. 1 min' },
    ],
    activities: [
      { id: 1, title: 'Quiz: Trygg med KI', description: 'Test det du har lært om sikkerhet', type: 'quiz' },
    ],
  },
  {
    id: 6,
    title: 'Avslutt kurset',
    icon: '🏁',
    topics: [
      { id: 1, title: 'Takk for at du har fullført kurset!', description: 'Hvis du deltar i masterstudien, er neste steg å fylle ut et kort spørreskjema. Det tar bare noen minutter.', estimertTid: '10-15 min' },
    ],
    activities: [
      
    ],
  },
];

export function getChapterById(id: number): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}
