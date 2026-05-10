import React from "react";

/* =====================================================================
   ResumeAI Templates — 10 visually distinct layouts
   Layouts: classic-top, sidebar-left, sidebar-right, centered-serif,
            split-block, banner-card, minimalist-line, two-tone-header,
            timeline, executive
   ===================================================================== */

const TEMPLATE_LAYOUT = {
  "modern":             { layout: "sidebar-left",     header: "compact",  font: "sans" },
  "minimal":            { layout: "minimalist-line",  header: "centered", font: "sans" },
  "corporate":          { layout: "two-tone-header",  header: "banner",   font: "serif" },
  "software-engineer":  { layout: "split-block",      header: "compact",  font: "mono" },
  "data-scientist":     { layout: "sidebar-right",    header: "compact",  font: "sans" },
  "fresher":            { layout: "centered-serif",   header: "centered", font: "serif" },
  "internship":         { layout: "banner-card",      header: "banner",   font: "sans" },
  "elegant":            { layout: "executive",        header: "centered", font: "serif" },
  "creative":           { layout: "timeline",         header: "compact",  font: "sans" },
  "product-manager":    { layout: "two-tone-header",  header: "banner",   font: "sans" },
  "ui-ux-designer":     { layout: "banner-card",      header: "compact",  font: "sans" },
  "full-stack-developer": { layout: "split-block",    header: "compact",  font: "mono" },
  "ai-ml-engineer":     { layout: "sidebar-right",    header: "compact",  font: "mono" },
};

const FONT_FAMILY = {
  sans: "'Outfit', sans-serif",
  serif: "'Cormorant Garamond', serif",
  mono: "'JetBrains Mono', monospace",
};

const SectionTitle = ({ title, accent, variant = "underline" }) => {
  if (variant === "pill") return <div className="text-[10px] uppercase tracking-[0.2em] mb-1 inline-block px-2 py-0.5 rounded-sm" style={{ background: accent, color: "#fff" }}>{title}</div>;
  if (variant === "left-bar") return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1 h-4" style={{ background: accent }}></div>
      <div className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: accent }}>{title}</div>
    </div>
  );
  if (variant === "dot") return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }}></div>
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold">{title}</div>
    </div>
  );
  if (variant === "serif") return <div className="font-heading text-base mb-1" style={{ color: accent }}>{title}</div>;
  // default underline
  return (
    <>
      <div className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-1" style={{ color: accent }}>{title}</div>
      <div className="h-px mb-2" style={{ background: accent, opacity: 0.3 }}></div>
    </>
  );
};

const Bullet = ({ children }) => <div className="text-[11px] leading-snug">• {children}</div>;

const renderExperience = (data, accent, titleVariant) => {
  const { experience = [], projects = [] } = data;
  const hasExp = experience.length > 0;
  const hasProjects = projects.length > 0;
  const expTitle = hasExp ? "Experience" : (hasProjects ? "Academic Projects & Practical Learning" : null);
  if (!expTitle) return null;
  return (
    <div className="mb-3">
      <SectionTitle title={expTitle} accent={accent} variant={titleVariant} />
      {hasExp ? experience.map((e, i) => (
        <div key={i} className="mb-2">
          <div className="flex justify-between text-[12px]"><b>{e.role}</b><span className="text-gray-600">{e.start} – {e.end}</span></div>
          <div className="text-[11px] text-gray-700 italic">{e.company} {e.location && `· ${e.location}`}</div>
          <div className="text-[11px] mt-1 whitespace-pre-line">{e.description}</div>
        </div>
      )) : projects.slice(0, 3).map((p, i) => (
        <div key={i} className="mb-2 text-[12px]">
          <b>{p.name}</b> {p.link && <span className="text-[11px] text-gray-600">· {p.link}</span>}
          <div className="text-[11px] whitespace-pre-line">{p.description}</div>
        </div>
      ))}
    </div>
  );
};

const renderEducation = (data, accent, tv) => !data.education?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Education" accent={accent} variant={tv}/>
    {data.education.map((e,i) => (
      <div key={i} className="mb-1.5 text-[12px]">
        <div className="flex justify-between"><b>{e.degree}</b><span className="text-gray-600">{e.year}</span></div>
        <div className="text-[11px] text-gray-700">{e.school} {e.gpa && `· GPA ${e.gpa}`}</div>
      </div>
    ))}
  </div>
);
const renderSkills = (data, accent, tv, style="chip") => !data.skills?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Skills" accent={accent} variant={tv}/>
    {style === "chip" ? (
      <div className="flex flex-wrap gap-1.5">{data.skills.map((s,i) => <span key={i} className="text-[10px] border px-2 py-0.5 rounded-sm" style={{ borderColor: accent + "55" }}>{s}</span>)}</div>
    ) : style === "list" ? (
      <ul className="text-[11px] grid grid-cols-2 gap-x-2">{data.skills.map((s,i) => <li key={i}>• {s}</li>)}</ul>
    ) : (
      <div className="text-[11px]">{data.skills.join(" · ")}</div>
    )}
  </div>
);
const renderProjects = (data, accent, tv) => !data.projects?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Projects" accent={accent} variant={tv}/>
    {data.projects.map((p,i) => (
      <div key={i} className="mb-1.5 text-[12px]">
        <b>{p.name}</b> {p.link && <span className="text-[11px] text-gray-600">· {p.link}</span>}
        <div className="text-[11px] whitespace-pre-line">{p.description}</div>
      </div>
    ))}
  </div>
);
const renderCerts = (data, accent, tv) => !data.certifications?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Certifications" accent={accent} variant={tv}/>
    {data.certifications.map((c,i) => <div key={i} className="text-[11px]"><b>{c.name}</b> · <span className="text-gray-600">{c.issuer}, {c.year}</span></div>)}
  </div>
);
const renderLanguages = (data, accent, tv) => !data.languages?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Languages" accent={accent} variant={tv}/>
    <div className="text-[11px] flex flex-wrap gap-2">{data.languages.map((l,i) => <span key={i}>{l.name} <span className="text-gray-600">({l.level})</span></span>)}</div>
  </div>
);
const renderAch = (data, accent, tv) => !data.achievements?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Achievements" accent={accent} variant={tv}/>
    <ul className="text-[11px] list-disc pl-4">{data.achievements.map((a,i) => <li key={i}>{a}</li>)}</ul>
  </div>
);
const renderInterests = (data, accent, tv) => !data.interests?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="Interests" accent={accent} variant={tv}/>
    <div className="text-[11px]">{data.interests.join(" · ")}</div>
  </div>
);
const renderRefs = (data, accent, tv) => !data.references?.length ? null : (
  <div className="mb-3">
    <SectionTitle title="References" accent={accent} variant={tv}/>
    {data.references.map((r,i) => <div key={i} className="text-[11px]"><b>{r.name}</b> · {r.role}, {r.contact}</div>)}
  </div>
);
const renderSummary = (data, accent, tv) => !data.summary ? null : (
  <div className="mb-3">
    <SectionTitle title="Summary" accent={accent} variant={tv}/>
    <p className="text-[12px] leading-relaxed">{data.summary}</p>
  </div>
);

const Header = ({ p, accent, variant }) => {
  if (variant === "centered") return (
    <div className="text-center mb-5">
      {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" style={{ border: `2px solid ${accent}` }}/>}
      <div className="font-heading text-3xl tracking-tight">{p.name || "Your Name"}</div>
      <div className="text-[12px] text-gray-700 mt-0.5">{p.title}</div>
      <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">
        {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" · ")}
      </div>
    </div>
  );
  if (variant === "banner") return (
    <div className="-mx-[18mm] -mt-[18mm] mb-5 px-[18mm] py-5" style={{ background: accent, color: "#fff" }}>
      <div className="flex items-center gap-4">
        {p.photo && <img src={p.photo} alt="" className="w-16 h-16 rounded-sm object-cover border-2 border-white"/>}
        <div className="flex-1">
          <div className="font-heading text-3xl leading-tight">{p.name || "Your Name"}</div>
          <div className="text-[12px] opacity-90">{p.title}</div>
          <div className="text-[10px] opacity-80 mt-1">{[p.email, p.phone, p.location].filter(Boolean).join(" · ")}</div>
        </div>
      </div>
    </div>
  );
  // compact
  return (
    <div className="flex items-center gap-4 mb-5 pb-3" style={{ borderBottom: `2px solid ${accent}` }}>
      {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-sm object-cover"/>}
      <div className="flex-1">
        <div className="font-heading text-3xl leading-tight">{p.name || "Your Name"}</div>
        <div className="text-[12px] text-gray-700">{p.title}</div>
        <div className="text-[11px] text-gray-600 mt-1">
          {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" · ")}
        </div>
      </div>
    </div>
  );
};

export default function ResumePreview({ resume, scale = 1, forwardRef }) {
  const data = resume?.data || {};
  const personal = data.personal || {};
  const accent = resume?.customization?.accent || "#D46B4E";
  const fontSize = resume?.customization?.fontSize || 14;
  const userFont = resume?.customization?.font;
  const template = resume?.template || "modern";
  const cfg = TEMPLATE_LAYOUT[template] || TEMPLATE_LAYOUT["modern"];
  const fontFamily = userFont ? `'${userFont}', sans-serif` : FONT_FAMILY[cfg.font];

  const Body = () => {
    switch (cfg.layout) {
      case "sidebar-left":
        return (
          <div className="grid grid-cols-3 gap-5 mt-2">
            <aside className="col-span-1 pr-3 border-r" style={{ borderColor: accent + "33" }}>
              {renderEducation(data, accent, "left-bar")}
              {renderSkills(data, accent, "left-bar", "list")}
              {renderCerts(data, accent, "left-bar")}
              {renderLanguages(data, accent, "left-bar")}
              {renderInterests(data, accent, "left-bar")}
            </aside>
            <main className="col-span-2">
              {renderSummary(data, accent, "underline")}
              {renderExperience(data, accent, "underline")}
              {renderProjects(data, accent, "underline")}
              {renderAch(data, accent, "underline")}
            </main>
          </div>
        );
      case "sidebar-right":
        return (
          <div className="grid grid-cols-3 gap-5 mt-2">
            <main className="col-span-2 pr-3">
              {renderSummary(data, accent, "underline")}
              {renderExperience(data, accent, "underline")}
              {renderProjects(data, accent, "underline")}
              {renderAch(data, accent, "underline")}
            </main>
            <aside className="col-span-1 pl-3 border-l" style={{ borderColor: accent + "33" }}>
              {renderSkills(data, accent, "left-bar", "list")}
              {renderEducation(data, accent, "left-bar")}
              {renderCerts(data, accent, "left-bar")}
              {renderLanguages(data, accent, "left-bar")}
              {renderInterests(data, accent, "left-bar")}
            </aside>
          </div>
        );
      case "split-block":
        return (
          <div>
            {renderSummary(data, accent, "pill")}
            <div className="grid grid-cols-2 gap-4">
              <div>{renderExperience(data, accent, "pill")}{renderProjects(data, accent, "pill")}</div>
              <div>{renderEducation(data, accent, "pill")}{renderSkills(data, accent, "pill", "chip")}{renderCerts(data, accent, "pill")}{renderAch(data, accent, "pill")}{renderLanguages(data, accent, "pill")}</div>
            </div>
          </div>
        );
      case "centered-serif":
        return (
          <div>
            {renderSummary(data, accent, "serif")}
            {renderExperience(data, accent, "serif")}
            {renderEducation(data, accent, "serif")}
            {renderSkills(data, accent, "serif", "inline")}
            {renderProjects(data, accent, "serif")}
            {renderCerts(data, accent, "serif")}
            {renderAch(data, accent, "serif")}
            {renderLanguages(data, accent, "serif")}
            {renderInterests(data, accent, "serif")}
          </div>
        );
      case "banner-card":
        return (
          <div className="space-y-3">
            {data.summary && <div className="border-l-4 pl-3 py-1 italic text-[12px] leading-relaxed" style={{ borderColor: accent }}>{data.summary}</div>}
            {renderExperience(data, accent, "dot")}
            <div className="grid grid-cols-2 gap-4">
              <div>{renderEducation(data, accent, "dot")}{renderCerts(data, accent, "dot")}</div>
              <div>{renderSkills(data, accent, "dot", "chip")}{renderLanguages(data, accent, "dot")}</div>
            </div>
            {renderProjects(data, accent, "dot")}
            {renderAch(data, accent, "dot")}
          </div>
        );
      case "minimalist-line":
        return (
          <div>
            {renderSummary(data, accent, "underline")}
            {renderExperience(data, accent, "underline")}
            {renderEducation(data, accent, "underline")}
            {renderSkills(data, accent, "underline", "inline")}
            {renderProjects(data, accent, "underline")}
            {renderCerts(data, accent, "underline")}
            {renderAch(data, accent, "underline")}
          </div>
        );
      case "two-tone-header":
        return (
          <div>
            {renderSummary(data, accent, "left-bar")}
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">{renderExperience(data, accent, "left-bar")}{renderProjects(data, accent, "left-bar")}{renderAch(data, accent, "left-bar")}</div>
              <div>{renderEducation(data, accent, "left-bar")}{renderSkills(data, accent, "left-bar", "list")}{renderCerts(data, accent, "left-bar")}{renderLanguages(data, accent, "left-bar")}</div>
            </div>
          </div>
        );
      case "timeline":
        return (
          <div>
            {renderSummary(data, accent, "dot")}
            <div className="relative pl-5 border-l-2" style={{ borderColor: accent + "55" }}>
              {(data.experience || []).length > 0 && data.experience.map((e, i) => (
                <div key={i} className="mb-3 relative">
                  <div className="absolute -left-[26px] w-3 h-3 rounded-full" style={{ background: accent }}></div>
                  <div className="text-[11px] text-gray-600">{e.start} – {e.end}</div>
                  <div className="text-[12px]"><b>{e.role}</b> · <span className="italic">{e.company}</span></div>
                  <div className="text-[11px] whitespace-pre-line">{e.description}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>{renderEducation(data, accent, "dot")}{renderProjects(data, accent, "dot")}</div>
              <div>{renderSkills(data, accent, "dot", "chip")}{renderCerts(data, accent, "dot")}{renderAch(data, accent, "dot")}</div>
            </div>
          </div>
        );
      case "executive":
        return (
          <div>
            {data.summary && <p className="text-center italic text-[12px] leading-relaxed mb-4 max-w-2xl mx-auto">"{data.summary}"</p>}
            <div className="h-px my-3" style={{ background: accent }}></div>
            {renderExperience(data, accent, "serif")}
            <div className="grid grid-cols-2 gap-5">
              <div>{renderEducation(data, accent, "serif")}{renderCerts(data, accent, "serif")}</div>
              <div>{renderSkills(data, accent, "serif", "inline")}{renderLanguages(data, accent, "serif")}{renderAch(data, accent, "serif")}</div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            {renderSummary(data, accent, "underline")}
            {renderExperience(data, accent, "underline")}
            {renderEducation(data, accent, "underline")}
            {renderSkills(data, accent, "underline")}
          </div>
        );
    }
  };

  return (
    <div ref={forwardRef} className="resume-paper print-area" style={{ fontSize, fontFamily, transform: `scale(${scale})`, transformOrigin: "top center" }}>
      <Header p={personal} accent={accent} variant={cfg.header}/>
      <Body/>
    </div>
  );
}
