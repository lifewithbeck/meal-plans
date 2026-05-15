import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MEAL_INDEX from "./mealIndex.js";

const GREEN = "#2d6a4f";

const MEAL_COLORS = {
  "Masa 1":  { bg:"#fff8e1", border:"#ffe082", dot:"#f59e0b", lbl:"#92700a" },
  "Masa 2":  { bg:"#e8f4fd", border:"#90caf9", dot:"#2196f3", lbl:"#1565c0" },
  "Masa 3":  { bg:"#f3e8fd", border:"#ce93d8", dot:"#9c27b0", lbl:"#6a1b9a" },
  "Gustare": { bg:"#e8f5e9", border:"#a5d6a7", dot:"#4caf50", lbl:"#2e7d32" },
};

const WEEK_EMOJI = {
  "S9-S10":  "🥗",
  "S11-S12": "🍝",
  "S12":     "🥩",
  "W14":     "🫙",
  "W15":     "🍣",
};

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = q.length < 2
    ? []
    : MEAL_INDEX.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.weekLabel.toLowerCase().includes(q) ||
        m.meal.toLowerCase().includes(q) ||
        m.day.toLowerCase().includes(q)
      );

  function handleClick(item) {
    if (item.dayIdx !== null && item.mealIdx !== null) {
      navigate(item.route, { state: { dayIdx: item.dayIdx, mealIdx: item.mealIdx } });
    } else {
      navigate(item.route);
    }
  }

  return (
    <div style={{
      fontFamily:"Arial, sans-serif",
      minHeight:"100vh",
      background:"#f4faf6",
      padding:"20px 16px",
      maxWidth:560,
      margin:"0 auto",
    }}>
      {/* Header */}
      <button onClick={() => navigate("/")} style={{
        display:"flex", alignItems:"center", gap:5,
        background:"none", border:"none", cursor:"pointer",
        color:GREEN, fontSize:12, fontWeight:"bold", marginBottom:16, padding:0,
      }}>
        ← Înapoi la planuri
      </button>

      <div style={{textAlign:"center", marginBottom:20}}>
        <div style={{fontSize:28, marginBottom:6}}>🔍</div>
        <div style={{fontSize:20, fontWeight:"bold", color:GREEN}}>Caută o rețetă</div>
        <div style={{fontSize:12, color:"#888", marginTop:4}}>Caută în toate săptămânile</div>
      </div>

      {/* Search input */}
      <div style={{position:"relative", marginBottom:20}}>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ex: somon, paste, omleta, curry..."
          style={{
            width:"100%",
            padding:"13px 16px 13px 44px",
            fontSize:15,
            border:`2px solid ${GREEN}`,
            borderRadius:14,
            outline:"none",
            background:"#fff",
            boxSizing:"border-box",
            color:"#333",
          }}
        />
        <span style={{
          position:"absolute", left:14, top:"50%", transform:"translateY(-50%)",
          fontSize:18, pointerEvents:"none",
        }}>🔍</span>
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer",
              fontSize:18, color:"#aaa", lineHeight:1,
            }}
          >✕</button>
        )}
      </div>

      {/* Results */}
      {q.length >= 2 && results.length === 0 && (
        <div style={{textAlign:"center", color:"#aaa", fontSize:13, marginTop:40}}>
          <div style={{fontSize:32, marginBottom:8}}>🤷</div>
          Nicio rețetă găsită pentru „{query}"
        </div>
      )}

      {q.length < 2 && q.length > 0 && (
        <div style={{textAlign:"center", color:"#bbb", fontSize:12, marginTop:20}}>
          Continuă să tastezi...
        </div>
      )}

      {q.length === 0 && (
        <div style={{textAlign:"center", color:"#ccc", fontSize:12, marginTop:20}}>
          Caută după nume de rețetă, săptămână sau tip de masă
        </div>
      )}

      {results.length > 0 && (
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <div style={{fontSize:11, color:"#aaa", fontWeight:"bold", textTransform:"uppercase", letterSpacing:1, marginBottom:2}}>
            {results.length} {results.length === 1 ? "rezultat" : "rezultate"}
          </div>
          {results.map((item, i) => {
            const mc = MEAL_COLORS[item.meal] || MEAL_COLORS["Masa 1"];
            const emoji = WEEK_EMOJI[item.weekLabel] || "🍽️";
            const hasDeepLink = item.dayIdx !== null;
            return (
              <button
                key={i}
                onClick={() => handleClick(item)}
                style={{
                  background:"#fff",
                  border:`1.5px solid ${mc.border}`,
                  borderRadius:12,
                  padding:"12px 14px",
                  cursor:"pointer",
                  textAlign:"left",
                  boxShadow:"0 1px 6px rgba(0,0,0,0.06)",
                  transition:"transform 0.1s, box-shadow 0.1s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(45,106,79,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)";
                }}
              >
                {/* Meal name */}
                <div style={{fontSize:13, fontWeight:"bold", color:"#222", marginBottom:6, lineHeight:1.4}}>
                  {item.name}
                </div>

                {/* Tags row */}
                <div style={{display:"flex", flexWrap:"wrap", gap:5, alignItems:"center"}}>
                  <span style={{
                    background: mc.bg, color: mc.lbl,
                    borderRadius:20, padding:"2px 9px", fontSize:10, fontWeight:"bold",
                  }}>
                    {item.meal}
                  </span>
                  <span style={{
                    background:"#f0f7f3", color:GREEN,
                    borderRadius:20, padding:"2px 9px", fontSize:10, fontWeight:"bold",
                  }}>
                    {emoji} {item.weekLabel}
                  </span>
                  <span style={{
                    background:"#f5f5f5", color:"#666",
                    borderRadius:20, padding:"2px 9px", fontSize:10,
                  }}>
                    📅 {item.day}
                  </span>
                  {hasDeepLink && (
                    <span style={{
                      background:"#e8f5e9", color:"#2e7d32",
                      borderRadius:20, padding:"2px 9px", fontSize:10,
                    }}>
                      ↗ direct la rețetă
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
