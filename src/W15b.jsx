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
  mangoOats: {
    meal: "Masa 1", name: "Mango Sticky Rice Overnight Oats",
    ing: [
      ["Fulgi de ovaz", "40g", "50g"],
      ["Seminte chia", "9g", "11g"],
      ["Lapte de cocos light", "55ml", "65ml"],
      ["Lapte", "80ml", "100ml"],
      ["Clearly Whey Vanilla (1 masura)", "30g", "30g"],
      ["Erytrytol", "7g", "8g"],
      ["Mango proaspat sau congelat", "90g", "110g"],
      ["Zeama de lime", "7ml", "8ml"],
      ["Fulgi de cocos prajiti", "7g", "9g"],
    ],
    tot: { n: { p:"26g", c:"40g", f:"12g", k:"330" }, a: { p:"34g", c:"52g", f:"14g", k:"420" } },
    steps: [
      "Amesteca fulgii de ovaz + chia + laptele de cocos + laptele intr-un borcan. Amesteca bine.",
      "Adauga Clearly Whey si erytrytolul. Amesteca pana nu mai sunt cocoloase.",
      "Pune la frigider minim 6 ore (pregateste duminica seara).",
      "Dimineata: adauga deasupra mango taiat cubulete, zeama de lime si fulgii de cocos prajiti.",
    ],
    tips: "Mango congelat dezgheat in frigider peste noapte merge la fel de bine ca cel proaspat. Fulgii de cocos ii prajesti 2-3 minute intr-o tigaie uscata la foc mic pana se auresc usor.",
  },

  puiGrillCartofi: {
    meal: "Masa 2", name: "Pui grill + cartofi dulci + yogurt dip usturoi-lamaie-marar",
    ing: [
      ["Piept de pui", "130g", "180g"],
      ["Cartofi dulci", "180g", "200g"],
      ["Iaurt grecesc 2%", "80g", "80g"],
      ["Usturoi", "1 catel", "1 catel"],
      ["Zeama de lamaie", "10ml", "10ml"],
      ["Marar proaspat", "10g", "10g"],
      ["Ulei de masline", "8ml", "8ml"],
      ["Sare, piper, paprika afumata", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"40g", c:"32g", f:"14g", k:"420" }, a: { p:"54g", c:"34g", f:"14g", k:"510" } },
    steps: [
      "Preincalzeste cuptorul la 200C. Taie cartofii dulci in pene, unge cu ulei de masline, sare si paprika afumata.",
      "Coace 25 minute pana se auresc pe margini.",
      "Condimenteaza puiul cu sare, piper, paprika afumata, usturoi praf.",
      "Gratiaza sau prajeste la foc mediu-mare 5-6 minute pe fiecare parte. Lasa sa se odihneasca 2 minute, feliaza. Gateste dublu pentru marti.",
      "Dip de iaurt: iaurt grecesc + 1 catel usturoi tocat marunt + zeama de lamaie + marar proaspat tocat + un praf de sare. Amesteca, gust, ajusteaza lamaia.",
      "Plating: pene de cartofi dulci + pui feliat. Dip de iaurt intr-un bol mic pe lateral.",
    ],
    tips: "Gateste dublu pui luni — marti feliezi puiul rece, reincalzesti cartofii dulci 3 minute la microunde si faci dip de iaurt proaspat.",
  },

  codCuptor: {
    meal: "Masa 3", name: "Cod la cuptor + salsa verde + broccoli + morcov",
    ing: [
      ["File de cod", "160g", "220g"],
      ["Broccoli buchete", "100g", "100g"],
      ["Morcov (feliat)", "80g", "80g"],
      ["Rosii cherry", "60g", "60g"],
      ["Ulei de masline", "8ml", "8ml"],
      ["Patrunjel proaspat", "20g", "20g"],
      ["Capere", "10g", "10g"],
      ["Usturoi", "1 catel", "1 catel"],
      ["Lamaie", "1/2 buc", "1/2 buc"],
    ],
    tot: { n: { p:"36g", c:"12g", f:"14g", k:"340" }, a: { p:"48g", c:"12g", f:"14g", k:"420" } },
    steps: [
      "Preincalzeste cuptorul la 200C.",
      "Tamponeza codul cu servetele de bucatarie. Condimenteaza cu sare, piper, coaja de lamaie si ulei de masline. Pune in tava.",
      "Adauga buchetele de broccoli si morcovul feliat in jurul pestelui. Stropeste cu ulei de masline, condimenteaza cu sare si piper.",
      "Coace 18-20 minute pana codul se sfarama usor la apasarea cu o furculita.",
      "Salsa verde: mixeaza patrunjel + capere + 1 catel usturoi + zeama de lamaie + ulei de masline + un praf de sare. Pastreaza textura — nu over-blenda. Daca n-ai blender, toaca totul fin cu cutitul.",
      "Pune salsa verde deasupra codului. Serveste imediat.",
    ],
    tips: "Salsa verde trebuie sa aiba textura granulara, nu sa fie un piure. Gust dupa amestecare — adauga mai multa lamaie sau sare daca e nevoie.",
  },

  snickersOvaz: {
    meal: "Masa 1", name: "Snickers Budinca de Ovaz High Protein",
    ing: [
      ["Fulgi ovaz integral", "60g", "75g"],
      ["Clearly Whey Vanilla (1 masura)", "30g", "30g"],
      ["Lapte 1.5%", "80ml", "100ml"],
      ["Iaurt grecesc 2%", "150g", "150g"],
      ["Unt de arahide", "10g", "10g"],
      ["Ciocolata neagra 70%", "10g", "10g"],
      ["Esenta de vanilie", "5g", "5g"],
      ["Eritritol", "10g", "10g"],
      ["Ulei de cocos", "2g", "2g"],
      ["Arahide zdrobite (topping)", "5g", "5g"],
    ],
    tot: { n: { p:"34g", c:"42g", f:"16g", k:"420" }, a: { p:"38g", c:"54g", f:"17g", k:"490" } },
    steps: [
      "Intr-un bol amesteca fulgii de ovaz + Clearly Whey + lapte + esenta de vanilie + eritritol + un praf de sare.",
      "Amesteca bine pana nu mai sunt cocoloase. Adauga mai mult lapte daca e prea dens.",
      "Amesteca iaurtul grecesc cu untul de arahide — intinde uniform deasupra bazei de ovaz.",
      "Topeste ciocolata neagra cu uleiul de cocos la microunde 30 secunde. Stropeste deasupra stratului de iaurt.",
      "Adauga arahidele zdrobite deasupra.",
      "Pune la frigider peste noapte sau minim 2 ore (pregateste luni seara).",
    ],
    tips: "Ciocolata topita se solidifica la rece si creeaza efectul de crunch Snickers — taie in ea cu lingurita la servire. Se poate manca direct din borcan.",
  },

  tocanitaPorc: {
    meal: "Masa 3", name: "Tocanita cartofi + porc (Hamlappen)",
    ing: [
      ["Hamlappen (porc pentru tocanita)", "150g", "210g"],
      ["Cartofi", "180g", "200g"],
      ["Ceapa", "60g", "60g"],
      ["Ceapa verde", "30g", "30g"],
      ["Usturoi", "2 catei", "2 catei"],
      ["Rosii tocate", "80g", "80g"],
      ["Ulei de floarea soarelui", "8ml", "8ml"],
      ["Paprika afumata, chimen, foi de dafin, patrunjel", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"36g", c:"28g", f:"14g", k:"415" }, a: { p:"50g", c:"34g", f:"16g", k:"530" } },
    steps: [
      "Taie hamlappen in cubulete de 3cm. Condimenteaza cu sare, piper, paprika afumata.",
      "Incalzeste uleiul intr-o oala cu fund gros la foc mare. Rumeneste porcul pe toate partile 3-4 minute. Pune deoparte.",
      "In aceeasi oala caleste ceapa tocata + ceapa verde 3 minute pana se moaie.",
      "Adauga usturoiul tocat, gateste 1 minut. Adauga rosiile tocate, paprika afumata, chimenul si foile de dafin.",
      "Reintoarce porcul. Adauga 200ml apa sau supa. Acopera si fierbe la foc mic 25 minute.",
      "Adauga cartofii taiati cubulete. Gateste descoperit 15 minute pana cartofii sunt moi si sosul se ingroasa.",
      "Termina cu patrunjel proaspat. Raceste complet inainte de a refrigera portia de joi.",
    ],
    tips: "Gateste dublu marti — portia de joi si weekend se reincalzeste in oala la foc mediu-mic cu un strop de apa, acoperit, 8-10 minute. Nu fierbe puternic.",
  },

  omletaSourdough: {
    meal: "Masa 1", name: "Omleta spanac + ceapa verde + sourdough toast",
    ing: [
      ["Oua", "3 oua", "4 oua"],
      ["Spanac proaspat", "60g", "60g"],
      ["Ceapa verde", "30g", "30g"],
      ["Paine sourdough", "75g", "75g"],
      ["Ulei de masline", "5ml", "5ml"],
      ["Sare, piper", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"26g", c:"28g", f:"16g", k:"370" }, a: { p:"32g", c:"28g", f:"20g", k:"440" } },
    steps: [
      "Prajeste painea sourdough pana e aurie.",
      "Ofileste spanacul + ceapa verde in ulei de masline la foc mediu 2 minute.",
      "Bate ouale cu sare si piper. Toarna peste legume.",
      "Gateste la foc mediu-mic, pliaza o data. Serveste usor moale in interior.",
      "Serveste omleta alaturi de painea sourdough prajita.",
    ],
    tips: "Painea sourdough se foloseste doar miercuri — joi si vineri omleta se serveste fara paine (omletaRosii).",
  },

  salataHalloumi: {
    meal: "Masa 2", name: "Salata rucola + halloumi + naut crocant + ceapa verde",
    ing: [
      ["Halloumi", "80g", "80g"],
      ["Naut la conserva (scurs, clatit)", "80g", "100g"],
      ["Rucola", "60g", "60g"],
      ["Ceapa verde", "30g", "30g"],
      ["Rosii cherry", "60g", "60g"],
      ["Ulei de masline", "8ml", "8ml"],
      ["Zeama de lamaie", "10ml", "10ml"],
      ["Paprika afumata, chimion", "dupa gust", "dupa gust"],
      ["[Andrei] Piept de pui la gratar", "—", "80g"],
    ],
    tot: { n: { p:"24g", c:"18g", f:"22g", k:"380" }, a: { p:"38g", c:"20g", f:"24g", k:"460" } },
    steps: [
      "Scurge si clateste nautul. Usuca foarte bine cu servetele de hartie — umiditatea impiedica crocantul.",
      "Unge nautul cu ulei de masline, paprika afumata, chimion si sare.",
      "Prajeste la air fryer sau tigaie la foc mare 8-10 minute pana e auriu si crocant. Fa dublu pentru joi.",
      "Feliaza halloumiul la 1cm grosime. Prajeste uscat (fara ulei) la foc mare 2 minute pe fiecare parte pana are crusta aurie.",
      "Baza: rucola + ceapa verde feliata + rosii cherry.",
      "Adauga halloumiul cald si nautul crocant deasupra.",
      "Dressing: zeama de lamaie + ulei de masline. Rucola se ofileste usor sub halloumiul cald — este corect.",
    ],
    tips: "Nautul se face dublu miercuri — joi re-crocanteza 3 minute intr-o tigaie uscata daca e nevoie. Halloumiul se gateste intotdeauna proaspat — nu se reincalzeste bine.",
  },

  crevetiCurry: {
    meal: "Masa 3", name: "Creveti sos coconut curry + legume cambodgiene + orez basmati",
    ing: [
      ["Creveti cruzi curatati", "160g", "220g"],
      ["Legume cambodgiene pentru stir-fry", "150g", "150g"],
      ["Lapte de cocos light", "100ml", "100ml"],
      ["Pasta Thai curry rosu", "15g", "15g"],
      ["Usturoi (tocat marunt)", "2 catei", "2 catei"],
      ["Ghimbir proaspat ras", "1 lingurita", "1 lingurita"],
      ["Orez basmati crud", "60g", "75g"],
      ["Ulei de masline", "5ml", "5ml"],
      ["Lamaie", "1/2 buc", "1/2 buc"],
    ],
    tot: { n: { p:"36g", c:"42g", f:"14g", k:"430" }, a: { p:"50g", c:"50g", f:"14g", k:"530" } },
    steps: [
      "Gateste orezul basmati. Pune deoparte.",
      "Incalzeste uleiul la foc mediu-mare. Adauga usturoiul tocat + ghimbirul ras. Amesteca 30 secunde.",
      "Adauga pasta de curry Thai. Amesteca 1 minut pana devine parfumata.",
      "Toarna laptele de cocos light. Fierbe la foc mic 2 minute.",
      "Adauga legumele cambodgiene. Prajeste amestecand 3 minute — pastreaza germenii de soia usor crocanti.",
      "Adauga crevetii cruzi. Gateste 3-4 minute pana devin roz si se ruleaza. Nu over-gati.",
      "Stoarce lamaia. Gust, ajusteaza sarea. Serveste peste orezul basmati.",
    ],
    tips: "Crevetii se gatesc ultra-rapid — 3-4 minute maxim. Cand sunt complet roz si rulati sunt gata. Inca un minut si devin cauciucosi.",
  },

  omletaRosii: {
    meal: "Masa 1", name: "Omleta spanac + ceapa verde + rosii cherry",
    ing: [
      ["Oua", "3 oua", "4 oua"],
      ["Spanac proaspat", "60g", "60g"],
      ["Ceapa verde", "30g", "30g"],
      ["Rosii cherry (garnitura)", "80g", "80g"],
      ["Ulei de masline", "5ml", "5ml"],
      ["Sare, piper", "dupa gust", "dupa gust"],
    ],
    tot: { n: { p:"22g", c:"6g", f:"18g", k:"280" }, a: { p:"28g", c:"6g", f:"22g", k:"350" } },
    steps: [
      "Taie rosiile cherry in jumatate. Prajeste 2-3 minute intr-o tigaie uscata sau serveste proaspete pe lateral.",
      "Ofileste spanacul + ceapa verde in ulei de masline 2 minute.",
      "Bate ouale cu sare si piper. Toarna peste legume.",
      "Gateste la foc mediu-mic, pliaza o data. Serveste cu rosiile cherry alaturi.",
    ],
    tips: "Aceeasi omleta ca miercuri — fara paine sourdough. Daca vrei sa inchizi gap-ul de proteina, adauga 20g Clearly Whey in oua inainte de a le bate si amesteca bine.",
  },

  pastePui: {
    meal: "Masa 2", name: "Paste pui + ciuperci + sos light",
    ing: [
      ["Paste integrale (greutate uscata)", "65g", "65g"],
      ["Piept de pui", "130g", "180g"],
      ["Ciuperci champignon (feliate)", "100g", "100g"],
      ["Spanac proaspat", "40g", "40g"],
      ["Usturoi", "2 catei", "2 catei"],
      ["Parmezan ras", "15g", "15g"],
      ["Ulei de masline", "8ml", "8ml"],
      ["Zeama de lamaie", "10ml", "10ml"],
    ],
    tot: { n: { p:"42g", c:"38g", f:"14g", k:"430" }, a: { p:"54g", c:"38g", f:"14g", k:"510" } },
    steps: [
      "Fierbe pastele al dente. Rezerva 50ml apa de paste inainte de scurgere — nu o arunca.",
      "Condimenteaza puiul cu sare, piper si usturoi. Prajeste sau gratiaza, lasa sa se odihneasca, feliaza subtire.",
      "In aceeasi tigaie prajeste ciupercile feliate la foc mare pana se auresc, 5 minute. Nu ingramadi — ciupercile trebuie sa se rumeneasca, nu sa abureaza.",
      "Adauga usturoiul si spanacul. Gateste 1 minut.",
      "Adauga pastele scurse + un strop de apa de paste. Amesteca la foc mare.",
      "Adauga parmezanul + zeama de lamaie + uleiul de masline. Amesteca pana e matasos — apa de paste creeaza sosul, fara frisca necesara.",
      "Adauga puiul feliat deasupra la servire.",
    ],
    tips: "Apa de paste este secretul sosului — amidonul din ea leaga ingredientele fara calorii extra. Adaug-o lingura cu lingura pana obtii consistenta dorita.",
  },

  somonTeriyaki: {
    meal: "Masa 3", name: "Somon teriyaki + orez basmati + broccoli",
    ing: [
      ["File de somon", "150g", "200g"],
      ["Orez basmati crud", "55g", "70g"],
      ["Broccoli buchete", "120g", "120g"],
      ["Tamari sau sos de soia", "15ml", "15ml"],
      ["Miere", "8g", "8g"],
      ["Usturoi (tocat marunt)", "1 catel", "1 catel"],
      ["Ghimbir proaspat ras", "1 lingurita", "1 lingurita"],
      ["Seminte de susan", "5g", "5g"],
      ["Ceapa verde (pentru servire)", "15g", "15g"],
    ],
    tot: { n: { p:"36g", c:"38g", f:"16g", k:"430" }, a: { p:"48g", c:"46g", f:"20g", k:"540" } },
    steps: [
      "Gateste orezul basmati. Aburi sau coace broccoli 15 minute la 200C cu sare si un fir de ulei.",
      "Sos teriyaki: amesteca tamari 15ml + miere 8g + usturoi tocat + ghimbir ras + apa 20ml. Pune deoparte.",
      "Tamponeza somonul cu servetele de bucatarie. Condimenteaza cu sare si piper.",
      "Prajeste somonul cu pielea in sus 3 minute. Intoarce. Toarna sosul teriyaki deasupra.",
      "Gateste inca 3-4 minute, ungand somonul cu sos pana se caramelizeaza si e just cooked.",
      "Serveste peste orez cu broccoli alaturi. Termina cu seminte de susan si ceapa verde feliata.",
    ],
    tips: "Nu over-gati somonul — cand se separa usor la apasare cu furculita pe centrul fileului, e gata. Interiorul trebuie sa fie inca usor translucid. Sosul teriyaki se caramelizeaza rapid — fii atent sa nu-l arzi.",
  },

  snackWhey: {
    meal: "Gustare", name: "Iaurt grecesc + fructe de padure + Clearly Whey",
    ing: [
      ["Iaurt grecesc 5%", "150g", "150g"],
      ["Fructe de padure mix", "80g", "80g"],
      ["Clearly Whey Vanilla (1 masura)", "30g", "30g"],
    ],
    tot: { n: { p:"37g", c:"17g", f:"8g", k:"280" }, a: { p:"37g", c:"17g", f:"8g", k:"280" } },
    steps: [
      "Amesteca Clearly Whey in iaurt pana e complet neted.",
      "Adauga fructele de padure deasupra.",
    ],
    tips: "Aceeasi gustare in fiecare zi, ~2 minute. In zilele de restaurant (weekend): sarim Clearly Whey — economisesti ~115 kcal si creezi spatiu caloric pentru masa de la restaurant.",
  },

  snackNoWhey: {
    meal: "Gustare", name: "Iaurt grecesc + fructe de padure (zi de restaurant)",
    ing: [
      ["Iaurt grecesc 5%", "150g", "150g"],
      ["Fructe de padure mix", "80g", "80g"],
    ],
    tot: { n: { p:"14g", c:"16g", f:"7g", k:"185" }, a: { p:"14g", c:"16g", f:"7g", k:"185" } },
    steps: [
      "Pune iaurtul intr-un bol.",
      "Adauga fructele de padure si amesteca.",
    ],
    tips: "Fara Clearly Whey in zilele de restaurant — economisesti ~115 kcal care creaza spatiu caloric pentru masa principala de afara.",
  },

  weekendBrunch: {
    meal: "Masa 1", name: "Mic dejun flexibil (oua preferate) — Weekend",
    ing: [
      ["Oua (orice preparare)", "2-3 oua — ~300 kcal tinta", "3-4 oua — ~380 kcal tinta"],
      ["Legume (spanac, rosii, ardei)", "dupa preferinta", "dupa preferinta"],
    ],
    tot: { n: { p:"~20g", c:"~8g", f:"~18g", k:"~300" }, a: { p:"~26g", c:"~10g", f:"~22g", k:"~380" } },
    steps: [
      "Alege orice preparare cu oua: omleta, ochiuri, scrambled.",
      "Adauga legume (spanac, rosii, ardei) pentru volum fara calorii extra.",
      "Evita oatele dulci — deja 2 portii cu oat in aceasta saptamana.",
      "Pre-logheaza micul dejun inainte de masa la restaurant pentru a te asigura ca esti in target.",
    ],
    tips: "Weekend-ul este flexibil — micul dejun usorul compenseaza masa de la restaurant. Prioritate: proteina din oua, fara glucide suplimentare la micul dejun.",
  },

  restaurant: {
    meal: "Masa 2", name: "Masa la restaurant",
    ing: [
      ["Proteina: peste la gratar, pui, steak sau oua", "~500–600 kcal estimat", "~600–700 kcal estimat"],
      ["Sos: intotdeauna pe lateral", "—", "—"],
      ["Paine: sari cosul sau cere sa nu il aduca", "—", "—"],
    ],
    tot: { n: { p:"~35g", c:"~45g", f:"~22g", k:"~550" }, a: { p:"~45g", c:"~55g", f:"~27g", k:"~650" } },
    steps: [
      "Comanda: peste la gratar, piept de pui, steak sau oua ca proteina principala.",
      "Evita: paste, pizza, sosuri cremoase. Orezul merge daca restul zilei e usor.",
      "Sari cosul cu paine sau cere sa nu il aduca.",
      "Andrei: prioritate peste sau pui, fara carne procesata (colesterol).",
    ],
    tips: "Aceasta e masa principala a zilei ca aport caloric — micul dejun si gustarea trebuie sa fie mai usoare pentru a echilibra ziua.",
  },
};

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
const DAYS = [
  { label:"Luni",    dates:"11 Mai",       meals:["mangoOats",      "puiGrillCartofi", "codCuptor",      "snackWhey"]    },
  { label:"Marti",   dates:"12 Mai",       meals:["snickersOvaz",   "puiGrillCartofi", "tocanitaPorc",   "snackWhey"]    },
  { label:"Miercuri",dates:"13 Mai",       meals:["omletaSourdough","salataHalloumi",  "crevetiCurry",   "snackWhey"]    },
  { label:"Joi",     dates:"14 Mai",       meals:["omletaRosii",    "salataHalloumi",  "tocanitaPorc",   "snackWhey"]    },
  { label:"Vineri",  dates:"15 Mai",       meals:["omletaRosii",    "pastePui",        "somonTeriyaki",  "snackWhey"]    },
  { label:"Weekend", dates:"16–17 Mai",    meals:["weekendBrunch",  "restaurant",      "tocanitaPorc",   "snackNoWhey"]  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function totalKcal(mealKeys, person) {
  return mealKeys.reduce((sum, k) => {
    const m = MEALS[k];
    const raw = m ? m.tot[person].k.toString().replace("~","") : "0";
    return sum + (parseFloat(raw) || 0);
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

// ─── W15 v2 ROUTE ─────────────────────────────────────────────────────────────
export default function W15b() {
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
        <div style={{fontSize:12, color:"#888", marginTop:2}}>W15 &nbsp;|&nbsp; 11–17 Mai 2026</div>
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
