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
  lasagna: {
    name: "Lasagna healthy", emoji: "🍝",
    note: "6 portii | Prep 10 min | Gatire 40 min",
    ing: [
      ["Carne tocata vita-porc 15% grasime", "500g"],
      ["Foi de lasagna Barilla", "250g"],
      ["Morcovi", "100g"],
      ["Ceapa", "100g"],
      ["Rosii pasate", "300g"],
      ["Ulei de cocos", "8g"],
      ["Oua medii", "2 oua"],
      ["Iaurt Skyr Pilos / Milbona Lidl", "100g"],
      ["Parmezan", "20g"],
      ["Condimente", "5g"],
    ],
    steps: [
      "Preincalzeste cuptorul la 180C.",
      "Intr-o tigaie antiaderenta, caleste ceapa taiata marunt si morcovul dat pe razatoare.",
      "Cand se inmoaie legumele, adauga carnea tocata. Amesteca constant pana carnea se rumeneste bine. Adauga condimentele si rosiile pasate. Lasa sa fiarba cateva minute.",
      "Intr-un vas termorezistent, pune pe rand cate un strat de foi de lasagna si un strat de carne. Stratul de jos si cel de sus trebuie sa fie din foi.",
      "Amesteca ouale cu iaurtul si parmezanul si toarna uniform deasupra. Pune la cuptor ~40 min pana devine aurie deasupra.",
      "Taie in 6 portii egale.",
    ],
    tips: "Gateste tava intreaga duminica. Cottage cheese se serveste rece ca dip sau turnat deasupra — adauga proteina extra fara gatit.",
  },

  tacos: {
    name: "Tacos burger sanatos (per portie)", emoji: "🌮",
    note: "Per portie | Prep 2 min | Gatire 3 min",
    ing: [
      ["Piept de pui Lidl", "50g"],
      ["Condimente", "1g"],
      ["Ulei de cocos", "1g"],
      ["Chifla burger integrala Mcennedy (Lidl)", "25g"],
      ["Crema de branza Light", "10g"],
      ["Cheddar felii Carrefour", "10g"],
      ["Salata verde", "20g"],
      ["Rosii", "10g"],
      ["Ceapa rosie", "10g"],
      ["Curry sauce GymBeam", "10g"],
    ],
    steps: [
      "Condimenteaza pieptul cu sare si piper si prajeste-l intr-o tigaie antiaderenta incinsa bine, unsa cu putin ulei de cocos. Prajeste aproximativ 2-3 min pe fiecare parte, la foc mare.",
      "Chifla se desface si se aseaza cu miezul pe un tocator. Se trece cu un sucitor peste chifla, astfel incat sa devina mai subtire.",
      "Se unge chifla pe interior cu crema de branza, iar deasupra se aseaza cascavalul feliat si fasii din piept de pui. Se plieaza in doua si se aseaza intr-un vas termorezistent.",
      "Se rumenesc la cuptor pentru 5-7 minute, pana cand cascavalul s-a topit si chifla devine putin crocanta.",
      "Se introduce in fiecare tacos salata verde, rosii, ceapa rosie, iar deasupra se adauga sosul curry.",
    ],
    tips: "Gateste tot puiul odata, asamblezi tacos la final. Curry sauce GymBeam este 0 calorii.",
  },

  clatite: {
    name: "Clatite Japoneze Healthy & Super Fluffy", emoji: "🥞",
    note: "Per portie | Prep 12 min | Gatire 8 min",
    ing: [
      ["Oua medii", "2 oua N / 3 oua A"],
      ["Lapte vegetal neindulcit Alpro ovaz", "40ml N / 60ml A"],
      ["Faina integrala", "25g N / 35g A"],
      ["Whey protein isolat", "20g N / 25g A"],
      ["Praf de copt", "1g"],
      ["Esenta de vanilie", "5g"],
      ["Erytrytol", "dupa gust"],
      ["Zeama de lamaie", "3ml"],
      ["Zmeura", "50g"],
      ["Ricotta Lovilio", "60g N / 80g A"],
    ],
    steps: [
      "Amesteca whey-ul cu laptele vegetal inainte de orice altceva — nu il adauga direct la albusuri batute, le strica textura.",
      "Separa galbenusul de albus in 2 boluri separate.",
      "Amesteca galbenusul cu laptele+whey, esenta de vanilie si faina si omogenizeaza compozitia.",
      "Bate albusul spuma utilizand un tel sau mixer. Dupa ce incepe sa se transforme in spuma, incorporeaza erytrytolul pudra si continua sa bati pana obtii o bezea tare.",
      "In bolul cu faina, incorporeaza cu grija spuma din albus cu miscari circulare de jos in sus. Nu omogeniza complet — blatul trebuie sa fie aerat si pufos.",
      "Incinge o tigaie antiaderenta, pulverizeaza ulei cocos spray si redu focul la minim. Adauga trei linguri de compozitie intr-un inel de inox. Adauga o lingura de apa in tigaie si pune capacul.",
      "Dupa 5-6 minute intoarce inelul pe partea opusa si mai lasa inca 3-4 minute.",
      "Serveste cu ricotta, erytrytol pudra si zmeura.",
    ],
    tips: "Vasul in care se bate albusul trebuie sa fie foarte curat, fara urme de grasime sau apa. Inainte sa bati albusul adauga putina zeama de lamaie.",
  },

  sosUsturoi: {
    name: "Sos de usturoi", emoji: "🧄",
    note: "3 portii | Prep 10 min",
    ing: [
      ["Iaurt stragghisto 2% Olympus", "150g"],
      ["Ulei de masline", "3ml"],
      ["Usturoi", "3 catei (15g)"],
      ["Suc natural de lamaie", "5ml"],
      ["Condimente", "1g"],
    ],
    steps: [
      "Curata si pisaza usturoiul, amesteca-l foarte bine cu uleiul de masline pana se formeaza o pasta.",
      "Adauga iaurtul grecesc si putina zeama de lamaie.",
      "Amesteca bine si potriveste cu sare si piper.",
    ],
    tips: "Recomand iaurt grecesc Stragghisto Olympus — foarte fin si cremos. Pastreaza sosul la frigider acoperit cu folie alimentara. Rezista 3-4 zile.",
  },

  salataRucola: {
    name: "Salata cu rucola, parmezan si rosii cherry", emoji: "🥗",
    note: "2 portii | Prep 5 min",
    ing: [
      ["Rucola", "100g"],
      ["Rosii cherry", "250g"],
      ["Parmezan", "30g"],
      ["Otet balsamic", "10g"],
    ],
    steps: [
      "Se adauga intr-un bol rucola.",
      "Se adauga rosiile cherry taiate in doua, fasii de parmezan si putina sare.",
      "Se adauga deasupra otet balsamic si se amesteca.",
    ],
    tips: "Extra, poti adauga si alte legume.",
  },
};

// ─── MEALS ────────────────────────────────────────────────────────────────────
const MEALS = {
  avocadoSomon: {
    meal: "Masa 1", name: "Avocado toast cu somon afumat + ou posat",
    ing: [
      ["Paine integrala Vel Pitar", "50g (2 felii)", "70g (3 felii)"],
      ["Somon afumat", "80g", "100g"],
      ["Avocado", "35g", "50g"],
      ["Ou posat", "1 ou (60g)", "2 oua (120g)"],
      ["Branza feta", "20g", "20g"],
      ["Legume (rosii, castraveti etc)", "100g", "100g"],
      ["Zeama de lamaie + sare", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"~35g", c:"~30g", f:"~16g", k:"380" }, a: { p:"~48g", c:"~42g", f:"~19g", k:"510" } },
    steps: [
      "Pisezi avocado cu furculita si adaugi putina sare si zeama de lamaie.",
      "Prajeste painea la toaster si unge pe fiecare felie pasta de avocado.",
      "Pune deasupra somonul afumat.",
      "Posha ouale: fierbe apa cu putin otet, creeaza un vartej si lasa oul sa cada usor. 3 minute pentru galbenus moale. Pune direct deasupra somonului.",
    ],
    tips: "Pastreaza jumatatea de avocado la frigider scufundata intr-un recipient cu apa pentru a preveni oxidarea.",
  },

  lasagna: {
    meal: "Masa 2", name: "Lasagna healthy cu cottage cheese", sub: ["lasagna"],
    ing: [
      ["Lasagna healthy (din tava de 6)", "1.5 portii (~375g)", "2 portii (~500g)"],
      ["Cottage cheese Light", "150g", "150g"],
    ],
    tot: { n: { p:"~61g", c:"~42g", f:"~17g", k:"520" }, a: { p:"~76g", c:"~52g", f:"~20g", k:"660" } },
    steps: [
      "Incalzeste portia de lasagna conform preferintelor.",
      "Cottage cheese se serveste rece ca dip lateral sau turnat deasupra lasagnei fierbinti.",
    ],
    tips: "Gateste tava intreaga duminica — economisesti timp pentru ambele zile.",
  },

  mamaligaCarnati: {
    meal: "Masa 3", name: "Mamaliga cu cottage cheese, feta si carnati slabi",
    ing: [
      ["Malai Penny", "40g", "55g"],
      ["Apa", "120ml", "165ml"],
      ["Cottage cheese Light Milbona (Lidl)", "200g", "250g"],
      ["Branza feta", "20g", "25g"],
      ["Carnati slabi de casa/porc", "80g", "120g"],
      ["Muraturi asortate", "50g", "50g"],
    ],
    tot: { n: { p:"~45g", c:"~38g", f:"~14g", k:"420" }, a: { p:"~62g", c:"~52g", f:"~18g", k:"570" } },
    steps: [
      "Carnatii se fierb 5-7 min in apa clocotita — eviti grasimea extra fata de prajit.",
      "Pune apa la fiert cu un praf generos de sare.",
      "Cand apa clocoteste, toarna malaiul in ploaie, putin cate putin, amestecand continuu.",
      "Cand mamaliga incepe sa se ingroase, da focul mic-mediu si continua sa amesteci constant pana ajunge la consistenta dorita.",
      "Pune pe farfurie si adauga cottage cheese rece deasupra mamaligii fierbinti — se topeste usor. Adauga branza feta si serveste cu muraturi.",
    ],
    tips: "Cottage cheese rece deasupra mamaligii fierbinti se topeste usor si adauga proteina fara gatit extra.",
  },

  gustare12: {
    meal: "Gustare", name: "Iaurt grecesc cu fructe",
    ing: [
      ["Iaurt grecesc 2% Zuzu Divin", "150g", "200g"],
      ["Fructe la alegere (afine, capsuni, mere)", "80g", "80g"],
    ],
    tot: { n: { p:"~13g", c:"~16g", f:"~3g", k:"130" }, a: { p:"~17g", c:"~20g", f:"~3g", k:"160" } },
    steps: ["Combina iaurtul cu fructele preferate. Poti adauga putina scortisoara sau erytrytol."],
    tips: "Afine, capsuni si mere sunt cele mai recomandate — raport bun calorie/volum.",
  },

  eggrolls: {
    meal: "Masa 1", name: "Egg-rolls cu sunca si cascaval",
    ing: [
      ["Oua de gaina medii", "3 oua (180g)", "4 oua (240g)"],
      ["Sunca de porc Pikok (felii)", "60g", "80g"],
      ["Cascaval Gouda feliat", "20g", "30g"],
      ["Ulei de cocos", "2g", "2g"],
      ["Legume asortate (rosii, castraveti, ardei)", "100g", "100g"],
    ],
    tot: { n: { p:"~40g", c:"~17g", f:"~27g", k:"390" }, a: { p:"~53g", c:"~20g", f:"~35g", k:"500" } },
    steps: [
      "Bate ouale cu sare si piper.",
      "Incinge o tigaie antiaderenta mare si unge-o cu ulei de cocos. Adauga ouale si lasa omleta sa se gateasca.",
      "Intoarce cu grija pe partea cealalta.",
      "Dupa ce omleta este gatita, reduce focul si adauga cascavalul feliat si feliile de sunca.",
      "Ruleaza cu grija omleta si las-o sa se rumeneasca putin.",
      "Las-o sa se raceasca putin, apoi taie-o in felii.",
    ],
    tips: "Cantitatea mai mare de oua poate face ruloul sa se rupa — imparte in 2 omleta separate si imparte sunca intre ele.",
  },

  puiCiuperci: {
    meal: "Masa 2", name: "Piept de pui in sos de ciuperci cu mamaliguta",
    ing: [
      ["Piept de pui Lidl", "200g", "260g"],
      ["Ciuperci champignon", "150g", "150g"],
      ["Usturoi", "1 catel", "1 catel"],
      ["Ceapa", "30g", "30g"],
      ["Passata di pomodoro Freshona", "100g", "100g"],
      ["Ulei de masline", "3ml", "3ml"],
      ["Cremosano Light Milbona (smantana lichida)", "40g", "40g"],
      ["Malai Penny", "40g", "55g"],
      ["Muraturi asortate", "100g", "100g"],
    ],
    tot: { n: { p:"~56g", c:"~48g", f:"~14g", k:"530" }, a: { p:"~70g", c:"~58g", f:"~16g", k:"650" } },
    steps: [
      "Taie pieptul de pui in felii de aproximativ 0.5cm si amesteca-l cu sare si piper.",
      "Prajeste puiul in putin ulei de masline la foc mare — 2 min/parte. Nu-l fierbe in sos, iese uscat.",
      "Dupa ce l-ai intors, adauga ceapa si usturoiul. Caleste 2 minute la foc mic.",
      "Adauga ciupercile si caleste inca 5 minute.",
      "Adauga sosul de rosii si fierbe totul 5 minute.",
      "La final adauga Cremosano Light, amesteca si ia de pe foc. Potriveste cu sare si piper.",
      "Mamaliga: pune apa la fiert (x3 cantitate fata de mamaliga) cu sare. Cand clocoteste, toarna malaiul in ploaie amestecand continuu. Da focul mic-mediu si amesteca constant.",
      "Serveste alaturi de muraturi.",
    ],
    tips: "AH Kookroom light sau Campina Kookroom light sunt inlocuitori directi pentru Cremosano Light daca nu gasesti la Lidl.",
  },

  salatHalloumi: {
    meal: "Masa 3", name: "Salata cu branza halloumi",
    ing: [
      ["Branza Halloumi cu Chilli Eridanous", "60g", "80g"],
      ["Salata verde", "50g", "50g"],
      ["Ardei capia/kapia", "50g", "50g"],
      ["Rosii cherry", "75g", "75g"],
      ["Castravete", "50g", "50g"],
      ["Ceapa rosie", "25g", "25g"],
      ["Iaurt grecesc 2% Zuzu Divin (dressing)", "100g", "120g"],
      ["Ulei de masline", "3ml", "3ml"],
      ["Lamaie", "10g", "10g"],
    ],
    tot: { n: { p:"~29g", c:"~14g", f:"~21g", k:"340" }, a: { p:"~38g", c:"~16g", f:"~27g", k:"420" } },
    steps: [
      "Spala salata verde si legumele. Taie legumele dupa preferinta.",
      "Amesteca iaurtul grecesc cu zeama de lamaie si putin usturoi granulat — acesta inlocuieste sosul traditional.",
      "Adauga dressing-ul de iaurt peste legume, impreuna cu uleiul de masline, sare si piper.",
      "Intr-o tigaie antiaderenta, prajeste branza halloumi la foc mediu, 1-2 minute pe fiecare parte sau pana devine aurie.",
      "Taie branza in cubulete si amesteca-o cu salata.",
    ],
    tips: "Iaurtul grecesc inlocuieste sosul — adauga proteina semnificativa fara calorii extra fata de un sos clasic.",
  },

  terciOvaz: {
    meal: "Masa 1", name: "Terci de ovaz cu mar si scortisoara",
    ing: [
      ["Fulgi de ovaz integral", "40g", "55g"],
      ["Lapte vegetal neindulcit Alpro ovaz", "200ml", "250ml"],
      ["Whey protein isolat", "25g", "30g"],
      ["Mar rosu", "100g", "100g"],
      ["Mix nuci Alesto", "10g", "15g"],
      ["Scortisoara macinata", "2g", "2g"],
      ["Erytrytol", "10g", "10g"],
      ["Esenta de vanilie", "1g", "1g"],
    ],
    tot: { n: { p:"~33g", c:"~52g", f:"~13g", k:"430" }, a: { p:"~44g", c:"~66g", f:"~17g", k:"560" } },
    steps: [
      "Adauga intr-o oala fulgii de ovaz, laptele vegetal, indulcitorul si un praf de sare.",
      "Lasa sa fiarba la foc mic, pana cand fulgii devin moi si cremosi. Amesteca din cand in cand. Spre final adauga scortisoara si esenta de vanilie.",
      "IA DE PE FOC, lasa sa se raceasca 1-2 minute, apoi amesteca whey protein — daca il adaugi la foc direct se grupeaza.",
      "Adauga merele taiate cubulete si nucile macinate.",
    ],
    tips: "Daca folosesti lapte de vaca 1.5% in loc de lapte vegetal castigi ~6g protein extra per portie.",
  },

  tacosBurger: {
    meal: "Masa 2", name: "Tacos burger sanatos", sub: ["tacos"],
    ing: [
      ["Piept de pui (total)", "150g (x3 portii)", "200g (x4 portii)"],
      ["Chifle integrale Mcennedy (Lidl)", "3 buc (75g)", "4 buc (100g)"],
      ["Cheddar felii", "30g", "40g"],
      ["Crema de branza Light", "30g", "40g"],
      ["Salata + rosii + ceapa", "dupa reteta x3", "dupa reteta x4"],
      ["Curry sauce GymBeam", "30g", "40g"],
    ],
    tot: { n: { p:"~55g", c:"~47g", f:"~19g", k:"560" }, a: { p:"~72g", c:"~60g", f:"~24g", k:"720" } },
    steps: ["Prepara conform sub-retetei. Gateste tot puiul odata, asamblezi tacos la final."],
    tips: "Curry sauce GymBeam este 0 calorii — foloseste fara grija.",
  },

  pulpePui: {
    meal: "Masa 3", name: "Pulpe de pui la cuptor cu mazare in sos de rosii",
    ing: [
      ["Pulpe pui dezosate fara piele Fragedo", "165g", "220g"],
      ["Mazare verde", "200g", "200g"],
      ["Rosii pasate Olympia", "100g", "100g"],
      ["Ceapa", "30g", "30g"],
      ["Ulei de cocos", "3g", "3g"],
      ["Ulei de masline", "3ml", "3ml"],
      ["Sare + piper + condimente", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"~40g", c:"~32g", f:"~11g", k:"380" }, a: { p:"~52g", c:"~32g", f:"~14g", k:"490" } },
    steps: [
      "Amesteca pulpele cu condimentele si uleiul de masline. Baga la cuptor intr-un vas de yena 20-25 min la 180C.",
      "Intr-un wok, caleste in ulei de cocos ceapa tocata marunt, 2-3 minute.",
      "Adauga mazarea si toarna rosiile pasate. Adauga un varf de lingurita de zahar si amesteca.",
      "Acopera cu un capac si lasa la foc mic 10 minute pana se face mazarea.",
      "Condimenteaza cu sare si piper. Poti adauga marar tocat daca iti place.",
    ],
    tips: "Pulpele se condimenteaza si se baga la cuptor inainte de a incepe mazarea — timing-ul se potriveste perfect.",
  },

  clatiteZi6: {
    meal: "Masa 1", name: "Clatite Japoneze Healthy & Super Fluffy", sub: ["clatite"],
    ing: [
      ["Oua medii", "2 oua (120g)", "3 oua (180g)"],
      ["Lapte vegetal neindulcit Alpro ovaz", "40ml", "60ml"],
      ["Faina integrala", "25g", "35g"],
      ["Whey protein isolat", "20g", "25g"],
      ["Praf de copt", "1g", "1g"],
      ["Esenta vanilie", "5g", "5g"],
      ["Erytrytol", "dupa gust", "dupa gust"],
      ["Zeama lamaie", "3ml", "3ml"],
      ["Zmeura", "50g", "50g"],
      ["Ricotta Lovilio", "60g", "80g"],
    ],
    tot: { n: { p:"~38g", c:"~32g", f:"~16g", k:"400" }, a: { p:"~51g", c:"~42g", f:"~20g", k:"520" } },
    steps: ["Prepara conform sub-retetei."],
    tips: "Whey-ul se amesteca cu laptele vegetal INAINTE sa se adauge la galbenusuri — nu direct la albusuri batute spuma.",
  },

  pastravCrocant: {
    meal: "Masa 2", name: "Pastrav crocant cu sos de usturoi si legume mexicane", sub: ["sosUsturoi"],
    ing: [
      ["Pastrav crud", "200g", "260g"],
      ["Ulei de masline", "2ml", "2ml"],
      ["Usturoi", "1 catel (5g)", "1 catel (5g)"],
      ["Sos de usturoi (din sub-reteta)", "1 portie (58g)", "1 portie (58g)"],
      ["Legume mexicane Freshona", "150g", "150g"],
    ],
    tot: { n: { p:"~55g", c:"~17g", f:"~16g", k:"440" }, a: { p:"~68g", c:"~17g", f:"~18g", k:"540" } },
    steps: [
      "Porniti cuptorul pe functia grill la 230C.",
      "Tamponati pastravul cu servete absorbante sa eliminati umiditatea in exces.",
      "Condimentati pe partea cu carnea cu sare, piper, cimbru uscat, usturoi ras si paprika.",
      "Stropiti cu ulei de masline si asezati cu partea condimentata in jos in tava cu hartie de copt.",
      "Coaceti la 230C, functia grill, 15 minute — fara sa intoarceti. Pielea va fi expusa caldurii directe.",
      "Legumele mexicane le faci intr-o tigaie antiaderenta pana scade apa. Potrivesti cu putina sare.",
      "Sosul de usturoi se prepara conform sub-retetei.",
    ],
    tips: "Nu intoarce pastravul — pielea devine crocanta direct expusa la grill.",
  },

  pizzaDiavola: {
    meal: "Masa 3", name: "Pizza diavola pe lipie",
    ing: [
      ["Tortilla Wrap Snack Day Lidl", "1 buc (62g)", "1 buc (62g)"],
      ["Mozzarella Lovillo for pizza", "50g", "50g"],
      ["Rosii pasate 365", "50g", "50g"],
      ["Usturoi", "1 catel (5g)", "1 catel (5g)"],
      ["Pasta de ardei iute Kania", "2g", "2g"],
      ["Sunca cu piper Dulano", "80g", "110g"],
      ["Condimente (oregano, sare)", "1g", "1g"],
    ],
    tot: { n: { p:"~33g", c:"~37g", f:"~17g", k:"420" }, a: { p:"~42g", c:"~37g", f:"~19g", k:"490" } },
    steps: [
      "Amesteca sosul de rosii impreuna cu usturoiul pisat, sare, piper, oregano si pasta de ardei iute.",
      "Toarna sosul peste lipie si intinde-l pe toata suprafata, lasand o margine de 1 cm, dupa care adauga mozzarella rasa.",
      "Deasupra adauga felii de sunca cu piper.",
      "Introdu la cuptor pentru aproximativ 8-10 minute la 200 de grade.",
      "La final presara deasupra fulgi de chilli.",
    ],
    tips: "Cu 80g sunca lipie devine mai consistenta — asigura-te ca o intinzi uniform ca sa nu cada la servire.",
  },

  gustare678: {
    meal: "Gustare", name: "Iaurt grecesc cu fructe",
    ing: [
      ["Iaurt grecesc 2% Zuzu Divin", "150g", "200g"],
      ["Fructe la alegere", "80g", "80g"],
    ],
    tot: { n: { p:"~13g", c:"~16g", f:"~3g", k:"130" }, a: { p:"~17g", c:"~20g", f:"~3g", k:"160" } },
    steps: ["Combina iaurtul cu fructele preferate."],
    tips: "Afine, capsuni si mere sunt cele mai recomandate.",
  },

  pasteCarbonara: {
    meal: "Masa 2", name: "Paste carbonara",
    ing: [
      ["Paste fainoase Penette integrale Barilla", "50g", "70g"],
      ["Cubulete sunca de porc Dulano", "100g", "140g"],
      ["Ou de gaina", "1 ou intreg", "2 oua intregi"],
      ["Parmezan Grana Padano Lovilio Lidl", "10g", "15g"],
      ["Sare himalaya + piper negru", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"~40g", c:"~42g", f:"~16g", k:"480" }, a: { p:"~56g", c:"~60g", f:"~20g", k:"640" } },
    steps: [
      "Pune pastele la fiert in apa cu sare conform indicatiilor de pe ambalaj.",
      "Calit baconul pana a eliminat din excesul de apa si a devenit putin crocant.",
      "Intr-un bol, bate oul cu putina sare si piper si amesteca-l cu 70% din parmezan.",
      "Strecura pastele si pune-le peste bacon. Pastreaza putina apa de la paste.",
      "OPRESTE FOCUL — adauga mixul de ou si amesteca foarte bine. Focul stins = liant cremos, nu ochiuri.",
      "Pune in farfurie si adauga putin parmezan ras deasupra.",
    ],
    tips: "Cu 1 ou intreg in loc de 0.5 liantul e mai cremos. Opreste intotdeauna focul inainte de a adauga oul.",
  },

  steakVita: {
    meal: "Masa 3", name: "Steak vita cu salata de rucola, parmezan si rosii cherry", sub: ["salataRucola"],
    ing: [
      ["Vrabioara de vita slaba", "160g", "210g"],
      ["Ulei de cocos", "2g", "2g"],
      ["Unt 80% Pilos", "5g", "5g"],
      ["Salata rucola-parmezan-rosii (1 portie)", "1 portie (195g)", "1 portie (195g)"],
    ],
    tot: { n: { p:"~53g", c:"~9g", f:"~22g", k:"440" }, a: { p:"~67g", c:"~9g", f:"~28g", k:"560" } },
    steps: [
      "Carnea sta 30 minute la temperatura camerei inainte de gatit.",
      "Incinge o tigaie de fonta la flacara maxim.",
      "Stropeste cu putin ulei de cocos si adauga carnea.",
      "Prajeste 2 min pe o parte, intoarce, adauga untul deasupra si lasa-l sa se topeasca.",
      "Intoarce pe fiecare parte cate 30 de secunde.",
      "Scoate carnea si lasa-o la odihnit pe o farfurie pentru 5 minute — nu o taia imediat.",
      "Salata se prepara conform sub-retetei.",
    ],
    tips: "Tigaie de fonta la maxim + repaus 5 min dupa gatit = steak perfect. Vrabioara poate fi inlocuita cu antricot de vita.",
  },
};

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
const DAYS = [
  { label:"Luni + Marti",  dates:"16-17 Mar", meals:["avocadoSomon","lasagna","mamaligaCarnati","gustare12"] },
  { label:"Mier + Joi",    dates:"18-19 Mar", meals:["eggrolls","puiCiuperci","salatHalloumi","gustare12"] },
  { label:"Vineri",        dates:"20 Mar",    meals:["terciOvaz","tacosBurger","pulpePui","gustare12"] },
  { label:"Sambata",       dates:"21 Mar",    meals:["clatiteZi6","pastravCrocant","pizzaDiavola","gustare678"] },
  { label:"Duminica",      dates:"22 Mar",    meals:["clatiteZi6","pasteCarbonara","steakVita","gustare678"] },
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
          {sr.note && <p style={{margin:"0 0 8px", fontSize:11, color:"#777", fontStyle:"italic"}}>{sr.note}</p>}
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
                fontWeight: diff ? "bold" : "normal", color: diff ? "#1a6b9a" : "#666",
                background: diff ? "#e8f4fd" : "transparent",
              }}>{row[1]}</td>
              <td style={{padding:"7px 13px", textAlign:"center", fontSize:12, borderBottom:"1px solid #f0f0f0",
                fontWeight: diff ? "bold" : "normal", color: diff ? "#7b3fa0" : "#666",
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

// ─── S12 ROUTE ────────────────────────────────────────────────────────────────
export default function S12() {
  const navigate = useNavigate();
  const [dayIdx,     setDayIdx]     = useState(0);
  const [mealIdx,    setMealIdx]    = useState(0);
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
        <div style={{fontSize:12, color:"#888", marginTop:2}}>S12 &nbsp;|&nbsp; 16–22 Martie 2026</div>
        <div style={{fontSize:11, color:"#aaa"}}>Nicoleta &amp; Andrei</div>
      </div>

      <DayTabs  days={DAYS}          active={dayIdx}  onSelect={selectDay} />
      <TotalsBar nKcal={totalKcal(day.meals, "n")} aKcal={totalKcal(day.meals, "a")} />
      <MealTabs mealKeys={day.meals} active={mealIdx} onSelect={selectMeal} />

      {meal && (
        <div style={{border:"2px solid", borderColor:mc.border, borderRadius:12, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{background:GREEN, color:"#fff", padding:"11px 15px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div style={{fontSize:10, opacity:0.7, marginBottom:1}}>{meal.meal} — {day.label} {day.dates} — S12</div>
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
