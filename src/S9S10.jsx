import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GREEN = "#2d6a4f";

const MEAL_COLORS = {
  "Masa 1":  { bg:"#fff8e1", border:"#ffe082", dot:"#f59e0b", lbl:"#92700a" },
  "Masa 2":  { bg:"#e8f4fd", border:"#90caf9", dot:"#2196f3", lbl:"#1565c0" },
  "Masa 3":  { bg:"#f3e8fd", border:"#ce93d8", dot:"#9c27b0", lbl:"#6a1b9a" },
  "Gustare": { bg:"#e8f5e9", border:"#a5d6a7", dot:"#4caf50", lbl:"#2e7d32" },
};

// ─── SUB-RECIPES ──────────────────────────────────────────────────────────────
const SUB_RECIPES = {
  sosUsturoi: {
    name: "Sos de usturoi", emoji: "🧄",
    note: "1 portie | Prep 5 min",
    ing: [
      ["Iaurt grecesc 2% Zuzu Divin", "75g"],
      ["Zeama de lamaie", "2ml"],
      ["Usturoi", "1 catel (5g)"],
      ["Ulei de masline", "1ml"],
      ["Condimente", "2g"],
    ],
    steps: [
      "Curata si pisaza usturoiul, amesteca-l foarte bine cu uleiul de masline pana se formeaza o pasta.",
      "Adauga iaurtul grecesc si putina zeama de lamaie.",
      "Amesteca bine si potriveste cu sare si piper.",
    ],
    tips: "Recomand iaurt grecesc Zuzu Divin — foarte fin si cremos. Pastreaza sosul la frigider acoperit cu folie alimentara. Rezista 3-4 zile.",
  },

  cordonBleu: {
    name: "Cordon bleu la cuptor - varianta healthy @34FIT__", emoji: "🍗",
    note: "2 portii | Prep 10 min | Gatire 20 min",
    ing: [
      ["Piept de pui - Lidl", "300g"],
      ["Sunca porc Sisi", "40g"],
      ["Cascaval - Pilos", "2 x Felie (40g)"],
      ["Faina alba", "10g"],
      ["Ou de gaina", "1 Ou mediu M (60g)"],
      ["Fulgi de porumb", "40g"],
      ["Coconut cooking spray GymBeam", "2g"],
    ],
    steps: [
      "Am marunțit fulgii de porumb cu un sucitor din lemn.",
      "Pieptul de pui l-am taiat fasii de grosimea unui deget si l-am condimentat cu sare si piper.",
      "Peste pui se aseaza o folie de plastic/punga si se bat feliile cu un ciocan, pana se obtine o felie subtire.",
      "Peste felia batuta se aseaza 2 felii de sunca si o felie de cascaval, iar apoi se impatura in doua.",
      "Am batut un ou cu putina sare si piper.",
      "Am dat pe rand cordonul prin faina, prin ou si prin fulgii de porumb marunțiti, iar apoi l-am asezat pe o tava tapetata in prealabil cu foaie de copt.",
      "Am introdus la cuptor pe modul cu ventilatie la 180 de grade pentru 15-20 de minute.",
      "La jumatatea timpului se pulverizeaza putin spray de cocos peste cordon bleu.",
    ],
    tips: "Daca vrei ca preparatul sa fie crocant si a doua zi, introdu-l la cuptor pentru 5 min. pe modul cu ventilatie. Puiul poate fi inlocuit cu curcan. Sunca de porc poate fi inlocuita cu sunca de pui.",
  },

  salataCruditati: {
    name: "Salata de cruditati", emoji: "🥗",
    note: "1 portie | Prep 5 min",
    ing: [
      ["Salata verde", "100g"],
      ["Castraveti", "50g"],
      ["Ridichi rosii", "30g"],
      ["Rosii", "50g"],
      ["Ceapa verde", "30g"],
      ["Otet din vin alb Clever", "10g"],
      ["Condimente", "3g"],
    ],
    steps: [
      "Am spalat legumele.",
      "Am taiat legumele si le-am pus intr-un bol.",
      "Am asezonat cu sare si am amestecat.",
      "Am adaugat otetul si am amestecat din nou.",
    ],
    tips: "Ai libertatea sa folosesti orice legume doresti, in ce cantitati doresti deoarece aceste legume sunt slab calorice. Iti recomand sa faci o salata cat mai colorata si cat mai mare. Otetul alb poate fi inlocuit cu zeama de lamaie sau cu otet balsamic.",
  },
};

// ─── MEALS ────────────────────────────────────────────────────────────────────
const MEALS = {
  sandwichCald: {
    meal: "Masa 1", name: "Sandwich cald cu sunca si cascaval",
    ing: [
      ["Paine toast integral Tastino (2 felii)", "50g", "50g"],
      ["Cream Spread Light - Pilos", "30g", "30g"],
      ["Sunca de porc Dulano Lidl", "40g", "40g"],
      ["Cascaval - Pilos", "1 Felie (20g)", "1 Felie (20g)"],
      ["Sos chili Siracha (optional)", "3g", "3g"],
    ],
    tot: { n: { p:"19.47g", c:"23.25g", f:"9.49g", k:"262" }, a: { p:"19.47g", c:"23.25g", f:"9.49g", k:"262" } },
    steps: [
      "Intinde crema de branza pe cele 2 felii de paine toast.",
      "Pune pe o felie sunca, cascavalul ras, iar apoi pune cealalta felie de paine.",
      "Rumeneste sandwichul intr-o tigaie antiaderenta, pe ambele parti sau foloseste un sandwich-maker.",
      "Dupa ce ai scos sandwichul adauga putin sos siracha.",
    ],
    tips: "Poti folosi orice alt tip de cascaval (mozzarella, cascaval afumat, cheddar), iar sunca poti sa o inlocuiesti cu ceva asemanator, cu continut ridicat de proteina si scazut de grasimi (muschi file, muschi afumat crud uscat, prosciuto crudo).",
  },

  puiShanghaiN: {
    meal: "Masa 2", name: "Pui Shanghai cu sos de usturoi", sub: ["sosUsturoi"],
    ing: [
      ["Piept de pui - Lidl", "150g", "150g"],
      ["Seminte de susan", "30g", "30g"],
      ["Faina integrala", "15g", "15g"],
      ["Ou de gaina", "0.5 Ou mediu M (30g)", "0.5 Ou mediu M (30g)"],
      ["Sos de soia - Vifon", "10g", "10g"],
      ["Ulei de masline", "3ml", "3ml"],
      ["Zeama de lamaie", "5ml", "5ml"],
      ["Condimente", "5g", "5g"],
      ["— Sos de usturoi —", "—", "—"],
      ["Iaurt grecesc 2% Zuzu Divin", "75g", "75g"],
      ["Zeama de lamaie", "2ml", "2ml"],
      ["Usturoi", "1 catel (5g)", "1 catel (5g)"],
      ["Ulei de masline", "1ml", "1ml"],
      ["Condimente", "2g", "2g"],
    ],
    tot: { n: { p:"51.34g", c:"23.93g", f:"25.62g", k:"526" }, a: { p:"51.34g", c:"23.93g", f:"25.62g", k:"526" } },
    steps: [
      "Pentru marinat puiul: amesteca intr-un bol sosul de soia cu uleiul de masline, zeama de lamaie, condimente dupa gust, usturoi granulat, boia dulce, piper (nu mai punem sare pentru ca sosul de soia este deja sarat).",
      "Taie pieptul de pui in fasii mai mici si pune-le intr-un bol impreuna cu ingredientele pentru marinada. Acopera bolul cu o folie de plastic si lasa puiul la marinat, la frigider, pentru cel putin o ora.",
      "Ai nevoie de 2 farfurii plate si o farfurie adanca: pune separat faina si susanul in farfuriile plate, iar in farfuria adanca bate oul cu o furculita.",
      "Dupa ce s-a marinat puiul, da fasiile de pui prin faina (scutura-le un pic pentru a elimina excesul de faina), apoi prin ou, la final prin susan si pune-le intr-o tava acoperita cu foaie de copt.",
      "Baga tava la cuptorul preincalzit la 180°C pentru 20-25 minute, intoarce la jumatatea timpului.",
      "Pentru sosul de usturoi: curata si pisaza usturoiul, amesteca-l cu uleiul de masline pana se formeaza o pasta. Adauga iaurtul grecesc, putina zeama de lamaie, sare si piper si amesteca bine.",
    ],
    tips: "Te sfatuiesc sa dai toate fasiile de pui prin faina, apoi sa continui cu restul pasilor. Iti va fi mult mai usor si nu te vei murdari atat de mult pe degete. Daca pregatesti pentru mai multe zile, in urmatoarele zile, reintrodu puiul in cuptorul preincalzit la 180 de grade, pe functia grill, pentru cateva minute, iar acesta va redeveni crocant.",
  },

  salataCaesarA: {
    meal: "Masa 3", name: "Salata Caesar cu parmezan si crutoane",
    ing: [
      ["Piept de pui - Lidl", "100g", "200g"],
      ["Condimente", "5g", "5g"],
      ["Ulei de masline", "3ml", "3ml"],
      ["Zuzu Stors 2%", "50g", "50g"],
      ["Usturoi", "1 catel (5g)", "1 catel (5g)"],
      ["Ulei de masline", "2ml", "2ml"],
      ["Sare himalaya", "1g", "1g"],
      ["Piper negru", "1g", "1g"],
      ["Zeama de lamaie", "5ml", "5ml"],
      ["Salata iceberg", "100g", "100g"],
      ["Rosii (o bucata)", "100g", "100g"],
      ["Castraveti (doua bucati)", "100g", "100g"],
      ["Ceapa rosie (un sfert)", "10g", "10g"],
      ["Parmezan", "5g", "30g"],
      ["Crutoane", "10g", "10g"],
    ],
    tot: { n: { p:"32.63g", c:"22.93g", f:"10.06g", k:"312" }, a: { p:"64.26g", c:"23.96g", f:"18.21g", k:"524" } },
    steps: [
      "Pieptul de pui, fara sa il tai il condimentezi cu sare, piper, boia, fulgi chilli, usturoi granulat si ulei de masline.",
      "Introdu la cuptor pieptul de pui, intr-un vas de yena pentru aproximativ 25 min. la 180 de grade.",
      "In ultimele 5 minute, scoate puiul din cuptor si scurge din vas lichidul lasat de pui. Acest pas va ajuta la rumenirea puiului.",
      "Dupa ce puiul este gata scoate-l din cuptor si lasa-l acoperit.",
      "Sosul de usturoi: curata si pisaza usturoiul, amesteca-l cu uleiul de masline pana se formeaza o pasta. Adauga iaurtul grecesc, putina zeama de lamaie, sare si piper.",
      "Intr-un bol incapator, taie salata iceberg bucati mici, adauga rosii, castraveti, ceapa rosie, adauga sosul de usturoi si puiul pe care l-ai taiat fasii.",
      "Condimenteaza cu sare si amesteca foarte bine ingredientele. Optional ca topping poti adauga fasii de parmezan si crutoane.",
    ],
    tips: "",
  },

  gustare09: {
    meal: "Gustare", name: "Gustare: pudding + fructe",
    ing: [
      ["High Protein Vanilla Pudding Milbona", "200g", "200g"],
      ["Fructe la alegere (50 kcal)", "100g", "100g"],
    ],
    tot: { n: { p:"20.3g", c:"22.4g", f:"3.1g", k:"200" }, a: { p:"20.3g", c:"22.4g", f:"3.1g", k:"200" } },
    steps: ["Consuma pudding-ul proteic impreuna cu fructele preferate in limita caloriilor indicate."],
    tips: "Iti recomand sa incerci toate aromele si sa le consumi pe cele care iti plac cel mai mult.",
  },

  wrapPui: {
    meal: "Masa 1", name: "Wrap cu piept de pui afumat",
    ing: [
      ["Piept de pui afumat - Pikok (Lidl)", "100g", "100g"],
      ["Cream Spread Light - Pilos", "30g", "30g"],
      ["Salata iceberg", "30g", "30g"],
      ["Legume asortate (rosii, castraveti, ardei, ridichi, ceapa verde)", "50g", "50g"],
      ["Lipie libaneza Painea Brutarului Lidl", "50g (1 lipie)", "50g (1 lipie)"],
    ],
    tot: { n: { p:"29.4g", c:"39.65g", f:"6.01g", k:"333" }, a: { p:"29.4g", c:"39.65g", f:"6.01g", k:"333" } },
    steps: [
      "Pieptul de pui se taie cubulete.",
      "Pe o lipie am adaugat un strat subtire de crema de branza. Atentie: nu exagera cu crema de branza deoarece va inmui lipia.",
      "Am adaugat felii de salata iceberg, ardei, castravete, ceapa.",
      "Peste legume am presarat putina sare inainte sa rulez lipia.",
      "Impacheteaza lipia intr-o folie si o poti lua la pachet.",
    ],
    tips: "Poti sa adaugi orice legume iti fac placere. Iti recomand sa nu adaugi rosii deoarece vor inmui lipia. La fel de bine salata poate fi inlocuita cu un mix de salata/baby spanac/rucola.",
  },

  pasteTonN: {
    meal: "Masa 2", name: "Paste cu ton si sos de rosii",
    ing: [
      ["Conserva ton Tuna Steak in Brine Nixe Lidl", "100g", "200g"],
      ["Rosii pasate 365", "150g", "150g"],
      ["Usturoi", "2 catei (10g)", "2 catei (10g)"],
      ["Pasta de ardei iute Kania", "2g", "2g"],
      ["Condimente", "3g", "3g"],
      ["Paste integrale fusilli Barilla", "40g", "70g"],
      ["Parmezan Galbani", "10g", "10g"],
    ],
    tot: { n: { p:"36.25g", c:"34.37g", f:"4.4g", k:"334" }, a: { p:"65.15g", c:"53.57g", f:"6.15g", k:"547" } },
    steps: [
      "Am amestecat rosile pasate cu usturoiul pisat, pasta de ardei iute, sare, piper, oregano, busuioc.",
      "Am scurs tonul de apa si l-am adaugat peste sosul de rosii.",
      "Am dat la foc mic si am lasat sa fiarba pentru 5-10 minute, pana cand compozitia a ajuns la consistenta dorita. Am amestecat din cand in cand si am potrivit cu sare si piper.",
      "Am pus pastele la fiert in apa cu sare conform indicatilor de pe ambalaj.",
      "Cand au fiert pastele, le-am scurs de apa si le-am adaugat peste sos.",
      "Am amestecat continuu si am mai lasat la foc mic inca 1-2 minute.",
      "Am servit cu parmezan ras deasupra.",
    ],
    tips: "Condimentele se potrivesc in functie de gustul fiecaruia. Pastele integrale pot fi inlocuite cu gnocchi din cartofi, cu respectarea aceluiasi nr. de calorii.",
  },

  lavaCakeOatsN: {
    meal: "Masa 3", name: "Lava Cake Baked Oats",
    ing: [
      ["Fulgi de ovaz integral Crownfield (Lidl)", "30g", "40g"],
      ["Lapte 1,5% Pilos", "100g", "120g"],
      ["Erytrytol", "10g", "15g"],
      ["Cacao", "5g", "8g"],
      ["Ciocolata neagra 70% Lindt (topita)", "10g", "10g"],
      ["Sare himalaya", "0.1g", "0.1g"],
      ["Esenta de vanilie", "1g", "1g"],
      ["Praf de copt", "1g", "1g"],
      ["Fulgi ciocolata Belbake", "10g", "10g"],
    ],
    tot: { n: { p:"9.62g", c:"36.84g", f:"9.13g", k:"278" }, a: { p:"12.2g", c:"45.64g", f:"10.55g", k:"338" } },
    steps: [
      "Incalzeste cuptorul la 180°C.",
      "Intr-un castron amesteca fulgii de ovaz cu cacao, indulcitorul, un patrazel ciocolata topita in prealabil la microunde, extract de vanilie si praf de copt.",
      "Transfera intr-un vas rezistent la cuptor 3/4 din compozitie, adauga fulgii de ciocolata si acopera cu compozitia ramasa.",
      "Coace timp de 15-20 minute.",
      "Enjoy!",
    ],
    tips: "Ajusteaza cantitatea de indulcitor in functie de gustul tau. Laptele de vaca poate fi inlocuit cu lapte vegetal neindulcit. Daca pregatesti mai multe portii este suficient ca ziua urmatoare sa reintroduci desertul la cuptor pentru cateva minute, iar desertul va fi la fel de gustos.",
  },

  gustare1112: {
    meal: "Gustare", name: "50 calorii din Fructe (la alegere)",
    ing: [
      ["Fructe la alegere in limita a 50 calorii", "100g", "100g"],
    ],
    tot: { n: { p:"0.3g", c:"12g", f:"0.1g", k:"50" }, a: { p:"0.3g", c:"12g", f:"0.1g", k:"50" } },
    steps: ["Poti consuma orice fructe iti fac placere in limita a 50 de calorii."],
    tips: "Poti gasi caloriile/100g pentru toate fructele cautand online. In functie de asta adaptezi gramajul pentru a reprezenta 50 de calorii.",
  },

  budinchiaChia: {
    meal: "Masa 1", name: "Budinca chia cu fructe",
    ing: [
      ["Seminte de chia", "20g", "30g"],
      ["Iaurt grecesc 2% Zuzu Divin", "75g", "150g"],
      ["Lapte Pilos 1,5%", "50ml", "100ml"],
      ["Erytrytol", "10g", "15g"],
      ["Felii fructe (la alegere)", "50g", "100g"],
    ],
    tot: { n: { p:"10.95g", c:"17.87g", f:"8.6g", k:"187" }, a: { p:"20.2g", c:"31.25g", f:"14.1g", k:"324" } },
    steps: [
      "Pune semintele de chia intr-un bol, apoi adauga laptele si iaurtul grecesc treptat peste ele.",
      "Amesteca timp de 2-3 minute pana vezi ca incepe sa se umfle compozitia. Lasa deoparte bolul pentru 2-3 ore pentru a se umfla semintele de chia (cel mai indicat este sa lasi compozitia peste noapte la frigider).",
      "A doua zi adauga indulcitorul si amesteca foarte bine pentru a se dizolva, iar deasupra adauga toppingul tau favorit de fructe (banane, capsuni, rodie, kiwi, ananas, etc.).",
    ],
    tips: "",
  },

  piadinaPui: {
    meal: "Masa 2", name: "Piadina cu pui, rucola si rosii cherry",
    ing: [
      ["Tortilla Wrap Snack Day (Lidl)", "1 Bucata (62g)", "2 Bucati (124g)"],
      ["Mozzarella light Lovilio/Milbona (Lidl)", "60g", "120g"],
      ["Piept de pui - Lidl", "150g", "200g"],
      ["Rosii", "40g", "80g"],
      ["Sos de ardei iute Chili Vifon", "20g", "20g"],
      ["Condimente", "1g", "1g"],
      ["Ulei de masline", "3ml", "6ml"],
      ["Rucola", "30g", "40g"],
    ],
    tot: { n: { p:"52.28g", c:"40.4g", f:"14.3g", k:"510" }, a: { p:"81.96g", c:"75.71g", f:"27.38g", k:"892" } },
    steps: [
      "Pieptul de pui, fara sa il tai il condimentezi cu sare, piper, boia, fulgi chilli, usturoi granulat si ulei de masline.",
      "Introdu la cuptor pieptul de pui, intr-un vas de yena pentru aproximativ 25 min. la 180 de grade.",
      "In ultimele 5 minute, scoate puiul din cuptor si scurge din vas lichidul lasat de pui. Acest pas va ajuta la rumenirea puiului.",
      "Dupa ce puiul este gata scoate-l din cuptor si lasa-l acoperit.",
      "Pune intr-o tigaie antiaderenta o lipie tortilla, adauga felii din piept de pui taiat subtire si mozzarella rasa.",
      "Impatura lipia in doua si las-o pe fiecare parte aproximativ 1-2 minute, pana cand cascavalul s-a topit, iar lipia a devenit crocanta pe ambele parti.",
      "La final adauga mixul de salata verde/rucola, rosii cherry, castraveti murati si sos de ardei iute/ketchup.",
    ],
    tips: "La ultimul pas poti folosi orice legume, salata doresti.",
  },

  crevetiVin: {
    meal: "Masa 3", name: "Creveti cu vin si usturoi si paine prajita",
    ing: [
      ["Creveti Semipreparati Congelati - Ocean Fish", "125g", "125g"],
      ["Usturoi", "3 catei (15g)", "3 catei (15g)"],
      ["Unt 80% - Pilos", "10g", "10g"],
      ["Vin alb sec", "60ml", "60ml"],
      ["Zeama de lamaie", "10ml", "10ml"],
      ["Patrunjel verde", "1g", "1g"],
      ["Paine integrala cu seminte Lidl", "50g", "50g"],
    ],
    tot: { n: { p:"30.75g", c:"24.96g", f:"11.74g", k:"349" }, a: { p:"30.75g", c:"24.96g", f:"11.74g", k:"349" } },
    steps: [
      "Crevetii se pot folosi direct congelati sau se pot decongela in prealabil.",
      "Curatati usturoiul si il taiati felii.",
      "Puneti o tigaie pe foc, focul sa fie potrivit, adaugati untul si usturoiul.",
      "Cand untul s-a topit si usturoiul devine usor auriu, adaugam crevetii.",
      "Ii sotam 2-3 minute, apoi turnati vinul.",
      "Adaugam sare si piper, amestecam si mai lasam pe foc 4-5 minute, pentru ca lichidul sa mai scada.",
      "Spre final ii stropiti cu zeama de lamaie, amestecati totul si mai lasati circa 1 minut pe foc.",
      "La final presaram patrunjel verde, tocat marunt.",
      "Servim cu paine prajita la toaster.",
    ],
    tips: "Recomand sa folosesti creveti care sunt albi cand sunt congelati nu roz, sunt mult mai deliciosi.",
  },

  gustare13: {
    meal: "Gustare", name: "Gustare Joi 13 Mar",
    ing: [
      ["Fructe la alegere (fara gustare specificata)", "—", "—"],
    ],
    tot: { n: { p:"0g", c:"0g", f:"0g", k:"0" }, a: { p:"0g", c:"0g", f:"0g", k:"0" } },
    steps: ["Gustare libera — consuma fructe sau altceva la alegere in limita caloriilor zilei."],
    tips: "",
  },

  carnaciMamaliga: {
    meal: "Masa 2", name: "Carnati cu mamaliga si muraturi",
    ing: [
      ["Carnati de casa (carnati slabi)", "70g", "130g"],
      ["Malai Penny", "30g", "60g"],
      ["Apa", "90ml", "90ml"],
      ["Sare himalaya", "1g", "1g"],
      ["Muraturi asortate", "50g", "50g"],
    ],
    tot: { n: { p:"15g", c:"25.45g", f:"19.18g", k:"335" }, a: { p:"27.9g", c:"48.85g", f:"35.62g", k:"629" } },
    steps: [
      "Carnatii ii fierbi in apa/zeama de varza cateva minute.",
      "Mamaliga: Pune apa la fiert cu un praf generos de sare.",
      "Cand apa clocoteste, toarna malaiul in ploaie, putin cate putin, iar cu mana dominanta amesteca in continuu din momentul in care incepi sa adaugi malaiul.",
      "Cand mamaliga incepe sa se ingroase, da focul mic-mediu si continua sa amesteci constant pana mamaliga ajunge la consistenta dorita. Poti sa o lasi putin mai moale deoarece aceasta se va intari cand se mai raceste.",
      "Serveste alaturi de muraturi.",
    ],
    tips: "",
  },

  shaormaPui: {
    meal: "Masa 3", name: "Shaorma de pui sanatoasa",
    ing: [
      ["Piept de pui - Lidl", "150g", "150g"],
      ["Ulei de masline", "3ml", "3ml"],
      ["Condimente la alegere", "5g", "5g"],
      ["Zuzu Stors 2%", "50g", "50g"],
      ["Usturoi", "1 catel (5g)", "1 catel (5g)"],
      ["Ulei de masline", "2ml", "2ml"],
      ["Zeama de lamaie", "5ml", "5ml"],
      ["Condimente", "2g", "2g"],
      ["Salata iceberg", "30g", "30g"],
      ["Legume asortate (rosii, castraveti, ardei, ridichi, ceapa verde)", "100g", "100g"],
      ["Lipie libaneza Painea Brutarului Lidl", "50g (1 lipie)", "50g (1 lipie)"],
    ],
    tot: { n: { p:"43.97g", c:"49.11g", f:"9.54g", k:"467" }, a: { p:"43.97g", c:"49.11g", f:"9.54g", k:"467" } },
    steps: [
      "Pieptul de pui, fara sa il tai il condimentezi cu sare, piper, boia, fulgi chilli, usturoi granulat si ulei de masline.",
      "Introdu la cuptor pieptul de pui, intr-un vas de yena pentru aproximativ 25 min. la 180 de grade.",
      "In ultimele 5 minute, scoate puiul din cuptor, scurge din vas lichidul lasat de acesta si intoarce bucatile de piept de pui pe partea opusa. Acest pas va ajuta la rumenirea puiului.",
      "Dupa ce puiul este gata scoate-l din cuptor si lasa-l acoperit.",
      "Sosul de usturoi: curata si pisaza usturoiul, amesteca-l cu uleiul de masline pana se formeaza o pasta. Adauga iaurtul grecesc, putina zeama de lamaie, sare si piper.",
      "Pe o lipie pe care in prealabil o poti incalzi cateva secunde intr-o tigaie, adauga puiul pe care l-ai taiat felii subtiri, salata, castraveti, rosii, ardei, porumb, ceapa si sosul de usturoi.",
      "Peste legume presara sare inainte sa rulez lipia.",
      "Optional: dupa ce ai rulat lipia, o poti aseza intr-o tigaie incinsa la foc mediu-mare si sa o lasi sa se rumeneasca.",
    ],
    tips: "Poti sa adaugi orice legume iti fac placere.",
  },

  gustare14: {
    meal: "Gustare", name: "Bonus 200 calorii",
    ing: [
      ["Bonus 200 calorii (orice doresti)", "200 kcal", "200 kcal"],
    ],
    tot: { n: { p:"0g", c:"0g", f:"0g", k:"200" }, a: { p:"0g", c:"0g", f:"0g", k:"200" } },
    steps: ["Consuma orice iti doresti in limita a 200 de calorii."],
    tips: "",
  },

  scrambledEggs: {
    meal: "Masa 1", name: "Scrambled-eggs",
    ing: [
      ["Ou de gaina", "2 Oua medii M (120g)", "2 Oua medii M (120g)"],
      ["Iaurt natural 2% - Zuzu Stors", "50g", "50g"],
      ["Legume asortate (rosii, castraveti, ardei, ridichi, ceapa verde)", "100g", "100g"],
      ["Paine integrala Vel Pitar", "30g", "30g"],
    ],
    tot: { n: { p:"23.32g", c:"28.89g", f:"12.94g", k:"329" }, a: { p:"23.32g", c:"28.89g", f:"12.94g", k:"329" } },
    steps: [
      "Intr-o tigaie antiaderenta adaugam putin unt.",
      "Adaugam ouale pe care le-am batut in prealabil cu sare, piper si iaurtul grecesc.",
      "Amestecam continuu pana omleta ajunge la consistenta dorita.",
    ],
    tips: "Iaurtul grecesc ajuta pentru ca ouale sa iasa cremoase, precum ai folosi mai mult unt, dar fara calorii extra. Foloseste legumele tale preferate/favorite fara grija caloriilor. Painea este optionala, daca poti manca fara cu atat mai bine.",
  },

  chiftelePui: {
    meal: "Masa 2", name: "Chiftele de pui la cuptor cu cartofi piure si muraturi",
    ing: [
      ["Carne tocata din piept de pui fara piele - Fragedo", "150g", "200g"],
      ["Morcovi", "50g", "100g"],
      ["Ou crud", "0.5 Ou mediu M (30g)", "1 Ou mediu M (60g)"],
      ["Usturoi", "2 catei (10g)", "4 catei (20g)"],
      ["Pesmet", "15g", "30g"],
      ["Patrunjel verde", "5g", "5g"],
      ["Cartofi albi", "150g", "300g"],
      ["Lapte 1,5% Pilos", "20g", "40g"],
      ["Unt 80% - Pilos", "2g", "4g"],
      ["Muraturi asortate", "100g", "200g"],
    ],
    tot: { n: { p:"42.41g", c:"48.81g", f:"8.33g", k:"434" }, a: { p:"63.28g", c:"96.89g", f:"14.62g", k:"760" } },
    steps: [
      "Intr-un bol mai mare pune carnea tocata, morcovul dat pe razatoare, patrunjelul tocat marunt, cateii de usturoi zdrobiti, oul, pesmetul, sare si piper (dupa gust). Amesteca totul bine cu mana, pana se omogenizeaza compozitia.",
      "Cu mana putin umeda sau unsa cu putin ulei, ia din compozitia rezultata putin material si formeaza chiftelele.",
      "Pune chiftelele pe o tava tapetata cu hartie de copt si lasa-le la cuptorul preincalzit la 180°C, pentru 25-30 minute.",
      "Chiftelele sunt gata dupa ce incep sa se rumeneasca frumos deasupra.",
      "Pentru piure: decojeste, taie si fierbe cartofii. Dupa ce cartofii sunt fierti, scurge-i de apa, adauga laptele, untul si sarea si piseaza cartofii pana cand au textura potrivita.",
      "Serveste alaturi de muraturi.",
    ],
    tips: "Timpul de coacere al chiftelelor poate sa difere in functie de puterea cuptorului. Poti folosi piept de curcan tocat in loc de piept de pui.",
  },

  cordonBleuMasa: {
    meal: "Masa 3", name: "Cordon bleu la cuptor cu salata de cruditati", sub: ["cordonBleu", "salataCruditati"],
    ing: [
      ["Cordon bleu la cuptor @34FIT__", "1 Portie (246g)", "1 Portie (246g)"],
      ["Salata de cruditati", "1 Portie (273g)", "1 Portie (273g)"],
    ],
    tot: { n: { p:"49.38g", c:"33.14g", f:"11.59g", k:"432" }, a: { p:"49.38g", c:"33.14g", f:"11.59g", k:"432" } },
    steps: ["Prepara cordon bleu conform sub-retetei. Prepara salata de cruditati conform sub-retetei."],
    tips: "",
  },

  gustare15: {
    meal: "Gustare", name: "Gustare Sambata 15 Mar",
    ing: [
      ["Gustare libera (fara specificatie)", "—", "—"],
    ],
    tot: { n: { p:"0g", c:"0g", f:"0g", k:"0" }, a: { p:"0g", c:"0g", f:"0g", k:"0" } },
    steps: ["Gustare la alegere in limita caloriilor zilei."],
    tips: "",
  },
};

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
const DAYS = [
  { label:"Luni + Marti",   dates:"09-10 Mar", meals:["sandwichCald","puiShanghaiN","salataCaesarA","gustare09"] },
  { label:"Mier + Joi",     dates:"11-12 Mar", meals:["wrapPui","pasteTonN","lavaCakeOatsN","gustare1112"] },
  { label:"Vineri",         dates:"13 Mar",    meals:["budinchiaChia","piadinaPui","crevetiVin","gustare13"] },
  { label:"Sambata",        dates:"14 Mar",    meals:["budinchiaChia","carnaciMamaliga","shaormaPui","gustare14"] },
  { label:"Duminica",       dates:"15 Mar",    meals:["scrambledEggs","chiftelePui","cordonBleuMasa","gustare15"] },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function totalKcal(mealKeys, person) {
  return mealKeys.reduce((sum, k) => {
    const m = MEALS[k];
    return sum + (m ? parseFloat(m.tot[person].k) : 0);
  }, 0);
}

// ─── SUB-RECIPE CARD ──────────────────────────────────────────────────────────
function SubCard({ id }) {
  const [open, setOpen] = useState(false);
  const sr = SUB_RECIPES[id];
  if (!sr) return null;
  return (
    <div style={{border:"1.5px solid #a5d6a7", borderRadius:10, overflow:"hidden", marginTop:10}}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:"100%", border:"none", cursor:"pointer",
          padding:"9px 13px", display:"flex", justifyContent:"space-between", alignItems:"center",
          background: open ? "#2e7d32" : "#e8f5e9",
        }}
      >
        <span style={{fontWeight:"bold", fontSize:12, color: open ? "#fff" : "#2e7d32"}}>
          {sr.emoji} {sr.name}
        </span>
        <span style={{fontSize:11, color: open ? "#fff" : "#2e7d32"}}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{background:"#f9fbe7", padding:"12px 14px"}}>
          {sr.note && (
            <p style={{margin:"0 0 8px", fontSize:11, color:"#777", fontStyle:"italic"}}>{sr.note}</p>
          )}
          <div style={{fontWeight:"bold", fontSize:11, color:"#2e7d32", marginBottom:4}}>Ingrediente</div>
          <table style={{width:"100%", borderCollapse:"collapse", marginBottom:10}}>
            <tbody>
              {sr.ing.map((row, i) => (
                <tr key={i} style={{background: i % 2 === 0 ? "#fff" : "#f1f8e9"}}>
                  <td style={{padding:"4px 8px", fontSize:11, color:"#333", borderBottom:"1px solid #e8f5e9"}}>{row[0]}</td>
                  <td style={{padding:"4px 8px", fontSize:11, color:"#555", textAlign:"right", borderBottom:"1px solid #e8f5e9"}}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{fontWeight:"bold", fontSize:11, color:"#2e7d32", marginBottom:4}}>Preparare</div>
          <ol style={{margin:0, paddingLeft:16}}>
            {sr.steps.map((s, i) => (
              <li key={i} style={{fontSize:11, color:"#333", marginBottom:5, lineHeight:1.6}}>{s}</li>
            ))}
          </ol>
          {sr.tips && (
            <div style={{marginTop:8, background:"#fff9c4", border:"1px solid #fff176", borderRadius:6, padding:"7px 10px", fontSize:11, color:"#555"}}>
              <b style={{color:"#f57f17"}}>Sfat: </b>{sr.tips}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function DayTabs({ days, active, onSelect }) {
  return (
    <div style={{display:"flex", gap:5, justifyContent:"center", flexWrap:"wrap", marginBottom:9}}>
      {days.map((d, i) => (
        <button key={i} onClick={() => onSelect(i)} style={{
          padding:"5px 10px", borderRadius:18, border:"1.5px solid", cursor:"pointer",
          lineHeight:1.3, textAlign:"center", fontSize:11,
          borderColor: active === i ? GREEN : "#ddd",
          background:   active === i ? GREEN : "#fff",
          color:        active === i ? "#fff" : "#555",
          fontWeight:   active === i ? "bold" : "normal",
        }}>
          <div>{d.label}</div>
          <div style={{fontSize:9, opacity:0.8}}>{d.dates}</div>
        </button>
      ))}
    </div>
  );
}

function TotalsBar({ nKcal, aKcal }) {
  return (
    <div style={{display:"flex", justifyContent:"center", gap:14, marginBottom:10, background:"#f1f8f4", borderRadius:10, padding:"6px 14px", fontSize:11}}>
      <span style={{color:"#666"}}>Total zi:</span>
      <span style={{color:"#1a6b9a", fontWeight:"bold"}}>Nicoleta: {nKcal.toFixed(0)} kcal</span>
      <span style={{color:"#7b3fa0", fontWeight:"bold"}}>Andrei: {aKcal.toFixed(0)} kcal</span>
    </div>
  );
}

function MealTabs({ mealKeys, active, onSelect }) {
  return (
    <div style={{display:"flex", gap:7, justifyContent:"center", marginBottom:11}}>
      {mealKeys.map((k, i) => {
        const m = MEALS[k];
        if (!m) return null;
        const mc = MEAL_COLORS[m.meal];
        const isActive = active === i;
        return (
          <button key={i} onClick={() => onSelect(i)} style={{
            flex:1, maxWidth:200, padding:"8px 6px", borderRadius:10,
            border:"2px solid", cursor:"pointer", textAlign:"center",
            borderColor: isActive ? mc.dot : "#ddd",
            background:  isActive ? mc.bg  : "#fff",
          }}>
            <div style={{fontSize:11, fontWeight:"bold", color: isActive ? mc.lbl : "#bbb"}}>{m.meal}</div>
            <div style={{fontSize:10, color: isActive ? "#333" : "#ccc", marginTop:2, lineHeight:1.3}}>{m.name}</div>
            {m.sub && m.sub.length > 0 && (
              <div style={{fontSize:9, color: isActive ? "#2e7d32" : "#ccc", marginTop:2}}>sub-reteta</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function IngTable({ ing }) {
  return (
    <table style={{width:"100%", borderCollapse:"collapse"}}>
      <thead>
        <tr style={{background:"#f7faf8"}}>
          <th style={{padding:"8px 13px", textAlign:"left",   fontSize:12, color:"#555",    fontWeight:"bold", width:"40%", borderBottom:"1.5px solid #eee"}}>Ingredient</th>
          <th style={{padding:"8px 13px", textAlign:"center", fontSize:12, color:"#1a6b9a", fontWeight:"bold", width:"30%", borderBottom:"1.5px solid #eee"}}>Nicoleta</th>
          <th style={{padding:"8px 13px", textAlign:"center", fontSize:12, color:"#7b3fa0", fontWeight:"bold", width:"30%", borderBottom:"1.5px solid #eee"}}>Andrei</th>
        </tr>
      </thead>
      <tbody>
        {ing.map((row, i) => {
          const diff = row[1] !== row[2];
          return (
            <tr key={i} style={{background: i % 2 === 0 ? "#fff" : "#fafafa"}}>
              <td style={{padding:"7px 13px", fontSize:12, color:"#333", borderBottom:"1px solid #f0f0f0"}}>{row[0]}</td>
              <td style={{padding:"7px 13px", textAlign:"center", fontSize:12, borderBottom:"1px solid #f0f0f0",
                fontWeight: diff ? "bold"    : "normal",
                color:      diff ? "#1a6b9a" : "#666",
                background: diff ? "#e8f4fd" : "transparent",
              }}>{row[1]}</td>
              <td style={{padding:"7px 13px", textAlign:"center", fontSize:12, borderBottom:"1px solid #f0f0f0",
                fontWeight: diff ? "bold"    : "normal",
                color:      diff ? "#7b3fa0" : "#666",
                background: diff ? "#f3e8fd" : "transparent",
              }}>{row[2]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function MacroRow({ tot }) {
  return (
    <div style={{display:"grid", gridTemplateColumns:"40% 30% 30%", background:GREEN, color:"#fff"}}>
      <div style={{padding:"9px 13px", fontWeight:"bold", fontSize:12}}>TOTAL</div>
      {[tot.n, tot.a].map((t, i) => (
        <div key={i} style={{padding:"9px 8px", textAlign:"center", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.2)" : "none"}}>
          <div style={{fontSize:9, opacity:0.8}}>P / C / G</div>
          <div style={{fontSize:10, marginTop:1}}>{t.p} / {t.c} / {t.f}</div>
          <div style={{fontSize:13, fontWeight:"bold", marginTop:1}}>🔥 {t.k} kcal</div>
        </div>
      ))}
    </div>
  );
}

function RecipePanel({ meal }) {
  return (
    <div style={{background:"#fafdf8", borderTop:"1.5px solid #dff0e8", padding:"14px 16px"}}>
      <div style={{fontWeight:"bold", fontSize:13, color:GREEN, marginBottom:8}}>Mod de preparare</div>
      <ol style={{margin:0, paddingLeft:18}}>
        {meal.steps.map((s, i) => (
          <li key={i} style={{fontSize:12, color:"#333", marginBottom:7, lineHeight:1.65}}>{s}</li>
        ))}
      </ol>
      {meal.tips && (
        <div style={{marginTop:10, background:"#fff8e1", border:"1px solid #ffe082", borderRadius:8, padding:"7px 11px"}}>
          <span style={{fontSize:12, fontWeight:"bold", color:"#b8860b"}}>Sfat: </span>
          <span style={{fontSize:12, color:"#555"}}>{meal.tips}</span>
        </div>
      )}
      {meal.sub && meal.sub.length > 0 && (
        <div style={{marginTop:6}}>
          <div style={{fontSize:12, color:"#2e7d32", fontWeight:"bold", margin:"12px 0 2px"}}>Sub-retete:</div>
          {meal.sub.map(id => <SubCard key={id} id={id} />)}
        </div>
      )}
    </div>
  );
}

// ─── S9S10 ROUTE ──────────────────────────────────────────────────────────────
export default function S9S10() {
  const navigate = useNavigate();
  const [dayIdx,  setDayIdx]  = useState(0);
  const [mealIdx, setMealIdx] = useState(0);
  const [showRecipe, setShowRecipe] = useState(false);

  const day  = DAYS[dayIdx];
  const meal = MEALS[day.meals[mealIdx]];
  const mc   = meal ? MEAL_COLORS[meal.meal] : MEAL_COLORS["Masa 1"];

  function selectDay(i)  { setDayIdx(i);  setMealIdx(0); setShowRecipe(false); }
  function selectMeal(i) { setMealIdx(i); setShowRecipe(false); }

  return (
    <div style={{fontFamily:"Arial, sans-serif", maxWidth:860, margin:"0 auto", padding:"14px 10px", background:"#fafafa", minHeight:"100vh"}}>

      {/* Back button */}
      <button onClick={() => navigate("/")} style={{
        display:"flex", alignItems:"center", gap:5,
        background:"none", border:"none", cursor:"pointer",
        color:GREEN, fontSize:12, fontWeight:"bold", marginBottom:10, padding:0,
      }}>
        ← Înapoi la planuri
      </button>

      <div style={{textAlign:"center", marginBottom:12}}>
        <div style={{fontSize:21, fontWeight:"bold", color:GREEN}}>💪 34FIT Meal Plan</div>
        <div style={{fontSize:12, color:"#888", marginTop:2}}>S9-S10 &nbsp;|&nbsp; 09-15 Martie 2026</div>
        <div style={{fontSize:11, color:"#aaa"}}>Nicoleta &amp; Andrei</div>
      </div>

      <DayTabs  days={DAYS}          active={dayIdx}  onSelect={selectDay} />
      <TotalsBar nKcal={totalKcal(day.meals, "n")} aKcal={totalKcal(day.meals, "a")} />
      <MealTabs mealKeys={day.meals} active={mealIdx} onSelect={selectMeal} />

      {meal && (
        <div style={{border:"2px solid", borderColor:mc.border, borderRadius:12, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>

          <div style={{background:GREEN, color:"#fff", padding:"11px 15px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div style={{fontSize:10, opacity:0.7, marginBottom:1}}>{meal.meal} — {day.label} {day.dates} — S9-S10</div>
              <div style={{fontSize:15, fontWeight:"bold"}}>{meal.name}</div>
            </div>
            <button
              onClick={() => setShowRecipe(s => !s)}
              style={{
                borderRadius:18, padding:"5px 13px", cursor:"pointer", fontSize:11, fontWeight:"bold", whiteSpace:"nowrap",
                border:"1.5px solid rgba(255,255,255,0.5)",
                background: showRecipe ? "#fff" : "rgba(255,255,255,0.15)",
                color:      showRecipe ? GREEN  : "#fff",
              }}
            >
              {showRecipe ? "Ascunde" : "Reteta"}
            </button>
          </div>

          <IngTable ing={meal.ing} />
          <MacroRow tot={meal.tot} />
          {showRecipe && <RecipePanel meal={meal} />}

        </div>
      )}

      <p style={{textAlign:"center", fontSize:9, color:"#ccc", marginTop:10}}>
        Albastru = portii Nicoleta | Violet = portii Andrei | Verde = sub-reteta
      </p>
    </div>
  );
}
