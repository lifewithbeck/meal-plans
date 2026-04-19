import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing.jsx";
import S9S10 from "./S9S10.jsx";
import S11S12 from "./S11S12.jsx";
import S12 from "./S12.jsx";

// ─── PIN ──────────────────────────────────────────────────────────────────────
const CORRECT_PIN = "1793";
const GREEN = "#2d6a4f";

function PinScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleKey(digit) {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === CORRECT_PIN) {
        onUnlock();
      } else {
        setTimeout(() => { setPin(""); setError(true); }, 400);
      }
    }
  }

  function handleDelete() {
    setPin(p => p.slice(0, -1));
    setError(false);
  }

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"#f8fdf8", fontFamily:"Arial, sans-serif",
    }}>
      <div style={{textAlign:"center", marginBottom:32}}>
        <div style={{fontSize:32, marginBottom:8}}>💪</div>
        <div style={{fontSize:22, fontWeight:"bold", color:GREEN}}>34FIT Meal Plan</div>
        <div style={{fontSize:13, color:"#888", marginTop:4}}>Nicoleta &amp; Andrei</div>
      </div>

      <div style={{
        background:"white", borderRadius:20, padding:"32px 28px",
        boxShadow:"0 4px 24px rgba(0,0,0,0.08)", width:280,
      }}>
        <div style={{textAlign:"center", marginBottom:20, fontSize:13, color:"#555"}}>
          Introdu PIN-ul
        </div>

        {/* PIN dots */}
        <div style={{display:"flex", justifyContent:"center", gap:16, marginBottom:28}}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width:16, height:16, borderRadius:"50%",
              background: i < pin.length ? (error ? "#e53935" : GREEN) : "#e0e0e0",
              transition:"background 0.2s",
            }} />
          ))}
        </div>

        {error && (
          <div style={{textAlign:"center", color:"#e53935", fontSize:12, marginBottom:16, marginTop:-12}}>
            PIN incorect. Încearcă din nou.
          </div>
        )}

        {/* Keypad */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10}}>
          {["1","2","3","4","5","6","7","8","9","",  "0","⌫"].map((k, i) => (
            k === "" ? (
              <div key={i} />
            ) : (
              <button
                key={i}
                onClick={() => k === "⌫" ? handleDelete() : handleKey(k)}
                style={{
                  padding:"14px 0", borderRadius:12, border:"1.5px solid #e0e0e0",
                  background: k === "⌫" ? "#fff3f3" : "#fff",
                  color: k === "⌫" ? "#e53935" : "#333",
                  fontSize:18, fontWeight:"bold", cursor:"pointer",
                  transition:"background 0.15s",
                }}
              >
                {k}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) return <PinScreen onUnlock={() => setUnlocked(true)} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Landing />} />
        <Route path="/s9-s10"  element={<S9S10 />}  />
        <Route path="/s11-s12" element={<S11S12 />} />
        <Route path="/s12"     element={<S12 />}    />
      </Routes>
    </BrowserRouter>
  );
}
