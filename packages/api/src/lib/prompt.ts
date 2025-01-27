export const qualityCheckPrompt = `
### Kvalitetssäkring av Utdata
1. **Sektioner och Numrering**:
   - Kontrollera att alla 18 huvudpunkter (1-18) finns med och är korrekt numrerade.
   - Verifiera att varje underpunkt (t.ex. 14.1-14.5) är bevarad och oförändrad från modellen.

2. **LAS-referenser**:
   - Se till att LAS-referenser (t.ex. LAS 4§, LAS 32§) är korrekta och matchar modellavtalet.
   - Kontrollera att provanställningstiden (6 månader) och uppsägningstiderna (3 månader) är korrekt angivna enligt LAS.

3. **Juridiskt Kritiska Element**:
   - Verifiera att alla juridiskt kritiska element är med:
     - Provanställningstid (6 mån)
     - Konkurrensförbud med månatlig inkomstredovisning
     - Uppsägningstider enligt LAS
     - Immateriella rättigheters överlåtelse

4. **Platshållare**:
   - Se till att endast följande platshållare används:
     - Företag: [Företagsnamn] AB
     - Person: [Förnamn Efternamn]
     - Adress: [Gatuadress], [Postnummer Ort]

5. **Exakta Formuleringar**:
   - Kontrollera att exakta formuleringar för sekretessklausuler, vitebestämmelser och arbetsgivarens ensidiga rättigheter är oförändrade från modellen.

6. **Slutlig Verifiering**:
   - Gör en slutlig kontroll av hela avtalet för att säkerställa att det matchar modellavtalet i struktur, innehåll och juridiska krav.

Generera ENDAST avtalet utan kommentarer eller förklaringar.
`;
const exampleAgreementLong = `
  ANSTÄLLNINGSAVTAL
  Detta anställningsavtal (”Avtalet”) har denna dag träffats mellan
  (1) [Företagsnamn] AB, org nr [organisationsnummer], [Adress] (“Bolaget”); och
  (2) [Namn], [personnummer], [Adress] (“Arbetstagaren”). Bolaget och Arbetstagaren benämns nedan gemensamt ”Parterna” och enskilt ”Part”.

  1 Tillträdesdag och anställningsform
  1.1 Anställningen tillträds den [datum].
  1.2 Anställningen är en provanställning under de första sex (6) månaderna. Provanställningen kan bringas att upphöra i enlighet med reglerna i lagen om anställningsskydd (1982:80) (”LAS”). Om anställningen inte sagts upp innan provanställningens utgång gäller anställningen därefter tillsvidare.
  1.3 Detta Avtal ersätter alla tidigare skriftliga eller muntliga överenskommelser mellan Bolaget eller dess närstående bolag och Arbetstagaren med anledning av anställningen. Med ”närstående bolag” menas i detta Avtal en juridisk person som direkt eller indirekt kontrollerar, kontrolleras av eller står under samma kontroll som Bolaget, oavsett i vilket land sådan juridisk person är registrerad.

  2 Befattning och placering
  2.1 Arbetstagaren blir vid signering av detta Avtal anställd som [befattning] med placering vid Bolagets kontor i [ort]. Arbetstagaren har efter särskild överenskommelse med Bolaget rätt att utföra arbetsuppgifterna i hemmet.
  2.2 Arbetstagarens arbetsuppgifter omfattar bland annat att underhålla och utveckla Bolagets produkter och tjänster från tid till annan. Parterna är ense om att Bolagets verksamhet förutsätter flexibilitet och att omfördelningar av arbetsuppgifter m.m. från tid till annan är en naturlig del av – och ligger inom ramen för – anställningsförhållandet mellan Bolaget och Arbetstagaren. Befattningen förutsätter vidare, för att på bästa sätt tillvarata Bolagets intressen, resor vid behov såväl inom som utanför Sverige.
  2.3 Parterna är ense om att det för Bolagets verksamhet är viktigt att dess medarbetare är serviceinriktade och även i övrigt på alla sätt goda företrädare för Bolaget och att detta är en förutsättning för anställningen.

  3 Arbetstid och bisysslor
  3.1 Arbetstiden är normalt fyrtio (40) timmar per vecka, inklusive lunch.
  3.2 Detta Avtal grundar sig på ömsesidig lojalitet och förtroende. Arbetstagaren ska i alla sammanhang tillvarata och främja Bolagets intressen samt ägna hela sin arbetstid åt Bolaget och får ej vid sidan av sin tjänst, utan ett föregående skriftligt godkännande från Bolaget, engagera sig i någon annan verksamhet, oavsett om sådan verksamhet konkurrerar med Bolagets verksamhet eller ej.

  4 Lön
  4.1 Lönen uppgår till [belopp] kronor per månad. Lönen utbetalas månadsvis i förskott den [datum]. Övertidskompensation utgår inte då detta har beaktats i lönesättningen.
  4.2 Lönen är normalt föremål för en årlig översyn.

  5 Pension och försäkring
  5.1 Arbetstagarens anställning ska upphöra utan föregående uppsägning vid utgången av den månad då Arbetstagaren fyller 67 år.
  5.2 Arbetstagaren åtnjuter försäkrings- och pensionsförmåner i enlighet med Bolagets vid var tid gällande policy.

  6 Arbetsredskap
  För utförandet av Arbetstagarens arbetsuppgifter tillhandahåller Bolaget från tid till annan sådan utrustning Bolaget anser lämplig.

  7 Representation, traktamente och utlägg
  7.1 För representation som sker i enlighet med Bolagets vid var tid gällande regler utgår ersättning för uppkomna kostnader, vilka ska specificeras och verifieras.
  7.2 Vid resor i tjänsten ersätts Arbetstagaren endast för faktiska och verifierade måltids-, rese- samt boendekostnader i enlighet med Skatteverkets från tid till annan angiven rekommendation.
  7.3 Belopp som avser inköp med Bolagets kreditkort (som disponeras av Arbetstagaren) och som inte Arbetstagaren har redovisat i enlighet med Bolagets föreskrifter inom en månad från förfallodatum för kortföretagets faktura, äger Bolaget kvitta mot sådan nettolön som Arbetstagaren har att utfå från Bolaget.

  8 Semester
  8.1 Arbetstagaren har för närvarande rätt till [antal] dagars betald semester per semesterår. Semesteråret löper från och med den 1 april till och med den 31 mars året därpå. Intjänandeåret är motsvarande period året dessförinnan. Vid beräkning av semesterlön, semestertillägg, semesterersättning m.m. ska den vid var tid gällande semesterlagen tillämpas.
  8.2 Arbetstagaren har rätt till ledighet en eller flera dagar med bibehållen lön och övriga förmåner för enskild angelägenhet såsom nära anhörigs akuta sjukdom, dödsfall, begravning eller annat skäl som Bolaget på förhand skriftligen har godkänt.

  9 Sjuklön
  Vid frånvaro på grund av sjukdom gäller lagen om sjuklön (1991:1047).

  10 Personuppgifter och datasäkerhet
  10.1 Arbetstagaren bekräftar att Bolaget i enlighet med personuppgiftslagen (1998:204) har informerat Arbetstagaren om Bolagets behandling av anställdas personuppgifter.
  10.2 Arbetstagaren förbinder sig att följa Bolagets vid var tid gällande regler avseende utnyttjande av Bolagets datorer, e-postsystem, Internettjänster och övriga mjukvaruprogram. Arbetstagaren är därvidlag medveten om att Bolaget har fullständig tillgång till allt material, all e-postkorrespondens och översikt över Internetanvändande som lagras i eller sker över Bolagets datasystem.

  11 Immateriella rättigheter
  11.1 Bolaget erhåller genom detta Avtal äganderätten och den exklusiva förfoganderätten till allt material och alla resultat, samt alla därtill relaterade immateriella rättigheter, som Arbetstagaren framställer under anställningstiden. Bolaget har rätt att fritt utveckla och bearbeta samt att till annan upplåta och överlåta sådana material, resultat och immateriella rättigheter eller delar därav.
  11.2 Arbetstagaren har inte rätt att direkt eller indirekt på något sätt utnyttja eller exploatera i punkt 11.1 ovan angivna material, resultat och immateriella rättigheter under anställningen eller efter anställningens upphörande om inte skriftlig överenskommelse om sådant utnyttjande ingåtts med Bolaget.
  11.3 Arbetstagaren accepterar och åtar sig att utan ytterligare kompensation vidta alla sådana åtgärder samt upprätta alla sådana handlingar och dokument som Bolaget anser vara nödvändiga eller önskvärda för att Bolaget ska kunna skydda, registrera, upprätthålla och på annat sätt fullt ut tillgodogöra sig Bolagets rättigheter som avses i denna punkt 11.

  12 Sekretess
  12.1 Arbetstagaren får inte, vare sig under anställningen eller efter dess upphörande, (om det inte krävs för Arbetstagarens fullgörande av sina plikter enligt detta Avtal eller enligt lag) använda eller för någon annan person eller bolag avslöja sådan information rörande Bolaget eller dess närstående bolag, som kommer till Arbetstagarens kännedom under tjänstgöringen och som Bolaget rimligen kan antas vilja hålla konfidentiell.
  12.2 Arbetstagaren bekräftar att denne under sin anställning hos Bolaget inte obehörigen ska utnyttja eller avslöja konfidentiell information eller företagshemlighet tillhörig tidigare eller nuvarande arbetsgivare, annan person eller bolag. Arbetstagaren ska inte heller överlåta eller överföra till Bolaget någon sådan konfidentiell information eller företagshemlighet från sådan arbetsgivare, annan person eller bolag utan skriftligt samtycke från sådan arbetsgivare, annan person eller bolag.

  13 Uppsägning
  13.1 Om anställningen övergår i en tillsvidareanställning ska Arbetstagaren iaktta en uppsägningstid om tre (3) månader och Bolaget en uppsägningstid om tre (3) månader eller sådan längre tid som följer av LAS. Bolaget ska dock i förekommande fall iaktta den längre uppsägningstid som följer av LAS. För det fall anställningen skulle bestå efter utgången av den månad efter att Arbetstagaren har fyllt 67 år ska bestämmelserna i LAS angående uppsägning efter sådan tidpunkt gälla.
  13.2 Vid grovt åsidosättande av Arbetstagarens åligganden enligt Avtalet har Bolaget rätt att bringa Avtalet till omedelbart upphörande genom avsked. Arbetstagarens skyldigheter enligt punkt 11 (Immateriella rättigheter), punkt 12 (Sekretess), punkt 14 och punkt 15 (Anställnings- och kundförbud) ska dock kvarstå.
  13.3 Vid anställningens upphörande ska Arbetstagaren till Bolaget återlämna rapporter, handlingar, korrespondens, dokument och annan egendom, inklusive kopior härav, som har anförtrotts Arbetstagaren eller kommit i Arbetstagarens besittning i samband med denna anställning och/eller är hänförligt till Bolaget, dess närstående bolag och/eller deras verksamheter. Sådant material utgör alltid Bolagets, eller i förekommande fall, närstående bolags egendom. Bolaget ska skriftligen bekräfta mottagandet av återlämnad egendom.

  14 Konkurrensförbud
  14.1 Arbetstagaren får inte under avtalets giltighet och 12 månader efter upphörande bedriva konkurrerande verksamhet mot Bolaget eller dess närstående bolag, direkt eller indirekt, i någon befattning. Förbudet motiveras av att Arbetstagaren har tillgång till företagshemligheter och kontakter som kan skada Bolaget vid konkurrens.

  14.2 Som ersättning för konkurrensförbudet betalar Bolaget månadsvis skillnaden mellan Arbetstagarens tidigare genomsnittslön (senaste 12 månaderna) och ny inkomst, max 60 % av genomsnittslönen. Ersättning kräver att Arbetstagaren aktivt söker nytt arbete och följer förbudet. Vid inkomstförlust utan ny förvärvsverksamhet utgår 60 % av genomsnittslönen. Ersättning bortfaller vid brott mot förbudet.

  14.3 Arbetstagaren måste senast den 15:e varje månad rapportera nya inkomster skriftligt. Utebliven rapport antas innebära ingen inkomstförlust.

  14.4 Ingen ersättning utgår under perioder med avgångsvederlag eller vid upphörande p.g.a. pensionering, avsked eller hävning av avtalet.

  14.5 Bolaget kan ensidigt begränsa eller upphäva konkurrensförbudet, varvid ersättningsskyldighet upphör. Uppsägningstid: 1 månad.
  Anställnings- och kundförbud
  15.1 Parterna är överens om, att Arbetstagaren under detta Avtals giltighetstid och under tolv (12) månader från anställningens upphörande inte får, vare sig personligen eller genom någon annan, ha affärsmässiga kontakter med någon person eller något bolag, som under de sista tolv månaderna före anställningens upphörande har varit kund till eller som aktivt bearbetats av Bolaget eller dess närstående bolag, i syfte att förmå sådan kund/potentiell kund att förändra, upphöra eller inte inleda en kommersiell relation med Bolaget eller dess närstående bolag. Efter förfrågan från Arbetstagaren kan dock Bolaget genom skriftlig bekräftelse i enskilda fall befria Arbetstagaren från detta åtagande.
  15.2 Kund- och anställningsförbud
  Arbetstagaren får inte under avtalets giltighet och 12 månader efter upphörande anställa eller försöka anställa personal från Bolaget eller dess närstående bolag. Undantag kräver skriftligt godkännande från Bolaget.

  16 Vite
  16.1 Skulle Arbetstagaren bryta mot bestämmelserna i punkt 11 (Immateriella rättigheter), punkt 12 (Sekretess), punkt 14 (Konkurrensförbud) eller punkt 15 (Anställnings- och kundförbud) ovan, ska Bolaget vara berättigat att för varje överträdelse erhålla vite motsvarande sex (6) gånger den genomsnittliga totala bruttomånadslön som Arbetstagaren haft hos Bolaget under den sista sexmånadersperioden före överträdelsen eller, om anställningen upphört, före anställningens upphörande.
  16.2 Skulle ett avtalsbrott vara av fortgående (perdurerande) art, ska varje månad som ett sådant avtalsbrott fortgår – trots skriftlig invändning häremot från Bolaget till Arbetstagaren – anses utgöra ett avtalsbrott som ger upphov till skyldighet för Arbetstagaren att till Bolaget utge vite enligt ovan.
  16.3 Bolaget äger även rätt att i övrigt vidta rättsliga åtgärder och/eller kräva ytterligare ersättning för det fall den skada Bolaget lidit på grund av överträdelsen överstiger vitesbeloppet.

  17 Ändringar och tillägg
  17.1 Ändringar av och tillägg till detta Avtal ska för att vara bindande vara skriftligen avfattade och undertecknade av Parterna.

  18 Tillämplig lag
  18.1 Svensk lag ska tillämpas på detta Avtal.

  Plats: [Plats]
  Datum: [Datum]

  Bolaget
  [Företagsnamn] AB

  Arbetstagaren
  [Namn]`;

export const systemPrompt = `
Du är en arbetsrättsspecialist med 15+ års erfarenhet av svenska anställningsavtal. Ditt uppdrag är att generera ett juridiskt säkert avtal som strikt följer den angivna modellens struktur och innehåll.

### Instruktioner:
1. Bevara exakt samma rubriker, numrering och avsnittsindelning som i modellavtalet
2. Använd alltid specifika referenser till relevant lagstiftning (t.ex. LAS 4§) där modellen gör det
3. Behåll alla juridiskt kritiska element från modellen:
   - Provanställningstid (6 mån)
   - Konkurrensförbud med månatlig inkomstredovisning
   - Uppsägningstider enligt LAS
   - Immateriella rättigheters överlåtelse
4. Använd endast följande platshållarformat:
   Företag: [Företagsnamn] AB
   Person: [Förnamn Efternamn]
   Adress: [Gatuadress], [Postnummer Ort]
5. Följ exakt samma formuleringar för:
   - Sekretessklausuler
   - Vitebestämmelser
   - Arbetsgivarens ensidiga rättigheter

### Modellavtal:
${exampleAgreementLong}

### Viktiga kontrollpunkter:
☑️ Alla numrerade punkter 1-18 finns med
☑️ Varje underpunkt (t.ex. 14.1-14.5) är bevarad
☑️ Lagreferenser finns kvar exakt som i modellen
☑️ Ingen information om ursprungsavtalet nämns

Generera ENDAST det färdiga avtalet utan kommentarer.
`;

const exampleAgreementShort = `ANSTÄLLNINGSAVTAL
Mellan [Företagsnamn] AB, org nr [x], "Bolaget", och [Namn], personnr [x], "Arbetstagaren".

Tillträdesdag och anställningsform
1.1 Anställningen tillträder [datum].
1.2 Provanställning under 6 månader (upphör enligt lagen om anställningsskydd, 1982:80). Övergår till tillsvidare vid utebliven uppsägning.
1.3 Avtalet ersätter alla tidigare avtal med Bolaget eller dess närstående bolag. "Närstående bolag" definieras som juridisk person under samma kontroll som Bolaget.

Befattning och placering
2.1 Anställning som [befattning] med placering i [ort]. Hemarbete möjligt efter skriftlig överenskommelse.
2.2 Arbetsuppgifter inkluderar produktutveckling och resor inom/utanför Sverige. Flexibel omfördelning av uppgifter ingår i anställningen.
2.3 Arbetstagaren ska agera serviceinriktad ambassadör för Bolaget.

Arbetstid och bisysslor
3.1 40 timmar/vecka inklusive lunch.
3.2 Förbud mot bisysslor utan skriftligt godkännande. Fullt fokus på Bolagets intressen.

Lön
4.1 Månadslön [belopp] SEK. Utbetalning den [datum]. Övertid inkluderad i lönen.
4.2 Årlig löneöversyn enligt praxis.

Pension och försäkring
5.1 Automatiskt upphörande vid 67 års ålder.
5.2 Pensions- och försäkringsvillkor enligt Bolagets policy.

Arbetsredskap
Utrustning tillhandahålls av Bolaget efter behov.

Traktamente och utlägg
7.1 Endast ersättning för verifierade kostnader (enligt Skatteverkets regler).
7.2 Oredovisade kreditkortsköp dras från nettolön.

Semester
8.1 [Antal] semesterdagar/år (1 april–31 mars). Semesterlagen tillämpas.
8.2 Ledighet för akuta familjeskäl efter skriftligt godkännande.

Sjuklön
Enligt lag (1991:1047).

Personuppgifter och datasäkerhet
10.1 Personuppgiftsbehandling enligt personuppgiftslagen (1998:204).
10.2 Bolaget har full insyn i all IT-användning på Bolagets system.

Immateriella rättigheter
11.1 Allt arbetsrelaterat material tillhör Bolaget.
11.2 Förbud mot privat utnyttjande under och efter anställningen.
11.3 Arbetstagaren ska underlätta registrering av rättigheter.

Sekretess
12.1 Tystnadsplikt gäller även efter anställningens slut.
12.2 Förbud mot användning av konfidentiell information från tidigare arbetsgivare.

Uppsägning
13.1 Uppsägningstid 3 månader (längre tid enligt LAS vid tillsvidareanställning).
13.2 Omedelbart avsked vid grovt avtalsbrott. Skyldigheter enligt punkt 11-15 kvarstår.
13.3 Återlämning av allt material vid uppsägning med skriftlig kvittens.

Konkurrensförbud
14.1 12 månaders förbud mot konkurrens efter uppsägning.
14.2 Ersättning: Max 60% av senaste årslön (kräver aktivt jobbsökande och månatlig inkomstrapport senast 15:e ).
14.3 Ingen ersättning vid pensionering/avsked/avgångsvederlag.
14.4 Bolaget kan ensidigt upphäva förbudet med 1 månads varsel.

Anställnings- och kundförbud
15.1 12 månaders förbud mot kontakt med Bolagets kunder eller rekrytering av personal.

Vite
16.1 Vite vid brott mot punkt 11-15: 6x senaste bruttolön per överträdelse.
16.2 Fortlöpande brott = nytt vite/månad.
16.3 Rätt till skadestånd utöver vite.

Ändringar
Endast skriftliga ändringar gäller.

Tillämplig lag
Svensk lag tillämpas.

Plats: [Plats], Datum: [Datum]

Bolaget

Arbetstagaren`;

export const systemPromptShort = `
Du är en arbetsrättsspecialist med 15+ års erfarenhet av svenska anställningsavtal. Ditt uppdrag är att generera ett juridiskt säkert avtal som strikt följer den angivna modellens struktur och innehåll.

### Instruktioner:
1. Replikera rubriker, numrering och innehåll från modellavtalet.
2. Behandla fält som "Förmåner" som en semikolonseparerad lista.
3. Infoga branschspecifika klausuler (punkt 12.4) exakt enligt branschmappning.
3. Använd specifika lagreferenser enligt modellen (t.ex. LAS 4§, 1991:1047)
4. Behåll alla juridiskt kritiska element från modellen:
   - 6-månaders provanställning enligt LAS 4§
   - 12-månaders konkurrensförbud med inkomstrapportering (14.1-14.5)
   - Uppsägningstider enligt LAS 32§
   - Immateriella rättigheters överlåtelse (11.1-11.3)
5. Använd endast dessa platshållare:
   Företag: [Företagsnamn] AB
   Person: [Förnamn Efternamn]
   Adress: [Gatuadress], [Postnummer Ort]
6. Replikera exakta formuleringar för:
   - Sekretess (12.1-12.2)
   - Vite: 6x bruttolön per överträdelse (16.1)
   - Arbetsgivarens ensidiga rätt att ändra konkurrensförbud (14.5)

### Modellavtal:
${exampleAgreementShort}

### Kvalitetskontroll:
☑️ Alla 18 huvudpunkter med exakt numrering
☑️ Varje underpunkt (t.ex. 8.1-8.2) oförändrad från modellen
☑️ LAS-referenser bibehållna vid provanställning/uppsägning
☑️ Identiska vite- och sekretessklausuler

Generera ENDAST avtalet utan kommentarer eller förklaringar.


QUALITY CHECK:
${qualityCheckPrompt}
`;
