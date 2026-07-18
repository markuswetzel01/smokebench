// Smokebench Academy – Hintergrundwissen-Artikel. Bilingual via getAcademyData(isEnglish).
window.getAcademyData = function (en) {
  const t = (de, e) => (en ? e : de);
  return [
    {
      id: 'historisches', icon: '📜', title: t('Historisches', 'History'),
      articles: [
        {
          id: 'hist-schinken-1900', title: t('Wie Schinken vor 100 Jahren gepökelt wurde', 'How ham was cured 100 years ago'),
          teaser: t('Ein Originalverfahren aus einem alten Rezeptbuch: Trockenpökeln, Starklake, wöchentliche Eiprobe.', 'An original method from an old recipe book: dry-curing, a strong brine, weekly egg test.'),
          related: ['schwarzwaelder-schinken'],
          body: [
            { h: t('Das Originalverfahren', 'The original method'), p: [
              t('Ein großer Schinken (ca. 5,5 kg) wird zuerst gewogen — der Gewichtsverlust dient später als Reifemaß. Etwa 675 g Meersalz werden gründlich eingerieben, besonders in Knochen, Gelenke und Hohlräume. Über Nacht wird der Schinken beschwert, damit Blut und Fleischsaft austreten.', 'A large ham (approx. 5.5 kg) is weighed first — the later weight loss serves as a maturing gauge. About 675 g of sea salt is rubbed in thoroughly, especially into bones, joints and cavities. Overnight the ham is weighted down so blood and meat juice drain off.'),
              t('Danach kommt der Schinken für 28 Tage in eine Starklake aus 2 l Wasser, 1 kg Meersalz, 1 EL Natron, Salpeter (oder alternativ Vitamin C), 2 l Weißwein, Piment und Pfefferkörnern. Alle 4–5 Tage wird die Lake umgerührt und Brett samt Gewicht mit kochendem Wasser übergossen; wöchentlich prüft ein frisches Ei den Salzgehalt — sinkt es zu tief ein, wird nachgesalzen.', 'It then goes into a strong brine for 28 days: 2 L water, 1 kg sea salt, 1 tbsp baking soda, saltpeter (or vitamin C as an alternative), 2 L white wine, allspice and peppercorns. Every 4–5 days the brine is stirred and the weighting board is scalded with boiling water; weekly, a fresh egg tests the salt level — if it sinks too deep, more salt is added.'),
              t('Nach 28 Tagen wird der Schinken abgebürstet und etwa eine Woche kühl abgehängt, bevor er geräuchert, luftgetrocknet oder gekocht wird.', 'After 28 days the ham is brushed off and hung to cool for about a week before smoking, air-drying, or cooking.'),
            ]},
            { h: t('Was heute anders gemacht wird', 'What is done differently today'), p: [
              t('Das Verfahren war für seine Zeit sehr durchdacht — Trockenpökeln vor dem Einlegen, regelmäßiges Umrühren, hygienische Reinigung der Gewichte gehören noch heute zum guten Handwerk. Fünf Punkte würde man heute anders lösen:', 'The method was remarkably sound for its time — dry-curing before brining, regular stirring, and hygienic cleaning of the weights are still good craft today. Five points would be handled differently now:'),
            ], table: {
              head: [t('Damals', 'Then'), t('Heute', 'Now')],
              rows: [
                [t('Salpeter', 'Saltpeter'), t('Nitritpökelsalz (NPS) — sicherer, reproduzierbar, farbstabil', 'Curing salt / sodium nitrite — safer, reproducible, stable color')],
                [t('Ei als Salzmesser', 'Egg as a salt gauge'), t('Salzgehalt in % oder mit dem Refraktometer messen', 'Measure salt % or use a refractometer')],
                [t('Lake regelmäßig umrühren', 'Regularly stirring the brine'), t('Meist unnötig — moderne Kühlschränke arbeiten konstanter', 'Usually unnecessary — modern fridges run more consistently')],
                [t('Keine feste Temperaturangabe', 'No fixed temperature given'), t('2–5 °C während der gesamten Pökelzeit', '2–5 °C for the entire curing period')],
                [t('Starklake (~20 % Salz)', 'Strong brine (~20% salt)'), t('Meist 10–14 % Salz, länger gepökelt, gleichmäßiger und weniger salzig', 'Usually 10–14% salt, cured longer, more even and less salty')],
              ],
            }},
          ],
        },
        {
          id: 'hist-salpeter', title: t('Warum früher Salpeter verwendet wurde', 'Why saltpeter was used in the past'),
          teaser: t('Vor dem NPS: wie Kaliumnitrat zufällig entdeckt wurde und die Fleischfärbung veränderte.', 'Before curing salt: how potassium nitrate was discovered by accident and changed meat color.'),
          related: [],
          body: [
            { h: t('Ein Zufallsfund', 'An accidental discovery'), p: [
              t('Schon in der Antike fiel auf, dass Fleisch, das mit salpeterhaltigem Salz (oft durch natürliche Verunreinigung) gepökelt wurde, eine appetitliche rote statt graue Farbe behielt und länger haltbar war. Über Jahrhunderte wurde Salpeter (Kaliumnitrat) deshalb gezielt zugesetzt, ohne dass man die Chemie dahinter verstand.', 'Even in antiquity it was noticed that meat cured with saltpeter-contaminated salt kept an appetizing red color instead of turning gray, and lasted longer. For centuries, saltpeter (potassium nitrate) was therefore added deliberately, without anyone understanding the chemistry behind it.'),
              t('Erst im 20. Jahrhundert wurde klar: Bakterien wandeln Nitrat in Nitrit um, und Nitrit ist der eigentliche Wirkstoff — es hemmt Botulismus-Bakterien und sorgt für die Umrötung. Da dieser Umweg über Bakterien unzuverlässig ist, wird heute direkt Nitritpökelsalz verwendet: präziser dosiert und ohne Umweltfaktoren.', 'Only in the 20th century did it become clear: bacteria convert nitrate into nitrite, and nitrite is the actual active agent — it inhibits botulism bacteria and causes the curing color change. Because this bacterial detour is unreliable, curing salt with sodium nitrite is used directly today: more precisely dosed and independent of environmental factors.'),
            ]},
          ],
        },
      ],
    },
    {
      id: 'poekelwissen', icon: '🧂', title: t('Pökelwissen', 'Curing knowledge'),
      articles: [
        {
          id: 'poekel-nps', title: t('Warum Nitritpökelsalz?', 'Why cure with sodium nitrite?'),
          teaser: t('Die drei Aufgaben von NPS: Farbe, Aroma, Sicherheit.', 'The three jobs of curing salt: color, flavor, safety.'),
          related: ['schwarzwaelder-schinken', 'coppa'],
          body: [
            { h: t('Drei Aufgaben in einem Salz', 'Three jobs in one salt'), p: [
              t('Nitritpökelsalz (NPS, meist 0,4–0,5 % Natriumnitrit in Speisesalz) übernimmt drei Aufgaben gleichzeitig: Es hemmt das Wachstum von Clostridium botulinum, dem Erreger des Botulismus — besonders wichtig bei Räucherwaren, die lange bei niedrigen Temperaturen reifen. Es sorgt für die stabile, appetitliche Umrötung (Pökelrosa) durch die Bindung an den Muskelfarbstoff Myoglobin. Und es trägt zum typischen „Pökelaroma" bei, das Rohschinken und Salami von ungepökeltem Fleisch unterscheidet.', 'Curing salt (typically 0.4–0.5% sodium nitrite in table salt) does three jobs at once: it inhibits the growth of Clostridium botulinum, the bacterium responsible for botulism — especially important for smoked goods that mature slowly at low temperatures. It produces the stable, appetizing pink color (cured color) by binding to the muscle pigment myoglobin. And it contributes to the characteristic "cured flavor" that sets dry-cured ham and salami apart from uncured meat.'),
              t('Die Dosierung ist deshalb kein Kann, sondern ein Muss bei allem, was kalt geräuchert oder lange luftgetrocknet wird — zu wenig schützt nicht ausreichend, zu viel ist gesundheitsschädlich. Deshalb rechnet Smokebench die Menge für dich exakt aus.', 'The dosage is therefore not optional but mandatory for anything cold-smoked or long air-dried — too little does not protect adequately, too much is harmful to health. That is why Smokebench calculates the exact amount for you.'),
            ]},
          ],
        },
        {
          id: 'poekel-trocken-nass', title: t('Trockenpökeln vs. Nasspökeln', 'Dry curing vs. wet curing'),
          teaser: t('Zwei Grundtechniken, zwei völlig unterschiedliche Ergebnisse.', 'Two basic techniques, two very different results.'),
          related: ['guanciale', 'pastrami'],
          body: [
            { h: t('Zwei Wege zum gleichen Ziel', 'Two paths to the same goal'), p: [
              t('Beim Trockenpökeln wird das Fleisch direkt mit Salz (und NPS, Zucker, Gewürzen) eingerieben. Das Salz entzieht per Osmose Feuchtigkeit, die austritt und abgetupft oder abgetropft wird. Trockenpökeln ist die Methode der Wahl für Rohschinken, Speck und Salami — das Ergebnis ist eine feste, konzentrierte Textur mit intensivem Aroma.', 'In dry curing, the meat is rubbed directly with salt (plus curing salt, sugar, spices). The salt draws out moisture by osmosis, which is then blotted or drained off. Dry curing is the method of choice for dry-cured ham, bacon and salami — the result is a firm, concentrated texture with intense flavor.'),
              t('Beim Nasspökeln (Lake) liegt das Fleisch in einer Salzlösung, oft mit Zucker und Gewürzen. Die Lake dringt gleichmäßig ins Gewebe ein und macht das Fleisch saftiger — ideal für Kochschinken, Pastrami oder Corned Beef, die anschließend gegart werden. Nasspökeln geht schneller, weil die Diffusion in beide Richtungen läuft.', 'In wet curing (brining), the meat sits in a salt solution, often with sugar and spices. The brine penetrates the tissue evenly and makes the meat juicier — ideal for cooked ham, pastrami or corned beef, which are then cooked. Wet curing works faster because diffusion runs in both directions.'),
              t('Manche historischen Verfahren (wie im Schinken-Artikel oben) kombinieren beides: erst kurz trocken pökeln, um Flüssigkeit zu entziehen, dann lange in der Lake ziehen lassen.', 'Some historical methods (like the ham article above) combine both: a short dry cure first to draw out liquid, then a long soak in brine.'),
            ]},
          ],
        },
        {
          id: 'poekel-gleichgewicht', title: t('Gleichgewichtspökeln erklärt', 'Equilibrium curing explained'),
          teaser: t('Warum moderne Rezepte mit Prozentangaben statt Rezeptmengen arbeiten.', 'Why modern recipes use percentages instead of fixed amounts.'),
          related: [],
          body: [
            { h: t('Salz nach Gewicht statt nach Gefühl', 'Salt by weight, not by feel'), p: [
              t('Beim klassischen Pökeln wird Salz „nach Erfahrung" zugegeben und dann so lange gewartet, bis es passt — mit dem Risiko, zu salzig oder zu fad zu pökeln. Gleichgewichtspökeln (Equilibrium Curing) berechnet Salz und NPS als exakten Prozentsatz vom Fleischgewicht (typisch 2–2,5 % Salz, 0,25 % Nitrit).', 'In classic curing, salt is added "by experience" and then you wait until it seems right — with the risk of curing too salty or too bland. Equilibrium curing calculates salt and curing salt as an exact percentage of the meat weight (typically 2–2.5% salt, 0.25% nitrite).'),
              t('Der Vorteil: Ist das Fleisch (in einem Vakuumbeutel) einmal komplett durchgezogen, kann der Salzgehalt nicht mehr steigen — überpökeln ist praktisch unmöglich, weil das Salz sich einfach gleichmäßig verteilt (daher der Name) und nicht mehr entzieht als vorhanden ist. Das macht die Methode besonders anfängerfreundlich und ist die Basis für Smokebenchs Mengen-Rechner.', 'The advantage: once the meat (in a vacuum bag) has fully equalized, the salt content cannot rise any further — over-curing is practically impossible, because the salt simply distributes evenly (hence the name) and cannot draw out more than is present. That makes the method especially beginner-friendly, and it is the basis for Smokebench\'s amount calculator.'),
            ]},
          ],
        },
      ],
    },
    {
      id: 'reifung', icon: '🌡', title: t('Reifung', 'Maturing'),
      articles: [
        {
          id: 'reif-klima', title: t('Warum 12–14 °C?', 'Why 12–14 °C?'),
          teaser: t('Das Klimafenster, in dem Rohschinken und Salami sicher reifen.', 'The climate window in which dry-cured ham and salami mature safely.'),
          related: ['coppa', 'guanciale'],
          body: [
            { h: t('Ein schmales Fenster', 'A narrow window'), p: [
              t('Die klassische Reifetemperatur von 12–14 °C bei 70–80 % Luftfeuchte ist ein Kompromiss zwischen zwei Gefahren: Zu warm (über 18 °C), und unerwünschte Fäulnisbakterien und Schimmelarten gewinnen den Wettlauf gegen die erwünschte, langsame enzymatische Reifung. Zu kalt (unter 8 °C), und die Reifung — die von Enzymen und erwünschten Reifekulturen getragen wird — kommt praktisch zum Stillstand.', 'The classic maturing temperature of 12–14 °C at 70–80% humidity is a compromise between two dangers: too warm (above 18 °C) and unwanted spoilage bacteria and mold species win the race against the desired slow enzymatic maturing. Too cold (below 8 °C) and maturing — driven by enzymes and desirable curing cultures — essentially stops.'),
              t('Die Luftfeuchte ist genauso entscheidend: Zu trocken, und die Oberfläche verhärtet (Trockenrand/Case Hardening), bevor das Innere durchgereift ist — die Feuchte kann dann nicht mehr entweichen. Zu feucht, und unerwünschter Schimmel siedelt sich an. Deshalb ist eine Reifekammer mit kontrolliertem Klima der entscheidende Baustein für gleichmäßige, sichere Ergebnisse.', 'Humidity is just as critical: too dry, and the surface hardens (case hardening) before the inside has fully matured — moisture can then no longer escape. Too humid, and unwanted mold takes hold. That is why a climate-controlled aging chamber is the key building block for consistent, safe results.'),
            ]},
          ],
        },
        {
          id: 'reif-schimmel', title: t('Weißschimmel oder Verderb?', 'Beneficial white mold or spoilage?'),
          teaser: t('Wie man erwünschten Edelschimmel von gefährlichem Fehlbefall unterscheidet.', 'How to tell desirable noble mold from dangerous contamination.'),
          related: [],
          body: [
            { h: t('Nicht jeder Belag ist ein Problem', 'Not every coating is a problem'), p: [
              t('Ein feiner, weißer, mehlig-samtiger Belag auf Rohschinken oder Salami ist meist erwünschter Edelschimmel (oft Penicillium-Arten) — er schützt vor unerwünschten Keimen, reguliert die Feuchte und trägt zum Aroma bei. Er lässt sich leicht abwischen und riecht neutral bis leicht pilzig-nussig.', 'A fine, white, powdery-velvety coating on dry-cured ham or salami is usually desirable noble mold (often Penicillium species) — it protects against unwanted microbes, regulates moisture, and contributes to flavor. It wipes off easily and smells neutral to slightly mushroom-nutty.'),
              t('Warnzeichen für Fehlbefall sind: grüner, schwarzer, orangener oder pink-roter Belag, ein watteartig-schleimiger statt pudriger Belag, stechender oder fauliger Geruch, sowie Schleimbildung auf der Fleischoberfläche selbst. Im Zweifel gilt: lieber entsorgen als riskieren — verlässlich unterscheiden kann man das nur mit Erfahrung, im Zweifel eine Fachperson fragen.', 'Warning signs of contamination are: green, black, orange, or pink-red coloring, a cottony-slimy rather than powdery texture, a pungent or putrid smell, and slime forming on the meat surface itself. When in doubt: discard rather than risk it — reliable distinction takes experience, so ask an expert if unsure.'),
            ]},
          ],
        },
      ],
    },
    {
      id: 'raeucherwissen', icon: '🔥', title: t('Räucherwissen', 'Smoking knowledge'),
      articles: [
        {
          id: 'raeuch-methoden', title: t('Kalt-, Warm- und Heißräuchern im Vergleich', 'Cold, warm and hot smoking compared'),
          teaser: t('Gleiches Prinzip, drei völlig unterschiedliche Temperaturbereiche und Ergebnisse.', 'Same principle, three very different temperature ranges and results.'),
          related: ['schwarzwaelder-schinken', 'pastrami'],
          body: [
            { h: t('Drei Bereiche, drei Zwecke', 'Three ranges, three purposes'), p: [
              t('Kalträuchern (max. 25 °C, meist 15–22 °C) gart das Fleisch nicht — es dient allein der Konservierung und Aromatisierung von bereits gepökeltem Fleisch, das anschließend noch reift oder trocknet, wie Rohschinken und Salami. Dauer: Stunden bis mehrere Tage, oft über Wochen wiederholt.', 'Cold smoking (max 25 °C, usually 15–22 °C) does not cook the meat — it serves purely to preserve and flavor already-cured meat that then continues to mature or dry, like dry-cured ham and salami. Duration: hours to several days, often repeated over weeks.'),
              t('Warmräuchern (25–50 °C) liegt dazwischen: Das Fleisch wird angewärmt, aber nicht durchgegart — eine Übergangszone, die seltener eigenständig, sondern meist als Vorstufe zum Heißräuchern genutzt wird.', 'Warm smoking (25–50 °C) sits in between: the meat is warmed but not fully cooked — a transitional zone rarely used on its own, more often as a step toward hot smoking.'),
              t('Heißräuchern (60–120 °C und mehr) gart das Fleisch tatsächlich durch, während gleichzeitig Rauchgeschmack aufgenommen wird — der Ansatz für sofort essfertige Räucherwaren wie heißgeräucherten Bauch, Pulled Pork oder Pastrami. Dauer: Stunden statt Tage.', 'Hot smoking (60–120 °C and above) actually cooks the meat through while it simultaneously picks up smoke flavor — the approach for ready-to-eat smoked goods like hot-smoked belly, pulled pork, or pastrami. Duration: hours rather than days.'),
            ]},
          ],
        },
        {
          id: 'raeuch-holz', title: t('Holzarten und ihre Rauchnote', 'Wood types and their smoke flavor'),
          teaser: t('Warum Buche das Allround-Holz ist und wann sich Obstholz oder Hickory lohnt.', 'Why beech is the all-round wood, and when fruit wood or hickory is worth it.'),
          related: [],
          body: [
            { h: t('Nicht jedes Holz passt zu jedem Fleisch', 'Not every wood suits every meat'), p: [
              t('Buche ist in Europa das klassische Räucherholz: mild, leicht süßlich, dominiert nicht — passt zu praktisch allem und ist deshalb der sichere Standard. Eiche ist kräftiger und würziger, ideal für Rind (Pastrami, Brisket). Obsthölzer wie Apfel oder Kirsche sind milder und leicht fruchtig-süß, gut zu Geflügel und Fisch. Hickory (typisch amerikanisch) ist intensiv-rauchig-bacon-artig und verträgt sich gut mit Schweinefleisch in großen Stücken, kann aber schnell dominieren.', 'Beech is the classic European smoking wood: mild, slightly sweet, never dominates — it suits practically everything and is therefore the safe standard. Oak is stronger and spicier, ideal for beef (pastrami, brisket). Fruit woods like apple or cherry are milder and slightly fruity-sweet, good with poultry and fish. Hickory (typically American) is intensely smoky and bacon-like, and pairs well with large cuts of pork, though it can quickly become overpowering.'),
              t('Nadelhölzer wie Fichte oder Kiefer gehören NICHT ins Räucherfeuer — ihr hoher Harzanteil erzeugt bitteren, teerigen Rauch. Die einzige Ausnahme: Wacholderzweige/-beeren werden traditionell in kleinen Mengen dem Buchenrauch beigemischt, für die charakteristische Schwarzwälder-Note.', 'Softwoods like spruce or pine do NOT belong in the smoker fire — their high resin content produces bitter, tarry smoke. The one exception: juniper twigs/berries are traditionally added in small amounts to beech smoke, for the characteristic Black Forest note.'),
            ]},
          ],
        },
      ],
    },
    {
      id: 'fleischkunde', icon: '🥩', title: t('Fleischkunde', 'Meat cuts'),
      articles: [
        {
          id: 'fleisch-schwein', title: t('Die wichtigsten Teilstücke vom Schwein', 'The key pork cuts'),
          teaser: t('Nacken, Bauch, Keule, Backe — welches Stück für welche Räuchertechnik.', 'Neck, belly, leg, cheek — which cut for which smoking technique.'),
          related: ['coppa', 'guanciale'],
          body: [
            { h: t('Vom Kopf bis zur Keule', 'From head to leg'), p: [
              t('Schweinebacke (für Guanciale) ist stark marmoriert und fettreich — ideal für langsam luftgetrocknete Spezialitäten ohne Rauch. Nacken (für Coppa oder Pulled Pork) ist durchzogen und saftig, verzeiht Fehler beim Garen und ist damit ein Anfänger-freundliches Stück. Bauch (für Bacon, Pancetta) hat einen hohen Fettanteil in Schichten und eignet sich für Trocken- wie Nasspökeln gleichermaßen.', 'Pork cheek (for guanciale) is heavily marbled and fat-rich — ideal for slowly air-dried specialties without smoke. Neck (for coppa or pulled pork) is well-marbled and juicy, forgiving of cooking mistakes and thus a beginner-friendly cut. Belly (for bacon, pancetta) has a high fat content in layers and works equally well for dry curing and wet curing.'),
              t('Die Keule (für Rohschinken wie Schwarzwälder oder Parmaschinken) ist das größte, magerste Stück und braucht die längste Reifezeit — Monate statt Wochen. Sie verlangt am meisten Erfahrung, weil Knochen und Gelenke Hohlräume bilden, in denen Salz schwerer hinkommt und Verderb leichter entstehen kann.', 'The leg (for dry-cured hams like Black Forest ham or Parma ham) is the largest, leanest cut and needs the longest maturing time — months rather than weeks. It demands the most experience, because bones and joints create cavities that are harder for salt to reach and where spoilage can more easily take hold.'),
            ]},
          ],
        },
        {
          id: 'fleisch-coppa-detail', title: t('Coppa: Herkunft und Besonderheit', 'Coppa: origin and character'),
          teaser: t('Warum der Nacken für Rohschinken so gut geeignet ist.', 'Why the neck is so well suited to dry-curing.'),
          related: ['coppa'],
          body: [
            { h: t('Ein italienischer Klassiker aus dem Nacken', 'An Italian classic from the neck'), p: [
              t('Coppa (auch Capocollo genannt) stammt ursprünglich aus Mittelitalien und wird traditionell trocken gepökelt, in Naturdarm gebunden und mehrere Wochen luftgetrocknet — historisch ganz ohne Nitrit, allein mit Meersalz, Pfeffer und Zeit. Die feine Marmorierung des Nackenstücks macht Coppa besonders saftig im Vergleich zu magereren Rohschinken-Sorten.', 'Coppa (also called capocollo) originally comes from central Italy and is traditionally dry-cured, tied in natural casing, and air-dried for several weeks — historically with no nitrite at all, using only sea salt, pepper, and time. The fine marbling of the neck cut makes coppa notably juicier compared to leaner dry-cured hams.'),
              t('Moderne Rezepte ergänzen meist Nitritpökelsalz als Sicherheitsnetz gegen Botulismus, weil die langen Reifezeiten bei niedrigen Temperaturen ein reales Risiko darstellen — der Geschmacksunterschied zum historischen Original ist dabei minimal.', 'Modern recipes usually add curing salt with sodium nitrite as a safety net against botulism, because the long maturing times at low temperatures present a real risk — the flavor difference from the historical original is minimal.'),
            ]},
          ],
        },
      ],
    },
  ];
};
