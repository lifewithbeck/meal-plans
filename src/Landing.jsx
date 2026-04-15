import { useNavigate } from "react-router-dom";

const GREEN = "#2d6a4f";

const WEEKS = [
  {
    route: "/s9-s10",
    label: "S9-S10",
    dates: "09–15 Martie 2026",
    emoji: "🥗",
    meals: ["Sandwich cald", "Pui Shanghai", "Salata Caesar", "Piadina pui", "Creveti cu vin"],
  },
  {
    route: "/s11-s12",
    label: "S11-S12",
    dates: "16–22 Martie 2026",
    emoji: "🍝",
    meals: ["Avocado toast & somon", "Lasagna healthy", "Tacos burger", "Paste carbonara", "Steak vita"],
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      background: "#f4faf6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "28px 16px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>💪</div>
        <div style={{ fontSize: 24, fontWeight: "bold", color: GREEN }}>34FIT Meal Plan</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Nicoleta &amp; Andrei</div>
      </div>

      {/* Week cards */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        width: "100%",
        maxWidth: 480,
      }}>
        <div style={{ fontSize: 12, fontWeight: "bold", color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
          Alege săptămâna
        </div>

        {WEEKS.map((w) => (
          <button
            key={w.route}
            onClick={() => navigate(w.route)}
            style={{
              background: "#fff",
              border: `2px solid ${GREEN}`,
              borderRadius: 16,
              padding: "20px 22px",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
              transition: "transform 0.12s, box-shadow 0.12s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,106,79,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(45,106,79,0.08)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <span style={{ fontSize: 22, marginRight: 10 }}>{w.emoji}</span>
                <span style={{ fontSize: 18, fontWeight: "bold", color: GREEN }}>{w.label}</span>
              </div>
              <div style={{
                background: GREEN,
                color: "#fff",
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: "bold",
              }}>
                Vezi planul →
              </div>
            </div>

            <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>📅 {w.dates}</div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {w.meals.map((m, i) => (
                <span key={i} style={{
                  background: "#f0f7f3",
                  color: GREEN,
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: "bold",
                }}>
                  {m}
                </span>
              ))}
              <span style={{
                background: "#f0f7f3",
                color: "#aaa",
                borderRadius: 20,
                padding: "3px 10px",
                fontSize: 11,
              }}>
                + mai multe...
              </span>
            </div>
          </button>
        ))}
      </div>

      <p style={{ marginTop: 40, fontSize: 10, color: "#ccc" }}>
        34FIT · Nicoleta &amp; Andrei · 2026
      </p>
    </div>
  );
}
