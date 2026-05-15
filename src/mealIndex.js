// ─── GLOBAL MEAL INDEX ────────────────────────────────────────────────────────
// Flat list of all meals across all weeks for global search.
// route: navigation target
// dayIdx / mealIdx: used for deep-link into W15b (which supports useLocation state).
//   For other weeks, set to null — search will navigate to the route root.

const MEAL_INDEX = [
  // ── S9-S10 · 09–15 Martie 2026 ──────────────────────────────────────────────
  { name:"Sandwich cald cu pui si cascaval",         week:"S9-S10",  weekLabel:"S9-S10",  route:"/s9-s10",  day:"Luni–Marti",    meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Pui Shanghai cu orez",                     week:"S9-S10",  weekLabel:"S9-S10",  route:"/s9-s10",  day:"Luni–Marti",    meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Salata Caesar cu pui",                     week:"S9-S10",  weekLabel:"S9-S10",  route:"/s9-s10",  day:"Mier–Joi",      meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Piadina cu pui si legume",                 week:"S9-S10",  weekLabel:"S9-S10",  route:"/s9-s10",  day:"Mier–Joi",      meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Creveti cu vin alb si usturoi",            week:"S9-S10",  weekLabel:"S9-S10",  route:"/s9-s10",  day:"Vineri",        meal:"Masa 3",  dayIdx:null, mealIdx:null },

  // ── S11-S12 · 16–22 Martie 2026 ─────────────────────────────────────────────
  { name:"Avocado toast cu somon afumat",            week:"S11-S12", weekLabel:"S11-S12", route:"/s11-s12", day:"Luni–Marti",    meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Lasagna healthy",                          week:"S11-S12", weekLabel:"S11-S12", route:"/s11-s12", day:"Luni–Marti",    meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Tacos burger sanatos",                     week:"S11-S12", weekLabel:"S11-S12", route:"/s11-s12", day:"Mier–Joi",      meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Paste carbonara",                          week:"S11-S12", weekLabel:"S11-S12", route:"/s11-s12", day:"Vineri",        meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Steak vita cu salata",                     week:"S11-S12", weekLabel:"S11-S12", route:"/s11-s12", day:"Sambata",       meal:"Masa 3",  dayIdx:null, mealIdx:null },

  // ── S12 · 16–22 Martie 2026 (plan actualizat) ───────────────────────────────
  { name:"Avocado toast cu somon afumat + ou posat", week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Luni–Marti",    meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Lasagna healthy cu cottage cheese",        week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Luni–Marti",    meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Mamaliga cu cottage cheese, feta si carnati slabi", week:"S12", weekLabel:"S12", route:"/s12",    day:"Luni–Marti",    meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Egg-rolls cu sunca si cascaval",           week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Mier–Joi",      meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Piept de pui in sos de ciuperci cu mamaliguta", week:"S12", weekLabel:"S12",   route:"/s12",     day:"Mier–Joi",      meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Salata cu branza halloumi",                week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Mier–Joi",      meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Terci de ovaz cu mar si scortisoara",      week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Vineri",        meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Tacos burger sanatos",                     week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Vineri",        meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Pulpe de pui la cuptor cu mazare in sos de rosii", week:"S12", weekLabel:"S12", route:"/s12",    day:"Vineri",        meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Clatite Japoneze Healthy Super Fluffy",    week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Sambata",       meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Pastrav crocant cu sos de usturoi si legume mexicane", week:"S12", weekLabel:"S12", route:"/s12", day:"Sambata",       meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Pizza diavola pe lipie",                   week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Sambata",       meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Paste carbonara",                          week:"S12",     weekLabel:"S12",     route:"/s12",     day:"Duminica",      meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Steak vita cu salata de rucola si parmezan", week:"S12",   weekLabel:"S12",     route:"/s12",     day:"Duminica",      meal:"Masa 3",  dayIdx:null, mealIdx:null },

  // ── W14 (ruta /w15) · 05–11 Mai 2026 ────────────────────────────────────────
  { name:"Oua scrambled cu paine sourdough si rosii cherry", week:"W14", weekLabel:"W14", route:"/w15",    day:"Luni–Marti",    meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Quesadilla cu pui si cascaval topit",      week:"W14",     weekLabel:"W14",     route:"/w15",     day:"Luni–Marti",    meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Chicken Tikka Masala cu orez basmati",     week:"W14",     weekLabel:"W14",     route:"/w15",     day:"Luni–Marti",    meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Avocado toast cu oua fierte moi pe sourdough", week:"W14", weekLabel:"W14",    route:"/w15",     day:"Mier–Joi",      meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Rulouri de vita in frunze de salata cu sos yogurt-tahini", week:"W14", weekLabel:"W14", route:"/w15", day:"Mier–Joi", meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"Pui cu ciuperci si mamaliguta",            week:"W14",     weekLabel:"W14",     route:"/w15",     day:"Mier–Joi",      meal:"Masa 3",  dayIdx:null, mealIdx:null },
  { name:"Snickers Overnight Oats (Budinca Ovaz)",   week:"W14",     weekLabel:"W14",     route:"/w15",     day:"Vineri",        meal:"Masa 1",  dayIdx:null, mealIdx:null },
  { name:"Dovlecei umpluti cu carne de porc si sos de rosii", week:"W14", weekLabel:"W14", route:"/w15",   day:"Vineri",        meal:"Masa 2",  dayIdx:null, mealIdx:null },
  { name:"File de pastrav la cuptor cu piure de morcovi si spanac ofilit", week:"W14", weekLabel:"W14", route:"/w15", day:"Vineri", meal:"Masa 3", dayIdx:null, mealIdx:null },
  { name:"Muschiulet de porc cu crusta de paprika si piure de cartofi dulci", week:"W14", weekLabel:"W14", route:"/w15", day:"Weekend", meal:"Masa 3", dayIdx:null, mealIdx:null },

  // ── W15 (ruta /w15b) · 11–17 Mai 2026 ───────────────────────────────────────
  { name:"Mango Sticky Rice Overnight Oats",                      week:"W15", weekLabel:"W15", route:"/w15b", day:"Luni",     meal:"Masa 1",  dayIdx:0, mealIdx:0 },
  { name:"Pui grill + cartofi dulci + yogurt dip usturoi-lamaie-marar", week:"W15", weekLabel:"W15", route:"/w15b", day:"Luni", meal:"Masa 2", dayIdx:0, mealIdx:1 },
  { name:"Cod la cuptor + sos yogurt usturoi-lamaie-marar + broccoli + morcov", week:"W15", weekLabel:"W15", route:"/w15b", day:"Luni", meal:"Masa 3", dayIdx:0, mealIdx:2 },
  { name:"Iaurt grecesc + fructe de padure + Clearly Whey",       week:"W15", weekLabel:"W15", route:"/w15b", day:"Luni",     meal:"Gustare", dayIdx:0, mealIdx:3 },
  { name:"Snickers Budinca de Ovaz High Protein",                  week:"W15", weekLabel:"W15", route:"/w15b", day:"Marti",    meal:"Masa 1",  dayIdx:1, mealIdx:0 },
  { name:"Tocanita cartofi + porc (Hamlappen)",                    week:"W15", weekLabel:"W15", route:"/w15b", day:"Marti",    meal:"Masa 3",  dayIdx:1, mealIdx:2 },
  { name:"Omleta spanac + ceapa verde + sourdough toast",          week:"W15", weekLabel:"W15", route:"/w15b", day:"Miercuri", meal:"Masa 1",  dayIdx:2, mealIdx:0 },
  { name:"Salata rucola + halloumi + naut crocant + ceapa verde",  week:"W15", weekLabel:"W15", route:"/w15b", day:"Miercuri", meal:"Masa 2",  dayIdx:2, mealIdx:1 },
  { name:"Creveti sos coconut curry + legume cambodgiene + orez basmati", week:"W15", weekLabel:"W15", route:"/w15b", day:"Miercuri", meal:"Masa 3", dayIdx:2, mealIdx:2 },
  { name:"Omleta spanac + ceapa verde + rosii cherry",             week:"W15", weekLabel:"W15", route:"/w15b", day:"Joi",      meal:"Masa 1",  dayIdx:3, mealIdx:0 },
  { name:"Paste pui + ciuperci + sos light",                       week:"W15", weekLabel:"W15", route:"/w15b", day:"Vineri",   meal:"Masa 2",  dayIdx:4, mealIdx:1 },
  { name:"Somon teriyaki + orez basmati + broccoli",               week:"W15", weekLabel:"W15", route:"/w15b", day:"Vineri",   meal:"Masa 3",  dayIdx:4, mealIdx:2 },
  { name:"Mic dejun flexibil (oua preferate) — Weekend",           week:"W15", weekLabel:"W15", route:"/w15b", day:"Weekend",  meal:"Masa 1",  dayIdx:5, mealIdx:0 },
  { name:"Masa la restaurant",                                      week:"W15", weekLabel:"W15", route:"/w15b", day:"Weekend",  meal:"Masa 2",  dayIdx:5, mealIdx:1 },
];

export default MEAL_INDEX;
