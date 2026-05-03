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
const SUB_RECIPES = {};

// ─── MEALS ────────────────────────────────────────────────────────────────────
const MEALS = {
  ouSourdough: {
    meal: "Masa 1", name: "Oua scrambled cu paine sourdough si rosii cherry",
    ing: [
      ["Oua mari", "3 oua", "4 oua"],
      ["Paine sourdough de casa", "60g (1 felie medie)", "80g"],
      ["Unt 80%", "5g (1 lingurita)", "5g"],
      ["Rosii cherry (taiate in jumatate)", "80g (un pumn)", "80g"],
      ["Sare, piper negru, ceapa verde", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"24g", c:"32g", f:"20g", k:"290" }, a: { p:"33g", c:"~42g", f:"~25g", k:"415" } },
    steps: [
      "Sparge ouale intr-un bol cu un praf de sare si piper. Bate bine pana nu mai sunt urme de albus.",
      "Pune felia de sourdough la toaster.",
      "Pune o tigaie antiaderenta mica la foc mic. Adauga untul si lasa-l sa se topeasca incet, fara sa se rumeneasca.",
      "Toarna ouale batute in tigaie. Folosind o spatula de silicon, impinge ouale de la margini spre centru in miscari lente de pliere. Nu amesteca — pliaza. Mentine focul mic pe tot parcursul.",
      "Cand ouale sunt ~80% facute — inca usor umede si lucioase — ia tigaia complet de pe foc. Caldura reziduala le va termina in ~30 secunde. Trebuie sa fie moi, cremoase si abia legate. Daca arata complet uscate in tigaie, sunt prea gatite.",
      "Taie rosiile cherry in jumatate. Aseaza-le pe farfurie alaturi de paine.",
      "Pune ouale deasupra painii. Termina cu ceapa verde feliata daca folosesti.",
    ],
    tips: "Singura regula la oua scrambled: foc mic, miscari lente, ia de pe foc inainte sa para gata.",
  },

  quesadillaPui: {
    meal: "Masa 2", name: "Quesadilla cu pui si cascaval topit",
    ing: [
      ["Piept de pui", "120g", "185g"],
      ["Tortilla integrala (50g bucata)", "1 mica", "2 mici"],
      ["Cascaval ras (emmental sau cheddar)", "30g (un pumn mic)", "40g"],
      ["Ardei rosu (taiat cubulete mici)", "60g", "60g"],
      ["Iaurt grecesc 2% (sos dipping)", "50g (3 linguri)", "50g"],
      ["Paprika afumata, usturoi praf, sare", "2g mix", "2g"],
    ],
    tot: { n: { p:"43g", c:"30g", f:"13g", k:"390" }, a: { p:"66g", c:"~50g", f:"~18g", k:"575" } },
    steps: [
      "Taie pieptul de pui in cubulete foarte mici (~1cm). Condimenteaza cu paprika afumata, usturoi praf si sare.",
      "Incinge o tigaie antiaderenta uscata la foc mediu-mare. Adauga puiul intr-un strat uniform — nu il ingramadi. Gateste fara sa amesteci 3 minute pana se aureste pe fund, apoi amesteca si gateste inca 3-4 minute pana e complet gatit (fara roz in interior). Pune deoparte.",
      "Pastreaza aceeasi tigaie la foc mediu. Pune o tortilla plat in tigaie.",
      "Pe jumatate din tortilla: presara cascavalul ras intai (acesta actioneaza ca lipici), adauga bucatile de pui, apoi ardeiul. Ramai pe o jumatate — lasa cealalta libera.",
      "Plieaza jumatatea goala peste umplutura formand un semicerc. Apasa usor cu spatula.",
      "Gateste 2-3 minute pana fundul e auriu si crocant. Intoarce cu atentie si gateste inca 2 minute. Cascavalul din interior trebuie sa fie complet topit.",
      "Pune pe un tocator. Taie in 3 triunghiuri. Serveste cu iaurt grecesc ca sos dipping.",
    ],
    tips: "Cascavalul ras este esential — nu il inlocui cu felii de cascaval care nu se topesc la fel. Porumbul a fost eliminat fata de W14 pentru a economisi 8g carbohidrati.",
  },

  tikkaMasala: {
    meal: "Masa 3", name: "Chicken Tikka Masala cu orez basmati",
    ing: [
      ["Piept de pui (cubulete 2cm)", "140g", "210g"],
      ["Crema de cocos (din frigider)", "90ml (6 linguri)", "90ml"],
      ["Passata de rosii", "80ml (5 linguri)", "80ml"],
      ["Orez basmati crud", "40g", "65g"],
      ["Ceapa alba (taiat marunt)", "40g (jumatate mica)", "40g"],
      ["Usturoi (tocat marunt)", "2 catei", "2 catei"],
      ["Ghimbir proaspat/uscat", "1 lingurita proaspat / 1/2 uscat", "la fel"],
      ["Garam masala", "1 lingurita", "1 lingurita"],
      ["Paprika afumata", "1 lingurita", "1 lingurita"],
      ["Chimion macinat", "1/2 lingurita", "1/2 lingurita"],
      ["Turmeric macinat", "1/4 lingurita", "1/4 lingurita"],
      ["Ulei de masline", "5ml (1 lingurita)", "5ml"],
      ["Spanac proaspat", "40g (2 pumni)", "40g"],
      ["Sare", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"36g", c:"42g", f:"18g", k:"455" }, a: { p:"53g", c:"~63g", f:"~25g", k:"625" } },
    steps: [
      "Gateste orezul intai: clateste orezul crud pana apa curge limpede. Pune intr-o oala mica cu de 1.5 ori volumul sau de apa rece si un praf de sare. Adu la fierbere la foc mare, reduce imediat la minimum, pune capacul si gateste 10 minute. Stinge focul — nu ridica capacul. Lasa 5 minute. Afaneaza cu o furculita.",
      "Cat fierbe orezul, incalzeste uleiul de masline intr-o oala cu fund gros la foc mediu-mare.",
      "Adauga cubuletele de pui. Presara jumatate din condimente direct pe pui. Gateste 3-4 minute, intorcand ocazional, pana se aureste pe majoritatea partilor. Puiul nu trebuie sa fie complet gatit — va termina in sos. Pune deoparte.",
      "Reduce focul la mediu. Adauga ceapa in aceeasi oala (cu uleiul condimentat si sucurile de pui). Gateste 3 minute amestecand pana ceapa se moaie si devine translucida.",
      "Adauga usturoiul si ghimbirul. Gateste 1 minut — trebuie sa simti ca aroma se schimba si devine parfumata.",
      "Adauga restul condimentelor. Amesteca 30 secunde pentru a le praiji in ulei. Acest pas adanceste semnificativ aroma — nu il sari.",
      "Toarna passata de rosii. Amesteca bine si lasa sa fiarba 3 minute, razuind fundul oalei.",
      "Adauga crema de cocos si amesteca pana se combina complet. Sosul trebuie sa fie acum de culoare portocaliu-rosu si cremos.",
      "Reintoarce puiul in oala. Reduce la foc mic si fierbe 8-10 minute amestecand ocazional, pana puiul e complet gatit.",
      "Adauga spanacul si amesteca pana se ofileste — ~1 minut.",
      "Gust si ajusteaza sarea. Serveste peste orezul basmati.",
      "Reincalzire marti: pune curry (fara orez) intr-o oala la foc mic cu un strop de apa. Amesteca si incalzeste 5-6 minute. Gateste orez proaspat. Nu pune sosul la microunde — se poate separa.",
    ],
    tips: "Prajirea puiului cu condimentele pe el inainte de a construi sosul creeaza margini caramelizate si aromate care nu pot fi obtinute altfel. Nu sari pasul 3.",
  },

  avocadoToastOua: {
    meal: "Masa 1", name: "Avocado toast cu oua fierte moi pe sourdough",
    ing: [
      ["Paine sourdough de casa", "55g (1 felie medie)", "80g"],
      ["Avocado copt", "60g (putin peste jumatate dintr-un avocado mediu)", "75g"],
      ["Oua (fierte moi)", "3 oua", "3 oua"],
      ["Zeama de lamaie proaspata", "o stoarcere", "o stoarcere"],
      ["Fulgi de chilli", "un praf", "un praf"],
      ["Rucola", "20g (un pumn mic)", "20g"],
      ["Sare fulgi, piper negru", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"24g", c:"29g", f:"24g", k:"305" }, a: { p:"30g", c:"~38g", f:"~30g", k:"415" } },
    steps: [
      "Fierbe ouale moi: adu o oala mica de apa la fierbere completa. Coboara ouale cu grija cu o lingura. Pentru galbenus cremos, usor moale: gateste exact 7 minute. Pentru galbenus complet facut: 9 minute. Transfera imediat intr-un bol cu apa rece 2 minute pentru a opri gatitul. Curata sub jet de apa rece.",
      "Cat se racesc ouale, prajeste felia de sourdough.",
      "Taie avocado in jumatate si scoate samburele. Scurge miezul intr-un bol mic. Adauga zeama de lamaie si un praf de sare. Zdrobeste cu o furculita — lasa putina textura, nu face pasta.",
      "Intinde avocado pe paine intr-un strat uniform.",
      "Pune rucola deasupra avocado.",
      "Curata si taie ouale in jumatate pe lungime. Aseaza cu fata taiata in sus deasupra rucolei asa incat galbenusul sa fie vizibil.",
      "Termina cu fulgi de chilli, inca o stoarcere mica de lamaie si sare fulgi.",
    ],
    tips: "Pentru a economisi timp dimineata, fierbe si curata ouale seara inainte. Pastreaza la frigider intr-un recipient mic. Dimineata doar feliezi si servesti.",
  },

  beefWraps: {
    meal: "Masa 2", name: "Rulouri de vita in frunze de salata cu sos yogurt-tahini",
    ing: [
      ["Carne vita tocata slaba (max 5% grasime)", "120g", "190g"],
      ["Ardei kapia rosii la borcan (scurse, feliate)", "80g", "80g"],
      ["Frunze salata butter (mari, ferme)", "6 frunze mari", "6 frunze"],
      ["Iaurt grecesc 2%", "50g (3 linguri)", "50g"],
      ["Tahini (pasta de susan)", "10g (1 lingurita)", "12g"],
      ["Usturoi (pentru sos)", "1 catel mic", "1 mic"],
      ["Zeama de lamaie", "1 lingura", "1 lingura"],
      ["Chimion macinat", "1/2 lingurita", "1/2 lingurita"],
      ["Paprika afumata", "1/2 lingurita", "1/2 lingurita"],
      ["Sare", "dupa gust", "dupa gust"],
      ["Rosii cherry (taiate in jumatate)", "80g", "80g"],
      ["Patrunjel sau menta proaspata", "un pumn mic", "un pumn"],
    ],
    tot: { n: { p:"35g", c:"14g", f:"17g", k:"380" }, a: { p:"53g", c:"~18g", f:"~22g", k:"540" } },
    steps: [
      "Prepara sosul intai: zdrobeste catelul de usturoi cu latul cutitului si un praf de sare (apasa si trage lama repetat peste usturoi pana devine o pasta neteda). Amesteca iaurtul, tahini, pasta de usturoi, zeama de lamaie si un praf de sare pana e cremos si omogen. Trebuie sa fie acrisor, cu gust de nuci si usturoi. Pune deoparte.",
      "Gateste carnea tocata: incinge o tigaie antiaderenta uscata la foc mare — trebuie sa fie bine fierbinte inainte de a pune carnea. Adauga carnea si desface imediat cu o lingura de lemn in bucati mici, egale.",
      "Condimenteaza cu chimion, paprika afumata si sare. Gateste la foc mare 7-8 minute, amestecand si sfarmand ocazional, pana carnea e bine rumenita si are margini usor crocante. Nu te grabi — rumenirea corecta da aroma. Daca tigaia abureaza in loc sa sfaraie, focul e prea mic.",
      "Ia de pe foc. Gust si ajusteaza condimentele.",
      "Asamblare: aseaza frunzele de salata pe o farfurie ca niste taco-uri — sunt suficient de ferme pentru a tine umplutura. Umple fiecare frunza cu carne tocata, fasii de ardei, rosii cherry si un fir de sos yogurt-tahini. Orneaza cu patrunjel sau menta.",
      "Joi: pastreaza carnea gatita la frigider (fara salata sau sos). Reincalzeste intr-o tigaie cu un strop de apa, 3-4 minute la foc mediu. Asambleaza proaspat.",
    ],
    tips: "Sosul tahini-yogurt este ancora de aroma a acestui preparat. Fa extra — se pastreaza la frigider 3 zile si merge excelent ca dip pentru legume crude.",
  },

  puiCiuperci: {
    meal: "Masa 3", name: "Pui cu ciuperci si mamaliguta",
    ing: [
      ["Piept de pui (fasii subtiri)", "140g", "210g"],
      ["Ciuperci champignon sau chestnut (feliate)", "100g", "100g"],
      ["Smantana lichida 12%", "40ml (2.5 linguri)", "50ml"],
      ["Passata de rosii", "50ml (3 linguri)", "50ml"],
      ["Ceapa alba (taiat marunt)", "30g (o ceapa mica)", "30g"],
      ["Usturoi (tocat marunt)", "2 catei", "2 catei"],
      ["Ulei de cocos (sau de masline)", "5g (1 lingurita)", "5g"],
      ["Malai fin (greutate cruda)", "45g", "70g"],
      ["Apa (pentru mamaliga)", "135ml (de 3x malaiul)", "210ml"],
      ["Sare, piper negru", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"37g", c:"38g", f:"14g", k:"450" }, a: { p:"54g", c:"~57g", f:"~17g", k:"610" } },
    steps: [
      "Incepe mamaliga: raportul e intotdeauna 3 parti apa la 1 parte malai. Adu apa cu sare la fierbere completa intr-o oala medie.",
      "Cand fierbe, reduce la foc mediu. Toarna malaiul incet, in fir subtire, amestecand constant pe masura ce torni. Nu te opri din amestecat in aceasta etapa sau se formeaza cocoloase.",
      "Odata incorporat tot malaiul, reduce la foc mic. Amesteca continuu 5-8 minute pana mamaliga se ingroasa si se desprinde curat de pe peretii oalei. Ia de pe foc, acopera cu capac si pune deoparte.",
      "Cat fierbe mamaliga, feliaza pieptul de pui in fasii de ~0.5cm. Condimenteaza cu sare si piper pe ambele parti.",
      "Incinge uleiul de cocos intr-o tigaie mare sau wok la foc mediu-mare.",
      "Adauga fasiile de pui intr-un singur strat. Gateste fara sa amesteci 2-3 minute pana se aureste pe o parte. Intoarce.",
      "Adauga ceapa si usturoiul in tigaie alaturi de pui. Amesteca totul si gateste inca 2 minute la foc mediu.",
      "Adauga ciupercile feliate. Gateste 5 minute amestecand ocazional, pana ciupercile au eliminat lichidul si s-au redus semnificativ.",
      "Toarna passata de rosii. Amesteca si fierbe 3 minute.",
      "Ia tigaia complet de pe foc. Adauga smantana lichida si amesteca. Nu pune tigaia inapoi pe foc — smantana se separa daca fierbe. Sosul va fi cremos si neted.",
      "Gust si ajusteaza sarea si piperul. Serveste sosul de pui cu ciuperci peste mamaliga.",
      "Reincalzire joi: incalzeste sosul de pui intr-o tigaie la foc mic cu 2 linguri de apa, amestecand usor 5-6 minute. Fa mamaliga proaspata — dureaza doar 8 minute si nu se reincalzeste bine.",
    ],
    tips: "Ia tigaia complet de pe foc inainte de a adauga smantana — acesta este cel mai important pas. Smantana adaugata in tigaia fierbinte se va separa si va arata taiat.",
  },

  budinacaOvaz: {
    meal: "Masa 1", name: "Snickers Overnight Oats (Budinca Ovaz)",
    ing: [
      ["Fulgi de ovaz", "50g", "70g"],
      ["MyProtein Clear Whey Isolate (1 masura)", "25g", "25g"],
      ["Lapte semidegresat 1.5%", "150ml", "190ml"],
      ["Unt de arahide natural (fara zahar adaugat)", "10g (1 lingurita)", "14g"],
      ["Cacao pudra neindulcita", "5g (1 lingurita)", "5g"],
      ["Erytrytol (indulcitor)", "5g (1 lingurita)", "5g"],
    ],
    tot: { n: { p:"33g", c:"44g", f:"8g", k:"300" }, a: { p:"38g", c:"~58g", f:"~11g", k:"400" } },
    steps: [
      "Joi seara: masoara fulgii de ovaz intr-un borcan sau recipient cu capac.",
      "Toarna laptele. Adauga erytrytolul si cacao pudra. Amesteca bine pana cacao se dizolva complet — fara zone uscate.",
      "Adauga whey-ul si amesteca din nou de la fundul borcanului in sus pana se combina complet. Amestecul va parea gros.",
      "Pune untul de arahide deasupra ca un strat — nu il amesteca in compozitie.",
      "Inchide capacul si pune la frigider peste noapte.",
      "Vineri dimineata: ia direct din frigider. Adauga un praf de sare fulgi deasupra stratului de unt de arahide. Mananca rece, direct din borcan.",
    ],
    tips: "Fulgii de ovaz redusi la 50g fata de W14 pentru a economisi carbohidrati pentru cina. Daca pare prea subtire, adauga 10g fulgi in plus data viitoare.",
  },

  zucchiniPorc: {
    meal: "Masa 2", name: "Dovlecei umpluti cu carne de porc si sos de rosii",
    ing: [
      ["Carne de porc tocata slaba (5-8% grasime)", "120g", "190g"],
      ["Dovlecei medii", "2 buc (~300g total)", "2 buc"],
      ["Passata de rosii", "80ml (5 linguri)", "80ml"],
      ["Branza feta light (sfaramata)", "25g", "30g"],
      ["Ceapa alba (taiat marunt)", "30g", "30g"],
      ["Usturoi (tocat marunt)", "1-2 catei", "1-2 catei"],
      ["Ulei de masline", "5ml (1 lingurita)", "5ml"],
      ["Oregano uscat", "1/2 lingurita", "1/2 lingurita"],
      ["Paprika afumata", "1/2 lingurita", "1/2 lingurita"],
      ["Sare, piper negru", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"33g", c:"14g", f:"16g", k:"360" }, a: { p:"48g", c:"~18g", f:"~20g", k:"500" } },
    steps: [
      "Preincalzeste cuptorul la 200C (ventilat 180C).",
      "Pregateste dovleceii: taie fiecare in jumatate pe lungime. Folosind o lingura, scoate miezul moale din centru — lasa o coaja de ~1cm grosime. Pastreaza miezul scos, nu il arunca — merge in umplutura. Toaca-l marunt.",
      "Incinge uleiul de masline intr-o tigaie la foc mediu-mare. Adauga ceapa si gateste 2-3 minute pana se moaie.",
      "Adauga usturoiul si gateste 30 secunde pana devine parfumat.",
      "Adauga carnea de porc tocata si miezul de dovlecel tocat. Desface carnea cu o lingura de lemn. Gateste la foc mediu-mare 5-6 minute amestecand regulat, pana carnea e rumenita si orice lichid din dovlecel s-a evaporat.",
      "Adauga passata de rosii, paprika afumata, oregano, sare si piper. Amesteca si gateste inca 2-3 minute pana sosul se reduce putin si e dens. Gust si ajusteaza.",
      "Aseaza halvele de dovlecel goale pe o tava tapetata cu hartie de copt. Umple fiecare jumatate generos cu mixul de carne — apasa ferm si fa un munte usor.",
      "Sfarama feta uniform deasupra fiecarui dovlecel umplut.",
      "Da la cuptor 20-22 minute pana dovlecelul e fraged cand e intepat cu o furculita si feta de deasupra e aurie.",
      "Serveste imediat — 2 jumatati umplute per persoana pentru Nicoleta.",
    ],
    tips: "Aceasta e o masa pe o tava cu aproape zero timp activ dupa ce umple dovleceii. Cat sta la cuptor, pregateste pastravul pentru cina de vineri.",
  },

  pastravFileuri: {
    meal: "Masa 3", name: "File de pastrav la cuptor cu piure de morcovi si spanac ofilit",
    ing: [
      ["File de pastrav (proaspat/congelat — dezgheat in frigider)", "160g", "220g"],
      ["Morcovi", "180g (3 medii)", "180g"],
      ["Usturoi", "3 catei total", "3 catei"],
      ["Lapte semidegresat (pentru piure)", "40ml (2.5 linguri)", "40ml"],
      ["Spanac proaspat", "80g (3-4 pumni)", "80g"],
      ["Ulei de masline", "5ml (1 lingurita)", "8ml"],
      ["Zeama de lamaie proaspata", "1 lingura", "1 lingura"],
      ["Marar proaspat sau uscat", "1 lingura proaspat / 1 lingurita uscat", "la fel"],
      ["Sare, piper negru", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"39g", c:"20g", f:"13g", k:"430" }, a: { p:"53g", c:"~22g", f:"~17g", k:"545" } },
    steps: [
      "Preincalzeste cuptorul la 180C (ventilat 160C).",
      "Curata morcovii si taie-i in bucati de ~2cm. Pune intr-o oala cu 1 catel de usturoi (intreg, curatat) si acopera cu apa rece sarata. Adu la fierbere si gateste 15-18 minute pana sunt complet moi — o furculita trebuie sa alunece prin ei fara rezistenta.",
      "Cat fierb morcovii, pregateste pastravul: cu un cutit ascutit, cresteaza pielea de 3 ori diagonal (previne curbarea in cuptor). Condimenteaza ambele parti cu sare, piper, zeama de lamaie si marar. Aseaza cu pielea in jos pe o tava tapetata cu hartie de copt. Pune 2-3 felii subtiri de usturoi deasupra.",
      "Coace pastravul 14-15 minute. E gata cand carnea s-a transformat din translucida in complet opaca si se sfarama usor la apasarea cu o furculita. Nu il intoarce.",
      "Fa piureul de morcovi: scurge morcovii gatiti si catelul de usturoi (s-a inmuiat si are gust bland). Reintoarce in oala goala. Adauga laptele cald si uleiul de masline. Mixeaza cu un blender vertical pana e complet neted. Daca nu ai blender, zdrobeste energic cu furculita si trece prin sita. Condimenteaza cu sare. Daca e prea dens, adauga un strop de lapte.",
      "Ofileste spanacul: intr-o tigaie mica la foc mediu, adauga un fir de ulei. Adauga usturoiul ramas (feliat subtire). Gateste 30 secunde. Adauga tot spanacul deodata — pare mult dar se reduce dramatic. Amesteca 1-2 minute pana e complet ofilit si orice lichid s-a evaporat. Condimenteaza cu sare.",
      "Plating: piureul de morcovi pe o parte a farfuriei, spanacul pe cealalta, fileul de pastrav asezat deasupra sau alaturi. Stoarce zeama de lamaie proaspata peste peste chiar inainte de servire.",
    ],
    tips: "Piureul de morcovi suna elaborat dar e doar morcovi fierti mixati cu putin lapte. Cheia e sa mixezi cat inca sunt fierbinti si sa adaugi suficient lapte — trebuie sa curga incet de pe lingura, nu sa stea rigid.",
  },

  smokeyPorc: {
    meal: "Masa 3", name: "Muschiulet de porc cu crusta de paprika si piure de cartofi dulci",
    ing: [
      ["Muschiulet de porc (bucata intreaga)", "130g", "195g"],
      ["Cartofi dulci", "150g (1 mare)", "200g"],
      ["Paprika afumata", "1 lingurita", "1 lingurita"],
      ["Paprika dulce", "1/2 lingurita", "1/2 lingurita"],
      ["Usturoi praf", "1/2 lingurita", "1/2 lingurita"],
      ["Cimbru uscat", "1/2 lingurita", "1/2 lingurita"],
      ["Iaurt grecesc 2% (sos de tigaie)", "50g (3 linguri)", "50g"],
      ["Unt 80% (pentru piure)", "5g (1 lingurita)", "5g"],
      ["Lapte semidegresat (pentru piure)", "50ml (3 linguri)", "50ml"],
      ["Buchete de broccoli", "100g", "100g"],
      ["Ulei de masline", "5ml (1 lingurita)", "5ml"],
      ["Sare, piper negru", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"39g", c:"34g", f:"15g", k:"420" }, a: { p:"53g", c:"~45g", f:"~18g", k:"555" } },
    steps: [
      "Curata cartofii dulci si taie-i cubulete de 2cm. Pune intr-o oala, acopera cu apa rece sarata, adu la fierbere si gateste 12-15 minute pana sunt complet moi.",
      "Cat fierb cartofii, fa amestecul de condimente: amesteca paprika afumata, paprika dulce, usturoi praf, cimbru si un praf generos de sare intr-un bol mic. Tamponeza muschiuletul cu servetele de bucatarie, apoi freaca amestecul de condimente pe toata suprafata — apasa pe toate partile.",
      "Incinge o tigaie rezistenta la cuptor la foc mare. Adauga uleiul de masline. Rumeneste porcul 2 minute pe fiecare parte, intorcandu-l pentru a rumeni toate partile — ~8 minute total. Tigaia trebuie sa fie suficient de fierbinte incat sa auzi un sfariit puternic imediat.",
      "Transfera tigaia direct in cuptorul preincalzit la 180C pentru 12-15 minute. Adauga buchetele de broccoli pe o tava separata pentru ultimele 12 minute, unse cu un fir de ulei si sare.",
      "Porcul e gata cand partea cea mai groasa e ferma dar cu putina elasticitate la apasare. Temperatura interna: 63C. Scoate din cuptor si lasa muschiuletul pe un tocator 5 minute complete inainte de a-l felia.",
      "Fa sosul de tigaie cat porcul se odihneste: tigaia va avea resturi caramelizate pe fund. Adauga 50ml apa in tigaia fierbinte la foc mediu, razuind toate resturile cu o spatula. Odata ce apa a absorbit resturile, stinge complet focul. Incorporeaza iaurtul grecesc. Nu mai incalzi — se separa daca fierbe.",
      "Fa piureul de cartofi dulci: scurge cartofii. Reintoarce in oala. Zdrobeste cu un zdrobitor. Adauga untul si laptele cald. Continua sa zdrobesti si sa amesteci pana e neted si pufos. Condimenteaza cu sare.",
      "Feliaza muschiuletul in medaliane. Serveste peste piure cu broccoli alaturi. Toarna sosul de iaurt condimentat peste porc.",
    ],
    tips: "Adaugarea iaurtului in tigaia luata complet de pe foc este pasul critic. Nu reduce doar focul — ia tigaia de pe aragaz inainte de a incorpora iaurtul.",
  },

  snack: {
    meal: "Gustare", name: "Iaurt grecesc cu fructe de padure si whey",
    ing: [
      ["Iaurt grecesc 5% grasime", "150g", "200g"],
      ["Fructe de padure mix (afine sau zmeura)", "80g", "80g"],
      ["MyProtein Clear Whey Isolate (1 masura)", "25g", "25g"],
    ],
    tot: { n: { p:"~30g", c:"~15g", f:"~8g", k:"150" }, a: { p:"~33g", c:"~17g", f:"~9g", k:"190" } },
    steps: [
      "Pune iaurtul intr-un bol.",
      "Adauga fructele de padure.",
      "Incorporeaza whey-ul din fundul bolului in sus — se dizolva in iaurt fara cocoloase daca amesteci in sus.",
    ],
    tips: "Aceeasi gustare in fiecare zi, ora 16:00. Dureaza 2 minute. In zilele de restaurant (Sambata/Duminica): sarim whey-ul si mancam doar iaurt cu fructe.",
  },

  snackRestaurant: {
    meal: "Gustare", name: "Iaurt grecesc cu fructe (zi de restaurant)",
    ing: [
      ["Iaurt grecesc 5% grasime", "150g", "200g"],
      ["Fructe de padure mix (afine sau zmeura)", "80g", "80g"],
    ],
    tot: { n: { p:"~10g", c:"~14g", f:"~8g", k:"90" }, a: { p:"~13g", c:"~16g", f:"~9g", k:"110" } },
    steps: [
      "Pune iaurtul intr-un bol.",
      "Adauga fructele de padure si amesteca.",
    ],
    tips: "Zi de restaurant: sarim whey-ul pentru a crea spatiu caloric pentru masa de la restaurant. Economisesti ~60 kcal si 14g carbohidrati.",
  },

  restaurant: {
    meal: "Masa 2", name: "Masa la restaurant",
    ing: [
      ["Proteina: peste la gratar, pui, steak sau oua", "600–700 kcal estimat", "variabil"],
      ["Sos: intotdeauna pe lateral", "—", "—"],
      ["Paine: sari cosul sau cere sa nu il aduca", "—", "—"],
    ],
    tot: { n: { p:"~35g", c:"~50g", f:"~25g", k:"~650" }, a: { p:"~45g", c:"~60g", f:"~30g", k:"~700" } },
    steps: [
      "Comanda: peste la gratar, piept de pui, steak sau oua. Cere sosul pe lateral.",
      "Evita: paste, pizza, sosuri cremoase, preparate cu orez — cu exceptia cazului in care mananci foarte usor restul zilei.",
      "Sari cosul cu paine sau cere sa nu il aduca.",
      "Andrei: fara carne procesata ca proteina principala (colesterol). Alege peste, pui sau steak.",
      "Aceasta e masa principala a zilei ca aport caloric — planifica micul dejun si cina in jurul ei.",
    ],
    tips: "Caloriile estimate per masa la restaurant: 600-700 kcal. Daca apare un preparat cu sos cremos sau multi carbohidrati la pranz, cina trebuie sa fie proteina + salata — planificat inainte de a pleca de acasa.",
  },
};

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
const DAYS = [
  { label:"Luni + Marti", dates:"5-6 Mai",  meals:["ouSourdough","quesadillaPui","tikkaMasala","snack"] },
  { label:"Mier + Joi",   dates:"7-8 Mai",  meals:["avocadoToastOua","beefWraps","puiCiuperci","snack"] },
  { label:"Vineri",       dates:"9 Mai",    meals:["budinacaOvaz","zucchiniPorc","pastravFileuri","snack"] },
  { label:"Sambata",      dates:"10 Mai",   meals:["ouSourdough","restaurant","smokeyPorc","snackRestaurant"] },
  { label:"Duminica",     dates:"11 Mai",   meals:["ouSourdough","restaurant","smokeyPorc","snackRestaurant"] },
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

// ─── W15 ROUTE ────────────────────────────────────────────────────────────────
export default function W15() {
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
        <div style={{fontSize:12, color:"#888", marginTop:2}}>W15 &nbsp;|&nbsp; 5–11 Mai 2026</div>
        <div style={{fontSize:11, color:"#aaa"}}>Nicoleta &amp; Andrei</div>
      </div>

      <DayTabs  days={DAYS}          active={dayIdx}  onSelect={selectDay} />
      <TotalsBar nKcal={totalKcal(day.meals, "n")} aKcal={totalKcal(day.meals, "a")} />
      <MealTabs mealKeys={day.meals} active={mealIdx} onSelect={selectMeal} />

      {meal && (
        <div style={{border:"2px solid", borderColor:mc.border, borderRadius:12, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{background:GREEN, color:"#fff", padding:"11px 15px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div style={{fontSize:10, opacity:0.7, marginBottom:1}}>{meal.meal} — {day.label} {day.dates} — W15</div>
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
