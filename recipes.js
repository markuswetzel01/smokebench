// Räucher-Werkstatt – Rezept- & Technikdaten für den Weber Smokey Mountain 57 cm
// Methoden: kalt (<25 °C), warm (25–50 °C), heiss (50–110 °C), bbq (Low & Slow Grill), basis (Grundlagen)

(function () {
  if (typeof window !== "undefined" && window.WSM_DATA) return; // Schutz gegen doppelte Ausführung

const METHODS = [
  { key: "alle",  label: "Alle",            sub: "Alles auf einen Blick" },
  { key: "kalt",  label: "Kalträuchern",    sub: "Schinken · Wurst · Käse · unter 25 °C" },
  { key: "warm",  label: "Warmräuchern",    sub: "Saftig & mild · 25–50 °C" },
  { key: "heiss", label: "Heißräuchern",    sub: "Forelle · Geflügel · 50–110 °C" },
  { key: "bbq",   label: "Low & Slow",      sub: "Pulled Pork · Ribs · Brisket" },
  { key: "basis", label: "Grundlagen",      sub: "Pökeln · Technik · Sicherheit" },
  { key: "dorr",  label: "Dörren",           sub: "Obst · Gemüse · Fleisch · Graef DA506" },
  { key: "grill", label: "Grill & Spieß",     sub: "Weber Kugelgrill · Rössle Gasgrill · Rotisserie" },
  { key: "marinaden", label: "Marinaden",      sub: "Öl · Joghurt · Soja · Bier – für Grill, Smoker & Pfanne" },
];

const METHOD_TAG = {
  kalt:  { label: "Kalt",     color: "#5b6b78" },
  warm:  { label: "Warm",     color: "#b5872f" },
  heiss: { label: "Heiß",     color: "#9a3b1c" },
  bbq:   { label: "Low&Slow", color: "#7a4a22" },
  basis: { label: "Technik",  color: "#5a6b4a" },
  dorr:  { label: "Dörren",    color: "#c47a15" },
  grill: { label: "Grill",     color: "#8a6a3a" },
  marinaden: { label: "Marinade", color: "#6f8c3a" },
};

const DIFF = { 1: "Einfach", 2: "Mittel", 3: "Profi" };

const PHASE_KIND = {
  prep:   { label: "Vorbereitung", color: "#7a6f60" },
  cure:   { label: "Pökeln",       color: "#9a3b1c" },
  rest:   { label: "Durchbrennen", color: "#8a5a2a" },
  dry:    { label: "Abhängen",     color: "#5b6b78" },
  smoke:  { label: "Räuchern",     color: "#6b4a22" },
  cook:   { label: "Garen",        color: "#9a3b1c" },
  mature: { label: "Reifen",       color: "#5a6b4a" },
  finish:   { label: "Finish",       color: "#9a6b2f" },
  marinate: { label: "Marinieren",   color: "#7a5a30" },
  spit:     { label: "Am Spieß",      color: "#8a4a20" },
  indirect: { label: "Indirekt",      color: "#6b5a42" },
  direct:   { label: "Direkt",         color: "#b5491c" },
  air:      { label: "Lufttrocknen",   color: "#5b6b78" },
};

const r = (o) => o; // identity helper for readability

const RECIPES = [
  /* ============================ KALTRÄUCHERN ============================ */
  r({
    id: "schwarzwaelder-schinken", name: "Schwarzwälder Schinken", method: "kalt", cat: "Schinken", diff: 3,
    time: "5–7 Wochen", pit: "15–22 °C", core: "", wood: "Buche + Tanne/Wacholder", yield: "ca. 2,5 kg",
    blurb: "Der Klassiker: trocken gepökelter Schweineschinken, langsam kalt geräuchert. Braucht Zeit – belohnt mit Tiefe.",
    ingredients: [
      { a: "2,5 kg", i: "Schweineschinken (Oberschale/Nuss, küchenfertig)" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "5 g/kg", i: "brauner Zucker" },
      { a: "je 1 TL", i: "Wacholderbeeren, Knoblauch, Koriander, Pfeffer, Lorbeer" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "1 Tag je cm Dicke + 2–3 Tage", temp: "2–7 °C", text: "Fleisch rundum mit der Pökelmischung einreiben und vakuumieren oder dicht schichten.", bullets: ["NPS exakt abwiegen (40 g/kg) – nicht schätzen", "Im Kühlschrank pökeln, täglich wenden", "Austretende Lake bleibt am Fleisch (Vakuum) bzw. wird beim offenen Pökeln abgegossen"] },
      { label: "Durchbrennen", kind: "rest", dur: "10–14 Tage", temp: "2–7 °C", text: "Aus der Lake nehmen, kurz abspülen, trockentupfen. Ohne Salz kühl ruhen lassen, damit sich das Salz gleichmäßig verteilt.", bullets: ["Reift Farbe und Umrötung aus", "Faustregel: halbe Pökelzeit", "Fleisch wird fester und gleichmäßig im Geschmack"] },
      { label: "Abhängen / Trocknen", kind: "dry", dur: "2–4 Tage", temp: "12–15 °C, luftig", text: "An kühlem, luftigem Ort aufhängen, bis die Oberfläche trocken und leicht klebrig ist (Pellicle).", bullets: ["Trockene Oberfläche = Rauch haftet besser", "Zugluft vermeiden (Trockenrand)"] },
      { label: "Räuchergänge", kind: "smoke", dur: "8–12 h je Gang · 5–8 Gänge", temp: "unter 25 °C (ideal 15–20 °C)", text: "In Kaltrauch-Gängen räuchern, dazwischen je 12–24 h Pause zum Auslüften.", bullets: ["Sparbrand/Kaltrauchgenerator mit Buchenmehl", "Pause = Rauch zieht ein, Farbe vertieft sich", "Nie über 25 °C – sonst gerinnt das Eiweiß"] },
      { label: "Reifen", kind: "mature", dur: "1–3 Wochen", temp: "12–15 °C", text: "Nachreifen lassen, bis Aroma rund und Schnittfestigkeit erreicht ist.", bullets: ["Gewichtsverlust ~30–40 % anpeilen", "Je länger, desto intensiver"] },
    ],
    tips: ["Kalträuchern nur in der kalten Jahreszeit (Okt–März) – sonst zu warm.", "Buchenmehl ist Standard; Tanne/Wacholder geben den typischen Schwarzwald-Ton.", "Hygiene ist alles: saubere Hände, saubere Haken, frisches Fleisch vom Metzger."],
  }),
  r({
    id: "lachsschinken", name: "Lachsschinken", method: "kalt", cat: "Schinken", diff: 2,
    time: "2–3 Wochen", pit: "15–22 °C", core: "", wood: "Buche", yield: "ca. 800 g",
    blurb: "Mager, fein und schnell fertig: gepökeltes Schweinelachsfilet, dünn aufgeschnitten ein Genuss.",
    ingredients: [
      { a: "1 kg", i: "Schweinelachs (Rückenfilet, pariert)" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "4 g/kg", i: "Zucker" },
      { a: "je 1 TL", i: "Pfeffer, Wacholder, Knoblauch" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "7–10 Tage", temp: "2–7 °C", text: "Filet einreiben, vakuumieren, kühl pökeln und täglich wenden.", bullets: ["Mageres Fleisch pökelt zügig durch", "Vakuumbeutel spart Platz und Lake"] },
      { label: "Durchbrennen", kind: "rest", dur: "3–4 Tage", temp: "2–7 °C", text: "Abspülen, trocknen, ohne Salz ruhen lassen.", bullets: ["Salzverteilung gleicht sich aus"] },
      { label: "Abhängen", kind: "dry", dur: "1–2 Tage", temp: "12–15 °C", text: "Bis Oberfläche trocken-klebrig ist.", bullets: ["Optional in Kräuter wälzen"] },
      { label: "Räuchergänge", kind: "smoke", dur: "8–10 h · 3–4 Gänge", temp: "unter 25 °C", text: "Mit Pausen kalt räuchern.", bullets: ["3–4 Gänge reichen für mildes Aroma"] },
      { label: "Reifen", kind: "mature", dur: "3–5 Tage", temp: "12–15 °C", text: "Kurz nachreifen, dann hauchdünn schneiden.", bullets: [] },
    ],
    tips: ["Perfekt für Einsteiger ins Kalträuchern – kurze Reifezeit, geringes Risiko.", "Hauchdünn aufschneiden, am besten mit der Maschine."],
  }),
  r({
    id: "nussschinken", name: "Nussschinken", method: "kalt", cat: "Schinken", diff: 2,
    time: "3–4 Wochen", pit: "15–22 °C", core: "", wood: "Buche", yield: "ca. 1 kg",
    blurb: "Aus der Oberschale (Nuss) geschnitten – zart, mager und unkompliziert.",
    ingredients: [
      { a: "1,2 kg", i: "Schweinenuss (Oberschale)" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "5 g/kg", i: "Zucker" },
      { a: "je 1 TL", i: "Pfeffer, Knoblauch, Senfkörner" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "10–12 Tage", temp: "2–7 °C", text: "Einreiben, vakuumieren, wenden.", bullets: ["1 Tag je cm + Reserve"] },
      { label: "Durchbrennen", kind: "rest", dur: "5–6 Tage", temp: "2–7 °C", text: "Abspülen, trocknen, ruhen.", bullets: [] },
      { label: "Abhängen", kind: "dry", dur: "2 Tage", temp: "12–15 °C", text: "Pellicle bilden.", bullets: [] },
      { label: "Räuchergänge", kind: "smoke", dur: "10 h · 4–5 Gänge", temp: "unter 25 °C", text: "Mit Pausen räuchern.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "1 Woche", temp: "12–15 °C", text: "Nachreifen.", bullets: [] },
    ],
    tips: ["Günstiges Stück mit gutem Ergebnis – ideal zum Üben."],
  }),
  r({
    id: "coppa", name: "Coppa (Schweinenacken)", method: "kalt", cat: "Schinken", diff: 3,
    time: "6–8 Wochen", pit: "15–20 °C", core: "", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Italienischer Klassiker aus dem Nacken – marmoriert, würzig, luftgetrocknet mit dezentem Rauch.",
    ingredients: [
      { a: "1,8 kg", i: "Schweinenacken am Stück, ohne Knochen" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "schwarzer Pfeffer, Fenchelsaat, Knoblauch, Wein" },
      { a: "1", i: "Schweine-Saumagen oder Kunstdarm (Kaliber 90+)" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "12–16 Tage", temp: "2–7 °C", text: "Würzmischung einmassieren, vakuumieren, täglich wenden.", bullets: ["Marmorierung macht Coppa saftig"] },
      { label: "Durchbrennen", kind: "rest", dur: "6–8 Tage", temp: "2–7 °C", text: "Abspülen, würzen, ruhen.", bullets: [] },
      { label: "In Darm füllen", kind: "prep", dur: "30 min", temp: "kühl", text: "In Darm pressen, abbinden, anstechen.", bullets: ["Luftblasen ausstreichen"] },
      { label: "Räuchergänge", kind: "smoke", dur: "8 h · 4–6 Gänge", temp: "unter 22 °C", text: "Dezent kalt räuchern.", bullets: ["Coppa lebt eher von Luft als von Rauch"] },
      { label: "Reifen / Trocknen", kind: "mature", dur: "4–6 Wochen", temp: "12–15 °C, 75 % rF", text: "Reifen bis ~35 % Gewichtsverlust.", bullets: ["Gleichmäßige Trocknung wichtig", "Bei Trockenrand kurz höher anfeuchten"] },
    ],
    tips: ["Reifekammer oder kühler Keller mit Luftfeuchte ideal.", "Edelschimmel (weiß) ist erwünscht – grün/schwarz abwischen mit Salzlake."],
  }),
  r({
    id: "buendnerfleisch", name: "Bündnerfleisch (Rind)", method: "kalt", cat: "Rind", diff: 3,
    time: "6–8 Wochen", pit: "15–20 °C", core: "", wood: "Buche (sehr dezent)", yield: "ca. 1 kg",
    blurb: "Mageres Rindfleisch, luftgetrocknet, klassisch eigentlich ungeräuchert – hier mit Hauch Rauch.",
    ingredients: [
      { a: "1,3 kg", i: "Rinderhüfte/Oberschale, mager pariert" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Wacholder, Lorbeer, Knoblauch, Pfeffer, Rotwein" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "14–18 Tage", temp: "2–7 °C", text: "Würzig pökeln, regelmäßig wenden.", bullets: [] },
      { label: "Durchbrennen", kind: "rest", dur: "7 Tage", temp: "2–7 °C", text: "Ruhen lassen.", bullets: [] },
      { label: "Pressen & Trocknen", kind: "dry", dur: "1 Woche", temp: "12–15 °C", text: "Zwischendurch pressen, damit es die typische rechteckige Form bekommt.", bullets: [] },
      { label: "Räuchern (optional)", kind: "smoke", dur: "6 h · 2–3 Gänge", temp: "unter 20 °C", text: "Nur ein Hauch Rauch.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "4–6 Wochen", temp: "12–15 °C", text: "Bis ~45 % Gewichtsverlust trocknen.", bullets: [] },
    ],
    tips: ["Original Bündnerfleisch ist ungeräuchert – Rauch ist Geschmackssache.", "Hauchdünn schneiden, leicht überlappend servieren."],
  }),
  r({
    id: "kalter-raeucherlachs", name: "Kaltgeräucherter Lachs", method: "kalt", cat: "Fisch", diff: 2,
    time: "2–3 Tage", pit: "unter 25 °C", core: "", wood: "Buche / Erle", yield: "1 Seite",
    blurb: "Seidiger Räucherlachs nach Skandi-Art: erst beizen, dann kalt räuchern.",
    ingredients: [
      { a: "1", i: "Lachsseite mit Haut, entgrätet (Sushi-/Sashimi-Qualität)" },
      { a: "200 g : 100 g", i: "Meersalz : Zucker (Trockenbeize)" },
      { a: "je 1 TL", i: "Dill, Pfeffer, Zitronenschale, Wacholder" },
    ],
    phases: [
      { label: "Beizen", kind: "cure", dur: "12–24 h", temp: "0–4 °C", text: "Mit Salz-Zucker-Mischung bedecken, beschweren, kühlen.", bullets: ["Dickere Seite = länger beizen", "Austretende Flüssigkeit abgießen"] },
      { label: "Abspülen & Trocknen", kind: "dry", dur: "4–12 h", temp: "kühl, luftig", text: "Kurz abspülen, trockentupfen, offen im Kühlschrank trocknen bis Pellicle.", bullets: ["Glänzende, klebrige Oberfläche bildet sich"] },
      { label: "Kalt räuchern", kind: "smoke", dur: "6–12 h (1–2 Gänge)", temp: "unter 25 °C, ideal 15–20 °C", text: "Sanft kalt räuchern, je nach gewünschter Intensität.", bullets: ["Dünner, kühler Rauch", "Bei Wärme: Eisschale in den Smoker"] },
      { label: "Reifen", kind: "mature", dur: "12–24 h", temp: "0–4 °C", text: "Kühl ruhen lassen, dann dünn aufschneiden.", bullets: [] },
    ],
    tips: ["Nur sehr frischen Fisch in Sashimi-Qualität verwenden.", "Im Sommer schwierig – Temperatur unter 25 °C halten ist Pflicht."],
  }),
  r({
    id: "bacon", name: "Bacon / Frühstücksspeck", method: "kalt", cat: "Speck", diff: 2,
    time: "2–3 Wochen", pit: "15–22 °C", core: "", wood: "Hickory / Buche", yield: "ca. 1,5 kg",
    blurb: "Hausgemachter Bacon aus dem Schweinebauch – knusprig gebraten unschlagbar.",
    ingredients: [
      { a: "1,8 kg", i: "Schweinebauch ohne Knochen, ohne Schwarte" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "8 g/kg", i: "brauner Zucker / Ahornsirup" },
      { a: "je 1 TL", i: "Pfeffer, Paprika, Knoblauch" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "7–10 Tage", temp: "2–7 °C", text: "Einreiben, vakuumieren, täglich wenden.", bullets: [] },
      { label: "Durchbrennen", kind: "rest", dur: "2–3 Tage", temp: "2–7 °C", text: "Abspülen, trocknen, ruhen.", bullets: [] },
      { label: "Abhängen", kind: "dry", dur: "1 Tag", temp: "12–15 °C", text: "Pellicle bilden.", bullets: [] },
      { label: "Räuchergänge", kind: "smoke", dur: "8 h · 2–3 Gänge", temp: "unter 25 °C", text: "Kräftig kalt räuchern.", bullets: ["Hickory gibt das typische US-Aroma"] },
      { label: "Reifen", kind: "mature", dur: "2–3 Tage", temp: "kühl", text: "Vor dem Schneiden anfrieren – schneidet besser.", bullets: [] },
    ],
    tips: ["Roh nicht verzehren – Bacon immer durchbraten.", "Auch warm/heiß machbar: dann garziehen statt nur räuchern."],
  }),
  r({
    id: "raeucherspeck", name: "Bauchspeck (durchwachsen)", method: "kalt", cat: "Speck", diff: 2,
    time: "3–4 Wochen", pit: "15–20 °C", core: "", wood: "Buche + Wacholder", yield: "ca. 1,5 kg",
    blurb: "Deftiger geräucherter Bauchspeck – wie vom Bauernhof, zum Brotzeitbrett.",
    ingredients: [
      { a: "1,8 kg", i: "Schweinebauch mit Schwarte" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Wacholder, Lorbeer, Knoblauch, Pfeffer" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "10–14 Tage", temp: "2–7 °C", text: "Würzig pökeln, wenden.", bullets: [] },
      { label: "Durchbrennen", kind: "rest", dur: "5 Tage", temp: "2–7 °C", text: "Ruhen lassen.", bullets: [] },
      { label: "Abhängen", kind: "dry", dur: "2 Tage", temp: "12–15 °C", text: "Trocknen.", bullets: [] },
      { label: "Räuchergänge", kind: "smoke", dur: "10 h · 4–6 Gänge", temp: "unter 22 °C", text: "Kräftig kalt räuchern.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "1–2 Wochen", temp: "12–15 °C", text: "Durchziehen lassen.", bullets: [] },
    ],
    tips: ["Schwarte dranlassen – schützt und gibt Biss.", "Dünn geschnitten roh als Brotzeit oder ausgelassen zum Anbraten."],
  }),
  r({
    id: "mettenden", name: "Mettenden / Mettwurst", method: "kalt", cat: "Wurst", diff: 3,
    time: "2–3 Wochen", pit: "15–20 °C", core: "", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Schnittfeste, geräucherte Rohwurst – würzig und herzhaft.",
    ingredients: [
      { a: "1,2 kg", i: "Schweinefleisch (mager)" },
      { a: "0,6 kg", i: "Rückenspeck" },
      { a: "28 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Pfeffer, Knoblauch, Senfkörner, etwas Zucker, Reifekultur" },
      { a: "1", i: "Schweinedarm (Kaliber 32+)" },
    ],
    phases: [
      { label: "Wolfen & Würzen", kind: "prep", dur: "1 h", temp: "unter 2 °C", text: "Fleisch und Speck eiskalt durchwolfen, mit NPS und Gewürzen sowie Reifekultur kneten.", bullets: ["Alles eiskalt halten – sonst schmiert es", "GdL/Reifekultur für sichere Säuerung"] },
      { label: "Füllen & Abbinden", kind: "prep", dur: "30 min", temp: "kühl", text: "Stramm füllen, abbinden, anstechen.", bullets: ["Keine Luftblasen"] },
      { label: "Umröten / Reifen", kind: "rest", dur: "1–2 Tage", temp: "20–24 °C", text: "Kurze warme Reife zur Umrötung und Säuerung.", bullets: ["Hohe Luftfeuchte (90 %)"] },
      { label: "Räuchergänge", kind: "smoke", dur: "6–8 h · 3–5 Gänge", temp: "unter 22 °C", text: "Kalt räuchern mit Pausen.", bullets: [] },
      { label: "Trocknen / Reifen", kind: "mature", dur: "1–2 Wochen", temp: "14–16 °C", text: "Bis Schnittfestigkeit reifen (~25–30 % Verlust).", bullets: [] },
    ],
    tips: ["Rohwurst ist anspruchsvoll – Hygiene und Temperaturen ernst nehmen.", "Starterkulturen senken das Risiko deutlich."],
  }),
  r({
    id: "salami", name: "Salami (luftgetrocknet)", method: "kalt", cat: "Wurst", diff: 3,
    time: "4–6 Wochen", pit: "15–18 °C", core: "", wood: "Buche (dezent)", yield: "ca. 2 kg",
    blurb: "Edelschimmel-Salami: fermentiert, kalt geräuchert, luftgetrocknet.",
    ingredients: [
      { a: "1,4 kg", i: "Schweinefleisch (mager)" },
      { a: "0,6 kg", i: "Rückenspeck" },
      { a: "28 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Pfeffer, Knoblauch, Rotwein, Zucker, Starterkultur" },
      { a: "1", i: "Edelschimmelkultur + Kunst-/Naturdarm Kaliber 50+" },
    ],
    phases: [
      { label: "Wolfen & Würzen", kind: "prep", dur: "1 h", temp: "unter 2 °C", text: "Eiskalt wolfen, mit Kultur und Gewürzen mischen.", bullets: ["Definierte Speckwürfel = sauberes Schnittbild"] },
      { label: "Füllen", kind: "prep", dur: "30 min", temp: "kühl", text: "Stramm füllen, abbinden, mit Edelschimmel impfen.", bullets: [] },
      { label: "Fermentieren", kind: "rest", dur: "2–3 Tage", temp: "22–24 °C, 90 % rF", text: "Warme Reife für Säuerung und Umrötung.", bullets: ["pH-Absenkung schützt vor Keimen"] },
      { label: "Räuchergänge (optional)", kind: "smoke", dur: "4–6 h · 2–3 Gänge", temp: "unter 20 °C", text: "Dezent kalt räuchern.", bullets: [] },
      { label: "Reifen / Trocknen", kind: "mature", dur: "4–6 Wochen", temp: "14–16 °C, 75–80 % rF", text: "Langsam trocknen bis ~30 % Verlust.", bullets: ["Weißer Edelschimmel erwünscht"] },
    ],
    tips: ["Klima konstant halten – zu schnelles Trocknen gibt Trockenrand.", "Starterkultur dringend empfohlen für Sicherheit."],
  }),
  r({
    id: "raeucherkaese", name: "Räucherkäse", method: "kalt", cat: "Käse", diff: 1,
    time: "1 Tag + Reife", pit: "unter 25 °C", core: "", wood: "Buche / Erle / Kirsche", yield: "beliebig",
    blurb: "Gouda, Bergkäse oder Cheddar im Kaltrauch – schnelles, dankbares Projekt.",
    ingredients: [
      { a: "500–800 g", i: "fester Käse am Stück (Gouda, Bergkäse, Cheddar)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "30 min", temp: "kühl", text: "Käse in Stücke schneiden, auf Gitter, Oberfläche trocken.", bullets: ["Käse vorher 1 h kühl antrocknen"] },
      { label: "Kalt räuchern", kind: "smoke", dur: "2–4 h", temp: "unter 25 °C (ideal <18 °C)", text: "Mit dünnem Kaltrauch räuchern, gelegentlich wenden.", bullets: ["Käse darf nicht schwitzen/schmelzen", "Eisschale gegen Wärme im Sommer"] },
      { label: "Reifen", kind: "mature", dur: "1–2 Wochen", temp: "Kühlschrank, vakuumiert", text: "Vakuumieren und reifen – Rauch zieht ein und wird milder.", bullets: ["Frisch schmeckt es oft scharf/aschig", "Nach 1 Woche rund und ausgewogen"] },
    ],
    tips: ["Idealer Einstieg ins Kalträuchern – kurz, einfach, lecker.", "Nicht über 25 °C, sonst schwitzt der Käse Fett aus."],
  }),
  r({
    id: "raeuchertofu", name: "Räuchertofu", method: "kalt", cat: "Vegetarisch", diff: 1,
    time: "1 Tag", pit: "unter 25 °C", core: "", wood: "Buche / Erle", yield: "beliebig",
    blurb: "Vegetarisch und schnell: marinierter, gepresster Tofu mit echtem Räucheraroma.",
    ingredients: [
      { a: "400 g", i: "fester Naturtofu" },
      { a: "3 EL + je 1 TL", i: "Sojasauce, Knoblauch, Pfeffer (Marinade)" },
    ],
    phases: [
      { label: "Pressen & Marinieren", kind: "prep", dur: "2–12 h", temp: "kühl", text: "Tofu pressen, marinieren, anschließend trocken tupfen.", bullets: ["Pressen entzieht Wasser – nimmt Rauch besser an"] },
      { label: "Antrocknen", kind: "dry", dur: "1–2 h", temp: "kühl, luftig", text: "Oberfläche trocknen lassen.", bullets: [] },
      { label: "Kalt räuchern", kind: "smoke", dur: "2–4 h", temp: "unter 25 °C", text: "Mit Kaltrauch aromatisieren.", bullets: [] },
    ],
    tips: ["Danach kurz anbraten für Röstaromen.", "Hält vakuumiert über eine Woche."],
  }),
  r({
    id: "raeuchersalz", name: "Räuchersalz", method: "kalt", cat: "Würzen & Extras", diff: 1,
    time: "4–8 h", pit: "unter 25 °C", core: "", wood: "Buche / Hickory", yield: "beliebig",
    blurb: "Würzbombe für die Küche: grobes Salz im Kaltrauch.",
    ingredients: [ { a: "300 g", i: "grobes Meersalz" } ],
    phases: [
      { label: "Ausbreiten", kind: "prep", dur: "5 min", temp: "kalt", text: "Salz dünn auf Blech/Schale verteilen.", bullets: [] },
      { label: "Kalt räuchern", kind: "smoke", dur: "4–8 h", temp: "unter 25 °C", text: "Räuchern, ab und zu umrühren.", bullets: ["Je länger, desto intensiver"] },
    ],
    tips: ["Perfekt, um nebenbei beim Käse-/Schinkenräuchern mitzumachen.", "Auch mit Zucker, Pfeffer oder Paprika möglich."],
  }),
  r({
    id: "raeucherknoblauch", name: "Geräucherter Knoblauch", method: "kalt", cat: "Würzen & Extras", diff: 1,
    time: "4–6 h", pit: "unter 25 °C", core: "", wood: "Buche / Kirsche", yield: "beliebig",
    blurb: "Aromatischer Knoblauch fürs Würzen – mild und rauchig.",
    ingredients: [ { a: "4–6 Stück", i: "ganze Knoblauchknollen" } ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "5 min", temp: "kühl", text: "Knollen halbieren oder ganz lassen.", bullets: [] },
      { label: "Kalt räuchern", kind: "smoke", dur: "4–6 h", temp: "unter 25 °C", text: "Sanft räuchern.", bullets: [] },
    ],
    tips: ["Danach trocken und kühl lagern.", "Auch als Knoblauchpulver weiterverarbeitbar."],
  }),

  /* ============================ WARMRÄUCHERN ============================ */
  r({
    id: "warm-forelle", name: "Warmgeräucherte Forelle", method: "warm", cat: "Fisch", diff: 2,
    time: "1 Tag + 3 h", pit: "30–45 °C → kurz 60 °C", core: "63 °C", wood: "Buche / Erle", yield: "4 Forellen",
    blurb: "Besonders saftig: erst lange warm, am Ende kurz heißer zum Garziehen.",
    ingredients: [
      { a: "4", i: "Forellen, ausgenommen" },
      { a: "60 g/l", i: "Salz (Nasslake)" },
      { a: "je 1 TL + 1 Stk", i: "Lorbeer, Wacholder, Pfeffer, Zwiebel" },
    ],
    phases: [
      { label: "Lake / Salzen", kind: "cure", dur: "8–12 h", temp: "0–7 °C", text: "Forellen in Salzlake (6 %) einlegen.", bullets: ["Innen und außen lake-bedeckt"] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "luftig", text: "Abspülen, aufhängen, Haut trocknen bis sie matt-klebrig ist.", bullets: ["Trockene Haut = goldene Farbe"] },
      { label: "Warm anräuchern", kind: "smoke", dur: "2 h", temp: "30–45 °C", text: "Sanft warm räuchern – Fisch bleibt saftig.", bullets: ["Niedrige Temperatur = zarte Konsistenz"] },
      { label: "Garziehen", kind: "cook", dur: "20–40 min", temp: "kurz auf 60–70 °C", text: "Zum Schluss heißer, bis Kern 63 °C erreicht.", bullets: ["Rückenflosse löst sich leicht = gar"] },
    ],
    tips: ["Warm + Finish heiß ist der saftigste Kompromiss.", "Erle gibt den klassischen Fisch-Räucherton."],
  }),
  r({
    id: "warm-kassler", name: "Warmgeräuchertes Kassler", method: "warm", cat: "Schwein", diff: 2,
    time: "1 Woche + 3 h", pit: "40–55 °C", core: "65 °C", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Gepökeltes Kotelett/Karree, warm geräuchert – das Original für Sauerkraut & Co.",
    ingredients: [
      { a: "1,8 kg", i: "Schweinekarree/Kotelett" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Pfeffer, Wacholder, Knoblauch" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "5–7 Tage", temp: "2–7 °C", text: "Trocken oder nass pökeln.", bullets: [] },
      { label: "Durchbrennen", kind: "rest", dur: "2 Tage", temp: "2–7 °C", text: "Ruhen lassen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "2–4 h", temp: "luftig", text: "Oberfläche trocknen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "2–3 h", temp: "40–55 °C", text: "Räuchern bis goldbraun.", bullets: [] },
      { label: "Garziehen", kind: "cook", dur: "1 h", temp: "70–80 °C", text: "Auf Kern 65 °C bringen.", bullets: ["Danach gekühlt aufschneiden"] },
    ],
    tips: ["Kassler kann roh verarbeitet weiterverwendet werden (es ist gegart).", "Klassisch zu Kraut, Erbspüree oder als Schnitte."],
  }),
  r({
    id: "warm-raclette", name: "Warmgeräucherter Käse (mild)", method: "warm", cat: "Käse", diff: 1,
    time: "2–3 h", pit: "30–40 °C", core: "", wood: "Buche / Kirsche", yield: "beliebig",
    blurb: "Für weichere Käse, die etwas Wärme vertragen – cremiger Rauchton.",
    ingredients: [ { a: "500 g", i: "halbfester Käse (Raclette, junger Gouda)" } ],
    phases: [
      { label: "Antrocknen", kind: "prep", dur: "30 min", temp: "kühl", text: "Oberfläche trocknen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "1–2 h", temp: "max. 40 °C", text: "Vorsichtig räuchern, beobachten.", bullets: ["Bei Fettaustritt sofort kühler werden"] },
      { label: "Reifen", kind: "mature", dur: "3–5 Tage", temp: "Kühlschrank", text: "Vakuumiert ruhen lassen.", bullets: [] },
    ],
    tips: ["Nur bei kühlem Wetter – warme Tage lassen den Käse schmelzen."],
  }),

  /* ============================ HEISSRÄUCHERN ============================ */
  r({
    id: "raeucherforelle", name: "Klassische Räucherforelle", method: "heiss", cat: "Fisch", diff: 1,
    time: "1 Tag + 1,5 h", pit: "80–110 °C", core: "63 °C", wood: "Erle / Buche", yield: "4 Forellen",
    blurb: "Der Räucher-Klassiker schlechthin – goldgelb, saftig, in unter zwei Stunden gar.",
    ingredients: [
      { a: "4", i: "Forellen, ausgenommen" },
      { a: "60 g/l", i: "Salz (Nasslake 6 %)" },
      { a: "je 1 TL + 1 Stk", i: "Lorbeer, Wacholder, Pfeffer, Zwiebel, Zitrone" },
    ],
    phases: [
      { label: "Salzlake", kind: "cure", dur: "8–12 h", temp: "0–7 °C", text: "In 6 %-Lake legen, kühlen.", bullets: ["Pro Liter Wasser 60 g Salz"] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "luftig", text: "Abspülen, aufhängen, Haut antrocknen.", bullets: ["Wichtig für Farbe und Glanz"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "30–60 min", temp: "80–110 °C", text: "Erst ohne, dann mit Räuchermehl/Chips. Garen bis Kern 63 °C.", bullets: ["Rückenflosse lässt sich leicht ziehen = gar", "Bauchlappen mit Zahnstocher spreizen"] },
    ],
    tips: ["Im WSM ohne Wasserschale arbeiten, damit es heiß genug wird.", "Forellen am Schwanz aufhängen oder auf gut geöltes Gitter legen."],
  }),
  r({
    id: "raeuchermakrele", name: "Geräucherte Makrele", method: "heiss", cat: "Fisch", diff: 1,
    time: "1 Tag + 1 h", pit: "90–110 °C", core: "65 °C", wood: "Buche / Erle", yield: "4 Stück",
    blurb: "Fett und aromatisch – nimmt Rauch wunderbar auf, kaum zu trocken zu bekommen.",
    ingredients: [
      { a: "4", i: "Makrelen, ausgenommen" },
      { a: "60 g/l", i: "Salz (Lake)" },
      { a: "je 1 TL", i: "Pfeffer, Lorbeer, Knoblauch" },
    ],
    phases: [
      { label: "Lake", kind: "cure", dur: "6–10 h", temp: "0–7 °C", text: "In Salzlake einlegen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "1 h", temp: "luftig", text: "Haut antrocknen.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "45–60 min", temp: "90–110 °C", text: "Garen bis Kern 65 °C.", bullets: [] },
    ],
    tips: ["Durch hohen Fettgehalt sehr gutmütig – ideal für Anfänger."],
  }),
  r({
    id: "heiss-lachs", name: "Heißgeräucherter Lachs", method: "heiss", cat: "Fisch", diff: 2,
    time: "1 Tag + 1,5 h", pit: "70–90 °C", core: "60 °C", wood: "Erle / Kirsche", yield: "1 Seite",
    blurb: "Flockig-saftig, mit feinem Rauch – wunderbar warm oder kalt.",
    ingredients: [
      { a: "1", i: "Lachsseite mit Haut, entgrätet" },
      { a: "200 g : 100 g", i: "Salz : Zucker (Trockenbeize)" },
      { a: "je 1 TL", i: "Dill, Pfeffer, Zitronenschale" },
    ],
    phases: [
      { label: "Beizen", kind: "cure", dur: "4–8 h", temp: "0–4 °C", text: "Mit Salz-Zucker-Mischung beizen.", bullets: ["Kurz, da nur Würze gewünscht"] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "kühl, luftig", text: "Abspülen, Pellicle bilden.", bullets: ["Glänzende Oberfläche bindet den Rauch"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "45–90 min", temp: "70–90 °C", text: "Sanft garen bis Kern 60 °C.", bullets: ["Nicht überhitzen – sonst tritt weißes Eiweiß aus"] },
    ],
    tips: ["Auf der Haut räuchern – hält den Fisch zusammen.", "60 °C Kern gibt den saftigsten Punkt."],
  }),
  r({
    id: "raeucherhaehnchen", name: "Räucherhähnchen (ganz)", method: "heiss", cat: "Geflügel", diff: 2,
    time: "1 Tag + 3 h", pit: "120–140 °C", core: "75 °C (Brust)", wood: "Kirsche / Apfel", yield: "1 Hähnchen",
    blurb: "Knusprige Haut, saftiges Fleisch – durch Trockenpökeln (Dry Brine) perfekt gewürzt.",
    ingredients: [
      { a: "1", i: "Hähnchen (1,5–1,8 kg)" },
      { a: "12 g/kg", i: "Salz (Dry Brine)" },
      { a: "je 1 TL", i: "Paprika, Knoblauch, Pfeffer, Zucker (Rub)" },
    ],
    phases: [
      { label: "Dry Brine", kind: "cure", dur: "12–24 h", temp: "Kühlschrank, offen", text: "Salzen und offen kühlen – würzt durch und trocknet die Haut.", bullets: ["Offen lagern = knusprige Haut später"] },
      { label: "Würzen", kind: "prep", dur: "15 min", temp: "—", text: "Mit Rub einreiben, evtl. Spreizen.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "2–3 h", temp: "120–140 °C", text: "Garen bis Brust 75 °C, Keule 80–85 °C.", bullets: ["Geflügel braucht höhere Pit-Temp für knusprige Haut", "Wasserschale leer/heiß lassen"] },
    ],
    tips: ["Geflügel nie unter 75 °C Kern – Salmonellengefahr.", "Apfel-/Kirschholz passt mild zu hellem Fleisch."],
  }),
  r({
    id: "beer-can-chicken", name: "Beer Can Chicken", method: "heiss", cat: "Geflügel", diff: 1,
    time: "2,5 h", pit: "140–160 °C", core: "75 °C (Brust)", wood: "Apfel / Buche", yield: "1 Hähnchen",
    blurb: "Hähnchen aufrecht auf der Dose – Dampf von innen, Rauch von außen.",
    ingredients: [
      { a: "1", i: "Hähnchen (1,5 kg)" },
      { a: "1", i: "halbvolle Bierdose (oder Halter mit Brühe)" },
      { a: "3–4 EL", i: "BBQ-Rub" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "15 min", temp: "—", text: "Innen und außen mit Rub einreiben.", bullets: ["Optional über Nacht würzen"] },
      { label: "Aufsetzen", kind: "prep", dur: "5 min", temp: "—", text: "Hähnchen aufrecht auf Dose/Halter setzen, stabil stellen.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "2–2,5 h", temp: "140–160 °C", text: "Garen bis Brust 75 °C.", bullets: ["Dampf hält das Fleisch saftig"] },
    ],
    tips: ["Einfach und gelingsicher – top für Gäste.", "Standfest aufstellen, sonst kippt es."],
  }),
  r({
    id: "raeucherente", name: "Geräucherte Entenbrust", method: "heiss", cat: "Geflügel", diff: 2,
    time: "1 Tag + 1,5 h", pit: "120–140 °C", core: "62 °C (rosa)", wood: "Kirsche / Buche", yield: "2 Stück",
    blurb: "Rosa gegart, kräftig im Aroma – Haut rautenförmig eingeschnitten.",
    ingredients: [
      { a: "2", i: "Entenbrüste" },
      { a: "12 g/kg", i: "Salz" },
      { a: "2 EL Honig + 1 Orange", i: "Pfeffer, Orange, Honig" },
    ],
    phases: [
      { label: "Dry Brine", kind: "cure", dur: "8–12 h", temp: "Kühlschrank", text: "Salzen, Haut rautenförmig einschneiden.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "60–90 min", temp: "120–140 °C", text: "Garen bis Kern 62 °C für rosa.", bullets: ["Haut zum Schluss scharf nachbraten für Knusprigkeit"] },
    ],
    tips: ["Rosa bei 62 °C, durch bei 70 °C.", "Honig-Orangen-Glasur passt hervorragend."],
  }),
  r({
    id: "raeuchergarnelen", name: "Geräucherte Garnelen", method: "heiss", cat: "Fisch", diff: 1,
    time: "1 h", pit: "100–120 °C", core: "—", wood: "Kirsche / Erle", yield: "ca. 500 g",
    blurb: "In Minuten fertig, perfekt als Vorspeise oder Salat-Topping.",
    ingredients: [
      { a: "500 g", i: "große Garnelen, geschält, entdarmt" },
      { a: "2–3 EL", i: "Olivenöl, Knoblauch, Paprika, Salz" },
    ],
    phases: [
      { label: "Marinieren", kind: "prep", dur: "30 min", temp: "kühl", text: "In Öl-Gewürzmarinade wenden.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "15–25 min", temp: "100–120 °C", text: "Räuchern bis sie sich kringeln und undurchsichtig sind.", bullets: ["Nicht übergaren – werden sonst gummiartig"] },
    ],
    tips: ["Schnellster Räuchersnack überhaupt.", "Mit Zitrone und Aioli servieren."],
  }),

  /* ============================ LOW & SLOW BBQ ============================ */
  r({
    id: "pulled-pork", name: "Pulled Pork", method: "bbq", cat: "Schwein", diff: 2,
    time: "12–16 h", pit: "110–120 °C", core: "92–94 °C", wood: "Hickory / Apfel", yield: "ca. 2,5 kg",
    blurb: "Der WSM-Klassiker: Schweinenacken stundenlang bis butterzart, dann gezupft.",
    ingredients: [
      { a: "3 kg", i: "Schweinenacken (Boston Butt), mit Fettdeckel" },
      { a: "2 EL + 4 EL", i: "Senf (Binder) + BBQ-Rub (Paprika, Zucker, Salz, Pfeffer, Knoblauch)" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "1–12 h", temp: "Kühlschrank", text: "Dünn mit Senf einstreichen, kräftig rubben, ruhen lassen.", bullets: ["Über Nacht würzen vertieft den Geschmack"] },
      { label: "Räuchern", kind: "smoke", dur: "6–8 h", temp: "110–120 °C", text: "Mit Minion-Methode + Wasserschale anlegen, räuchern bis Bark steht.", bullets: ["Stabile Glut über Minion-Ring", "Wasserschale puffert die Temperatur"] },
      { label: "Texas Crutch (Stall)", kind: "cook", dur: "3–5 h", temp: "110–120 °C", text: "Bei ~68 °C Kern (Stall) in Folie/Butcher Paper wickeln, weitergaren.", bullets: ["Folie bricht den Stall und beschleunigt", "Butcher Paper hält die Bark knuspriger"] },
      { label: "Ziehen lassen", kind: "rest", dur: "1–2 h", temp: "Kühlbox", text: "Bei 92–94 °C Kern entnehmen, eingewickelt in Kühlbox ruhen lassen.", bullets: ["Ruhephase macht es erst richtig saftig"] },
      { label: "Pullen", kind: "finish", dur: "15 min", temp: "—", text: "Mit Krallen/Gabeln zerzupfen, mit Saft und etwas Sauce mischen.", bullets: ["Knochen muss sich leicht lösen lassen"] },
    ],
    tips: ["Kerntemperatur entscheidet, nicht die Uhr – plane Puffer ein.", "Wasserschale im WSM macht die lange Temperaturführung kinderleicht."],
  }),
  r({
    id: "baby-back-ribs", name: "Baby Back Ribs (2-2-1)", method: "bbq", cat: "Schwein", diff: 2,
    time: "5–6 h", pit: "110–120 °C", core: "—", wood: "Apfel / Kirsche", yield: "2 Leitern",
    blurb: "Zarte Kotelettrippchen nach der bewährten 2-2-1-Methode.",
    ingredients: [
      { a: "2", i: "Leitern Baby Back Ribs" },
      { a: "2 EL + 4 EL", i: "Senf + Rub, Butter, brauner Zucker, Honig, BBQ-Sauce" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "20 min", temp: "—", text: "Silberhaut abziehen, würzen.", bullets: ["Silberhaut muss weg – sonst zäh"] },
      { label: "Offen räuchern", kind: "smoke", dur: "2 h", temp: "110–120 °C", text: "Rauch aufnehmen, Bark bilden.", bullets: [] },
      { label: "Dämpfen (Folie)", kind: "cook", dur: "2 h", temp: "110–120 °C", text: "In Folie mit Butter, Zucker, Honig einpacken – wird zart.", bullets: ["Flüssigkeit dämpft das Fleisch mürbe"] },
      { label: "Glasieren", kind: "finish", dur: "1 h", temp: "110–120 °C", text: "Auspacken, mit Sauce glasieren, antrocknen lassen.", bullets: ["Bend-Test: Ribs biegen und reißen leicht an"] },
    ],
    tips: ["Baby Backs sind kleiner als Spareribs – daher 2-2-1 statt 3-2-1.", "Glasur erst zum Schluss – Zucker verbrennt sonst."],
  }),
  r({
    id: "spareribs", name: "Spareribs St. Louis (3-2-1)", method: "bbq", cat: "Schwein", diff: 2,
    time: "6 h", pit: "110–120 °C", core: "—", wood: "Hickory / Apfel", yield: "2 Leitern",
    blurb: "Die kräftigeren Bauchrippen – nach 3-2-1 fallen sie fast vom Knochen.",
    ingredients: [
      { a: "2", i: "Leitern Spareribs (St. Louis Cut)" },
      { a: "2 EL + 4 EL", i: "Senf + Rub, Butter, Zucker, Honig, Apfelsaft, BBQ-Sauce" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "20 min", temp: "—", text: "Silberhaut abziehen, würzen.", bullets: [] },
      { label: "Offen räuchern", kind: "smoke", dur: "3 h", temp: "110–120 °C", text: "Rauch und Bark.", bullets: [] },
      { label: "Dämpfen (Folie)", kind: "cook", dur: "2 h", temp: "110–120 °C", text: "Mit Butter/Zucker/Saft einpacken.", bullets: [] },
      { label: "Glasieren", kind: "finish", dur: "1 h", temp: "110–120 °C", text: "Auspacken, glasieren, antrocknen.", bullets: [] },
    ],
    tips: ["3-2-1 ist sehr weich (fall-off-bone); für mehr Biss 3-1-1 probieren."],
  }),
  r({
    id: "brisket", name: "Beef Brisket", method: "bbq", cat: "Rind", diff: 3,
    time: "12–18 h", pit: "110–120 °C", core: "90–96 °C", wood: "Eiche / Hickory", yield: "ca. 4 kg",
    blurb: "Die Königsdisziplin: ganze Rinderbrust, Geduld und Gefühl.",
    ingredients: [
      { a: "5 kg", i: "Brisket (Packer Cut, Flat + Point)" },
      { a: "je 3 EL", i: "grobes Salz + grober Pfeffer (Texas-Style)" },
    ],
    phases: [
      { label: "Trimmen & Würzen", kind: "prep", dur: "30 min", temp: "—", text: "Fettkappe auf ~6 mm trimmen, großzügig mit Salz/Pfeffer rubben.", bullets: ["Gleichmäßige Form gart gleichmäßig"] },
      { label: "Räuchern", kind: "smoke", dur: "6–8 h", temp: "110–120 °C", text: "Mit Eiche/Hickory bis Bark und ~68 °C Kern.", bullets: ["Stabile, lange Glut über Minion"] },
      { label: "Wickeln", kind: "cook", dur: "4–6 h", temp: "110–120 °C", text: "Im Stall in Butcher Paper wickeln, weiter bis 90–96 °C.", bullets: ["Probe: Thermometer gleitet wie in Butter"] },
      { label: "Ruhen", kind: "rest", dur: "1–3 h", temp: "Kühlbox / 60 °C Ofen", text: "Lange ruhen lassen – entscheidend für Saftigkeit.", bullets: ["Mindestens 1 h, besser länger"] },
      { label: "Schneiden", kind: "finish", dur: "15 min", temp: "—", text: "Quer zur Faser schneiden, Point und Flat getrennt.", bullets: ["Faserrichtung wechselt zwischen Flat und Point"] },
    ],
    tips: ["Brisket verzeiht wenig – Thermometer und Geduld sind Pflicht.", "Gar ist es nach Gefühl (Probe), nicht nach Uhr."],
  }),
  r({
    id: "burnt-ends", name: "Pork Belly Burnt Ends", method: "bbq", cat: "Schwein", diff: 2,
    time: "5–6 h", pit: "120 °C", core: "95 °C", wood: "Hickory / Kirsche", yield: "ca. 1,5 kg",
    blurb: "Klebrig-süße Schweinebauch-Würfel – „Meat Candy“.",
    ingredients: [
      { a: "1,5 kg", i: "Schweinebauch, in 4 cm Würfel" },
      { a: "3–4 EL", i: "Rub, Butter, brauner Zucker, Honig, BBQ-Sauce" },
    ],
    phases: [
      { label: "Würfeln & Würzen", kind: "prep", dur: "20 min", temp: "—", text: "In Würfel schneiden, rubben.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "2,5–3 h", temp: "120 °C", text: "Bis Bark und ~75 °C Kern räuchern.", bullets: [] },
      { label: "Schmoren", kind: "cook", dur: "1,5 h", temp: "120 °C", text: "In Schale mit Butter/Zucker/Sauce abgedeckt weich schmoren.", bullets: ["Bis Kern ~95 °C, weich"] },
      { label: "Glasieren", kind: "finish", dur: "30 min", temp: "120 °C", text: "Offen einreduzieren bis klebrig.", bullets: [] },
    ],
    tips: ["Funktioniert auch mit Brisket-Point (Beef Burnt Ends)."],
  }),
  r({
    id: "beef-short-ribs", name: "Beef Short Ribs", method: "bbq", cat: "Rind", diff: 3,
    time: "8–10 h", pit: "110–120 °C", core: "94–96 °C", wood: "Eiche / Hickory", yield: "ca. 2 kg",
    blurb: "Die „Dino-Ribs“ – fleischige Rinderrippen, butterzart und kräftig.",
    ingredients: [
      { a: "2,5 kg", i: "Beef Short Ribs (Plate, 3-Knochen)" },
      { a: "je 2 EL", i: "Salz + grober Pfeffer" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "30 min", temp: "—", text: "Mit Salz/Pfeffer rubben.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "6–8 h", temp: "110–120 °C", text: "Mit Eiche bis tiefdunkle Bark.", bullets: ["Kein Wickeln nötig – Bark darf kräftig sein"] },
      { label: "Garziehen", kind: "cook", dur: "1–2 h", temp: "110–120 °C", text: "Bis Kern 94–96 °C, Probe butterweich.", bullets: [] },
      { label: "Ruhen", kind: "rest", dur: "45 min", temp: "warm", text: "Kurz ruhen lassen.", bullets: [] },
    ],
    tips: ["Saftigstes Rindfleisch vom Smoker – sehr nachsichtig.", "Texas-Style nur Salz/Pfeffer reicht völlig."],
  }),
  r({
    id: "pastrami", name: "Pastrami", method: "bbq", cat: "Rind", diff: 3,
    time: "1 Woche + 8 h", pit: "110–120 °C", core: "90 °C", wood: "Eiche / Kirsche", yield: "ca. 2 kg",
    blurb: "Gepökeltes Rinderbrust (Flat), würzig ummantelt, geräuchert und gedämpft.",
    ingredients: [
      { a: "2,5 kg", i: "Brisket Flat" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS) für die Pökellake" },
      { a: "je 2 EL", i: "Pickling Spice, grober Pfeffer + Koriander (Kruste)" },
    ],
    phases: [
      { label: "Nasspökeln (Corned Beef)", kind: "cure", dur: "5–7 Tage", temp: "2–7 °C", text: "In Pökellake mit Gewürzen einlegen, beschwert.", bullets: ["Täglich wenden", "Ergibt zunächst Corned Beef"] },
      { label: "Wässern", kind: "rest", dur: "6–12 h", temp: "kalt", text: "Gut wässern, um Salz zu reduzieren, Wasser mehrfach wechseln.", bullets: [] },
      { label: "Krusten & Räuchern", kind: "smoke", dur: "5–7 h", temp: "110–120 °C", text: "Mit Pfeffer-Koriander-Kruste rubben, bis Kern ~68 °C räuchern.", bullets: [] },
      { label: "Dämpfen", kind: "cook", dur: "2–3 h", temp: "Dampf", text: "Bis Kern 90 °C dämpfen – wird zart.", bullets: ["Der Dampfschritt macht echtes Pastrami aus"] },
      { label: "Schneiden", kind: "finish", dur: "10 min", temp: "—", text: "Dünn quer zur Faser schneiden.", bullets: [] },
    ],
    tips: ["Aufwendig, aber jeder Schritt zahlt ein.", "Auf Roggenbrot mit Senf = New-York-Deli-Klassiker."],
  }),

  /* ============================ GRUNDLAGEN ============================ */
  r({
    id: "g-poekeln", name: "Pökeln verstehen", method: "basis", cat: "Grundlagen", diff: 2,
    time: "Wissen", pit: "2–7 °C", core: "", wood: "—", yield: "",
    blurb: "Nass-, Trocken- und Spritzpökeln – warum Nitritpökelsalz, wie lange, wie viel.",
    ingredients: [],
    phases: [
      { label: "Warum pökeln?", kind: "prep", dur: "—", temp: "—", text: "Pökeln konserviert, würzt und sorgt für die stabile rote Umrötung und den typischen Geschmack.", bullets: ["NPS hemmt gefährliche Keime (u. a. Botulismus)", "Ohne Nitrit bleibt Fleisch grau und ist riskanter für Rohpökelware"] },
      { label: "Trockenpökeln", kind: "cure", dur: "1 Tag / cm + Reserve", temp: "2–7 °C", text: "Fleisch mit Salzmischung einreiben und (vakuumiert) reifen lassen.", bullets: ["Standard: 40 g NPS pro kg Fleisch", "Intensiver Geschmack, geringer Gewichtsgewinn"] },
      { label: "Nasspökeln", kind: "cure", dur: "länger als trocken", temp: "2–7 °C", text: "In Salzlake einlegen; gleichmäßig, aber milder.", bullets: ["Lake meist 8–12 % Salz", "Gut für gleichmäßige Stücke"] },
      { label: "Spritzpökeln", kind: "cure", dur: "verkürzt", temp: "2–7 °C", text: "Lake mit Spritze ins Innere bringen – beschleunigt dicke Stücke.", bullets: ["Profi-Technik, gleichmäßige Durchpökelung", "Hygiene besonders wichtig"] },
    ],
    tips: ["NPS immer exakt abwiegen – nie schätzen.", "Kühlkette 2–7 °C konsequent einhalten."],
  }),
  r({
    id: "g-durchbrennen", name: "Durchbrennen", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "2–7 °C", core: "", wood: "—", yield: "",
    blurb: "Die oft übersprungene, aber entscheidende Ruhephase nach dem Pökeln.",
    ingredients: [],
    phases: [
      { label: "Was passiert?", kind: "rest", dur: "—", temp: "2–7 °C", text: "Nach dem Pökeln verteilt sich das Salz gleichmäßig im ganzen Stück, die Umrötung stabilisiert sich.", bullets: ["Außen nicht zu salzig, innen nicht fade", "Farbe wird gleichmäßig kräftig-rot"] },
      { label: "Wie lange?", kind: "rest", dur: "ca. halbe Pökelzeit", temp: "2–7 °C", text: "Faustregel: rund die Hälfte der Pökeldauer ohne Salz kühl ruhen lassen.", bullets: ["Größere Stücke = länger"] },
      { label: "Praxis", kind: "prep", dur: "—", temp: "2–7 °C", text: "Aus der Lake nehmen, kurz abspülen, trockentupfen, kühl aufbewahren.", bullets: ["Vakuumiert oder abgedeckt"] },
    ],
    tips: ["Ohne Durchbrennen schmeckt der Rand oft versalzen.", "Wird gern unterschätzt – lohnt sich immer."],
  }),
  r({
    id: "g-abhaengen", name: "Abhängen & Pellicle", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "12–15 °C", core: "", wood: "—", yield: "",
    blurb: "Warum die trockene Oberfläche vor dem Räuchern so wichtig ist.",
    ingredients: [],
    phases: [
      { label: "Pellicle bilden", kind: "dry", dur: "Stunden bis Tage", temp: "kühl, luftig", text: "An der Oberfläche bildet sich eine trocken-klebrige Haut (Pellicle), an der Rauch optimal haftet.", bullets: ["Nasse Oberfläche nimmt kaum Rauch an", "Bei Fisch besonders wichtig"] },
      { label: "Richtig trocknen", kind: "dry", dur: "—", temp: "12–15 °C", text: "Luftig aufhängen, ohne Zugluft, bis die Oberfläche matt und leicht klebrig ist.", bullets: ["Zu starke Zugluft = Trockenrand", "Lüfter auf niedriger Stufe hilft"] },
    ],
    tips: ["Bei Fisch reicht oft 1–2 h offen im Kühlschrank.", "Glänzende, klebrige Oberfläche = bereit zum Räuchern."],
  }),
  r({
    id: "g-minion", name: "Minion-Methode", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "110–120 °C", core: "", wood: "—", yield: "",
    blurb: "Stundenlang stabile Glut ohne Nachlegen – das Herzstück langer Cooks im WSM.",
    ingredients: [],
    phases: [
      { label: "Prinzip", kind: "smoke", dur: "—", temp: "110–120 °C", text: "Kohlekorb mit ungezündeter Briketts füllen, nur eine kleine Menge glühender Kohlen darauf geben – die Glut wandert langsam durch.", bullets: ["Lange, gleichmäßige Brenndauer", "Ideal für 8–16 h Cooks"] },
      { label: "Aufbau", kind: "prep", dur: "15 min", temp: "—", text: "Korb mit Briketts füllen, Räucherholz verteilen, in der Mitte/Seite eine Mulde für die glühenden Kohlen.", bullets: ["Räucherchunks gleich mit einlegen", "10–15 glühende Briketts zum Start"] },
      { label: "Steuern", kind: "smoke", dur: "—", temp: "110–120 °C", text: "Temperatur über die unteren Lüftungsschieber regeln, oben fast offen lassen.", bullets: ["Unten regeln, oben offen", "Kleine Änderungen, dann abwarten"] },
    ],
    tips: ["Gute Briketts (z. B. Kokos/Brikett, nicht Grillkohle) brennen gleichmäßiger.", "Lieber zu wenig Luft als zu viel – Temperatur klettert sonst schwer wieder runter."],
  }),
  r({
    id: "g-wasserschale", name: "Wassermethode & Temperatur", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "stabil", core: "", wood: "—", yield: "",
    blurb: "Wie die Wasserschale im WSM die Temperatur puffert – und wann man sie weglässt.",
    ingredients: [],
    phases: [
      { label: "Mit Wasser", kind: "smoke", dur: "—", temp: "konstant ~110 °C", text: "Die gefüllte Wasserschale wirkt als Temperaturpuffer und hält die Hitze stabil bei Niedrigtemperatur.", bullets: ["Ideal für Pulled Pork, Brisket, Ribs", "Heißes Wasser einfüllen spart Anlaufzeit"] },
      { label: "Ohne Wasser", kind: "smoke", dur: "—", temp: "höher möglich", text: "Schale leer lassen (z. B. mit Sand/Folie) für höhere Temperaturen.", bullets: ["Für Geflügel mit knuspriger Haut", "Heißräuchern von Fisch"] },
      { label: "Regeln", kind: "smoke", dur: "—", temp: "—", text: "Temperatur über die unteren Schieber steuern, Deckelthermometer im Blick behalten.", bullets: ["Besser ein separates Thermometer auf Rosthöhe"] },
    ],
    tips: ["Sand statt Wasser puffert noch länger (mit Folie abgedeckt).", "Deckelthermometer zeigt oft höher als die Rosthöhe – kalibrieren lohnt."],
  }),
  r({
    id: "g-holz", name: "Räucherholz-Guide", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "—", core: "", wood: "alle", yield: "",
    blurb: "Welches Holz passt zu welchem Gericht – und welches du meiden solltest.",
    ingredients: [],
    phases: [
      { label: "Mild & fruchtig", kind: "smoke", dur: "—", temp: "—", text: "Apfel, Kirsche, Birne: dezent süßlich, gut für Fisch, Geflügel, Käse.", bullets: ["Verzeiht Überräuchern eher"] },
      { label: "Mittel", kind: "smoke", dur: "—", temp: "—", text: "Buche, Erle: neutral-klassisch, Allrounder fürs Kalträuchern, Fisch.", bullets: ["Buche ist der deutsche Standard"] },
      { label: "Kräftig", kind: "smoke", dur: "—", temp: "—", text: "Hickory, Eiche, Walnuss: intensiv, ideal für Schwein und Rind.", bullets: ["Sparsam dosieren – kann bitter werden"] },
      { label: "Finger weg", kind: "prep", dur: "—", temp: "—", text: "Niemals Nadelholz (außer gezielt Wacholder/Tanne), behandeltes oder harzreiches Holz.", bullets: ["Harz und Lacke sind giftig", "Nur naturbelassenes Räucherholz"] },
    ],
    tips: ["Weniger ist mehr: dünner, bläulicher Rauch ist gut, dicker weißer Qualm bitter.", "Holzsorten lassen sich mischen (z. B. Buche + Apfel)."],
  }),
  r({
    id: "g-kaltrauch", name: "Kaltrauch erzeugen", method: "basis", cat: "Grundlagen", diff: 2,
    time: "Wissen", pit: "unter 25 °C", core: "", wood: "Räuchermehl", yield: "",
    blurb: "Sparbrand und Kaltrauchgenerator (CSG): so bleibt's unter 25 °C.",
    ingredients: [],
    phases: [
      { label: "Sparbrand", kind: "smoke", dur: "8–12 h", temp: "unter 25 °C", text: "Mäanderförmiges Blech mit Räuchermehl füllen, an einer Ecke anzünden – glimmt langsam durch.", bullets: ["Kaum Eigenwärme – perfekt fürs Kalträuchern", "Mehl gut trocken und nicht zu fest pressen"] },
      { label: "Kaltrauchgenerator (CSG)", kind: "smoke", dur: "—", temp: "unter 25 °C", text: "Röhre/Sieb mit Mehl, oft mit kleiner Aquariumpumpe für Luftzufuhr.", bullets: ["Zuverlässiger Glimmprozess"] },
      { label: "Wärme kontrollieren", kind: "prep", dur: "—", temp: "unter 25 °C", text: "An kühlen Tagen räuchern, ggf. Eisschale in den Smoker stellen.", bullets: ["Über 25 °C: Eiweiß gerinnt, Fett tritt aus", "Thermometer auf Gargut-Höhe"] },
    ],
    tips: ["Kalträuchern ist Winterarbeit – Außentemperatur muss niedrig sein.", "Räuchermehl ≠ Räucherchips: Mehl glimmt, Chips brennen."],
  }),
  r({
    id: "g-sicherheit", name: "Sicherheit & NPS", method: "basis", cat: "Grundlagen", diff: 2,
    time: "Wissen", pit: "—", core: "", wood: "—", yield: "",
    blurb: "Das Wichtigste zu Hygiene, Nitritpökelsalz und Kerntemperaturen.",
    ingredients: [],
    phases: [
      { label: "Nitritpökelsalz", kind: "cure", dur: "—", temp: "—", text: "NPS schützt bei Rohpökelware (Kalträuchern) vor gefährlichen Keimen. Standarddosierung 40 g/kg Fleisch nicht überschreiten.", bullets: ["Nicht mit normalem Salz verwechseln", "Exakt abwiegen, kühl pökeln (2–7 °C)"] },
      { label: "Kerntemperaturen", kind: "cook", dur: "—", temp: "—", text: "Geflügel min. 75 °C, Schwein/Rind je nach Gericht, Fisch ~63 °C.", bullets: ["Geflügel nie rosa servieren", "Thermometer ist Pflichtausrüstung"] },
      { label: "Hygiene", kind: "prep", dur: "—", temp: "—", text: "Saubere Hände, Geräte und Haken; nur frische Ware; Kühlkette halten.", bullets: ["Rohpökelware reift bei niedrigen Temperaturen", "Bei Zweifel: wegwerfen"] },
    ],
    tips: ["Kalträuchern ohne Garen erfordert NPS und saubere Arbeit.", "Im Zweifel lieber Starterkulturen und Fachliteratur nutzen."],
  }),

  /* ============================ BILTONG & BOEREWORS ============================ */

  r({
    id: "biltong-klassisch", name: "Biltong (klassisch)", method: "dorr", cat: "Fleisch & Fisch", diff: 2,
    time: "4–7 Tage", pit: "20–30 °C (Raumtemperatur) oder DA506 35–40 °C", core: "Außen trocken, innen leicht rosa", wood: "Graef DA506 oder Trockenkammer", yield: "ca. 400 g/kg",
    blurb: "Südafrikanisches Trockenfleisch – intensiv gewürzt, ohne Pökelsalz, traditionell luftgetrocknet.",
    ingredients: [
      { a: "1 kg", i: "Rindfleisch (Oberschale oder Silverside, mager, pariert)" },
      { a: "60 ml", i: "brauner Malzessig oder Apfelessig" },
      { a: "25 g", i: "grobes Meersalz" },
      { a: "15 g", i: "brauner Zucker" },
      { a: "20 g", i: "Koriandersamen (geröstet, grob gemörsert)" },
      { a: "5 g", i: "schwarzer Pfeffer (grob gemahlen)" },
      { a: "3 g", i: "Backpulver (traditionell – macht Fleisch zarter)" },
      { a: "2 EL", i: "Worcestershire-Sauce (optional, klassisch)" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "leicht angefroren", text: "Fleisch in 20–25 mm dicke Streifen entlang der Faser schneiden. Dicker als Jerky – das ist wichtig für die traditionelle Textur.", bullets: ["Mit der Faser = zäh-bissfest (klassisch Biltong)", "Quer zur Faser = zarter, für Anfänger"] },
      { label: "Essig-Bad", kind: "marinate", dur: "15–30 min", temp: "Raumtemperatur", text: "Fleischstreifen im Essig wenden und kurz einwirken lassen. Essig tötet Oberflächenkeime und wirkt als natürliches Konservierungsmittel.", bullets: ["Nicht zu lange – Fleisch soll nicht 'garen'", "Abtropfen lassen, nicht abwaschen"] },
      { label: "Würzen", kind: "cure", dur: "12–24 h", temp: "0–5 °C", text: "Trockene Gewürzmischung (Salz, Zucker, Koriander, Pfeffer, Backpulver) gut einreiben. Lagen­weise in Schüssel stapeln, abdecken, kühlen.", bullets: ["Koriander ist das Herzstück – nie weglassen", "Nach 6 h wenden und erneut andrücken"] },
      { label: "Lufttrocknen (traditionell)", kind: "air", dur: "4–7 Tage", temp: "20–28 °C, gute Luftzirkulation", text: "Streifen aufhängen (Metallhaken oder Papierklammern, keine Zinkteile). Gute Belüftung ist entscheidend – Ventilator auf niedrigster Stufe hilft.", bullets: ["Niemals direktes Sonnenlicht – außen verhärtet, innen roh", "Idealtemperatur 20–25 °C, Luftfeuchtigkeit unter 60 %", "Ergebnis: außen dunkel und trocken, innen leicht feucht-rosa"] },
      { label: "Dörren (moderne Variante)", kind: "dry", dur: "36–72 h", temp: "35–40 °C (DA506)", text: "Im Graef DA506 bei 35–40 °C (niedrigster Bereich) trocknen. Zwischen Gittern legen oder mit Haken befestigen.", bullets: ["35 °C = authentischer, kein Garen", "Wenden nach halber Zeit", "Test: Streifen biegen – außen fest, innen leicht nachgebend"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "In Papier einwickeln und im Kühlschrank lagern oder vakuumieren.", bullets: ["Feucht-Biltong: 1–2 Wochen; trockenes Biltong: 4–6 Wochen", "NICHT luftdicht bei feuchtem Biltong – schimmelt sonst"] },
    ],
    tips: ["Koriandersamen trocken in der Pfanne rösten bis sie duften – das ist der Schlüssel zum Geschmack.", "Backpulver ist traditionell und zart macht das Fleisch – nicht weglassen.", "Die Stärke 20–25 mm ist wichtig: dünner wird es zu trocken wie Jerky, nicht wie Biltong.", "Weber-Variante: im WSM bei geschlossenen Lüftungen als 'Kalttrockner' nutzen – kein Feuer, nur Belüftung."],
  }),

  r({
    id: "biltong-weber", name: "Biltong im Weber Kugelgrill", method: "grill", cat: "Biltong & Südafrika", diff: 3,
    time: "3–5 Tage", pit: "Kein Feuer – Raumtemperatur + Belüftung", core: "Außen trocken, innen rosa", wood: "Weber Kugelgrill 57 cm (als Trocknungskammer)", yield: "ca. 400 g/kg",
    blurb: "Der Weber Kugelgrill als Trocknungskammer – kein Feuer, nur Belüftung. Perfekt bei 20–25 °C.",
    ingredients: [
      { a: "1 kg", i: "Rindfleisch (Oberschale), 20–25 mm dick geschnitten" },
      { a: "60 ml", i: "Malzessig" },
      { a: "25 g", i: "Salz, 15 g Zucker, 20 g Koriander gemörsert" },
      { a: "5 g", i: "Pfeffer grob, 3 g Backpulver" },
    ],
    phases: [
      { label: "Vorbereiten (wie klassisch)", kind: "prep", dur: "1 Tag", temp: "Kühlschrank", text: "Essig-Bad, Würzen, 12–24 h im Kühlschrank marinieren wie beim klassischen Biltong-Rezept.", bullets: [] },
      { label: "Weber als Trocknungskammer", kind: "air", dur: "3–5 Tage", temp: "Kein Feuer – Umgebungstemperatur", text: "Fleischstreifen über den Grillrost hängen (Metallhaken durch die Lüftungsschlitze im Deckel). Untere und obere Lüftungsklappen VOLL öffnen für maximale Luftzirkulation.", bullets: ["Kein Kohle – Weber ist nur Gehäuse und Windschutz", "Ventilator 30 cm vor die untere Öffnung stellen (niedrigste Stufe)", "Perfekte Außentemperatur: 18–25 °C, trocken", "Nicht bei Regen oder hoher Luftfeuchtigkeit"] },
      { label: "Täglich prüfen", kind: "rest", dur: "täglich 5 min", temp: "—", text: "Streifen täglich wenden und auf Schimmel prüfen.", bullets: ["Weißer Film = normal (Salzausblühung) – abwischen", "Echter Schimmel = flauschig, grün/schwarz – Streifen entsorgen"] },
      { label: "Fertig-Test", kind: "finish", dur: "—", temp: "—", text: "Streifen biegen: Außen fest und dunkel, innen leicht rosa und nachgebend. Für trockenes Biltong: komplett fest.", bullets: [] },
    ],
    tips: ["Der Weber-Trick: Die Kuppelform erzeugt einen natürlichen Kaminzug – perfekte Luftzirkulation.", "Im Sommer draußen aufstellen (Schatten), im Winter drinnen – Temperatur entscheidet.", "Optional: Ein Stückchen Holzkohle-Brikettasche unten für minimalen Rauch (kalt, kein Feuer!)."],
  }),

  r({
    id: "boerewors", name: "Boerewors (Südafrikanische Bratwurst)", method: "grill", cat: "Biltong & Südafrika", diff: 3,
    time: "2 h Herstellung + 20 min Grillen", pit: "direkt: 180–220 °C", core: "72 °C Kerntemperatur", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Das südafrikanische Nationalwurstgericht – Rind+Schweinefett, Koriander, Nelken, im Spiral gegrillt.",
    ingredients: [
      { a: "800 g", i: "Rindfleisch (Schulter oder Wade, mager)" },
      { a: "200 g", i: "Schweinespeck oder Rinderfett (NICHT weglassen!)" },
      { a: "20 g", i: "Koriandersamen (geröstet, gemörsert)" },
      { a: "8 g", i: "Meersalz" },
      { a: "4 g", i: "schwarzer Pfeffer" },
      { a: "2 g", i: "gemahlene Nelken" },
      { a: "2 g", i: "gemahlene Muskatnuss" },
      { a: "2 g", i: "gemahlener Piment" },
      { a: "30 ml", i: "Malzessig oder Rotweinessig" },
      { a: "ca. 2 m", i: "Schweinedarm (32/34 mm) – gewässert" },
    ],
    phases: [
      { label: "Würzmischung", kind: "prep", dur: "10 min", temp: "—", text: "Koriandersamen trocken rösten, leicht abkühlen, grob mörsern. Mit allen Gewürzen vermischen.", bullets: ["Koriander muss grob bleiben – kein Pulver", "Nelken sparsam – präsent aber nicht dominant"] },
      { label: "Fleisch vorbereiten", kind: "prep", dur: "20 min", temp: "kalt, unter 5 °C", text: "Fleisch und Fett in Würfel schneiden, 30 min anfrieren. Durch die grobe Scheibe (8–10 mm) wolfen.", bullets: ["Kalt arbeiten – Fett darf nicht schmelzen", "Einmal durch grobe Scheibe – nie fein wolfen!"] },
      { label: "Mischen", kind: "prep", dur: "10 min", temp: "kalt", text: "Gewürze und Essig zum Fleisch, gut durchmischen bis klebrig.", bullets: ["Mix darf nicht zu fest geknetet werden", "Klebrigkeit = Bindung ist gut"] },
      { label: "Füllen", kind: "prep", dur: "30 min", temp: "kalt", text: "Schweinedarme füllen, nicht zu fest, nicht zu locker. Als lange Spirale formen.", bullets: ["Spirale mit Holzspieß oder Zahnstochern fixieren", "Keine Luft­blasen – mit Nadel einstechen"] },
      { label: "Ruhen", kind: "rest", dur: "1 h bis über Nacht", temp: "Kühlschrank", text: "Im Kühlschrank ruhen lassen – Gewürze ziehen ein, Würste trocknen leicht ab.", bullets: [] },
      { label: "Grillen", kind: "direct", dur: "15–20 min", temp: "180–220 °C direkt", text: "Als Spirale direkt auf den Grill. Einmal wenden. Wurst soll leicht aufplatzen – das ist erwünscht.", bullets: ["NIEMALS aufstechen vor dem Grillen", "Weber: Grillrost direkt über Kohlen", "Gasgrill: mittlere-hohe Hitze, Deckel offen", "Kerntemperatur 72 °C – Garprobe"] },
    ],
    tips: ["Das Fett ist NICHT optional – Boerewors ohne Fett ist trocken und nicht authentisch.", "Das 'Aufplatzen' ist Teil der Boerewors-Erfahrung – kein Fehler.", "Traditionell mit 'Pap' (Maismehlbrei) und Chakalaka-Relish servieren.", "Niemals einfrieren wenn bereits angetaut – immer frisch greifen."],
  }),

  /* ============================ GRILL & SPIEß ============================ */

  r({
    id: "haenchen-rotisserie", name: "Hähnchen am Spieß (Rotisserie)", method: "grill", cat: "Geflügel am Spieß", diff: 2,
    time: "1,5–2 h", pit: "indirekt 180–200 °C", core: "82 °C (Oberschenkel)", wood: "Weber Kugelgrill + Rotisserie-Set oder Rössle Gasgrill",
    blurb: "Knusprig-saftiges Rotisserie-Hähnchen – das Beste, was du mit einem Grill machen kannst.",
    ingredients: [
      { a: "1", i: "ganzes Hähnchen (1,5–1,8 kg)" },
      { a: "je 1 TL", i: "grobes Meersalz, Pfeffer, Paprika" },
      { a: "2 EL", i: "Olivenöl oder Butter (weich)" },
      { a: "je 1 TL", i: "Knoblauch, Zitrone, Thymian, Rosmarin (für die Füllung)" },
    ],
    phases: [
      { label: "Vorbereitung", kind: "prep", dur: "20 min", temp: "Raumtemperatur", text: "Hähnchen innen und außen trocken tupfen. Zitronenviertel, angedrückten Knoblauch und Kräuter in die Höhle stecken. Außen großzügig mit Öl einreiben und würzen.", bullets: ["Trockene Haut = knusprigere Haut", "Flügel mit Küchengarn anwickeln damit sie nicht verbrannt"] },
      { label: "Aufspießen", kind: "prep", dur: "10 min", temp: "—", text: "Spieß durch die Längsachse des Hähnchens führen (Bürzel → Hals). Mit den Spießgabeln fixieren. Balance prüfen: Hähnchen soll gleichmäßig drehen.", bullets: ["Unbalancierter Spieß = Motor kämpft = ungleichmäßiges Garen", "Küchengarn halten Flügel und Schenkel eng am Körper"] },
      { label: "Grill einrichten", kind: "prep", dur: "15 min", temp: "indirekt 180–200 °C", text: "Weber: Kohlen links und rechts, Mitte frei. Tropfschale aus Alufolie in der Mitte (fängt Fetttropfen auf, verhindert Flammen). Rotisserie-Ring aufsetzen, Motor einspannen.", bullets: ["Gasgrill: äußere Brenner an, mittlerer aus", "Röstle: Rotisserie-Halter über mittlere Brennerzone"] },
      { label: "Grillen", kind: "spit", dur: "1,5–2 h", temp: "180–200 °C indirekt", text: "Spieß einsetzen, Motor starten, Deckel schließen. Alle 20–30 min prüfen.", bullets: ["Nach 1 h Kerntemperatur messen (Oberschenkel, nicht am Knochen)", "Bei 75 °C: 15 min vor Hitze – glasieren optional", "Haut soll goldbraun und knusprig sein"] },
      { label: "Ruhen & Tranchieren", kind: "finish", dur: "10 min", temp: "Raumtemperatur", text: "Hähnchen vom Spieß nehmen, 10 min ruhen lassen bevor tranchieren.", bullets: ["Ruhezeit = saftigeres Ergebnis", "Saft aus der Tropfschale als Jus servieren"] },
    ],
    tips: ["Dry Brine: 12–24 h vorher salzen und offen im Kühlschrank lagern – beste Knusprigkeit.", "Butter unter der Haut: Krauterbutter zwischen Haut und Brust schieben vor dem Aufspießen.", "Holzchips in die Kohle = leichter Rauch = hervorragendes Aroma (Apfel, Kirsche)."],
  }),

  r({
    id: "doener-spieß", name: "Döner-Spieß (Rind/Lamm)", method: "grill", cat: "Geflügel am Spieß", diff: 3,
    time: "1 Tag marinieren + 2–3 h Spieß", pit: "indirekt 160–180 °C", core: "70–75 °C", wood: "Rössle Gasgrill (ideal) oder Weber Kugelgrill",
    blurb: "Selbstgemachter Döner-Spieß für zuhause – schichtenweise aufgebaut, langsam gegrillt.",
    ingredients: [
      { a: "800 g", i: "Rinderhüfte oder Lammkeule, dünn aufgeschnitten (3–5 mm)" },
      { a: "200 g", i: "Lammhackfleisch (Verbindungsschichten)" },
      { a: "100 ml", i: "Joghurt (3,5 %)" },
      { a: "4 EL", i: "Olivenöl" },
      { a: "3 Zehen + 1 Stk", i: "Knoblauch (3 Zehen), Zwiebel (1 groß, gerieben)" },
      { a: "je 1 TL", i: "Kreuzkümmel, Paprika, Oregano, Pfeffer, Salz, Sumach" },
      { a: "1 EL", i: "Tomatenmark (1 EL)" },
    ],
    phases: [
      { label: "Marinade", kind: "marinate", dur: "12–24 h", temp: "Kühlschrank 0–4 °C", text: "Joghurt, Öl, geriebene Zwiebel, gepressten Knoblauch, Tomatenmark und alle Gewürze verrühren. Fleischscheiben einlegen.", bullets: ["Geriebene Zwiebel (nicht gehackt!) macht das Fleisch zart", "Mindestens 12 h – besser 24 h"] },
      { label: "Spieß aufbauen", kind: "prep", dur: "20 min", temp: "kalt", text: "Auf einen stabilen Grillspieß abwechselnd Fleischscheiben und dünne Hackfleisch-Verbindungsschichten stapeln. Sehr fest andrücken. Enden mit Fladen oder extra Hackfleisch abschließen.", bullets: ["Fester Druck = Spieß hält beim Drehen zusammen", "Zwiebelhälften an die Enden = traditionell, schützt vor Austrocknen"] },
      { label: "Grillen", kind: "spit", dur: "2–3 h", temp: "160–180 °C indirekt", text: "Spieß drehen lassen. Alle 20–30 min die Außenschicht abschneiden und servieren (oder warten bis komplett fertig).", bullets: ["Rössle Gasgrill: seitliche Brenner an, mittlerer aus", "Das Ablösende Ergebnis ist der Vorteil: außen knusprig, innen saftig", "Mit Messer scheibenweise abschneiden sobald außen gebräunt"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "sofort", text: "Mit Fladenbrot, Joghurtsauce, Tomaten, Zwiebeln, Salat servieren.", bullets: [] },
    ],
    tips: ["Lammhackfleisch als Verbindungsschicht ist der Trick: hält alles zusammen und gibt Fett ab.", "Für Hähnchen-Döner: Hähnchenoberschenkel statt Rind, selbe Marinade.", "Gasgrill ist ideal: gleichmäßige Hitze von allen Seiten ohne Flammenzonen."],
  }),

  r({
    id: "lammkeule-spieß", name: "Lammkeule am Spieß", method: "grill", cat: "Lammfleisch", diff: 2,
    time: "1 Tag + 2,5–3,5 h", pit: "indirekt 160–175 °C", core: "70–75 °C (medium)", wood: "Weber Kugelgrill + Rotisserie oder Rössle Gasgrill",
    blurb: "Entbeinte Lammkeule, aufgerollt und am Rotisserie-Spieß – saftig, aromatisch, mediterran.",
    ingredients: [
      { a: "1,5–2 kg", i: "Lammkeule, entbeint und aufgerollt (beim Metzger)" },
      { a: "4 Zehen + je 1 TL", i: "Knoblauch (4 Zehen), Rosmarin, Thymian, Oregano" },
      { a: "4 EL", i: "Olivenöl" },
      { a: "je 1 TL", i: "Zitronensaft, grobes Meersalz, schwarzer Pfeffer" },
    ],
    phases: [
      { label: "Marinade", kind: "marinate", dur: "12–24 h", temp: "Kühlschrank", text: "Kräuter, Knoblauch, Öl, Zitrone zu einer Paste mörsern. Lammkeule einreiben, vakuumieren oder in Folie einwickeln.", bullets: [] },
      { label: "Aufspießen", kind: "prep", dur: "10 min", temp: "—", text: "Lammkeule auf den Rotisserie-Spieß stecken und mit Gabeln fixieren. Balance prüfen.", bullets: ["Schnur um das aufgerollte Fleisch binden damit es kompakt bleibt"] },
      { label: "Grillen", kind: "spit", dur: "2,5–3,5 h", temp: "160–175 °C indirekt", text: "Rotisserie laufen lassen, Deckel zu. Alle 30 min mit der Marinade bepinseln.", bullets: ["70 °C = medium-rosa innen (ideal)", "75 °C = durchgegart", "Holzchips (Kirsche oder Apfel) für Raucharoma"] },
      { label: "Ruhen", kind: "finish", dur: "15 min", temp: "—", text: "Auf Brett ruhen lassen, erst dann aufschneiden.", bullets: [] },
    ],
    tips: ["Entbeint und aufgerollt vom Metzger ist einfacher als selbst entbeinen.", "Knoblauchzehen tief ins Fleisch stecken vor dem Aufspießen für intensiveres Aroma."],
  }),

  r({
    id: "beer-can-chicken-grill", name: "Beer Can Chicken", method: "grill", cat: "Geflügel am Spieß", diff: 1,
    time: "1,5–2 h", pit: "indirekt 190–210 °C", core: "82 °C", wood: "Weber Kugelgrill 57 cm",
    blurb: "Das Hähnchen thront aufrecht auf einer Bierdose – Dampf von innen, Hitze von außen, perfekt saftig.",
    ingredients: [
      { a: "1", i: "Hähnchen (1,5–1,8 kg)" },
      { a: "1", i: "halb gefüllte Bierdose (oder Tomatendose mit Brühe)" },
      { a: "3–4 EL", i: "Rub: Paprika, Knoblauch, Salz, Pfeffer, brauner Zucker, Cayenne" },
      { a: "2 EL", i: "Öl" },
    ],
    phases: [
      { label: "Rub auftragen", kind: "prep", dur: "15 min", temp: "—", text: "Hähnchen außen und unter der Haut mit Öl einreiben, dann Rub großzügig auftragen.", bullets: ["Rub auch in die Höhle streuen"] },
      { label: "Aufstecken", kind: "prep", dur: "5 min", temp: "—", text: "Halb volle Bierdose aufstellen, Hähnchen von unten über die Dose stülpen.", bullets: ["Dose darf nur halb voll sein – bei Hitze schäumt das Bier", "Alternativ: Hähnchen-Halter aus Edelstahl verwenden"] },
      { label: "Grillen", kind: "indirect", dur: "1,5–2 h", temp: "190–210 °C indirekt", text: "Weber: Kohlen seitlich, Hähnchen in die Mitte – Deckel zu.", bullets: ["Haut wird goldbraun und sehr knusprig durch die stehende Position", "Kerntemperatur Oberschenkel: 82 °C"] },
      { label: "Abnehmen", kind: "finish", dur: "10 min", temp: "—", text: "VORSICHT: Dose ist sehr heiß! Mit Grillhandschuhen abnehmen.", bullets: [] },
    ],
    tips: ["Das Bier macht erstaunlich wenig Geschmack – der Dampf hält das Hähnchen saftig.", "Für mehr Aroma: Kräuter und Knoblauch in die Bierdose geben.", "Chipottle-Rub für rauchige Schärfe."],
  }),

  r({
    id: "spareribs-kettle", name: "Spareribs – Weber Kettle (3-2-1)", method: "grill", cat: "Schweinefleisch", diff: 2,
    time: "6 h", pit: "110–120 °C indirekt", core: "93–95 °C (Zahnstochertest)", wood: "Weber Kugelgrill – Snake Method · Kirsche/Apfel",
    blurb: "Classic 3-2-1 Ribs auf dem Weber Kugelgrill mit der Snake Method – ohne Smoker.",
    ingredients: [
      { a: "2", i: "Leitern Baby Back Ribs (Schweinerückenrippchen)" },
      { a: "3–4 EL", i: "Rub: Paprika, Zucker, Salz, Pfeffer, Knoblauch, Zwiebelpulver" },
      { a: "100 ml", i: "Apfelsaft (zum Sprühen)" },
      { a: "ca. 100 ml", i: "BBQ-Sauce (zum Glasieren)" },
    ],
    phases: [
      { label: "Snake Method einrichten", kind: "prep", dur: "15 min", temp: "—", text: "Briketts in einem C-Bogen (Schlange) entlang des Grillrands legen – 2 Briketts breit, 2 hoch. Holzchips auf den ersten 30 cm der Schlange verteilen.", bullets: ["Snake brennt 5–6 h ohne nachzulegen", "Anzündkamin mit 10–12 Briketts anheizen, am Kopf der Schlange platzieren"] },
      { label: "Rub & Silberhaut", kind: "prep", dur: "30 min", temp: "—", text: "Silberhaut auf der Knochenseite entfernen (Messer unter die Haut, mit Küchentuch abziehen). Rub einreiben.", bullets: ["Silberhaut muss weg – sonst kein Rauch und kein Biss-Ergebnis"] },
      { label: "Phase 3h (Räuchern)", kind: "smoke", dur: "3 h", temp: "110–120 °C", text: "Ribs auf den Rost, Knochenseite unten, Deckel zu. Alle 45 min mit Apfelsaft sprühen.", bullets: [] },
      { label: "Phase 2h (Dämpfen)", kind: "cook", dur: "2 h", temp: "110 °C", text: "Ribs in Alufolie wickeln mit etwas Apfelsaft und Butter – Päckchen schließen.", bullets: ["Diese Phase macht die Ribs zart", "Für Extra-Bite: Folie nur 1,5 h"] },
      { label: "Phase 1h (Glasieren)", kind: "finish", dur: "1 h", temp: "120–130 °C", text: "Folie entfernen, BBQ-Sauce auftragen, letzte Stunde offen auf dem Rost karamellisieren.", bullets: ["Zahnstochertest: dringt ohne Widerstand ein = fertig", "Sauce alle 20 min neu auftragen"] },
    ],
    tips: ["Snake Method ist der Schlüssel: gleichmäßig 110–120 °C für 5–6 h ohne nachzulegen.", "Für mehr Rauch: Kirschholz-Chunks (nicht Chips) direkt auf die Kohlen.", "Bend Test: Ribs in der Mitte anheben – biegen 45° ohne zu reißen = perfekt."],
  }),

  r({
    id: "pulled-pork-kettle", name: "Pulled Pork – Weber Kettle (Snake)", method: "grill", cat: "Schweinefleisch", diff: 3,
    time: "12–16 h", pit: "110–120 °C", core: "92–96 °C", wood: "Weber Kugelgrill – Snake Method · Hickory/Buche",
    blurb: "Pulled Pork vom Kugelgrill mit der Snake Method – nicht nur vom WSM. 16 h Geduld lohnt sich.",
    ingredients: [
      { a: "2–3 kg", i: "Schweinenacken" },
      { a: "3–4 EL", i: "Rub: Paprika, Salz, Pfeffer, Zucker, Knoblauch, Senf (Dijon als Binder)" },
    ],
    phases: [
      { label: "Snake (doppelt)", kind: "prep", dur: "20 min", temp: "—", text: "Für 12–16 h Snake: 3 Briketts breit, 2 hoch, entlang des gesamten Grillrands legen.", bullets: ["Volle Runde = 12–14 h Brennzeit ohne Nachfüllen", "Wasserschale unter dem Grillgut für Feuchtigkeit"] },
      { label: "Rub & Nacht im Kühlschrank", kind: "cure", dur: "12 h", temp: "Kühlschrank", text: "Senf als Binder auftragen, dann Rub großzügig einreiben. Über Nacht kühl stellen.", bullets: [] },
      { label: "Räucherphase", kind: "smoke", dur: "6–8 h", temp: "110–120 °C", text: "Nacken auf den Rost, alle 2 h Kerntemperatur prüfen. Alle 2 h mit Apfelsaft/Wasser sprühen.", bullets: ["Bei ca. 70–75 °C beginnt das 'Plateau' – Geduld: 2–4 h auf dieser Temperatur"] },
      { label: "Texas Crutch (optional)", kind: "cook", dur: "2–3 h", temp: "110–120 °C", text: "Bei 70 °C in Butcher Paper oder Alufolie wickeln und weitergaren bis 92–96 °C.", bullets: ["Folie überbrückt das Plateau", "Butcher Paper = mehr Bark, Alufolie = mehr Saftigkeit"] },
      { label: "Ruhen & Pullen", kind: "finish", dur: "1 h", temp: "in Folie eingewickelt", text: "1 h ruhen, dann mit zwei Gabeln oder Bärenkrallen auseinanderpullen.", bullets: ["Saft aus der Folie untermengen für Saftigkeit"] },
    ],
    tips: ["Volle Brikettschlange = 14+ h. Prüfe nach 12 h – gut durchgebrannte Kohle läuft länger.", "Schweineschmalz an der Außenseite parieren, aber Fettdeckel oben lassen für Safthaltung."],
  }),

  r({
    id: "cote-de-boeuf", name: "Côte de Bœuf – Reverse Sear", method: "grill", cat: "Rindfleisch", diff: 2,
    time: "2–3 h", pit: "indirekt 100–110 °C → direkte Hitze 250–300 °C", core: "52–54 °C (medium-rare)", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Das Steak der Steaks – Reverse Sear: langsam auf Temperatur, dann kurz sehr scharf anbraten.",
    ingredients: [
      { a: "1", i: "Côte de Bœuf (600–900 g, mind. 4 cm dick)" },
      { a: "je 1–2 TL", i: "grobes Meersalz, schwarzer Pfeffer" },
      { a: "2 EL", i: "Butter + Knoblauch + Thymian (zum Bestreichen)" },
    ],
    phases: [
      { label: "Dry Brine", kind: "prep", dur: "1–24 h", temp: "Kühlschrank, offen", text: "Steak großzügig salzen, offen auf Gitter im Kühlschrank lagern.", bullets: ["Je länger, desto besser die Kruste", "30 min vor Grillen raus – auf Raumtemperatur kommen"] },
      { label: "Indirekte Phase (Reverse)", kind: "indirect", dur: "45–90 min", temp: "100–110 °C", text: "Steak auf der indirekten Seite bei sehr niedriger Temperatur langsam auf 48–50 °C Kerntemperatur bringen.", bullets: ["Geduldig – kein Wenden nötig", "Holzchips optional für leichten Rauch"] },
      { label: "Ruhen & Ofen aufheizen", kind: "rest", dur: "10 min", temp: "—", text: "Steak runter, Grill auf maximum aufheizen (250–300 °C). Weber: alle Lüftungen auf, frische Kohlen.", bullets: [] },
      { label: "Direktes Sear", kind: "direct", dur: "2–3 min/Seite", temp: "250–300 °C direkt", text: "Steak auf maximale direkte Hitze – 90 Sek. pro Seite, drehen für Kreuzgrill-Muster.", bullets: ["Butter, Knoblauch, Thymian drübergießen beim Sear (Baste)", "Kerntemperatur jetzt: 52–54 °C für medium-rare"] },
      { label: "Ruhen & Tranchieren", kind: "finish", dur: "8 min", temp: "—", text: "Ruhen lassen, dann quer zur Faser aufschneiden.", bullets: [] },
    ],
    tips: ["Reverse Sear = perfekte gleichmäßige Garung + maximale Kruste. Besser als klassisches Angrillen.", "Für den Sear: Gusseisenrost oder GBS-Pizzastein auf 300 °C vorheizt = perfekte Kruste."],
  }),

  r({
    id: "entenbrust-indirekt", name: "Entenbrust indirekt mit Orangenglasur", method: "grill", cat: "Geflügel am Spieß", diff: 2,
    time: "1,5–2 h", pit: "indirekt 150–160 °C → direkt 220 °C", core: "68 °C (Brust)", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Entenbrust braucht niedrige indirekte Hitze damit das Fett ausläuft – am Ende kurz scharf angeknuspert.",
    ingredients: [
      { a: "2", i: "Entenbrüste (200–250 g, mit Haut)" },
      { a: "je 1 TL", i: "Salz, Pfeffer, 5-Spice-Gewürz" },
      { a: "je 2 EL", i: "Orangenmarmelade + Sojasoße + Ingwer (Glasur)" },
    ],
    phases: [
      { label: "Haut einritzen & würzen", kind: "prep", dur: "10 min", temp: "—", text: "Haut rautenförmig einschneiden (nicht bis ins Fleisch). Salz, Pfeffer, 5-Spice einreiben.", bullets: ["Einritzen lässt Fett ausrennen und macht die Haut knusprig"] },
      { label: "Indirekte Phase", kind: "indirect", dur: "1 h", temp: "150–160 °C", text: "Haut-Seite oben, indirekt garen bis KT 62 °C. Fett läuft aus.", bullets: ["Tropfschale unbedingt nutzen – Entenfett ist sehr entzündlich!"] },
      { label: "Glasieren & Anknuspern", kind: "direct", dur: "5–8 min", temp: "220 °C direkt", text: "Glasur auftragen, Haut-Seite direkt auf heiße Kohlen/Brenner – kurz knusprig braten.", bullets: ["Nur kurz – Haut ist schnell verbrannt", "KT ziel: 68 °C"] },
      { label: "Ruhen", kind: "finish", dur: "8 min", temp: "—", text: "Ruhen lassen, quer aufschneiden.", bullets: [] },
    ],
    tips: ["Entenfett ist hochentzündlich – Tropfschale ist Pflicht.", "5-Spice + Orange + Soja ist die klassische Kombination."],
  }),

  r({
    id: "gyros-spieß", name: "Gyros-Spieß vom Grill", method: "grill", cat: "Geflügel am Spieß", diff: 2,
    time: "1 Tag marinieren + 2–2,5 h", pit: "indirekt 170–185 °C", core: "75 °C", wood: "Rössle Gasgrill (Rotisserie) oder Weber Kugelgrill",
    blurb: "Schweinebauch-Gyros am Rotisserie-Spieß – saftig, würzig, die griechische Variante des Drehspießes.",
    ingredients: [
      { a: "1 kg", i: "Schweinebauch, dünn aufgeschnitten (5–8 mm)" },
      { a: "150 ml", i: "Olivenöl" },
      { a: "5 Zehen + je 1 TL", i: "Knoblauch (5 Zehen), Oregano, Thymian, Rosmarin" },
      { a: "je 1 TL", i: "Paprika süß + scharf, Kreuzkümmel, Pfeffer, Salz" },
      { a: "1 Stk", i: "einer Zitrone" },
    ],
    phases: [
      { label: "Marinade & Einlegen", kind: "marinate", dur: "12–24 h", temp: "Kühlschrank", text: "Alle Zutaten zu Marinade mixen. Fleischscheiben einlegen.", bullets: [] },
      { label: "Spieß aufbauen", kind: "prep", dur: "15 min", temp: "kalt", text: "Scheiben schichtenweise auf den Spieß stecken, fest andrücken. Zwiebelhälften an die Enden.", bullets: ["So fest wie möglich stapeln – der Spieß soll kompakt bleiben"] },
      { label: "Grillen", kind: "spit", dur: "2–2,5 h", temp: "170–185 °C indirekt", text: "Spieß drehen, Deckel zu. Die Außenseite karamellisiert langsam.", bullets: ["Alle 30 min mit Olivenöl bepinseln", "Letzte 20 min: Hitze auf 200 °C für knusprige Außenseite"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "sofort", text: "Mit Tsatsiki, Pitabrot, Tomaten, roten Zwiebeln und Pommes servieren.", bullets: [] },
    ],
    tips: ["Schweinebauch ist ideal wegen des Fettgehalts – mageres Fleisch wird trocken.", "Für Hühnchen-Gyros: Oberschenkelfilet, gleiche Marinade, auf 75 °C KT."],
  }),

  r({
    id: "pizza-grill", name: "Pizza vom Grill (Pizzastein)", method: "grill", cat: "Sonstiges", diff: 1,
    time: "30 min + 8–12 min Grillen", pit: "300–320 °C (Pizzastein vorgeheizt)", core: "—", wood: "Rössle Gasgrill (GBS-Pizzastein) oder Weber Kugelgrill",
    blurb: "Pizzastein auf dem Gasgrill bei 300 °C – knusperig wie aus dem Holzofen.",
    ingredients: [
      { a: "500 g", i: "Pizzateig (Fertig oder selbstgemacht)" },
      { a: "je nach Belag", i: "Tomatensauce, Mozzarella, Belag nach Wahl" },
    ],
    phases: [
      { label: "Stein vorheizen", kind: "prep", dur: "30 min", temp: "300–320 °C", text: "Pizzastein auf den Rost legen, alle Brenner auf Maximum, Deckel zu – 30 min aufheizen.", bullets: ["Stein muss SEHR heiß sein – kalter Stein = klebender Teig"] },
      { label: "Pizza belegen & einschießen", kind: "cook", dur: "8–12 min", temp: "300–320 °C", text: "Pizza auf bemehlter Pizzaschaufel belegen und auf den heißen Stein gleiten lassen.", bullets: ["Schnelle Bewegung beim Einschießen", "Deckel schließen – Oberhitze für Käse"] },
      { label: "Fertig", kind: "finish", dur: "—", temp: "—", text: "Rand ist goldbraun, Käse blubbert. Mit Pizzaschaufel herausheben.", bullets: [] },
    ],
    tips: ["Weber GBS-Pizzastein oder Monolith-Stein funktionieren hervorragend.", "Mehl + Grieß unter dem Teig verhindert Kleben."],
  }),

  r({
    id: "haenchen-indirekt-gasgrill", name: "Hähnchen (halb) indirekt – Gasgrill", method: "grill", cat: "Geflügel am Spieß", diff: 1,
    time: "1–1,5 h", pit: "indirekt 180–200 °C", core: "82 °C", wood: "Rössle Gasgrill",
    blurb: "Halbes Hähnchen indirekt auf dem Gasgrill – einfach und zuverlässig saftig.",
    ingredients: [
      { a: "1", i: "Hähnchen, halbiert (Rückgrat entfernt)" },
      { a: "2–3 EL", i: "Olivenöl, Zitrone, Knoblauch, Paprika, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Marinade", kind: "marinate", dur: "2–12 h", temp: "Kühlschrank", text: "Hälften einreiben und marinieren.", bullets: [] },
      { label: "Indirekt grillen", kind: "indirect", dur: "1–1,5 h", temp: "180–200 °C", text: "Äußere Brenner an, mittlerer aus. Hähnchen auf die indirekte Zone, Haut nach oben.", bullets: ["Nach 45 min wenden – Haut nach unten für letzte Knusprigkeit", "KT 82 °C am Oberschenkel"] },
      { label: "Finish", kind: "finish", dur: "5 min", temp: "—", text: "Kurz bei direkter Hitze (Brenner an) die Haut final knuspern.", bullets: [] },
    ],
    tips: ["Rückgrat entfernen (Spatchcock) = gleichmäßigeres Garen.", "Mit Holzchips-Box im Gasgrill leichten Rauchgeschmack erzeugen."],
  }),

  r({
    id: "bacon-explosion", name: "Bacon Explosion", method: "grill", cat: "Schweinefleisch", diff: 2,
    time: "2–2,5 h", pit: "indirekt 120–135 °C", core: "72 °C", wood: "Weber Kugelgrill oder Rössle Gasgrill · Hickory",
    blurb: "Eine Hackfleischrolle, eingewickelt in ein gewebtes Bacon-Netz – der Klassiker der BBQ-Welt.",
    ingredients: [
      { a: "500 g", i: "gemischtes Hackfleisch" },
      { a: "500 g", i: "Baconstreifen (ca. 20 Stück)" },
      { a: "3 EL + 100 ml + 100 g", i: "BBQ-Rub, BBQ-Sauce, geriebener Käse (Cheddar)" },
    ],
    phases: [
      { label: "Bacon-Netz weben", kind: "prep", dur: "15 min", temp: "—", text: "10 Baconstreifen horizontal legen, weitere 10 senkrecht durchflechten.", bullets: [] },
      { label: "Füllung aufbauen", kind: "prep", dur: "15 min", temp: "—", text: "Hackfleisch mit Rub mischen, auf das Bacongitter verteilen. Käse und angebratenen Bacon-Crumble drüber, dann einrollen.", bullets: [] },
      { label: "Grillen", kind: "indirect", dur: "2–2,5 h", temp: "120–135 °C", text: "Indirekt grillen bis 72 °C KT. Letzten 30 min mit BBQ-Sauce glasieren.", bullets: [] },
    ],
    tips: ["Innen einen Käsestreifen einrollen für einen flüssigen Kern.", "Der Klassiker des BBQ-Internets – optisch beeindruckend, geschmacklich intensiv."],
  }),

  r({
    id: "mais-grill", name: "Gegrillter Mais (Mexican Style)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "20–25 min", pit: "direkt 200–220 °C", core: "—", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Mais mit Schale direkt in der Glut oder über der Flamme – karamellisiert und rauchig.",
    ingredients: [
      { a: "4", i: "Maiskolben (mit Blättern)" },
      { a: "je 1–2 EL", i: "Butter, Limette, Chili, Mayonnaise, Parmesan, Salz (Mexican Style)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "30 min einweichen", temp: "Wasser", text: "Maiskolben 30 min in Wasser einweichen (mit Schale), damit die Blätter beim Grillen nicht sofort verbrennen.", bullets: [] },
      { label: "Grillen (in Schale)", kind: "direct", dur: "15–20 min", temp: "200–220 °C direkt", text: "Direkt auf den Rost, wenden alle 5 min. Schale schützt den Mais.", bullets: [] },
      { label: "Karamellisieren", kind: "finish", dur: "5 min", temp: "sehr heiß", text: "Schale entfernen, Mais direkt auf Glut/Flamme für Röstaromen.", bullets: [] },
      { label: "Würzen", kind: "finish", dur: "—", temp: "—", text: "Mit Butter bestreichen, dann Mayo, Parmesan, Chili und Limettensaft – Mexican Street Corn (Elote).", bullets: [] },
    ],
    tips: ["Ohne Schale grillen geht auch – dann nur 8–10 min direkt, regelmäßig wenden."],
  }),

  /* ---- GRUNDLAGEN GRILL ---- */
  r({
    id: "g-grill-setup", name: "Grundlagen: Weber Kugelgrill 57 cm", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "110–300 °C je Methode", core: "", wood: "Holzkohle/Briketts",
    blurb: "Direkt, indirekt, Snake Method, 2-Zonen-Feuer – der Weber Kugelgrill als Allround-Gerät.",
    ingredients: [],
    phases: [
      { label: "Direkte Methode", kind: "direct", dur: "—", temp: "200–300 °C", text: "Alle Kohlen direkt unter dem Grillgut. Für Steaks, Würste, Gemüse – kurze Garzeiten.", bullets: ["Deckel auf = weniger Flammen, mehr Wärme", "Lüftungsklappen offen = höhere Temperatur"] },
      { label: "Indirekte Methode", kind: "indirect", dur: "—", temp: "150–200 °C", text: "Kohlen seitlich, Grillgut in der Mitte ohne direkte Hitze. Für Hähnchen, Braten, Ribs.", bullets: ["Wasserschale in der Mitte für Feuchtigkeit", "Wie ein Ofen – Deckel immer zu"] },
      { label: "Snake Method", kind: "smoke", dur: "5–14 h", temp: "110–120 °C", text: "Briketts in einem C-Bogen aufstellen – langsames abbrennen für Low & Slow.", bullets: ["2 Briketts breit, 2 hoch", "Holzchips am Anfang der Schlange für Rauch", "10 angezündete Briketts am Kopf platzieren"] },
      { label: "2-Zonen-Feuer", kind: "prep", dur: "—", temp: "variabel", text: "Alle Kohlen auf einer Seite = heiße Zone + kühle indirekte Zone. Flexibelste Methode.", bullets: ["Reverse Sear, Côte de Bœuf", "Sicherheitszone wenn Grillgut zu heiß wird"] },
      { label: "Rotisserie-Setup", kind: "spit", dur: "—", temp: "180–200 °C", text: "Rotisserie-Ring auf Kessel aufsetzen, Kohlen seitlich, Motor einspannen.", bullets: ["Hähnchen, Lammkeule, Döner-Spieß", "Tropfschale in der Mitte – Fett kann entzünden"] },
    ],
    tips: ["Anzündkamin ist Pflicht – keine Grillanzünder direkt in die Kohlen.", "Lüftungsklappen steuern die Temperatur: oben + unten offen = max. Zug = höchste Temp.", "Minion Method: kalte Kohlen + wenige angezündete obendrauf = langsames Abbrennen."],
  }),

  r({
    id: "g-gasgrill-setup", name: "Grundlagen: Rössle Gasgrill", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "120–320 °C je Einstellung", core: "", wood: "Gas (Propan/Butan)",
    blurb: "Zones, Rotisserie, Pizzastein, Räucherbox – das volle Potenzial des Rössle Gasgrills.",
    ingredients: [],
    phases: [
      { label: "Zünden & Vorheizen", kind: "prep", dur: "10–15 min", temp: "—", text: "Deckel öffnen → Gas aufdrehen → Zündknopf drücken. 10–15 min vorheizen mit allen Brennern auf Maximum.", bullets: ["Deckel beim Zünden immer offen – sonst Gasansammlung!", "Vorheizen ist für Pizzastein und gute Kruste unverzichtbar"] },
      { label: "Direkte und indirekte Zonen", kind: "direct", dur: "—", temp: "variabel", text: "Äußere Brenner an = indirekte Mitte; alle an = direktes Grillen; nur einer an = maximale Temperaturkontrolle.", bullets: ["Hähnchen: äußere an, mittlere aus", "Steak: alle an, max. Temperatur"] },
      { label: "Rotisserie am Gasgrill", kind: "spit", dur: "—", temp: "160–200 °C", text: "Rotisserie-Set einsetzen. Seitliche Brenner an, mittlerer aus für gleichmäßige Wärme.", bullets: ["Rössle hat oft seitliche Infrarot-Brenner = ideal für Rotisserie", "Tropfschale unter dem Spieß unbedingt verwenden"] },
      { label: "Räuchern am Gasgrill", kind: "smoke", dur: "—", temp: "120–160 °C", text: "Räucherbox (gefüllt mit eingeweichten Holzchips) direkt auf die Brenner legen oder unter Rost. Einen Brenner auf niedrig.", bullets: ["Holzchips 30 min einweichen", "Chips nicht direkt auf Brenner – Räucherbox oder Aluschale nutzen", "Kleines Loch in Alufolie einstechen für kontrollierten Rauch"] },
      { label: "Pizzastein am Gasgrill", kind: "cook", dur: "30 min vorheizen", temp: "300–320 °C", text: "Pizzastein auf den Rost, alle Brenner voll auf, 30 min vorheizen.", bullets: ["300 °C am Stein = Pizza in 8–10 min wie vom Holzofen"] },
    ],
    tips: ["Gasflaschen bei niedrigen Temperaturen vorher leicht erwärmen (Wärmflasche drüber) – Gas kommt besser.", "Gasgrill nie vollständig zudrehen – immer alle Brenner schließen, dann Gashahn zu.", "Jährliche Leitungsprüfung mit Seifenwasser auf Dichtheit."],
  }),


  /* ============================ DÖRREN (GRAEF DA506) ============================ */

  /* ---- OBST ---- */
  r({
    id: "apfelringe", name: "Apfelringe", method: "dorr", cat: "Obst", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Lederig, nicht klebrig", wood: "Graef DA506", yield: "ca. 100 g/kg Apfel",
    blurb: "Der Klassiker: dünne Scheiben, leicht zitroniert – knusprig oder lederig je nach Vorliebe.",
    ingredients: [
      { a: "1 kg", i: "Äpfel (fest, z. B. Elstar, Braeburn)" },
      { a: "1", i: "Zitrone (Saft, zum Wässern)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "20 min", temp: "kühl", text: "Äpfel schälen (optional), Kerngehäuse entfernen, in 5 mm Scheiben schneiden.", bullets: ["Gleichmäßige Stärke = gleichmäßiges Trocknen", "In Zitronenwasser legen verhindert Bräunung"] },
      { label: "Abtropfen & Belegen", kind: "prep", dur: "10 min", temp: "—", text: "Scheiben abtupfen und einlagig auf die Gitter legen.", bullets: ["Scheiben dürfen sich nicht überlappen"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Im Graef DA506 dörren, nach halber Zeit einmal wenden.", bullets: ["Test: Scheibe biegen – lederig, nicht klebrig = fertig", "Für Chips: 10–12 h bis knusprig"] },
      { label: "Abkühlen & Lagern", kind: "finish", dur: "1 h", temp: "Raumtemperatur", text: "Vollständig abkühlen lassen, dann luftdicht lagern.", bullets: ["Noch warm fühlen sich Chips weich an – täuscht", "Im Schraubglas 6–12 Monate haltbar"] },
    ],
    tips: ["Nicht zu dünn schneiden – unter 4 mm werden die Scheiben brüchig.", "Zimt nach dem Dörren aufstreuen, nicht vorher – verbrennt sonst."],
  }),
  r({
    id: "bananenchips", name: "Bananenchips", method: "dorr", cat: "Obst", diff: 1,
    time: "8–12 h", pit: "55–65 °C", core: "Knusprig oder lederig", wood: "Graef DA506", yield: "ca. 150 g/kg",
    blurb: "Süßlich, bissfest – viel besser als gekaufte Varianten ohne Frittieröl.",
    ingredients: [
      { a: "1 kg", i: "Bananen (leicht reif, nicht überreif)" },
      { a: "1", i: "Zitrone (Saft)" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Bananen in 5–7 mm Scheiben schneiden, in Zitronensaft wenden.", bullets: ["Überreife Bananen kleben und dörren ungleichmäßig"] },
      { label: "Dörren", kind: "dry", dur: "8–12 h", temp: "55–65 °C", text: "Einlagig dörren, nach 4 h wenden.", bullets: ["Lederig: 8–10 h; knusprig: 10–12 h"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Vollständig auskühlen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Mit Honig bepinseln vor dem Dörren gibt karamelliges Aroma.", "Lederige Variante ideal als Backzutat."],
  }),
  r({
    id: "mangoscheiben", name: "Mangoscheiben", method: "dorr", cat: "Obst", diff: 1,
    time: "8–12 h", pit: "55–65 °C", core: "Lederig, nicht klebrig", wood: "Graef DA506", yield: "ca. 120 g/kg",
    blurb: "Tropisch-intensive Süße, konzentriert durch langsames Dörren.",
    ingredients: [
      { a: "2", i: "reife Mangos" },
      { a: "2 EL + 1 TL", i: "Limettensaft, Chiliflocken (optional)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Mango schälen, Fleisch in 5–8 mm Scheiben schneiden.", bullets: ["Kern umrunden und Scheiben vom Kern schneiden"] },
      { label: "Dörren", kind: "dry", dur: "8–12 h", temp: "55–65 °C", text: "Einlagig dörren, gelegentlich wenden.", bullets: ["Lederig-zäh ist perfekt für Snack", "Für Chips länger dörren"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Abkühlen lassen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Chili-Limetten-Variante: vor dem Dörren mit Limettensaft + Chiliflocken würzen.", "Im Sommer ideal, wenn Mangos günstig und reif sind."],
  }),
  r({
    id: "erdbeerscheiben", name: "Erdbeerscheiben", method: "dorr", cat: "Obst", diff: 1,
    time: "6–10 h", pit: "55–60 °C", core: "Knusprig oder lederig", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "Intensive Süße, tolle Farbe – als Snack, Müsli-Topping oder Backzutat.",
    ingredients: [
      { a: "1 kg", i: "Erdbeeren (reif)" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Strunk entfernen, in 5 mm Scheiben schneiden.", bullets: ["Einheitliche Dicke wichtig"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–60 °C", text: "Einlagig dörren, ab und zu wenden.", bullets: ["Hoher Wassergehalt – brauchen Zeit"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Luftdicht lagern, möglichst kühl.", bullets: ["Erdbeeren ziehen Feuchtigkeit – Silicagel im Glas hilft"] },
    ],
    tips: ["Ganze kleine Erdbeeren lassen sich auch gut dörren – dann 10–14 h.", "Perfekt für hausgemachtes Müsli."],
  }),
  r({
    id: "pflaumen-doerren", name: "Pflaumen (Trockenpflaumen)", method: "dorr", cat: "Obst", diff: 1,
    time: "10–18 h", pit: "55–65 °C", core: "Weich-lederig, kein Feuchtigkeitskern", wood: "Graef DA506", yield: "ca. 250 g/kg",
    blurb: "Selbstgemachte Trockenpflaumen: konzentriert, saftig, ohne Zusätze.",
    ingredients: [
      { a: "1 kg", i: "reife Pflaumen/Zwetschgen" },
    ],
    phases: [
      { label: "Halbieren", kind: "prep", dur: "15 min", temp: "—", text: "Pflaumen halbieren, Stein entfernen, mit Schnittfläche nach oben legen.", bullets: ["Hautseite nach unten schützt die Schnittfläche"] },
      { label: "Dörren", kind: "dry", dur: "10–18 h", temp: "55–65 °C", text: "Langzeit-Dörren. Probe: Halbierung biegen – lederig, kein flüssiger Kern.", bullets: ["Geduldiges Dörren bei niedriger Temperatur = beste Qualität"] },
      { label: "Abkühlen & Lagern", kind: "finish", dur: "2 h", temp: "Raumtemperatur", text: "Auskühlen, luftdicht lagern.", bullets: ["Im Kühlschrank monatelang haltbar"] },
    ],
    tips: ["Blanchieren (1 min kochendes Wasser, abschrecken) beschleunigt das Dörren.", "Für Müsli, als Kompott-Base oder einfach pur."],
  }),
  r({
    id: "fruchtleder", name: "Fruchtleder (Apfel-Himbeere)", method: "dorr", cat: "Obst", diff: 2,
    time: "8–12 h", pit: "55–65 °C", core: "Nicht klebend, biegsam", wood: "Graef DA506", yield: "ca. 6–8 Streifen",
    blurb: "Püriertes Obst dünn auf Folie gestrichen – das gesunde Fruit Rollup.",
    ingredients: [
      { a: "500 g", i: "Äpfel, geschält und entkernt" },
      { a: "250 g", i: "Himbeeren (frisch oder TK)" },
      { a: "2 EL", i: "Honig oder Agavendicksaft" },
    ],
    phases: [
      { label: "Pürieren", kind: "prep", dur: "15 min", temp: "—", text: "Äpfel kurz weichkochen, pürieren, Himbeeren untermischen, passieren.", bullets: ["Püree muss glatt und gleichmäßig sein", "Zu flüssig: etwas einkochen"] },
      { label: "Aufstreichen", kind: "prep", dur: "10 min", temp: "—", text: "Dörrfolie auf Gitter legen, Püree ca. 3–4 mm dünn aufstreichen.", bullets: ["Nicht zu dünn – reißt dann beim Ablösen"] },
      { label: "Dörren", kind: "dry", dur: "8–12 h", temp: "55–65 °C", text: "Dörren bis die Oberfläche nicht mehr klebt.", bullets: ["Test: Finger drücken – kein Abdruck = fertig"] },
      { label: "Rollen & Lagern", kind: "finish", dur: "—", temp: "kühl", text: "Auf Backpapier aufgerollt lagern.", bullets: [] },
    ],
    tips: ["Dörrfolie (Silikonmatte) ist Pflicht – normales Gitter hält das Püree nicht.", "Mit Beeren, Mango, Aprikose oder Mischungen variieren."],
  }),
  r({
    id: "tomatenchips", name: "Tomatenchips / getrocknete Tomaten", method: "dorr", cat: "Obst", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Lederig bis knusprig", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "In Olivenöl und Kräutern mariniert oder pur – intensivste Tomatenwürze.",
    ingredients: [
      { a: "1 kg", i: "Strauchtomaten oder Kirschtomaten" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Oregano, Knoblauch" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Strauchtomaten in 5–8 mm Scheiben, Kirschtomaten halbieren.", bullets: ["Wässrige Kerne herausschaben verkürzt die Dörrzeit"] },
      { label: "Würzen", kind: "prep", dur: "5 min", temp: "—", text: "Mit Salz würzen (entzieht Wasser), Kräuter streuen.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Einlagig dörren bis lederig oder knusprig.", bullets: ["Lederig: ideal in Öl einlegen", "Knusprig: als Chips essen"] },
      { label: "Einlegen (optional)", kind: "finish", dur: "—", temp: "kühl", text: "Lederige Tomaten in Olivenöl mit Kräutern und Knoblauch einlegen.", bullets: ["Im Kühlschrank bis 4 Wochen haltbar"] },
    ],
    tips: ["Getrocknete Tomaten in Öl sind kein Langzeitprodukt – kühl und innerhalb 4 Wochen aufbrauchen.", "Zum Backen von Brot, als Pasta-Zutat oder auf Käseplatten."],
  }),

  /* ---- GEMÜSE ---- */
  r({
    id: "pilze-getrocknet", name: "Getrocknete Pilze", method: "dorr", cat: "Gemüse", diff: 1,
    time: "4–8 h", pit: "40–50 °C", core: "Knusprig-trocken, kein feuchter Kern", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "Champignons, Steinpilze oder Pfifferlinge: konzentriert, aromatisch, monatelang haltbar.",
    ingredients: [
      { a: "1 kg", i: "frische Pilze (Champignons, Steinpilze, Pfifferlinge)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Pilze putzen (nicht waschen!), in 5 mm Scheiben schneiden.", bullets: ["Wasser im Pilz verlangsamt das Trocknen enorm"] },
      { label: "Dörren", kind: "dry", dur: "4–8 h", temp: "40–50 °C", text: "Bei niedriger Temperatur schonend dörren.", bullets: ["Tiefe Temp erhält Aroma und Enzyme", "Steinpilze können bis 10 h brauchen"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, dunkel", text: "Vollständig trocken, luftdicht lagern.", bullets: ["Im Schraubglas 12+ Monate haltbar"] },
    ],
    tips: ["Wildpilze vor dem Dörren auf Schädlinge prüfen.", "Gemahlen als Pilzpulver: intensiver Umami-Würzer für Saucen."],
  }),
  r({
    id: "karottenchips", name: "Karottenchips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 100 g/kg",
    blurb: "Leicht süßlich, knusprig – weit besser als Fertig-Gemüsechips.",
    ingredients: [
      { a: "1 kg", i: "Karotten" },
      { a: "je 1 TL", i: "Salz, Paprika, Kreuzkümmel (optional)" },
    ],
    phases: [
      { label: "Blanchieren", kind: "cook", dur: "3 min", temp: "kochendes Wasser", text: "Geschälte, in 3 mm Scheiben geschnittene Karotten kurz blanchieren, abschrecken.", bullets: ["Blanchieren deaktiviert Enzyme, erhält Farbe und Nährstoffe"] },
      { label: "Würzen & Belegen", kind: "prep", dur: "10 min", temp: "—", text: "Abtupfen, würzen, einlagig auf Gitter legen.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Bis knusprig dörren.", bullets: ["Abkühlen lassen – Chips werden dann erst wirklich knusprig"] },
    ],
    tips: ["Auch ohne Blanchieren möglich, aber Farbe und Biss sind dann schlechter.", "Mit Curry-Salz würzen für eine spannende Variante."],
  }),
  r({
    id: "paprikachips", name: "Paprikachips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Knusprig oder lederig", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "Süße Paprika als Chips oder lederig für Gulasch-Würzmischungen.",
    ingredients: [
      { a: "1 kg", i: "rote, gelbe oder orangefarbene Paprika" },
      { a: "1 TL + 1 EL", i: "Salz, Olivenöl (optional)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Paprika schälen (optional), entkernen, in Ringe oder Streifen schneiden.", bullets: ["Geschälte Paprika nehmen Würze besser auf"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Einlagig dörren.", bullets: ["Lederig (8 h): für Paprikapulver mahlen oder einlegen", "Knusprig (10+ h): als Chip essen"] },
      { label: "Lagern / Verarbeiten", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Luftdicht lagern oder zu Pulver mahlen.", bullets: [] },
    ],
    tips: ["Selbstgemachtes Paprikapulver ist weitaus aromatischer als Supermarktware.", "Rote Paprika ergibt süßes, gelbe ein milderes Pulver."],
  }),
  r({
    id: "gruenkohl-chips", name: "Grünkohl-Chips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "3–6 h", pit: "50–55 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 30 g/100 g Kohl",
    blurb: "Leicht, knusprig, gesund – mit Olivenöl und Meersalz kaum zu überbieten.",
    ingredients: [
      { a: "500 g", i: "Grünkohl, Stiele entfernt" },
      { a: "2 EL", i: "Olivenöl" },
      { a: "2 EL + je 1 TL", i: "Meersalz, Hefeflocken, Paprika, Knoblauch" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Blätter grob zupfen, mit Öl und Gewürzen massieren.", bullets: ["Öl hilft beim Knusprig-werden"] },
      { label: "Dörren", kind: "dry", dur: "3–5 h", temp: "50–55 °C", text: "Einlagig auf Gitter legen, dörren bis knusprig.", bullets: ["Kohl verliert viel Volumen – mehrere Ladungen einplanen"] },
    ],
    tips: ["Hefeflocken + Knoblauch ergibt einen 'Käse'-ähnlichen Geschmack.", "Sofort essen – nimmt schnell Feuchtigkeit aus der Luft auf."],
  }),
  r({
    id: "zucchini-chips", name: "Zucchini-Chips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "5–8 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 60 g/kg",
    blurb: "Wenn der Garten Zucchini-Überschuss produziert – die beste Verwertung.",
    ingredients: [
      { a: "1 kg", i: "Zucchini" },
      { a: "je 1 TL", i: "Meersalz, Kräuter der Provence, Parmesan (optional)" },
    ],
    phases: [
      { label: "Schneiden & Salzen", kind: "prep", dur: "30 min", temp: "—", text: "In 3–4 mm Scheiben schneiden, salzen, 20 min ziehen lassen, gut abtupfen.", bullets: ["Salzen entzieht Wasser und beschleunigt das Dörren"] },
      { label: "Dörren", kind: "dry", dur: "5–8 h", temp: "55–65 °C", text: "Einlagig dörren bis knusprig.", bullets: [] },
    ],
    tips: ["Parmesan draufhobeln vor dem Dörren = intensiver Umami-Snack.", "Auch gelbe Zucchini / Patisson funktionieren super."],
  }),
  r({
    id: "kraeuter-getrocknet", name: "Kräuter trocknen", method: "dorr", cat: "Gemüse", diff: 1,
    time: "2–4 h", pit: "35–40 °C", core: "Rascheltrocken, zerreibbar", wood: "Graef DA506", yield: "ca. 15–20 g/100 g frisch",
    blurb: "Garten- oder Balkenkräuter schonend bei niedriger Temperatur trocknen.",
    ingredients: [
      { a: "je 1 Bund", i: "Basilikum, Petersilie, Rosmarin, Thymian, Oregano, Minze" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Kräuter waschen, schütteln, Stiele entfernen, einlagig auf Gitter legen.", bullets: ["Trockene Kräuter erhalten mehr Aroma"] },
      { label: "Dörren", kind: "dry", dur: "2–4 h", temp: "35–40 °C", text: "Schonend bei niedrigster Temperatur trocknen.", bullets: ["Zu heiß = Aromastoffe verdampfen", "Test: Blatt reiben und riechen – intensiv = fertig"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "dunkel, trocken", text: "Ganz lagern, erst kurz vor Verwendung zerreiben.", bullets: ["Ganzblätter behalten Aroma länger als gemahlen"] },
    ],
    tips: ["Morgens nach dem Tau ernten – dann höchster Aromastoffgehalt.", "Im Dunkeln lagern (Licht baut ätherische Öle ab)."],
  }),
  r({
    id: "zwiebeln-knoblauch", name: "Zwiebeln & Knoblauch (Pulver)", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Knochentrocken, bricht", wood: "Graef DA506", yield: "ca. 120 g Pulver/kg",
    blurb: "Selbstgemachtes Zwiebel- und Knoblauchpulver – deutlich aromatischer als Fertigprodukte.",
    ingredients: [
      { a: "1 kg", i: "Zwiebeln oder Knoblauchzehen" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "—", text: "Zwiebeln in 3–4 mm Ringe, Knoblauch in dünne Scheiben oder halbiert.", bullets: ["Achtung: Knoblauch riecht beim Dörren intensiv"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Bis absolut trocken und brüchig dörren.", bullets: ["Muss vollständig trocken sein für Pulverherstellung"] },
      { label: "Mahlen", kind: "finish", dur: "5 min", temp: "—", text: "In Gewürzmühle oder Mixer fein mahlen.", bullets: ["Luftdicht lagern – nimmt sonst Feuchtigkeit auf"] },
    ],
    tips: ["Feuchtigkeit ist der Feind – absolut trocken mahlen und sofort luftdicht verpacken.", "Knoblauch scharf im Zimmer riechen lassen oder Fenster öffnen."],
  }),

  /* ---- FLEISCH & FISCH ---- */
  r({
    id: "beef-jerky", name: "Beef Jerky (klassisch)", method: "dorr", cat: "Fleisch & Fisch", diff: 2,
    time: "1 Tag + 4–8 h", pit: "70 °C", core: "Lederig, kein feuchter Kern", wood: "Graef DA506", yield: "ca. 400 g/kg",
    blurb: "Würzige Rindfleisch-Streifen, bei maximaler Dörrtemperatur sicher getrocknet.",
    ingredients: [
      { a: "1 kg", i: "Rindfleisch (Oberschale, Hüfte, mager, pariert)" },
      { a: "80 ml", i: "Sojasoße" },
      { a: "30 ml", i: "Worcestershire-Sauce" },
      { a: "je 1 TL", i: "Knoblauch, Pfeffer, Paprika, Zucker, Chiliflocken" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "angefroren", text: "Fleisch leicht anfrieren (1 h Tiefkühlschrank), in 5–8 mm Streifen schneiden.", bullets: ["Quer zur Faser: zarter", "Mit der Faser: mehr Biss und Zähigkeit"] },
      { label: "Marinieren", kind: "cure", dur: "12–24 h", temp: "0–4 °C", text: "In Marinade einlegen, vakuumieren oder abgedeckt kühlen.", bullets: ["Länger = intensiver Geschmack", "Mindestens 12 h für durchgehende Würzung"] },
      { label: "Abtupfen", kind: "prep", dur: "15 min", temp: "—", text: "Aus Marinade nehmen, gut abtupfen, einlagig auf Gitter.", bullets: ["Feuchte Oberfläche verlängert Dörrzeit"] },
      { label: "Dörren", kind: "dry", dur: "4–8 h", temp: "70 °C (Graef-Maximum)", text: "Bei 70 °C dörren – der einzige sichere Wert für rohes Fleisch im DA506.", bullets: ["70 °C tötet Keime ab (inkl. E. coli, Salmonellen)", "Test: Streifen biegen – weißliche Fasern, kein roter Kern = fertig"] },
      { label: "Abkühlen & Lagern", kind: "finish", dur: "1 h", temp: "Raumtemperatur", text: "Auf Gitter abkühlen, dann luftdicht verpacken.", bullets: ["Vakuumverpackt im Kühlschrank 2–4 Wochen", "Ungekühlt nur wenige Tage"] },
    ],
    tips: ["70 °C ist das Maximum des DA506 – für sichere Jerky-Herstellung ideal nutzen.", "Alternative: Fleisch vor dem Dörren 10 min bei 160 °C im Ofen vorerhitzen.", "Immer mageres Fleisch verwenden – Fett wird ranzig."],
  }),
  r({
    id: "chicken-jerky", name: "Chicken Strips Jerky", method: "dorr", cat: "Fleisch & Fisch", diff: 2,
    time: "1 Tag + 4–6 h", pit: "70 °C", core: "Lederig-trocken, kein rosa Kern", wood: "Graef DA506", yield: "ca. 350 g/kg",
    blurb: "Asiatisch-marinierte Hähnchenstreifen – leichter als Rinderjerk, sehr würzig.",
    ingredients: [
      { a: "1 kg", i: "Hähnchenbrust, pariert" },
      { a: "80 ml", i: "Sojasoße" },
      { a: "je 1 TL", i: "Ingwer, Knoblauch, Honig, Sesamöl, Chiliflocken" },
    ],
    phases: [
      { label: "Schneiden & Marinieren", kind: "cure", dur: "12–24 h", temp: "0–4 °C", text: "Hähnchen in 8–10 mm Streifen schneiden, marinieren.", bullets: ["Hähnchen darf nicht roh verzehrt werden – Garzeule 70 °C ist Pflicht"] },
      { label: "Dörren", kind: "dry", dur: "4–6 h", temp: "70 °C", text: "Bei 70 °C vollständig trocknen und garen.", bullets: ["Geflügel immer bei maximaler Dörrtemperatur", "Test: Streifen biegen und brechen = gar und trocken"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl", text: "Abkühlen, vakuumieren, kühlen.", bullets: [] },
    ],
    tips: ["Hähnchen NIE unter 70 °C dörren – Salmonellen-Risiko.", "Teriyaki-Marinade mit Soja, Mirin und Zucker ist eine klassische Variante."],
  }),
  r({
    id: "lachs-jerky", name: "Lachs-Jerky", method: "dorr", cat: "Fleisch & Fisch", diff: 2,
    time: "1 Tag + 4–6 h", pit: "60–65 °C", core: "Lederig, trocken", wood: "Graef DA506", yield: "ca. 300 g/kg",
    blurb: "Intensives Rauch-Teriyaki-Aroma, kompaktes Format – asiatischer Snack-Klassiker.",
    ingredients: [
      { a: "1 kg", i: "Lachsfilet, Sushi-Qualität, entgrätet, ohne Haut" },
      { a: "80 ml", i: "Sojasoße" },
      { a: "2 EL + je 1 TL", i: "brauner Zucker, Ingwer, Knoblauch, Sesamöl" },
    ],
    phases: [
      { label: "Schneiden & Beizen", kind: "cure", dur: "8–12 h", temp: "0–4 °C", text: "In 8–10 mm Streifen schneiden, in Marinade einlegen.", bullets: ["Nur frischen Lachs verwenden"] },
      { label: "Abtupfen", kind: "prep", dur: "10 min", temp: "—", text: "Gut abtupfen, auf Gitter legen.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "4–6 h", temp: "60–65 °C", text: "Bis lederig-trocken dörren.", bullets: ["Fisch gart bei 60 °C durch", "Kein roher Kern erlaubt"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "Kühlschrank", text: "Im Kühlschrank 1–2 Wochen haltbar.", bullets: [] },
    ],
    tips: ["Qualitativ hochwertigen, frischen Lachs (Sashimi-Qualität) verwenden.", "Sesamsamen vor dem Dörren aufstreuen."],
  }),
  r({
    id: "wild-jerky", name: "Wild-Jerky (Reh/Wildschwein)", method: "dorr", cat: "Fleisch & Fisch", diff: 3,
    time: "1 Tag + 6–8 h", pit: "70 °C", core: "Lederig, kein roter Kern", wood: "Graef DA506", yield: "ca. 350 g/kg",
    blurb: "Kräftiges Wildaroma, fein gewürzt – besonders hochwertige Jerky-Variante.",
    ingredients: [
      { a: "1 kg", i: "Wildfleisch (Rehkeule, Wildschweinrücken, mager)" },
      { a: "je 1 TL + 50 ml", i: "Wacholder, Rotwein, Knoblauch, Pfeffer, Sojasoße, Lorbeer" },
    ],
    phases: [
      { label: "Parieren & Schneiden", kind: "prep", dur: "30 min", temp: "leicht angefroren", text: "Fett und Sehnen sorgfältig entfernen, in Streifen schneiden.", bullets: ["Wildtypisches Fett wird rasch ranzig – komplett entfernen"] },
      { label: "Marinieren", kind: "cure", dur: "12–24 h", temp: "0–4 °C", text: "In würziger Wildmarinade einlegen.", bullets: ["Wacholder und Rotwein passen zur Wildwürze"] },
      { label: "Dörren", kind: "dry", dur: "6–8 h", temp: "70 °C", text: "Bei maximaler Dörrtemperatur garen und trocknen.", bullets: ["Wild: immer 70 °C wegen potenzieller Parasiten (Trichinen)"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "Kühlschrank", text: "Vakuumieren und kühlen.", bullets: [] },
    ],
    tips: ["Bei Schwarzwild Trichinenuntersuchung durch den Jagdausübungsberechtigten Pflicht.", "Rehfleisch ist zarter als Schwein – Dörrzeit eher kürzer."],
  }),

  /* ---- SONSTIGES ---- */
  r({
    id: "aktivierte-nuesse", name: "Aktivierte Nüsse & Mandeln", method: "dorr", cat: "Sonstiges", diff: 1,
    time: "12 h einweichen + 12–24 h", pit: "40–45 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 350 g",
    blurb: "Eingeweichte, dann langsam getrocknete Nüsse – bekömmlicher und knuspriger.",
    ingredients: [
      { a: "500 g", i: "Mandeln, Walnüsse oder Cashews" },
      { a: "1 TL", i: "Meersalz pro 500 g" },
      { a: "1 l", i: "Wasser (zum Einweichen)" },
    ],
    phases: [
      { label: "Einweichen", kind: "prep", dur: "12 h", temp: "Raumtemperatur", text: "Nüsse in Salzwasser einweichen.", bullets: ["Reduziert Phytinsäure und macht sie bekömmlicher"] },
      { label: "Abtropfen", kind: "prep", dur: "15 min", temp: "—", text: "Gut abtropfen und abtupfen.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "12–24 h", temp: "40–45 °C", text: "Bei niedriger Temperatur schonend trocknen bis wieder knusprig.", bullets: ["Nüsse einmal wenden", "Test: Mandel beißen – knusprig = fertig"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "In Schraubglas lagern.", bullets: [] },
    ],
    tips: ["Cashews maximal 6–8 h einweichen – werden sonst schleimig.", "Mit Tamari + Chiliflocken für eine würzige Variante."],
  }),
  r({
    id: "brotchips", name: "Brotchips / Knäckebrot", method: "dorr", cat: "Sonstiges", diff: 1,
    time: "3–5 h", pit: "50–60 °C", core: "Knusprig, bricht sauber", wood: "Graef DA506", yield: "ca. 300 g",
    blurb: "Altbackenes Brot sinnvoll verwerten – knusprige Chips oder selbstgemachtes Knäcke.",
    ingredients: [
      { a: "400 g", i: "altbackenes Brot oder Sauerteigbrot" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Rosmarin, Paprika" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "10 min", temp: "—", text: "In dünne Scheiben oder Würfel schneiden, mit Öl und Gewürzen vermengen.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "3–5 h", temp: "50–60 °C", text: "Bis knusprig trocknen.", bullets: [] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "trocken", text: "Offen lagern oder in Papier wickeln.", bullets: [] },
    ],
    tips: ["Perfekt für Reste – kein Brot wegwerfen.", "Als Croutons für Salate oder Suppen."],
  }),
  r({
    id: "granola-doerren", name: "Selbstgemachtes Granola", method: "dorr", cat: "Sonstiges", diff: 1,
    time: "4–6 h", pit: "50–55 °C", core: "Goldbraun, knusprig", wood: "Graef DA506", yield: "ca. 500 g",
    blurb: "Haferflocken, Nüsse, Honig – schonend im Dörrer statt aggressiv im Ofen.",
    ingredients: [
      { a: "300 g", i: "Haferflocken (grob)" },
      { a: "100 g", i: "Nüsse und Kerne (Mandeln, Kürbiskerne, Cashews)" },
      { a: "80 g", i: "Honig oder Ahornsirup" },
      { a: "50 ml", i: "Kokosöl oder Pflanzenöl" },
      { a: "je 1 TL", i: "Zimt, Vanille, Salz" },
    ],
    phases: [
      { label: "Mischen", kind: "prep", dur: "10 min", temp: "—", text: "Alle Zutaten vermengen, auf Dörrfolie ausstreichen.", bullets: ["Gut verteilen, nicht zu dick"] },
      { label: "Dörren", kind: "dry", dur: "4–6 h", temp: "50–55 °C", text: "Dörren und gelegentlich umrühren.", bullets: ["Öfter wenden = gleichmäßige Röstung", "Dörrer statt Ofen: mehr Kaustruktur, weniger Verbrennen"] },
      { label: "Auskühlen", kind: "finish", dur: "1 h", temp: "Raumtemperatur", text: "Vollständig auskühlen – erst dann wird es richtig knusprig.", bullets: [] },
    ],
    tips: ["Trockenfrüchte erst nach dem Dörren untermengen – sonst werden sie hart.", "Im Schraubglas 4–6 Wochen haltbar."],
  }),

  /* ---- GRUNDLAGEN DÖRREN ---- */
  r({
    id: "g-doerren", name: "Grundlagen: Dörren (Graef DA506)", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Wissen", pit: "35–70 °C", core: "", wood: "—", yield: "",
    blurb: "Temperaturempfehlungen, Prüftests, Lagerung und Sicherheit für den Graef DA506.",
    ingredients: [],
    phases: [
      { label: "Der Graef DA506", kind: "prep", dur: "—", temp: "35–70 °C", text: "5 Gitter, 500 W, stufenlos verstellbar von 35–70 °C, 12-h-Timer. Bodengebläse für gleichmäßige Luftzirkulation.", bullets: ["Gitter nach Hälfte der Zeit tauschen für gleichmäßiges Ergebnis", "Gleichmäßige Stücke = gleiches Dörrtempo"] },
      { label: "Temperaturzonen", kind: "dry", dur: "—", temp: "35–70 °C", text: "35–45 °C: Kräuter, Blüten, aktivierte Nüsse. 50–55 °C: Obst, Gemüse, Granola. 55–65 °C: Obst-Chips, Tomaten, Jerky-Vorstufe. 70 °C: Fleisch und Fisch (Sicherheit!).", bullets: ["Niedrig = schonend, mehr Aroma", "Hoch = schneller, sicherer bei Fleisch"] },
      { label: "Dönrtest (Fertig-Prüfung)", kind: "finish", dur: "—", temp: "—", text: "Stets nach dem Abkühlen prüfen – warm fühlt sich vieles weicher an als es ist.", bullets: ["Obst: lederig, nicht klebrig, kein Feuchtkern", "Gemüse: knusprig-trocken", "Fleisch/Fisch: lederig, biegt weiß-faserig, kein rosa/roter Kern", "Kräuter: rascheln, zerbröckeln beim Reiben"] },
      { label: "Lagerung", kind: "mature", dur: "—", temp: "kühl, dunkel, trocken", text: "Luftdicht in Schraubgläsern, Vakuumbeuteln oder Zip-Beuteln lagern.", bullets: ["Silicagel-Päckchen gegen Restfeuchtigkeit", "Obst/Gemüse: 6–18 Monate; Fleisch: 1–4 Wochen (Kühlschrank), bis 6 Monate (Vakuum Tiefkühl)"] },
      { label: "Sicherheit Fleisch", kind: "cure", dur: "—", temp: "70 °C", text: "Rohes Fleisch und Fisch immer bei 70 °C (max.) dörren. Geflügel nie unterschreiten.", bullets: ["70 °C ist das Maximum des DA506 – reicht für sichere Jerky-Herstellung", "Alternative: Fleisch 10 min bei 160 °C im Backofen vorerhitzen"] },
    ],
    tips: ["Dörrfolien (Silikonmatten) sind Pflicht für Pürees/Fruchtleder und klebrige Produkte.", "Trays von unten nach oben rotieren für gleichmäßiges Dörren – das untere Gitter ist am heißesten."],
  }),


  /* ============================ MEHR RÄUCHERN ============================ */

  r({
    id: "wildschinken-reh", name: "Wildschinken (Rehkeule)", method: "kalt", cat: "Schinken", diff: 3,
    time: "4–5 Wochen", pit: "8–15 °C", core: "", wood: "Buche + Wacholder + Tanne", yield: "ca. 1,5 kg",
    blurb: "Zartes Rehfleisch als edler Wildschinken – milder, aromatischer als Schwein.",
    ingredients: [
      { a: "1 Rehkeule", i: "ca. 2 kg, ausgelöst oder am Knochen" },
      { a: "40 g/kg", i: "40 g/kg Fleisch" },
      { a: "5 g/kg", i: "Zucker" },
      { a: "je 1 TL", i: "Wacholder (gemörsert), Pfeffer, Lorbeer, Thymian, Rosmarin" },
    ],
    phases: [
      { label: "Parieren", kind: "prep", dur: "30 min", temp: "kalt", text: "Sehnen und Silberhaut komplett entfernen. Fett parieren – Wildfett wird ranzig.", bullets: ["Sehnen beeinträchtigen Textur und Haltbarkeit", "Völlig makellos parieren ist bei Wild Pflicht"] },
      { label: "Trocken pökeln", kind: "cure", dur: "12–14 Tage", temp: "4–7 °C", text: "NPS + Gewürze einreiben, vakuumieren oder eng abgedeckt im Kühlschrank.", bullets: ["Täglich wenden und den ausgetretenen Saft einmassieren", "Vakuum beschleunigt den Prozess auf 10–12 Tage"] },
      { label: "Durchbrennen", kind: "rest", dur: "3–4 Tage", temp: "10–15 °C, luftig", text: "Ohne Salz, aufgehängt – Salz verteilt sich gleichmäßig, Oberfläche trocknet.", bullets: [] },
      { label: "Abhängen", kind: "dry", dur: "5–7 Tage", temp: "10–15 °C, 70–75 % LF", text: "Oberfläche soll trocken sein und leicht angetrocknete Haut bilden.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "5–7 Räuchergänge à 8–12 h", temp: "unter 22 °C", text: "Kalt räuchern mit Buche und Wacholder. Zwischen Räuchergängen 12 h Pause.", bullets: ["Wacholder gibt typisches Wildaroma", "Tanne/Kiefernnadeln für 1 Gang = harzig-frisch"] },
      { label: "Reifen", kind: "mature", dur: "1–2 Wochen", temp: "10–15 °C, trocken", text: "Kühler, luftiger Ort – Geschmack entwickelt sich weiter.", bullets: [] },
    ],
    tips: ["Rehfleisch ist deutlich magerer als Schwein – kürzere Pökelzeit reicht.", "Wacholder-Rauch ist das typische Wildschinken-Aroma, nie weglassen.", "Im Zweifelsfall eher kürzer räuchern – Wild nimmt Rauch intensiver auf."],
  }),

  r({
    id: "schwarzer-speck", name: "Tiroler Speck (Bauchspeck kaltgeräuchert)", method: "kalt", cat: "Schinken", diff: 2,
    time: "4–5 Wochen", pit: "unter 22 °C", core: "", wood: "Buche + Fichte/Tanne", yield: "ca. 1,2 kg",
    blurb: "Typischer Südtiroler Speck – trocken gepökelt, kaltgeräuchert und an der Luft gereift.",
    ingredients: [
      { a: "1,5 kg", i: "Schweinebauch, Schwarte dran, ohne Rippen" },
      { a: "38 g/kg", i: "38 g/kg" },
      { a: "8 g/kg", i: "grobes Meersalz" },
      { a: "je 1 TL", i: "Wacholder, Koriander, Lorbeer, Majoran, Pfeffer, Knoblauch (Paste)" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "10–12 Tage", temp: "4–6 °C", text: "Gewürzmischung einreiben, kühl pökeln. Täglich wenden.", bullets: [] },
      { label: "Abwaschen & Trocknen", kind: "prep", dur: "1 Tag", temp: "kühl und luftig", text: "Mit lauwarmem Wasser abspülen, trocken tupfen, aufhängen.", bullets: [] },
      { label: "Räuchern (4–5 Gänge)", kind: "smoke", dur: "4–5 × 6–8 h", temp: "unter 20 °C", text: "Kaltrauch von Buche + Tanne. Zwischen den Gängen mindestens 12–24 h Luftpause.", bullets: ["Tanne und Fichte sind für Südtiroler Speck typisch", "Stärker räuchern als bei Schwarzwälder Schinken"] },
      { label: "Luftreifen", kind: "mature", dur: "2–3 Wochen", temp: "12–16 °C", text: "Luftig und kühl hängen, leicht ansteigendes Raumklima tolerierbar.", bullets: [] },
    ],
    tips: ["Schwarte dran lassen – schützt und verhindert Austrocknung.", "Echter Südtiroler Speck reift mind. 22 Wochen – für Hausversion reichen 5 Wochen."],
  }),

  r({
    id: "haehnchenkeulen-heiss", name: "Hähnchenkeulen heißgeräuchert", method: "heiss", cat: "Geflügel", diff: 1,
    time: "4–6 h", pit: "85–110 °C", core: "82 °C", wood: "WSM · Apfel + Kirsche",
    blurb: "Zarte, saftige Keulen mit tiefem Raucharoma – Einsteigerrezept für den WSM.",
    ingredients: [
      { a: "6", i: "Hähnchenkeulen (Ober- und Unterschenkel)" },
      { a: "3–4 EL", i: "Rub: Paprika, Knoblauch, Salz, Pfeffer, brauner Zucker, Thymian" },
      { a: "2 EL", i: "Öl" },
    ],
    phases: [
      { label: "Rub", kind: "prep", dur: "30 min", temp: "—", text: "Keulen mit Öl einreiben, Rub großzügig auftragen. 30 min ruhen.", bullets: [] },
      { label: "WSM einrichten", kind: "prep", dur: "20 min", temp: "—", text: "Minion Method auf 95–105 °C. Wasserschale füllen. Apfel- und Kirschholzchips auf die Kohlen.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "3–4 h", temp: "95–110 °C", text: "Keulen auf den oberen Rost, Haut nach oben. Deckel zu.", bullets: ["Nach 2 h KT messen – Ziel 82 °C am dicksten Punkt", "Haut wird nicht knusprig beim Räuchern – dafür später kurz angrillen"] },
      { label: "Finish (optional)", kind: "finish", dur: "5–8 min", temp: "direkte Hitze", text: "Für knusprige Haut: kurz über direkte Glut oder in heißer Pfanne anbraten.", bullets: [] },
    ],
    tips: ["Apfel + Kirsche = fruchtig-milder Rauch, ideal für Geflügel.", "Haut vorher einritzen und Rub auch drunter schieben für mehr Aroma."],
  }),

  r({
    id: "garnelen-heiss", name: "Geräucherte Garnelen", method: "heiss", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "45 min", pit: "110–130 °C", core: "opal-rosa, leicht festig", wood: "WSM · Zitrusholz oder Apfel",
    blurb: "Schnellstes Räucherprojekt – Garnelen nach 30–40 min fertig, Rauch macht sie unwiderstehlich.",
    ingredients: [
      { a: "500 g", i: "Riesengarnelen, roh, mit Schale (16/20er)" },
      { a: "2–3 EL", i: "Olivenöl, Zitrone, Knoblauch, Paprika, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Marinade", kind: "marinate", dur: "30 min", temp: "Kühlschrank", text: "Garnelen in Öl, Zitronensaft, Knoblauch und Gewürzen marinieren.", bullets: [] },
      { label: "WSM auf 120–130 °C", kind: "prep", dur: "15 min", temp: "120–130 °C", text: "WSM heiß einrichten. Zitrusholzchips auflegen.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "25–35 min", temp: "120–130 °C", text: "Garnelen auf den Rost (oder Räuchersieb). Fertig wenn opal-rosa und leicht fest.", bullets: ["Nicht überwaren – Garnelen werden gummig", "Mit Schale räuchern = mehr Aroma und Schutz vor Austrocknen"] },
    ],
    tips: ["Zitrusholz oder Apfel – kein Hickory, der überdeckt das feine Meeresfrüchte-Aroma.", "Als Tapas oder auf Aioli-Crostinis servieren."],
  }),

  /* ============================ MEHR DÖRREN ============================ */

  r({
    id: "ananas-dorr", name: "Ananas-Scheiben getrocknet", method: "dorr", cat: "Obst", diff: 1,
    time: "8–12 h", pit: "55–65 °C", core: "Lederig, nicht klebrig", wood: "Graef DA506", yield: "ca. 150 g/kg",
    blurb: "Süß-säuerlich konzentriert – frische Ananas trocknen ist viel besser als Dose.",
    ingredients: [
      { a: "1", i: "reife Ananas" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Ananas schälen, in 5–8 mm Scheiben schneiden, Mittelstrunk herausschneiden.", bullets: ["Gleichmäßige Dicke = gleichmäßiges Trocknen"] },
      { label: "Dörren", kind: "dry", dur: "8–12 h", temp: "55–65 °C", text: "Einlagig auf Gitter, nach halber Zeit wenden.", bullets: ["Hoher Zuckergehalt – klebt anfangs stark", "Silikonmatte empfohlen für die ersten 2 h"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Vollständig abkühlen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Für Hawaii-Jerky: in Sojasoße + Ingwer marinieren vor dem Dörren.", "Perfekt als Müsli-Topping oder Dekoration für Desserts."],
  }),

  r({
    id: "chili-flakes", name: "Chili-Flakes selbst gemacht", method: "dorr", cat: "Gemüse", diff: 1,
    time: "4–6 h", pit: "55–65 °C", core: "Knochentrocken, knistert", wood: "Graef DA506", yield: "ca. 50 g/500 g",
    blurb: "Selbst getrocknete Chilis sind weit aromatischer als gekaufte – und du bestimmst die Schärfe.",
    ingredients: [
      { a: "500 g", i: "frische Chilis (Cayenne, Jalapeño, Bird's Eye – je nach Schärfe)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Chilis waschen, Stiele entfernen, längs halbieren oder ganz lassen (ganze trocknen langsamer).", bullets: ["Handschuhe tragen – Capsaicin brennt in den Augen!", "Kerne drin lassen = schärfer; entfernen = milder"] },
      { label: "Dörren", kind: "dry", dur: "4–6 h", temp: "55–65 °C", text: "Auf Gitter legen, dörren bis absolut knochentrocken.", bullets: ["Muss knistern wenn man sie biegt – sonst noch nicht fertig", "Lüften beim Öffnen – Capsaicin-Dampf kann reizen"] },
      { label: "Zu Flocken", kind: "finish", dur: "5 min", temp: "—", text: "Im Mörser, Mixer oder mit Gewürzmühle zu Flocken verarbeiten.", bullets: ["Gröber = Flocken, feiner = Pulver (Cayennepfeffer)", "Sofort luftdicht verpacken"] },
    ],
    tips: ["Rauchige Chili-Flakes: vorher kurz im WSM heißräuchern (30 min), dann im Dörrer fertig trocknen.", "Gemischte Sorten = komplexes Aroma."],
  }),

  r({
    id: "rote-bete-chips", name: "Rote Bete Chips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–8 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "Leuchtend rote, knusprige Chips – erdig-süßlicher Geschmack, optisch beeindruckend.",
    ingredients: [
      { a: "500 g", i: "rohe Rote Bete, geschält" },
      { a: "2 EL", i: "Olivenöl, Meersalz, optional Balsamico" },
    ],
    phases: [
      { label: "Dünn schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Rote Bete mit Mandoline oder scharfem Messer in 2–3 mm Scheiben schneiden.", bullets: ["Handschuhe! Rote Bete färbt extrem stark", "Dünn = knusprig; dicker = lederig"] },
      { label: "Würzen", kind: "prep", dur: "5 min", temp: "—", text: "Leicht mit Öl einreiben, salzen.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "6–8 h", temp: "55–65 °C", text: "Einlagig dörren. Nach dem Abkühlen werden sie noch knuspriger.", bullets: [] },
    ],
    tips: ["Goldene Rote Bete für eine schöne Farbkombination dazumischen.", "Als Salat-Topping oder zum Aperitif servieren."],
  }),

  /* ============================ MEHR GRILL ============================ */

  r({
    id: "tomahawk-steak", name: "Tomahawk Steak – Reverse Sear", method: "grill", cat: "Rindfleisch", diff: 2,
    time: "2,5–3 h", pit: "95–105 °C → 280–320 °C sear", core: "52–54 °C (medium-rare)", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Das spektakulärste Steak – 1 kg Ribeye mit langem Knochen, Reverse Sear für perfekte Garung.",
    ingredients: [
      { a: "1", i: "Tomahawk Steak (900 g–1,3 kg, mind. 5 cm dick)" },
      { a: "je 1–2 TL", i: "grobes Meersalz (1–2 h vorher), schwarzer Pfeffer erst nach dem Sear" },
    ],
    phases: [
      { label: "Dry Brine", kind: "prep", dur: "1–2 h (mind. 30 min)", temp: "Raumtemperatur", text: "Großzügig salzen, auf Gitter ruhen lassen.", bullets: [] },
      { label: "Indirekte Phase", kind: "indirect", dur: "1,5–2 h", temp: "95–105 °C", text: "Bei sehr niedriger Temperatur bis auf KT 46–48 °C bringen.", bullets: ["Holzchips für leichten Rauch empfohlen", "Nicht wenden – einfach liegen lassen"] },
      { label: "Pause & Hochheizen", kind: "rest", dur: "15 min", temp: "—", text: "Steak raus, Grill auf maximale Temperatur bringen (280–320 °C).", bullets: ["Weber: frischen Anzündkamin voll, alle Lüftungen auf", "Gasgrill: alle Brenner max., Deckel zu – 15 min vorheizen"] },
      { label: "Sear", kind: "direct", dur: "90 Sek./Seite", temp: "280–320 °C", text: "Sehr scharf sear-en: 90 Sek. auf jeder Seite, einmal um 90° drehen für Grillmuster.", bullets: ["Butter + Knoblauch + Thymian drüber – Basting", "Ziel KT nach Sear: 52–54 °C für medium-rare"] },
      { label: "Ruhen", kind: "finish", dur: "10 min", temp: "—", text: "Auf Holzbrett ruhen. Erst DANN pfeffern und aufschneiden.", bullets: [] },
    ],
    tips: ["Pfeffer erst nach dem Sear – verbrennt bei 300 °C und wird bitter.", "Knochen nach dem Essen aushöhlen und Knochenmark auflecken – nicht zu übertreffen."],
  }),

  r({
    id: "lammrack", name: "Lammrack vom Grill", method: "grill", cat: "Lammfleisch", diff: 2,
    time: "45 min", pit: "indirekt 150 °C → direkt 230 °C", core: "58–62 °C (rosé)", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Frenched Lammrack – kurz und heiß, mit Kräuterkruste, rosé serviert.",
    ingredients: [
      { a: "1", i: "Lammrack (8 Knochen), frenched (Knochen gesäubert)" },
      { a: "je 1–2 EL", i: "Dijonsenf, Rosmarin, Thymian, Knoblauch, Paniermehl, Olivenöl" },
      { a: "je 1 TL", i: "Salz, Pfeffer" },
    ],
    phases: [
      { label: "Kräuterkruste", kind: "prep", dur: "15 min", temp: "—", text: "Senf außen einreiben, Kräuter-Paniermehl-Knoblauch-Öl mischen und auftragen.", bullets: [] },
      { label: "Indirekte Phase", kind: "indirect", dur: "20–25 min", temp: "150–160 °C", text: "Indirekt bis KT 52–54 °C.", bullets: [] },
      { label: "Sear (optional)", kind: "direct", dur: "2–3 min", temp: "230–260 °C", text: "Kurz auf der Fleischseite anbraten für Kruste.", bullets: [] },
      { label: "Ruhen", kind: "finish", dur: "8 min", temp: "—", text: "Ruhen, dann zwischen den Knochen aufschneiden.", bullets: [] },
    ],
    tips: ["Knochen mit Alufolie einwickeln damit sie nicht schwarz werden.", "Rosé ist für Lamm die ideale Garung – 58–62 °C."],
  }),

  r({
    id: "garnelen-spieß-grill", name: "Garnelen-Spieße vom Grill", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "1 h marinieren + 8 min Grillen", pit: "direkt 220–250 °C", core: "opal-rosa, fest", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "In 8 Minuten fertig – marinierte Garnelen direkt über der Glut, perfekt als Vorspeise.",
    ingredients: [
      { a: "500 g", i: "Riesengarnelen roh, mit Schale (16/20er)" },
      { a: "4 EL", i: "Olivenöl" },
      { a: "3 Zehen + je 1 TL", i: "Knoblauch (3 Zehen), Zitronensaft, Paprika, Petersilie, Salz" },
    ],
    phases: [
      { label: "Marinieren", kind: "marinate", dur: "30–60 min", temp: "Kühlschrank", text: "Garnelen in Marinade einlegen.", bullets: ["Eingeweichte Holzspieße verwenden – sonst verbrennen sie"] },
      { label: "Grillen", kind: "direct", dur: "2–4 min/Seite", temp: "220–250 °C direkt", text: "Direkt über Kohlen/Brenner. Je Seite 2–3 min bis opal-rosa.", bullets: ["Sofort vom Grill wenn rosa – Garnelen werden schnell gummig", "Mit Schale grillen = mehr Aroma und Schutz"] },
    ],
    tips: ["Chili-Limetten-Variante: Chiliflocken + Limettenzeste in die Marinade.", "Knoblauchmayonnaise als Dip ist perfekt dazu."],
  }),

  /* ============================ TEMPERATURTABELLE ============================ */

  r({
    id: "temperatur-tabelle", name: "Kerntemperatur-Tabelle", method: "basis", cat: "Grundlagen", diff: 1,
    time: "Referenz", pit: "—", core: "", wood: "Alle Geräte", yield: "",
    blurb: "Kern- und Gartemperaturen für Fleisch, Geflügel, Fisch, Wild und alle Grillmethoden auf einen Blick.",
    ingredients: [],
    phases: [],
    tips: [
      "Kerntemperatur immer an der dicksten Stelle messen, nicht am Knochen.",
      "Nach dem Grillen steigt die KT noch 2–4 °C nach (Carry-Over). Rechtzeitig abnehmen!",
      "Geflügel und Geflügelprodukte immer auf mindestens 74 °C – keine Ausnahmen.",
      "Wildschwein immer komplett durchgaren (min. 75 °C) wegen Trichinenrisiko.",
    ],
    tables: [
      {
        title: "Fleisch – Kerntemperaturen",
        headers: ["Fleisch", "Garung", "Kerntemperatur"],
        rows: [
          ["Rind – Steak", "Rare", "46–50 °C"],
          ["Rind – Steak", "Medium Rare", "52–56 °C"],
          ["Rind – Steak", "Medium", "57–62 °C"],
          ["Rind – Steak", "Well Done", "65–70 °C"],
          ["Rind – Braten", "Medium", "68–72 °C"],
          ["Rind – Brisket / Pulled", "Fertig", "92–96 °C"],
          ["Schwein – Kotelett / Schnitzel", "Durch", "65–68 °C"],
          ["Schwein – Braten", "Durch", "70–75 °C"],
          ["Schwein – Pulled Pork", "Fertig", "92–96 °C"],
          ["Schwein – Spareribs", "Zahnstochertest", "93–95 °C"],
          ["Schwein – Schinken (roh)", "Fertig", "72 °C"],
          ["Lamm – Rack / Rücken", "Rosé", "56–62 °C"],
          ["Lamm – Keule", "Rosé / Medium", "62–68 °C"],
          ["Kalb – Braten", "Rosé", "60–65 °C"],
        ]
      },
      {
        title: "Wild – Kerntemperaturen",
        headers: ["Wild", "Garung", "Kerntemperatur"],
        rows: [
          ["Reh – Rücken", "Rosé (ideal)", "54–58 °C"],
          ["Reh – Keule / Schulter", "Medium", "62–68 °C"],
          ["Hirsch – Rücken", "Rosé", "55–60 °C"],
          ["Hirsch – Keule", "Medium", "65–70 °C"],
          ["Wildschwein – ALLE Teile", "Komplett durch (PFLICHT)", "75–80 °C"],
          ["Wildgeflügel (Fasan, Rebhuhn)", "Durch", "74–80 °C"],
          ["Hase / Kaninchen", "Durch", "72–75 °C"],
        ]
      },
      {
        title: "Geflügel – Kerntemperaturen",
        headers: ["Geflügel", "Teil", "Kerntemperatur"],
        rows: [
          ["Hähnchen", "Brust", "74 °C (Minimum!)"],
          ["Hähnchen", "Oberschenkel / Keule", "82 °C"],
          ["Hähnchen", "Ganzes Hähnchen (Oberschenkel)", "82 °C"],
          ["Ente", "Brust (rosa erlaubt)", "68 °C"],
          ["Ente", "Keule", "80 °C"],
          ["Truthahn", "Brust", "74 °C"],
          ["Truthahn", "Keule", "80–82 °C"],
          ["Perlhuhn", "Brust", "74 °C"],
        ]
      },
      {
        title: "Fisch & Meeresfrüchte – Garpunkt",
        headers: ["Fisch", "Garung", "Kerntemperatur"],
        rows: [
          ["Lachs", "Saftig-glasig", "48–52 °C"],
          ["Lachs", "Komplett gar", "58–62 °C"],
          ["Forelle (heiß geräuchert)", "Fertig", "60–65 °C"],
          ["Makrele", "Fertig", "62–65 °C"],
          ["Aal", "Fertig", "65–70 °C"],
          ["Thunfisch", "Medium (rosé)", "43–48 °C"],
          ["Garnelen", "Fertig", "Opal-rosa, fest – ca. 63 °C"],
          ["Muscheln", "Fertig", "Alle geöffnet (wegwerfen wenn geschlossen)"],
        ]
      },
      {
        title: "Räucher-, Dörrr- & Grilltemperaturen",
        headers: ["Methode / Gerät", "Temperaturbereich", "Typische Anwendung"],
        rows: [
          ["Kalträuchern", "8–25 °C", "Schinken, Speck, Wurst, Käse, Lachs"],
          ["Warmräuchern", "25–50 °C", "Forelle warm, Kassler, Mettwurst"],
          ["Heißräuchern", "50–110 °C", "Forelle heiß, Hähnchen, Makrele, Aal"],
          ["Low & Slow BBQ (WSM)", "105–135 °C", "Pulled Pork, Brisket, Spareribs"],
          ["Indirektes Grillen", "150–200 °C", "Braten, ganzes Hähnchen, Lammkeule"],
          ["Direktes Grillen", "200–280 °C", "Steaks, Würste, Gemüse, Spieße"],
          ["Sear / Hochtemperatur", "280–320 °C", "Kruste bei Steaks, Reverse Sear Finish"],
          ["Dörren (DA506)", "35–70 °C", "Obst/Gemüse: 55–65 °C; Fleisch: 70 °C"],
        ]
      },
    ],
  }),

  /* ============================ WSM 57 CM MANUAL ============================ */

  r({
    id: "wsm-aufbau", name: "WSM 57 cm – Aufbau, Teile & Erstinbetriebnahme", method: "basis", cat: "WSM Manual", diff: 1,
    time: "Wissen", pit: "bis 300 °C", core: "", wood: "Weber Smokey Mountain 57 cm",
    blurb: "Alle Teile des WSM 57 cm erklärt, Erstinbetriebnahme und die erste Session Schritt für Schritt.",
    ingredients: [],
    phases: [
      { label: "Die Teile des WSM 57 cm", kind: "prep", dur: "—", temp: "—", text: "Der WSM besteht aus 5 Hauptteilen: 1. Kohleschale (unten, mit 3 Lüftungsklappen), 2. Kohlekorb (hält die Briketts), 3. Mittelteil / Ring (mit zwei Türen: Kohletür + Wasserschalentür), 4. Wasserschale (hängt im Mittelteil), 5. Grillroste (unterer und oberer), 6. Kuppeldeckel (mit Thermometer und 1 Lüftungsklappe).", bullets: ["Der 57cm-Kohlering fasst ca. 5–6 kg Briketts", "Zwei Grillroste: unterer (näher an der Wasserschale), oberer (Hauptkochfläche)", "Deckelthermometer zeigt ca. 10–15 °C mehr als der Rost – immer am Rost messen!"] },
      { label: "Erstinbetriebnahme (Einbrennen)", kind: "cook", dur: "1–2 h", temp: "250–280 °C", text: "Beim ersten Einsatz WSM leer aufheizen um Fabrikrückstände zu verbrennen. Alle Lüftungen auf, vollen Anzündkamin (80–100 Briketts) in den Kohlekorb, 1 h auf maximaler Temperatur laufen lassen.", bullets: ["Keinen Rauch aus dem Kamin aufnehmen – riecht nach Öl und Fett", "Kein Wasser in die Schale", "Nach dem Einbrennen: Asche entsorgen, bereit für den ersten richtigen Einsatz"] },
      { label: "Anzündkamin", kind: "prep", dur: "15–20 min", temp: "—", text: "Immer mit einem Anzündkamin arbeiten! 20–30 Briketts für Minion Method; 80–100 für direktes Grillen. Nie Grillanzünder direkt auf Briketts gießen.", bullets: ["Weber-Anzündkamin: 15–20 min bis Briketts grau glühen", "Anzündkamin auf feuerfeste Unterlage stellen"] },
      { label: "Montage vor jedem Einsatz", kind: "prep", dur: "10 min", temp: "—", text: "1. Kohleschale aufstellen. 2. Kohlekorb einsetzen und Briketts befüllen. 3. Mittelteil aufsetzen. 4. Wasserschale einhängen. 5. Unteren Rost einlegen. 6. Oberen Rost einlegen. 7. Grillgut auflegen. 8. Kuppel schließen.", bullets: [] },
      { label: "Reinigung nach dem Einsatz", kind: "finish", dur: "15–20 min", temp: "nach Abkühlen", text: "Asche komplett entfernen (verstopft Lüftungsklappen!). Roste mit Drahtbürste reinigen. Wasserschale leeren und auswischen.", bullets: ["Grillrostes gelegentlich mit Spülmittel reinigen", "Außenseite des WSM mit feuchtem Tuch abwischen", "Nie kalt Wasser in die heiße Wasserschale"] },
    ],
    tips: ["Das Deckelthermometer zeigt immer zu viel an – an einem separaten Thermometer-Set mit Sonde am Rost messen.", "Die Kohlentür ist ideal um Briketts nachzulegen oder Holzchunks hinzuzufügen.", "WSM im Freien auf Stein, Beton oder feuerbeständiger Fliese aufstellen – nie auf Holzterrasse."],
    tables: [
      {
        title: "WSM 57 cm – Technische Daten",
        headers: ["Merkmal", "Angabe"],
        rows: [
          ["Grillfläche oben", "57 cm Ø = 2.550 cm²"],
          ["Grillfläche unten", "57 cm Ø = 2.550 cm²"],
          ["Kohlerkorb-Kapazität", "ca. 5–6 kg Briketts"],
          ["Lüftungsklappen unten", "3 Stück (je 0–100 % regelbar)"],
          ["Lüftungsklappe oben", "1 Stück (im Deckel)"],
          ["Betriebstemperatur", "105 °C (Low&Slow) bis 320 °C (direkt)"],
          ["Thermometer Deckel", "zeigt ~10–15 °C zu viel – nur Richtwert"],
          ["Gewicht", "ca. 20 kg"],
        ]
      }
    ],
  }),

  r({
    id: "wsm-minion", name: "WSM – Minion Method & Temperatursteuerung", method: "basis", cat: "WSM Manual", diff: 2,
    time: "Wissen", pit: "105–135 °C", core: "", wood: "Weber Smokey Mountain 57 cm",
    blurb: "Die Minion Method für 8–14 h Low & Slow, Lüftungsklappen-Positionen und Temperatur-Troubleshooting.",
    ingredients: [],
    phases: [
      { label: "Minion Method einrichten", kind: "prep", dur: "20 min", temp: "—", text: "Kohlering ¾–voll mit UNANGEZÜNDETEN Briketts füllen (ca. 4–5 kg). Mulde in der Mitte frei lassen. Holzchunks zwischen die Briketts stecken. 20–25 angezündete Briketts aus dem Anzündkamin oben auf die Mitte schütten.", bullets: ["Holzchunks (nicht Chips!) zwischen die Briketts geben – brennen nacheinander ab", "Die heißen Briketts zünden die kalten von oben nach unten an = langsames, gleichmäßiges Abbrennen", "Keine Chunks ganz an die Außenseite – verbrennen sonst zu früh"] },
      { label: "WSM schließen & aufheizen", kind: "cook", dur: "20–30 min", temp: "—", text: "Wasserschale einhängen, Roste einlegen. Mittelteil auf Kohleschale setzen, Kuppel schließen. Alle Lüftungen VOLL öffnen bis Zieltemperatur fast erreicht.", bullets: ["Zieltemperatur: 115–125 °C (Standard BBQ)", "Sobald 100 °C Rosttemperatur erreicht: Klappen auf 25–30 % drosseln"] },
      { label: "Temperatur halten", kind: "smoke", dur: "laufend", temp: "Zieltemperatur", text: "Faustregel: Untere Klappen steuern die Sauerstoffzufuhr (= Hauptregelung). Obere Klappe immer mindestens 25 % offen für Abzug.", bullets: ["Nie alle Klappen schließen – Feuer geht aus und schlechter Rauch entsteht", "Temperatur steigt sehr langsam nach Klappenöffnung – 10–15 min warten"] },
      { label: "Wasserschale", kind: "prep", dur: "—", temp: "—", text: "Heißes Wasser einfüllen (kein kaltes Wasser in heiße Schale!). Schale stabilisiert die Temperatur und verhindert Flammenkontakt.", bullets: ["Alternativen: Sand (für höhere, stabilere Temp.), leer mit Alufolie (heißer, aber weniger stabil)", "Bei langen Sessions Wasser nachfüllen – nicht leer werden lassen"] },
    ],
    tips: [],
    tables: [
      {
        title: "Lüftungsklappen – Richtwerte für den WSM 57 cm",
        headers: ["Zieltemperatur", "Untere Klappen (alle 3)", "Obere Klappe"],
        rows: [
          ["105–115 °C (sehr Low & Slow)", "10–15 % offen", "25 % offen"],
          ["115–125 °C (Standard BBQ)", "20–30 % offen", "40–50 % offen"],
          ["125–135 °C (Ribs, Hähnchen)", "35–50 % offen", "60–75 % offen"],
          ["140–160 °C (Heißräuchern)", "60–80 % offen", "100 % offen"],
          ["160–200 °C (hohe Hitze)", "100 % offen, Schale leer", "100 % offen"],
          ["Temperatur zu hoch", "2 von 3 schließen", "10 % offen"],
          ["Temperatur zu niedrig", "alle öffnen, neu anzünden", "100 % offen"],
        ]
      },
      {
        title: "WSM Troubleshooting",
        headers: ["Problem", "Ursache", "Lösung"],
        rows: [
          ["Temp. steigt nicht über 90 °C", "Zu wenig angezündete Kohlen", "Anzündkamin mit 30 Briketts nachlegen"],
          ["Temp. fällt nach 4–5 h ab", "Briketts fast durchgebrannt", "Frische Briketts durch Kohlentür nachlegen"],
          ["Temp. zu hoch (über 135 °C)", "Zu viel Sauerstoff", "Untere Klappen drosseln, 1 schließen"],
          ["Weißer, beißender Rauch", "Frisches Holz, nasse Chips", "Nur trockene Holzchunks, kurz warten bis blauer Rauch kommt"],
          ["Schwarzer, dicker Rauch", "Zu viel Holz oder schlechte Holzqualität", "Holzmenge reduzieren, auf Laubholz umsteigen"],
          ["Wasserschale leer gebrannt", "Zu wenig Wasser eingefüllt", "Mit heißem Wasser auffüllen über Kohlentür"],
          ["Fleisch schmeckt bitter", "Zu viel Rauch (Over-Smoke)", "Weniger Holzchunks, nur 2–3 Stück je Session"],
        ]
      }
    ],
  }),

  r({
    id: "wsm-raucherholz", name: "WSM – Räucherholz-Guide", method: "basis", cat: "WSM Manual", diff: 1,
    time: "Referenz", pit: "—", core: "", wood: "Weber Smokey Mountain 57 cm",
    blurb: "Welches Holz für was? Mengen, Formen (Chunks vs. Chips) und Kombinationen für den WSM.",
    ingredients: [],
    phases: [
      { label: "Chunks vs. Chips", kind: "prep", dur: "—", temp: "—", text: "Für den WSM immer CHUNKS (faustgroße Stücke), nicht Chips. Chunks brennen 45–90 min – Chips verbrennen in 10–15 min und erzeugen kurzen Rauchstoß.", bullets: ["Chunks zwischen die Briketts stecken = zeitversetztes Abbrennen", "Chips maximal für heißes, kurzes Räuchern (Forelle, Gemüse)"] },
      { label: "Wieviel Holz?", kind: "prep", dur: "—", temp: "—", text: "Faustregel: 2–4 Chunks pro Session. Weniger ist mehr – Over-Smoke macht Fleisch bitter.", bullets: ["Pulled Pork / Brisket (12 h): 4–5 Chunks über die Session verteilt", "Ribs (6 h): 3 Chunks", "Hähnchen / Forelle (2–3 h): 1–2 Chunks"] },
      { label: "Blauer vs. weißer Rauch", kind: "smoke", dur: "—", temp: "—", text: "BLAUER, dünner Rauch = guter Rauch – sauber verbrennendes Holz. WEISSER, dicker Rauch = noch nicht bereit, rohes Holz verbrennt. Grillgut erst auflegen wenn blauer Rauch kommt.", bullets: [] },
    ],
    tips: [],
    tables: [
      {
        title: "Holzarten – Aroma & Empfehlung",
        headers: ["Holzart", "Intensität", "Aroma", "Passt zu"],
        rows: [
          ["Buche", "Mittel", "Ausgewogen, leicht nussig", "Schinken, Speck, Wurst, Forelle, Geflügel – Universalholz"],
          ["Apfel", "Mild", "Fruchtig-süß", "Schweinefleisch, Geflügel, Fisch, Ribs"],
          ["Kirsche", "Mittel", "Fruchtig, leicht süß, schöne Farbe", "Ribs, Pulled Pork, Hähnchen, Ente"],
          ["Hickory", "Stark", "Klassisch BBQ, kräftig-rauchig", "Pulled Pork, Brisket, Beef Ribs"],
          ["Eiche", "Mittel-stark", "Herb, komplex", "Brisket, Lammkeule, Rindfleisch"],
          ["Erle", "Mild", "Leicht, fischig-neutral", "Lachs, Forelle, Meeresfrüchte"],
          ["Wacholder", "Intensiv", "Harzig, würzig, typisch Wild", "Wildschinken, Wildgeflügel, Schwarzwälder Schinken"],
          ["Mesquite", "Sehr stark", "Intensiv, erdig", "Sparsam einsetzen – nur für Rindfleisch"],
        ]
      }
    ],
  }),

  /* ============================ GRAEF DA506 MANUAL ============================ */

  r({
    id: "graef-aufbau", name: "Graef DA506 – Gerät, Aufbau & Betrieb", method: "basis", cat: "Graef DA506 Manual", diff: 1,
    time: "Wissen", pit: "35–70 °C", core: "", wood: "Graef DA506 Dörrautomat",
    blurb: "Vollständige Bedienanleitung: Teile, Temperaturzonen, Timer und optimale Nutzung des DA506.",
    ingredients: [],
    phases: [
      { label: "Die Teile des DA506", kind: "prep", dur: "—", temp: "—", text: "Der Graef DA506 besteht aus: Gehäuse mit Bodengebläse (Wärme von unten nach oben), 5 herausnehmbare Gitterroste (ca. 30×30 cm je), Deckel mit Luftschlitzen, Thermostat-Drehregler (35–70 °C), Timer-Drehregler (bis 12 h).", bullets: ["Bodengebläse = Warmluft strömt von unten durch alle Gitter nach oben", "Deshalb: unterstes Gitter ist am heißesten, oberstes am kühlsten", "Gitter können für größere Produkte entfernt werden (z.B. ganze Pilze, dicke Fleischstücke)"] },
      { label: "Erstinbetriebnahme", kind: "cook", dur: "30 min", temp: "70 °C", text: "Beim ersten Einsatz leer auf 70 °C aufheizen – verbrennt Produktionsrückstände.", bullets: ["Gerät gut lüften beim ersten Einheizen", "Alle Gitter einlegen", "Nach 30 min abkühlen lassen, dann bereit"] },
      { label: "Timer & Temperatur einstellen", kind: "prep", dur: "—", temp: "—", text: "Temperaturregler auf gewünschte Stufe, dann Timer auf maximale Zeit stellen und schrittweise zurückdrehen bis zur Wunschzeit. Timer schaltet Gerät automatisch ab.", bullets: ["Timer geht nur vorwärts von 12 h – gewünschte Zeit einstellen durch Drehen", "Ohne Timer: Regler auf 'On' stellen für unbegrenzte Laufzeit (nicht empfohlen bei Nacht)", "Strom: 500 W – kann 24/7 laufen, verbraucht ca. 0,5 kWh / h"] },
      { label: "Gitter-Rotation", kind: "dry", dur: "Alle 3–4 h", temp: "—", text: "Gitter von unten nach oben rotieren für gleichmäßiges Dörren: Gitter 1 (unten) → nach oben, Gitter 5 (oben) → nach unten.", bullets: ["Unteres Gitter ist bis 10 °C heißer als oberes", "Rotation alle 3–4 h = +20 % bessere Gleichmäßigkeit", "Beim Öffnen des Deckels auf heißen Dampf achten"] },
      { label: "Dörrfolien & Zubehör", kind: "prep", dur: "—", temp: "—", text: "Silikonmatten (Dörrfolien) sind Pflicht für: Fruchtleder, Pürees, flüssige Marinaden, klebrige Produkte. Nicht für normale Scheiben – schlechtere Luftzirkulation.", bullets: ["Graef verkauft passende Silikonmatten als Zubehör", "Alternative: Teflon-Backfolie zurecht schneiden", "Kein Backpapier – klebt und verschlechtert Luftzirkulation"] },
    ],
    tips: ["Gleichmäßige Scheibendicke ist der wichtigste Faktor für gleichmäßiges Dörren.", "Nicht überladen – zwischen den Scheiben muss Luft zirkulieren.", "Gerät auf einer gut belüfteten Fläche betreiben – Gerüche beim Dörren (bes. Zwiebeln, Knoblauch, Fleisch) sind intensiv."],
    tables: [
      {
        title: "Graef DA506 – Technische Daten",
        headers: ["Merkmal", "Angabe"],
        rows: [
          ["Leistung", "500 W"],
          ["Temperaturbereich", "35–70 °C (stufenlos)"],
          ["Timer", "0–12 Stunden"],
          ["Gitter-Anzahl", "5 Gitter"],
          ["Gitterfläche je Ebene", "ca. 28 × 28 cm = 784 cm²"],
          ["Gesamtdörrfläche", "ca. 3.920 cm² (5 × 784 cm²)"],
          ["Luftzirkulation", "Bodengebläse – Wärme von unten nach oben"],
          ["Maße (B×T×H)", "ca. 34 × 34 × 29 cm"],
          ["Gewicht", "ca. 3,5 kg"],
        ]
      },
      {
        title: "Temperaturempfehlungen nach Lebensmittel",
        headers: ["Lebensmittel", "Temperatur", "Typische Zeit"],
        rows: [
          ["Blüten, Rosenblätter", "35 °C", "2–4 h"],
          ["Kräuter (Basilikum, Petersilie)", "35–40 °C", "2–4 h"],
          ["Kräuter (Rosmarin, Thymian, Oregano)", "38–42 °C", "3–5 h"],
          ["Aktivierte Nüsse / Mandeln", "40–45 °C", "12–24 h"],
          ["Pilze", "40–50 °C", "4–8 h"],
          ["Obst (Äpfel, Birnen, Pflaumen)", "55–60 °C", "6–12 h"],
          ["Obst (Bananen, Mango, Ananas)", "55–65 °C", "8–12 h"],
          ["Beeren, Erdbeeren", "55–60 °C", "6–10 h"],
          ["Gemüse (Karotten, Paprika, Zucchini)", "55–65 °C", "5–10 h"],
          ["Tomaten (getrocknet)", "55–65 °C", "6–10 h"],
          ["Fruchtleder (Fruchtmus)", "55–65 °C", "8–12 h"],
          ["Kräuter (Chilis für Pulver)", "55–65 °C", "4–6 h"],
          ["Brot / Croutons", "50–60 °C", "3–5 h"],
          ["Beef / Wild Jerky", "70 °C (Maximum)", "4–8 h"],
          ["Geflügel Jerky", "70 °C (PFLICHT)", "4–6 h"],
          ["Fisch Jerky (Lachs)", "65 °C", "4–6 h"],
          ["Biltong (Lufttrocknung-Variante)", "35–40 °C", "36–72 h"],
        ]
      }
    ],
  }),

  r({
    id: "graef-pflege", name: "Graef DA506 – Reinigung & Pflege", method: "basis", cat: "Graef DA506 Manual", diff: 1,
    time: "Wissen", pit: "—", core: "", wood: "Graef DA506",
    blurb: "Reinigung nach dem Dörren, Geruchsbeseitigung und Langzeitpflege des DA506.",
    ingredients: [],
    phases: [
      { label: "Nach jedem Einsatz", kind: "prep", dur: "10–15 min", temp: "nach Abkühlen", text: "Alle 5 Gitter herausnehmen und mit warmem Spülwasser und Schwamm reinigen. Gehäuse-Innenseite mit feuchtem Tuch auswischen.", bullets: ["Nie Gehäuse unter Wasser tauchen – elektrische Bauteile!", "Gitter im Geschirrspüler reinigbar (oberes Fach)", "Bodenbereich (Gebläse) mit feuchtem Tuch auswischen – Krümel entfernen"] },
      { label: "Gerüche entfernen", kind: "finish", dur: "30 min", temp: "70 °C leer", text: "Nach intensivem Dörren (Zwiebeln, Knoblauch, Fisch, Fleisch): Gerät 30 min leer auf 70 °C laufen lassen.", bullets: ["Zitronenscheiben auf die Gitter legen = natürliche Geruchsneutralisation", "Lüftung sicherstellen während des Leerlaufs"] },
      { label: "Tiefenreinigung (monatlich)", kind: "mature", dur: "30 min", temp: "nach Abkühlen", text: "Alle Gitter mit Essiglösung (1:3 mit Wasser) einweichen und gründlich schrubben. Gehäuse innen mit Natron-Paste behandeln.", bullets: ["Fett- und Marinadenrückstände bauen sich über Zeit auf", "Monatliche Tiefenreinigung verhindert Geruchs- und Geschmacksübertragung"] },
      { label: "Lagerung", kind: "finish", dur: "—", temp: "trocken", text: "Gerät vollständig abkühlen lassen und erst dann lagern. Gitter drinlassen oder separat aufbewahren.", bullets: ["Nicht abgedeckt lagern – Staubansammlung im Gebläse", "Originale Verpackung ideal für selten genutztes Gerät"] },
    ],
    tips: ["Nie scheuernde Reinigungsmittel – beschädigen die Gitter-Beschichtung.", "Kalkablagerungen mit Zitronensaft oder Essiglösung entfernen.", "Defekte Gitter lassen sich als Ersatzteile direkt bei Graef bestellen."],
    tables: [],
  }),


  /* ============================ BILTONG WSM & BOEREWORS VARIANTEN ============================ */

  r({
    id: "biltong-wsm", name: "Biltong im Weber Smokey Mountain", method: "bbq", cat: "Biltong & Südafrika", diff: 2,
    time: "3–5 Tage", pit: "Kein Feuer – natürliche Luftzirkulation", core: "Außen trocken, innen rosa-ledrig", wood: "WSM als Trocknungsturm (kein Feuer)",
    blurb: "Der WSM ist ideal als Biltong-Trocknungsturm: gute Belüftung, Schutz vor Insekten, optionaler Hauch Rauch.",
    ingredients: [
      { a: "1 kg", i: "Rindfleisch (Oberschale), 20–25 mm dicke Streifen" },
      { a: "60 ml", i: "Malzessig" },
      { a: "25 g", i: "Salz, 15 g Zucker, 20 g Koriander (geröstet, gemörsert), 5 g Pfeffer, 3 g Backpulver" },
    ],
    phases: [
      { label: "Fleisch vorbereiten (wie klassisch)", kind: "prep", dur: "1 Tag", temp: "Kühlschrank", text: "Essig-Bad 15 min, Gewürze einreiben, 12–24 h kühl ziehen lassen.", bullets: [] },
      { label: "WSM ohne Feuer aufstellen", kind: "prep", dur: "10 min", temp: "Raumtemperatur", text: "WSM komplett zusammenbauen OHNE Kohlen. Alle 3 unteren Lüftungsklappen UND die obere Klappe VOLL öffnen für maximalen Luftstrom.", bullets: ["Wasserschale LEER lassen – keine Feuchtigkeit gewünscht", "WSM draußen aufstellen im Schatten, 18–26 °C ideal", "Kleiner Ventilator vor die untere Öffnung stellt = beschleunigt Trocknung enorm"] },
      { label: "Fleisch aufhängen", kind: "air", dur: "3–5 Tage", temp: "Kein Feuer – Umgebungstemperatur", text: "Fleischstreifen mit S-Haken oder Metallhaken in die Wasserschalen-Öffnung oder direkt an die Grillroste hängen. Streifen dürfen sich nicht berühren.", bullets: ["An die Roste hängen: Haken durch die Gitterstäbe", "Oder: Metallstab quer durch den WSM-Ring auf Höhe der Handgriffe legen"] },
      { label: "Täglich prüfen", kind: "rest", dur: "täglich 5 min", temp: "—", text: "Streifen täglich wenden und auf Schimmel prüfen. Weißer Salzfilm = normal.", bullets: ["Test nach 3 Tagen: außen fest und dunkel, innen leicht rosa und nachgebend = fertig", "Für trockenes Biltong 5 Tage"] },
      { label: "Optional: Hauch Rauch", kind: "smoke", dur: "2–4 h", temp: "unter 25 °C", text: "Für leichtes Raucharoma: 2–3 glühende Briketts in den Kohlering legen + 1 kleinen Holzchunk. Temperatur unter 25 °C halten.", bullets: ["Nur für fortgeschrittene – klassisches Biltong ist rauchfrei", "Buche oder Wacholder für 1–2 Räuchergänge"] },
    ],
    tips: ["Der WSM-Kamineffekt (Kuppelform) erzeugt natürlichen Aufwind – besser als der offene Weber Kugelgrill.", "Im Sommer: WSM im Schatten aufstellen, Ventilator auf niedriger Stufe.", "Im Winter drinnen: Heizung macht die Luft trocken – perfekte Bedingungen."],
  }),

  r({
    id: "boerewors-geraeuchert", name: "Boerewors geräuchert (WSM)", method: "heiss", cat: "Biltong & Südafrika", diff: 2,
    time: "2 h Herstellung + 2–3 h Räuchern", pit: "85–100 °C", core: "72 °C", wood: "WSM · Apfel oder Kirsche",
    blurb: "Boerewors nicht direkt gegrillt sondern heiß im WSM geräuchert – saftig, rauchig, intensiv.",
    ingredients: [
      { a: "800 g", i: "Rindfleisch (Schulter), 200 g Schweinespeck" },
      { a: "je 1 TL", i: "Koriander geröstet, Salz, Pfeffer, Nelken, Muskat, Piment, Malzessig" },
      { a: "ca. 2 m", i: "Schweinedarm 32/34 mm" },
    ],
    phases: [
      { label: "Wurst herstellen (wie Boerewors-Hauptrezept)", kind: "prep", dur: "2 h", temp: "kalt", text: "Würzmischung, wolfen (grob, 8 mm), mischen, füllen, Spirale formen. Über Nacht kühl stellen.", bullets: [] },
      { label: "WSM auf 90–100 °C", kind: "prep", dur: "20 min", temp: "85–100 °C", text: "Minion Method mit wenig Kohle (2 kg). Apfel- oder Kirschholzchunks. Wasserschale gefüllt.", bullets: ["Niedrigere Temperatur als beim direkten Grillen", "Wurst muss nicht platzen – im WSM bleibt sie geschlossen"] },
      { label: "Räuchern", kind: "smoke", dur: "2–3 h", temp: "90–100 °C", text: "Boerewors-Spirale auf den oberen Rost legen. Deckel zu. Nach 2 h KT messen.", bullets: ["KT 72 °C = fertig und sicher", "Nicht wenden – Spirale bleibt kompakt"] },
      { label: "Finish (optional)", kind: "finish", dur: "5 min", temp: "hohe direkte Hitze", text: "Für Grill-Optik kurz auf dem heißen Grill oder Pfanne anbraten.", bullets: [] },
    ],
    tips: ["Geräucherte Boerewors hält sich im Kühlschrank 5–7 Tage (heißgeräuchert).", "Mit Chakalaka und Pap servieren oder in Scheiben als Aufschnitt."],
  }),

  r({
    id: "boerewors-gedoerrt", name: "Boerewors gedörrt (Dröe Wors)", method: "dorr", cat: "Biltong & Südafrika", diff: 3,
    time: "2 h + 2–3 Tage Dörren", pit: "35–40 °C (Graef DA506)", core: "Fest, trocken, dunkel", wood: "Graef DA506",
    blurb: "Dröe Wors – getrocknete Boerewors, die südafrikanische Antwort auf Landjäger.",
    ingredients: [
      { a: "1 kg", i: "Boerewors (frisch hergestellt, wie Hauptrezept)" },
    ],
    phases: [
      { label: "Frische Boerewors herstellen", kind: "prep", dur: "2 h", temp: "kalt", text: "Wie das Boerewors-Rezept. Spirale formen oder in Würste aufteilen (gerade Würste trocknen gleichmäßiger).", bullets: ["Für Dörren: gerade Würste à 20–25 cm sind besser als Spirale", "Keine Luftblasen – einstechen wenn nötig"] },
      { label: "24 h abtropfen", kind: "rest", dur: "24 h", temp: "Kühlschrank, offen auf Gitter", text: "Frische Würste offen im Kühlschrank abtropfen lassen – Oberfläche trocknet leicht an.", bullets: [] },
      { label: "Dörren bei 35–40 °C", kind: "dry", dur: "2–3 Tage", temp: "35–40 °C", text: "Im Graef DA506 auf niedrigster Stufe. Würste einlagig auf die Gitter legen. Täglich wenden und Gitter rotieren.", bullets: ["35–40 °C = kein Garen, reines Trocknen", "Für DA506: Timer auf 12 h, täglich wiederholen", "Test: Wurst biegen – fest und lederig = fertig"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "trocken, kühl", text: "In Papier oder Leinentuch einwickeln, nicht luftdicht – Wurst muss noch etwas 'atmen'.", bullets: ["Im Kühlschrank 2–3 Wochen haltbar", "Vakuumiert und eingefroren: 3+ Monate"] },
    ],
    tips: ["Dröe Wors ist das südafrikanische Pendant zum Landjäger – intensiver Geschmack.", "Wacholderpfeffer in die Würzmischung gibt extra Tiefe beim Trocknen."],
  }),

  /* ============================ FISCHVIELFALT ============================ */

  r({
    id: "lachs-kalt", name: "Kaltgeräucherter Lachs (Graved-Smoked)", method: "kalt", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "2–3 Tage", pit: "unter 22 °C", core: "Saftig, transparent-orangerot", wood: "WSM · Erle oder Buche",
    blurb: "Der Klassiker – Lachs erst gebeizt (Gravad Lax), dann kaltgeräuchert. Hauchdünn aufgeschnitten servieren.",
    ingredients: [
      { a: "1 kg", i: "Lachsfilet, Sushi-Qualität, mit Haut, entgrätet" },
      { a: "60 g", i: "grobes Meersalz" },
      { a: "40 g", i: "Zucker (Rohrzucker)" },
      { a: "je 1 TL", i: "weißer Pfeffer, Dill (frisch oder getrocknet)" },
      { a: "1 TL", i: "Zitronenabrieb (optional)" },
    ],
    phases: [
      { label: "Beizen", kind: "cure", dur: "24–36 h", temp: "0–4 °C", text: "Salz, Zucker, Pfeffer, Dill mischen und auf beiden Seiten einreiben. In Frischhaltefolie wickeln, auf Gitter in Schale legen, beschweren.", bullets: ["Nach 12 h wenden", "Je länger die Beize, desto fester und salziger"] },
      { label: "Abwaschen & Trocknen", kind: "prep", dur: "4–8 h", temp: "kühl, luftig", text: "Beize mit kaltem Wasser abspülen. Trocken tupfen, auf Gitter offen im Kühlschrank oder kühlem Raum trocknen lassen bis Pellicle entsteht.", bullets: ["Pellicle = trockene, klebrig-glänzende Außenschicht – Rauch haftet daran", "Kein Pellicle = Rauch tropft ab, schlechteres Ergebnis"] },
      { label: "Kalträuchern", kind: "smoke", dur: "4–6 h (1–2 Gänge)", temp: "unter 22 °C", text: "Im Kaltraucherzeuger oder WSM mit minimalem Feuer und viel Eis in der Wasserschale. Erle oder Buche.", bullets: ["Nur 1–2 Räuchergänge – Lachs nimmt Rauch sehr intensiv auf", "Bei hohen Außentemperaturen nachts räuchern"] },
      { label: "Ruhen", kind: "mature", dur: "12–24 h", temp: "Kühlschrank", text: "Nach dem Räuchern 12–24 h im Kühlschrank ruhen lassen – Rauch verteilt sich.", bullets: [] },
    ],
    tips: ["Hauchdünn aufschneiden mit scharfem Graved-Lax-Messer oder auf der Aufschnittmaschine.", "Hält vakuumiert im Kühlschrank 1 Woche, eingefroren 3 Monate."],
  }),

  r({
    id: "hering-kalt", name: "Räucherhering kaltgeräuchert (Bückling-Vorstufe)", method: "kalt", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "2 Tage", pit: "unter 20 °C", core: "Fest, goldgelb", wood: "WSM · Buche + Erle",
    blurb: "Kaltgeräucherter ganzer Hering – stark gesalzen, leicht geräuchert. Norddeutsche Tradition.",
    ingredients: [
      { a: "8", i: "frische Heringe, ausgenommen, Kopf dran" },
      { a: "1–2 l", i: "Salzlake 10 %: 100 g Salz pro Liter Wasser" },
    ],
    phases: [
      { label: "Einlaken", kind: "cure", dur: "8–12 h", temp: "0–4 °C", text: "Heringe in 10%iger Salzlake vollständig einlegen, beschweren.", bullets: [] },
      { label: "Abspülen & Trocknen", kind: "prep", dur: "4–8 h", temp: "kühl, luftig", text: "Abspülen, aufhängen an den Schwänzen bis Pellicle entsteht.", bullets: [] },
      { label: "Kalträuchern", kind: "smoke", dur: "2 × 8–10 h", temp: "unter 20 °C", text: "2 Räuchergänge mit Pause über Nacht. Buche + etwas Erle.", bullets: ["Heringe werden goldgelb bis dunkel-goldbraun", "Nicht zu heiß – würden garen"] },
    ],
    tips: ["Werden zu Bückling (warm geräuchert) wenn die Temperatur auf 50–70 °C erhöht wird."],
  }),

  r({
    id: "bueckling", name: "Bückling (Hering warmgeräuchert)", method: "warm", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 Tag + 2–3 h Räuchern", pit: "40–70 °C", core: "Gar, goldbraun, saftig", wood: "WSM · Buche + Erle",
    blurb: "Bückling = ganzer Hering warmgeräuchert. Nordsee-Klassiker, fettig, intensiv aromatisch.",
    ingredients: [
      { a: "8", i: "frische Heringe, ausgenommen" },
      { a: "1–2 l", i: "Salzlake 8 %: 80 g Salz/Liter" },
    ],
    phases: [
      { label: "Einlaken", kind: "cure", dur: "6–8 h", temp: "0–4 °C", text: "Heringe in 8%iger Lake einlegen.", bullets: [] },
      { label: "Trocknen & Pellicle", kind: "dry", dur: "2–3 h", temp: "kühl, luftig", text: "Abspülen, aufhängen oder auf Gitter bis Oberfläche klebrig-trocken.", bullets: [] },
      { label: "Warmräuchern", kind: "smoke", dur: "2–3 h", temp: "40–70 °C stufenweise", text: "WSM auf 40–50 °C starten, langsam auf 65–70 °C steigern. Hering ist gar wenn Haut goldbraun und Fleisch fest.", bullets: ["Langsame Temperatursteigerung verhindert Platzen der Haut", "Mit Erlholz räuchern = typisches Nordsee-Aroma"] },
    ],
    tips: ["Sofort essen oder innerhalb 3 Tagen – Bückling hält sich nicht lange.", "Klassisch auf Schwarzbrot mit Butter und Zwiebeln."],
  }),

  r({
    id: "schillerlocken", name: "Schillerlocken (Dornhai warmgeräuchert)", method: "warm", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 Tag + 3–4 h", pit: "40–65 °C", core: "Goldbraun, saftig", wood: "WSM · Buche",
    blurb: "Die bekannte Räucherware aus Dornhai-Bauchstreifen – gerollt, geräuchert, goldbraun.",
    ingredients: [
      { a: "800 g", i: "Dornhai-Bauchstreifen (beim Fischhändler bestellen)" },
      { a: "1–2 l", i: "Salzlake 8–10 %: 80–100 g Salz/Liter" },
    ],
    phases: [
      { label: "Einlaken", kind: "cure", dur: "8–12 h", temp: "0–4 °C", text: "Streifen in Lake einlegen.", bullets: [] },
      { label: "Aufrollen & Trocknen", kind: "prep", dur: "3–4 h", temp: "kühl, luftig", text: "Streifen zu Spiralen/Rollen formen und auf Räucherhaken stecken. Aufhängen bis Pellicle entsteht.", bullets: [] },
      { label: "Warmräuchern", kind: "smoke", dur: "3–4 h", temp: "45–65 °C", text: "Langsam aufheizen, Buche räuchern bis goldbraun.", bullets: [] },
    ],
    tips: ["Dornhai (Schillerlocken) ist reguliert – beim seriösen Fischhändler kaufen.", "Hält sich im Kühlschrank 5–7 Tage."],
  }),

  r({
    id: "raeucheraal", name: "Räucheraal (heißgeräuchert)", method: "heiss", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 Tag + 3–4 h", pit: "70–90 °C", core: "Fest, goldbraun, glänzend", wood: "WSM · Buche + Erle",
    blurb: "Räucheraal – fettreich, intensiv aromatisch. Einer der besten Räucherfische überhaupt.",
    ingredients: [
      { a: "2–3", i: "Aale (je 500–800 g), ausgenommen" },
      { a: "1–2 l", i: "Salzlake 10 %: 100 g Salz/Liter, 1 h Einlegen" },
    ],
    phases: [
      { label: "Schlachten & Einlaken", kind: "cure", dur: "1–2 h", temp: "0–4 °C", text: "Aale ausgenommen und gespült. Kurz in 10%ige Lake einlegen.", bullets: ["1 h Lake reicht – Aal nimmt Salz schnell auf", "Kiemen und Augen entfernen"] },
      { label: "Trocknen", kind: "dry", dur: "2–3 h", temp: "kühl, luftig", text: "Abspülen, aufhängen bis Pellicle entsteht.", bullets: [] },
      { label: "Heißräuchern", kind: "smoke", dur: "3–4 h", temp: "70–90 °C", text: "WSM auf 70 °C starten, nach 1 h auf 85–90 °C steigern. Aal hängt oder liegt. Buche + Erle.", bullets: ["Aal ist fertig wenn Haut aufplatzt und Fleisch sich leicht vom Knochen löst", "Fett tropft aus – Tropfschale verwenden"] },
      { label: "Abkühlen", kind: "finish", dur: "1 h", temp: "Raumtemperatur", text: "Hängend abkühlen lassen. Glänzende, goldbraune Oberfläche.", bullets: [] },
    ],
    tips: ["Räucheraal hält sich ungekühlt nur wenige Stunden – kühl lagern.", "Für maximales Aroma: Holzscheite (keine Chips) aus Buchenholz."],
  }),

  r({
    id: "raeucherkarpfen", name: "Räucherkarpfen (heißgeräuchert)", method: "heiss", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 Tag + 4–5 h", pit: "70–90 °C", core: "Fest, weiß, saftig", wood: "WSM · Buche + Pflaume",
    blurb: "Ganzer Karpfen heißgeräuchert – saisonal, kräftig, für Weihnachtszeit klassisch.",
    ingredients: [
      { a: "1", i: "Karpfen (1,5–2 kg), ausgenommen und geschuppt" },
      { a: "1–2 l", i: "Salzlake 8 %: 80 g Salz/Liter" },
      { a: "je 1 TL", i: "Lorbeer, Pfeffer, Wacholder (in die Lake)" },
    ],
    phases: [
      { label: "Einlaken", kind: "cure", dur: "12–24 h", temp: "0–4 °C", text: "Karpfen komplett in Gewürzlake einlegen. Großer Topf nötig.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "3–4 h", temp: "kühl, luftig", text: "Abspülen, mit Holzstäbchen aufsprenzen (Bauch offen halten) und aufhängen.", bullets: ["Bauch offen halten = gleichmäßiges Räuchern von innen und außen"] },
      { label: "Heißräuchern", kind: "smoke", dur: "4–5 h", temp: "70–90 °C", text: "WSM auf 75 °C, nach 2 h auf 85 °C steigern. Pflaumeholz für Süße.", bullets: ["Karpfen ist fertig wenn Rückenflosse sich leicht herausziehen lässt"] },
    ],
    tips: ["Karpfen aus sauberen Gewässern bevorzugen – lagert Geschmack des Gewässers ein.", "In der Weihnachtszeit günstig beim Teichwirt kaufen."],
  }),

  r({
    id: "makrele-heiss", name: "Räuchermakrele (heißgeräuchert)", method: "heiss", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "4–5 h", pit: "75–95 °C", core: "65 °C, fest und goldbraun", wood: "WSM · Buche + Erle",
    blurb: "Heißgeräucherte Makrele – fettreich, kräftig aromatisch, schnell gemacht.",
    ingredients: [
      { a: "4", i: "frische Makrelen, ausgenommen" },
      { a: "1–2 l", i: "Salzlake 8 %: 80 g Salz/Liter, 1–2 h einlegen" },
    ],
    phases: [
      { label: "Einlaken & Trocknen", kind: "cure", dur: "1–2 h Lake + 2 h Trocknen", temp: "0–4 °C / kühl-luftig", text: "Kurz in Lake, abspülen, aufhängen bis Pellicle entsteht.", bullets: [] },
      { label: "Heißräuchern", kind: "smoke", dur: "2–3 h", temp: "75–95 °C stufenweise", text: "WSM auf 75 °C, nach 1 h auf 90–95 °C. Makrelen am Schwanz aufhängen oder auf Rost.", bullets: ["Goldbraune, glänzende Haut = fertig", "KT 65 °C"] },
    ],
    tips: ["Sehr fettreich – Makrele eignet sich hervorragend zum Räuchern.", "Sofort nach dem Räuchern essen oder innerhalb 2 Tagen."],
  }),

  r({
    id: "lachs-warm", name: "Lachsforelle warmgeräuchert", method: "warm", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 Tag + 3–4 h", pit: "40–65 °C", core: "Saftig, hellorange, fest", wood: "WSM · Erle + Apfel",
    blurb: "Lachsforelle beim Warmräuchern entwickelt außergewöhnliche Saftigkeit und mildes Raucharoma.",
    ingredients: [
      { a: "1", i: "Lachsforelle (1–1,5 kg), ausgenommen" },
      { a: "1–2 l", i: "Salzlake 7 %: 70 g Salz/Liter + 1 TL Zucker" },
      { a: "je 1 TL", i: "Dill, Zitronenscheiben (in die Bauchhöhle)" },
    ],
    phases: [
      { label: "Einlaken", kind: "cure", dur: "8–12 h", temp: "0–4 °C", text: "Lachsforelle komplett in Lake einlegen, beschweren.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "2–3 h", temp: "kühl, luftig", text: "Abspülen, Dill und Zitronenscheiben in die Bauchhöhle, aufhängen.", bullets: [] },
      { label: "Warmräuchern", kind: "smoke", dur: "3–4 h", temp: "40–65 °C stufenweise", text: "Auf 40 °C starten, langsam auf 60–65 °C steigern. Erle + Apfel.", bullets: ["Langsame Temperatursteigerung = maximale Saftigkeit", "KT 58–60 °C am dicksten Punkt"] },
    ],
    tips: ["Lachsforelle ist aromatischer und fettreicher als Regenbogenforelle.", "Erle ist das klassische Holz für Lachsartige – nie Nadelholz!"],
  }),

  r({
    id: "sardinen-geraeuchert", name: "Geräucherte Sardinen / Sprotten", method: "heiss", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "3–4 h", pit: "75–90 °C", core: "Goldbraun, fest", wood: "WSM · Buche + Erle",
    blurb: "Kleine Fische heißgeräuchert – Sardinen oder Sprotten wie aus der Dose, nur unendlich besser.",
    ingredients: [
      { a: "500 g", i: "frische Sardinen oder Sprotten, ausgenommen" },
      { a: "1–2 l", i: "Salzlake 6 %: 60 g Salz/Liter, 30–45 min einlegen" },
    ],
    phases: [
      { label: "Einlaken & Trocknen", kind: "cure", dur: "30–45 min Lake + 1–2 h Trocknen", temp: "0–4 °C / kühl-luftig", text: "Kurz einlaken, abspülen, auf Gitter trocknen bis Pellicle entsteht.", bullets: ["Kleine Fische: kurze Lakierzeit – 30 min reichen"] },
      { label: "Heißräuchern", kind: "smoke", dur: "1,5–2 h", temp: "75–90 °C", text: "Auf engmaschigem Räuchersieb oder quer auf den Rost legen. Buche + Erle.", bullets: [] },
      { label: "In Öl einlegen (optional)", kind: "finish", dur: "—", temp: "—", text: "Abgekühlte Sardinen in Olivenöl einlegen – 3–4 Wochen im Kühlschrank haltbar.", bullets: [] },
    ],
    tips: ["In Olivenöl eingelegt und nach 24 h gegessen = beste Qualität.", "Auf Crostinis oder als Tapas servieren."],
  }),

  /* ============================ SALAMI VARIANTEN ============================ */

  r({
    id: "milano-salami", name: "Mailänder Salami (Milano)", method: "kalt", cat: "Wurst & Salami", diff: 3,
    time: "6–8 Wochen", pit: "10–14 °C, 75–85 % LF", core: "Fest, gereift, weißer Edelschimmel", wood: "WSM Kalträuchern (1 Gang) · Buche",
    blurb: "Die klassische Mailänder Salami – grob gemahlen, dezent gewürzt, lang gereift.",
    ingredients: [
      { a: "750 g", i: "Schweineschulter (mager)" },
      { a: "250 g", i: "Rückenspeck (fest, gekühlt)" },
      { a: "28 g", i: "NPS" },
      { a: "3 g", i: "schwarzer Pfeffer (grob)" },
      { a: "2 g", i: "Knoblauchpulver" },
      { a: "2 g", i: "Zucker" },
      { a: "ca. 1,5 m", i: "Schweinedarm 50 mm (oder Kunstdarm)" },
      { a: "1 Tüte", i: "Starterkultur (T-SPX oder ähnlich)" },
    ],
    phases: [
      { label: "Vorbereitung", kind: "prep", dur: "30 min", temp: "unter 5 °C", text: "Fleisch und Speck in Würfel schneiden, anfrieren. Alles durch die grobe Scheibe (10–12 mm) wolfen.", bullets: ["Sehr kalt arbeiten – Fett darf nicht schmelzen", "Speck und Fleisch getrennt wolfen"] },
      { label: "Mischen & Füllen", kind: "prep", dur: "20 min", temp: "unter 5 °C", text: "Fleisch, Speck, Gewürze und angerührte Starterkultur vermischen bis klebrig. Fest in Darm füllen.", bullets: ["Keine Luftblasen", "Sehr fest stopfen für gleichmäßige Reifung"] },
      { label: "Fermentation", kind: "rest", dur: "48–72 h", temp: "22–24 °C, 90–95 % LF", text: "Warm und feucht hängen für Starterkultur-Aktivierung. pH sinkt auf 5.0–5.2.", bullets: ["pH-Meter oder Teststreifen empfehlenswert", "Oberfläche wird leicht rot-glänzend"] },
      { label: "Räuchern (optional)", kind: "smoke", dur: "1 × 4–6 h", temp: "unter 20 °C", text: "Einen Kaltrachergang mit Buche. Hängt vom Stil ab – klassische Milano ist ungeräuchert.", bullets: [] },
      { label: "Trocknen & Reifen", kind: "mature", dur: "5–7 Wochen", temp: "10–14 °C, 75–85 % LF", text: "Kühl und luftig hängen. Tägliche Kontrolle. Weißer Schimmelfilm (Penicillium) ist erwünscht und schützt die Wurst.", bullets: ["Weißer Schimmel = gut, mit feuchtem Tuch leicht einreiben", "Grüner/schwarzer Schimmel = entfernen mit Essig-Tuch"] },
    ],
    tips: ["Starterkultur ist bei Salami Pflicht – kontrollierte Fermentation verhindert Fehlgärung.", "Reifekeller: kühler Keller, Vorratskammer oder Weinkühlschrank sind ideal.", "Salamireifung braucht Geduld – nach 3 Wochen probieren, ob Salz und Reife stimmen."],
  }),

  r({
    id: "chorizo", name: "Chorizo (spanisch-style)", method: "kalt", cat: "Wurst & Salami", diff: 2,
    time: "3–4 Wochen", pit: "12–16 °C, 75–80 % LF", core: "Fest, leuchtend rot, aromatisch", wood: "WSM Kalträuchern · Buche",
    blurb: "Hausgemachte Chorizo – scharf, paprikarot, knoblauchintensiv. Spanische Traditionskultur.",
    ingredients: [
      { a: "700 g", i: "Schweinebauch oder Schulter" },
      { a: "300 g", i: "Rückenspeck" },
      { a: "28 g", i: "NPS" },
      { a: "25 g", i: "spanisches Paprikapulver süß (Pimentón de la Vera, geräuchert!)" },
      { a: "5 g", i: "Paprikapulver scharf" },
      { a: "5 g", i: "Knoblauchpulver" },
      { a: "3 g", i: "Oregano" },
      { a: "2 g", i: "Zucker" },
      { a: "ca. 2 m", i: "Schweinedarm 34–38 mm" },
    ],
    phases: [
      { label: "Wolfen & Würzen", kind: "prep", dur: "30 min", temp: "unter 5 °C", text: "Fleisch und Speck durch mittlere Scheibe (6–8 mm) wolfen. Mit allen Gewürzen mischen.", bullets: ["Geräuchertes Pimentón ist DIE Schlüsselzutat", "Stark mischen bis klebrige Masse entsteht"] },
      { label: "Füllen & Formen", kind: "prep", dur: "20 min", temp: "kalt", text: "In Schweinedarm füllen, zu Hufeisenform biegen oder in Würste teilen.", bullets: [] },
      { label: "Antrocknen", kind: "dry", dur: "24 h", temp: "12–16 °C", text: "Offen hängen, Oberfläche trocknet leicht an.", bullets: [] },
      { label: "Räuchern (1–2 Gänge)", kind: "smoke", dur: "1–2 × 4–6 h", temp: "unter 22 °C", text: "Kaltgeräuchert mit Buche – gibt Farbe und Haltbarkeit.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "2–3 Wochen", temp: "12–16 °C, 75–80 % LF", text: "Trocken und kühl reifen. Oberfläche wird fest und dunkelrot.", bullets: [] },
    ],
    tips: ["Pimentón de la Vera (geräuchertes spanisches Paprikapulver) ist der Schlüssel – kein normales Paprikapulver.", "Frische Chorizo (ungereift) direkt nach dem Füllen braten – auch sehr lecker."],
  }),

  r({
    id: "landjaeger", name: "Landjäger", method: "kalt", cat: "Wurst & Salami", diff: 2,
    time: "2–3 Wochen", pit: "12–15 °C, 70–80 % LF", core: "Fest, trocken, dunkel", wood: "WSM Kalträuchern · Buche + Tanne",
    blurb: "Der Landjäger – geräucherte, gepresste, getrocknete Dauerwurst. Alpenklassiker.",
    ingredients: [
      { a: "700 g", i: "Rindfleisch (Schulter)" },
      { a: "300 g", i: "Schweinebauch" },
      { a: "28 g", i: "NPS" },
      { a: "3 g", i: "Pfeffer (grob gemahlen)" },
      { a: "2 g", i: "Kümmel (gemahlen)" },
      { a: "2 g", i: "Zucker" },
      { a: "ca. 2,5 m", i: "Schweinedarm 26/28 mm" },
    ],
    phases: [
      { label: "Wolfen & Mischen", kind: "prep", dur: "30 min", temp: "unter 5 °C", text: "Fleisch durch mittlere Scheibe (6 mm) wolfen, mit Gewürzen vermengen.", bullets: [] },
      { label: "Füllen & Abteilen", kind: "prep", dur: "20 min", temp: "kalt", text: "In Darm füllen, zu Paaren (je 10–12 cm) abdrehen.", bullets: [] },
      { label: "Pressen", kind: "rest", dur: "24–48 h", temp: "kühl", text: "Zwischen zwei Brettern pressen und mit Gewichten beschweren – gibt die typische flache Form.", bullets: ["Charakter des Landjägers: flache, gedrückte Form", "Alle 12 h wenden"] },
      { label: "Räuchern", kind: "smoke", dur: "2–3 × 4–6 h", temp: "unter 22 °C", text: "Mehrfach kaltgeräuchert mit Buche und Tanne.", bullets: [] },
      { label: "Trocknen", kind: "mature", dur: "1–2 Wochen", temp: "12–15 °C, 70–80 % LF", text: "Fest und trocken reifen lassen.", bullets: [] },
    ],
    tips: ["Das Pressen ist der definitive Schritt – ohne Pressen ist es kein Landjäger.", "Rindfleisch-Anteil gibt die typische dunkle Farbe und feste Konsistenz."],
  }),

  /* ============================ NEUE KALTRÄUCHERN ============================ */

  r({
    id: "bresaola", name: "Bresaola (Rinderfilet)", method: "kalt", cat: "Rind", diff: 3,
    time: "5–6 Wochen", pit: "12–16 °C, 75–80 % rF", core: "", wood: "Buche (dezent, 1–2 Gänge)", yield: "ca. 700 g",
    blurb: "Edelstes Trockenfleisch aus dem Rinderfilet – tiefdunkelrot, hauchdünn, intensiv aromatisch.",
    ingredients: [
      { a: "1 kg", i: "Rinderfilet oder Rinderhüfte, komplett pariert" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "4 g/kg", i: "Zucker" },
      { a: "100 ml", i: "Rotwein (trocken)" },
      { a: "je 1 TL", i: "Knoblauch, Rosmarin, schwarzer Pfeffer, Wacholder" },
    ],
    phases: [
      { label: "Pökeln in Wein-Marinade", kind: "cure", dur: "10–14 Tage", temp: "4–6 °C", text: "NPS, Gewürze und Rotwein zur Paste verarbeiten. Rindfleisch komplett einreiben, vakuumieren. Täglich wenden.", bullets: ["Rotwein gibt Tannine und Aroma", "Vakuum beschleunigt die Pökelung gleichmäßig"] },
      { label: "Durchbrennen", kind: "rest", dur: "4–5 Tage", temp: "10–14 °C", text: "Aus dem Vakuum, abspülen, trocknen, aufhängen ohne Salzzugabe.", bullets: [] },
      { label: "Räuchern (optional)", kind: "smoke", dur: "1–2 × 4–6 h", temp: "unter 18 °C", text: "Nur 1–2 dezente Kaltracherungen mit Buche. Klassische Bresaola ist ungeräuchert.", bullets: ["Rauch gibt schöne Farbe, bleibt Geschmackssache"] },
      { label: "Lufttrocknen & Reifen", kind: "mature", dur: "3–4 Wochen", temp: "12–16 °C, 75–80 % rF", text: "Aufgehängt an kühlem, luftigem Ort reifen lassen bis ca. 40 % Gewichtsverlust.", bullets: ["Oberfläche wird fest und tiefdunkelrot", "Weißer Edelschimmel ist unproblematisch – abwischen"] },
    ],
    tips: ["Rinderfilet ergibt die eleganteste Bresaola – Hüfte ist kostengünstiger und auch sehr gut.", "Hauchdünn aufschneiden (1–2 mm) und mit Rucola, Parmesan und Zitrone servieren.", "Bresaola braucht sorgfältiges Klimamanagement – Trockenrand vermeiden durch gleichmäßige Luftfeuchte."],
  }),

  r({
    id: "pancetta", name: "Pancetta (gerollter Bauchspeck)", method: "kalt", cat: "Speck", diff: 2,
    time: "4–6 Wochen", pit: "12–16 °C, 75–80 % rF", core: "", wood: "Buche (optional, 1–2 Gänge)", yield: "ca. 1,2 kg",
    blurb: "Italiens Antwort auf Bacon: gewürzter, gerollter Schweinebauch, luftgetrocknet. Roh als Aufschnitt oder zum Kochen.",
    ingredients: [
      { a: "1,5 kg", i: "Schweinebauch, ohne Knochen und Schwarte, rechteckig pariert" },
      { a: "38 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "4 g/kg", i: "Zucker" },
      { a: "je 1 TL", i: "schwarzer Pfeffer (grob), Wacholder, Rosmarin, Lorbeer, Muskatnuss, Chiliflocken" },
    ],
    phases: [
      { label: "Würzpaste & Pökeln", kind: "cure", dur: "8–10 Tage", temp: "4–6 °C", text: "Alle Gewürze mit NPS vermischen. Bauch auf der Innenseite kräftig einreiben, vakuumieren, täglich wenden.", bullets: ["Innenseite stärker würzen – wird beim Aufrollen zur Spirale", "Gleichmäßige Würzung durch tägliches Massieren"] },
      { label: "Aufrollen & Abbinden", kind: "prep", dur: "20 min", temp: "kalt", text: "Bauch auf der Innenseite mit Pfeffer bestreuen, fest aufrollen und mit Metzgergarn spiralförmig abbinden.", bullets: ["Je fester die Rolle, desto gleichmäßiger die Reifung", "Optional in Netz- oder Kunstdarm (80+ mm) stecken"] },
      { label: "Durchbrennen & Trocknen", kind: "rest", dur: "3–4 Tage", temp: "10–15 °C", text: "Aufgehängt, offen, bis Oberfläche trocken und fest.", bullets: [] },
      { label: "Räuchern (optional)", kind: "smoke", dur: "1–2 × 4 h", temp: "unter 20 °C", text: "Klassische Pancetta ist ungeräuchert – Pancetta Affumicata erhält 1–2 Kaltracherungen.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "3–5 Wochen", temp: "12–16 °C, 75–80 % rF", text: "Aufgehängt reifen bis ca. 30 % Gewichtsverlust. Rolle bleibt kompakt.", bullets: ["Gleichmäßige Temperatur und Luftfeuchte vermeiden Trockenrand"] },
    ],
    tips: ["Pancetta in Scheiben (2–3 mm) roh servieren oder gewürfelt für Pasta, Risotto, Saucen.", "Pancetta Affumicata (geräuchert) ist die Variante aus Norditalien.", "Schimmel am Rand mit Essig-Salzwasser-Tuch abwischen."],
  }),

  r({
    id: "raeucherbutter", name: "Geräucherte Butter & Kräuterbutter", method: "kalt", cat: "Würzen & Extras", diff: 1,
    time: "2–3 h", pit: "unter 20 °C", core: "", wood: "Kirsche / Apfel / Buche", yield: "beliebig",
    blurb: "Butter im Kaltrauch veredelt – als Finishing-Butter für Steaks, auf frischem Brot unschlagbar.",
    ingredients: [
      { a: "250 g", i: "gute Butter (Zimmertemperatur, ungesalzen)" },
      { a: "je 1 TL", i: "Kräuter, Knoblauch, Salz (für Kräuterbutter-Variante)" },
    ],
    phases: [
      { label: "Butter vorbereiten", kind: "prep", dur: "15 min", temp: "Raumtemperatur", text: "Butter auf Zimmertemperatur bringen. Für Kräuterbutter: mit Kräutern, Knoblauch und Salz vermengen.", bullets: ["Butter in flache Schale oder auf Backpapier als Ziegel formen", "Für Finish-Butter: pur lassen, würzen nach dem Räuchern"] },
      { label: "Kalt räuchern", kind: "smoke", dur: "1,5–2,5 h", temp: "unter 20 °C", text: "Butter offen im Kaltrauch stehen lassen. Gelegentlich umrühren oder als Schale lassen.", bullets: ["Kirsche oder Apfel: fruchtig-mild", "Buche: klassisch", "Nicht zu lange – Butter nimmt Rauch sehr schnell auf"] },
      { label: "Kühlen & Formen", kind: "finish", dur: "1 h", temp: "Kühlschrank", text: "Geräucherte Butter in Frischhaltefolie zur Rolle formen und kühlen.", bullets: ["In Scheiben schneiden als Steak-Finishing-Butter"] },
    ],
    tips: ["Eisschale im Smoker ist Pflicht – Butter darf nicht schmelzen.", "Rauchbutter hält sich im Kühlschrank 2 Wochen, vakuumiert 6 Wochen.", "Kombination: Räucherbutter + Miso = außergewöhnliche Umami-Tiefe."],
  }),

  /* ============================ SCHINKEN VARIATIONEN ============================ */

  /* ============================ NEUE WARMRÄUCHERN ============================ */

  r({
    id: "warm-haehnchenbrust", name: "Warmgeräucherte Hähnchenbrust", method: "warm", cat: "Geflügel", diff: 1,
    time: "1 Tag + 3–4 h", pit: "45–60 °C", core: "74 °C", wood: "WSM · Apfel + Kirsche",
    blurb: "Zarte, saftige Hähnchenbrust im Warmrauch – perfekt als Aufschnitt, auf Salaten oder kalt.",
    ingredients: [
      { a: "4", i: "Hähnchenbrüste (je 200–250 g)" },
      { a: "1–2 l", i: "Salzlake: 60 g Salz + 20 g Zucker pro Liter Wasser" },
      { a: "je 1 TL", i: "Knoblauch, Lorbeer, Pfefferkörner, Thymian (in die Lake)" },
    ],
    phases: [
      { label: "Lake & Einlegen", kind: "cure", dur: "8–12 h", temp: "0–4 °C", text: "Hähnchenbrüste in Gewürzlake einlegen. Komplett bedeckt.", bullets: ["Lake würzt durch und hält Fleisch saftig beim Räuchern", "Vollständig bedeckt halten – beschweren"] },
      { label: "Trocknen", kind: "dry", dur: "2 h", temp: "kühl, luftig", text: "Abspülen, auf Gitter im Kühlschrank oder kühlem Raum antrocknen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "3–4 h", temp: "45–60 °C stufenweise", text: "WSM auf 45 °C starten, langsam auf 55–60 °C steigern. Apfel + Kirsche. KT 74 °C.", bullets: ["Langsam = maximale Saftigkeit", "NIEMALS Geflügel unter 74 °C servieren"] },
      { label: "Abkühlen", kind: "finish", dur: "1 h", temp: "Raumtemperatur / Kühlschrank", text: "Auf Gitter abkühlen, dann vakuumieren oder direkt essen.", bullets: ["Kalt dünn aufgeschnitten als Aufschnitt ideal"] },
    ],
    tips: ["Warmgeräucherte Hähnchenbrust hält sich vakuumiert 5–7 Tage im Kühlschrank.", "Perfekt als Meal-Prep – auf Salaten, in Wraps, auf Brot.", "Paprika-Rub nach dem Trocknen auftragen für farbintensive Kruste."],
  }),

  r({
    id: "warm-mozzarella", name: "Geräucherter Mozzarella / Scamorza", method: "warm", cat: "Käse", diff: 1,
    time: "2–3 h", pit: "30–45 °C", core: "", wood: "WSM · Kirsche + Apfel",
    blurb: "Mozzarella oder Scamorza sanft warm geräuchert – cremig mit feinem Raucharoma, wie aus Süditalien.",
    ingredients: [
      { a: "400 g", i: "Mozzarella (Fior di Latte, gut abgetropft) oder Scamorza" },
    ],
    phases: [
      { label: "Trocknen", kind: "prep", dur: "3–4 h", temp: "Kühlschrank, auf Gitter", text: "Mozzarella aus der Lake nehmen, mit Küchenpapier gut abtrocknen. Offen im Kühlschrank antrocknen lassen.", bullets: ["Mozzarella muss wirklich trocken sein – sonst nimmt er kaum Rauch an", "Kleine Bällchen: 2 h, große Knoten: 4 h"] },
      { label: "Warm räuchern", kind: "smoke", dur: "1–2 h", temp: "30–45 °C", text: "WSM auf 30–40 °C (sehr wenig Kohle!). Kirsche und Apfel. Käse beobachten.", bullets: ["Käse DARF NICHT schmelzen – sofort abbrechen wenn Oberfläche weich wird", "Auf Gitter oder aufgehängt mit Metzgerfaden"] },
      { label: "Reifen", kind: "mature", dur: "24–48 h", temp: "Kühlschrank", text: "Vakuumiert oder eingewickelt im Kühlschrank ruhen lassen – Rauch zieht ein und wird milder.", bullets: ["Frisch geräuchert schmeckt der Rauch oft scharf – nach 24 h harmonisch"] },
    ],
    tips: ["Scamorza eignet sich noch besser als Mozzarella – fester und nimmt Rauch gleichmäßiger auf.", "Warm geräucherter Mozzarella auf Pizzastein geschmolzen ist außergewöhnlich gut.", "Im Sommer nur nachts räuchern – Umgebungstemperatur darf 25 °C nicht überschreiten."],
  }),

  r({
    id: "chashu-bauch", name: "Chashu Schweinebauch (Ramen-Style)", method: "warm", cat: "Schwein", diff: 2,
    time: "1 Woche + 4 h", pit: "40–55 °C Räuchern + 75 °C Garen", core: "72 °C", wood: "WSM · Apfel + Kirsche",
    blurb: "Japanischer Rollbraten – gepökelt, warm geräuchert, in Sojabrühe gegart. Für Ramen oder als Aufschnitt.",
    ingredients: [
      { a: "1 kg", i: "Schweinebauch, ohne Knochen, ohne Schwarte" },
      { a: "40 g/kg", i: "NPS" },
      { a: "5 g/kg", i: "Zucker" },
      { a: "je 1 TL", i: "Ingwer (frisch), Sternananis (Pökelgewürze)" },
      { a: "je 2 EL", i: "Sojasoße, Mirin, Sake, Zucker, Knoblauch, Ingwer (Garlake)" },
    ],
    phases: [
      { label: "Pökeln & Rollen", kind: "cure", dur: "5–7 Tage", temp: "4–6 °C", text: "NPS-Mischung einreiben, eng aufrollen und mit Garn abbinden. Vakuumieren.", bullets: ["Fest aufrollen für gleichmäßige Chashu-Scheiben", "Ingwer und Sternananis in die Innenseite für asiatische Würze"] },
      { label: "Warm räuchern", kind: "smoke", dur: "2–3 h", temp: "40–55 °C", text: "WSM auf 45 °C. Apfel und Kirsche für fruchtigen Rauch. Bis Kern ca. 55 °C.", bullets: ["Räuchern gibt Chashu eine Tiefe, die das Original nicht hat"] },
      { label: "Garen in Sojabrühe", kind: "cook", dur: "1,5 h", temp: "75–80 °C (simmern)", text: "Sojasoße, Mirin, Sake und Wasser zu einer Brühe vermengen. Chashu einlegen und bei 75 °C bis KT 72 °C simmern.", bullets: ["Nicht kochen – Simmern hält das Fleisch saftig", "Brühe für Ramen-Tare verwenden!"] },
      { label: "Pressen & Kühlen", kind: "finish", dur: "12 h", temp: "Kühlschrank", text: "Noch warm in Frischhaltefolie fest einwickeln, kühlen. Erst kalt aufschneiden.", bullets: ["Kalte Chashu-Scheiben lassen sich perfekt dünn schneiden"] },
    ],
    tips: ["Die übrige Sojabrühe (Tare) ist Gold – für Ramen, Marinaden oder als Würze.", "Chashu-Scheiben kurz in Pfanne mit Honig anbraten gibt Karamellkruste.", "Vakuumiert hält Chashu im Kühlschrank 1 Woche, eingefroren 3 Monate."],
  }),

  r({
    id: "schwarzpfeffer-schinken", name: "Schwarzer Pfeffer Schinken", method: "kalt", cat: "Schinken", diff: 2,
    time: "4–5 Wochen", pit: "15–20 °C", core: "", wood: "WSM · Buche",
    blurb: "Rohschinken mit einer kräftigen schwarzen Pfefferkruste – intensiv und aromatisch.",
    ingredients: [
      { a: "1 kg", i: "Schweinekamm oder -keule, ausgelöst" },
      { a: "40 g/kg", i: "NPS" },
      { a: "5 g/kg", i: "Zucker" },
      { a: "15 g/kg", i: "schwarzer Pfeffer (grob gemahlen, ein Teil als Kruste)" },
      { a: "je 1 TL", i: "Wacholder, Lorbeer" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "10–12 Tage", temp: "4–6 °C", text: "NPS, Zucker, 5 g/kg Pfeffer und Wacholder einreiben, vakuumieren.", bullets: [] },
      { label: "Durchbrennen", kind: "rest", dur: "3–4 Tage", temp: "10–15 °C", text: "Ohne Salz aufgehängt.", bullets: [] },
      { label: "Pfefferkruste auftragen", kind: "prep", dur: "10 min", temp: "—", text: "Oberfläche mit grobem schwarzen Pfeffer komplett bedecken, andrücken.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "4–5 × 6–8 h", temp: "unter 22 °C", text: "Kaltgeräuchert mit Buche.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "2–3 Wochen", temp: "12–16 °C", text: "Aufgehängt in kühlem, luftigem Raum reifen.", bullets: [] },
    ],
    tips: ["Pfefferkruste schützt vor Austrocknung und gibt intensives Aroma.", "Variante: Paprika statt Pfeffer für eine mildere, rote Kruste."],
  }),

  r({
    id: "honigschinken", name: "Honig-Senf Schinken (gekocht)", method: "warm", cat: "Schinken", diff: 2,
    time: "2–3 Tage", pit: "60–75 °C Brühtemperatur + 35–45 °C Räuchern", core: "72 °C", wood: "WSM · Apfel + Kirsche",
    blurb: "Zarter, milder gekochter Schinken mit Honig-Senf-Glasur und leichtem Raucharoma.",
    ingredients: [
      { a: "1 kg", i: "Schweinekamm oder -keule, ausgelöst" },
      { a: "40 g/kg", i: "40 g/kg" },
      { a: "5 g/kg", i: "Zucker" },
      { a: "je 1 TL", i: "Koriander, Wacholder, Muskat (Pökelgewürze)" },
      { a: "je 2 EL", i: "Honig, Senf (Glasur)" },
    ],
    phases: [
      { label: "Pökeln (Nasspökelung)", kind: "cure", dur: "5–7 Tage", temp: "4–6 °C", text: "In 6%iger NPS-Lake einlegen (60 g NPS/Liter). Vollständig bedeckt, beschweren.", bullets: ["Nasspökelung ergibt milderen, zarteren Schinken als Trockenbeize"] },
      { label: "Abwaschen & Trocknen", kind: "prep", dur: "3–4 h", temp: "kühl, luftig", text: "Abspülen, aufhängen bis Oberfläche trocken.", bullets: [] },
      { label: "Warmräuchern", kind: "smoke", dur: "2–3 h", temp: "35–45 °C", text: "WSM auf 35–45 °C mit Apfel + Kirsche. Leichter, fruchtiger Rauch.", bullets: [] },
      { label: "Brühen / Garen", kind: "cook", dur: "1–1,5 h", temp: "Wasser 70–75 °C (nicht kochen!)", text: "Im Topf bei 70–75 °C (simmern, nicht kochen) bis KT 72 °C.", bullets: ["Temperatur nicht überschreiten – Schinken wird trocken", "Thermometer in den Topf hängen"] },
      { label: "Glasieren & Abkühlen", kind: "finish", dur: "20 min", temp: "Ofen 180 °C", text: "Heißer Schinken mit Honig-Senf bepinseln, kurz bei 180 °C im Ofen glasieren.", bullets: [] },
    ],
    tips: ["Nasspökelung + Brühen = saftigster Schinken überhaupt.", "Restliche Lake für Suppen oder Saucen verwenden."],
  }),

  r({
    id: "knochen-rohschinken", name: "Nussknochen-Rohschinken (Kräuter)", method: "kalt", cat: "Schinken", diff: 2,
    time: "5–6 Wochen", pit: "12–18 °C", core: "", wood: "WSM · Buche + Kirsche",
    blurb: "Nussknochen (Schweinekeule ohne Knochen) mit Kräuterkruste kaltgeräuchert – typisch hausgemacht.",
    ingredients: [
      { a: "1,5 kg", i: "Nussknochen (Schweinekeule, ausgelöst)" },
      { a: "40 g/kg", i: "NPS" },
      { a: "je 1 TL", i: "Knoblauch, Rosmarin, Thymian, Majoran, Pfeffer" },
      { a: "5 g/kg", i: "Zucker" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "12–14 Tage", temp: "4–6 °C", text: "NPS und Gewürze einreiben, vakuumieren oder eng abgedeckt in Schale.", bullets: [] },
      { label: "Durchbrennen", kind: "rest", dur: "3–4 Tage", temp: "10–14 °C", text: "Aufgehängt durchbrennen.", bullets: [] },
      { label: "Kräuterkruste", kind: "prep", dur: "10 min", temp: "—", text: "Getrocknete Kräuter (Rosmarin, Thymian, Majoran) außen eindrücken.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "4–5 × 8 h", temp: "unter 22 °C", text: "Mehrfach kaltgeräuchert mit Buche und Kirsche.", bullets: [] },
      { label: "Reifen", kind: "mature", dur: "3–4 Wochen", temp: "12–18 °C", text: "Luftig hängen bis gewünschter Trocknungsgrad erreicht.", bullets: [] },
    ],
    tips: ["Kräuterkruste gibt Aroma und schützt die Oberfläche.", "Kirschholz macht den Schinken angenehm rotgolden."],
  }),

  /* ============================ NEUE HEISSRÄUCHERN ============================ */

  r({
    id: "raucherpute", name: "Räucherpute (ganz)", method: "heiss", cat: "Geflügel", diff: 3,
    time: "1 Tag + 6–8 h", pit: "130–150 °C", core: "74 °C (Brust), 82 °C (Keule)", wood: "WSM · Apfel + Hickory",
    blurb: "Ganze Räucherpute für besondere Anlässe – durch Brine saftig, durch Rauch unwiderstehlich.",
    ingredients: [
      { a: "1", i: "Pute (4–5 kg)" },
      { a: "1–2 l", i: "Brine: 80 g Salz + 60 g Zucker + Lorbeer, Thymian, Pfefferkörner pro Liter" },
      { a: "3–4 EL", i: "Rub: Paprika, Knoblauch, Pfeffer, Salz, brauner Zucker, Thymian" },
      { a: "2 EL", i: "weiche Butter (für die Haut)" },
    ],
    phases: [
      { label: "Brine (Nacht vorher)", kind: "cure", dur: "12–24 h", temp: "0–4 °C", text: "Pute komplett in Brine einlegen. Großes Behältnis oder Kühlbox nutzen.", bullets: ["Brining ist Pflicht bei Pute – sonst wird die Brust trocken", "Brine erst abkühlen lassen, dann Pute hinein"] },
      { label: "Trocknen & Würzen", kind: "prep", dur: "2–4 h", temp: "kühl, luftig", text: "Abspülen, gut trocknen. Butter unter die Haut schieben. Außen Rub auftragen.", bullets: ["Trockene Haut = knusprigeres Ergebnis"] },
      { label: "WSM einrichten", kind: "prep", dur: "20 min", temp: "130–150 °C", text: "Minion Method, Wasserschale leer lassen, alle Lüftungen weit offen. Apfel + Hickory-Chunks.", bullets: ["Wasserschale leer = höhere Temperatur für knusprige Haut"] },
      { label: "Räuchern", kind: "smoke", dur: "4–6 h", temp: "130–150 °C", text: "Pute auf dem unteren Rost. Alle 1 h prüfen. KT Brust 74 °C, Keule 82 °C.", bullets: ["Brust wird immer zuerst fertig", "Bei 65 °C KT Brust: mit Alufolie abdecken wenn zu dunkel"] },
      { label: "Ruhen", kind: "finish", dur: "20–30 min", temp: "—", text: "Locker mit Alufolie abdecken, ruhen lassen, dann tranchieren.", bullets: [] },
    ],
    tips: ["Pute NIEMALS ohne Brine räuchern – die Brust wird sonst trocken.", "Apfel + Hickory ist die klassische Kombination für Geflügel.", "Zu klein für den WSM: Pute spatchcocken (Rückgrat herausschneiden, flach drücken)."],
  }),

  r({
    id: "zander-heiss", name: "Heißgeräucherter Zander / Barsch", method: "heiss", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 Tag + 2–3 h", pit: "75–95 °C", core: "65 °C", wood: "WSM · Erle + Apfel",
    blurb: "Heimischer Süßwasserfisch heißgeräuchert – mageres, zartes Fleisch mit feinem Raucharoma.",
    ingredients: [
      { a: "2–4", i: "Zander oder Barsch (je 400–700 g), ausgenommen, geschuppt" },
      { a: "1–2 l", i: "Salzlake 6 %: 60 g Salz pro Liter + Pfeffer, Lorbeer, Dill" },
    ],
    phases: [
      { label: "Einlaken", kind: "cure", dur: "4–8 h", temp: "0–4 °C", text: "Fische komplett in gewürzter Salzlake einlegen.", bullets: ["Zander ist mager – nicht zu lange einlaken (max. 8 h)"] },
      { label: "Trocknen", kind: "dry", dur: "2–3 h", temp: "kühl, luftig", text: "Abspülen, auf Gitter oder aufgehängt trocknen bis Pellicle entsteht.", bullets: ["Pellicle ist bei mageren Fischen besonders wichtig"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "1,5–2,5 h", temp: "75–95 °C stufenweise", text: "WSM auf 75 °C starten, langsam auf 90–95 °C. Erle + Apfel. KT 65 °C.", bullets: ["Fertig wenn Fleisch sich weiß-flockig löst", "Nicht übergaren – Zander wird sonst trocken"] },
      { label: "Abkühlen", kind: "finish", dur: "30 min", temp: "Raumtemperatur", text: "Auf Gitter abkühlen lassen, dann kühlen.", bullets: [] },
    ],
    tips: ["Erle ist das klassische Holz für Süßwasserfische – kein Hickory oder starke Hölzer.", "Mit Senf-Dill-Sauce und Schwarzbrot servieren.", "Zander und Barsch vom Anglerkollegen oder seriösen Fischhändler."],
  }),

  r({
    id: "ribs-hot-fast", name: "Schnelle Ribs (Hot & Fast)", method: "heiss", cat: "Schwein", diff: 2,
    time: "3,5–4 h", pit: "150–165 °C", core: "93–95 °C (Zahnstochertest)", wood: "WSM · Apfel + Kirsche",
    blurb: "Ribs in unter 4 Stunden – Hot & Fast statt 3-2-1. Weniger Zeit, saftig und rauchig.",
    ingredients: [
      { a: "2", i: "Leitern Baby Back Ribs" },
      { a: "3–4 EL", i: "Rub: Paprika, Salz, Pfeffer, brauner Zucker, Knoblauch, Zwiebelpulver" },
      { a: "100 ml + 100 ml", i: "Apfelsaft (zum Sprühen), BBQ-Sauce (zum Glasieren)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "20 min", temp: "—", text: "Silberhaut abziehen, Rub kräftig einreiben.", bullets: ["Silberhaut muss komplett entfernt werden"] },
      { label: "WSM auf 155–165 °C", kind: "prep", dur: "20 min", temp: "155–165 °C", text: "Minion Method mit offenerer Lüftung. Wasserschale halb gefüllt. Apfel + Kirsche.", bullets: [] },
      { label: "Räuchern (2 h)", kind: "smoke", dur: "2 h", temp: "155–165 °C", text: "Ribs auf den Rost, alle 30 min mit Apfelsaft sprühen.", bullets: [] },
      { label: "Dämpfen in Folie (1 h)", kind: "cook", dur: "1 h", temp: "155–165 °C", text: "In Alufolie mit etwas Apfelsaft und Butter einwickeln – fest schließen.", bullets: ["Folie macht die Ribs zart – bei Hot & Fast unverzichtbar"] },
      { label: "Glasieren (30–45 min)", kind: "finish", dur: "30–45 min", temp: "155–165 °C", text: "Auspacken, Sauce auftragen, offen karamellisieren.", bullets: ["Zahnstochertest: dringt ohne Widerstand durch = fertig"] },
    ],
    tips: ["Hot & Fast ergibt bissfestere Ribs als 3-2-1 – aber viel schneller.", "Ideal wenn keine Zeit für eine 6 h Session.", "Baby Backs eignen sich besser für Hot & Fast als große Spareribs."],
  }),

  /* ============================ NEUE BBQ LOW & SLOW ============================ */

  r({
    id: "chuck-roast-bbq", name: "Smoked Chuck Roast (Poor Man's Brisket)", method: "bbq", cat: "Rind", diff: 2,
    time: "6–8 h", pit: "110–125 °C", core: "92–95 °C", wood: "WSM · Eiche + Hickory",
    blurb: "Rinderschulter als günstiger Brisket-Ersatz – saftig, aromatisch, herrliche Kruste.",
    ingredients: [
      { a: "2 kg", i: "Rinderschulter (Chuck Roast), am Stück" },
      { a: "je 3 EL", i: "grobes Meersalz + schwarzer Pfeffer (Texas-Style Rub)" },
      { a: "200 ml", i: "Rinderbrühe (zum Sprühen nach 3 h)" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "30 min", temp: "—", text: "Schulter großzügig mit Salz und grobem Pfeffer rubben. 30 min bei Raumtemperatur stehen lassen.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "3–4 h", temp: "110–125 °C", text: "WSM auf 115–120 °C. Minion Method. Eiche + Hickory. Alle 2 h mit Rinderbrühe sprühen. Bis Bark steht (~65 °C Kern).", bullets: [] },
      { label: "Wickeln im Stall", kind: "cook", dur: "2–3 h", temp: "110–125 °C", text: "Bei 68–72 °C Kern (Stall) in Butcher Paper oder Alufolie wickeln. Weitergaren.", bullets: ["Butcher Paper für mehr Bark", "Folie für mehr Saftigkeit"] },
      { label: "Ruhen", kind: "rest", dur: "30–60 min", temp: "Kühlbox eingewickelt", text: "Bei 92–95 °C Kern entnehmen, in Kühlbox ruhen.", bullets: [] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Als ganzes Stück aufschneiden oder wie Pulled Beef zupfen.", bullets: ["Für Pulled Beef: bis 96–98 °C garen", "Quer zur Faser aufschneiden"] },
    ],
    tips: ["Chuck Roast kostet 1/3 von Brisket und ist nachsichtiger beim Garen – ideal zum Üben.", "Intramuskuläres Fett schmilzt bei 92+ °C = butterweiche Textur.", "Als Pulled Beef auf Burgern oder Sandwiches grandios."],
  }),

  r({
    id: "lammschulter-bbq", name: "Lammschulter Low & Slow", method: "bbq", cat: "Lamm", diff: 2,
    time: "8–10 h", pit: "110–120 °C", core: "90–94 °C", wood: "WSM · Eiche + Rosmarinzweig auf den Kohlen",
    blurb: "Lammschulter low & slow bis sie auseinanderfällt – mediterrane Würze trifft BBQ-Geduld.",
    ingredients: [
      { a: "1,5–2 kg", i: "Lammschulter, mit Knochen" },
      { a: "4 EL + je 1 TL", i: "Würzpaste: Olivenöl, Knoblauch (6 Zehen), Rosmarin, Thymian, Zitronenschale, Pfeffer, Salz" },
    ],
    phases: [
      { label: "Würzpaste & Marinieren", kind: "cure", dur: "12–24 h", temp: "Kühlschrank", text: "Alle Zutaten zu einer Paste mörsern. Lammschulter tief einschneiden und kräftig einreiben. Vakuumieren.", bullets: ["Je länger die Marinade, desto intensiveres Aroma"] },
      { label: "Räuchern Phase 1", kind: "smoke", dur: "3–4 h", temp: "110–120 °C", text: "WSM auf 115 °C. Eiche und frischer Rosmarinzweig auf die Kohlen. Bis ca. 65 °C Kern.", bullets: ["Rosmarin auf die Kohlen: mediterranes Raucharoma"] },
      { label: "Wickeln", kind: "cook", dur: "4–5 h", temp: "110–120 °C", text: "In Butcher Paper oder doppelter Lage Alufolie wickeln. Weitergaren bis 90–94 °C.", bullets: ["Viel Bindegewebe – braucht Zeit bis es kollagen wird"] },
      { label: "Ruhen", kind: "rest", dur: "1 h", temp: "Kühlbox eingewickelt", text: "1 h ruhen.", bullets: [] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Fleisch löst sich vom Knochen – in große Stücke rupfen.", bullets: ["Mit Tzatziki, Fladenbrot und frischen Kräutern servieren", "Knochenmark auslöffeln!"] },
    ],
    tips: ["Lammschulter mit Knochen – der Knochen gibt Geschmack.", "Lamm nimmt Rauch intensiver auf als Schwein – Eiche statt Hickory für mildere Note.", "Reste in Pita-Brot mit Harissa hervorragend."],
  }),

  r({
    id: "smoked-meatloaf", name: "BBQ Meatloaf (Hackfleisch-Laib)", method: "bbq", cat: "Schwein", diff: 1,
    time: "3–4 h", pit: "120–135 °C", core: "72 °C", wood: "WSM · Kirsche + Apfel",
    blurb: "Hausmannskost trifft BBQ: klassischer Hackfleischlaib vom Smoker, glasiert.",
    ingredients: [
      { a: "1 kg", i: "Rinderhack oder gemischtes Hack (Rind + Schwein)" },
      { a: "1", i: "Ei" },
      { a: "100 g", i: "Semmelbrösel (in etwas Milch eingeweicht)" },
      { a: "1", i: "Zwiebel (fein gewürfelt, angedünstet)" },
      { a: "je 1 TL", i: "Knoblauch, Worcestershire, Senf, Salz, Pfeffer, Paprika" },
      { a: "ca. 100 ml", i: "BBQ-Sauce (zum Glasieren)" },
    ],
    phases: [
      { label: "Masse vorbereiten", kind: "prep", dur: "20 min", temp: "—", text: "Alle Zutaten gut vermengen. Zu einem Laib formen und auf ein Räuchergitter legen.", bullets: ["Nicht zu fest kneten – sonst wird der Meatloaf kompakt"] },
      { label: "Räuchern", kind: "smoke", dur: "2 h", temp: "120–135 °C", text: "WSM auf 125–130 °C. Kirsche und Apfel. Laib auf den Rost.", bullets: [] },
      { label: "Glasieren & Finish", kind: "finish", dur: "1 h", temp: "120–135 °C", text: "Bei 65 °C KT: BBQ-Sauce kräftig auftragen. Alle 20 min wiederholen bis 72 °C.", bullets: ["Mehrere Schichten Sauce = dicke Glasur"] },
      { label: "Ruhen", kind: "rest", dur: "15 min", temp: "—", text: "Vor dem Aufschneiden ruhen.", bullets: [] },
    ],
    tips: ["In der Mitte ein Stück Cheddar einrollen für flüssigen Käsekern.", "Reste kalt aufgeschnitten auf Brot sind hervorragend.", "Variante: Baconstreifen außen herum weben für Speckmantel."],
  }),

  /* ============================ NEUE DÖRREN ============================ */

  r({
    id: "birnen-dorr", name: "Birnenscheiben / Birnenchips", method: "dorr", cat: "Obst", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Lederig oder knusprig", wood: "Graef DA506", yield: "ca. 100 g/kg",
    blurb: "Sanft süßlich und zart – getrocknete Birnen sind ein unterschätzter Snack.",
    ingredients: [
      { a: "1 kg", i: "feste Birnen (Williams, Conference)" },
      { a: "1", i: "Zitrone (Saft)" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Birnen schälen, Kerngehäuse entfernen, in 5–6 mm Scheiben schneiden. Sofort in Zitronenwasser.", bullets: ["Birnen bräunen sehr schnell – sofort in Zitronenwasser legen"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Gut abtupfen, einlagig auf Gitter. Nach halber Zeit wenden.", bullets: ["Lederig (8 h): ideal zum Snacken", "Knusprig (10+ h): als Chips"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Auskühlen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Mit Vanille und Kardamom würzen vor dem Dörren für ein Weihnachtsaroma.", "Getrocknete Birnen auf Käseplatten sind ein Highlight."],
  }),

  r({
    id: "aprikosen-dorr", name: "Aprikosenhälften getrocknet", method: "dorr", cat: "Obst", diff: 1,
    time: "10–16 h", pit: "55–65 °C", core: "Lederig-weich, kein Feuchtkern", wood: "Graef DA506", yield: "ca. 200 g/kg",
    blurb: "Selbstgemachte Aprikosen – süß-säuerlich konzentriert, ohne Schwefeldioxid.",
    ingredients: [
      { a: "1 kg", i: "reife Aprikosen" },
      { a: "1 TL", i: "Zitronensaft (verhindert Bräunung)" },
    ],
    phases: [
      { label: "Halbieren & Entkernen", kind: "prep", dur: "15 min", temp: "—", text: "Aprikosen halbieren, Stein entfernen, mit Schnittfläche nach oben auf Gitter legen.", bullets: ["Hautseite nach unten schützt das Fruchtfleisch"] },
      { label: "Dörren", kind: "dry", dur: "10–16 h", temp: "55–65 °C", text: "Langzeit-Dörren. Probe: Hälfte drücken – kein flüssiger Kern, weich-lederig.", bullets: ["Sulfitfreie Aprikosen werden braun-orange – normal und gesünder"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Auskühlen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Perfekt für Müsli, Konfitüre oder als Snack zu Käse.", "Vollständig getrocknet monatelang haltbar im Kühlschrank."],
  }),

  r({
    id: "susskartoffel-chips", name: "Süßkartoffelchips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 100 g/kg",
    blurb: "Natürlich süßlich, knusprig – weit besser als alles aus der Tüte.",
    ingredients: [
      { a: "1 kg", i: "Süßkartoffeln" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Paprika oder Zimt (herzhaft oder süß)" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Süßkartoffeln schälen, in 3–4 mm Scheiben schneiden (Mandoline empfohlen).", bullets: ["Gleichmäßige Dicke ist entscheidend"] },
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Leicht mit Öl einreiben, würzen. Herzhaft: Salz + Paprika. Süß: Zimt + Zucker + Prise Salz.", bullets: [] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Einlagig auf Gitter, nach halber Zeit wenden. Erst nach vollständigem Abkühlen wirklich knusprig.", bullets: ["Süßkartoffeln haben viel Zucker – etwas länger als Karotten"] },
    ],
    tips: ["Süß-Variante mit Zimt ist ein hervorragendes Dessert-Topping.", "Im Dörrer ohne Frittieröl – deutlich kalorienärmer als gebackene Chips."],
  }),

  r({
    id: "kurbis-chips", name: "Kürbischips (Hokkaido)", method: "dorr", cat: "Gemüse", diff: 1,
    time: "5–8 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "Herbst im Glas: Hokkaidokürbis gedörrt – nussig, süßlich, knusprig.",
    ingredients: [
      { a: "1 kg", i: "Hokkaido-Kürbis (Schale bleibt dran)" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Pfeffer, Paprika, Kreuzkümmel oder Muskatnuss" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "—", text: "Hokkaido waschen, halbieren, Kerne entfernen, in 3–4 mm Scheiben schneiden.", bullets: ["Hokkaido: Schale ist essbar und knusprig", "Andere Kürbissorten müssen geschält werden"] },
      { label: "Würzen & Dörren", kind: "dry", dur: "5–8 h", temp: "55–65 °C", text: "Mit Öl und Gewürzen vermengen, einlagig auf Gitter. Dörren bis knusprig.", bullets: ["Kürbis hat viel Wasser – Geduld einplanen"] },
    ],
    tips: ["Kürbiskerne bei 60 °C 2–3 h mit Salz nebenher dörren.", "Chips nehmen schnell Feuchtigkeit an – sofort luftdicht verpacken."],
  }),

  r({
    id: "weintrauben-rosinen", name: "Selbstgemachte Rosinen", method: "dorr", cat: "Obst", diff: 1,
    time: "24–48 h", pit: "55–65 °C", core: "Weich-lederig, zäh", wood: "Graef DA506", yield: "ca. 250 g/kg",
    blurb: "Aus frischen Weintrauben – aromatischer als Supermarkt-Rosinen, ohne Zusatzstoffe.",
    ingredients: [
      { a: "1 kg", i: "kernlose Weintrauben (Muskateller oder Sultaninen)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Trauben waschen, von Stielen trennen. 30 Sek. in kochendem Wasser blanchieren, abschrecken.", bullets: ["Blanchieren reißt die Haut leicht auf und beschleunigt das Dörren enorm"] },
      { label: "Dörren", kind: "dry", dur: "24–48 h", temp: "55–65 °C", text: "Einlagig auf Gitter, regelmäßig wenden. Trauben schrumpfen extrem.", bullets: ["Test: Rosine biegen – zäh-weich, kein feuchter Kern = fertig"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "In Schraubglas luftdicht lagern.", bullets: [] },
    ],
    tips: ["Rote Trauben = dunklere, intensivere Rosinen; weiße Trauben = goldene Sultaninen.", "Für Kuchen, Müsli oder pur als Snack."],
  }),

  /* ============================ NEUE GRILL ============================ */

  r({
    id: "flank-steak", name: "Flank Steak / Bavette", method: "grill", cat: "Rindfleisch", diff: 2,
    time: "30–60 min", pit: "direkt 250–280 °C", core: "52–54 °C (medium-rare)", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Das unterschätzte Steak – günstiger als Filet, intensiver im Geschmack. Quer zur Faser aufschneiden ist Pflicht.",
    ingredients: [
      { a: "600–800 g", i: "Flank Steak / Bavette, pariert" },
      { a: "je 1–2 TL", i: "grobes Meersalz (1 h vorher), schwarzer Pfeffer erst nach dem Grillen" },
      { a: "2 EL + je 1 TL", i: "Butter + Knoblauch + Rosmarin (zum Basting)" },
    ],
    phases: [
      { label: "Dry Brine", kind: "prep", dur: "1–8 h", temp: "Kühlschrank, offen", text: "Großzügig salzen, offen auf Gitter kühlen.", bullets: [] },
      { label: "Grillvorbereitung", kind: "prep", dur: "15 min", temp: "—", text: "Weber: alle Kohlen auf eine Seite (2-Zonen-Feuer). Gasgrill: alle Brenner auf Maximum vorheizen.", bullets: [] },
      { label: "Direkt grillen", kind: "direct", dur: "4–6 min/Seite", temp: "250–280 °C", text: "Direkt über maximale Hitze. Je Seite 4–6 min bis KT 52–54 °C.", bullets: ["Flank Steak ist dünn – schnell garen", "Basting: Butter, Knoblauch, Rosmarin in Aluschale, mit Löffel übergießen"] },
      { label: "Ruhen & Aufschneiden", kind: "finish", dur: "8 min", temp: "—", text: "8 min ruhen, dann QUER zur Faser in dünne Scheiben aufschneiden.", bullets: ["Quer zur Faser ist Pflicht – sonst zäh", "Faser läuft diagonal – Schnittrichtung beachten!"] },
    ],
    tips: ["Bavette = französischer Begriff für das gleiche Stück.", "Ab 58 °C wird es zäh – Medium-rare ist optimal.", "Marinade (Sojasauce + Öl + Knoblauch + Limette) für 4–8 h gibt Tiefe."],
  }),

  r({
    id: "zedernbrett-lachs", name: "Lachs auf Zedernholz-Brett", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "30 min einweichen + 25–35 min Grillen", pit: "indirekt 180–200 °C", core: "55–60 °C", wood: "Zedernholz-Brett + Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Lachs auf dem Zedernbrett – saftig, aromatisch, kein Klebestress, perfektes Showstück.",
    ingredients: [
      { a: "1", i: "Lachsseite (600–800 g) mit Haut, entgrätet" },
      { a: "1", i: "Zedernholz-Grillbrett (Food Grade, 30 min eingewässert)" },
      { a: "je 2 EL", i: "Glasur: Ahornsirup, Dijonsenf, Sojasoße, Ingwer, Knoblauch" },
    ],
    phases: [
      { label: "Brett einweichen", kind: "prep", dur: "30–60 min", temp: "Wasser oder Weißwein", text: "Zedernholzbrett vollständig einweichen.", bullets: ["Wein gibt feines Aroma und schützt das Brett besser"] },
      { label: "Lachs würzen", kind: "prep", dur: "15 min", temp: "—", text: "Lachs auf das Brett (Haut nach unten). Glasur auftragen.", bullets: [] },
      { label: "Grillen auf dem Brett", kind: "indirect", dur: "25–35 min", temp: "180–200 °C indirekt", text: "Brett auf die indirekte Zone, Deckel zu. Brett beginnt zu rauchen – das ist gewollt.", bullets: ["Wenn Brett zu stark brennt: wenige Tropfen Wasser drauf", "Fertig bei KT 55–60 °C: leicht flockig, transluzent-rosé"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Direkt vom Brett servieren. Haut bleibt am Brett kleben – Lachs löst sich leicht.", bullets: [] },
    ],
    tips: ["Zedernholz-Bretter im Fachhandel – immer Food Grade kaufen.", "Brett nach Benutzung abkratzen, einölen und 2–3 mal wiederverwenden.", "Maple-Miso-Glasur: Ahornsirup + weißes Miso + Ingwer = außergewöhnlich gut."],
  }),

  r({
    id: "halloumi-grill", name: "Gegrillter Halloumi & Gemüse-Platte", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "20–30 min", pit: "direkt 200–230 °C", core: "—", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Halloumi wird auf dem Grill goldbraun ohne zu schmelzen – perfekt für vegetarische Runden.",
    ingredients: [
      { a: "2", i: "Packungen Halloumi (je 250 g)" },
      { a: "je 1 Stk", i: "Zucchini, Auberginen, Paprika, rote Zwiebeln" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Zitrone, Oregano, Meersalz, Pfeffer" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "10 min", temp: "—", text: "Gemüse in grobe Stücke schneiden, mit Öl und Gewürzen marinieren. Halloumi in 1 cm Scheiben schneiden.", bullets: ["Auberginen in Längsstreifen, Paprika in Viertel", "Halloumi braucht nur etwas Öl"] },
      { label: "Gemüse grillen", kind: "direct", dur: "8–12 min", temp: "200–230 °C", text: "Gemüse direkt auf dem Rost. Schöne Grillstreifen und weich.", bullets: ["Auberginen zuerst auflegen – brauchen länger"] },
      { label: "Halloumi grillen", kind: "direct", dur: "2–3 min/Seite", temp: "200–230 °C", text: "Halloumi-Scheiben auf den geölten Rost. Je Seite 2–3 min bis goldbraun.", bullets: ["NICHT bewegen bis Halloumi sich leicht löst", "Goldbraune Kruste = perfekt"] },
      { label: "Anrichten", kind: "finish", dur: "—", temp: "—", text: "Alles auf Platte, mit Zitrone beträufeln, Oregano und Meersalz.", bullets: [] },
    ],
    tips: ["Halloumi sofort heiß essen – abgekühlt wird er fest und gummiartig.", "Mit Honig und Chiliflocken ist es noch besser.", "Mit Hummus und Fladenbrot als vollständige Mahlzeit servieren."],
  }),

  r({
    id: "oktopus-grill", name: "Oktopus vom Grill (vorgegart)", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "1 h Vorgaren + 10–15 min Grillen", pit: "direkt 220–260 °C", core: "—", wood: "Rössle Gasgrill oder Weber Kugelgrill",
    blurb: "Knusprige Arme, zartes Innere – der Trick ist das Vorkochen. Grillen gibt die Röstung.",
    ingredients: [
      { a: "1", i: "Oktopus (1,5–2 kg), tiefgekühlt aufgetaut" },
      { a: "je 1 TL", i: "Vorkoch-Wasser: Lorbeer, Pfefferkörner, Weißwein, Salz" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Knoblauch, Zitrone, Petersilie, Paprika" },
    ],
    phases: [
      { label: "Vorgaren (unverzichtbar)", kind: "cook", dur: "45–60 min", temp: "Simmern, 85–90 °C", text: "Oktopus im Gewürzwasser bei 85–90 °C simmern bis eine Messerspitze leicht einsticht.", bullets: ["Tiefgekühlt aufgetauter Oktopus ist zarter – Eiskristalle zerteilen die Muskelfasern", "NICHT sprudelnd kochen – macht ihn gummiartig"] },
      { label: "Abkühlen & Marinieren", kind: "marinate", dur: "15–30 min", temp: "Raumtemperatur", text: "Aus dem Wasser nehmen, kurz abkühlen. Mit Öl, Knoblauch, Zitrone und Paprika marinieren.", bullets: [] },
      { label: "Scharf angrillen", kind: "direct", dur: "3–5 min/Seite", temp: "220–260 °C direkt", text: "Tentakel direkt über maximale Hitze. Ziel: außen kross und leicht verkohlt, innen zart.", bullets: ["Oktopus-Arme einzeln grillen", "Wenig bewegen – Grillstreifen sind das Ziel"] },
      { label: "Anrichten", kind: "finish", dur: "—", temp: "—", text: "Mit frischer Zitrone, Olivenöl, Petersilie und Paprika servieren.", bullets: [] },
    ],
    tips: ["Tiefgekühlt kaufen und langsam auftauen ist besser als frisch.", "Tentakel auf den Rost – der Körper hat wenig Grillfläche.", "Auf Rucola-Salat mit Parmesan und Zitronenvinaigrette servieren."],
  }),

  /* ============================ NEUE WARMRÄUCHERN (Schwein · Rind · Gemüse) ============================ */

  r({
    id: "warm-bauchspeck", name: "Warmgeräucherter Bauchspeck", method: "warm", cat: "Schwein", diff: 2,
    time: "1 Woche + 4 h", pit: "40–55 °C", core: "", wood: "Buche / Hickory", yield: "ca. 1,2 kg",
    blurb: "Gepökelter Schweinebauch, warm geräuchert – das Original für Bauernspeck, Bratspeck und herzhafte Würfel.",
    ingredients: [
      { a: "1,5 kg", i: "Schweinebauch ohne Schwarte, am Stück" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "5 g/kg", i: "brauner Zucker" },
      { a: "je 1 TL", i: "Pfeffer, Wacholder, Knoblauch, Lorbeer" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "7–10 Tage", temp: "2–7 °C", text: "Bauch rundum mit der Pökelmischung einreiben, vakuumieren und täglich wenden.", bullets: ["NPS exakt abwiegen (40 g/kg)", "1 Tag je cm Dicke plus 2–3 Tage Reserve"] },
      { label: "Durchbrennen", kind: "rest", dur: "2–3 Tage", temp: "2–7 °C", text: "Abspülen, trockentupfen, ohne Salz ruhen lassen.", bullets: ["Salz verteilt sich gleichmäßig"] },
      { label: "Trocknen", kind: "dry", dur: "12–24 h", temp: "12–15 °C, luftig", text: "Aufhängen bis die Oberfläche matt-klebrig ist (Pellicle).", bullets: ["Trockene Oberfläche = Rauch haftet besser"] },
      { label: "Warm räuchern", kind: "smoke", dur: "2–4 h · 2–3 Gänge", temp: "40–55 °C", text: "In Gängen warm räuchern bis goldbraun, dazwischen auslüften.", bullets: ["Warmrauch verleiht Tiefe ohne zu garen", "Über 60 °C beginnt das Fett zu schmelzen – vermeiden"] },
    ],
    tips: ["Warmgeräucherter Speck ist roh und muss vor dem Verzehr gebraten oder mitgekocht werden.", "In Würfeln auslassen für Bratkartoffeln, Eintöpfe oder Carbonara.", "Mit Hickory wird er kräftig-amerikanisch, mit Buche klassisch-mild."],
  }),

  r({
    id: "warm-schaeufele", name: "Warmgeräucherter Schweinenacken (Schäufele-Style)", method: "warm", cat: "Schwein", diff: 2,
    time: "1 Woche + 4 h", pit: "45–55 °C → 75 °C Garen", core: "70 °C", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Gepökelter Nacken, warm geräuchert und sanft gegart – saftig, mild rauchig, fränkische Schäufele-Idee ohne Knochen.",
    ingredients: [
      { a: "1,8 kg", i: "Schweinenacken am Stück, ohne Knochen" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Pfeffer, Knoblauch, Kümmel, Majoran" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "5–7 Tage", temp: "2–7 °C", text: "Nacken einreiben, vakuumieren, täglich wenden.", bullets: ["Marmorierung macht das Stück saftig"] },
      { label: "Durchbrennen", kind: "rest", dur: "2 Tage", temp: "2–7 °C", text: "Abspülen, trocknen, ruhen lassen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "4–6 h", temp: "luftig", text: "Oberfläche antrocknen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "2–3 h", temp: "45–55 °C", text: "Warm räuchern bis goldbraun.", bullets: [] },
      { label: "Garziehen", kind: "cook", dur: "1–1,5 h", temp: "75–80 °C", text: "Bei niedriger Hitze auf Kern 70 °C garen.", bullets: ["Im WSM mit Wasserschale oder im Ofen", "Über Nacht gekühlt lässt es sich dünn aufschneiden"] },
    ],
    tips: ["Warm aufgeschnitten zu Sauerkraut und Klößen, kalt als kräftiger Aufschnitt.", "Majoran und Kümmel geben den typisch fränkischen Ton."],
  }),

  r({
    id: "warm-roastbeef", name: "Warmgeräuchertes Roastbeef", method: "warm", cat: "Rind", diff: 3,
    time: "1 Tag + 3 h", pit: "50–60 °C → Sear", core: "54 °C (medium-rare)", wood: "Buche / Kirsche", yield: "ca. 1,2 kg",
    blurb: "Rinderrücken sanft warm geräuchert, dann scharf angebraten – rosa Kern mit feinem Rauchmantel.",
    ingredients: [
      { a: "1,4 kg", i: "Roastbeef / Rinderrücken am Stück, pariert" },
      { a: "12 g/kg", i: "grobes Meersalz (Dry Brine)" },
      { a: "je 1 TL", i: "grober Pfeffer, Knoblauch, Senf, Rosmarin" },
    ],
    phases: [
      { label: "Dry Brine", kind: "cure", dur: "12–24 h", temp: "Kühlschrank, offen", text: "Salzen und offen kühlen – würzt durch und trocknet die Oberfläche.", bullets: ["Offene Lagerung = bessere Rauchhaftung und Kruste"] },
      { label: "Würzen", kind: "prep", dur: "15 min", temp: "—", text: "Mit Senf einstreichen, Pfeffer-Knoblauch-Rub auftragen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "1,5–2,5 h", temp: "50–60 °C", text: "Sanft warm räuchern bis Kern 48 °C erreicht.", bullets: ["Niedrige Temperatur hält das Fleisch rosig und saftig"] },
      { label: "Scharf nachbraten", kind: "finish", dur: "3–5 min", temp: "sehr heiß", text: "In Pfanne oder über direkter Glut rundum scharf angrillen bis Kern 54 °C.", bullets: ["Reverse Sear: außen Kruste, innen durchgehend rosa", "8 min ruhen vor dem Aufschneiden"] },
    ],
    tips: ["Hauchdünn aufgeschnitten kalt mit Remoulade, warm zu Bratkartoffeln.", "Ab 58 °C wird Roastbeef grau – Medium-rare ist der Sweet Spot."],
  }),

  r({
    id: "warm-rinderzunge", name: "Warmgeräucherte Rinderzunge", method: "warm", cat: "Rind", diff: 3,
    time: "1 Woche + 4 h", pit: "45–55 °C", core: "gegart", wood: "Buche", yield: "ca. 900 g",
    blurb: "Gepökelt, zart gekocht und warm geräuchert – eine unterschätzte Delikatesse, fein und würzig.",
    ingredients: [
      { a: "1", i: "Rinderzunge (ca. 1,2 kg)" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Wacholder, Pfeffer, Lorbeer, Piment" },
    ],
    phases: [
      { label: "Pökeln", kind: "cure", dur: "6–8 Tage", temp: "2–7 °C", text: "Zunge in Pökelmischung oder Lake einlegen, täglich wenden.", bullets: ["Durchgepökelt bleibt sie schön rosa"] },
      { label: "Kochen & Häuten", kind: "cook", dur: "2,5–3 h", temp: "85–90 °C simmern", text: "Zunge weich kochen, heiß die raue Außenhaut abziehen.", bullets: ["Haut löst sich heiß am leichtesten"] },
      { label: "Trocknen", kind: "dry", dur: "2–3 h", temp: "luftig", text: "Abkühlen, Oberfläche antrocknen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "2–3 h", temp: "45–55 °C", text: "Warm räuchern bis goldbraun.", bullets: ["Gekühlt hauchdünn aufschneiden"] },
    ],
    tips: ["Hauchdünn aufgeschnitten als Aufschnitt oder warm mit Meerrettichsoße.", "Beim Kochen Suppengrün und Lorbeer zugeben für Aroma."],
  }),

  r({
    id: "warm-knoblauch-gemuese", name: "Warmgeräucherter Knoblauch & Gemüse", method: "warm", cat: "Gemüse", diff: 1,
    time: "2–4 h", pit: "40–55 °C", core: "", wood: "Buche / Kirsche / Apfel", yield: "beliebig",
    blurb: "Knoblauchknollen, Zwiebeln, Paprika und Tomaten warm geräuchert – tiefes Aroma als Würzbasis für Saucen, Butter und Dips.",
    ingredients: [
      { a: "4–6", i: "ganze Knoblauchknollen (Deckel abgeschnitten)" },
      { a: "2–3", i: "rote Zwiebeln, halbiert" },
      { a: "3–4", i: "Paprika und/oder feste Tomaten" },
      { a: "2 EL", i: "Olivenöl, etwas Meersalz" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "10 min", temp: "—", text: "Knoblauchknollen kappen, Gemüse halbieren, leicht mit Öl und Salz einreiben.", bullets: ["Schnittflächen ölen, damit sie nicht austrocknen"] },
      { label: "Warm räuchern", kind: "smoke", dur: "2–4 h", temp: "40–55 °C", text: "Auf das Gitter legen und warm räuchern bis weich und aromatisch.", bullets: ["Knoblauch wird weich und süßlich", "Kühl genug halten, damit das Gemüse nicht durchgart, sondern Rauch zieht"] },
      { label: "Verarbeiten", kind: "finish", dur: "—", temp: "kühl", text: "Knoblauchzehen herausdrücken, Gemüse häuten und pürieren oder einlegen.", bullets: ["Geräucherte Knoblauchpaste in Öl hält im Kühlschrank 1–2 Wochen"] },
    ],
    tips: ["Geräucherter Knoblauch in Butter eingearbeitet ist eine geniale Steakbutter.", "Geräucherte Tomaten und Paprika ergeben eine rauchige Salsa oder Saucenbasis.", "Mild und vegetarisch – ideal, um Räucheraroma in die ganze Küche zu bringen."],
  }),

  /* ============================ NEUE HEISSRÄUCHERN (Schwein · Rind · Gemüse) ============================ */

  r({
    id: "heiss-krustenbraten", name: "Heißgeräucherter Krustenbraten", method: "heiss", cat: "Schwein", diff: 3,
    time: "1 Tag + 4 h", pit: "130–150 °C → 230 °C Kruste", core: "82–85 °C", wood: "Buche / Apfel", yield: "ca. 1,8 kg",
    blurb: "Schweineschulter mit Schwarte – erst rauchig gegart, dann mit Krachkruste finalisiert.",
    ingredients: [
      { a: "2 kg", i: "Schweineschulter mit Schwarte" },
      { a: "12 g/kg", i: "Salz" },
      { a: "je 1 TL", i: "Kümmel, Knoblauch, Pfeffer, Paprika" },
      { a: "200 ml", i: "dunkles Bier (zum Mopfen)" },
    ],
    phases: [
      { label: "Schwarte rauten & würzen", kind: "prep", dur: "20 min", temp: "—", text: "Schwarte rautenförmig einschneiden, Fleischseite salzen und würzen. Schwarte trocken salzen.", bullets: ["Tief einschneiden, aber nicht ins Fleisch", "Schwarte über Nacht offen kühlen = bessere Kruste"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "2,5–3 h", temp: "130–150 °C", text: "Fleischseite oben räuchern, gelegentlich mit Bier mopfen, bis Kern 80 °C.", bullets: ["Schwarte noch nicht knusprig – das kommt zum Schluss"] },
      { label: "Kruste aufpoppen", kind: "finish", dur: "20–40 min", temp: "220–240 °C", text: "Hitze hochfahren oder unter den Grill, bis die Schwarte aufploppt und kracht.", bullets: ["Gleichmäßig drehen für rundum knusprige Kruste", "Kern bis 82–85 °C"] },
      { label: "Ruhen", kind: "rest", dur: "15 min", temp: "—", text: "Kurz ruhen, dann aufschneiden.", bullets: [] },
    ],
    tips: ["Trockene Schwarte ist der Schlüssel zur Kruste – vorher gründlich abtupfen.", "Klassisch zu Knödel, Kraut und dunkler Biersoße."],
  }),

  r({
    id: "heiss-nackensteaks", name: "Heißgeräucherte Nackensteaks", method: "heiss", cat: "Schwein", diff: 1,
    time: "2–3 h", pit: "120–140 °C", core: "65 °C", wood: "Apfel / Kirsche", yield: "4 Steaks",
    blurb: "Dicke Schweinenackensteaks, saftig durchzogen – rauchig gegart, schnell und gelingsicher.",
    ingredients: [
      { a: "4", i: "Schweinenackensteaks (je ca. 250 g, 3 cm dick)" },
      { a: "3–4 EL", i: "BBQ-Rub (Paprika, Zucker, Knoblauch, Pfeffer, Salz)" },
      { a: "etwas", i: "BBQ-Sauce (optional zum Glasieren)" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "30 min", temp: "kühl", text: "Steaks mit Rub einreiben, kurz ziehen lassen.", bullets: ["Über Nacht würzen vertieft das Aroma"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "1,5–2 h", temp: "120–140 °C", text: "Räuchern bis Kern 63 °C.", bullets: ["Dicker Nacken bleibt durch die Marmorierung saftig"] },
      { label: "Glasieren (optional)", kind: "finish", dur: "15–20 min", temp: "—", text: "Mit BBQ-Sauce bestreichen und kurz angelieren bis Kern 65 °C.", bullets: ["Mehrere dünne Schichten für klebrige Glasur"] },
    ],
    tips: ["Nackensteaks verzeihen viel – ideal für Räuchereinsteiger mit Fleisch.", "Apfel- und Kirschholz passen mild zum Schwein."],
  }),

  r({
    id: "heiss-tri-tip", name: "Heißgeräuchertes Tri-Tip (Bürgermeisterstück)", method: "heiss", cat: "Rind", diff: 2,
    time: "2–3 h", pit: "120 °C → Sear", core: "54 °C (medium-rare)", wood: "Eiche / Kirsche", yield: "ca. 1 kg",
    blurb: "Kalifornischer Klassiker: Bürgermeisterstück rauchig gegart und scharf angegrillt – Reverse Sear vom Feinsten.",
    ingredients: [
      { a: "1,2 kg", i: "Tri-Tip / Bürgermeisterstück, pariert" },
      { a: "je 1 EL", i: "grobes Salz, grober Pfeffer, Knoblauchgranulat (SPG-Rub)" },
    ],
    phases: [
      { label: "Dry Brine & Würzen", kind: "cure", dur: "4–12 h", temp: "Kühlschrank", text: "Mit Salz-Pfeffer-Knoblauch-Rub einreiben, offen kühlen.", bullets: ["SPG ist der klassische Beef-Rub"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "1–1,5 h", temp: "120 °C", text: "Räuchern bis Kern 48 °C.", bullets: ["Eiche gibt das typisch kräftige Beef-Aroma"] },
      { label: "Scharf angrillen", kind: "finish", dur: "4–6 min", temp: "sehr heiß", text: "Über direkter Glut rundum kräftig angrillen bis Kern 54 °C.", bullets: ["Reverse Sear: gleichmäßig rosa mit krosser Kruste"] },
      { label: "Ruhen & Schneiden", kind: "rest", dur: "8 min", temp: "—", text: "Ruhen, dann quer zur Faser dünn aufschneiden.", bullets: ["Faserrichtung wechselt im Stück – beim Schneiden beachten"] },
    ],
    tips: ["Quer zur Faser schneiden ist Pflicht – sonst zäh.", "Reste eignen sich hervorragend für Sandwiches und Tacos."],
  }),

  r({
    id: "heiss-beef-ribs-fast", name: "Heißgeräucherte Beef Ribs (Hot & Fast)", method: "heiss", cat: "Rind", diff: 2,
    time: "4–5 h", pit: "150–160 °C", core: "94–96 °C", wood: "Eiche / Hickory", yield: "1 Leiter",
    blurb: "Fleischige Rinderrippen in unter 5 Stunden – Hot & Fast statt Low & Slow, butterzart und kräftig.",
    ingredients: [
      { a: "1", i: "Beef-Rib-Leiter (Short Ribs, 1,5–2 kg)" },
      { a: "je 1 EL", i: "grobes Salz, grober Pfeffer, Knoblauchgranulat" },
      { a: "etwas", i: "Senf oder Öl als Haftgrund" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Silberhaut entfernen, dünn mit Senf einstreichen, SPG-Rub auftragen.", bullets: ["Silberhaut auf der Knochenseite abziehen"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "3–4 h", temp: "150–160 °C", text: "Räuchern bis kräftige Kruste und Kern Richtung 95 °C.", bullets: ["Bei zu dunkler Kruste in Butcher Paper wickeln"] },
      { label: "Probe & Ruhen", kind: "rest", dur: "20–30 min", temp: "—", text: "Fertig wenn die Sonde wie in Butter gleitet (94–96 °C). Ruhen lassen.", bullets: ["Das Kollagen muss vollständig schmelzen"] },
    ],
    tips: ["Hot & Fast spart Stunden, das Ergebnis bleibt saftig.", "Eiche ist das klassische Texas-Holz für Beef Ribs."],
  }),

  r({
    id: "heiss-chipotle", name: "Heißgeräucherte Jalapeños (Chipotle)", method: "heiss", cat: "Gemüse", diff: 2,
    time: "4–8 h", pit: "70–110 °C", core: "trocken-ledrig", wood: "Pecan / Hickory", yield: "ca. 100 g/kg",
    blurb: "Reife rote Jalapeños langsam heiß geräuchert und getrocknet – die selbstgemachten Chipotle, rauchig und scharf.",
    ingredients: [
      { a: "500 g", i: "reife rote Jalapeños (oder andere fleischige Chilis)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "10 min", temp: "—", text: "Chilis waschen, ganz lassen, Stiele dran lassen. Sehr große längs anritzen.", bullets: ["Reife rote Schoten ergeben das beste Chipotle-Aroma", "Handschuhe tragen"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "4–8 h", temp: "70–90 °C", text: "Lange bei niedriger Hitze räuchern, bis die Schoten faltig, dunkel und trocken-ledrig sind.", bullets: ["Pecan und Hickory geben den typischen Chipotle-Ton", "Bei zu hoher Hitze garen sie statt zu trocknen"] },
      { label: "Nachtrocknen & Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Vollständig durchtrocknen lassen, dann luftdicht lagern oder mahlen.", bullets: ["Gemahlen als Chipotle-Pulver, ganz für Saucen und Adobo"] },
    ],
    tips: ["Klassisch für Chili con Carne, BBQ-Saucen und Chipotle-Mayo.", "Im DA506 bei 65 °C fertigtrocknen, wenn der Smoker zu warm wird.", "Ein paar Schoten in Adobosauce einlegen für den authentischen Mexiko-Geschmack."],
  }),

  /* ============================ NEUE DÖRREN (Schwein · Rind · Gemüse) ============================ */

  r({
    id: "pork-jerky", name: "Pork Jerky (Schweinefleisch)", method: "dorr", cat: "Fleisch & Fisch", diff: 3,
    time: "1 Tag + 5–8 h", pit: "70 °C (Maximum)", core: "Ledrig, kein feuchter Kern", wood: "Graef DA506", yield: "ca. 350 g/kg",
    blurb: "Würzige Schweinefleisch-Streifen – mit Pökelsalz und sicherer Temperaturführung zum gelingsicheren Jerky.",
    ingredients: [
      { a: "1 kg", i: "Schweinelachs / Rückenfilet (sehr mager, pariert)" },
      { a: "3 g/kg", i: "Nitritpökelsalz (NPS, für Sicherheit)" },
      { a: "60 ml", i: "Sojasoße" },
      { a: "2 EL + je 1 TL", i: "Worcestershire, Knoblauch, Pfeffer, brauner Zucker, Paprika" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "leicht angefroren", text: "Fleisch leicht anfrieren, in 4–5 mm dünne Streifen schneiden. Alles sichtbare Fett entfernen.", bullets: ["Fett wird beim Dörren ranzig – komplett entfernen", "Angefroren lässt es sich gleichmäßig schneiden"] },
      { label: "Marinieren", kind: "marinate", dur: "12–24 h", temp: "0–5 °C", text: "Streifen in der Marinade mit NPS wenden und kühl durchziehen lassen.", bullets: ["NPS gibt Sicherheit gegen Keime bei Schwein", "Täglich einmal durchmischen"] },
      { label: "Dörren", kind: "dry", dur: "5–8 h", temp: "70 °C", text: "Abtupfen, einlagig auf Gitter, bei maximaler DA506-Temperatur trocknen.", bullets: ["Schwein immer bei 70 °C dörren – Sicherheit geht vor", "Test: Streifen biegen – bricht ledrig, ohne feuchten Kern"] },
      { label: "Abkühlen & Lagern", kind: "finish", dur: "1 h", temp: "Raumtemperatur", text: "Auf Gitter abkühlen, dann luftdicht verpacken.", bullets: ["Vakuumiert im Kühlschrank 2–4 Wochen haltbar"] },
    ],
    tips: ["Schwein nur mit NPS und bei 70 °C dörren – alternativ vorher 10 min bei 160 °C im Ofen erhitzen.", "Nur hochwertiges, mageres Fleisch aus sicherer Quelle verwenden.", "Mit etwas Chili oder Ahornsirup spannend variieren."],
  }),

  r({
    id: "ground-beef-jerky", name: "Hackfleisch-Jerky (Beef Sticks)", method: "dorr", cat: "Fleisch & Fisch", diff: 2,
    time: "1 Tag + 5–7 h", pit: "70 °C", core: "Ledrig-fest", wood: "Graef DA506", yield: "ca. 400 g/kg",
    blurb: "Aus magerem Rinderhack geformt – gleichmäßig, zart und ohne teure Edelstücke. Die günstige Jerky-Variante.",
    ingredients: [
      { a: "1 kg", i: "mageres Rinderhack (max. 5 % Fett)" },
      { a: "3 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "2 EL + je 1 TL", i: "Sojasoße, Knoblauch, Pfeffer, Paprika, Worcestershire, brauner Zucker" },
    ],
    phases: [
      { label: "Masse anrühren", kind: "prep", dur: "15 min", temp: "kühl", text: "Hack mit NPS und Gewürzen gründlich verkneten, bis die Masse bindet.", bullets: ["Mageres Hack ist Pflicht – Fett verdirbt das Jerky", "Kalt arbeiten"] },
      { label: "Reifen", kind: "cure", dur: "12–24 h", temp: "0–5 °C", text: "Abgedeckt im Kühlschrank durchziehen lassen.", bullets: ["NPS und Würze verteilen sich gleichmäßig"] },
      { label: "Formen", kind: "prep", dur: "20 min", temp: "—", text: "Masse 3–4 mm dünn ausrollen (zwischen Backpapier) und in Streifen schneiden, oder mit Jerky-Presse Sticks formen.", bullets: ["Gleichmäßig dünn = gleichmäßig trocken"] },
      { label: "Dörren", kind: "dry", dur: "5–7 h", temp: "70 °C", text: "Auf Gitter oder Dörrfolie bei 70 °C trocknen bis ledrig-fest.", bullets: ["Zwischendurch das austretende Fett abtupfen", "Test: Stick biegen – fest, kein feuchter Kern"] },
    ],
    tips: ["Hackfleisch-Jerky ist gleichmäßiger und zarter zu kauen als Streifen-Jerky.", "Eine Jerky-Presse oder Spritzbeutel gibt saubere Sticks.", "Nur frisches, sehr mageres Hack vom Metzger verwenden."],
  }),

  r({
    id: "pastinaken-chips", name: "Pastinaken- & Wurzelgemüse-Chips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 90 g/kg",
    blurb: "Pastinake, Petersilienwurzel und Schwarzwurzel als bunte Wurzel-Chips – nussig-süß und knusprig.",
    ingredients: [
      { a: "1 kg", i: "Pastinaken (oder gemischt: Petersilienwurzel, Topinambur)" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Kreuzkümmel oder Rosmarin" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "—", text: "Wurzelgemüse schälen, mit Mandoline in 2–3 mm Scheiben hobeln.", bullets: ["Dünn und gleichmäßig = gleichmäßig knusprig", "In Zitronenwasser legen verhindert Bräunung"] },
      { label: "Würzen & Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Abtupfen, leicht ölen und würzen, einlagig auf Gitter, dörren bis knusprig.", bullets: ["Erst nach dem Abkühlen werden sie wirklich knusprig"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Vollständig auskühlen, sofort luftdicht verpacken.", bullets: ["Nehmen schnell Feuchtigkeit auf"] },
    ],
    tips: ["Eine Mischung verschiedener Wurzeln ergibt eine bunte, aromatische Chips-Auswahl.", "Ohne Frittieröl deutlich kalorienärmer als gebackene Chips."],
  }),

  r({
    id: "auberginen-chips", name: "Auberginenchips", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "55–65 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 60 g/kg",
    blurb: "Würzig-herzhaft und überraschend knusprig – mariniert ein vollwertiger Snack oder veganes Bacon.",
    ingredients: [
      { a: "1 kg", i: "Auberginen" },
      { a: "3 EL + je 1 TL", i: "Olivenöl, Sojasoße, Knoblauch, Paprika, Meersalz" },
    ],
    phases: [
      { label: "Schneiden & Salzen", kind: "prep", dur: "30 min", temp: "—", text: "In 3–4 mm Scheiben schneiden, salzen und 20 min Wasser ziehen lassen, dann abtupfen.", bullets: ["Salzen entzieht Bitterstoffe und Wasser"] },
      { label: "Marinieren", kind: "marinate", dur: "15 min", temp: "—", text: "In Öl-Sojasoße-Marinade wenden.", bullets: ["Für veganes Bacon: Rauchsalz und Ahornsirup zugeben"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "55–65 °C", text: "Einlagig auf Gitter, dörren bis knusprig.", bullets: ["Aubergine schrumpft stark – großzügig belegen"] },
    ],
    tips: ["Mit Rauchsalz mariniert ein verblüffend guter veganer Bacon-Ersatz.", "Sofort luftdicht lagern, sonst werden die Chips zäh."],
  }),

  r({
    id: "zwiebeln-getrocknet", name: "Getrocknete Zwiebeln / Zwiebelpulver", method: "dorr", cat: "Gemüse", diff: 1,
    time: "6–10 h", pit: "50–60 °C", core: "Knusprig-spröde", wood: "Graef DA506", yield: "ca. 100 g/kg",
    blurb: "Selbstgemachte Zwiebelflocken und -pulver – intensiv, ohne Rieselhilfen, ideal für Rubs und Saucen.",
    ingredients: [
      { a: "1 kg", i: "Zwiebeln (gelb oder rot)" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "—", text: "Zwiebeln schälen, in dünne Ringe oder Würfel schneiden (Mandoline empfohlen).", bullets: ["Dünn und gleichmäßig trocknet schneller", "Im Freien oder unter Abzug schneiden"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "50–60 °C", text: "Einlagig auf Gitter, bis spröde und vollständig trocken.", bullets: ["Intensiver Geruch – am besten nicht über Nacht in der Wohnung", "Vollständig trocken, sonst klumpt das Pulver"] },
      { label: "Mahlen & Lagern", kind: "finish", dur: "—", temp: "—", text: "Als Flocken lassen oder zu Pulver mahlen, luftdicht lagern.", bullets: ["Mit Reiskorn im Glas gegen Klumpen"] },
    ],
    tips: ["Zwiebelpulver ist die Basis vieler BBQ-Rubs – frisch gemahlen unschlagbar.", "Geröstete Zwiebeln (vorher kurz anbraten) ergeben ein tieferes Aroma."],
  }),

  r({
    id: "sellerie-getrocknet", name: "Selleriechips & Suppengemüse", method: "dorr", cat: "Gemüse", diff: 1,
    time: "5–9 h", pit: "50–60 °C", core: "Knusprig-trocken", wood: "Graef DA506", yield: "ca. 80 g/kg",
    blurb: "Knollen- und Staudensellerie getrocknet – als Chips, gemahlen als Selleriesalz oder als Vorrat fürs Suppengemüse.",
    ingredients: [
      { a: "1 kg", i: "Knollensellerie oder Staudensellerie" },
      { a: "je 1 TL", i: "Meersalz, Pfeffer (für Chips, optional)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "20 min", temp: "—", text: "Knollensellerie schälen und in 2–3 mm Scheiben hobeln; Stangensellerie in dünne Stücke schneiden.", bullets: ["Dünn schneiden für knusprige Chips"] },
      { label: "Dörren", kind: "dry", dur: "5–9 h", temp: "50–60 °C", text: "Einlagig auf Gitter, dörren bis vollständig trocken.", bullets: ["Niedrige Temperatur erhält das Aroma fürs Suppengemüse"] },
      { label: "Lagern / Mahlen", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Als Stücke fürs Suppengemüse lagern oder mit Salz zu Selleriesalz mahlen.", bullets: ["Getrocknetes Suppengemüse: Sellerie, Karotte, Lauch, Petersilie mischen"] },
    ],
    tips: ["Selbstgemachtes Selleriesalz (mit Meersalz gemahlen) ist ein toller Würzer.", "Getrocknetes Suppengemüse im Glas ist monatelang haltbar und immer griffbereit."],
  }),

  /* ============================ NEUE GRILL – FISCH & MEERESFRÜCHTE ============================ */

  r({
    id: "forelle-grill", name: "Ganze Forelle vom Grill (Fischkorb)", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "30 min + 15–20 min Grillen", pit: "direkt 200–230 °C", core: "60 °C, Flosse löst sich", wood: "Weber Kugelgrill oder Rössle Gasgrill · Fischkorb",
    blurb: "Knusprige Haut, saftiges Fleisch – im Fischkorb gewendet, klebt nichts am Rost.",
    ingredients: [
      { a: "4", i: "Forellen, ausgenommen, geschuppt" },
      { a: "je 1", i: "Zitrone, Bund Petersilie/Dill (in die Bauchhöhle)" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Pfeffer, Knoblauch" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "20 min", temp: "—", text: "Forellen waschen, trocken tupfen, innen und außen salzen. Bauchhöhle mit Zitronenscheiben und Kräutern füllen, Haut dünn ölen.", bullets: ["Trockene Haut wird knuspriger und klebt weniger", "Fischkorb gut einölen"] },
      { label: "Direkt grillen", kind: "direct", dur: "6–8 min/Seite", temp: "200–230 °C", text: "Im geölten Fischkorb über direkter Hitze grillen, einmal wenden.", bullets: ["Nicht zu früh wenden – Haut muss sich vom Korb lösen", "Fertig wenn die Rückenflosse sich leicht ziehen lässt (Kern ~60 °C)"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Mit Zitrone und etwas Olivenöl servieren.", bullets: [] },
    ],
    tips: ["Ohne Fischkorb: Rost penibel ölen und den Fisch erst wenden, wenn er sich von selbst löst.", "Mit Speck umwickelt bleibt die Forelle noch saftiger.", "Saibling und Renke gelingen genauso."],
  }),

  r({
    id: "lachsfilet-grill", name: "Lachsfilet mit Haut vom Grill", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "20 min", pit: "direkt 200–220 °C, Haut zuerst", core: "50–55 °C", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Knusprige Hautseite, glasig-saftiger Kern – der einfachste Weg zu perfektem Grilllachs.",
    ingredients: [
      { a: "4", i: "Lachsfilets mit Haut (je 180 g), entgrätet" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Pfeffer, Zitronenschale" },
      { a: "1", i: "Zitrone (zum Servieren)" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Lachs trocken tupfen, mit Öl, Salz, Pfeffer und Zitronenschale würzen.", bullets: ["Trockene Oberfläche = bessere Kruste"] },
      { label: "Hautseite grillen", kind: "direct", dur: "5–7 min", temp: "200–220 °C", text: "Mit der Haut nach unten auf den geölten Rost legen und den Großteil der Zeit so garen.", bullets: ["Haut nach unten lassen bis sie knusprig ist – nicht zappeln", "Die Haut schützt das Fleisch vor dem Austrocknen"] },
      { label: "Kurz wenden", kind: "direct", dur: "1–2 min", temp: "200–220 °C", text: "Nur kurz auf die Fleischseite drehen, bis Kern 50–55 °C (glasig-saftig).", bullets: ["Nicht über 55 °C – sonst tritt weißes Eiweiß aus und der Lachs wird trocken"] },
    ],
    tips: ["Glasig bei 50 °C, durch bei 60 °C – Geschmackssache.", "Eine Glasur aus Ahornsirup + Sojasoße in den letzten 2 Minuten gibt eine tolle Lackschicht."],
  }),

  r({
    id: "thunfisch-steak-grill", name: "Thunfischsteak mit Sesamkruste", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "30 min marinieren + 5 min Grillen", pit: "direkt 260–300 °C (sehr heiß)", core: "innen rosé (kurz angegrillt)", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Außen kross, innen roh-rosa – Thunfisch wird sehr heiß und nur ganz kurz gegrillt.",
    ingredients: [
      { a: "4", i: "Thunfischsteaks in Sashimi-Qualität (je 200 g, 3 cm dick)" },
      { a: "3 EL + je 1 EL", i: "Sojasoße, Sesamöl, Limette, Ingwer (Marinade)" },
      { a: "4 EL", i: "Sesam (hell + schwarz, zum Wälzen)" },
    ],
    phases: [
      { label: "Marinieren", kind: "marinate", dur: "20–30 min", temp: "kühl", text: "Thunfisch kurz in der Soja-Sesam-Marinade wenden, dann rundum in Sesam wälzen.", bullets: ["Nicht zu lange marinieren – Soja gart den Fisch sonst an", "Sesam gut andrücken"] },
      { label: "Sehr heiß angrillen", kind: "direct", dur: "45–60 Sek/Seite", temp: "260–300 °C", text: "Auf maximaler Hitze nur kurz von allen Seiten angrillen – außen Kruste, innen roh-rosa.", bullets: ["Sashimi-Qualität ist Pflicht, da innen roh", "Sekundengenau arbeiten – durchgegart wird Thunfisch trocken"] },
      { label: "Aufschneiden", kind: "finish", dur: "—", temp: "—", text: "Kurz ruhen, dann quer in Scheiben schneiden – rosa Kern sichtbar.", bullets: ["Mit Wasabi, Sojasoße und eingelegtem Ingwer servieren"] },
    ],
    tips: ["Nur Thunfisch in ausgewiesener Sashimi-/Sushi-Qualität verwenden.", "Schwertfisch und Lachs gelingen so ebenfalls (dann etwas länger garen).", "Achte auf nachhaltigen Fang (z. B. MSC, Angelrute statt Ringwade)."],
  }),

  r({
    id: "dorade-grill", name: "Dorade ganz vom Grill", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "30 min + 20 min Grillen", pit: "direkt → indirekt 200–220 °C", core: "Rückgrat löst sich leicht", wood: "Weber Kugelgrill oder Rössle Gasgrill · Fischkorb",
    blurb: "Mediterraner Klassiker: ganze Dorade (oder Wolfsbarsch) mit Zitrone und Kräutern, knusprig gegrillt.",
    ingredients: [
      { a: "2", i: "Doraden oder Wolfsbarsche (je ca. 400 g), küchenfertig" },
      { a: "je 1", i: "Zitrone, Knoblauchzehen, Bund Rosmarin/Thymian" },
      { a: "3 EL + je 1 TL", i: "Olivenöl, grobes Meersalz, Pfeffer" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Fisch waschen, trocknen, Haut 2–3 mal einschneiden. Innen salzen, mit Zitrone, Knoblauch und Kräutern füllen. Außen ölen und salzen.", bullets: ["Einschnitte garen das dicke Rückenfleisch gleichmäßiger", "Haut gut trocknen für Knusprigkeit"] },
      { label: "Direkt anknuspern", kind: "direct", dur: "3–4 min/Seite", temp: "220 °C", text: "Im Fischkorb über direkter Hitze die Haut anknuspern.", bullets: ["Erst wenden, wenn die Haut sich löst"] },
      { label: "Indirekt fertig garen", kind: "indirect", dur: "8–12 min", temp: "200 °C, Deckel zu", text: "In die indirekte Zone ziehen und mit Deckel fertig garen.", bullets: ["Fertig, wenn sich das Rückgrat leicht löst", "Bei dickeren Fischen entsprechend länger"] },
    ],
    tips: ["In der Salzkruste gebacken (1,5 kg grobes Salz + Eiweiß) wird sie noch saftiger.", "Wolfsbarsch, Goldbrasse und Forelle funktionieren identisch."],
  }),

  r({
    id: "jakobsmuscheln-grill", name: "Jakobsmuscheln vom Grill", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 2,
    time: "15 min", pit: "direkt 240–280 °C (sehr heiß)", core: "gerade undurchsichtig", wood: "Weber Kugelgrill oder Rössle Gasgrill · Plancha/Gusspfanne",
    blurb: "In zwei Minuten fertig: außen karamellige Kruste, innen zart-glasig. Eine elegante Vorspeise.",
    ingredients: [
      { a: "12", i: "große Jakobsmuscheln (ohne Schale, trocken getupft)" },
      { a: "2 EL + je 1 TL", i: "Olivenöl/Butter, Meersalz, Knoblauch, Zitrone" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "10 min", temp: "—", text: "Muscheln sehr gründlich trocken tupfen, leicht ölen und salzen.", bullets: ["Trockene Muscheln karamellisieren – feuchte kochen nur", "Seitlichen Muskelstrang entfernen"] },
      { label: "Sehr heiß angrillen", kind: "direct", dur: "1,5–2 min/Seite", temp: "240–280 °C", text: "Auf der heißen Plancha/Gusspfanne von beiden Seiten goldbraun angrillen.", bullets: ["Nicht bewegen, bis sich eine Kruste bildet", "Innen gerade undurchsichtig – nicht übergaren, sonst gummiartig"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Mit Knoblauchbutter und Zitrone beträufeln.", bullets: ["Auf Erbsenpüree oder mit Speckchips servieren"] },
    ],
    tips: ["Eine Gusseisenpfanne oder Plancha hält die Hitze besser als der nackte Rost.", "Der Seitenkocher des Rössle eignet sich hervorragend für die Pfanne.", "Garnelen und Tintenfischtuben gelingen genauso schnell."],
  }),

  r({
    id: "schwertfisch-spieß", name: "Schwertfisch-Spieße (Espetada)", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "30 min marinieren + 10 min Grillen", pit: "direkt 220–250 °C", core: "saftig, gerade durch", wood: "Weber Kugelgrill oder Rössle Gasgrill · Spieße",
    blurb: "Fester Schwertfisch bleibt am Spieß perfekt in Form – mediterran mariniert, schnell gegrillt.",
    ingredients: [
      { a: "800 g", i: "Schwertfisch (oder Thunfisch/Seeteufel), in 3-cm-Würfeln" },
      { a: "1", i: "Zitrone, 1 Zucchini, 1 rote Zwiebel, Cherrytomaten" },
      { a: "4 EL + je 1 TL", i: "Olivenöl, Knoblauch, Oregano, Paprika, Meersalz (Marinade)" },
    ],
    phases: [
      { label: "Marinieren", kind: "marinate", dur: "30 min", temp: "kühl", text: "Fischwürfel in der Kräutermarinade wenden.", bullets: ["Fester Fisch wie Schwertfisch oder Seeteufel fällt nicht auseinander", "Nicht zu lange in Zitrone – sonst wird der Fisch mürbe"] },
      { label: "Spieße stecken", kind: "prep", dur: "10 min", temp: "—", text: "Fisch abwechselnd mit Zucchini, Zwiebel und Tomaten auf Spieße stecken.", bullets: ["Metallspieße oder gewässerte Holzspieße verwenden"] },
      { label: "Direkt grillen", kind: "direct", dur: "8–10 min", temp: "220–250 °C", text: "Über direkter Hitze rundum grillen, dabei einige Male drehen.", bullets: ["Fertig, sobald der Fisch gerade durch und saftig ist – nicht übergaren"] },
    ],
    tips: ["Auf Madeira heißt das Espetada – traditionell am Lorbeerast gegrillt.", "Mit Limette und einem Joghurt-Knoblauch-Dip servieren.", "Festes Fischfleisch ist Pflicht – Lachs und Kabeljau zerfallen am Spieß."],
  }),

  /* ============================ NEUE GRILL – SEITENKOCHER (Gemüse) ============================ */

  r({
    id: "sideburner-padron", name: "Blistered Padrón-Paprika (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "10 min", pit: "Seitenkocher – Gusspfanne, volle Hitze", core: "—", wood: "Rössle Gasgrill · Seitenkocher + Gusseisenpfanne",
    blurb: "In Minuten fertig: Padrón- oder Spitzpaprika in der glühend heißen Pfanne, Blasen werfend, mit grobem Salz. Tapas-Klassiker.",
    ingredients: [
      { a: "300 g", i: "Padrón- oder Pimientos-de-Padrón-Paprika (ganz)" },
      { a: "2 EL", i: "Olivenöl" },
      { a: "nach Geschmack", i: "grobes Meersalz (Fleur de Sel)" },
    ],
    phases: [
      { label: "Pfanne aufheizen", kind: "prep", dur: "3 min", temp: "Seitenkocher voll", text: "Gusseisenpfanne auf dem Seitenkocher richtig heiß werden lassen, dann Öl hinein.", bullets: ["Der Seitenkocher liefert konzentrierte Hitze – ideal für die Pfanne", "Hält den Hauptgrill für anderes frei"] },
      { label: "Braten", kind: "direct", dur: "4–6 min", temp: "volle Hitze", text: "Paprika ganz hineingeben und unter Schwenken braten, bis sie Blasen werfen und dunkle Flecken bekommen.", bullets: ["Haut soll blistern (Blasen) und teils schwarz werden", "Schwenken, damit nichts verbrennt"] },
      { label: "Salzen & Servieren", kind: "finish", dur: "—", temp: "—", text: "Sofort mit grobem Meersalz bestreuen und heiß servieren.", bullets: ["Klassische Tapas-Warnung: jede zehnte Schote ist scharf"] },
    ],
    tips: ["Der Seitenkocher ist perfekt für solche Pfannengerichte – starke, regelbare Hitze ohne Umbau des Hauptgrills.", "Genauso gut: Shishito-Paprika, grüner Spargel oder Pilze.", "Ein Spritzer Zitrone und etwas Knoblauch heben es zusätzlich."],
  }),

  r({
    id: "sideburner-zwiebeln", name: "Balsamico-Schmorzwiebeln (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "35–45 min", pit: "Seitenkocher – kleine bis mittlere Flamme", core: "weich, sirupartig", wood: "Rössle Gasgrill · Seitenkocher + Gusstopf",
    blurb: "Langsam weich geschmorte Zwiebeln mit Balsamico – die perfekte Beilage zu Steak und Burger, ohne den Grill zu blockieren.",
    ingredients: [
      { a: "1 kg", i: "Zwiebeln (rot und gelb), in dünne Ringe geschnitten" },
      { a: "3 EL", i: "Butter oder Olivenöl" },
      { a: "3 EL + 1 TL", i: "Balsamico, brauner Zucker, Thymian, Salz" },
    ],
    phases: [
      { label: "Anschwitzen", kind: "prep", dur: "10 min", temp: "mittlere Flamme", text: "Zwiebeln im Gusstopf auf dem Seitenkocher mit Butter und einer Prise Salz anschwitzen.", bullets: ["Großzügig Volumen – Zwiebeln fallen stark zusammen"] },
      { label: "Schmoren", kind: "cook", dur: "20–30 min", temp: "kleine Flamme", text: "Bei niedriger Hitze langsam weichschmoren, gelegentlich rühren, bis goldbraun und süß.", bullets: ["Geduld – langsames Schmoren macht die Süße", "Der Seitenkocher hält die Temperatur konstant, während der Hauptgrill das Fleisch macht"] },
      { label: "Ablöschen & Einkochen", kind: "finish", dur: "5 min", temp: "—", text: "Mit Balsamico und Zucker ablöschen, sirupartig einkochen, mit Thymian abschmecken.", bullets: ["Bis fast die ganze Flüssigkeit verdampft ist"] },
    ],
    tips: ["Hält im Glas im Kühlschrank 1–2 Wochen – ein tolles Zwiebel-Chutney.", "Auf Burger, zu Käse, Bratwurst oder Steak.", "Genauso auf dem Seitenkocher: Pilzpfanne, Chili-Con-Carne oder eine BBQ-Sauce einkochen."],
  }),

  /* ============================ NEUE GRILL – SEITENKOCHER (mehr) ============================ */

  r({
    id: "sideburner-pilze", name: "Knoblauch-Kräuter-Pilzpfanne (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "15 min", pit: "Seitenkocher – Gusspfanne, hohe Hitze", core: "—", wood: "Rössle Gasgrill · Seitenkocher + Gusseisenpfanne",
    blurb: "Goldbraun gebratene Pilze mit Knoblauch, Butter und Petersilie – die ideale Steak-Beilage, in 15 Minuten fertig.",
    ingredients: [
      { a: "500 g", i: "gemischte Pilze (Champignons, Kräuterseitlinge, Shiitake)" },
      { a: "3 EL + 1 EL", i: "Butter, Olivenöl" },
      { a: "je 2 + nach Geschmack", i: "Knoblauchzehen, Petersilie, Thymian, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "5 min", temp: "—", text: "Pilze putzen (nicht waschen), größere halbieren oder in Scheiben schneiden.", bullets: ["Trockene Pilze bräunen – gewaschene kochen nur im eigenen Saft"] },
      { label: "Scharf anbraten", kind: "direct", dur: "6–8 min", temp: "hohe Hitze", text: "Pfanne auf dem Seitenkocher heiß werden lassen, Öl hinein, Pilze in einer Lage anbraten ohne zu rühren, bis sie Farbe nehmen.", bullets: ["Pfanne nicht überladen – sonst dünsten die Pilze", "Erst wenn sie braun sind, wenden"] },
      { label: "Aromatisieren", kind: "finish", dur: "2 min", temp: "—", text: "Butter, Knoblauch und Thymian zugeben, schwenken, mit Salz, Pfeffer und Petersilie abschmecken.", bullets: ["Knoblauch erst am Ende – verbrennt sonst"] },
    ],
    tips: ["Der Seitenkocher liefert die starke Hitze, die Pilze zum Bräunen brauchen – ohne den Grill zu belegen.", "Ein Schuss Sahne macht daraus eine Rahm-Pilz-Sauce.", "Auch genial: über Steak, in Burger oder auf geröstetem Brot."],
  }),

  r({
    id: "sideburner-spargel", name: "Gebratener grüner Spargel mit Parmesan (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "12 min", pit: "Seitenkocher – Gusspfanne, mittlere bis hohe Hitze", core: "bissfest", wood: "Rössle Gasgrill · Seitenkocher + Gusseisenpfanne",
    blurb: "Grüner Spargel mit Röstaromen, Zitrone und Parmesan – schnell, frisch und unkompliziert.",
    ingredients: [
      { a: "500 g", i: "grüner Spargel (holzige Enden entfernt)" },
      { a: "2 EL + je 1 TL", i: "Olivenöl, Meersalz, Pfeffer, Zitronenschale" },
      { a: "30 g + ½", i: "Parmesan (gehobelt), Zitrone (Saft)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "3 min", temp: "—", text: "Holzige Enden abbrechen, Spargel waschen und trocknen.", bullets: ["Dicke Stangen unten leicht schälen"] },
      { label: "Braten", kind: "direct", dur: "6–8 min", temp: "mittlere bis hohe Hitze", text: "In der heißen Pfanne mit Öl rundum bräunen, gelegentlich wenden, bis bissfest mit Röststellen.", bullets: ["Nicht weichkochen – grüner Spargel soll Biss behalten"] },
      { label: "Vollenden", kind: "finish", dur: "1 min", temp: "—", text: "Mit Salz, Pfeffer, Zitronensaft und -schale würzen, Parmesan darüberhobeln.", bullets: [] },
    ],
    tips: ["Der Seitenkocher ist perfekt, wenn der Hauptgrill schon mit Fleisch belegt ist.", "Mit Speck umwickelt vor dem Braten wird es noch herzhafter.", "Brokkoli, Pak Choi und Bohnen gelingen genauso."],
  }),

  r({
    id: "sideburner-bohnen", name: "Geschmorte Speck-Bohnen (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "30 min", pit: "Seitenkocher – Gusstopf, kleine bis mittlere Flamme", core: "weich", wood: "Rössle Gasgrill · Seitenkocher + Gusstopf",
    blurb: "Grüne Bohnen langsam mit Speck und Zwiebeln geschmort – deftige Beilage, die nebenher fertig wird.",
    ingredients: [
      { a: "750 g", i: "grüne Bohnen, geputzt" },
      { a: "150 g", i: "Speckwürfel" },
      { a: "1 + 2", i: "Zwiebel, Knoblauchzehen" },
      { a: "200 ml + je 1 TL", i: "Brühe, Bohnenkraut, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Speck auslassen", kind: "prep", dur: "5 min", temp: "mittlere Flamme", text: "Speck im Gusstopf auf dem Seitenkocher knusprig auslassen, Zwiebel und Knoblauch zugeben.", bullets: [] },
      { label: "Schmoren", kind: "cook", dur: "20–25 min", temp: "kleine Flamme", text: "Bohnen und Bohnenkraut zugeben, mit Brühe ablöschen, zugedeckt weichschmoren.", bullets: ["Der Seitenkocher hält die niedrige Schmortemperatur konstant", "Bei Bedarf etwas Brühe nachgießen"] },
      { label: "Abschmecken", kind: "finish", dur: "2 min", temp: "—", text: "Mit Salz und Pfeffer abschmecken.", bullets: [] },
    ],
    tips: ["Klassische Beilage zu Lamm, Steak und Bratwurst.", "Ohne Speck mit Räuchertofu oder Rauchsalz ebenso lecker.", "Mit Tomaten und Hackfleisch wird ein vollwertiger Eintopf daraus."],
  }),

  r({
    id: "sideburner-gambas", name: "Gambas al Ajillo (Seitenkocher)", method: "grill", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "15 min", pit: "Seitenkocher – Gusspfanne, mittlere Hitze", core: "opal-rosa", wood: "Rössle Gasgrill · Seitenkocher + Gusspfanne/Cazuela",
    blurb: "Garnelen im sprudelnden Knoblauch-Chili-Öl – der spanische Tapas-Klassiker, wie gemacht für den Seitenkocher.",
    ingredients: [
      { a: "500 g", i: "Garnelen, geschält, entdarmt" },
      { a: "100 ml", i: "Olivenöl" },
      { a: "5 + 1–2", i: "Knoblauchzehen (in Scheiben), getrocknete Chili" },
      { a: "je nach Geschmack", i: "Meersalz, Petersilie, etwas Zitrone, Brot zum Tunken" },
    ],
    phases: [
      { label: "Öl aromatisieren", kind: "prep", dur: "4 min", temp: "mittlere Hitze", text: "Olivenöl mit Knoblauchscheiben und Chili in der Pfanne langsam erhitzen, bis es duftet und leicht sprudelt.", bullets: ["Knoblauch darf nicht braun werden – sonst bitter", "Mittlere Hitze – das Öl soll nur sanft blubbern"] },
      { label: "Garnelen garen", kind: "direct", dur: "3–4 min", temp: "mittlere Hitze", text: "Garnelen ins heiße Öl geben und garen, bis sie sich kringeln und opal-rosa sind.", bullets: ["Nicht übergaren – Garnelen werden sonst gummiartig"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Salzen, mit Petersilie und Zitrone, brutzelnd heiß servieren – Brot ins Öl tunken.", bullets: ["Traditionell direkt in der Tonschale (Cazuela) auf den Tisch"] },
    ],
    tips: ["Der Seitenkocher ist ideal für so ein schnelles Pfannengericht direkt am Grillplatz.", "Mit Tintenfischtuben oder Champignons (vegetarisch) genauso gut.", "Das aromatisierte Öl ist halb so gut wie die Garnelen – reichlich Brot bereithalten."],
  }),

  r({
    id: "sideburner-shakshuka", name: "Shakshuka (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "30 min", pit: "Seitenkocher – Gusspfanne, mittlere Flamme", core: "Eiweiß gestockt, Dotter wachsweich", wood: "Rössle Gasgrill · Seitenkocher + Gusspfanne",
    blurb: "Pochierte Eier in würzigem Paprika-Tomaten-Sugo – herzhaftes Pfannengericht für jede Tageszeit, direkt am Grill.",
    ingredients: [
      { a: "4–5", i: "Eier" },
      { a: "2 + 1 + 2", i: "Paprika, Zwiebel, Knoblauchzehen" },
      { a: "800 g", i: "stückige Tomaten (Dose)" },
      { a: "je 1 TL", i: "Kreuzkümmel, Paprika edelsüß, Chili, Salz, Zucker" },
    ],
    phases: [
      { label: "Sugo ansetzen", kind: "prep", dur: "10 min", temp: "mittlere Flamme", text: "Zwiebel, Paprika und Knoblauch in der Pfanne anschwitzen, Gewürze zugeben, mit Tomaten auffüllen.", bullets: ["Gewürze kurz mitrösten = mehr Aroma"] },
      { label: "Einkochen", kind: "cook", dur: "12–15 min", temp: "kleine Flamme", text: "Sugo sämig einkochen lassen, abschmecken.", bullets: ["Der Seitenkocher hält die ruhige Köcheltemperatur"] },
      { label: "Eier pochieren", kind: "finish", dur: "6–8 min", temp: "kleine Flamme", text: "Mulden ins Sugo drücken, Eier hineingleiten lassen, zugedeckt stocken lassen, bis das Eiweiß fest und der Dotter wachsweich ist.", bullets: ["Deckel hält die Hitze für gleichmäßig gestockte Eier"] },
    ],
    tips: ["Mit Feta, frischer Petersilie und Fladenbrot servieren.", "Der Seitenkocher macht Shakshuka zum perfekten Grill-Frühstück.", "Mit Merguez oder Chorizo wird es deftiger."],
  }),

  r({
    id: "sideburner-bratkartoffeln", name: "Bratkartoffeln aus Gusseisen (Seitenkocher)", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "30 min", pit: "Seitenkocher – Gusspfanne, mittlere bis hohe Hitze", core: "außen kross, innen weich", wood: "Rössle Gasgrill · Seitenkocher + Gusseisenpfanne",
    blurb: "Knusprige Bratkartoffeln mit Zwiebeln und Speck – die Beilage, die jeden Grillteller komplett macht.",
    ingredients: [
      { a: "1 kg", i: "festkochende Kartoffeln (vorgekocht, ausgekühlt)" },
      { a: "100 g + 1", i: "Speckwürfel, Zwiebel" },
      { a: "3 EL + je 1 TL", i: "Butterschmalz, Salz, Pfeffer, Kümmel, Petersilie" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "5 min", temp: "—", text: "Vorgekochte, ausgekühlte Kartoffeln in Scheiben schneiden.", bullets: ["Am Vortag gekocht = beste Kruste", "Kalte Kartoffeln zerfallen nicht"] },
      { label: "Knusprig braten", kind: "direct", dur: "15–18 min", temp: "mittlere bis hohe Hitze", text: "In reichlich heißem Butterschmalz in einer Lage braten, erst wenden, wenn die Unterseite goldbraun ist.", bullets: ["Geduld – zu frühes Wenden verhindert die Kruste", "Pfanne nicht überladen"] },
      { label: "Speck & Zwiebel", kind: "finish", dur: "5 min", temp: "—", text: "Speck und Zwiebel zugeben, mitbraten, mit Salz, Pfeffer, Kümmel und Petersilie abschmecken.", bullets: [] },
    ],
    tips: ["Die Gusseisenpfanne auf dem Seitenkocher hält die Hitze konstant für gleichmäßige Bräune.", "Ein gebratenes Spiegelei obendrauf macht es zur Mahlzeit.", "Reste vom Vortag werden so am besten verwertet."],
  }),

  r({
    id: "sideburner-bbq-sauce", name: "Hausgemachte BBQ-Sauce einkochen (Seitenkocher)", method: "grill", cat: "Sonstiges", diff: 1,
    time: "40 min", pit: "Seitenkocher – Topf, kleine Flamme", core: "sirupartig", wood: "Rössle Gasgrill · Seitenkocher + Topf",
    blurb: "Eine kräftige, rauchig-süße BBQ-Sauce langsam einkochen – während das Fleisch auf dem Grill liegt.",
    ingredients: [
      { a: "400 g", i: "passierte Tomaten (oder Ketchup als Basis)" },
      { a: "je 3 EL", i: "brauner Zucker, Apfelessig, Worcestershire" },
      { a: "je 1–2 TL", i: "geräuchertes Paprikapulver, Senf, Knoblauch, Zwiebelpulver, Chili, Salz" },
      { a: "2 EL", i: "Melasse oder Ahornsirup (optional)" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Alle Zutaten im Topf verrühren.", bullets: ["Geräuchertes Paprikapulver gibt den Rauchton ohne Smoker"] },
      { label: "Einkochen", kind: "cook", dur: "25–35 min", temp: "kleine Flamme", text: "Auf dem Seitenkocher bei niedriger Hitze köcheln, gelegentlich rühren, bis sämig-sirupartig.", bullets: ["Niedrige, konstante Hitze verhindert Anbrennen", "Spritzt – Topf nur halb füllen, Deckel schräg auflegen"] },
      { label: "Abschmecken & Lagern", kind: "finish", dur: "—", temp: "—", text: "Mit Salz, Säure und Schärfe ausbalancieren. Heiß in ein sauberes Glas füllen.", bullets: ["Im Kühlschrank 2–3 Wochen haltbar"] },
    ],
    tips: ["Direkt am Grill frisch eingekocht schmeckt sie unvergleichlich besser als gekaufte.", "Als Mop in den letzten 20 Minuten aufs Fleisch pinseln oder als Dip servieren.", "Mit Bourbon, Kaffee oder Pfirsich spannend variieren."],
  }),

  /* ============================ QUERBEET – 35 GEMISCHTE REZEPTE ============================ */

  /* ---- KALTRÄUCHERN ---- */
  r({
    id: "fruehstuecksspeck", name: "Frühstücksspeck (Bacon)", method: "kalt", cat: "Schinken", diff: 2,
    time: "1 Woche + Räuchern", pit: "15–22 °C", core: "", wood: "Buche / Hickory", yield: "ca. 1,2 kg",
    blurb: "Selbstgemachter Bacon aus dem Schweinebauch – gepökelt und kalt geräuchert, dünn aufgeschnitten und kross gebraten.",
    ingredients: [
      { a: "1,5 kg", i: "Schweinebauch ohne Knochen, ohne Schwarte" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "15 g/kg", i: "brauner Zucker" },
      { a: "je 1 TL", i: "Pfeffer, Knoblauch, Lorbeer, Paprika" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "7 Tage", temp: "2–7 °C", text: "Bauch einreiben, vakuumieren, täglich wenden.", bullets: ["Zucker macht den Bacon typisch süßlich"] },
      { label: "Durchbrennen & Trocknen", kind: "rest", dur: "2–3 Tage", temp: "2–7 °C / luftig", text: "Abspülen, trocknen, bis Pellicle entsteht.", bullets: [] },
      { label: "Kalt räuchern", kind: "smoke", dur: "8 h · 3–4 Gänge", temp: "unter 25 °C", text: "In Gängen kalt räuchern, dazwischen auslüften.", bullets: ["Hickory gibt das amerikanische Aroma"] },
    ],
    tips: ["Vor dem Aufschneiden gut durchkühlen – dann lässt er sich hauchdünn schneiden.", "Roh und muss vor dem Verzehr gebraten werden."],
  }),
  r({
    id: "katenschinken", name: "Katenschinken (norddeutsch)", method: "kalt", cat: "Schinken", diff: 2,
    time: "4–6 Wochen", pit: "15–20 °C", core: "", wood: "Buche + Wacholder", yield: "ca. 1,5 kg",
    blurb: "Kräftig geräucherter norddeutscher Knochenschinken – herzhaft, rauchig, traditionell über Buchenholz und Wacholder.",
    ingredients: [
      { a: "2 kg", i: "Schweinekeule oder -schulter, ausgelöst" },
      { a: "40 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "5 g/kg", i: "brauner Zucker" },
      { a: "je 1 TL", i: "Wacholder, Pfeffer, Knoblauch, Lorbeer" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "12–16 Tage", temp: "2–7 °C", text: "Fleisch einreiben, vakuumieren, täglich wenden.", bullets: ["1 Tag je cm + Reserve"] },
      { label: "Durchbrennen", kind: "rest", dur: "5–7 Tage", temp: "2–7 °C", text: "Abspülen, trocknen, ohne Salz ruhen.", bullets: [] },
      { label: "Abhängen", kind: "dry", dur: "2–3 Tage", temp: "12–15 °C", text: "Bis Pellicle entsteht.", bullets: [] },
      { label: "Räuchergänge", kind: "smoke", dur: "8–10 h · 5–6 Gänge", temp: "unter 22 °C", text: "Kräftig kalt räuchern mit Buche und Wacholder, dazwischen auslüften.", bullets: ["Mehr Gänge = kräftigeres Räucheraroma"] },
      { label: "Reifen", kind: "mature", dur: "2–3 Wochen", temp: "12–15 °C", text: "Nachreifen bis schnittfest.", bullets: [] },
    ],
    tips: ["Kräftiger und rauchiger als Schwarzwälder – der norddeutsche Klassiker.", "Wacholder gibt den typisch herben Ton."],
  }),
  r({
    id: "cabanossi", name: "Cabanossi (Schinkenkrakauer)", method: "kalt", cat: "Wurst", diff: 3,
    time: "2–3 Wochen", pit: "15–20 °C", core: "", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Dünne, würzige Schnittwurst für den Snack – geräuchert und luftgetrocknet.",
    ingredients: [
      { a: "1 kg", i: "Schweinefleisch (mager)" },
      { a: "0,5 kg", i: "Rückenspeck" },
      { a: "28 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Pfeffer, Knoblauch, Paprika, Senfkörner, Starterkultur" },
      { a: "1", i: "Schafsaitling Kaliber 22/24" },
    ],
    phases: [
      { label: "Wolfen & Würzen", kind: "prep", dur: "1 h", temp: "unter 2 °C", text: "Eiskalt wolfen, würzen, kneten.", bullets: [] },
      { label: "Füllen", kind: "prep", dur: "30 min", temp: "kühl", text: "Stramm in dünne Saitlinge füllen, abdrehen.", bullets: [] },
      { label: "Umröten", kind: "rest", dur: "1 Tag", temp: "20–24 °C", text: "Warm anreifen.", bullets: [] },
      { label: "Räuchergänge", kind: "smoke", dur: "4–6 h · 2–3 Gänge", temp: "unter 22 °C", text: "Kalt räuchern.", bullets: [] },
      { label: "Trocknen", kind: "mature", dur: "1–2 Wochen", temp: "14–16 °C", text: "Bis schnittfest trocknen.", bullets: [] },
    ],
    tips: ["Dünner Saitling = schnelle Reife und typischer Biss.", "Perfekt als Snack oder auf der Brotzeit."],
  }),
  r({
    id: "geraeucherter-tofu-kalt", name: "Kalt geräucherter Tofu", method: "kalt", cat: "Käse", diff: 1,
    time: "1 Tag + Räuchern", pit: "unter 25 °C", core: "", wood: "Buche / Kirsche", yield: "beliebig",
    blurb: "Fester Tofu mariniert und kalt geräuchert – herzhaft, vielseitig, vegan.",
    ingredients: [
      { a: "400 g", i: "fester Tofu (gut gepresst)" },
      { a: "4 EL + je 1 TL", i: "Sojasoße, Rauchsalz, Knoblauch, Paprika (Marinade)" },
    ],
    phases: [
      { label: "Pressen & Marinieren", kind: "marinate", dur: "4–12 h", temp: "Kühlschrank", text: "Tofu gut pressen, in der Marinade ziehen lassen.", bullets: ["Je trockener der Tofu, desto besser nimmt er Rauch an"] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "luftig", text: "Oberfläche antrocknen.", bullets: [] },
      { label: "Kalt räuchern", kind: "smoke", dur: "2–4 h · 2 Gänge", temp: "unter 25 °C", text: "Kalt räuchern bis goldbraun.", bullets: [] },
    ],
    tips: ["In Würfeln gebraten, in Salaten, Bowls oder als Aufschnitt.", "Vakuumiert hält er im Kühlschrank über eine Woche."],
  }),
  r({
    id: "geraeuchertes-salz", name: "Geräuchertes Salz", method: "kalt", cat: "Grundlagen", diff: 1,
    time: "6–10 h Räuchern", pit: "unter 25 °C", core: "", wood: "Buche / Hickory / Kirsche", yield: "beliebig",
    blurb: "Grobes Meersalz kalt geräuchert – ein intensiver Würzer, der jedem Gericht Rauchnote gibt.",
    ingredients: [
      { a: "500 g", i: "grobes Meersalz (Flockensalz oder grobes Steinsalz)" },
    ],
    phases: [
      { label: "Dünn ausbreiten", kind: "prep", dur: "5 min", temp: "—", text: "Salz dünn auf eine Schale oder feines Gitter (mit Backpapier) verteilen.", bullets: ["Dünne Schicht = gleichmäßige Rauchaufnahme"] },
      { label: "Kalt räuchern", kind: "smoke", dur: "6–10 h", temp: "unter 25 °C", text: "Lange kalt räuchern, zwischendurch umrühren.", bullets: ["Je länger, desto intensiver", "Mehrere Gänge an verschiedenen Tagen verstärken das Aroma"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "trocken", text: "Trocknen lassen, luftdicht im Glas lagern.", bullets: [] },
    ],
    tips: ["Über Steak, Eier, Pommes oder in Rubs – verleiht überall Rauchnote ohne Smoker.", "Auch mit Zucker, Paprikapulver oder Pfeffer machbar."],
  }),

  /* ---- WARMRÄUCHERN ---- */
  r({
    id: "warm-bratwurst", name: "Geräucherte Bratwurst", method: "warm", cat: "Wurst", diff: 2,
    time: "Herstellung + 2–3 h", pit: "45–60 °C", core: "68–72 °C", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Grobe Bratwurst warm geräuchert – aromatisch, haltbarer und mit feinem Rauchton.",
    ingredients: [
      { a: "1,2 kg", i: "Schweineschulter" },
      { a: "300 g", i: "Rückenspeck" },
      { a: "26 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Majoran, Muskat, Pfeffer, Knoblauch" },
      { a: "1", i: "Schweinedarm Kaliber 28/30" },
    ],
    phases: [
      { label: "Wolfen & Brät", kind: "prep", dur: "45 min", temp: "unter 4 °C", text: "Kalt wolfen, würzen, mit etwas Eiswasser zu bindigem Brät kneten.", bullets: ["Alles kalt halten für saubere Bindung"] },
      { label: "Füllen", kind: "prep", dur: "30 min", temp: "kühl", text: "In Därme füllen, abdrehen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "luftig", text: "Oberfläche antrocknen.", bullets: [] },
      { label: "Warm räuchern & Garen", kind: "smoke", dur: "2–3 h", temp: "45–60 °C", text: "Warm räuchern, am Ende kurz auf 70 °C Kern bringen.", bullets: ["Optional in 72 °C Wasser fertig brühen"] },
    ],
    tips: ["Geräuchert hält sich die Wurst deutlich länger als frische Bratwurst.", "Vor dem Servieren kurz auf dem Grill aufwärmen."],
  }),
  r({
    id: "warm-fleischwurst", name: "Geräucherte Fleischwurst (Lyoner)", method: "warm", cat: "Wurst", diff: 3,
    time: "Herstellung + 2 h", pit: "45–55 °C → 75 °C brühen", core: "72 °C", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Feine Brühwurst im Kranz – warm geräuchert und gebrüht, klassisch zum Aufschnitt.",
    ingredients: [
      { a: "1 kg", i: "Schweinefleisch (mager)" },
      { a: "0,5 kg", i: "Rückenspeck / fettes Schweinefleisch" },
      { a: "0,3 l", i: "Eiswasser / Crushed Ice" },
      { a: "26 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Muskat, Koriander, Pfeffer (weiß), Knoblauch" },
      { a: "1", i: "Kranzdarm Kaliber 40+" },
    ],
    phases: [
      { label: "Feines Brät", kind: "prep", dur: "30 min", temp: "unter 8 °C (Kutter)", text: "Im Kutter mit Eis zu feinem, bindigem Brät verarbeiten.", bullets: ["Temperatur unter 12 °C halten – sonst bricht die Emulsion"] },
      { label: "Füllen", kind: "prep", dur: "20 min", temp: "kühl", text: "Stramm in Kranzdärme füllen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "45–60 min", temp: "45–55 °C", text: "Warm räuchern für Farbe und Aroma.", bullets: [] },
      { label: "Brühen", kind: "cook", dur: "30–40 min", temp: "Wasser 75 °C", text: "Bei 75 °C (nicht kochen) bis Kern 72 °C brühen, kalt abschrecken.", bullets: ["Abschrecken = knackige Konsistenz"] },
    ],
    tips: ["Kuttern ergibt die feine Textur – mit dem Fleischwolf nur grob möglich.", "Frisch gebrüht und kalt aufgeschnitten am besten."],
  }),
  r({
    id: "warm-leberkaese", name: "Geräucherter Leberkäse", method: "warm", cat: "Wurst", diff: 2,
    time: "Herstellung + Backen", pit: "Räuchern 50 °C + Backen 160 °C", core: "75 °C", wood: "Buche", yield: "1 Laib (ca. 1 kg)",
    blurb: "Bayerischer Leberkäse mit Rauchnote – erst warm angeräuchert, dann im Kasten gebacken.",
    ingredients: [
      { a: "600 g", i: "Schweinefleisch (mager)" },
      { a: "300 g", i: "Rückenspeck" },
      { a: "100 g + Eis", i: "Zwiebel, Crushed Ice" },
      { a: "26 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Majoran, Muskat, Pfeffer, Knoblauch" },
    ],
    phases: [
      { label: "Brät herstellen", kind: "prep", dur: "30 min", temp: "kalt", text: "Fein kuttern/wolfen, mit Eis zu glattem Brät verarbeiten.", bullets: [] },
      { label: "Warm anräuchern", kind: "smoke", dur: "30–45 min", temp: "ca. 50 °C", text: "Masse im Kasten kurz warm anräuchern für Rauchton.", bullets: ["Optional: Brät vorher räuchern, dann backen"] },
      { label: "Backen", kind: "cook", dur: "50–60 min", temp: "Ofen 160–170 °C", text: "Im Kasten backen bis Kern 75 °C und die Kruste braun ist.", bullets: ["Oberfläche vor dem Backen rauten für die typische Kruste"] },
    ],
    tips: ["Heiß in der Semmel mit süßem Senf – der Klassiker.", "Reste kalt gebraten als 'Leberkäse-Steak'."],
  }),
  r({
    id: "warm-raeuchertofu", name: "Warm geräucherter Räuchertofu", method: "warm", cat: "Käse", diff: 1,
    time: "4 h + Räuchern", pit: "35–45 °C", core: "", wood: "Buche / Erle", yield: "beliebig",
    blurb: "Tofu mariniert und warm geräuchert – festere, herzhaftere Textur als die kalte Variante.",
    ingredients: [
      { a: "400 g", i: "Räuchertofu oder fester Naturtofu (gepresst)" },
      { a: "4 EL + je 1 TL", i: "Sojasoße, Sesamöl, Knoblauch, Paprika, Ahornsirup" },
    ],
    phases: [
      { label: "Marinieren", kind: "marinate", dur: "2–4 h", temp: "Kühlschrank", text: "Tofu in Scheiben in der Marinade ziehen lassen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "1 h", temp: "luftig", text: "Antrocknen lassen.", bullets: [] },
      { label: "Warm räuchern", kind: "smoke", dur: "1–2 h", temp: "35–45 °C", text: "Warm räuchern bis fest und aromatisch.", bullets: ["Wird fester und 'fleischiger' als kalt geräuchert"] },
    ],
    tips: ["Top für Wraps, Bowls oder gebraten als Steak-Ersatz.", "Mit Teriyaki-Marinade asiatisch variieren."],
  }),

  /* ---- HEISSRÄUCHERN ---- */
  r({
    id: "raeucher-haehnchenschenkel", name: "Geräucherte Hähnchenschenkel", method: "heiss", cat: "Geflügel", diff: 1,
    time: "1 Tag + 2 h", pit: "120–140 °C", core: "82 °C", wood: "Kirsche / Apfel", yield: "6 Schenkel",
    blurb: "Saftige Schenkel mit knuspriger Haut – gutmütig, günstig und sehr aromatisch.",
    ingredients: [
      { a: "6", i: "Hähnchenschenkel" },
      { a: "12 g/kg", i: "Salz (Dry Brine)" },
      { a: "3 EL", i: "BBQ-Rub" },
    ],
    phases: [
      { label: "Dry Brine", kind: "cure", dur: "12–24 h", temp: "Kühlschrank, offen", text: "Salzen und offen kühlen für knusprige Haut.", bullets: [] },
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Mit Rub einreiben.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "1,5–2 h", temp: "120–140 °C", text: "Garen bis Kern 82 °C – dunkles Fleisch darf höher.", bullets: ["Schenkelfleisch wird bei 82 °C besonders zart"] },
    ],
    tips: ["Dunkles Geflügelfleisch verzeiht mehr als Brust – kaum trocken zu kriegen.", "Zum Schluss mit BBQ-Sauce glasieren."],
  }),
  r({
    id: "raeucherzander", name: "Geräucherter Zander", method: "heiss", cat: "Fisch", diff: 2,
    time: "1 Tag + 1,5 h", pit: "75–95 °C", core: "62 °C", wood: "Erle / Buche", yield: "ca. 800 g",
    blurb: "Edler Süßwasserfisch, fein im Geschmack – heiß geräuchert ein zarter Genuss.",
    ingredients: [
      { a: "2", i: "Zander (je ca. 600 g), küchenfertig" },
      { a: "60 g/l", i: "Salzlake 6 %" },
      { a: "je 1 TL", i: "Dill, Pfeffer, Zitrone" },
    ],
    phases: [
      { label: "Lake", kind: "cure", dur: "6–10 h", temp: "0–4 °C", text: "In 6%-Lake einlegen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "luftig", text: "Abspülen, Pellicle bilden.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "45–60 min", temp: "75–95 °C", text: "Garen bis Kern 62 °C.", bullets: ["Zander ist mager – nicht übergaren"] },
    ],
    tips: ["Erle ist der klassische Begleiter für Süßwasserfisch.", "Sehr fein – sparsam würzen."],
  }),
  r({
    id: "raeuchersaibling", name: "Geräucherter Saibling", method: "heiss", cat: "Fisch", diff: 1,
    time: "1 Tag + 1,5 h", pit: "80–100 °C", core: "62 °C", wood: "Buche / Erle", yield: "4 Stück",
    blurb: "Der Forellenverwandte mit besonders feinem, leicht nussigem Aroma.",
    ingredients: [
      { a: "4", i: "Saiblinge, ausgenommen" },
      { a: "60 g/l", i: "Salzlake 6 %" },
      { a: "je 1 TL + 1 Stk", i: "Wacholder, Lorbeer, Zitrone" },
    ],
    phases: [
      { label: "Lake", kind: "cure", dur: "8–12 h", temp: "0–4 °C", text: "In Salzlake einlegen.", bullets: [] },
      { label: "Trocknen", kind: "dry", dur: "1–2 h", temp: "luftig", text: "Haut antrocknen.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "40–60 min", temp: "80–100 °C", text: "Garen bis Kern 62 °C.", bullets: [] },
    ],
    tips: ["Wie Forelle zu behandeln, aber feiner im Aroma.", "Frisch aus dem Räucherofen am besten."],
  }),
  r({
    id: "raeucher-eier", name: "Geräucherte Eier", method: "heiss", cat: "Sonstiges", diff: 1,
    time: "1 h", pit: "90–110 °C", core: "—", wood: "Buche / Kirsche", yield: "6–12 Eier",
    blurb: "Hartgekochte Eier mit Rauchnote – ein verblüffend guter Snack und Salat-Topping.",
    ingredients: [
      { a: "6–12", i: "Eier (hart gekocht, gepellt)" },
      { a: "optional", i: "Sojasoße oder Rauchsalz zum Würzen" },
    ],
    phases: [
      { label: "Kochen & Pellen", kind: "prep", dur: "15 min", temp: "—", text: "Eier hart kochen, abschrecken, pellen.", bullets: ["Trocken tupfen für bessere Rauchhaftung"] },
      { label: "Heiß räuchern", kind: "smoke", dur: "30–45 min", temp: "90–110 °C", text: "Bis goldbraun räuchern.", bullets: ["Je länger, desto kräftiger – nicht über 1 h"] },
    ],
    tips: ["In Scheiben auf Brot, im Salat oder als Snack.", "Vorher kurz in Sojasoße marinieren gibt Farbe und Würze."],
  }),
  r({
    id: "heiss-schweinefilet", name: "Geräuchertes Schweinefilet", method: "heiss", cat: "Schwein", diff: 1,
    time: "1 Tag + 1,5 h", pit: "110–130 °C", core: "62 °C", wood: "Apfel / Kirsche", yield: "ca. 800 g",
    blurb: "Mageres Filet bleibt durch sanftes Heißräuchern zart und rosa – schnell und edel.",
    ingredients: [
      { a: "2", i: "Schweinefilets (je ca. 400 g, pariert)" },
      { a: "12 g/kg", i: "Salz (Dry Brine)" },
      { a: "3 EL", i: "milder Rub (Paprika, Knoblauch, Pfeffer, Zucker)" },
    ],
    phases: [
      { label: "Dry Brine", kind: "cure", dur: "8–12 h", temp: "Kühlschrank", text: "Salzen, kühlen.", bullets: [] },
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Mit Rub einreiben.", bullets: [] },
      { label: "Heiß räuchern", kind: "smoke", dur: "60–90 min", temp: "110–130 °C", text: "Sanft garen bis Kern 62 °C, dann ruhen.", bullets: ["Mageres Filet nicht über 63 °C – sonst trocken"] },
    ],
    tips: ["Optional am Ende kurz scharf angrillen für Kruste.", "Dünn aufgeschnitten warm oder kalt."],
  }),
  r({
    id: "raeucher-bockwurst", name: "Geräucherte Bockwurst", method: "heiss", cat: "Wurst", diff: 2,
    time: "Herstellung + 1,5 h", pit: "Räuchern 60 °C + Brühen 75 °C", core: "72 °C", wood: "Buche", yield: "ca. 1,5 kg",
    blurb: "Feine Brühwurst mit Rauchnote – geräuchert und gebrüht, der Klassiker fürs Würstchen.",
    ingredients: [
      { a: "1 kg", i: "Schweinefleisch (mager)" },
      { a: "0,5 kg", i: "Rückenspeck" },
      { a: "0,25 l", i: "Eiswasser" },
      { a: "26 g/kg", i: "Nitritpökelsalz (NPS)" },
      { a: "je 1 TL", i: "Muskat, Koriander, Pfeffer (weiß), Zitronenschale" },
      { a: "1", i: "Schweinedarm Kaliber 26/28" },
    ],
    phases: [
      { label: "Feines Brät", kind: "prep", dur: "30 min", temp: "kalt", text: "Fein kuttern/wolfen mit Eis zu bindigem Brät.", bullets: ["Temperatur niedrig halten"] },
      { label: "Füllen", kind: "prep", dur: "20 min", temp: "kühl", text: "In Därme füllen, abdrehen.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "45–60 min", temp: "ca. 60 °C", text: "Heiß anräuchern für Farbe.", bullets: [] },
      { label: "Brühen", kind: "cook", dur: "20–30 min", temp: "Wasser 75 °C", text: "Bei 75 °C bis Kern 72 °C brühen.", bullets: ["Nicht kochen – sonst platzen die Würste"] },
    ],
    tips: ["Zum Servieren nur noch in heißem (nicht kochendem) Wasser ziehen.", "Mit Senf und Brot – fertig."],
  }),

  /* ---- LOW & SLOW BBQ ---- */
  r({
    id: "beef-cheeks", name: "Smoked Beef Cheeks (Rinderbäckchen)", method: "bbq", cat: "Rind", diff: 2,
    time: "6–8 h", pit: "120 °C", core: "92–95 °C", wood: "Eiche / Kirsche", yield: "ca. 1,2 kg",
    blurb: "Stark durchzogene Rinderbäckchen werden butterzart – das beste 'unbekannte' BBQ-Stück.",
    ingredients: [
      { a: "1,5 kg", i: "Rinderbäckchen, pariert" },
      { a: "je 1 EL", i: "Salz, Pfeffer, Knoblauchgranulat (SPG)" },
      { a: "etwas", i: "Senf als Haftgrund" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "15 min", temp: "—", text: "Mit Senf einstreichen, SPG-Rub auftragen.", bullets: ["Silberhäute entfernen"] },
      { label: "Räuchern", kind: "smoke", dur: "4–5 h", temp: "120 °C", text: "Räuchern bis Kruste steht und Kern ~75 °C.", bullets: [] },
      { label: "Wrappen & fertig garen", kind: "cook", dur: "2–3 h", temp: "120 °C", text: "In Butcher Paper oder Schale mit etwas Brühe bis Kern 92–95 °C schmoren.", bullets: ["Fertig, wenn butterweich"] },
      { label: "Ruhen", kind: "rest", dur: "30 min", temp: "—", text: "Ruhen lassen, dann aufschneiden oder zupfen.", bullets: [] },
    ],
    tips: ["Wie Mini-Brisket, aber schneller und günstiger.", "Auch toll für Tacos und Sandwiches."],
  }),
  r({
    id: "picanha-bbq", name: "Picanha (Tafelspitz) Low & Slow", method: "bbq", cat: "Rind", diff: 2,
    time: "2–3 h", pit: "120 °C → Sear", core: "54 °C (medium-rare)", wood: "Eiche / Buche", yield: "ca. 1,2 kg",
    blurb: "Brasilianisches Kultstück mit Fettdeckel – langsam geräuchert, dann scharf angegrillt.",
    ingredients: [
      { a: "1,3 kg", i: "Picanha (Tafelspitz) mit Fettdeckel" },
      { a: "reichlich", i: "grobes Meersalz" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "15 min", temp: "—", text: "Fettdeckel rautenförmig einschneiden, kräftig salzen.", bullets: ["Fett nach oben beim Räuchern"] },
      { label: "Räuchern", kind: "smoke", dur: "1,5–2 h", temp: "120 °C", text: "Räuchern bis Kern 48 °C.", bullets: [] },
      { label: "Scharf angrillen", kind: "finish", dur: "5 min", temp: "sehr heiß", text: "Über direkter Glut rundum searen bis Kern 54 °C, Fettdeckel knusprig.", bullets: ["Quer zur Faser aufschneiden"] },
    ],
    tips: ["Den Fettdeckel unbedingt dranlassen – er macht das Aroma.", "Traditionell in dicke Scheiben quer zur Faser."],
  }),
  r({
    id: "pulled-chicken", name: "Pulled Chicken", method: "bbq", cat: "Geflügel", diff: 1,
    time: "3–4 h", pit: "120–135 °C", core: "85 °C", wood: "Apfel / Kirsche", yield: "ca. 1,5 kg",
    blurb: "Saftiges, gezupftes Hähnchen – schneller und leichter als Pulled Pork, ideal für Burger.",
    ingredients: [
      { a: "4–6", i: "Hähnchenschenkel oder 1 ganzes Hähnchen" },
      { a: "3 EL", i: "BBQ-Rub" },
      { a: "etwas", i: "BBQ-Sauce + Hühnerbrühe" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "15 min", temp: "—", text: "Mit Rub einreiben.", bullets: [] },
      { label: "Räuchern", kind: "smoke", dur: "2,5–3,5 h", temp: "120–135 °C", text: "Garen bis Kern 85 °C (dunkles Fleisch zupft besser).", bullets: [] },
      { label: "Zupfen", kind: "finish", dur: "10 min", temp: "—", text: "Mit Gabeln zupfen, mit etwas Brühe und Sauce mischen.", bullets: ["Brühe hält es saftig"] },
    ],
    tips: ["Schenkelfleisch wird saftiger als Brust.", "Auf Burgerbun mit Coleslaw – ein Traum."],
  }),
  r({
    id: "smoked-wings", name: "Smoked Chicken Wings", method: "bbq", cat: "Geflügel", diff: 1,
    time: "2 h", pit: "120 °C → 180 °C", core: "85 °C", wood: "Kirsche / Hickory", yield: "ca. 1,5 kg",
    blurb: "Erst rauchig gegart, dann knusprig nachgegrillt – die besten Wings überhaupt.",
    ingredients: [
      { a: "1,5 kg", i: "Chicken Wings" },
      { a: "1 TL", i: "Backpulver (für knusprige Haut)" },
      { a: "3 EL + Sauce", i: "BBQ-Rub, Buffalo- oder BBQ-Sauce" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Wings mit Rub und einem Hauch Backpulver mischen.", bullets: ["Backpulver = extra knusprige Haut"] },
      { label: "Räuchern", kind: "smoke", dur: "1–1,5 h", temp: "120 °C", text: "Rauchig garen bis Kern ~75 °C.", bullets: [] },
      { label: "Knusprig finishen", kind: "finish", dur: "15–20 min", temp: "180 °C direkt", text: "Heiß nachgrillen bis Haut kross, Kern 85 °C. In Sauce wenden.", bullets: [] },
    ],
    tips: ["Hohe Endhitze ist der Schlüssel zur knusprigen Haut.", "Buffalo-Sauce + Blauschimmel-Dip für Klassik."],
  }),
  r({
    id: "bbq-fatty", name: "BBQ Fatty (Hack-Bacon-Rolle)", method: "bbq", cat: "Schwein", diff: 2,
    time: "2,5–3 h", pit: "120–135 °C", core: "72 °C", wood: "Hickory / Kirsche", yield: "ca. 1,2 kg",
    blurb: "Gewürztes Hackfleisch, gefüllt und im Bacon-Mantel geräuchert – herzhaft und spektakulär.",
    ingredients: [
      { a: "800 g", i: "Hackfleisch (gemischt oder Schwein)" },
      { a: "400 g", i: "Bacon (für das Geflecht)" },
      { a: "nach Wahl", i: "Füllung: Käse, gebratene Zwiebeln, Pilze, Paprika" },
      { a: "3 EL", i: "BBQ-Rub" },
    ],
    phases: [
      { label: "Bacon-Geflecht & Füllen", kind: "prep", dur: "20 min", temp: "—", text: "Bacon zu einer Matte flechten, Hack darauf flach drücken, füllen und aufrollen.", bullets: ["Eng aufrollen, Naht unten"] },
      { label: "Räuchern", kind: "smoke", dur: "2–2,5 h", temp: "120–135 °C", text: "Garen bis Kern 72 °C.", bullets: ["Bacon wird außen knusprig"] },
      { label: "Glasieren & Ruhen", kind: "finish", dur: "15 min", temp: "—", text: "Mit BBQ-Sauce glasieren, kurz ruhen, in Scheiben schneiden.", bullets: [] },
    ],
    tips: ["Endlos variierbar bei der Füllung.", "Reste kalt in Scheiben sind ein toller Snack."],
  }),

  /* ---- DÖRREN ---- */
  r({
    id: "kraeuter-trocknen", name: "Kräuter trocknen", method: "dorr", cat: "Sonstiges", diff: 1,
    time: "2–5 h", pit: "35–40 °C", core: "spröde-trocken", wood: "Graef DA506", yield: "beliebig",
    blurb: "Petersilie, Oregano, Thymian & Co. schonend trocknen – behalten Farbe und Aroma viel besser als luftgetrocknet.",
    ingredients: [
      { a: "nach Wunsch", i: "frische Kräuter (Petersilie, Oregano, Thymian, Minze, Basilikum)" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "10 min", temp: "—", text: "Kräuter waschen, gründlich trocken tupfen, grobe Stiele entfernen.", bullets: ["Nass eingelegte Kräuter schimmeln leicht"] },
      { label: "Dörren", kind: "dry", dur: "2–5 h", temp: "35–40 °C", text: "Niedrige Temperatur erhält ätherische Öle. Trocknen bis spröde.", bullets: ["Basilikum und Minze nur bei 35 °C – höher verlieren sie Aroma"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "dunkel, trocken", text: "Zwischen den Fingern zerreiben oder ganz lassen, luftdicht und dunkel lagern.", bullets: [] },
    ],
    tips: ["Dunkle Lagerung erhält die grüne Farbe.", "Eigene Kräutermischungen (z. B. Kräuter der Provence) zusammenstellen."],
  }),
  r({
    id: "feigen-dorr", name: "Getrocknete Feigen", method: "dorr", cat: "Obst", diff: 1,
    time: "10–16 h", pit: "55–65 °C", core: "Weich-lederig", wood: "Graef DA506", yield: "ca. 250 g/kg",
    blurb: "Honigsüß und konzentriert – selbstgetrocknete Feigen sind ein edler Snack und passen perfekt zu Käse.",
    ingredients: [
      { a: "1 kg", i: "reife Feigen" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "10 min", temp: "—", text: "Feigen waschen, halbieren oder vierteln, mit Schnittfläche nach oben legen.", bullets: ["Ganze Feigen brauchen deutlich länger"] },
      { label: "Dörren", kind: "dry", dur: "10–16 h", temp: "55–65 °C", text: "Einlagig dörren bis weich-lederig, kein feuchter Kern.", bullets: ["Hoher Zuckergehalt – bleiben angenehm saftig"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Auskühlen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Auf der Käseplatte mit Blauschimmel oder Ziegenkäse hervorragend.", "Mit etwas Honig und Walnuss gefüllt ein Festtags-Snack."],
  }),
  r({
    id: "kiwi-dorr", name: "Kiwischeiben getrocknet", method: "dorr", cat: "Obst", diff: 1,
    time: "8–12 h", pit: "55–60 °C", core: "Lederig", wood: "Graef DA506", yield: "ca. 90 g/kg",
    blurb: "Leuchtend grün mit hübschen Kernen – süß-säuerlicher Snack und schöne Deko.",
    ingredients: [
      { a: "8–10", i: "feste Kiwis" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "15 min", temp: "—", text: "Kiwis schälen, in 4–6 mm Scheiben schneiden.", bullets: ["Gleichmäßige Scheiben für gleichmäßiges Trocknen"] },
      { label: "Dörren", kind: "dry", dur: "8–12 h", temp: "55–60 °C", text: "Einlagig dörren bis lederig.", bullets: ["Kleben leicht – auf Backpapier oder Dörrfolie legen"] },
      { label: "Lagern", kind: "finish", dur: "—", temp: "kühl, trocken", text: "Luftdicht lagern.", bullets: [] },
    ],
    tips: ["Behalten ihre Farbe gut – tolle Deko für Müsli und Kuchen.", "Etwas Zitrone hält die Farbe noch frischer."],
  }),
  r({
    id: "knoblauch-pulver", name: "Knoblauchgranulat & -pulver", method: "dorr", cat: "Gemüse", diff: 1,
    time: "8–12 h", pit: "50–60 °C", core: "spröde-trocken", wood: "Graef DA506", yield: "ca. 40 g/Knolle-Charge",
    blurb: "Selbstgemachtes Knoblauchpulver – intensiver als jede Supermarktware, perfekt für Rubs.",
    ingredients: [
      { a: "10–15", i: "Knoblauchknollen" },
    ],
    phases: [
      { label: "Schneiden", kind: "prep", dur: "20 min", temp: "—", text: "Zehen schälen, in dünne Scheiben schneiden.", bullets: ["Im Freien arbeiten – riecht intensiv"] },
      { label: "Dörren", kind: "dry", dur: "8–12 h", temp: "50–60 °C", text: "Einlagig dörren bis vollständig spröde.", bullets: ["Restfeuchte lässt das Pulver klumpen", "Geruch zieht durchs Haus – am besten draußen oder in der Garage"] },
      { label: "Mahlen & Lagern", kind: "finish", dur: "—", temp: "—", text: "Zu Granulat oder feinem Pulver mahlen, luftdicht lagern.", bullets: ["Reiskorn im Glas gegen Klumpen"] },
    ],
    tips: ["Frisch gemahlenes Knoblauchpulver ist die Basis fast jedes BBQ-Rubs.", "Gleiches Verfahren für Zwiebel-, Sellerie- oder Chilipulver."],
  }),
  r({
    id: "granola-dorr", name: "Granola / Knuspermüsli", method: "dorr", cat: "Sonstiges", diff: 1,
    time: "6–10 h", pit: "50–60 °C", core: "Knusprig", wood: "Graef DA506", yield: "ca. 600 g",
    blurb: "Schonend getrocknetes Knuspermüsli – ohne Backofenhitze, dadurch besonders aromatisch.",
    ingredients: [
      { a: "300 g", i: "Haferflocken (kernig)" },
      { a: "150 g", i: "Nüsse & Kerne (Mandeln, Walnüsse, Sonnenblumenkerne)" },
      { a: "4 EL + 3 EL", i: "Honig/Ahornsirup, Kokosöl (geschmolzen)" },
      { a: "je 1 TL", i: "Zimt, Vanille, Prise Salz" },
    ],
    phases: [
      { label: "Mischen", kind: "prep", dur: "10 min", temp: "—", text: "Alle Zutaten vermengen, bis alles leicht klebt.", bullets: ["Gut durchmischen für gleichmäßige Süße"] },
      { label: "Dörren", kind: "dry", dur: "6–10 h", temp: "50–60 °C", text: "Auf Dörrfolie verteilen, dörren bis knusprig. Zwischendurch auflockern.", bullets: ["Erst nach dem Abkühlen wirklich knusprig"] },
      { label: "Verfeinern", kind: "finish", dur: "—", temp: "—", text: "Getrocknete Früchte erst nach dem Dörren untermischen, luftdicht lagern.", bullets: ["Trockenfrüchte würden im Dörrer hart werden"] },
    ],
    tips: ["Niedrige Temperatur erhält die Nährstoffe besser als der Backofen.", "Endlos variierbar mit Saaten, Kakao oder Kokos."],
  }),
  r({
    id: "kraeutersalz", name: "Kräutersalz selbst gemacht", method: "dorr", cat: "Sonstiges", diff: 1,
    time: "4–8 h", pit: "40–50 °C", core: "trocken-rieselfähig", wood: "Graef DA506", yield: "ca. 300 g",
    blurb: "Frische Kräuter mit Salz getrocknet und gemahlen – ein aromatischer Allrounder für die Küche.",
    ingredients: [
      { a: "1 Bund je", i: "Petersilie, Liebstöckel, Schnittlauch, Rosmarin" },
      { a: "200 g", i: "grobes Meersalz" },
      { a: "optional", i: "Knoblauch, Zitronenschale, Karotte" },
    ],
    phases: [
      { label: "Hacken & Mischen", kind: "prep", dur: "15 min", temp: "—", text: "Kräuter fein hacken, mit Salz vermengen (Salz entzieht Wasser).", bullets: ["Salz konserviert und beschleunigt das Trocknen"] },
      { label: "Dörren", kind: "dry", dur: "4–8 h", temp: "40–50 °C", text: "Dünn ausbreiten, dörren bis vollständig trocken.", bullets: ["Niedrige Temp erhält die grüne Farbe"] },
      { label: "Mahlen & Lagern", kind: "finish", dur: "—", temp: "—", text: "Im Mörser oder Mixer fein mahlen, luftdicht lagern.", bullets: [] },
    ],
    tips: ["Das selbstgemachte 'Maggikraut'-Salz mit Liebstöckel ist ein Universalwürzer.", "Ein tolles Geschenk im hübschen Glas."],
  }),

  /* ---- GRILL & SPIEß ---- */
  r({
    id: "flammkuchen-grill", name: "Flammkuchen vom Grill (Pizzastein)", method: "grill", cat: "Sonstiges", diff: 1,
    time: "30 min + 8 min Grillen", pit: "280–320 °C (Pizzastein)", core: "—", wood: "Rössle Gasgrill (Pizzastein) oder Weber Kugelgrill",
    blurb: "Knuspriger Flammkuchen mit Crème fraîche, Speck und Zwiebeln – in Minuten von der heißen Steinplatte.",
    ingredients: [
      { a: "1", i: "Flammkuchenteig (dünn ausgerollt)" },
      { a: "200 g", i: "Crème fraîche / Schmand" },
      { a: "150 g + 2", i: "Speckwürfel, Zwiebeln (in Ringen)" },
      { a: "nach Geschmack", i: "Salz, Pfeffer, Muskat" },
    ],
    phases: [
      { label: "Stein vorheizen", kind: "prep", dur: "20 min", temp: "300 °C", text: "Pizzastein im geschlossenen Grill richtig durchheizen.", bullets: ["Heißer Stein = knuspriger Boden"] },
      { label: "Belegen", kind: "prep", dur: "5 min", temp: "—", text: "Teig dünn mit Crème fraîche bestreichen, Speck und Zwiebeln verteilen.", bullets: ["Sparsam belegen – sonst wird er nicht knusprig"] },
      { label: "Grillen", kind: "direct", dur: "6–8 min", temp: "280–320 °C", text: "Auf dem heißen Stein backen bis der Rand kross und gebräunt ist.", bullets: [] },
    ],
    tips: ["Süße Variante: Apfel, Zimt und Calvados.", "Vegetarisch mit Ziegenkäse, Birne und Walnuss."],
  }),
  r({
    id: "gegrillte-pfirsiche", name: "Gegrillte Pfirsiche mit Honig", method: "grill", cat: "Sonstiges", diff: 1,
    time: "15 min", pit: "direkt 200 °C", core: "—", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Karamellisierte Pfirsichhälften mit Honig und Joghurt – ein blitzschnelles Grill-Dessert.",
    ingredients: [
      { a: "4", i: "reife, feste Pfirsiche (halbiert, entsteint)" },
      { a: "2 EL + 1 TL", i: "Honig, etwas Butter, Zimt" },
      { a: "nach Wahl", i: "Joghurt, Mascarpone oder Vanilleeis" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "5 min", temp: "—", text: "Schnittflächen leicht mit Butter bestreichen.", bullets: ["Feste Pfirsiche zerfallen nicht"] },
      { label: "Grillen", kind: "direct", dur: "4–6 min", temp: "200 °C", text: "Mit der Schnittfläche nach unten grillen bis Grillstreifen und Karamell entstehen.", bullets: ["Nicht zu lange – sonst zerfallen sie"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Mit Honig beträufeln, mit Joghurt oder Eis servieren.", bullets: [] },
    ],
    tips: ["Auch mit Aprikosen, Ananas oder Feigen.", "Ein Hauch Rosmarin oder Thymian überrascht angenehm."],
  }),
  r({
    id: "camembert-grill", name: "Gegrillter Camembert", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "15 min", pit: "indirekt 180–200 °C", core: "innen flüssig", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Cremig geschmolzener Camembert mit Honig, Nüssen und Kräutern – die perfekte kleine Vorspeise.",
    ingredients: [
      { a: "1–2", i: "Camembert oder Brie (im Holzspankörbchen oder Auflaufförmchen)" },
      { a: "2 EL + Handvoll", i: "Honig, Walnüsse, Rosmarin, Knoblauch" },
    ],
    phases: [
      { label: "Vorbereiten", kind: "prep", dur: "5 min", temp: "—", text: "Käse oben kreuzweise einschneiden, mit Knoblauch und Rosmarin spicken.", bullets: ["Im Holzkörbchen oder feuerfestem Förmchen, damit er nicht ausläuft"] },
      { label: "Indirekt grillen", kind: "indirect", dur: "8–12 min", temp: "180–200 °C, Deckel zu", text: "Bis der Käse innen flüssig ist.", bullets: ["Nicht über direkter Hitze – läuft sonst aus"] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Mit Honig und Walnüssen toppen, mit Brot servieren.", bullets: [] },
    ],
    tips: ["Mit Preiselbeeren oder Feigensenf statt Honig variieren.", "Baguette oder geröstetes Brot zum Tunken bereithalten."],
  }),
  r({
    id: "blumenkohl-steak", name: "Blumenkohl-Steak vom Grill", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "30 min", pit: "direkt + indirekt 200 °C", core: "weich, mit Biss", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Dicke Blumenkohlscheiben mit Röstaromen – ein sättigendes vegetarisches Hauptgericht.",
    ingredients: [
      { a: "1", i: "großer Blumenkopf (in 2–3 cm dicke Scheiben)" },
      { a: "4 EL + je 1 TL", i: "Olivenöl, Kurkuma, Paprika, Knoblauch, Salz, Pfeffer" },
      { a: "nach Wahl", i: "Tahini-Sauce oder Parmesan zum Servieren" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Scheiben mit Gewürzöl bestreichen.", bullets: ["Aus der Mitte schneiden – dann halten die Scheiben zusammen"] },
      { label: "Direkt anrösten", kind: "direct", dur: "4–5 min/Seite", temp: "200 °C", text: "Über direkter Hitze Grillstreifen geben.", bullets: [] },
      { label: "Indirekt fertig garen", kind: "indirect", dur: "10–15 min", temp: "200 °C, Deckel zu", text: "Bis innen weich mit Biss.", bullets: [] },
    ],
    tips: ["Mit Tahini-Zitronen-Sauce orientalisch, mit Parmesan mediterran.", "Die zerfallenen Röschen nicht wegwerfen – mitgrillen als Beilage."],
  }),
  r({
    id: "gefuellte-champignons", name: "Gefüllte Champignons vom Grill", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "25 min", pit: "indirekt 180–200 °C", core: "—", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Mit Frischkäse, Kräutern und Speck gefüllte Champignons – beliebter Snack und Beilage.",
    ingredients: [
      { a: "16", i: "große Champignons (Stiele entfernt)" },
      { a: "200 g + 100 g", i: "Frischkäse, geriebener Käse" },
      { a: "100 g + 2", i: "Speckwürfel, Frühlingszwiebeln" },
      { a: "je 1 TL", i: "Knoblauch, Petersilie, Pfeffer" },
    ],
    phases: [
      { label: "Füllung", kind: "prep", dur: "15 min", temp: "—", text: "Frischkäse mit Käse, Speck, Zwiebeln und Kräutern verrühren, in die Pilzköpfe füllen.", bullets: ["Stiele klein hacken und mit untermischen"] },
      { label: "Grillen", kind: "indirect", dur: "12–18 min", temp: "180–200 °C, Deckel zu", text: "Indirekt grillen bis die Füllung goldbraun und blubbernd ist.", bullets: ["Indirekt, damit sie nicht verbrennen"] },
    ],
    tips: ["Vegetarisch: Speck durch getrocknete Tomaten ersetzen.", "Auf einer Grillschale, falls die Pilze Saft ziehen."],
  }),
  r({
    id: "susskartoffel-grill", name: "Gegrillte Süßkartoffel-Spalten", method: "grill", cat: "Gemüse & Beilagen", diff: 1,
    time: "30 min", pit: "indirekt → direkt 200–220 °C", core: "weich, außen kross", wood: "Weber Kugelgrill oder Rössle Gasgrill",
    blurb: "Würzige Süßkartoffel-Spalten mit Paprika und Kreuzkümmel – die bessere Pommes-Alternative.",
    ingredients: [
      { a: "1 kg", i: "Süßkartoffeln (in Spalten)" },
      { a: "4 EL + je 1 TL", i: "Olivenöl, Paprika, Kreuzkümmel, Knoblauch, Salz, Chili" },
    ],
    phases: [
      { label: "Würzen", kind: "prep", dur: "10 min", temp: "—", text: "Spalten mit Gewürzöl mischen.", bullets: ["Gleich dicke Spalten garen gleichmäßig"] },
      { label: "Indirekt vorgaren", kind: "indirect", dur: "15–18 min", temp: "200 °C, Deckel zu", text: "Bis sie innen weich werden.", bullets: [] },
      { label: "Direkt knusprig", kind: "direct", dur: "5–8 min", temp: "220 °C", text: "Über direkter Hitze außen kross grillen.", bullets: [] },
    ],
    tips: ["Mit einem Joghurt-Limetten- oder Aioli-Dip servieren.", "Auf dem Seitenkocher in der Gusspfanne genauso möglich."],
  }),

  /* ---- GRUNDLAGEN ---- */
  r({
    id: "g-brine", name: "Grundlagen: Pökellake & Brine", method: "basis", cat: "Grundlagen", diff: 1,
    time: "—", pit: "—", core: "", wood: "Technik", yield: "—",
    blurb: "Nass- oder Trockenpökeln, Brine und Dry Brine verständlich erklärt – die Basis für saftiges, sicheres Räuchergut.",
    ingredients: [
      { a: "Faustregel", i: "Nasslake Pökeln: 60 g NPS pro Liter Wasser (6 %)" },
      { a: "Faustregel", i: "Trockenpökeln: 40 g NPS pro kg Fleisch" },
      { a: "Faustregel", i: "Dry Brine (Geflügel/Steak): 10–12 g Salz pro kg" },
    ],
    phases: [
      { label: "Trockenpökeln", kind: "cure", dur: "1 Tag/cm + Reserve", temp: "2–7 °C", text: "Salz/NPS direkt aufs Fleisch. Intensiver Geschmack, weniger Platzbedarf, längere Haltbarkeit.", bullets: ["NPS exakt abwiegen – nie schätzen", "Vakuumieren spart Platz und Lake"] },
      { label: "Nasspökeln (Brine)", kind: "cure", dur: "ca. 1 Tag/100 g + Reserve", temp: "2–7 °C", text: "Fleisch in Salzlake einlegen. Gleichmäßiger, milder, saftiger – ideal für Geflügel und magere Stücke.", bullets: ["Vollständig bedeckt halten, beschweren", "Spritzpökeln beschleunigt große Stücke"] },
      { label: "Dry Brine", kind: "prep", dur: "8–24 h", temp: "Kühlschrank, offen", text: "Leicht salzen und offen kühlen. Würzt durch und trocknet die Oberfläche für knusprige Haut.", bullets: ["Kein NPS nötig, da kurzfristig und durchgegart"] },
    ],
    tips: ["NPS (Nitritpökelsalz) ist Pflicht bei allem, was kalt/lange gepökelt wird – Schutz vor Botulismus.", "Reines Salz nur für kurze Dry Brines vor dem Heißräuchern/Grillen.", "Kühlkette 2–7 °C immer einhalten."],
  }),
  r({
    id: "g-reverse-sear", name: "Grundlagen: Reverse Sear", method: "basis", cat: "Grundlagen", diff: 1,
    time: "—", pit: "100–120 °C → 250–300 °C", core: "je nach Garstufe", wood: "Technik", yield: "—",
    blurb: "Erst sanft auf Temperatur ziehen, dann scharf angrillen – die zuverlässigste Methode für dicke Steaks und Braten.",
    ingredients: [
      { a: "ideal ab", i: "3 cm Fleischdicke (Steak, Roastbeef, Picanha, Tri-Tip)" },
    ],
    phases: [
      { label: "Indirekt ziehen", kind: "indirect", dur: "bis ~10 °C unter Ziel", temp: "100–120 °C", text: "Fleisch indirekt langsam auf knapp unter die Zielkerntemperatur bringen.", bullets: ["Gleichmäßig rosa von Rand zu Rand", "Sonde verwenden – nicht nach Zeit gehen"] },
      { label: "Ruhen lassen", kind: "rest", dur: "5–10 min", temp: "—", text: "Kurz ruhen, während der Grill auf volle Hitze kommt.", bullets: [] },
      { label: "Scharf searen", kind: "finish", dur: "1–2 min/Seite", temp: "250–300 °C", text: "Über direkter Glut rundum kräftig anbraten bis zur Zielkerntemperatur.", bullets: ["Trockene Oberfläche = bessere Kruste"] },
    ],
    tips: ["Medium-rare Rind: ~52–54 °C. Vorher bei ~44 °C aus der indirekten Zone.", "Funktioniert auf WSM, Kugelgrill und Gasgrill gleichermaßen.", "Für dünne Steaks ungeeignet – die gehen direkt heiß."],
  }),
  r({
    id: "g-vakuumieren", name: "Grundlagen: Lagern, Vakuumieren & Haltbarkeit", method: "basis", cat: "Grundlagen", diff: 1,
    time: "—", pit: "—", core: "", wood: "Technik", yield: "—",
    blurb: "Wie du Räuchergut, Dörrware und Wurst richtig lagerst – damit die Arbeit lange Freude macht.",
    ingredients: [
      { a: "Werkzeug", i: "Vakuumierer, Schraubgläser, Zip-Beutel, Silicagel" },
    ],
    phases: [
      { label: "Räucher- & Pökelware", kind: "mature", dur: "—", temp: "kühl, luftig", text: "Roh-/Kaltgeräuchertes hängend kühl-luftig lagern oder vakuumieren.", bullets: ["Vakuumiert im Kühlschrank Wochen, eingefroren Monate", "Schinken atmet besser im Baumwolltuch als luftdicht"] },
      { label: "Dörrware", kind: "finish", dur: "—", temp: "kühl, dunkel, trocken", text: "Vollständig abgekühlt luftdicht in Gläsern/Beuteln lagern.", bullets: ["Erst nach dem Abkühlen verpacken – sonst Kondenswasser", "Silicagel hält trocken; dunkel erhält Farbe & Vitamine"] },
      { label: "Konditionieren", kind: "rest", dur: "1 Woche", temp: "Raumtemperatur", text: "Dörrobst locker im Glas 'konditionieren' und täglich schütteln – verteilt Restfeuchte gleichmäßig.", bullets: ["Beschlägt das Glas: nochmal nachtrocknen"] },
    ],
    tips: ["Faustregel Jerky/Wurst: vakuumiert + kühl = am längsten haltbar.", "Beschriften mit Datum – auch der beste Speck ist nicht ewig haltbar.", "Im Zweifel: Geruch und Aussehen prüfen, Schimmel (außer Edelschimmel) bedeutet Wegwerfen."],
  }),

  /* ============================ MARINADEN ============================ */

  r({
    id: "marinade-bbq-klassik", name: "BBQ-Marinade (Klassiker)", method: "marinaden", cat: "Universal", diff: 1,
    time: "Ziehzeit 4–12 h", pit: "ca. 1–1,5 kg", core: "", wood: "Ketchup · Öl · Essig", yield: "ca. 250 ml",
    blurb: "Süß-rauchig-würzig: die Allround-Marinade für Spareribs, Hähnchen, Nackensteaks und Pulled Pork.",
    ingredients: [
      { a: "6 EL", i: "Ketchup oder passierte Tomaten" },
      { a: "3 EL", i: "brauner Zucker oder Honig" },
      { a: "3 EL", i: "Apfelessig" },
      { a: "2 EL", i: "Öl" },
      { a: "2 EL", i: "Worcestershiresauce" },
      { a: "je 1 TL", i: "geräuchertes Paprikapulver, Senf, Knoblauch, Zwiebelpulver, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Alle Zutaten glatt verrühren.", bullets: ["Geräuchertes Paprikapulver gibt den BBQ-Ton"] },
      { label: "Marinieren", kind: "marinate", dur: "4–12 h", temp: "Kühlschrank", text: "Fleisch rundum einstreichen, abgedeckt durchziehen lassen.", bullets: ["Über Nacht = intensivstes Aroma"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Abtropfen lassen und grillen/smoken. Rest aufkochen und als Mop/Glasur nutzen.", bullets: ["Roh-Marinade nie ungekocht aufs fertige Fleisch"] },
    ],
    tips: ["Zucker karamellisiert schnell – bei direkter Hitze nicht verbrennen lassen.", "Passt zu fast allem vom Schwein und Geflügel."],
  }),
  r({
    id: "marinade-teriyaki", name: "Teriyaki-Soja-Marinade", method: "marinaden", cat: "Geflügel", diff: 1,
    time: "Ziehzeit 1–8 h", pit: "ca. 1 kg", core: "", wood: "Sojasoße · Mirin", yield: "ca. 200 ml",
    blurb: "Salzig-süß mit Ingwer und Knoblauch – asiatischer Klassiker für Hähnchen, Lachs, Tofu und Spieße.",
    ingredients: [
      { a: "6 EL", i: "Sojasoße" },
      { a: "3 EL", i: "Mirin (oder Honig + Schuss Reisessig)" },
      { a: "2 EL", i: "brauner Zucker" },
      { a: "1 EL", i: "Sesamöl" },
      { a: "je 1 TL", i: "frischer Ingwer, Knoblauch (gerieben)" },
      { a: "optional", i: "Sesam, Frühlingszwiebel" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Zutaten verrühren, bis der Zucker gelöst ist.", bullets: [] },
      { label: "Marinieren", kind: "marinate", dur: "1–8 h", temp: "Kühlschrank", text: "Fleisch/Tofu einlegen. Fisch nur kurz (max. 1 h).", bullets: ["Soja gart Fisch an – nicht zu lange marinieren"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Grillen oder braten. Rest einkochen zur glänzenden Teriyaki-Glasur.", bullets: [] },
    ],
    tips: ["Eingekocht mit etwas Speisestärke wird daraus eine dicke Glaze.", "Genial für Lachs, Hähnchenschenkel und Gemüsespieße."],
  }),
  r({
    id: "marinade-mediterran", name: "Mediterrane Kräuter-Knoblauch-Marinade", method: "marinaden", cat: "Lamm & Gemüse", diff: 1,
    time: "Ziehzeit 2–12 h", pit: "ca. 1 kg", core: "", wood: "Olivenöl · Zitrone", yield: "ca. 200 ml",
    blurb: "Olivenöl, Zitrone und reichlich Kräuter – für Lamm, Hähnchen, Halloumi und Grillgemüse.",
    ingredients: [
      { a: "8 EL", i: "Olivenöl" },
      { a: "3 EL", i: "Zitronensaft" },
      { a: "3", i: "Knoblauchzehen (gepresst)" },
      { a: "je 1 EL", i: "Rosmarin, Thymian, Oregano (frisch gehackt)" },
      { a: "je 1 TL", i: "Meersalz, Pfeffer, Zitronenschale" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Öl mit Zitrone, Knoblauch und Kräutern verquirlen.", bullets: [] },
      { label: "Marinieren", kind: "marinate", dur: "2–12 h", temp: "Kühlschrank", text: "Fleisch oder Gemüse rundum einreiben.", bullets: ["Lamm verträgt lange Marinierzeiten"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Abtropfen und grillen. Frische Kräuter zum Servieren nachstreuen.", bullets: [] },
    ],
    tips: ["Salz erst kurz vor dem Grillen, wenn das Fleisch sonst zu lange zieht.", "Perfekt für Lammkoteletts, Souvlaki und Antipasti-Gemüse."],
  }),
  r({
    id: "marinade-tandoori", name: "Joghurt-Tandoori-Marinade", method: "marinaden", cat: "Geflügel", diff: 1,
    time: "Ziehzeit 4–24 h", pit: "ca. 1 kg", core: "", wood: "Joghurt", yield: "ca. 300 ml",
    blurb: "Joghurt macht Geflügel besonders zart, indische Gewürze geben Tiefe und die typisch rote Farbe.",
    ingredients: [
      { a: "250 g", i: "Naturjoghurt (vollfett)" },
      { a: "2 EL", i: "Zitronensaft" },
      { a: "2 EL", i: "Öl" },
      { a: "je 1 TL", i: "Garam Masala, Kreuzkümmel, Paprika, Kurkuma, Ingwer, Knoblauch, Chili, Salz" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Joghurt mit allen Gewürzen verrühren.", bullets: ["Gewürze kurz in Öl anrösten = mehr Aroma (optional)"] },
      { label: "Marinieren", kind: "marinate", dur: "4–24 h", temp: "Kühlschrank", text: "Geflügel mehrfach einschneiden und in der Marinade wenden.", bullets: ["Einschnitte lassen die Marinade tiefer einziehen", "Milchsäure macht das Fleisch zart"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Heiß grillen bis Röststellen entstehen.", bullets: [] },
    ],
    tips: ["Joghurtmarinaden sind die beste Zartmacher für Hähnchen.", "Klassisch für Tandoori-Chicken und Hähnchenspieße (Tikka)."],
  }),
  r({
    id: "marinade-bier-senf", name: "Bier-Senf-Marinade", method: "marinaden", cat: "Schwein", diff: 1,
    time: "Ziehzeit 3–12 h", pit: "ca. 1–1,5 kg", core: "", wood: "Bier · Senf", yield: "ca. 250 ml",
    blurb: "Herzhaft-malzig mit Senf und Honig – die deftige Marinade für Schweinenacken, Haxe und Bratwurst.",
    ingredients: [
      { a: "150 ml", i: "dunkles Bier (Malzbier für süßer)" },
      { a: "3 EL", i: "mittelscharfer Senf" },
      { a: "2 EL", i: "Honig" },
      { a: "2 EL", i: "Öl" },
      { a: "je 1 TL", i: "Knoblauch, Kümmel, Paprika, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Alle Zutaten glatt verrühren.", bullets: [] },
      { label: "Marinieren", kind: "marinate", dur: "3–12 h", temp: "Kühlschrank", text: "Fleisch einlegen, gelegentlich wenden.", bullets: [] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Grillen, dabei mit der Marinade mehrfach bestreichen (mopfen).", bullets: ["Honig bräunt schnell – Augen auf"] },
    ],
    tips: ["Restmarinade aufkochen und als Soße servieren.", "Passt hervorragend zu allem Deftigen vom Schwein."],
  }),
  r({
    id: "marinade-zitrus", name: "Zitrus-Kräuter-Marinade (Fisch)", method: "marinaden", cat: "Fisch & Meeresfrüchte", diff: 1,
    time: "Ziehzeit 15–60 min", pit: "ca. 800 g", core: "", wood: "Zitrone · Olivenöl", yield: "ca. 150 ml",
    blurb: "Frisch und leicht mit Zitrone, Limette und Dill – für Fischfilets, Garnelen und Calamari. Nur kurz marinieren!",
    ingredients: [
      { a: "5 EL", i: "Olivenöl" },
      { a: "je 2 EL", i: "Zitronen- und Limettensaft" },
      { a: "1", i: "Knoblauchzehe (fein)" },
      { a: "je 1 EL", i: "Dill, Petersilie (gehackt)" },
      { a: "je 1 TL", i: "Zitronenschale, Meersalz, Pfeffer" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Öl, Säfte, Kräuter und Gewürze verquirlen.", bullets: [] },
      { label: "Kurz marinieren", kind: "marinate", dur: "15–60 min", temp: "Kühlschrank", text: "Fisch nur kurz einlegen.", bullets: ["Säure 'gart' den Fisch – nie länger als 1 h", "Garnelen 30 min reichen"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Sofort grillen oder braten.", bullets: [] },
    ],
    tips: ["Bei Fisch gilt: kurz marinieren, sonst wird er mürbe.", "Auch als frisches Dressing über den fertigen Fisch."],
  }),
  r({
    id: "marinade-chimichurri", name: "Chimichurri (Argentinisch)", method: "marinaden", cat: "Rind", diff: 1,
    time: "Ziehzeit 30 min – 4 h", pit: "ca. 1 kg", core: "", wood: "Petersilie · Öl · Essig", yield: "ca. 200 ml",
    blurb: "Kräftig, kräuterfrisch und leicht scharf – die argentinische Kräutersauce als Marinade UND Dip fürs Steak.",
    ingredients: [
      { a: "1 Bund", i: "glatte Petersilie (fein gehackt)" },
      { a: "8 EL", i: "Olivenöl" },
      { a: "3 EL", i: "Rotweinessig" },
      { a: "3", i: "Knoblauchzehen (fein)" },
      { a: "je 1 TL", i: "Oregano, Chiliflocken, Meersalz, Pfeffer" },
    ],
    phases: [
      { label: "Anrühren", kind: "prep", dur: "10 min", temp: "—", text: "Alles vermengen, 30 min ziehen lassen, damit sich die Aromen verbinden.", bullets: ["Nicht pürieren – grob gehackt ist authentisch"] },
      { label: "Marinieren", kind: "marinate", dur: "30 min – 4 h", temp: "Kühlschrank", text: "Steak in der Hälfte der Chimichurri wenden, Rest aufheben.", bullets: [] },
      { label: "Servieren", kind: "finish", dur: "—", temp: "—", text: "Steak grillen, mit der zurückbehaltenen frischen Chimichurri servieren.", bullets: ["Frische Hälfte nie mit rohem Fleisch in Kontakt bringen"] },
    ],
    tips: ["Die Doppelnutzung – marinieren und als Dip – macht Chimichurri unschlagbar.", "Hält im Glas mit Öl bedeckt über eine Woche."],
  }),
  r({
    id: "marinade-honig-senf", name: "Honig-Senf-Marinade", method: "marinaden", cat: "Geflügel & Schwein", diff: 1,
    time: "Ziehzeit 2–12 h", pit: "ca. 1 kg", core: "", wood: "Honig · Senf", yield: "ca. 200 ml",
    blurb: "Süß-würzig und einfach unwiderstehlich – für Hähnchenschenkel, Spareribs und Schweinefilet.",
    ingredients: [
      { a: "4 EL", i: "Honig" },
      { a: "3 EL", i: "mittelscharfer Senf" },
      { a: "1 EL", i: "körniger Senf (Dijon)" },
      { a: "3 EL", i: "Öl" },
      { a: "1 EL", i: "Apfelessig" },
      { a: "je 1 TL", i: "Knoblauch, Paprika, Salz, Pfeffer" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Honig, Senf, Öl und Essig glatt verrühren.", bullets: [] },
      { label: "Marinieren", kind: "marinate", dur: "2–12 h", temp: "Kühlschrank", text: "Fleisch einstreichen, durchziehen lassen.", bullets: [] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Grillen, in den letzten Minuten mit Marinade glasieren.", bullets: ["Honig bräunt schnell – nicht über zu direkter Hitze"] },
    ],
    tips: ["Funktioniert auch als Glasur für Ofen-Spareribs.", "Mit Chili für eine Hot-Honey-Variante."],
  }),
  r({
    id: "marinade-whiskey-mop", name: "Whiskey-BBQ-Mop (Texas)", method: "marinaden", cat: "Rind", diff: 2,
    time: "Mopfen während des Garens", pit: "ca. 2–4 kg", core: "", wood: "Whiskey · Brühe", yield: "ca. 400 ml",
    blurb: "Dünnflüssige Mop-Sauce zum Bestreichen während des Smokens – hält Brisket und Ribs saftig und baut Kruste auf.",
    ingredients: [
      { a: "150 ml", i: "Rinderbrühe" },
      { a: "4 EL", i: "Bourbon Whiskey" },
      { a: "4 EL", i: "Apfelessig" },
      { a: "2 EL", i: "Worcestershiresauce" },
      { a: "2 EL", i: "Öl" },
      { a: "je 1 TL", i: "geräuchertes Paprikapulver, Knoblauch, Pfeffer, Salz" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Alle Zutaten verrühren (warm halten).", bullets: ["Dünnflüssig – kein Zucker, damit es nicht verbrennt"] },
      { label: "Mopfen", kind: "finish", dur: "stündlich", temp: "während des Smokens", text: "Großes Fleisch ab der 3. Stunde stündlich mit dem Mop bestreichen.", bullets: ["Feuchtigkeit hilft dem Rauch zu haften", "Sauberer Mop-Pinsel oder -Wischer"] },
    ],
    tips: ["Ein Mop ist keine Marinade – er wird WÄHREND des Garens aufgetragen.", "Klassisch für Brisket, Beef Ribs und Spareribs auf dem WSM."],
  }),
  r({
    id: "marinade-buttermilch", name: "Buttermilch-Marinade (zartes Geflügel)", method: "marinaden", cat: "Geflügel", diff: 1,
    time: "Ziehzeit 4–24 h", pit: "ca. 1–1,5 kg", core: "", wood: "Buttermilch", yield: "ca. 500 ml",
    blurb: "Das Geheimnis von zartem Brathähnchen und Fried Chicken – Buttermilch macht das Fleisch unglaublich saftig.",
    ingredients: [
      { a: "500 ml", i: "Buttermilch" },
      { a: "1 EL", i: "Salz" },
      { a: "je 1 TL", i: "Knoblauch, Paprika, Pfeffer, Cayenne, Zucker" },
      { a: "optional", i: "etwas Tabasco" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "5 min", temp: "—", text: "Buttermilch mit Salz und Gewürzen verrühren.", bullets: ["Das Salz ist hier auch ein Brine"] },
      { label: "Marinieren", kind: "marinate", dur: "4–24 h", temp: "Kühlschrank", text: "Geflügel vollständig in die Buttermilch tauchen.", bullets: ["Über Nacht ist ideal", "Säure und Salz machen das Fleisch zart und würzen durch"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Abtropfen lassen, dann grillen, smoken oder panieren und braten.", bullets: [] },
    ],
    tips: ["Die beste Basis für knuspriges Fried Chicken.", "Auch für ganze Hähnchen vor dem Smoken."],
  }),
  r({
    id: "marinade-bulgogi", name: "Bulgogi-Marinade (Koreanisch)", method: "marinaden", cat: "Rind", diff: 1,
    time: "Ziehzeit 2–12 h", pit: "ca. 1 kg", core: "", wood: "Sojasoße · Birne", yield: "ca. 250 ml",
    blurb: "Süß-herzhaft mit Birne, Sesam und Knoblauch – die koreanische Marinade für hauchdünn geschnittenes Rind.",
    ingredients: [
      { a: "6 EL", i: "Sojasoße" },
      { a: "½", i: "Birne oder Apfel (gerieben – macht zart)" },
      { a: "3 EL", i: "brauner Zucker oder Honig" },
      { a: "2 EL", i: "Sesamöl" },
      { a: "je 1 EL", i: "Knoblauch, Ingwer, gerösteter Sesam" },
      { a: "2", i: "Frühlingszwiebeln" },
    ],
    phases: [
      { label: "Verrühren", kind: "prep", dur: "10 min", temp: "—", text: "Birne reiben, mit allen Zutaten verrühren.", bullets: ["Die Enzyme der Birne machen das Fleisch besonders zart"] },
      { label: "Marinieren", kind: "marinate", dur: "2–12 h", temp: "Kühlschrank", text: "Dünn geschnittenes Rind (oder Schwein) einlegen.", bullets: ["Sehr dünn schneiden (gefroren anschneiden)"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Sehr heiß und kurz grillen oder in der Pfanne/Plancha braten.", bullets: ["Auf dem Seitenkocher in der heißen Gusspfanne ideal"] },
    ],
    tips: ["Klassisch mit Reis, Salatblättern zum Wickeln und Kimchi.", "Funktioniert auch hervorragend mit Schweinenacken (Dwaeji Bulgogi)."],
  }),
  r({
    id: "marinade-rotwein-wild", name: "Rotwein-Wacholder-Marinade (Wild)", method: "marinaden", cat: "Wild", diff: 2,
    time: "Ziehzeit 12–48 h", pit: "ca. 1,5 kg", core: "", wood: "Rotwein · Wacholder", yield: "ca. 500 ml",
    blurb: "Kräftig und aromatisch – die klassische Beize für Reh, Hirsch und Wildschwein, mildert den Wildgeschmack.",
    ingredients: [
      { a: "400 ml", i: "kräftiger Rotwein" },
      { a: "4 EL", i: "Öl" },
      { a: "2 EL", i: "Rotweinessig" },
      { a: "1", i: "Zwiebel, 2 Knoblauchzehen, 1 Karotte (grob)" },
      { a: "je 1 TL", i: "Wacholderbeeren, Pfefferkörner, Lorbeer, Thymian, Piment" },
    ],
    phases: [
      { label: "Beize ansetzen", kind: "prep", dur: "10 min", temp: "—", text: "Wein, Öl, Essig, Gemüse und Gewürze verrühren.", bullets: ["Gewürze leicht anquetschen für mehr Aroma"] },
      { label: "Beizen", kind: "marinate", dur: "12–48 h", temp: "Kühlschrank", text: "Wildfleisch vollständig in die Beize legen, täglich wenden.", bullets: ["Lange Beize mildert kräftigen Wildgeschmack", "Vollständig bedeckt halten"] },
      { label: "Verwenden", kind: "finish", dur: "—", temp: "—", text: "Fleisch trocken tupfen, grillen oder schmoren. Beize abgeseiht als Soßenbasis verwenden.", bullets: ["Beize vor dem Verwenden in der Soße aufkochen"] },
    ],
    tips: ["Wildschwein immer komplett durchgaren (mind. 75 °C).", "Die abgeseihte Beize ergibt eine herrliche Wildsoße."],
  }),

];

if (typeof window !== "undefined") {
  window.WSM_DATA = { METHODS, METHOD_TAG, DIFF, PHASE_KIND, RECIPES };
}

})();
