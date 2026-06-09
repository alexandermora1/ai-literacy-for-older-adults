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
        question: 'Hva kjennetegner maskinlæring?',
        answers: [
          { id: 1, text: 'Det følger regler programmert av mennesker på forhånd' },
          { id: 2, text: 'Det lærer av eksempler og forbedrer seg over tid' },
          { id: 3, text: 'Det krever at mennesker gir instruksjoner for hvert enkelt svar' },
          { id: 4, text: 'Det gjør at en maskin får kunstig bevissthet' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 2,
        question: 'Hva er nevrale nettverk?',
        answers: [
          { id: 1, text: 'Et nettverk av datamaskiner som er koblet sammen' },
          { id: 2, text: 'Programvare som simulerer de elektriske signalene i hjernen nøyaktig' },
          { id: 3, text: 'Et system som bruker faste regler for å ta beslutninger' },
          { id: 4, text: 'En avansert form for maskinlæring, løst inspirert av nervecellene i hjernen' },
        ],
        correctAnswerId: 4,
      },
      {
        id: 3,
        question: 'Hva menes med at et KI-verktøy som ChatGPT «hallusinerer»?',
        answers: [
          { id: 1, text: 'At KI-verktøyet tror det er bevisst og har egne meninger' },
          { id: 2, text: 'At KI-verktøyet nekter å svare på vanskelige spørsmål' },
          { id: 3, text: 'At KI-verktøyet produserer svar som høres troverdige ut, men inneholder feil' },
          { id: 4, text: 'At KI-verktøyet svarer raskt uten å tenke seg om' },
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
        question: 'Hvilken informasjon bør du ikke dele med KI-verktøy?',
        answers: [
          { id: 1, text: 'Fornavn og hvilken by du bor i' },
          { id: 2, text: 'Hobbyer og hva du er interessert i' },
          { id: 3, text: 'Helseproblemer og personnummer' },
          { id: 4, text: 'Hvilken telefon eller nettbrett du bruker' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 2,
        question: 'Hva viste Amazon-eksemplet om KI og treningsinformasjon?',
        answers: [
          { id: 1, text: 'At KI alltid diskriminerer kvinner i ansettelsesprosesser' },
          { id: 2, text: 'At KI kan arve skjevheter fra de menneskelige dataene den er trent på' },
          { id: 3, text: 'At KI er upålitelig og ikke bør brukes i rekruttering under noen omstendigheter' },
          { id: 4, text: 'At historiske data alltid er mer pålitelige enn KI-baserte vurderinger' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 3,
        question: 'Hva innebærer «svart boks»-problemet i KI?',
        answers: [
          { id: 1, text: 'At KI-systemer ikke kan kobles til internett av sikkerhetsgrunner' },
          { id: 2, text: 'At KI skjuler personopplysninger fra brukeren' },
          { id: 3, text: 'At det ofte er umulig å forklare nøyaktig hvorfor KI kom frem til et bestemt svar' },
          { id: 4, text: 'At KI-modeller er proprietære og ikke kan deles mellom selskaper' },
        ],
        correctAnswerId: 3,
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
        question: 'Hva skiller generativ KI fra annen KI?',
        answers: [
          { id: 1, text: 'Generativ KI kan bare analysere tekst, ikke bilder' },
          { id: 2, text: 'Generativ KI er raskere enn andre KI-systemer' },
          { id: 3, text: 'Generativ KI produserer nytt innhold som tekst, bilder eller lyd' },
          { id: 4, text: 'Generativ KI bruker regelbaserte systemer i stedet for maskinlæring' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 2,
        question: 'Hvilket av disse er et eksempel på et godt spørsmål til et KI-verktøy?',
        answers: [
          { id: 1, text: '«Kan du hjelpe meg med telefonen min?»' },
          { id: 2, text: '«Telefonen min er treg. Hva gjør jeg?»' },
          { id: 3, text: '«Jeg har en Samsung Galaxy S26. Den siste uken har den blitt veldig varm og batteriet tømmes på et par timer, selv når jeg ikke bruker den aktivt. Hva kan være årsaken?»' },
          { id: 4, text: '«Gi meg en fullstendig liste over alle ting som kan gjøre en telefon treg.»' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 3,
        question: 'Hva er det viktigste rådet hvis svaret du får fra et KI-verktøy ikke er godt nok?',
        answers: [
          { id: 1, text: 'Bytt til et annet KI-verktøy og start samtalen på nytt' },
          { id: 2, text: 'Gi flere detaljer eller be om en spesifikk endring i samme samtale' },
          { id: 3, text: 'Vent noen minutter og send samme spørsmål igjen' },
          { id: 4, text: 'Forenkle spørsmålet ditt slik at KI-verktøyet forstår det bedre' },
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
        question: 'Hva gjør en enhet «smart» sammenlignet med en vanlig enhet?',
        answers: [
          { id: 1, text: 'At den er produsert av et kjent teknologiselskap' },
          { id: 2, text: 'At den kan koble til andre enheter via Bluetooth' },
          { id: 3, text: 'At den er utstyrt med sensorer og koblet til internett' },
          { id: 4, text: 'At den kan oppdateres automatisk over internett' },
        ],
        correctAnswerId: 3,
      },
      {
        id: 2,
        question: 'Hva er et typisk kjennetegn på stemmeassistenter som Siri og Google Assistant?',
        answers: [
          { id: 1, text: 'De lytter kontinuerlig og lagrer alt du sier på produsentens servere' },
          { id: 2, text: 'De aktiveres av ett eller flere bestemte ord' },
          { id: 3, text: 'De klarer alltid å forstå dialekter ordentlig' },
          { id: 4, text: 'De fungerer bare på engelsk og ikke på norsk' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 3,
        question: 'Hva er det viktigste sikkerhetsrådet når du skaffer deg en ny smartenhet?',
        answers: [
          { id: 1, text: 'Koble enheten fra internett når du ikke bruker den' },
          { id: 2, text: 'Oppdatere enhetens programvare manuelt hver uke' },
          { id: 3, text: 'Lage eget brukernavn og passord til enheten' },
          { id: 4, text: 'Registrere enheten hos Datatilsynet' },
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
        question: 'Hva er phishing?',
        answers: [
          { id: 1, text: 'En teknikk der KI analyserer bilder for å finne personlig informasjon' },
          { id: 2, text: 'Svindel der kriminelle utgir seg for å være en legitim avsender for å lure deg til å gi fra deg sensitiv informasjon' },
          { id: 3, text: 'En metode der svindlere bruker falske nettbutikker til å stjele betalingsinformasjon' },
          { id: 4, text: 'Automatiserte telefonsamtaler der en robot selger ulovlige produkter' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 2,
        question: 'Hva bør du gjøre hvis et KI-verktøy oppgir en kilde for informasjonen det gir deg?',
        answers: [
          { id: 1, text: 'Stole på informasjonen siden den er basert på en faktisk kilde' },
          { id: 2, text: 'Søke opp kilden selv og sjekke at den faktisk finnes og sier det KI hevder' },
          { id: 3, text: 'Be KI-verktøyet om å oppgi flere kilder slik at du kan sammenligne' },
          { id: 4, text: 'Ignorere kilden, siden KI ofte oppdikter referanser som ikke er relevante' },
        ],
        correctAnswerId: 2,
      },
      {
        id: 3,
        question: 'Hvem er ansvarlig når et KI-verktøy gir feil informasjon som skader noen?',
        answers: [
          { id: 1, text: 'Alltid selskapet som lager verktøyet, siden de har ansvaret for produktet' },
          { id: 2, text: 'Alltid personen som brukte verktøyet, siden de valgte å stole på det' },
          { id: 3, text: 'KI-verktøyet selv, siden det tok beslutningen' },
          { id: 4, text: 'Dette er uavklart og er noe samfunnet og lovgivere fortsatt arbeider med å besvare' },
        ],
        correctAnswerId: 4,
      },
    ],
  },
];

export function getQuiz(chapterId: number, quizId: number): Quiz | undefined {
  return QUIZZES.find((q) => q.chapterId === chapterId && q.id === quizId);
}
