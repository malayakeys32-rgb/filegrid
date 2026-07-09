import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#050810",
  bg2: "#080d1a",
  bg3: "#0c1428",
  panel: "#0a1020",
  border: "#1a2540",
  borderGlow: "#1e3a6e",
  cyan: "#00e5ff",
  magenta: "#e040fb",
  violet: "#7c4dff",
  red: "#ff1744",
  emerald: "#00e676",
  amber: "#ffab00",
  text: "#c8d8f0",
  textDim: "#4a6080",
  textMid: "#7a9ab8",
  white: "#e8f4ff",
};

const glow = (color: string, size = 8): string => `0 0 ${size}px ${color}44, 0 0 ${size * 2}px ${color}22`;
const glowStrong = (color: string): string => `0 0 12px ${color}88, 0 0 24px ${color}44, 0 0 48px ${color}22`;

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(${C.borderGlow}18 1px, transparent 1px),
        linear-gradient(90deg, ${C.borderGlow}18 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)"
    }} />
  );
}

function Particle({ style }) {
  return <div style={{
    position: "absolute", borderRadius: "50%", pointerEvents: "none",
    animation: "float 6s ease-in-out infinite",
    ...style
  }} />;
}

function Tag({ children, color = C.cyan }) {
  return (
    <span style={{
      fontSize: 10, fontFamily: "monospace", letterSpacing: 2,
      color, border: `1px solid ${color}44`, borderRadius: 2,
      padding: "2px 8px", textTransform: "uppercase",
      boxShadow: glow(color, 4),
    }}>{children}</span>
  );
}

function GlowBtn({ children, onClick, color = C.cyan, outline = false, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: outline ? "transparent" : hover
          ? `${color}22` : `${color}11`,
        border: `1px solid ${hover ? color : color + "66"}`,
        color: hover ? color : C.text,
        borderRadius: 4, padding: "8px 18px",
        fontFamily: "'Courier New', monospace", fontSize: 12,
        letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
        boxShadow: hover ? glowStrong(color) : "none",
        transition: "all 0.2s ease",
        ...style
      }}
    >{children}</button>
  );
}

function Card({ children, style = {}, glowColor = C.cyan }) {
  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`,
      borderRadius: 8, padding: "20px",
      boxShadow: `inset 0 1px 0 ${glowColor}11, 0 4px 24px #000a`,
      ...style
    }}>{children}</div>
  );
}

function Metric({ label, value, color = C.cyan, sub }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 32, fontWeight: 700, color, fontFamily: "monospace", textShadow: glow(color, 6) }}>{value}</div>
      <div style={{ fontSize: 11, color: C.textDim, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: C.textMid, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function SeverityBadge({ level }) {
  const map = { critical: C.red, high: C.amber, medium: C.magenta, low: C.cyan };
  const c = map[level] || C.textDim;
  return <Tag color={c}>{level}</Tag>;
}

function StatusDot({ active }) {
  const c = active ? C.emerald : C.textDim;
  return <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: active ? glow(c, 4) : "none", marginRight: 6 }} />;
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

const NAV = [
  { id: "landing", icon: "◈", label: "Platform", module: "marketing" },
  { id: "filegrid", icon: "⊞", label: "FileGrid", module: "filegrid" },
  { id: "sentinel", icon: "◉", label: "Sentinel", module: "sentinel" },
  { id: "client", icon: "◎", label: "Dashboard", module: "client" },
  { id: "admin", icon: "⬡", label: "Admin", module: "admin" },
  { id: "pricing", icon: "◈", label: "Pricing", module: "marketing" },
  { id: "login", icon: "△", label: "Login", module: "auth" },
];

function Sidebar({ active, setPage }) {
  return (
    <div style={{
      width: 64, background: C.bg2, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "16px 0", gap: 4, flexShrink: 0, zIndex: 10,
      position: "relative"
    }}>
      {/* Logo */}
      <div style={{
        width: 36, height: 36, background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
        borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 16, boxShadow: glowStrong(C.cyan),
        cursor: "pointer", flexShrink: 0
      }} onClick={() => setPage("landing")}>⊟</div>

      {NAV.map(n => {
        const isActive = active === n.id;
        return (
          <button key={n.id} onClick={() => setPage(n.id)}
            title={n.label}
            style={{
              width: 44, height: 44, background: isActive ? `${C.cyan}18` : "transparent",
              border: `1px solid ${isActive ? C.cyan + "66" : "transparent"}`,
              borderRadius: 6, color: isActive ? C.cyan : C.textDim,
              fontSize: 18, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              boxShadow: isActive ? glow(C.cyan) : "none",
              transition: "all 0.15s",
            }}>{n.icon}</button>
        );
      })}
    </div>
  );
}

// ─── PAGE: LANDING ────────────────────────────────────────────────────────────

function LandingPage({ setPage }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 50); return () => clearInterval(t); }, []);

  const FEATURES = [
    { icon: "⊞", title: "FileGrid", desc: "Parse any text structure into a clean, hierarchical folder tree. Auto-sort by type, tags, or custom rules.", color: C.cyan, page: "filegrid" },
    { icon: "◉", title: "Sentinel Black", desc: "Forensic-grade file monitoring. Detect anomalies, score threats, visualize incidents on a live timeline.", color: C.magenta, page: "sentinel" },
    { icon: "◎", title: "Client Dashboard", desc: "End-user control center. Activity feeds, organized structures, downloadable reports.", color: C.violet, page: "client" },
    { icon: "⬡", title: "Admin Console", desc: "System intelligence core. Manage integrations, automations, roles, and live metrics.", color: C.amber, page: "admin" },
  ];

  return (
    <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
      <GridBg />

      {/* Hero */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "60px 40px",
        position: "relative", textAlign: "center"
      }}>
        {/* Ambient orbs */}
        {[
          { top: "15%", left: "10%", w: 300, h: 300, c: C.cyan },
          { top: "60%", right: "8%", w: 250, h: 250, c: C.magenta },
          { top: "40%", left: "50%", w: 200, h: 200, c: C.violet },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.w, height: o.h,
            top: o.top, left: o.left, right: o.right,
            background: `radial-gradient(circle, ${o.c}18 0%, transparent 70%)`,
            borderRadius: "50%", pointerEvents: "none",
            transform: `translateY(${Math.sin((tick + i * 40) / 30) * 12}px)`,
            transition: "transform 0.1s",
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>
          <Tag color={C.cyan}>V2.0 — ECOSYSTEM ACTIVE</Tag>
          <h1 style={{
            margin: "24px 0 8px", fontSize: "clamp(42px, 6vw, 80px)",
            fontFamily: "'Courier New', monospace", fontWeight: 700,
            color: C.white, letterSpacing: -1, lineHeight: 1.1,
            textShadow: `0 0 40px ${C.cyan}44`,
          }}>
            FILE<span style={{ color: C.cyan }}>GRID</span>
          </h1>
          <h2 style={{
            margin: "0 0 12px", fontSize: "clamp(20px, 3vw, 32px)",
            fontFamily: "'Courier New', monospace", fontWeight: 400,
            color: C.magenta, letterSpacing: 6, textShadow: glow(C.magenta),
          }}>+ SENTINEL BLACK</h2>
          <p style={{ color: C.textMid, fontSize: 16, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Unified system for file organization, forensic intelligence, client dashboards, and admin control. Built for the edge.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <GlowBtn onClick={() => setPage("filegrid")} color={C.cyan}>Launch FileGrid</GlowBtn>
            <GlowBtn onClick={() => setPage("sentinel")} color={C.magenta}>Enter Sentinel</GlowBtn>
            <GlowBtn onClick={() => setPage("pricing")} color={C.violet} outline>View Pricing</GlowBtn>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "60px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color={C.violet}>MODULES</Tag>
          <h2 style={{ color: C.white, fontFamily: "monospace", fontSize: 32, margin: "16px 0 8px" }}>Six Modules. One Ecosystem.</h2>
          <p style={{ color: C.textDim, fontSize: 14 }}>Every piece purpose-built. All tightly integrated.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {FEATURES.map(f => (
            <Card key={f.title} glowColor={f.color} style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => setPage(f.page)}>
              <div style={{ fontSize: 28, color: f.color, marginBottom: 12, textShadow: glow(f.color, 6) }}>{f.icon}</div>
              <div style={{ fontFamily: "monospace", fontSize: 14, color: f.color, letterSpacing: 2, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{f.desc}</div>
              <div style={{ marginTop: 16 }}>
                <GlowBtn color={f.color} style={{ fontSize: 11, padding: "5px 12px" }}>Open →</GlowBtn>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ padding: "40px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bg2 }}>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 32, maxWidth: 900, margin: "0 auto" }}>
          <Metric label="Files Processed" value="2.4M" color={C.cyan} />
          <Metric label="Anomalies Blocked" value="18,204" color={C.red} />
          <Metric label="Active Rules" value="312" color={C.violet} />
          <Metric label="Uptime" value="99.98%" color={C.emerald} />
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: FILEGRID WORKSPACE ─────────────────────────────────────────────────

const SAMPLE_STRUCTURE = `Project Alpha/
  Documents/
    Contracts/
    Reports/
    Meeting Notes/
  Assets/
    Images/
    Videos/
    Fonts/
  Code/
    src/
    tests/
    docs/
  Archive/`;

function FileGridPage() {
  const [input, setInput] = useState(SAMPLE_STRUCTURE);
  const [tree, setTree] = useState(null);
  const [rules, setRules] = useState([
    { id: 1, name: "Images → Assets/Images", condition: "type:image", action: "move" },
    { id: 2, name: "Contracts → Documents/Contracts", condition: "tag:contract", action: "move" },
    { id: 3, name: "Flag large files", condition: "size:>100mb", action: "tag:large" },
  ]);
  const [tab, setTab] = useState("workspace");

  function parseTree(text) {
    const lines = text.trim().split("\n").filter(l => l.trim());
    const root = [];
    const stack = [{ children: root, indent: -1 }];
    lines.forEach(line => {
      const indent = line.search(/\S/);
      const name = line.trim().replace(/\/$/, "");
      const isFolder = line.trim().endsWith("/");
      const node = { name, isFolder, children: [], indent };
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent)
        stack.pop();
      stack[stack.length - 1].children.push(node);
      if (isFolder) stack.push({ ...node, indent });
    });
    return root;
  }

  function TreeNode({ node, depth = 0 }) {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <div onClick={() => node.isFolder && setOpen(o => !o)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "3px 0 3px", paddingLeft: depth * 16,
            cursor: node.isFolder ? "pointer" : "default",
            color: node.isFolder ? C.cyan : C.textMid,
            fontSize: 13, fontFamily: "monospace",
            borderRadius: 3, transition: "background 0.1s",
          }}>
          <span style={{ fontSize: 11, color: node.isFolder ? C.cyan : C.textDim }}>
            {node.isFolder ? (open ? "▼" : "▶") : "·"}
          </span>
          <span style={{ color: node.isFolder ? C.cyan : C.text }}>
            {node.isFolder ? "📁" : "📄"} {node.name}
          </span>
        </div>
        {node.isFolder && open && node.children.map((c, i) =>
          <TreeNode key={i} node={c} depth={depth + 1} />
        )}
      </div>
    );
  }

  const TABS = ["workspace", "rules", "uploads"];

  return (
    <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 28, color: C.cyan, textShadow: glow(C.cyan) }}>⊞</div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 22, color: C.white, letterSpacing: 2 }}>FILEGRID</div>
          <div style={{ fontSize: 12, color: C.textDim, letterSpacing: 1 }}>File Organization Workspace</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Tag color={C.emerald}>ACTIVE</Tag>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: "transparent", border: "none",
            borderBottom: `2px solid ${tab === t ? C.cyan : "transparent"}`,
            color: tab === t ? C.cyan : C.textDim, padding: "8px 16px",
            fontFamily: "monospace", fontSize: 12, letterSpacing: 2,
            textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {tab === "workspace" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Structure Input */}
          <Card glowColor={C.cyan}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.cyan, letterSpacing: 2, marginBottom: 12 }}>▸ STRUCTURE INPUT</div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              style={{
                width: "100%", height: 220, background: C.bg3,
                border: `1px solid ${C.borderGlow}`, borderRadius: 4,
                color: C.text, fontFamily: "monospace", fontSize: 12,
                padding: 12, resize: "vertical", outline: "none",
                lineHeight: 1.6, boxSizing: "border-box",
              }} />
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <GlowBtn onClick={() => setTree(parseTree(input))} color={C.cyan}>
                Generate Tree
              </GlowBtn>
              <GlowBtn onClick={() => setInput("")} color={C.textDim} outline style={{ fontSize: 11 }}>Clear</GlowBtn>
            </div>
          </Card>

          {/* Tree Preview */}
          <Card glowColor={C.violet}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.violet, letterSpacing: 2, marginBottom: 12 }}>▸ FOLDER TREE PREVIEW</div>
            {tree ? (
              <div style={{
                background: C.bg3, borderRadius: 4, padding: 12,
                minHeight: 220, maxHeight: 280, overflow: "auto",
                border: `1px solid ${C.border}`,
              }}>
                {tree.map((n, i) => <TreeNode key={i} node={n} />)}
              </div>
            ) : (
              <div style={{
                height: 220, display: "flex", alignItems: "center", justifyContent: "center",
                color: C.textDim, fontSize: 13, fontFamily: "monospace", letterSpacing: 1,
                border: `1px dashed ${C.border}`, borderRadius: 4,
              }}>click "Generate Tree" to preview →</div>
            )}
            {tree && (
              <div style={{ marginTop: 12 }}>
                <GlowBtn color={C.violet} style={{ fontSize: 11 }}>Export JSON</GlowBtn>
              </div>
            )}
          </Card>

          {/* Upload area */}
          <Card glowColor={C.emerald} style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.emerald, letterSpacing: 2, marginBottom: 12 }}>▸ FILE UPLOAD ZONE</div>
            <div style={{
              height: 100, border: `2px dashed ${C.emerald}44`, borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.textDim, fontSize: 13, fontFamily: "monospace",
              gap: 12, cursor: "pointer", transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 24 }}>⊕</span>
              <span>Drop files here or click to upload — rules will auto-sort on drop</span>
            </div>
          </Card>
        </div>
      )}

      {tab === "rules" && (
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.textMid }}>Auto-sorting rules</div>
            <GlowBtn color={C.cyan} style={{ fontSize: 11 }}>+ New Rule</GlowBtn>
          </div>
          {rules.map(r => (
            <Card key={r.id} style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan, boxShadow: glow(C.cyan) }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: C.text }}>{r.name}</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 4 }}>
                  if <Tag color={C.cyan}>{r.condition}</Tag> → <Tag color={C.violet}>{r.action}</Tag>
                </div>
              </div>
              <GlowBtn color={C.red} outline style={{ fontSize: 10, padding: "4px 10px" }}>Remove</GlowBtn>
            </Card>
          ))}
        </div>
      )}

      {tab === "uploads" && (
        <div style={{ color: C.textDim, fontFamily: "monospace", fontSize: 13, padding: 20, textAlign: "center" }}>
          No uploads yet. Use the workspace tab to drop files.
        </div>
      )}
    </div>
  );
}

// ─── PAGE: SENTINEL BLACK ─────────────────────────────────────────────────────

const INCIDENTS = [
  { id: "INC-001", type: "Bulk Export", severity: "critical", path: "/vault/contracts/", time: "02:14:33", status: "open" },
  { id: "INC-002", type: "Odd Access Time", severity: "high", path: "/users/jdoe/sensitive/", time: "03:47:10", status: "open" },
  { id: "INC-003", type: "Mass Delete", severity: "critical", path: "/archive/2024/", time: "09:22:01", status: "investigating" },
  { id: "INC-004", type: "Unknown IP Access", severity: "medium", path: "/shared/assets/", time: "11:05:44", status: "resolved" },
  { id: "INC-005", type: "Rename Storm", severity: "high", path: "/projects/alpha/", time: "13:30:19", status: "open" },
  { id: "INC-006", type: "Exfil Pattern", severity: "critical", path: "/vault/keys/", time: "15:01:55", status: "investigating" },
];

function SentinelPage() {
  const [selected, setSelected] = useState(null);
  const [sideTab, setSideTab] = useState("incidents");

  const inc = selected ? INCIDENTS.find(i => i.id === selected) : null;

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* Sentinel Sidebar */}
      <div style={{
        width: 200, background: C.bg2, borderRight: `1px solid ${C.border}`,
        padding: "20px 0", display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "0 16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.magenta, letterSpacing: 2 }}>◉ SENTINEL BLACK</div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 4 }}>Forensic Intelligence</div>
        </div>
        {[
          { id: "incidents", icon: "⚠", label: "Active Incidents" },
          { id: "patterns", icon: "◈", label: "Patterns" },
          { id: "timeline", icon: "≡", label: "Timeline" },
          { id: "reports", icon: "□", label: "Reports" },
          { id: "settings", icon: "⚙", label: "Settings" },
        ].map(item => (
          <button key={item.id} onClick={() => setSideTab(item.id)}
            style={{
              background: sideTab === item.id ? `${C.magenta}11` : "transparent",
              border: "none", borderLeft: `2px solid ${sideTab === item.id ? C.magenta : "transparent"}`,
              color: sideTab === item.id ? C.magenta : C.textDim,
              padding: "10px 16px", display: "flex", gap: 10, alignItems: "center",
              fontFamily: "monospace", fontSize: 12, cursor: "pointer", width: "100%",
              textAlign: "left", transition: "all 0.15s",
            }}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
        {/* Metrics row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Active Incidents", value: "6", color: C.red },
            { label: "Files Scanned", value: "482K", color: C.cyan },
            { label: "Anomalies Today", value: "23", color: C.amber },
            { label: "Quarantined", value: "4", color: C.magenta },
          ].map(m => (
            <Card key={m.label} glowColor={m.color}>
              <Metric {...m} />
            </Card>
          ))}
        </div>

        {/* Incident list + detail */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 20 }}>
          <Card glowColor={C.magenta}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.magenta, letterSpacing: 2, marginBottom: 16 }}>▸ INCIDENT TIMELINE</div>
            {INCIDENTS.map(inc => (
              <div key={inc.id} onClick={() => setSelected(inc.id === selected ? null : inc.id)}
                style={{
                  display: "flex", gap: 12, alignItems: "center",
                  padding: "10px 12px", borderRadius: 4, marginBottom: 6, cursor: "pointer",
                  background: selected === inc.id ? `${C.magenta}11` : `${C.bg3}`,
                  border: `1px solid ${selected === inc.id ? C.magenta + "44" : C.border}`,
                  transition: "all 0.15s",
                }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: inc.severity === "critical" ? C.red : inc.severity === "high" ? C.amber : C.magenta,
                  boxShadow: glow(inc.severity === "critical" ? C.red : C.amber, 4),
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: C.text }}>{inc.id} — {inc.type}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{inc.path}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <SeverityBadge level={inc.severity} />
                  <span style={{ fontSize: 10, color: C.textDim, fontFamily: "monospace" }}>{inc.time}</span>
                </div>
              </div>
            ))}
          </Card>

          {selected && inc && (
            <Card glowColor={C.red}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: C.red, letterSpacing: 2 }}>▸ INCIDENT DETAIL</div>
                <button onClick={() => setSelected(null)} style={{
                  background: "transparent", border: "none", color: C.textDim,
                  cursor: "pointer", fontSize: 16
                }}>✕</button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "monospace", fontSize: 20, color: C.white, marginBottom: 4 }}>{inc.id}</div>
                <SeverityBadge level={inc.severity} />
              </div>
              {[
                { label: "Type", value: inc.type },
                { label: "Affected Path", value: inc.path },
                { label: "Detected At", value: inc.time },
                { label: "Status", value: inc.status },
              ].map(r => (
                <div key={r.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                  fontFamily: "monospace", fontSize: 12,
                }}>
                  <span style={{ color: C.textDim }}>{r.label}</span>
                  <span style={{ color: C.text }}>{r.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <GlowBtn color={C.red} style={{ fontSize: 11 }}>Quarantine</GlowBtn>
                <GlowBtn color={C.amber} outline style={{ fontSize: 11 }}>Investigate</GlowBtn>
                <GlowBtn color={C.emerald} outline style={{ fontSize: 11 }}>Resolve</GlowBtn>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: CLIENT DASHBOARD ───────────────────────────────────────────────────

const ACTIVITY = [
  { icon: "⊕", label: "Uploaded quarterly-report-q2.pdf", time: "3m ago", color: C.emerald },
  { icon: "⊞", label: "Structure parsed: Project Beta", time: "22m ago", color: C.cyan },
  { icon: "▲", label: "Rule triggered: Contracts auto-moved", time: "1h ago", color: C.violet },
  { icon: "◎", label: "Report generated: June Summary", time: "2h ago", color: C.amber },
  { icon: "⊖", label: "Deleted temp file batch (14 files)", time: "5h ago", color: C.textDim },
];

function ClientPage() {
  const [tab, setTab] = useState("home");

  return (
    <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 28, color: C.violet, textShadow: glow(C.violet) }}>◎</div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 22, color: C.white, letterSpacing: 2 }}>CLIENT DASHBOARD</div>
          <div style={{ fontSize: 12, color: C.textDim }}>Welcome back, Nyla — <span style={{ color: C.emerald }}>All systems nominal</span></div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Files Total", value: "1,847", color: C.cyan },
          { label: "Uploads Today", value: "12", color: C.emerald },
          { label: "Active Rules", value: "8", color: C.violet },
          { label: "Reports", value: "24", color: C.amber },
        ].map(m => <Card key={m.label} glowColor={m.color}><Metric {...m} /></Card>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Activity */}
        <Card glowColor={C.violet}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.violet, letterSpacing: 2, marginBottom: 16 }}>▸ RECENT ACTIVITY</div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ color: a.color, fontSize: 16, lineHeight: 1 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: C.text }}>{a.label}</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Reports */}
        <Card glowColor={C.amber}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.amber, letterSpacing: 2, marginBottom: 16 }}>▸ RECENT REPORTS</div>
          {[
            { title: "June Activity Summary", type: "Monthly", date: "Jun 1" },
            { title: "Anomaly Report #18", type: "Security", date: "May 28" },
            { title: "Storage Usage Q2", type: "Analytics", date: "May 15" },
            { title: "Rule Execution Log", type: "System", date: "May 10" },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <div>
                <div style={{ fontSize: 13, color: C.text }}>{r.title}</div>
                <div style={{ marginTop: 4 }}><Tag color={C.amber}>{r.type}</Tag></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: C.textDim }}>{r.date}</div>
                <button style={{
                  background: "transparent", border: `1px solid ${C.amber}44`,
                  color: C.amber, fontSize: 10, padding: "3px 8px", borderRadius: 3,
                  cursor: "pointer", marginTop: 4, fontFamily: "monospace",
                }}>Download</button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE: ADMIN CONSOLE ──────────────────────────────────────────────────────

function AdminPage() {
  const [cpu] = useState(42);
  const [mem] = useState(67);
  const [storage] = useState(54);

  function MiniBar({ value, color }) {
    return (
      <div style={{ flex: 1, height: 6, background: C.bg3, borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${value}%`, borderRadius: 3,
          background: color, boxShadow: glow(color, 4),
          transition: "width 0.5s ease",
        }} />
      </div>
    );
  }

  const INTEGRATIONS = [
    { icon: "✉", name: "Email / Comms", status: true, type: "email", color: C.cyan },
    { icon: "◷", name: "Calendar", status: true, type: "calendar", color: C.violet },
    { icon: "⬡", name: "Cloud Storage", status: true, type: "storage", color: C.emerald },
    { icon: "⊡", name: "Webhook API", status: false, type: "webhook", color: C.amber },
  ];

  const ACTIONS = [
    { text: "Rule updated: Bulk Export Alert", time: "2m ago" },
    { text: "New user role assigned: analyst", time: "14m ago" },
    { text: "Integration: Storage sync triggered", time: "1h ago" },
    { text: "Automation: Contract tagger ran 84 files", time: "3h ago" },
  ];

  return (
    <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 28, color: C.amber, textShadow: glow(C.amber) }}>⬡</div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 22, color: C.white, letterSpacing: 2 }}>ADMIN CONSOLE</div>
          <div style={{ fontSize: 12, color: C.textDim }}>System Intelligence Core</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* System Metrics */}
        <Card glowColor={C.cyan}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.cyan, letterSpacing: 2, marginBottom: 16 }}>▸ SYSTEM METRICS</div>
          {[
            { label: "CPU", value: cpu, color: cpu > 80 ? C.red : C.cyan },
            { label: "Memory", value: mem, color: mem > 85 ? C.red : C.violet },
            { label: "Storage", value: storage, color: C.amber },
          ].map(m => (
            <div key={m.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: C.textDim }}>{m.label}</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: m.color }}>{m.value}%</span>
              </div>
              <MiniBar value={m.value} color={m.color} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
            <Metric label="Jobs" value="8" color={C.cyan} />
            <Metric label="Errors" value="0" color={C.emerald} />
            <Metric label="Queued" value="23" color={C.violet} />
          </div>
        </Card>

        {/* Integrations */}
        <Card glowColor={C.violet}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.violet, letterSpacing: 2, marginBottom: 16 }}>▸ INTEGRATIONS</div>
          {INTEGRATIONS.map(int => (
            <div key={int.name} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ color: int.color, fontSize: 18 }}>{int.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: C.text }}>{int.name}</div>
                <div style={{ fontSize: 11, color: C.textDim }}>{int.type}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <StatusDot active={int.status} />
                <span style={{ fontSize: 11, color: int.status ? C.emerald : C.textDim, fontFamily: "monospace" }}>
                  {int.status ? "Connected" : "Offline"}
                </span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <GlowBtn color={C.violet} style={{ fontSize: 11 }}>+ Add Integration</GlowBtn>
          </div>
        </Card>

        {/* Roles */}
        <Card glowColor={C.amber}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.amber, letterSpacing: 2, marginBottom: 16 }}>▸ ROLES & PERMISSIONS</div>
          {[
            { role: "admin", users: 2, perms: ["read", "write", "delete", "manage"] },
            { role: "analyst", users: 5, perms: ["read", "write", "report"] },
            { role: "client", users: 14, perms: ["read", "report"] },
          ].map(r => (
            <div key={r.role} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <Tag color={r.role === "admin" ? C.red : r.role === "analyst" ? C.amber : C.cyan}>{r.role}</Tag>
              <div style={{ flex: 1, fontSize: 11, color: C.textDim }}>
                {r.perms.join(" · ")}
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: C.textMid }}>{r.users} users</span>
            </div>
          ))}
        </Card>

        {/* Recent Admin Actions */}
        <Card glowColor={C.textDim}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.textMid, letterSpacing: 2, marginBottom: 16 }}>▸ RECENT ACTIONS</div>
          {ACTIONS.map((a, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0", borderBottom: `1px solid ${C.border}`,
              fontSize: 12,
            }}>
              <span style={{ color: C.text }}>{a.text}</span>
              <span style={{ color: C.textDim, fontFamily: "monospace", flexShrink: 0, marginLeft: 12 }}>{a.time}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE: PRICING ────────────────────────────────────────────────────────────

function PricingPage({ setPage }) {
  const PLANS = [
    {
      name: "Starter", price: "$29", period: "/mo", color: C.cyan,
      features: ["10GB Storage", "FileGrid Core", "Basic Sorting Rules", "Email Support", "1 User"],
    },
    {
      name: "Pro", price: "$79", period: "/mo", color: C.magenta, highlight: true,
      features: ["100GB Storage", "FileGrid + Sentinel Black", "Advanced Rule Engine", "Anomaly Detection", "Priority Support", "5 Users"],
    },
    {
      name: "Enterprise", price: "Custom", period: "", color: C.amber,
      features: ["Unlimited Storage", "Full Ecosystem Access", "Admin Console", "Dedicated Analyst", "SLA + Audit Logs", "Unlimited Users"],
    },
  ];

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "60px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Tag color={C.violet}>PRICING</Tag>
        <h1 style={{ fontFamily: "monospace", fontSize: 36, color: C.white, margin: "16px 0 8px" }}>Simple. Transparent.</h1>
        <p style={{ color: C.textDim, fontSize: 14 }}>No surprise fees. Scale when you're ready.</p>
      </div>

      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", maxWidth: 900, margin: "0 auto" }}>
        {PLANS.map(p => (
          <div key={p.name} style={{
            background: p.highlight ? `linear-gradient(145deg, ${C.bg2}, ${p.color}18)` : C.panel,
            border: `1px solid ${p.highlight ? p.color + "66" : C.border}`,
            borderRadius: 12, padding: "32px 28px", flex: "1 1 220px", maxWidth: 260,
            boxShadow: p.highlight ? glowStrong(p.color) : "none",
            position: "relative",
          }}>
            {p.highlight && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: p.color, color: "#000", fontSize: 10, fontFamily: "monospace",
                letterSpacing: 2, padding: "3px 12px", borderRadius: 20,
              }}>MOST POPULAR</div>
            )}
            <div style={{ fontFamily: "monospace", fontSize: 11, color: p.color, letterSpacing: 3, marginBottom: 12 }}>{p.name.toUpperCase()}</div>
            <div style={{ fontSize: 44, fontFamily: "monospace", color: p.color, textShadow: glow(p.color, 6) }}>{p.price}</div>
            {p.period && <div style={{ fontSize: 13, color: C.textDim, marginBottom: 24 }}>{p.period}</div>}
            <div style={{ marginBottom: 28 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, padding: "6px 0", fontSize: 13, color: C.textMid }}>
                  <span style={{ color: p.color }}>✓</span> {f}
                </div>
              ))}
            </div>
            <GlowBtn color={p.color} onClick={() => setPage("login")}
              style={{ width: "100%", boxSizing: "border-box" }}>
              Get Started
            </GlowBtn>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: AUTH ───────────────────────────────────────────────────────────────

function AuthPage({ setPage }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const inputStyle = {
    width: "100%", background: C.bg3, border: `1px solid ${C.borderGlow}`,
    borderRadius: 4, color: C.text, fontFamily: "monospace", fontSize: 13,
    padding: "10px 14px", outline: "none", boxSizing: "border-box",
    marginBottom: 12,
  };

  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <GridBg />
      <div style={{
        background: C.panel, border: `1px solid ${C.borderGlow}`,
        borderRadius: 12, padding: "40px 36px", width: 360,
        boxShadow: glowStrong(C.cyan), position: "relative", zIndex: 1,
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 32, color: C.cyan, textShadow: glow(C.cyan), marginBottom: 8 }}>⊟</div>
          <div style={{ fontFamily: "monospace", fontSize: 20, color: C.white, letterSpacing: 2 }}>
            {mode === "login" ? "SIGN IN" : mode === "signup" ? "CREATE ACCOUNT" : "RESET PASSWORD"}
          </div>
          <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>FileGrid Ecosystem</div>
        </div>

        <input placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        {mode !== "forgot" && (
          <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} style={inputStyle} />
        )}
        {mode === "signup" && (
          <input type="password" placeholder="Confirm password" style={inputStyle} />
        )}

        <GlowBtn color={C.cyan} onClick={() => setPage("client")}
          style={{ width: "100%", boxSizing: "border-box", padding: "12px", marginTop: 8 }}>
          {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
        </GlowBtn>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: C.textDim }}>
          {mode === "login" && (
            <>
              <span onClick={() => setMode("forgot")} style={{ color: C.cyan, cursor: "pointer" }}>Forgot password?</span>
              <span style={{ margin: "0 8px" }}>·</span>
              <span onClick={() => setMode("signup")} style={{ color: C.violet, cursor: "pointer" }}>Create account</span>
            </>
          )}
          {mode !== "login" && (
            <span onClick={() => setMode("login")} style={{ color: C.cyan, cursor: "pointer" }}>← Back to sign in</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────

const PAGE_META = {
  landing: { title: "Platform Overview", module: "FILEGRID ECOSYSTEM" },
  filegrid: { title: "FileGrid Workspace", module: "FILEGRID" },
  sentinel: { title: "Sentinel Dashboard", module: "SENTINEL BLACK" },
  client: { title: "Client Home", module: "CLIENT DASHBOARD" },
  admin: { title: "Admin Console", module: "ADMIN" },
  pricing: { title: "Pricing Plans", module: "MARKETING" },
  login: { title: "Authentication", module: "CORE PLATFORM" },
};

function Topbar({ page }) {
  const meta = PAGE_META[page] || {};
  return (
    <div style={{
      height: 48, background: C.bg2, borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", padding: "0 20px", gap: 16,
      flexShrink: 0, zIndex: 9,
    }}>
      <Tag color={C.textDim}>{meta.module}</Tag>
      <div style={{ width: 1, height: 16, background: C.border }} />
      <div style={{ fontFamily: "monospace", fontSize: 13, color: C.textMid }}>{meta.title}</div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
        <StatusDot active={true} />
        <span style={{ fontFamily: "monospace", fontSize: 11, color: C.emerald }}>LIVE</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#000", fontWeight: 700 }}>N</div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("landing");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; background: ${C.bg}; color: ${C.text}; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: ${C.bg2}; }
      ::-webkit-scrollbar-thumb { background: ${C.borderGlow}; border-radius: 2px; }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-16px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const PAGES = { landing: LandingPage, filegrid: FileGridPage, sentinel: SentinelPage, client: ClientPage, admin: AdminPage, pricing: PricingPage, login: AuthPage };
  const PageComponent = PAGES[page] || LandingPage;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, position: "relative" }}>
      <Sidebar active={page} setPage={setPage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar page={page} />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <PageComponent setPage={setPage} />
        </div>
      </div>
    </div>
  );
}
