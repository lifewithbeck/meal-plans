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

// ─── WEEK DATA ────────────────────────────────────────────────────────────────
// ADD NEW WEEKS HERE — just copy the week object and fill in the data from the PDF
const WEEKS = {
  "S11-S12": {
    label: "S11-S12",
    dates: "16-22 Martie 2026",
    subRecipes: {
      lasagna: {
        name:"Lasagna healthy", emoji:"🍝",
        note:"5 portii | Prep 10 min | Gatire 40 min",
        ing:[
          ["Foi de lasagna Barilla","208g"],
          ["Carne tocata vita-porc 15% Lidl","417g"],
          ["Morcovi","83g"],
          ["Ceapa","83g"],
          ["Rosii pasate 365","250g"],
          ["Ulei de cocos","7g"],
          ["Ou de gaina","1.5 Oua (1 ou intreg + 1 albus)"],
          ["Iaurt Skyr Pilos / Milbona Lidl","83g"],
          ["Parmezan","17g"],
          ["Condimente","4g"],
        ],
        steps:[
          "Preincalzeste cuptorul la 180C.",
          "Intr-o tigaie antiaderenta, pune ceapa taiata marunt si morcovul dat pe razatoare la calit.",
          "Cand se inmoaie putin legumele, pune si carnea tocata. Amesteca constant pana carnea se rumeneste bine si s-a amestecat uniform cu legumele. Adauga condimentele (sare, piper, busuioc, oregano) si rosiile pasate. Lasa sa fiarba cateva minute.",
          "Intr-un vas termorezistent din sticla-yena, pune pe rand cate un strat de foi de lasagna si un strat de carne. Stratul de jos si cel de sus trebuie sa fie din foi (nu din carne). Nu lasa spatii goale intre foile de lasagna.",
          "Amesteca ouale cu iaurtul si cu parmezanul si toarna uniform deasupra. Pune la cuptor ~40 min pana devine aurie deasupra si pastele s-au inmuiat.",
          "Taie-o in 5 bucati.",
        ],
        tips:"Poti folosi orice amestec de carne tocata. Pentru o varianta mai light alege piept de pui, curcan sau pulpa de vita slaba.",
      },
      tacos: {
        name:"Tacos burger @aurelsolea_fitness", emoji:"🌮",
        note:"1 portie | Prep 2 min | Gatire 3 min",
        ing:[
          ["Piept de pui Lidl","50g"],
          ["Condimente","1g"],
          ["Ulei de cocos","1g"],
          ["Chifle burger integrale Mcennedy (Lidl)","25g"],
          ["Crema de branza Cream Spread Light Pilos","10g"],
          ["Cheddar felii Carrefour","10g"],
          ["Salata verde","20g"],
          ["Rosii","10g"],
          ["Ceapa rosie","10g"],
          ["Curry sauce cu indulcitor GymBeam","10g"],
        ],
        steps:[
          "Condimenteaza pieptul cu sare si piper si prajeste-l intr-o tigaie antiaderenta incinsa bine, unsa cu putin ulei de cocos. Prajeste carnea aproximativ 2-3 min. pe fiecare parte, la foc mare.",
          "Chifla se desface si se aseaza cu miezul pe un tocator. Se trece cu un sucitor peste chifla, astfel incat sa devina mai subtire.",
          "Se unge chifla pe interior cu crema de branza, iar deasupra se aseaza cascavalul feliat si fasii din piept de pui. Se plieaza in doua, cu miezul la interior, si se aseaza intr-un vas termorezistent.",
          "Se rumenesc la cuptor pentru 5-7 minute, pana cand cascavalul s-a topit si chifla devine putin crocanta.",
          "Se introduce in fiecare tacos salata verde, rosii, ceapa rosie, iar deasupra se adauga sosul. Enjoy!",
        ],
        tips:"Poti sa adaugi orice alte legume iti fac placere. Sosul Curry GymBeam nu contine calorii, grasimi sau zahar.",
      },
      clatite: {
        name:"Clatite Japoneze Healthy & Super Fluffy", emoji:"🥞",
        note:"1 portie | Prep 12 min | Gatire 8 min",
        ing:[
          ["Ou crud","2 Oua medii M (120g)"],
          ["Lapte 1,5% Pilos","40g"],
          ["Faina integrala","25g"],
          ["Praf de copt","1g"],
          ["Esenta de vanilie","5g"],
          ["Erytrytol","30g"],
          ["Zeama de lamaie","3ml"],
          ["Sare himalaya","0.1g"],
          ["Zmeura","50g"],
          ["Erytrytol topping","10g"],
          ["Branza Ricotta Lovilio","30g"],
        ],
        steps:[
          "Intr-un bol amesteca faina impreuna cu praful de copt si praful de sare.",
          "Separa galbenusul de albus in 2 boluri separate.",
          "Amesteca galbenusul cu laptele, esenta de vanilie si faina si omogenizeaza compozitia.",
          "Bate albusul spuma utilizand un tel sau mixer. Dupa ce incepe sa se transforme in spuma, incorporeaza erytrytolul pudra si continua sa bati pana obtii o bezea tare.",
          "In bolul cu faina, incorporeaza cu grija spuma din albus cu miscari circulare de jos in sus. Nu omogeniza complet — blatul trebuie sa fie aerat si pufos.",
          "Incinge o tigaie antiaderenta, pulverizeaza ulei cocos spray si redu focul la minim. Adauga trei linguri de compozitie intr-un inel de inox. Adauga o lingura de apa in tigaie si pune capacul.",
          "Dupa 5-6 minute intoarce inelul pe partea opusa si mai lasa inca 3-4 minute. Scoate inelele din tigaie si lasa-le sa se raceasca putin inainte sa scoti clatita din forma.",
          "Dupa 2-3 minute ridica capacul si mai adauga un polonic din compozitie peste clatitele deja formate si putina apa.",
          "Intoarce clatitele dupa alte 2-3 minute si lasa-le pe partea opusa 3-4 minute.",
          "Scoate din forme si serveste cu putina ricota sau frisca (optional), erytytol pudra si fructele favorite. Enjoy!",
        ],
        tips:"Vasul in care se bate albusul trebuie sa fie foarte curat, fara urme de grasime sau apa. Inainte sa bati albusul adauga putina zeama de lamaie.",
      },
      sosUsturoi: {
        name:"Sos de usturoi", emoji:"🧄",
        note:"3 portii | Prep 10 min | Gatire 1 min",
        ing:[
          ["Iaurt stragghisto 2% grasime Olympus","150g"],
          ["Ulei de masline","3ml"],
          ["Usturoi","3 catei (15g)"],
          ["Suc natural de lamaie","5ml"],
          ["Condimente","1g"],
        ],
        steps:[
          "Curata si pisaza usturoiul, amesteca-l foarte bine cu uleiul de masline pana se formeaza o pasta.",
          "Adauga iaurtul grecesc si putina zeama de lamaie.",
          "Amesteca bine si potriveste cu sare si piper.",
        ],
        tips:"Recomand iaurt grecesc Stragghisto Olympus — foarte fin si cremos. Alternativa: Zuzu Divin sau Zuzu Stors. Pastreaza sosul la frigider acoperit cu folie alimentara. Rezista 3-4 zile.",
      },
      salataRucola: {
        name:"Salata cu rucola, parmezan si rosii cherry @34fit", emoji:"🥗",
        note:"2 portii | Prep 5 min",
        ing:[
          ["Rucola","100g"],
          ["Rosii cherry","250g"],
          ["Parmezan","30g"],
          ["Otet balsamic","10g"],
        ],
        steps:[
          "Se adauga intr-un bol rucola.",
          "Se adauga rosiile cherry taiate in doua, fasii de parmezan si putina sare.",
          "Se adauga deasupra otet balsamic si se amesteca. Enjoy!",
        ],
        tips:"Extra, poti adauga si alte legume.",
      },
    },
    meals: {
      avocadoSomon: {
        meal:"Masa 1", name:"Avocado toast si somon afumat",
        ing:[
          ["Paine integrala Vel Pitar","30g (1 felie)","50g (2 felii)"],
          ["Somon afumat","30g","60g"],
          ["Avocado","35g (1/2 avocado)","60g (1 avocado)"],
          ["Legume asortate (rosii, castraveti, ardei, ridichi, ceapa)","50g","50g"],
          ["Branza feta Dop Milbona Lidl","20g","40g"],
        ],
        tot:{ n:{p:"14.39g",c:"22.39g",f:"14.67g",k:"270"}, a:{p:"27.18g",c:"32.48g",f:"26.66g",k:"472"} },
        steps:[
          "Pisezi avocado cu furculita si adaugi putina sare. Poti adauga fulgi de chilli si foarte putin suc de lamaie.",
          "Prajeste painea la toaster si unge pe fiecare felie pasta de avocado, iar deasupra pune somon afumat.",
        ],
        tips:"Pastreaza jumatatea de avocado la frigider, scufundat intr-un recipient cu apa pentru a preveni oxidarea.",
      },
      lasagna: {
        meal:"Masa 2", name:"Lasagna healthy", sub:["lasagna"],
        ing:[["Lasagna healthy","1 Portie (250.5g)","1.5 Portii (375.75g)"]],
        tot:{ n:{p:"28.74g",c:"33.89g",f:"15.02g",k:"387"}, a:{p:"43.1g",c:"50.84g",f:"22.53g",k:"580"} },
        steps:["Incalzeste portia de lasagna conform preferintelor."],
        tips:"",
      },
      mamaligaCottage: {
        meal:"Masa 3", name:"Mamaliga cu cottage cheese si feta",
        ing:[
          ["Malai Penny","50g","50g"],
          ["Apa","120ml","120ml"],
          ["Sare himalaya","1g","1g"],
          ["Cottage cheese Light Milbona (Lidl)","100g","100g"],
          ["Branza feta Dop Milbona Lidl","20g","20g"],
        ],
        tot:{ n:{p:"19.52g",c:"42.14g",f:"6.1g",k:"296"}, a:{p:"19.52g",c:"42.14g",f:"6.1g",k:"296"} },
        steps:[
          "Pune apa la fiert cu un praf generos de sare.",
          "Cand apa clocoteste, toarna malaiul in ploaie, putin cate putin, amestecand continuu cu mana dominanta.",
          "Cand mamaliga incepe sa se ingroase, da focul mic-mediu si continua sa amesteci constant pana ajunge la consistenta dorita.",
          "Pune-o pe farfurie si adauga deasupra cottage cheese si branza feta.",
        ],
        tips:"",
      },
      gustare12: {
        meal:"Gustare", name:"Gustare: fructe / pudding",
        ing:[
          ["Fructe la alegere (50 kcal) — Nicoleta","100g","—"],
          ["Fructe la alegere (50 kcal) — Andrei","—","100g"],
          ["High Protein Vanilla Pudding Milbona — Andrei","—","200g"],
        ],
        tot:{ n:{p:"0.3g",c:"12g",f:"0.1g",k:"50"}, a:{p:"20.3g",c:"22.4g",f:"3.1g",k:"200"} },
        steps:["Alege fructele preferate in limitele de calorii indicate."],
        tips:"Nicoleta: 50 kcal din fructe. Andrei: 50 kcal fructe + pudding proteic Milbona.",
      },
      eggrolls: {
        meal:"Masa 1", name:"Egg-rolls cu sunca si cascaval",
        ing:[
          ["Ou de gaina","2 Oua medii M (120g)","2 Oua medii M (120g)"],
          ["Pikok — Sunca de porc Piticel","20g","30g"],
          ["Cascaval Gouda feliat Lacto Food","20g","30g"],
          ["Ulei de cocos","2g","2g"],
          ["Legume asortate (rosii, castraveti, ardei, ridichi, ceapa verde)","100g","100g"],
        ],
        tot:{ n:{p:"24.32g",c:"16.42g",f:"19.8g",k:"346"}, a:{p:"28.92g",c:"16.71g",f:"23g",k:"394"} },
        steps:[
          "Bate ouale cu sare si piper.",
          "Incinge o tigaie antiaderenta cu diametru mare si unge-o cu putin ulei de cocos. Adauga ouale si lasa omleta sa se gateasca.",
          "Intoarce cu grija pe partea cealalta (ca la clatite).",
          "Dupa ce omleta este gatita, reduce focul si adauga cascavalul feliat si feliile de sunca.",
          "Ruleaza cu grija omleta si las-o sa se rumeneasca putin.",
          "Las-o sa se raceasca putin, apoi taie-o in felii.",
        ],
        tips:"",
      },
      puiCiuperci: {
        meal:"Masa 2", name:"Piept de pui in sos de ciuperci cu mamaliguta",
        ing:[
          ["Piept de pui Lidl","125g","150g"],
          ["Ciuperci champignon","150g","300g"],
          ["Usturoi","1 catel (5g)","2 catei (10g)"],
          ["Ceapa","30g","50g"],
          ["Passata di pomodoro Originale Freshona","100g","200g"],
          ["Ulei de masline","3ml","6ml"],
          ["Cremosano Light Milbona","40g","80g"],
          ["Malai Penny","50g","50g"],
          ["Apa","150ml","300ml"],
          ["Sare himalaya","1g","1g"],
          ["Muraturi asortate","100g","200g"],
        ],
        tot:{ n:{p:"38.41g",c:"62.84g",f:"8.67g",k:"479"}, a:{p:"51.23g",c:"85.67g",f:"15.84g",k:"679"} },
        steps:[
          "Taie pieptul de pui in felii de aproximativ 0.5 cm si amesteca-l cu sare si piper.",
          "Taie ciupercile dupa bunul plac si toaca ceapa si usturoiul marunt.",
          "Prajeste puiul in putin ulei de masline. Dupa ce l-ai intors, adauga ceapa si usturoiul.",
          "Caleste 2 minute la foc mic, apoi adauga ciupercile si caleste inca 5 minute.",
          "Adauga sosul de rosii si fierbe totul cam 5 minute.",
          "La final adauga Cremosano, amesteca si ia de pe foc. Potriveste cu sare si piper.",
          "Mamaliga: pune apa la fiert cu sare. Cand clocoteste, toarna malaiul in ploaie amestecand continuu.",
          "Serveste alaturi de muraturi.",
        ],
        tips:"",
      },
      salatHalloumi: {
        meal:"Masa 3", name:"Salata cu branza halloumi",
        ing:[
          ["Branza Halloumi cu Chilli Eridanous","60g","75g"],
          ["Salata verde","50g","100g"],
          ["Ardei capia/kapia","50g","50g"],
          ["Rosii cherry","75g","75g"],
          ["Castravete","50g","50g"],
          ["Ceapa rosie","25g","25g"],
          ["Iaurt grecesc 2% Zuzu Divin","25g","50g"],
          ["Ulei de masline","3ml","3ml"],
          ["Lamaie","10g","10g"],
        ],
        tot:{ n:{p:"17.99g",c:"13.31g",f:"18.85g",k:"286"}, a:{p:"23.89g",c:"15.85g",f:"23.25g",k:"358"} },
        steps:[
          "Spala salata verde si legumele. Taie toate legumele.",
          "Adauga peste legume iaurt grecesc, ulei de masline, zeama de lamaie, sare si piper.",
          "Separat, prajeste branza halloumi la foc mediu, 1-2 minute pe fiecare parte.",
          "Taie branza in cubulete si amesteca-o cu salata.",
        ],
        tips:"Poti folosi orice tip de branza halloumi.",
      },
      fructe100: {
        meal:"Gustare", name:"100 calorii din Fructe (la alegere)",
        ing:[["Fructe la alegere in limita a 100 calorii","100g","100g"]],
        tot:{ n:{p:"0.3g",c:"12g",f:"0.1g",k:"50"}, a:{p:"1g",c:"24g",f:"0g",k:"100"} },
        steps:["Alege fructele preferate in limitele de calorii indicate."],
        tips:"Nicoleta: 50 kcal. Andrei: 100 kcal.",
      },
      terciOvaz: {
        meal:"Masa 1", name:"Terci de ovaz cu mar si scortisoara",
        ing:[
          ["Fulgi de ovaz","40g","40g"],
          ["Lapte 1,5% Pilos","200g","200g"],
          ["Sare himalaya","0.5g","0.5g"],
          ["Scortisoara macinata","2g","2g"],
          ["Esenta de vanilie","1g","1g"],
          ["Mar rosu","100g","100g"],
          ["Erytrytol","10g","10g"],
          ["Mix de nuci Alesto","10g","10g"],
        ],
        tot:{ n:{p:"13.47g",c:"54.59g",f:"11.79g",k:"367"}, a:{p:"13.47g",c:"54.59g",f:"11.79g",k:"367"} },
        steps:[
          "Adauga intr-o oala fulgii de ovaz, laptele, indulcitorul si un praf de sare.",
          "Lasa sa fiarba la foc mic pana fulgii devin moi. Spre final adauga scortisoara si vanilia.",
          "Ia de pe foc, adauga merele taiate cubulete si amesteca.",
          "Transfera intr-un bol si adauga nucile macinate.",
        ],
        tips:"Laptele poate fi inlocuit cu lapte vegetal neindulcit sau cu apa.",
      },
      tacoBurger: {
        meal:"Masa 2", name:"Tacos burger (2 portii @aurelsolea_fitness)", sub:["tacos"],
        ing:[["Tacos burger","2 Portii (294g)","2 Portii (294g)"]],
        tot:{ n:{p:"36.26g",c:"24.2g",f:"13.5g",k:"375"}, a:{p:"36.26g",c:"24.2g",f:"13.5g",k:"375"} },
        steps:["Prepara conform sub-retetei."],
        tips:"",
      },
      pulpePui: {
        meal:"Masa 3", name:"Pulpe de pui la cuptor cu mazare in sos de rosii",
        ing:[
          ["Pulpe pui dezosate fara piele Fragedo","100g","200g"],
          ["Mazare verde","200g","250g"],
          ["Ceapa","30g","50g"],
          ["Rosii pasate Olympia","100g","150g"],
          ["Ulei de cocos","3g","5g"],
          ["Ulei de masline","3ml","5ml"],
          ["Sare himalaya","1g","1g"],
          ["Piper negru","1g","1g"],
        ],
        tot:{ n:{p:"30.41g",c:"36.22g",f:"15.04g",k:"402"}, a:{p:"52.65g",c:"47.74g",f:"27.34g",k:"646"} },
        steps:[
          "Amesteca pulpele cu condimentele si uleiul de masline. Introdu la cuptor 20-25 min la 180C.",
          "Intr-un wok, caleste in ulei de cocos ceapa tocata marunt, 2-3 minute.",
          "Adauga mazarea si rosiile pasate. Acopera si lasa la foc mic 10 minute.",
          "Condimenteaza cu sare si piper.",
        ],
        tips:"",
      },
      pastravCrocant: {
        meal:"Masa 2", name:"Pastrav crocant cu sos de usturoi si legume mexicane", sub:["sosUsturoi"],
        ing:[
          ["Pastrav crud","125g","200g"],
          ["Ulei de masline","2ml","2ml"],
          ["Usturoi","1 catel (5g)","1 catel (5g)"],
          ["Sare himalaya","1g","1g"],
          ["Piper negru","1g","1g"],
          ["Sos de usturoi","1 Portie (58g)","1 Portie (58g)"],
          ["Freshona Seasoned Mixed Vegetables Gourmet","150g","150g"],
        ],
        tot:{ n:{p:"35.03g",c:"17.1g",f:"13.55g",k:"343"}, a:{p:"50.63g",c:"17.1g",f:"18.5g",k:"454"} },
        steps:[
          "Porniti cuptorul la 230C functia grill. Tamponati pastravii cu servete absorbante.",
          "Condimentati pe partea cu carnea si stropiti cu ulei de masline.",
          "Asezati cu partea condimentata in jos in tava cu hartie de copt.",
          "Coaceti la 230C grill, 15 minute fara sa intoarceti.",
          "Legumele se fac intr-o tigaie antiaderenta pana scade apa.",
          "Sosul de usturoi se prepara conform sub-retetei.",
        ],
        tips:"",
      },
      pizzaDiavola: {
        meal:"Masa 3", name:"Pizza diavola pe lipie",
        ing:[
          ["Tortilla Wrap Snack Day (Lidl)","1 Bucata (62g)","1 Bucata (62g)"],
          ["Mozzarella Lovillo for pizza","50g","50g"],
          ["Rosii pasate 365","50g","50g"],
          ["Usturoi","1 catel (5g)","1 catel (5g)"],
          ["Pasta de ardei iute Kania","2g","2g"],
          ["Condimente","1g","1g"],
          ["Sunca cu piper Dulano","30g","30g"],
        ],
        tot:{ n:{p:"22.32g",c:"37.28g",f:"14.35g",k:"372"}, a:{p:"22.32g",c:"37.28g",f:"14.35g",k:"372"} },
        steps:[
          "Amesteca sosul de rosii cu usturoiul pisat, condimente si pasta de ardei iute.",
          "Turna sosul pe lipie, adauga mozzarella rasa.",
          "Adauga feliile de sunca picanta.",
          "Introdu la cuptor 8-10 minute la 200C.",
          "La final presara fulgi de chilli.",
        ],
        tips:"Andrei mananca 2 pizza. Lipiile ramase le poti congela.",
      },
      gustare67: {
        meal:"Gustare", name:"Gustare Sambata / Duminica",
        ing:[
          ["Fructe la alegere (50 kcal) — Nicoleta","100g","—"],
          ["Bonus 300 calorii — Andrei (orice doreste)","—","300 kcal"],
        ],
        tot:{ n:{p:"0.3g",c:"12g",f:"0.1g",k:"50"}, a:{p:"0g",c:"0g",f:"0g",k:"299"} },
        steps:[
          "Nicoleta: fructe la alegere in limita de 50 kcal.",
          "Andrei: poti consuma ceva de ce ti-e pofta in limita a 300 de calorii.",
        ],
        tips:"Andrei: ex. ciocolata, chipsuri, popcorn, seminte, alune, inghetata, bauturi alcoolice etc.",
      },
      clatiteJaponeze: {
        meal:"Masa 1", name:"Clatite Japoneze Healthy & Super Fluffy", sub:["clatite"],
        ing:[["Clatite Japoneze","1 Portie (314.1g)","1 Portie (314.1g)"]],
        tot:{ n:{p:"22.48g",c:"30.96g",f:"15.24g",k:"342"}, a:{p:"22.48g",c:"30.96g",f:"15.24g",k:"342"} },
        steps:["Prepara conform sub-retetei."],
        tips:"",
      },
      pasteCarbonara: {
        meal:"Masa 2", name:"Paste carbonara",
        ing:[
          ["Paste fainoase Penette integrale Barilla","50g","60g"],
          ["Cubulete sunca de porc Dulano","62g","100g"],
          ["Ou de gaina","0.5 Ou mediu M (30g)","1 Ou mediu M (60g)"],
          ["Parmezan Grana Padano Lovilio Lidl","10g","20g"],
          ["Sare himalaya","1g","1g"],
          ["Piper negru","1g","1g"],
        ],
        tot:{ n:{p:"26.71g",c:"34.33g",f:"16.33g",k:"399"}, a:{p:"43.07g",c:"41.49g",f:"28.03g",k:"602"} },
        steps:[
          "Pune pastele la fiert in apa cu sare.",
          "Calit baconul pana devine putin crocant.",
          "Bate oul cu sare, piper si 70% din parmezan.",
          "Strecura pastele si pune-le peste bacon cu putina apa de la paste.",
          "Opreste focul si adauga mixul de ou. Amesteca foarte bine.",
          "Pune in farfurie si adauga parmezan ras deasupra.",
        ],
        tips:"",
      },
      steakVita: {
        meal:"Masa 3", name:"Steak vita cu salata de rucola, parmezan si rosii cherry", sub:["salataRucola"],
        ing:[
          ["Vrabioara de vita slaba","100g","150g"],
          ["Ulei de cocos","2g","2g"],
          ["Unt 80% Pilos","5g","5g"],
          ["Salata cu rucola, parmezan si rosii cherry","1 Portie (195g)","1 Portie (195g)"],
        ],
        tot:{ n:{p:"35.73g",c:"8.82g",f:"15.62g",k:"315"}, a:{p:"49.23g",c:"9.17g",f:"18.12g",k:"393"} },
        steps:[
          "Incinge o tigaie de fonta la maxim. Carnea stea 30 min la temperatura camerei.",
          "Stropeste tigaia cu ulei de cocos si adauga carnea. Prajeste 2 min pe o parte.",
          "Intoarce si adauga untul deasupra sa se topeasca.",
          "Intoarce pe fiecare parte cate 30 secunde. Lasa la odihnit 5 minute.",
          "Salata se prepara conform sub-retetei.",
        ],
        tips:"Vrabioara poate fi inlocuita cu antricot de vita.",
      },
    },
    days: [
      { label:"Luni + Marti", dates:"16-17 Mar", meals:["avocadoSomon","lasagna","mamaligaCottage","gustare12"] },
      { label:"Mier + Joi",   dates:"18-19 Mar", meals:["eggrolls","puiCiuperci","salatHalloumi","fructe100"] },
      { label:"Vineri",       dates:"20 Mar",    meals:["terciOvaz","tacoBurger","pulpePui","fructe100"] },
      { label:"Sambata",      dates:"21 Mar",    meals:["terciOvaz","pastravCrocant","pizzaDiavola","gustare67"] },
      { label:"Duminica",     dates:"22 Mar",    meals:["clatiteJaponeze","pasteCarbonara","steakVita","gustare67"] },
    ],
  },
};

// ─── WEEK SELECTOR ────────────────────────────────────────────────────────────
function WeekSelector({ weeks, active, onSelect }) {
  const keys = Object.keys(weeks);
  if (keys.length === 1) return null;
  return (
    <div style={{display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:12}}>
      {keys.map(k => (
        <button key={k} onClick={() => onSelect(k)} style={{
          padding:"6px 16px", borderRadius:20, border:"1.5px solid",
          cursor:"pointer", fontSize:12, fontWeight: active===k ? "bold" : "normal",
          borderColor: active===k ? GREEN : "#ddd",
          background:  active===k ? GREEN : "#fff",
          color:       active===k ? "#fff" : "#555",
        }}>
          <div>{weeks[k].label}</div>
          <div style={{fontSize:9, opacity:0.8}}>{weeks[k].dates}</div>
        </button>
      ))}
    </div>
  );
}

// ─── SUB-RECIPE CARD ──────────────────────────────────────────────────────────
function SubCard({ id, subRecipes }) {
  const [open, setOpen] = useState(false);
  const sr = subRecipes[id];
  if (!sr) return null;
  return (
    <div style={{border:"1.5px solid #a5d6a7", borderRadius:10, overflow:"hidden", marginTop:10}}>
      <button onClick={() => setOpen(o => !o)} style={{
        width:"100%", border:"none", cursor:"pointer",
        padding:"9px 13px", display:"flex", justifyContent:"space-between", alignItems:"center",
        background: open ? "#2e7d32" : "#e8f5e9",
      }}>
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
                <tr key={i} style={{background: i%2===0 ? "#fff" : "#f1f8e9"}}>
                  <td style={{padding:"4px 8px", fontSize:11, color:"#333", borderBottom:"1px solid #e8f5e9"}}>{row[0]}</td>
                  <td style={{padding:"4px 8px", fontSize:11, color:"#555", textAlign:"right", borderBottom:"1px solid #e8f5e9"}}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{fontWeight:"bold", fontSize:11, color:"#2e7d32", marginBottom:4}}>Preparare</div>
          <ol style={{margin:0, paddingLeft:16}}>
            {sr.steps.map((s,i) => (
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

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function DayTabs({ days, active, onSelect }) {
  return (
    <div style={{display:"flex", gap:5, justifyContent:"center", flexWrap:"wrap", marginBottom:9}}>
      {days.map((d,i) => (
        <button key={i} onClick={() => onSelect(i)} style={{
          padding:"5px 10px", borderRadius:18, border:"1.5px solid", cursor:"pointer",
          lineHeight:1.3, textAlign:"center", fontSize:11,
          borderColor: active===i ? GREEN : "#ddd",
          background:  active===i ? GREEN : "#fff",
          color:       active===i ? "#fff" : "#555",
          fontWeight:  active===i ? "bold" : "normal",
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

function MealTabs({ mealKeys, meals, active, onSelect }) {
  return (
    <div style={{display:"flex", gap:7, justifyContent:"center", marginBottom:11}}>
      {mealKeys.map((k,i) => {
        const m = meals[k];
        if (!m) return null;
        const mc = MEAL_COLORS[m.meal];
        const isActive = active===i;
        return (
          <button key={i} onClick={() => onSelect(i)} style={{
            flex:1, maxWidth:200, padding:"8px 6px", borderRadius:10,
            border:"2px solid", cursor:"pointer", textAlign:"center",
            borderColor: isActive ? mc.dot : "#ddd",
            background:  isActive ? mc.bg  : "#fff",
          }}>
            <div style={{fontSize:11, fontWeight:"bold", color: isActive ? mc.lbl : "#bbb"}}>{m.meal}</div>
            <div style={{fontSize:10, color: isActive ? "#333" : "#ccc", marginTop:2, lineHeight:1.3}}>{m.name}</div>
            {m.sub && m.sub.length>0 && (
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
        {ing.map((row,i) => {
          const diff = row[1] !== row[2];
          return (
            <tr key={i} style={{background: i%2===0 ? "#fff" : "#fafafa"}}>
              <td style={{padding:"7px 13px", fontSize:12, color:"#333", borderBottom:"1px solid #f0f0f0"}}>{row[0]}</td>
              <td style={{padding:"7px 13px", textAlign:"center", fontSize:12, borderBottom:"1px solid #f0f0f0",
                fontWeight: diff ? "bold" : "normal", color: diff ? "#1a6b9a" : "#666",
                background: diff ? "#e8f4fd" : "transparent"}}>{row[1]}</td>
              <td style={{padding:"7px 13px", textAlign:"center", fontSize:12, borderBottom:"1px solid #f0f0f0",
                fontWeight: diff ? "bold" : "normal", color: diff ? "#7b3fa0" : "#666",
                background: diff ? "#f3e8fd" : "transparent"}}>{row[2]}</td>
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
      {[tot.n, tot.a].map((t,i) => (
        <div key={i} style={{padding:"9px 8px", textAlign:"center", borderLeft: i>0 ? "1px solid rgba(255,255,255,0.2)" : "none"}}>
          <div style={{fontSize:9, opacity:0.8}}>P / C / G</div>
          <div style={{fontSize:10, marginTop:1}}>{t.p} / {t.c} / {t.f}</div>
          <div style={{fontSize:13, fontWeight:"bold", marginTop:1}}>🔥 {t.k} kcal</div>
        </div>
      ))}
    </div>
  );
}

function RecipePanel({ meal, subRecipes }) {
  return (
    <div style={{background:"#fafdf8", borderTop:"1.5px solid #dff0e8", padding:"14px 16px"}}>
      <div style={{fontWeight:"bold", fontSize:13, color:GREEN, marginBottom:8}}>Mod de preparare</div>
      <ol style={{margin:0, paddingLeft:18}}>
        {meal.steps.map((s,i) => (
          <li key={i} style={{fontSize:12, color:"#333", marginBottom:7, lineHeight:1.65}}>{s}</li>
        ))}
      </ol>
      {meal.tips && (
        <div style={{marginTop:10, background:"#fff8e1", border:"1px solid #ffe082", borderRadius:8, padding:"7px 11px"}}>
          <span style={{fontSize:12, fontWeight:"bold", color:"#b8860b"}}>Sfat: </span>
          <span style={{fontSize:12, color:"#555"}}>{meal.tips}</span>
        </div>
      )}
      {meal.sub && meal.sub.length>0 && (
        <div style={{marginTop:6}}>
          <div style={{fontSize:12, color:"#2e7d32", fontWeight:"bold", margin:"12px 0 2px"}}>Sub-retete:</div>
          {meal.sub.map(id => <SubCard key={id} id={id} subRecipes={subRecipes} />)}
        </div>
      )}
    </div>
  );
}

// ─── S11S12 ROUTE ─────────────────────────────────────────────────────────────
export default function S11S12() {
  const navigate = useNavigate();
  const [weekKey,    setWeekKey]    = useState(Object.keys(WEEKS)[0]);
  const [dayIdx,     setDayIdx]     = useState(0);
  const [mealIdx,    setMealIdx]    = useState(0);
  const [showRecipe, setShowRecipe] = useState(false);

  const week = WEEKS[weekKey];
  const day  = week.days[dayIdx];
  const meal = week.meals[day.meals[mealIdx]];
  const mc   = meal ? MEAL_COLORS[meal.meal] : MEAL_COLORS["Masa 1"];

  function selectWeek(k)  { setWeekKey(k); setDayIdx(0); setMealIdx(0); setShowRecipe(false); }
  function selectDay(i)   { setDayIdx(i);  setMealIdx(0); setShowRecipe(false); }
  function selectMeal(i)  { setMealIdx(i); setShowRecipe(false); }

  const totalKcal = (mealKeys, person) =>
    mealKeys.reduce((sum, k) => sum + (week.meals[k] ? parseFloat(week.meals[k].tot[person].k) : 0), 0);

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
        <div style={{fontSize:12, color:"#888", marginTop:2}}>{week.label} &nbsp;|&nbsp; {week.dates}</div>
        <div style={{fontSize:11, color:"#aaa"}}>Nicoleta &amp; Andrei</div>
      </div>

      <WeekSelector weeks={WEEKS} active={weekKey} onSelect={selectWeek} />
      <DayTabs days={week.days} active={dayIdx} onSelect={selectDay} />
      <TotalsBar nKcal={totalKcal(day.meals,"n")} aKcal={totalKcal(day.meals,"a")} />
      <MealTabs mealKeys={day.meals} meals={week.meals} active={mealIdx} onSelect={selectMeal} />

      {meal && (
        <div style={{border:"2px solid", borderColor:mc.border, borderRadius:12, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{background:GREEN, color:"#fff", padding:"11px 15px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div style={{fontSize:10, opacity:0.7, marginBottom:1}}>{meal.meal} — {day.label} {day.dates} — {week.label}</div>
              <div style={{fontSize:15, fontWeight:"bold"}}>{meal.name}</div>
            </div>
            <button onClick={() => setShowRecipe(s => !s)} style={{
              borderRadius:18, padding:"5px 13px", cursor:"pointer", fontSize:11, fontWeight:"bold", whiteSpace:"nowrap",
              border:"1.5px solid rgba(255,255,255,0.5)",
              background: showRecipe ? "#fff" : "rgba(255,255,255,0.15)",
              color:      showRecipe ? GREEN  : "#fff",
            }}>
              {showRecipe ? "Ascunde" : "Reteta"}
            </button>
          </div>
          <IngTable ing={meal.ing} />
          <MacroRow tot={meal.tot} />
          {showRecipe && <RecipePanel meal={meal} subRecipes={week.subRecipes} />}
        </div>
      )}

      <p style={{textAlign:"center", fontSize:9, color:"#ccc", marginTop:10}}>
        Albastru = portii Nicoleta | Violet = portii Andrei | Verde = sub-reteta
      </p>
    </div>
  );
}
