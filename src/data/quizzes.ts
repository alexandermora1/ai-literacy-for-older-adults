export interface QuizAnswer {
  id: number;
  text: string;
}

export interface QuizAnswerRecord {
  questionId: number;
  selectedAnswerId: number;
  correct: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
  correctAnswerId: number;
}

export interface Quiz {
  id: number;
  chapterId: number;
  title: string;
  questions: QuizQuestion[];
}

const QUIZZES: Quiz[] = [
  {
    id: 1,
    chapterId: 1,
    title: 'Quiz: Introduksjon til KI',
    questions: [
      {
        id: 1,
        question: 'Hva betyr forkortelsen «KI»?',
        answers: [
          { id: 1, text: 'Kunstig Intelligens' },
          { id: 2, text: 'Kjemisk Informasjon' },
          { id: 3, text: 'Kontrollert Innhold' },
          { id: 4, text: 'Kreativ Idé' },
        ],
        correctAnswerId: 1,
      },
      {
        id: 2,
        question: 'Hvilken av disse er et eksempel på KI i hverdagen?',
        answers: [
          { id: 1, text: 'En gammeldags papirbok' },
          { id: 2, text: 'Stemmeassistenten Siri' },
          { id: 3, text: 'Et analogt armbåndsur' },
          { id: 4, text: 'En vanlig lyspære' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 3,
        question: 'Hva trenger KI for å lære og bli bedre?',
        answers: [
          { id: 1, text: 'Et fysisk kontor med ansatte' },
          { id: 2, text: 'En menneskelig hjelper hele tiden' },
          { id: 3, text: 'Store mengder data og treningseksempler' },
          { id: 4, text: 'En god internettforbindelse alene' },
        ],
        correctAnswerId: 3,
      },
    ],
  },
  {
    id: 1,
    chapterId: 2,
    title: 'Quiz: Selvtillit med KI',
    questions: [
      {
        id: 1,
        question: 'Hva er en «forespørsel» (prompt) til KI?',
        answers: [
          { id: 1, text: 'En type datamaskin' },
          { id: 2, text: 'Teksten du skriver for å gi KI en beskjed eller instruksjon' },
          { id: 3, text: 'Et program du laster ned' },
          { id: 4, text: 'En betaling for å bruke KI' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 2,
        question: 'Hva er viktig å gjøre med informasjon du får fra KI?',
        answers: [
          { id: 1, text: 'Dele det umiddelbart med alle venner' },
          { id: 2, text: 'Aldri bruke det til noe som helst' },
          { id: 3, text: 'Dobbeltsjekke om informasjonen er riktig' },
          { id: 4, text: 'Trykke på den grønne knappen' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 3,
        question: 'Hvem kan bruke KI-verktøy på nettet?',
        answers: [
          { id: 1, text: 'Bare dataprogrammerere' },
          { id: 2, text: 'Kun folk under 30 år' },
          { id: 3, text: 'Bare bedrifter og organisasjoner' },
          { id: 4, text: 'Alle med tilgang til internett' },
        ],
        correctAnswerId: 4,
      },
    ],
  },
  {
    id: 1,
    chapterId: 3,
    title: 'Quiz: Generativ KI',
    questions: [
      {
        id: 1,
        question: 'Hva kan generativ KI skape?',
        answers: [
          { id: 1, text: 'Kun tall og statistikk' },
          { id: 2, text: 'Tekst, bilder, musikk og annet innhold' },
          { id: 3, text: 'Bare nettsider' },
          { id: 4, text: 'Ingenting — den analyserer bare' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 2,
        question: 'Hvilket av disse er et eksempel på generativ KI?',
        answers: [
          { id: 1, text: 'Et vanlig søk på Google' },
          { id: 2, text: 'En kalkulator på telefonen' },
          { id: 3, text: 'ChatGPT som skriver tekst for deg' },
          { id: 4, text: 'Et digitalt kart' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 3,
        question: 'Hva er en viktig begrensning ved generativ KI?',
        answers: [
          { id: 1, text: 'Den kan kun brukes på mobiltelefon' },
          { id: 2, text: 'Den kan lage feil eller misvisende informasjon' },
          { id: 3, text: 'Den krever alltid betaling' },
          { id: 4, text: 'Den kan bare skrive på engelsk' },
        ],
        correctAnswerId: 2,
      },
    ],
  },
  {
    id: 1,
    chapterId: 4,
    title: 'Quiz: KI i smarthjem',
    questions: [
      {
        id: 1,
        question: 'Hva er en stemmeassistent?',
        answers: [
          { id: 1, text: 'Et gammeldags radioappartat' },
          { id: 2, text: 'Et KI-program som forstår og svarer på talestyring' },
          { id: 3, text: 'En type høyttaler uten internett' },
          { id: 4, text: 'En app for å ringe venner' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 2,
        question: 'Hvilken av disse er IKKE en stemmeassistent?',
        answers: [
          { id: 1, text: 'Siri' },
          { id: 2, text: 'Google Assistent' },
          { id: 3, text: 'Alexa' },
          { id: 4, text: 'Et gammeldags vekkerur' },
        ],
        correctAnswerId: 4,
      },
      {
        id: 3,
        question: 'Hva er viktig for sikkerheten til smarte hjemenheter?',
        answers: [
          { id: 1, text: 'Dele passordet med naboene' },
          { id: 2, text: 'Aldri oppdatere programvaren' },
          { id: 3, text: 'Sterke passord og oppdatert programvare' },
          { id: 4, text: 'Slå av internettforbindelsen helt' },
        ],
        correctAnswerId: 3,
      },
    ],
  },
  {
    id: 1,
    chapterId: 5,
    title: 'Quiz: Trygg med KI',
    questions: [
      {
        id: 1,
        question: 'Hva er et «deepfake»?',
        answers: [
          { id: 1, text: 'Et program for å lagre passord' },
          { id: 2, text: 'En type antivirusprogramvare' },
          { id: 3, text: 'Et bilde eller en video laget av KI for å se ekte ut' },
          { id: 4, text: 'En sikker nettside' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 2,
        question: 'Hva bør du gjøre hvis du er usikker på noe KI har fortalt deg?',
        answers: [
          { id: 1, text: 'Tro på det og dele det videre' },
          { id: 2, text: 'Sjekke informasjonen fra en pålitelig kilde' },
          { id: 3, text: 'Slette appen med en gang' },
          { id: 4, text: 'Ignorere det og prøve igjen' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 3,
        question: 'Hva betyr personvern i forbindelse med KI?',
        answers: [
          { id: 1, text: 'At KI aldri samler inn noen opplysninger' },
          { id: 2, text: 'Retten til å bestemme over egne personlige opplysninger' },
          { id: 3, text: 'At du ikke trenger passord lenger' },
          { id: 4, text: 'At alle KI-verktøy er gratis' },
        ],
        correctAnswerId: 2,
      },
    ],
  },
];

export function getQuiz(chapterId: number, quizId: number): Quiz | undefined {
  return QUIZZES.find((q) => q.chapterId === chapterId && q.id === quizId);
}
