/* TM Fouzy Education Centre — shared page behaviour.
   Content lives in data.js, interface text in i18n.js. Each page only contains
   the placeholders it needs (e.g. #timetable, #courseGrid); this file fills them. */

const ICONS = {
  layers:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="m2 13 10 5 10-5"/><path d="m2 18 10 5 10-5" opacity=".5"/></svg>',
  book:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13v4H6a2 2 0 0 1-2-2Z"/><path d="M9 7h6M9 11h4"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  video:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/></svg>',
  award:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/></svg>',
  clock:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  user:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  arrow:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/></svg>',
  youtube:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.8 31 31 0 0 0-.4-4.8ZM9.8 15V9l5.7 3-5.7 3Z"/></svg>',
  mail:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></svg>'
};

const PAGES = [
  ["index.html", "nav.home", "home"],
  ["about.html", "nav.about", "about"],
  ["syllabus.html", "nav.syllabus", "syllabus"],
  ["classes.html", "nav.classes", "classes"],
  ["courses.html", "nav.courses", "courses"]
];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first

let lang = "ms";
let courseTab = "active";
const page = document.body.dataset.page;

const $ = (s, el = document) => el.querySelector(s);
const t = key => I18N[lang][key];
const L = obj => (obj && typeof obj === "object") ? (obj[lang] ?? obj.ms) : (obj || "");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mapsUrl = (venue, address) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([venue, address || "Singapore"].join(", "));

/* "today" in Singapore, as a local Date at midnight */
function sgToday() {
  return parseDate(new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
}
function parseDate(iso) { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); }
function fmtDate(d, opts = { day: "numeric", month: "short", year: "numeric" }) {
  return new Intl.DateTimeFormat(lang === "ms" ? "ms-MY" : "en-SG", opts).format(d);
}

/* next date a class happens, on or after `from` */
function nextOccurrence(c, from) {
  for (let i = 0; i < 70; i++) {
    const d = new Date(from); d.setDate(d.getDate() + i);
    if (d.getDay() !== c.day) continue;
    if (c.frequency === "monthly" && Math.ceil(d.getDate() / 7) !== c.nth) continue;
    return d;
  }
  return null;
}

function courseStatus(c, today) {
  if (c.status) return c.status;
  const ds = (c.dates || []).map(parseDate);
  if (!ds.length) return "soon";
  if (today < ds[0]) return "open";
  if (today <= ds[ds.length - 1]) return "ongoing";
  return "done";
}
// Only paid courses take registrations; free ones are walk-in
const canRegister = c => c._status === "open" && c.fee > 0;
const isFree = c => !(c.fee > 0);

/* ---------- shared header & footer ---------- */

function renderChrome() {
  const header = $("#siteHeader");
  if (header) header.innerHTML = `
    <div class="wrap header-inner">
      <a href="index.html" class="brand" aria-label="TM Fouzy Education Centre">
        <img src="assets/logo.jpg" alt="Logo TM Fouzy Education Centre" class="brand-logo">
        <span class="brand-text"><span class="brand-name">TM Fouzy</span><span class="brand-sub">Education Centre</span></span>
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Main">
        ${PAGES.map(([href, key, id]) => `<a href="${href}" class="${id === page ? "current" : ""}" ${id === page ? 'aria-current="page"' : ""}>${t(key)}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <div class="lang-toggle" role="group" aria-label="Language">
          <button type="button" data-lang="ms" class="${lang === "ms" ? "active" : ""}">BM</button>
          <button type="button" data-lang="en" class="${lang === "en" ? "active" : ""}">EN</button>
        </div>
        <a href="courses.html" class="btn btn-gold btn-sm hide-sm">${t("nav.register")}</a>
        <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>`;

  const footer = $("#siteFooter");
  if (footer) footer.innerHTML = `
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <img src="assets/logo.jpg" alt="" class="brand-logo">
        <div><p class="brand-name">TM Fouzy Education Centre</p><p class="muted">${t("footer.tag")}</p></div>
      </div>
      <nav class="footer-nav">${PAGES.map(([href, key]) => `<a href="${href}">${t(key)}</a>`).join("")}</nav>
      <p class="muted small">© ${new Date().getFullYear()} TMFEC. ${t("footer.rights")}</p>
    </div>`;
}

function applyStatic() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = t(el.dataset.i18n);
    if (typeof v === "string") el.textContent = v;
  });
}

/* ---------- classes ---------- */

function renderNextBar() {
  const bar = $("#nextBar");
  if (!bar) return;
  const today = sgToday();
  const next = CLASSES.map((c, i) => ({ c, i, d: nextOccurrence(c, today) })).filter(x => x.d).sort((a, b) => a.d - b.d)[0];
  if (!next) { bar.hidden = true; return; }
  bar.hidden = false;
  bar.innerHTML = `
    <span class="label">${t("nextClass")}</span>
    <span class="what">${fmtDate(next.d, { weekday: "long", day: "numeric", month: "long" })} · ${esc(L(SLOTS[next.c.slot]))}</span>
    <span class="where">${esc(L(next.c.title))} — ${esc(next.c.venue)}</span>
    <a href="classes.html#class-${next.i}">${t("seeAll")}</a>`;
}

function renderTimetable() {
  const box = $("#timetable");
  if (!box) return;
  const today = sgToday();
  const todayDow = today.getDay();
  const linkFor = i => page === "classes" ? `#class-${i}` : `classes.html#class-${i}`;

  const cell = (c, i) => {
    const s = SUBJECTS[c.subject];
    const next = nextOccurrence(c, today);
    return `<a class="tt-class" href="${linkFor(i)}" style="--sc:${s.color}">
      <span class="tt-subj">${s[lang]}${c.frequency === "monthly" ? ` · ${t("monthly")}` : ""}</span>
      <span class="tt-title">${esc(L(c.title))}</span>
      <span class="tt-venue">${ICONS.pin}${esc(c.venue)}</span>
      ${c.frequency === "monthly" ? `<span class="tt-note">${esc(t("monthlyNth")(c.nth))}</span>` : ""}
      ${next ? `<span class="tt-next">${t("nextOn")}: ${fmtDate(next, { day: "numeric", month: "short" })}</span>` : ""}
    </a>`;
  };

  const slots = Object.keys(SLOTS).filter(k => CLASSES.some(c => c.slot === k));
  let grid = `<div class="tt-corner"></div>`;
  grid += WEEK_ORDER.map(d => `<div class="tt-day ${d === todayDow ? "today" : ""}">${t("days")[d]}${d === todayDow ? `<small>${t("today")}</small>` : ""}</div>`).join("");
  slots.forEach(slot => {
    grid += `<div class="tt-slot">${ICONS.clock}<span>${esc(L(SLOTS[slot]))}</span></div>`;
    grid += WEEK_ORDER.map(d => {
      const here = CLASSES.map((c, i) => [c, i]).filter(([c]) => c.day === d && c.slot === slot);
      return `<div class="tt-cell ${d === todayDow ? "today" : ""} ${here.length ? "" : "empty"}">${here.map(([c, i]) => cell(c, i)).join("")}</div>`;
    }).join("");
  });

  // phone layout: one row per day that has a class
  const mobile = WEEK_ORDER.filter(d => CLASSES.some(c => c.day === d)).map(d => `
    <div class="ttm-day ${d === todayDow ? "today" : ""}">
      <p class="ttm-name">${t("days")[d]}${d === todayDow ? `<small>${t("today")}</small>` : ""}</p>
      <div class="ttm-list">${CLASSES.map((c, i) => [c, i]).filter(([c]) => c.day === d)
        .map(([c, i]) => `<div class="ttm-item"><span class="ttm-time">${esc(L(SLOTS[c.slot]))}</span>${cell(c, i)}</div>`).join("")}</div>
    </div>`).join("");

  box.innerHTML = `<div class="tt" style="--rows:${slots.length}">${grid}</div><div class="tt-mobile">${mobile}</div>
    <div class="tt-legend">${Object.entries(SUBJECTS).filter(([k]) => CLASSES.some(c => c.subject === k))
      .map(([, s]) => `<span><i style="background:${s.color}"></i>${s[lang]}</span>`).join("")}</div>`;
}

function renderClassCards() {
  const box = $("#classList");
  if (!box) return;
  const today = sgToday();
  box.innerHTML = CLASSES.map((c, i) => ({ c, i, next: nextOccurrence(c, today) }))
    .sort((a, b) => a.next - b.next)
    .map(({ c, i, next }) => {
      const s = SUBJECTS[c.subject];
      const freq = c.frequency === "monthly" ? t("monthlyNth")(c.nth) : t("weekly");
      return `<article class="class-card" id="class-${i}">
        <div class="class-when">
          <p class="class-day">${t("days")[c.day]}</p>
          <p class="class-time">${esc(L(SLOTS[c.slot]))}</p>
          <p class="class-freq">${esc(freq)}</p>
        </div>
        <div class="class-body">
          <span class="tag" style="--sc:${s.color}">${s[lang]}</span>
          <h3>${esc(L(c.title))}</h3>
          <p class="kitab">${esc(L(c.kitab))}</p>
          <p class="class-meta">
            <span>${ICONS.pin}${esc(c.venue)}${c.address ? ", " + esc(c.address) : ""}</span>
            <span>${ICONS.user}${t("teacher")}</span>
            ${next ? `<span>${ICONS.calendar}${t("nextOn")}: ${fmtDate(next, { weekday: "short", day: "numeric", month: "short" })}</span>` : ""}
          </p>
        </div>
        <a class="btn btn-outline btn-sm" href="${mapsUrl(c.venue, c.address)}" target="_blank" rel="noopener">${t("directions")}</a>
      </article>`;
    }).join("");
}

/* ---------- courses ---------- */

function allCourses() {
  const today = sgToday();
  return COURSES.map(c => ({ ...c, _status: courseStatus(c, today) }));
}

function courseCard(c) {
  const s = SUBJECTS[c.subject];
  const st = c._status;
  const dates = (c.dates || []).map(d => fmtDate(parseDate(d), { day: "numeric", month: "short" }));
  const dateLine = dates.length ? dates.join(" · ") + " " + parseDate(c.dates.at(-1)).getFullYear() : "";

  const img = c.image
    ? `<img src="${c.image}" alt="" loading="lazy">`
    : `<div class="course-art" style="--sc:${s.color}"><span lang="ar">${c.arabic || ""}</span></div>`;

  // a free course that is running or open is a walk-in class
  const badge = isFree(c) && (st === "open" || st === "ongoing") ? "free" : st;
  let action;
  if (canRegister(c)) action = `<button type="button" class="btn btn-primary btn-sm" data-register="${c.id}">${t("register")}</button>`;
  else if (st === "done") action = `<span class="btn btn-ghost btn-sm">${t("completed")}</span>`;
  else if (badge === "free") action = `<span class="btn btn-ghost btn-sm">${t("walkIn")}</span>`;
  else action = `<span class="btn btn-ghost btn-sm">${t("stayTuned")}</span>`;

  const price = c.fee > 0
    ? `<span class="price">$${c.fee}${c.feeNote ? `<small>${esc(L(c.feeNote))}</small>` : ""}</span>`
    : `<span class="price">${badge === "free" ? t("freeLabel") : ""}</span>`;

  return `<article class="course ${st === "done" ? "done-card" : ""}">
    <div class="course-img">${img}<span class="status ${badge}">${t("status")[badge]}</span></div>
    <div class="course-body">
      <span class="tag" style="--sc:${s.color}">${c.guest ? t("guest") : (c.marhalah ? `${t("marhalah")} ${c.marhalah} · ` : "") + s[lang]}</span>
      <h3>${esc(L(c.title))}</h3>
      <p class="desc">${esc(L(c.desc))}</p>
      <ul class="facts">
        ${dateLine ? `<li>${ICONS.calendar}<span>${dateLine}</span></li>` : ""}
        <li>${ICONS.clock}<span>${esc(L(c.time))}</span></li>
        ${c.venue ? `<li>${ICONS.pin}<span>${esc(c.venue)}${c.address ? `<br><span class="muted small">${esc(c.address)}</span>` : ""}</span></li>` : ""}
        <li>${ICONS.user}<span>${t("teacher")}</span></li>
      </ul>
      <div class="course-foot">${price}${action}</div>
    </div>
  </article>`;
}

function renderCourses() {
  const grid = $("#courseGrid");
  if (!grid) return;
  const rank = ["open", "ongoing", "soon"];
  const all = allCourses();
  const active = all.filter(c => c._status !== "done").sort((a, b) => rank.indexOf(a._status) - rank.indexOf(b._status));
  const done = all.filter(c => c._status === "done").sort((a, b) => (b.dates?.at(-1) || "").localeCompare(a.dates?.at(-1) || ""));

  $("#courseTabs").innerHTML = [["active", t("tabActive"), active.length], ["done", t("tabDone"), done.length]]
    .map(([k, label, n]) => `<button type="button" role="tab" data-tab="${k}" class="${courseTab === k ? "active" : ""}">${label}<span class="count">${n}</span></button>`).join("");

  const list = courseTab === "active" ? active : done;
  grid.innerHTML = list.length ? list.map(courseCard).join("") : `<p class="empty">${t("noCourses")}</p>`;
}

function renderOpenCourses() {
  const grid = $("#openCourses");
  if (!grid) return;
  const open = allCourses().filter(canRegister).slice(0, 3);
  $("#openSection").hidden = !open.length;
  grid.innerHTML = open.map(courseCard).join("");
}

/* ---------- about & syllabus ---------- */

function renderMarhalah() {
  const list = $("#marhalahList");
  if (!list) return;
  list.innerHTML = MARHALAH.map((m, i) => {
    const s = SUBJECTS[m.s];
    return `<li data-subject="${m.s}" style="--sc:${s.color}">
      <span class="num">${i + 1}</span>
      <div>
        <span class="subj">${s[lang]}</span>
        <p class="m-title">${esc(L(m.title))}</p>
        <p class="m-type">${esc(L(m.type))}</p>
        ${m.author ? `<p class="m-author">${esc(m.author)}</p>` : ""}
      </div>
    </li>`;
  }).join("");
}

function renderWhy() {
  const box = $("#whyList");
  if (!box) return;
  box.innerHTML = WHY.map(w => {
    const [h, p] = w[lang];
    return `<div class="why-item"><div class="why-icon">${ICONS[w.icon]}</div><div><h3>${esc(h)}</h3><p>${esc(p)}</p></div></div>`;
  }).join("");
}

function renderSocial() {
  const box = $("#socialLinks");
  if (!box) return;
  const order = ["whatsappCommunity", "instagram", "facebook", "youtube", "email"];
  const iconFor = { whatsappCommunity: "whatsapp", instagram: "instagram", facebook: "facebook", youtube: "youtube", email: "mail" };
  const links = order.filter(k => CONFIG[k]);
  $("#contact .sub").textContent = links.length ? t("contact.sub") : t("contact.soon");
  box.innerHTML = links.length
    ? links.map(k => `<a href="${k === "email" ? "mailto:" + CONFIG[k] : CONFIG[k]}" target="_blank" rel="noopener" class="${k === "whatsappCommunity" ? "primary" : ""}">${ICONS[iconFor[k]]}${t("social")[k]}</a>`).join("")
    : `<a href="classes.html" class="primary">${ICONS.calendar}${t("hero.cta1")}</a>`;
}

/* ---------- registration form ---------- */

let regCourse = null;
let regRef = null;

function ensureDialog() {
  let dlg = $("#regDialog");
  if (!dlg) {
    dlg = document.createElement("dialog");
    dlg.id = "regDialog";
    dlg.className = "reg-dialog";
    document.body.appendChild(dlg);
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("change", e => {
      if (e.target.name === "course") { regCourse = e.target.value; renderPayBlock(); }
      if (e.target.name === "screenshot") $("#shotName").textContent = e.target.files[0]?.name || "";
    });
  }
  return dlg;
}

function renderDialog() {
  const dlg = ensureDialog();
  const f = t("form");
  const open = allCourses().filter(canRegister);
  dlg.innerHTML = `
    <form class="reg-form" id="regForm" novalidate>
      <div class="reg-head">
        <div><p class="eyebrow">${t("nav.register")}</p><h2>${f.title}</h2></div>
        <button type="button" class="reg-close" data-close aria-label="${f.close}">×</button>
      </div>
      <label class="field"><span>${f.course} *</span>
        <select name="course" required>${open.map(c => `<option value="${c.id}" ${c.id === regCourse ? "selected" : ""}>${esc(L(c.title))}</option>`).join("")}</select>
      </label>
      <label class="field"><span>${f.name} *</span><input name="name" required autocomplete="name" placeholder="${f.namePh}"></label>
      <div class="field-row">
        <label class="field"><span>${f.phone} *</span><input name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder="9123 4567"></label>
        <label class="field"><span>${f.email} *</span><input name="email" type="email" required autocomplete="email" placeholder="${f.emailPh}"></label>
      </div>
      <div class="field-row">
        <fieldset class="field"><legend>${f.gender} *</legend>
          <div class="pills"><label><input type="radio" name="gender" value="Lelaki" required><span>${f.male}</span></label>
          <label><input type="radio" name="gender" value="Perempuan"><span>${f.female}</span></label></div>
        </fieldset>
        <fieldset class="field"><legend>${f.prior} *</legend>
          <div class="pills"><label><input type="radio" name="prior" value="Ya" required><span>${f.yes}</span></label>
          <label><input type="radio" name="prior" value="Belum"><span>${f.no}</span></label></div>
        </fieldset>
      </div>
      <label class="field"><span>${f.notes}</span><textarea name="notes" rows="2" placeholder="${f.notesPh}"></textarea></label>
      <div id="payBlock"></div>
      <label class="consent"><input type="checkbox" name="consent" required><span>${f.consent}</span></label>
      <p class="form-error" id="regError" hidden></p>
      <button type="submit" class="btn btn-primary reg-submit">${f.submit}</button>
    </form>`;
  renderPayBlock();
}

/* ---- PayNow QR (SGQR / EMVCo format) with the amount and reference built in ---- */

function crc16(str) { // CRC-16/CCITT-FALSE, as required by SGQR
  let crc = 0xFFFF;
  for (const byte of new TextEncoder().encode(str)) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function paynowPayload({ proxyType, proxy, name }, amount, ref) {
  const tlv = (id, val) => id + String(val.length).padStart(2, "0") + val;
  const isMobile = proxyType === "mobile";
  const id = isMobile ? "+65" + String(proxy).replace(/\D/g, "").slice(-8) : String(proxy).trim().toUpperCase();
  const merchant = tlv("00", "SG.PAYNOW") + tlv("01", isMobile ? "0" : "2") + tlv("02", id) + tlv("03", "0"); // 03 = amount not editable
  const body = tlv("00", "01") + tlv("01", "12") + tlv("26", merchant) + tlv("52", "0000") + tlv("53", "702") +
    tlv("54", Number(amount).toFixed(2)) + tlv("58", "SG") + tlv("59", (name || "TMFEC").slice(0, 25)) +
    tlv("60", "Singapore") + tlv("62", tlv("01", ref.slice(0, 25))) + "6304";
  return body + crc16(body);
}

function paynowQrSvg(payload) {
  if (typeof qrcode !== "function") return "";
  const qr = qrcode(0, "M");
  qr.addData(payload);
  qr.make();
  return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
}

/* PayNow step, only for courses with a fee */
function renderPayBlock() {
  const box = $("#payBlock");
  if (!box) return;
  const f = t("form");
  const c = COURSES.find(x => x.id === regCourse);
  if (!c || !c.fee) { box.innerHTML = ""; return; }
  const p = CONFIG.paynow || {};
  const svg = p.proxy ? paynowQrSvg(paynowPayload(p, c.fee, regRef)) : "";
  const qr = svg
    ? `<div class="pay-qr-wrap"><div class="pay-qr">${svg}</div><p class="muted small">${f.payScan}</p></div>`
    : (p.qrImage ? `<img src="${p.qrImage}" alt="PayNow QR" class="pay-qr">` : "");
  box.innerHTML = `
    <div class="pay">
      <p class="pay-title">${f.payTitle}</p>
      <div class="pay-grid">
        ${qr}
        <dl class="pay-info">
          <dt>${f.payAmount}</dt><dd class="pay-amount">$${c.fee}</dd>
          ${p.proxy ? `<dt>${f.payTo}</dt><dd>${esc(p.proxy)}${p.name && p.proxyType === "uen" ? `<br><span class="muted small">${esc(p.name)}</span>` : ""}</dd>` : ""}
          <dt>${f.payRef}</dt><dd><strong class="pay-ref">${regRef}</strong></dd>
        </dl>
      </div>
      <label class="field"><span>${f.payerName} *</span>
        <input name="payerName" required autocomplete="off" placeholder="${f.payerNamePh}">
      </label>
      <label class="upload">
        <input type="file" name="screenshot" accept="image/*" required>
        <span class="upload-btn">${ICONS.check}${f.payUpload}</span>
        <span class="upload-name" id="shotName"></span>
      </label>
      <p class="muted small pay-note">${f.payRequired}</p>
    </div>`;
}

function openRegistration(courseId) {
  regCourse = courseId;
  regRef = makeRef();
  renderDialog();
  ensureDialog().showModal();
}

function makeRef() {
  const d = new Date();
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  return "TMF-" + ymd + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

/* shrink a photo to a small JPEG (base64, no prefix) before upload */
function compressImage(file, maxSide = 1400) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(img.src);
      resolve(cv.toDataURL("image/jpeg", 0.8).split(",")[1]);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/* .ics file with every session of a course, so students can add it to their calendar */
function icsFor(c) {
  if (!c.dates?.length || !c.start) return null;
  const stamp = (iso, hm) => {
    const [y, m, d] = iso.split("-").map(Number), [h, min] = hm.split(":").map(Number);
    return new Date(Date.UTC(y, m - 1, d, h - 8, min)).toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z"; // Singapore is UTC+8
  };
  const where = [c.venue, c.address].filter(Boolean).join(", ").replace(/,/g, "\\,");
  const events = c.dates.map((d, i) => [
    "BEGIN:VEVENT", `UID:${c.id}-${d}@tmfec`, `DTSTAMP:${stamp(d, c.start)}`,
    `DTSTART:${stamp(d, c.start)}`, `DTEND:${stamp(d, c.end || c.start)}`,
    `SUMMARY:${c.title.ms.replace(/,/g, "\\,")} (${i + 1}/${c.dates.length})`, `LOCATION:${where}`, "END:VEVENT"].join("\r\n"));
  const text = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TMFEC//Website//MS", ...events, "END:VCALENDAR"].join("\r\n");
  return URL.createObjectURL(new Blob([text], { type: "text/calendar" }));
}

/* ---- screenshot check: read the text in the image and look for signs of a real PayNow transfer ---- */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

// draw any image the browser can open (incl. iPhone HEIC photos in Safari) onto a canvas,
// so the text reader always gets a standard image
function fileToCanvas(file, maxSide = 2200) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
      const g = cv.getContext("2d");
      g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height);
      g.drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(img.src);
      resolve(cv);
    };
    img.onerror = () => reject(new Error("image could not be opened"));
    img.src = URL.createObjectURL(file);
  });
}

// Returns { ran, ok }. Fails closed: if the screenshot can't be read (ran = false),
// the registration is NOT sent and the person is asked to try again.
async function checkScreenshot(file, fee, ref) {
  try {
    if (!window.Tesseract) await loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js");
    const canvas = await fileToCanvas(file);
    const { data } = await Promise.race([
      Tesseract.recognize(canvas, "eng"),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 60000))
    ]);
    const text = data.text.toUpperCase().replace(/\s+/g, " ");
    const squashed = text.replace(/[^A-Z0-9]/g, "");
    const amt = Number(fee).toFixed(2).replace(".", "\\.");
    const amountOk = new RegExp(`(?:SGD|S\\$|\\$)\\s*${fee}(?:\\.00)?(?!\\d)|(?<![\\d.])${amt}(?!\\d)`).test(text);
    // the QR puts this person's own reference in the "bill reference number", which DBS prints on the receipt
    const refOk = squashed.includes(ref.replace(/[^A-Z0-9]/g, "")) || (squashed.includes("TMF") && squashed.includes(ref.slice(-4)));
    // reject old receipts: if a date is printed, it must be within the last 3 days
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const dates = [...text.matchAll(/(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*\.?,?\s+(\d{4})/g)]
      .map(m => new Date(Number(m[3]), months.indexOf(m[2]), Number(m[1])));
    const today = sgToday();
    const dateOk = !dates.length || dates.some(d => d <= today && (today - d) / 864e5 <= 3);
    return { ran: true, ok: amountOk && refOk && dateOk, amountOk, refOk, dateOk };
  } catch (e) {
    console.warn("TMFEC: screenshot could not be checked", e);
    return { ran: false, ok: false };
  }
}

function showRegFail(form, fee, couldNotRead) {
  const f = t("form");
  form.hidden = true;
  const panel = document.createElement("div");
  panel.className = "reg-done reg-fail";
  panel.innerHTML = `
    <div class="reg-tick fail">×</div>
    <h2>${f.failTitle}</h2>
    <p>${esc(couldNotRead ? f.failUnread : f.failBody(fee))}</p>
    <ul class="fail-tips">${f.failTips.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="reg-done-actions">
      <button type="button" class="btn btn-primary" data-retry>${f.retry}</button>
      <button type="button" class="btn btn-outline" data-close>${f.close}</button>
    </div>`;
  form.after(panel);
}

function retryRegistration() {
  const panel = $("#regDialog .reg-fail");
  const form = $("#regForm");
  if (!panel || !form) return;
  panel.remove();
  form.hidden = false;
  form.screenshot.value = "";
  $("#shotName").textContent = "";
  const btn = form.querySelector(".reg-submit");
  btn.disabled = false; btn.textContent = t("form").submit;
  form.querySelector("#payBlock")?.scrollIntoView({ block: "center" });
}

async function submitRegistration(form) {
  const f = t("form");
  const err = $("#regError");
  const data = Object.fromEntries(new FormData(form));
  const showError = msg => { err.textContent = msg; err.hidden = false; };
  err.hidden = true;

  if (!data.course || !data.name?.trim() || !data.phone?.trim() || !data.email?.trim() || !data.gender || !data.prior || !data.consent) return showError(f.required);
  if (data.phone.replace(/\D/g, "").length < 8) return showError(f.badPhone);
  if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) return showError(f.badEmail);
  if (COURSES.find(c => c.id === data.course)?.fee > 0) {
    if (!data.payerName?.trim()) return showError(f.noPayer);
    if (!form.screenshot?.files[0]) return showError(f.noProof);
  }
  if (!CONFIG.registrationEndpoint) { console.warn("TMFEC: CONFIG.registrationEndpoint is empty — see SETUP-REGISTRATION.md"); return showError(f.notReady); }

  const course = COURSES.find(c => c.id === data.course);
  const btn = form.querySelector(".reg-submit");
  btn.disabled = true;
  try {
    const file = form.screenshot?.files[0];
    let check = { ran: false, ok: true };
    if (course.fee > 0) {
      btn.textContent = f.checking;
      check = await checkScreenshot(file, course.fee, regRef);
      if (!check.ok) return showRegFail(form, course.fee, !check.ran);
    }
    btn.textContent = f.sending;
    const autoNote = course.fee > 0 ? "[Semakan auto tangkapan skrin: lulus]" : "";
    const payload = {
      ref: regRef, courseId: course.id, courseTitle: course.title.ms,
      dates: course.dates || [], time: L(course.time), venue: course.venue || "", fee: course.fee || 0,
      name: data.name.trim(), phone: data.phone.trim(), email: data.email.trim(),
      gender: data.gender, prior: data.prior, notes: [(data.notes || "").trim(), autoNote].filter(Boolean).join(" "), lang,
      payerName: (data.payerName || "").trim(),
      screenshot: file ? await compressImage(file) : ""
    };
    const res = await fetch(CONFIG.registrationEndpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    const out = await res.json();
    if (!out.ok) throw new Error(out.error || "failed");

    const ics = out.duplicate ? null : icsFor(course);
    form.innerHTML = `<div class="reg-done">
      <div class="reg-tick pending">${out.duplicate ? ICONS.check : ICONS.clock}</div>
      <h2>${out.duplicate ? f.dupTitle : f.okTitle}</h2>
      <p>${esc(out.duplicate ? f.dupBody(out.ref) : f.okBody(out.ref))}</p>
      ${out.duplicate ? "" : `<p class="muted small">${esc(f.okEmail(payload.email))}</p>`}
      ${out.duplicate ? "" : `<p class="pay-reminder">${esc(f.okVerify)}</p>`}
      <div class="reg-done-actions">
        ${ics ? `<a class="btn btn-gold" href="${ics}" download="${course.id}.ics">${ICONS.calendar}${f.addCal}</a>` : ""}
        <button type="button" class="btn btn-outline" data-close>${f.close}</button>
      </div></div>`;
  } catch (e) {
    console.error(e);
    btn.disabled = false; btn.textContent = f.submit;
    showError(f.fail);
  }
}

/* ---------- boot ---------- */

function renderAll() {
  renderChrome();
  applyStatic();
  renderNextBar();
  renderTimetable();
  renderClassCards();
  renderOpenCourses();
  renderCourses();
  renderMarhalah();
  renderWhy();
  renderSocial();
}

document.addEventListener("click", e => {
  const langBtn = e.target.closest(".lang-toggle button");
  if (langBtn) {
    lang = langBtn.dataset.lang;
    try { localStorage.setItem("tmfec-lang", lang); } catch (_) {}
    renderAll();
    const dlg = $("#regDialog");
    if (dlg?.open) { const sel = dlg.querySelector("select"); regCourse = sel ? sel.value : regCourse; renderDialog(); }
    return;
  }
  const reg = e.target.closest("[data-register]");
  if (reg) { openRegistration(reg.dataset.register); return; }
  if (e.target.closest("[data-close]")) { $("#regDialog")?.close(); return; }
  if (e.target.closest("[data-retry]")) { retryRegistration(); return; }

  const tabBtn = e.target.closest("#courseTabs button");
  if (tabBtn) { courseTab = tabBtn.dataset.tab; renderCourses(); return; }

  const menuBtn = e.target.closest("#menuBtn");
  const nav = $("#mainNav");
  if (menuBtn) { menuBtn.setAttribute("aria-expanded", nav.classList.toggle("open")); return; }
  if (e.target.closest("#mainNav a")) nav.classList.remove("open");
});

document.addEventListener("submit", e => {
  if (e.target.id === "regForm") { e.preventDefault(); submitRegistration(e.target); }
});

try {
  const saved = localStorage.getItem("tmfec-lang");
  if (saved === "ms" || saved === "en") lang = saved;
} catch (_) {}
renderAll();

// courses.html?daftar=<course id> opens the form straight away
const wanted = new URLSearchParams(location.search).get("daftar");
if (wanted && allCourses().some(c => c.id === wanted && canRegister(c))) openRegistration(wanted);
// re-apply hash scroll after content is rendered
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
