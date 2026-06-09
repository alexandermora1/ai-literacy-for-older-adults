export type ContentBlock =
  | { type: 'lead'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'bullet-list'; items: string[] }
  | { type: 'italic-paragraph'; text: string }
  | { type: 'rich-paragraph'; segments: Array<{ text: string; href?: string; italic?: boolean }> }
  | { type: 'sources'; title: string; items: Array<Array<{ text: string; href?: string; italic?: boolean }>> };

const CONTENT: Record<string, ContentBlock[]> = {

  // ─── Kapittel 1: Introduksjon til KI ─────────────────────────────────────────

  '1-1': [
    {
      type: 'lead',
      text: 'Kunstig intelligens er dataprogrammer som justerer sin egen aktivitet, og derfor kan virke intelligente. En datamaskin som er i stand til å løse oppgaver uten å få instruksjoner fra et menneske om hvordan det skal gjøres, sier man at har kunstig intelligens.',
    },
    {
      type: 'paragraph',
      text: 'Maskinlæring er en viktig underkategori av KI, og handler om systemer som lærer. Enkelt forklart betyr det at programmet ikke kan noe når det startes, men lærer over tid – på samme måte som et menneske som lærer å spille piano blir bedre ved å øve. Læringen skjer ved prøving og feiling. I starten gjetter maskinen for eksempel helt tilfeldig på hva som er en katt og hva som er en hund, hvis den blir bedt om å skille mellom disse dyrene i en bildeanalyse.',
    },
    {
      type: 'paragraph',
      text: 'En avansert form for maskinlæring er såkalte nevrale nettverk – en grov forenkling av hvordan nervecellene i menneskehjernen fungerer. Nevrale nettverk er bygd opp av «nevroner» (prosesseringsenheter) og koblinger mellom disse. I katt- og hund-eksemplet er det ikke lett å formulere med ord hvordan en katt eller en hund ser ut. Men hvis nettverket får se veldig mange bilder, finner det selv ut av forskjellen og lager sin egen matematiske fremstilling av den.',
    },
    {
      type: 'paragraph',
      text: 'KI-verktøyene du har hørt mest om i det siste – som ChatGPT og Copilot – er basert på avanserte nevrale nettverk som har analysert enorme mengder tekst. De har lært seg mønstrene i hvordan tekst er satt sammen, og kan derfor produsere tekst som ofte kan se ut til å ha blitt skrevet av et menneske.',
    },
  ],

  '1-2': [
    {
      type: 'lead',
      text: 'Du har sannsynligvis møtt på KI mange steder i hverdagen uten å ha lagt merke til det.',
    },
    {
      type: 'paragraph',
      text: 'Et eksempel er når du søker på Google og får forslag til hva du kan søke på allerede før du er ferdig med å skrive. Google bruker maskinlæring til å foreslå relevante søk basert på hva du og andre har søkt etter tidligere. Strømmetjenester som Netflix og YouTube gjør det samme når de viser deg forslag til videoer de tror du vil like.',
    },
    {
      type: 'paragraph',
      text: 'Når du låser opp telefonen med ansiktet ditt i stedet for en kode, er ansiktsgjenkjenningsprogrammet basert på KI – en avansert versjon av katt- og hund-eksemplet du leste om i forrige emne.',
    },
    {
      type: 'paragraph',
      text: 'KI brukes også i tjenester du kanskje ikke tenker over til daglig. Google Maps beregner den raskeste ruten akkurat nå basert på trafikk i sanntid. Banken din overvåker transaksjoner automatisk og kan sperre kortet om et KI-basert system oppdager et uvanlig kjøpemønster.',
    },
  ],

  '1-3': [
    {
      type: 'lead',
      text: 'Det er lett å misforstå hva KI egentlig er. Mediene er fulle av overdrevne fremstillinger – fra science fiction-filmer til nyhetsoverskrifter. Her er noen av de vanligste misforståelsene.',
    },
    {
      type: 'subheading',
      text: '«Datamaskiner med bevissthet»',
    },
    {
      type: 'paragraph',
      text: 'En vanlig misforståelse er at KI er bevisst og kan tenke som et menneske. Selve ordet «kunstig intelligens» er i seg selv litt misvisende. KI-systemer har ikke blitt bevisste og tenker ikke slik mennesker gjør. De forstår ikke verden på den måten vi gjør, og de har verken meninger, følelser eller egne hensikter.',
    },
    {
      type: 'subheading',
      text: '«KI har svaret på alt!»',
    },
    {
      type: 'paragraph',
      text: 'KI-verktøy som ChatGPT kan alltid se ut til å ha et svar klart. Det betyr ikke at svaret er riktig. Disse programmene kan lage troverdige svar som høres riktige ut, men som likevel inneholder feil. Det skyldes at programmet beregner hva som er en sannsynlig sammensetning av ord basert på mønstre i tekstmaterialet det er trent på – uten noen sikker måte å avgjøre om svaret faktisk er sant.',
    },
    {
      type: 'paragraph',
      text: 'Slike oppdiktede svar kalles ofte «hallusinasjoner». Det er derfor viktig å være kritisk til påstander fra KI-verktøy og selv sjekke informasjonen, selv om svarene høres troverdige ut.',
    },
    {
      type: 'paragraph',
      text: 'Et alvorlig eksempel på KI-hallusinasjon er da KI-oversikten til Google feilaktig hevdet at en norsk politiker var seksualforbryter. Det viser at selv store og ressurssterke selskaper ikke har løst dette problemet.',
    },
    {
      type: 'subheading',
      text: '«KI kommer til å ta over verden»',
    },
    {
      type: 'paragraph',
      text: 'Den apokalyptiske fremstillingen av KI som vi kjenner fra filmer som Terminator (1984) og The Matrix (1999) – der mennesker er i ferd med å bli utslettet av intelligente roboter – er heldigvis veldig langt fra den teknologien som finnes i dag. Det er derimot nærliggende å tenke seg at en del jobber kan bli overflødige fordi KI automatiserer rutinepreget arbeid som ikke krever langvarig tankevirksomhet.',
    },
    {
      type: 'sources',
      title: 'Kilder/videre lesning kapittel 1:',
      items: [
        [
          { text: 'Tidemann, Axel; Arnesen, Lars: ' },
          { text: 'kunstig intelligens', href: 'https://snl.no/kunstig_intelligens' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
        [
          { text: 'Tidemann, Axel: ' },
          { text: 'nevralt nettverk', href: 'https://snl.no/nevralt_nettverk' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
        [
          { text: 'Tidemann, Axel; Wold, Sondre: ' },
          { text: 'generativ kunstig intelligens', href: 'https://snl.no/generativ_kunstig_intelligens' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
      ],
    },
  ],

  // ─── Kapittel 2: Bygge selvtillit med KI ─────────────────────────────────────

  '2-1': [
    {
      type: 'lead',
      text: 'Når du bruker et KI-verktøy, sender du informasjon til serverne til selskapet som lager verktøyet, og informasjonen lagres der.',
    },
    {
      type: 'paragraph',
      text: 'I noen tilfeller kan det du skriver også bli brukt til å trene og forbedre fremtidige versjoner av programmet. Dette er ikke noe unikt for KI – det samme gjelder mange digitale tjenester vi bruker til daglig, som e-post og sosiale medier.',
    },
    {
      type: 'paragraph',
      text: 'Norge er omfattet av EUs personvernforordning, også kalt GDPR, som stiller strenge krav til hvordan selskaper håndterer personopplysninger. Datatilsynet er det norske tilsynsorganet som følger med på at disse reglene overholdes, også for KI-verktøy. GDPR gir deg rettigheter som bruker, blant annet rett til å se hvilke opplysninger som er lagret om deg, og i mange tilfeller rett til å få dem slettet.',
    },
    {
      type: 'paragraph',
      text: 'Det viktigste du selv kan gjøre, er å være bevisst på hva du deler. Unngå å skrive inn sensitive opplysninger som personnummer, bankopplysninger eller detaljerte helseopplysninger. Slik informasjon bør du generelt være forsiktig med å dele digitalt – ikke bare med KI.',
    },
  ],

  '2-2': [
    {
      type: 'lead',
      text: 'Det er forståelig å ha spørsmål og bekymringer om kunstig intelligens. KI er et relativt nytt fenomen for de fleste, og mye av det vi hører i nyheter og sosiale medier kan virke overveldende.',
    },
    {
      type: 'subheading',
      text: '«Hva skjer om jeg trykker feil eller gjør noe galt?»',
    },
    {
      type: 'paragraph',
      text: 'Du kan ikke ødelegge noe ved å stille spørsmål til et KI-verktøy. Hvis svaret ikke er nyttig, kan du stille spørsmålet på nytt, avslutte samtalen, eller slette hele samtalen og starte på nytt. Det finnes ingen knapper du kan trykke på som vil få alvorlige konsekvenser.',
    },
    {
      type: 'subheading',
      text: '«Hva med personvern?»',
    },
    {
      type: 'paragraph',
      text: 'Som du leste i forrige emne, finnes det regler som beskytter deg. Det viktigste du selv kan gjøre, er å være bevisst på hva du deler. Holder du deg unna sensitive opplysninger, er det lite å bekymre seg for i det daglige.',
    },
    {
      type: 'subheading',
      text: 'Prøv i ditt eget tempo',
    },
    {
      type: 'paragraph',
      text: 'Det viktigste er at du ikke føler deg presset til å ta i bruk noe du ikke er klar for. Start gjerne med én enkel oppgave – for eksempel å stille et spørsmål du lurer på. Det er lov å gjøre feil, og det er lov å prøve på nytt. Tips til hvordan du stiller gode spørsmål til KI finner du i kapitlet om generativ KI.',
    },
  ],

  '2-3': [
    {
      type: 'lead',
      text: 'I første kapittel lærte du at KI trenes på store mengder tekst og bilder som fungerer som eksempler den kan lære av. Men hva skjer når eksemplene inneholder menneskelige feil og fordommer?',
    },
    {
      type: 'heading',
      text: 'Skjevheter i treningsinformasjon',
    },
    {
      type: 'paragraph',
      text: 'KI lærer av informasjon som er laget av mennesker, og mennesker er ikke nøytrale. Hvis eksemplene KI er trent på gjenspeiler fordommer eller urettferdighet i samfunnet, vil KI-systemet lære seg de samme mønstrene og videreføre dem.',
    },
    {
      type: 'paragraph',
      text: 'Et eksempel på dette er da Amazon utviklet et KI-system for å sortere jobbsøknader, men oppdaget at systemet konsekvent rangerte menn høyere enn kvinner. Årsaken var at systemet hadde lært av historiske ansettelsesdata fra IT-bransjen, der menn hadde dominert i årevis. KI-systemet lærte seg at menn var å foretrekke – ikke fordi det var sant, men fordi dataene sa det. Amazon skrinla systemet da de oppdaget problemet.',
    },
    {
      type: 'paragraph',
      text: 'Dette viser at KI ikke er objektiv bare fordi den er en maskin. Den gjenspeiler eksemplene den er trent på, og dermed også de menneskene som har laget og valgt ut disse eksemplene.',
    },
    {
      type: 'heading',
      text: 'Den svarte boksen',
    },
    {
      type: 'paragraph',
      text: 'En annen utfordring er at det ofte er umulig å forklare nøyaktig hvorfor KI kom frem til et bestemt svar eller en bestemt beslutning. Dette kalles gjerne «svart boks»-problemet.',
    },
    {
      type: 'paragraph',
      text: 'Når et nevralt nettverk tar en beslutning, skjer det gjennom millioner av matematiske beregninger som ikke lar seg lese eller forklare enkelt. Det betyr at selv utviklerne av systemet ikke alltid kan si nøyaktig hvorfor det ga det svaret det ga.',
    },
    {
      type: 'paragraph',
      text: 'Dette er særlig viktig å være klar over hvis KI brukes til å ta beslutninger som påvirker deg direkte, for eksempel i helsevesenet eller i offentlige tjenester.',
    },
    {
      type: 'sources',
      title: 'Kilder/videre lesning kapittel 2:',
      items: [
        [
          { text: 'Dastin, Jeffrey: ' },
          { text: 'Amazon scraps secret AI recruiting tool that showed bias against women ', href: 'https://www.reuters.com/article/world/insight-amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK0AG/' },
          { text: ' i ' },
          { text: 'Reuters, 2018', italic: true },
        ],
        [
          { text: 'Blouin, Lou: ' },
          { text: 'AI´s mysterious "black box" problem, explained i University of Michigan-Dearborn News, ', href: 'https://umdearborn.edu/news/ais-mysterious-black-box-problem-explained' },
          { text: '6. mars 2023', italic: true },
        ],
      ],
    },
  ],

  // ─── Kapittel 3: Generativ KI ────────────────────────────────────────────────

  '3-1': [
    {
      type: 'lead',
      text: 'Generativ KI er teknikker innen maskinlæring der målet ikke bare er å analysere informasjon, men å lage ny informasjon – for eksempel i form av tekst, bilder, lyd eller video.',
    },
    {
      type: 'paragraph',
      text: 'Generativ KI er basert på kunstige nevrale nettverk, som er avanserte statistiske modeller trent på svært store mengder eksempler, som tekst og bilder samlet fra internett.',
    },
    {
      type: 'paragraph',
      text: 'Når en generativ KI-modell trenes opp, lærer den å gjenkjenne mønstre og regelmessigheter i informasjonen den har sett – for eksempel hvilke ord som vanligvis følger etter hverandre, eller hvordan bilder av ulike motiver er bygd opp. Gitt en instruksjon fra deg kan modellen lage nye tekster eller bilder basert på disse mønstrene.',
    },
    {
      type: 'paragraph',
      text: 'Den mest utbredte bruken av generativ KI er gjennom samtaleroboter som ChatGPT. Selv om teorien bak disse verktøyene er komplisert, er selve verktøyene enkle å bruke – noe du kan lære mer om i de neste emnene.',
    },
  ],

  '3-2': [
    {
      type: 'lead',
      text: 'Generativ KI er lett å bruke, og mulighetene er mange. Her er noen konkrete eksempler på hva som kan være mulig.',
    },
    {
      type: 'heading',
      text: 'Få svar på tekniske spørsmål',
    },
    {
      type: 'paragraph',
      text: 'Hvis noe ikke virker som det skal på telefonen, nettbrettet eller datamaskinen din, kan du spørre et KI-verktøy om hjelp. For å få et godt svar er det viktig å beskrive problemet så tydelig som mulig.',
    },
    {
      type: 'paragraph',
      text: 'Fortell KI-verktøyet hvilken enhet du bruker – for eksempel «iPhone 13» eller «Samsung Galaxy-nettbrett» – og hvilket program eller hvilken app problemet gjelder. Beskriv deretter hva som skjer, eller ikke skjer, så konkret du kan.',
    },
    {
      type: 'paragraph',
      text: 'Et eksempel på en god beskrivelse: «Jeg har en iPhone 14. Når jeg prøver å åpne Vipps-appen, lukker den seg med én gang. Hva kan jeg gjøre? Jeg er ikke så teknisk anlagt, så forklar gjerne nøye.»',
    },
    {
      type: 'paragraph',
      text: 'Hvis du klarer å ta et skjermbilde av feilmeldingen eller problemet, kan du laste det opp sammen med spørsmålet. Da kan KI-verktøyet se nøyaktig hva du så på skjermen og gi deg et mer presist svar.',
    },
    {
      type: 'paragraph',
      text: 'Det er ikke alltid KI-verktøyet finner løsningen på problemet, men i mange tilfeller kan du få nyttige råd som hjelper deg videre.',
    },
    {
      type: 'heading',
      text: 'Hjelp til å skrive tekster',
    },
    {
      type: 'paragraph',
      text: 'Å få hjelp til å skrive tekster er et av de mest praktiske bruksområdene for generativ KI – enten det er en e-post til legen, en tale til et familiemedlem eller et brev til kommunen.',
    },
    {
      type: 'paragraph',
      text: 'For å få et svar som passer til situasjonen din, er det viktig å beskrive hva du trenger så tydelig som mulig. Fortell hvem teksten skal skrives til, hva den skal handle om, og gjerne hvilken tone du ønsker – for eksempel om den skal være formell eller uformell.',
    },
    {
      type: 'paragraph',
      text: 'Et eksempel på en lite spesifikk forespørsel som fortsatt kan gi et godt svar: «Kan du hjelpe meg å skrive et brev til kommunen? Jeg vil klage på at fortauet i gaten min ikke brøytes ofte nok om vinteren.»',
    },
    {
      type: 'paragraph',
      text: 'Svaret på det kan være (fra ChatGPT):'
    },
    {
      type: 'paragraph',
      text: '',
    },
    {
      type: 'paragraph',
      text: '',
    },
    {
      type: 'italic-paragraph',
      text: 'Til [Kommunens navn]',
    },
    {
      type: 'italic-paragraph',
      text: 'Emne: Klage på mangelfull brøyting av fortau',
    },
    {
      type: 'italic-paragraph',
      text: 'Jeg ønsker med dette å klage på at fortauet i [gatenavn] ikke blir brøytet tilstrekkelig ofte om vinteren.',
    },
    {
      type: 'italic-paragraph',
      text: 'Gjennom vinterperioden opplever jeg at det ofte går lang tid mellom hver gang fortauet blir brøytet. Dette fører til at snø og is bygger seg opp, noe som gjør det vanskelig og tidvis utrygt å ferdes til fots. Problemet rammer særlig eldre, personer med nedsatt mobilitet, barnefamilier med barnevogn og andre som er avhengige av trygge gangarealer.',
    },
    {
      type: 'italic-paragraph',
      text: 'Når fortauet ikke blir brøytet innen rimelig tid etter snøfall, blir mange gående tvunget ut i veibanen. Dette skaper unødvendige trafikksikkerhetsutfordringer for både fotgjengere og bilister.',
    },
    {
      type: 'italic-paragraph',
      text: 'Jeg ber derfor kommunen vurdere rutinene for brøyting av fortauet i [gatenavn], og sørge for at området prioriteres høyere ved snøfall slik at fremkommeligheten og sikkerheten for fotgjengere ivaretas.',
    },
    {
      type: 'italic-paragraph',
      text: 'Jeg setter pris på en tilbakemelding om hvordan kommunen vurderer saken, og hvilke tiltak som eventuelt kan forventes.',
    },
    {
      type: 'italic-paragraph',
      text: 'Med vennlig hilsen',
    },
    {
      type: 'italic-paragraph',
      text: '[Navn]',
    },
    {
      type: 'italic-paragraph',
      text: '[Adresse]',
    },
    {
      type: 'italic-paragraph',
      text: '[Telefonnummer]',
    },
    {
      type: 'italic-paragraph',
      text: '[E-post]',
    },
    {
      type: 'paragraph',
      text: '',
    },
    {
      type: 'paragraph',
      text: '',
    },
    {
      type: 'paragraph',
      text: 'Hvis svaret ikke er godt nok etter første forsøk, kan du gi flere detaljer og be om spesifikke endringer i stedet for å starte helt på nytt.',
    },
    {
      type: 'paragraph',
      text: 'Unngå å skrive inn sensitive opplysninger som personnummer, passord eller bankopplysninger. Slik informasjon har KI-verktøyet ikke bruk for, og du bør aldri dele det digitalt på denne måten.',
    },
    {
      type: 'heading',
      text: 'Hobbybruk',
    },
    {
      type: 'paragraph',
      text: 'Generativ KI kan gi råd og hjelp i hobbysammenheng – for eksempel i hagen. Hvis du har et blomsterbed der planter ikke vil trives, kan du skrive inn hvor i landet du bor, hva slags solforhold det er i bedet, hva slags jord, og annen relevant informasjon, og spørre om hva som kan passe. Eksempler på gode og dårlige spørsmål om dette finner du i neste emne.',
    },
  ],

  '3-3': [
    {
      type: 'lead',
      text: 'Kvaliteten på svaret du får fra et KI-verktøy avhenger i stor grad av hvor godt spørsmålet ditt er formulert.',
    },
    {
      type: 'heading',
      text: 'Tips for å skrive gode spørsmål',
    },
    {
      type: 'bullet-list',
      items: [
        'Vær konkret. Jo mer du forteller om situasjonen din, jo bedre svar får du.',
        'Si hvilken form du vil ha svaret i, for eksempel «forklar enkelt», «lag en liste» eller «skriv et formelt brev».',
        'Fortell hvem du er eller hvilken situasjon du er i, hvis det er relevant – for eksempel «jeg er pensjonist og skal...» eller «jeg er ikke så teknisk anlagt».',
        'Hvis svaret ikke er godt nok, ikke start på nytt. Gi heller flere detaljer eller be om en spesifikk endring.',
        'Du kan stille oppfølgingsspørsmål i samme samtale, akkurat som i en vanlig samtale.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Her er noen eksempler på gode og mindre gode spørsmål, med hageeksemplet som utgangspunkt.',
    },
    {
      type: 'subheading',
      text: 'Dårlig spørsmål: «Hva kan jeg plante i hagen?»',
    },
    {
      type: 'paragraph',
      text: 'Dette gir KI-verktøyet for lite å jobbe med. Svaret blir generelt og sannsynligvis ikke særlig nyttig for din situasjon.',
    },
    {
      type: 'subheading',
      text: 'Middels spørsmål: «Jeg har et blomsterbed i hagen min i Norge. Hva kan jeg plante der?»',
    },
    {
      type: 'paragraph',
      text: 'Det er bedre, men mangler viktig informasjon om solforhold, jordtype og hva du ønsker å oppnå. Det er også stor forskjell på klimaet i Finnmark og Østfold, så mer spesifikk stedsinformasjon vil hjelpe.',
    },
    {
      type: 'subheading',
      text: 'Godt spørsmål: «Jeg bor i Østfold og har et blomsterbed på ca. 2 kvadratmeter som får sol om morgenen, men skygge resten av dagen. Jorden er bløt og har mye leire i seg. Jeg vil gjerne ha blomster som kommer tilbake hvert år og ikke krever for mye stell. Hva anbefaler du?»',
    },
    {
      type: 'paragraph',
      text: 'Dette gir KI-verktøyet nok informasjon til å gi et konkret og nyttig svar.',
    },
    {
      type: 'paragraph',
      text: '',
    },
    {
      type: 'rich-paragraph',
      segments: [
        { text: 'Hvis du vil prøve selv, kan du besøke ett av disse KI-verktøyene: ' },
        { text: 'ChatGPT', href: 'https://chatgpt.com' },
        { text: ', ' },
        { text: 'Claude', href: 'https://claude.ai' },
        { text: ', ' },
        { text: 'Copilot', href: 'https://copilot.microsoft.com' },
        { text: ' eller ' },
        { text: 'Gemini', href: 'https://gemini.google.com' },
        { text: '. De fleste krever at du registrerer deg med en e-postadresse. Det finnes også mange andre KI-verktøy, blant annet det europeiske alternativet ' },
        { text: 'Le Chat', href: 'https://chat.mistral.ai/chat' },
        { text: '.' },
      ],
    },
    {
      type: 'sources',
      title: 'Kilder/videre lesning kapittel 3:',
      items: [
        [
          { text: 'Tidemann, Axel; Arnesen, Lars: ' },
          { text: 'kunstig intelligens', href: 'https://snl.no/kunstig_intelligens' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
        [
          { text: 'Tidemann, Axel; Wold, Sondre: ' },
          { text: 'generativ kunstig intelligens', href: 'https://snl.no/generativ_kunstig_intelligens' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
      ],
    },
  ],

  // ─── Kapittel 4: KI i smarthjem ──────────────────────────────────────────────

  '4-1': [
    {
      type: 'lead',
      text: 'Et smarthjem er et hjem der hverdagslige gjenstander er koblet til internett og kan kommunisere med hverandre og fjernstyres av eieren.',
    },
    {
      type: 'paragraph',
      text: 'Belysning, stikkontakter og overvåkningsutstyr kan sende informasjon til hverandre og til andre enheter på internett. Det gjør det mulig å styre og overvåke hjemmet ditt, enten automatisk eller via en app på telefonen. Andre smarte enheter kan være tv, lyspærer, kjøleskap, dørklokker og dørlåser. Du trenger ikke å ha mange smarte enheter – det er helt opp til deg hva du har bruk for.',
    },
    {
      type: 'heading',
      text: 'Hva gjør enhetene smarte?',
    },
    {
      type: 'paragraph',
      text: 'Det som skiller smarte enheter fra vanlige er at de er utstyrt med sensorer og programvare som gjør dem i stand til å registrere omgivelsene og reagere på dem. Sensorene kan for eksempel måle temperatur, trykk eller posisjon.',
    },
    {
      type: 'paragraph',
      text: 'En smart termostat kan lære seg når du pleier å være hjemme og justere varmen automatisk. En robotstøvsuger kan kartlegge rommene i leiligheten og finne den mest effektive ruten – uten at du trenger å gjøre noe.',
    },
    {
      type: 'heading',
      text: 'KI gjør smarthjem enda smartere',
    },
    {
      type: 'paragraph',
      text: 'Mange smarthjem-enheter bruker KI for å bli bedre over tid. I stedet for å følge faste regler lærer de av vanene dine. Jo mer du bruker dem, jo bedre tilpasser de seg deg. Dette gjør hverdagen enklere og kan være særlig nyttig for den som ønsker litt ekstra hjelp hjemme.',
    },
    {
      type: 'heading',
      text: 'Sikkerhetstips:',
    },
    {
      type: 'paragraph',
      text: 'Mange smarthjem-enheter bruker KI for å bli bedre over tid. I stedet for å følge faste regler lærer de av vanene dine. Jo mer du bruker dem, jo bedre tilpasser de seg deg. Dette gjør hverdagen enklere og kan være særlig nyttig for den som ønsker litt ekstra hjelp hjemme.',
    },
  ],

  '4-2': [
    {
      type: 'lead',
      text: 'Stemmeassistenter som Google Assistant, Amazons «Alexa» og Apples «Siri» lar deg styre digitale enheter koblet til internett med stemmekommandoer, i stedet for å trykke på skjermer eller knapper.',
    },
    {
      type: 'paragraph',
      text: 'Dette kan være nyttig for mange, og særlig for personer som har utfordringer med å bruke tastatur eller har nedsatt syn.',
    },
    {
      type: 'paragraph',
      text: 'Disse stemmeassistentene bruker KI til å forstå talekommandoer. Du aktiverer dem vanligvis ved å si ett eller flere bestemte ord – som «Hey Google» – og fortsetter deretter med kommandoen, for eksempel «skru av lysene i stua» hvis du har smarte lyspærer, eller «skru av komfyren» om du har en smart komfyr.',
    },
    {
      type: 'paragraph',
      text: 'Det finnes også utfordringer med stemmeassistenter. Talegjenkjenning – teknologi som oversetter tale til tekst – er ikke alltid like god til å forstå alle dialekter, uklar tale eller kommandoer gitt med bakgrunnsstøy. Det kan også hende at stemmeassistenten aktiveres ved et uhell midt i en samtale og forsøker å utføre en kommando du ikke hadde tenkt – «Siri» er for eksempel et vanlig norsk navn.',
    },
    {
      type: 'paragraph',
      text: 'Personvern er en annen mulig bekymring. Noen føler seg ukomfortable med tanken på at det er en mikrofon i rommet som hører alt. Ifølge produsentene vil mikrofonen bare lytte etter aktiveringsordene og ikke spille inn all annen lyd. Om du stoler på det eller ikke, er opp til deg.',
    },
    {
      type: 'sources',
      title: 'Kilder/videre lesning kapittel 4:',
      items: [
        [
          { text: 'Øverby, Harald: ' },
          {
            text: 'tingenes internett', href: 'https://snl.no/tingenes_internett' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
        [
          { text: 'Rossen, Eirik: ' },
          { text: 'talegjenkjenning', href: 'https://snl.no/talegjenkjenning' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
        [
          { text: 'Morgan, Blake: ' },
          { text: 'Are Digital Assistants Always Listening? ', href: 'https://www.forbes.com/sites/blakemorgan/2018/02/05/are-digital-assistants-always-listening/' },
          { text: ' i ' },
          { text: 'Forbes', italic: true },
          { text: ', 5. februar 2018.' },
        ],
      ],
    },
  ],

  // ─── Kapittel 5: Hold deg trygg med KI ──────────────────────────────────────

  '5-1': [
    {
      type: 'lead',
      text: 'Etter hvert som generative KI-modeller har blitt bedre til å lage troverdig tekst, lyd, bilder og video, har det også blitt vanskeligere å avgjøre om noe er laget av et menneske eller en maskin.',
    },
    {
      type: 'paragraph',
      text: 'Dette kan misbrukes på ulike måter. Syntetiske bilder, videoer eller lydopptak som etterligner virkelige personer kan brukes til svindel, trakassering, politisk manipulasjon eller spredning av desinformasjon.',
    },
    {
      type: 'heading',
      text: 'Falske stemmer og videoer',
    },
    {
      type: 'paragraph',
      text: 'KI gjør det mulig å lage lydopptak og videoer som ser og høres ekte ut. Svindlere kan for eksempel kopiere stemmen til et familiemedlem og ringe deg med en historie om at de er i nød og trenger penger raskt. Dette kalles gjerne en «deepfake»-stemme. Antallet slike hendelser har økt kraftig de siste årene.',
    },
    {
      type: 'heading',
      text: 'Phishing – nettfisking',
    },
    {
      type: 'paragraph',
      text: 'Phishing – på norsk gjerne kalt «nettfisking» – er en type svindel der kriminelle utgir seg for å være en legitim avsender, for eksempel banken din, for å lure deg til å gi fra deg passord, bankopplysninger eller annen sensitiv informasjon. KI gjør disse forsøkene mer overbevisende enn før, fordi meldingene kan tilpasses deg personlig og skrives uten grammatikkfeilene som tidligere var et typisk kjennetegn på svindel. En studie viste at KI-genererte phishing-meldinger var like effektive som de beste menneskelige svindelforsøkene.',
    },
    {
      type: 'heading',
      text: 'Advarselstegn å se etter',
    },
    {
      type: 'bullet-list',
      items: [
        'Du blir bedt om å handle raskt eller betale umiddelbart.',
        'Noen ber om passord, BankID eller bankopplysninger. En legitim avsender vil aldri gjøre dette.',
        'Meldingen skaper frykt eller hastverk.',
        'Du mottar en uventet henvendelse fra noen du kjenner, som ber om penger.',
      ],
    },
    {
      type: 'heading',
      text: 'Familiens kodeord',
    },
    {
      type: 'paragraph',
      text: 'Et praktisk råd er å avtale et hemmelig kodeord med nære familiemedlemmer. Hvis du noen gang mottar en uventet henvendelse fra noen som hevder å være et familiemedlem og ber om hjelp, kan du be dem oppgi kodeordet. En ekte person som kjenner deg vil vite det – en svindler vil ikke.',
    },
  ],

  '5-2': [
    {
      type: 'lead',
      text: 'KI-verktøy som ChatGPT kan dikte opp svar som høres svært overbevisende ut, men som inneholder feil eller oppdiktede kilder.',
    },
    {
      type: 'paragraph',
      text: 'Som du har lært tidligere i kurset, kalles dette hallusinasjoner. Det er ikke alltid lett å oppdage at KI hallusinerer, særlig hvis du ikke kjenner temaet godt fra før.',
    },
    {
      type: 'heading',
      text: 'Her er noen tommelfingerregler som kan hjelpe:',
    },
    {
      type: 'bullet-list',
      items: [
        'Sjekk alltid viktige opplysninger i en annen pålitelig kilde, for eksempel Store Norske Leksikon (snl.no).',
        'Hvis KI-verktøyet oppgir en kilde, søk den opp selv og sjekk at den faktisk finnes og sier det KI hevder.',
        'Jo viktigere avgjørelsen er – særlig i helse- og økonomispørsmål – desto viktigere er det å dobbeltsjekke.',
      ],
    },
  ],

  '5-3': [
    {
      type: 'heading',
      text: 'Hvem er ansvarlig når KI tar feil?',
    },
    {
      type: 'paragraph',
      text: 'Når et KI-verktøy gir feil informasjon eller brukes til å skade noen, er ansvarsforholdet ofte uklart. Er det selskapet som laget verktøyet? Personen som brukte det? Dette er spørsmål samfunnet og lovgiverne fortsatt arbeider med å besvare. EUs KI-forordning, som gradvis innføres i Norge, er et forsøk på å regulere dette og stille tydeligere krav til de som utvikler og bruker KI.',
    },
    {
      type: 'heading',
      text: 'Ansvarlig bruk i praksis',
    },
    {
      type: 'paragraph',
      text: 'Som bruker kan du bidra til ansvarlig bruk ved å:',
    },
    {
      type: 'bullet-list',
      items: [
        'Ikke spre innhold du ikke har verifisert, selv om det ser troverdig ut.',
        'Ikke bruk KI-verktøy til å lage innhold som kan skade eller villede andre.',
        'Vær åpen om at noe er laget med hjelp av KI når det er relevant.',
      ],
    },
    {
      type: 'paragraph',
      text: '',
    },
    {
      type: 'paragraph',
      text: 'Et eksempel på det siste er dette kurset. Tekstene er først skrevet manuelt av studenten, deretter sendt gjennom et KI-verktøy for å rydde opp i språket og forenkle faguttrykk der det var nødvendig. Til slutt har studenten verifisert tekstene manuelt.'
    },
    {
      type: 'sources',
      title: 'Kilder/videre lesning kapittel 5:',
      items: [
        [
          { text: 'Tidemann, Axel; Wold, Sondre: ' },
          { text: 'generativ kunstig intelligens', href: 'https://snl.no/generativ_kunstig_intelligens' },
          { text: ' i ' },
          { text: 'Store norske leksikon', italic: true },
          { text: ' på snl.no.' },
        ],
        [
          { text: 'Knudsen, Eigil: ' },
          { text: 'Studie: KI lurer ofrene like effektivt som mennesker i én type svindel', href: 'https://www.digi.no/artikler/studie-ki-lurer-ofrene-like-effektivt-som-mennesker-i-en-type-svindel/554701' },
          { text: ' i ' },
          { text: 'Digi.no', italic: true },
          { text: ', 15. januar 2025.' },
        ],
        [
          { text: 'Seniornett Norge: ' },
          { text: 'Er KI en trussel mot vår sikkerhet?', href: 'https://www.seniornett.no/er-ki-en-trussel-mot-var-sikkerhet/' },
          { text: ' i ' },
          { text: 'Seniornett.no', italic: true },
          { text: ', 10. oktober 2024.' },
        ],
        [
          { text: 'Fossmark, Elisabeth: ' },
          { text: 'Kunstig intelligens kommer til å lure deg også', href: 'https://www.soprasteria.no/vi-mener/meninger/details/kunstig-intelligens-kommer-til-a-lure-deg-ogsa' },
          { text: ' i ' },
          { text: 'Sopra Steria', italic: true },
          { text: ', 1. februar 2024.' },
        ],
        [
          { text: 'Kunst, Jonas R.; Schroeder, Daniel Thilo: ' },
          { text: 'Falske folkebevegelser truer demokratiet', href: 'https://www.nrk.no/ytring/falske-folkebevegelser-truer-demokratiet-1.17745926' },
          { text: ' i ' },
          { text: 'NRK Ytring', italic: true },
          { text: ', 20. februar 2026.' },
        ],
      ],
    },
  ],

  // ─── Kapittel 6: Avslutt kurset ──────────────────────────────────────
  '6-1': [
    {
      type: 'heading',
      text: 'Takk for at du har fullført kurset!',
    },
    {
      type: 'paragraph',
      text: 'Hvis du deltar i masterstudien, er neste steg å fylle ut et kort spørreskjema. Dette er del 3 og siste del av listen over ting å gjøre som sto i eposten fra oppstart. Det tar bare noen minutter.'
    },
    {
      type: 'rich-paragraph',
      segments: [
        { text: 'Gå til spørreskjemaet', href: 'https://nettskjema.no/a/632332' },
      ],
    },
    {
      type: 'rich-paragraph',
      segments: [
        { text: 'Hvis du vil lære mer om kunstig intelligens, anbefales boken ' },
        { text: 'Maskiner som tenker', italic: true },
        { text: ' av KI-forsker Inga Strümke. Den gir en tilgjengelig innføring i hva KI er og hvordan det påvirker samfunnet vårt — men vær forberedt på at den er et godt steg mer krevende enn dette kurset.' },
      ],
    },
  ],
};

export function getTopicContent(chapterId: number, topicId: number): ContentBlock[] {
  return CONTENT[`${chapterId}-${topicId}`] ?? [];
}
