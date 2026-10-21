/* =====================================================================
   TM Fouzy Education Centre — website content
   ---------------------------------------------------------------------
   Edit this file to update the website. Every text has a Malay (ms) and
   English (en) version.
     CONFIG   – links and the registration form receiver
     CLASSES  – recurring classes at mosques (shown in the timetable)
     COURSES  – structured courses people can register for
     MARHALAH – the 14 stages of the syllabus
   ===================================================================== */

const CONFIG = {
  // Web app link of the Google Sheet that receives registrations (see SETUP-REGISTRATION.md)
  registrationEndpoint: "https://script.google.com/macros/s/AKfycbxGIQJy7Eyu-nVyWQqo4AgjbHWSf9yOqcfc5ybvKeWkUKQpnKl2uplGqzN-9gw2NTd74Q/exec",
  // PayNow details for paid courses. With proxy filled in, the form makes a QR code for each
  // person with the amount and their reference number already filled in.
  //   proxyType: "uen" (business account) or "mobile" (personal account)
  //   proxy:     the UEN, e.g. "T12AB3456C", or the mobile number, e.g. "91234567"
  paynow: { proxyType: "mobile", proxy: "84559430", name: "TM Fouzy Education Centre", qrImage: "" },
  // Social links. Buttons with an empty link are hidden.
  whatsappCommunity: "",
  instagram: "",
  facebook: "",
  youtube: "",
  email: ""
};

const SUBJECTS = {
  adab:     { color: "var(--c-adab)",     ms: "Adab",     en: "Adab" },
  tauhid:   { color: "var(--c-tauhid)",   ms: "Tauhid",   en: "Tauhid" },
  fiqh:     { color: "var(--c-fiqh)",     ms: "Fiqh",     en: "Fiqh" },
  tasawwuf: { color: "var(--c-tasawwuf)", ms: "Tasawwuf", en: "Tasawwuf" }
};

/* Timetable rows */
const SLOTS = {
  maghrib: { ms: "Selepas Maghrib", en: "After Maghrib" },
  isyak:   { ms: "Selepas Isyak",   en: "After Isyak" }
};

/* day: 0 = Sunday … 6 = Saturday.  slot: a key of SLOTS.
   frequency: "weekly" or "monthly" (nth = which week of the month) */
const CLASSES = [
  {
    subject: "fiqh", day: 1, slot: "maghrib", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Fiqh", en: "Fiqh Lecture" },
    kitab: { ms: "Kitab al-Risalah al-Jami'ah — al-Habib Ahmad Zain al-Habsyi", en: "Al-Risalah al-Jami'ah — al-Habib Ahmad Zain al-Habsyi" },
    venue: "Masjid Malabar", address: "471 Victoria St, Singapore 198370"
  },
  {
    subject: "tasawwuf", day: 6, slot: "maghrib", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Tasawwuf", en: "Tasawwuf Lecture" },
    kitab: { ms: "Kitab Bidayah al-Hidayah — Imam al-Ghazali", en: "Bidayah al-Hidayah — Imam al-Ghazali" },
    venue: "Masjid Hajjah Fatimah", address: "4001 Beach Rd, Singapore 199584"
  },
  {
    subject: "tauhid", day: 5, slot: "isyak", frequency: "monthly", nth: 3,
    title: { ms: "Kuliah Bulanan Ilmu Tauhid", en: "Monthly Tauhid Lecture" },
    kitab: { ms: "Kitab Qawa'id al-'Aqa'id — Imam al-Ghazali", en: "Qawa'id al-'Aqa'id — Imam al-Ghazali" },
    venue: "Masjid Al-Abdul Razak", address: ""
  }
];

/* Status is worked out from the dates: before the first date = open,
   during = ongoing, after the last date = done.
   Set status: "open" to take registrations for a course whose dates are not fixed yet.
   fee: adds a PayNow step to the form.  start / end ("15:00"): lets students add the
   sessions to their calendar and get a reminder email the day before each one.
   id must be unique — it is saved with each registration. */
const COURSES = [
  {
    id: "tanwir-nubuwwat-2026-11", marhalah: 5, subject: "tauhid", status: "open",
    title: { ms: "Kursus Tanwirul Qulub Bahagian 2: Kenabian (Nubuwwat)", en: "Tanwir al-Qulub Part 2: Prophethood (Nubuwwat)" },
    desc: { ms: "Kesinambungan pengajian Tanwirul Qulub karangan Syeikh Muhammad Amin al-Kurdi bagi peserta yang telah menamatkan Bab Ketuhanan.",
            en: "The continuation of Tanwir al-Qulub by Syeikh Muhammad Amin al-Kurdi, for students who have completed the chapter on Divinity." },
    // TODO: when the dates are fixed, add dates: ["2026-11-.."], start: "15:00", end: "17:30" to switch on calendar + reminder emails
    time: { ms: "November 2026 · tarikh, masa & tempat akan dimaklumkan", en: "November 2026 · dates, time & venue to be confirmed" },
    venue: "", address: "",
    fee: 80, feeNote: { ms: "4 sesi", en: "4 sessions" },
    arabic: "تنوير القلوب"
  },
  {
    id: "adab-penuntut-ilmu", marhalah: 1, subject: "adab", status: "soon",
    title: { ms: "Kursus Khas Permulaan: Adab Penuntut Ilmu", en: "Foundation Course: Etiquette of the Seeker of Knowledge" },
    desc: { ms: "Titik permulaan perjalanan menuntut ilmu — petikan daripada Ihya' Ulumuddin, Majmu' Imam Nawawi, Tazkiratus Sami' dan Ta'lim al-Muta'allim. Sesuai untuk peserta baharu.",
            en: "Where the journey begins — selected from Ihya' Ulum al-Din, al-Majmu' of Imam Nawawi, Tadhkirat al-Sami' and Ta'lim al-Muta'allim. Ideal for new students." },
    time: { ms: "Tarikh & yuran akan diumumkan", en: "Dates & fee to be announced" },
    venue: "", address: "",
    arabic: "آداب طالب العلم"
  },
  {
    id: "asas-tauhid-2026-10", marhalah: 2, subject: "tauhid",
    title: { ms: "Kursus Lanjutan Tingkatan 1: Asas-asas Ilmu Tauhid", en: "Advanced Course Level 1: Foundations of Tauhid" },
    desc: { ms: "Pembelajaran al-Mabadi' al-'Asyarah (10 Dasar Ilmu Tauhid) berpandukan kitab terbitan khas TMFEC yang merujuk Ummul Barahin, Jauharah al-Tauhid, Faridatul Faraaid dan Sifat 20.",
            en: "Learn al-Mabadi' al-'Asyarah (the 10 Principles of Tauhid) using TMFEC's own course book, drawing on Umm al-Barahin, Jawharat al-Tawhid, Faridat al-Fara'id and the 20 Attributes." },
    dates: ["2026-10-03", "2026-10-10", "2026-10-17"],
    time: { ms: "Sabtu, 3:00 – 5:30 ptg", en: "Saturdays, 3:00 – 5:30 pm" }, start: "15:00", end: "17:30",
    venue: "Masjid Abdul Aleem Siddique", address: "90 Lorong K Telok Kurau, Singapore 425723",
    fee: 80, feeNote: { ms: "3 sesi, buku & kertas kerja", en: "3 sessions, book & worksheets" },
    image: "assets/poster-tauhid.jpg"
  },
  {
    id: "tanwir-ilahiyyat-k1k2", marhalah: 4, subject: "tauhid",
    title: { ms: "Kursus Tanwirul Qulub — Ketuhanan (Kohort 1 & 2)", en: "Tanwir al-Qulub — Divinity (Cohorts 1 & 2)" },
    desc: { ms: "11 sesi pengajian Bab Ketuhanan (Ilahiyyat), diakhiri dengan Majlis Khataman.",
            en: "11 sessions on the chapter of Divinity (Ilahiyyat), concluded with a Khataman ceremony." },
    dates: ["2026-09-19"],
    time: { ms: "Majlis Khataman: 19 Sep 2026 / 7 Rabiul Akhir 1448H", en: "Khataman: 19 Sep 2026 / 7 Rabi' al-Akhir 1448H" },
    venue: "Masjid Abdul Aleem Siddique", address: "",
    image: "assets/community.jpg"
  },
  {
    id: "seminar-imam-syafie", subject: "fiqh", guest: true,
    title: { ms: "Seminar: Imam Syafie — Perjuangan, Pemikiran & Warisannya", en: "Seminar: Imam al-Shafi'i — His Struggle, Thought & Legacy" },
    desc: { ms: "Anjuran Masjid Al Taqua bersama Ustaz Hassanuddin Razali.", en: "Organised by Masjid Al Taqua with Ustaz Hassanuddin Razali." },
    dates: ["2026-10-17"],
    time: { ms: "Sabtu, 9:00 pg – 1:00 ptg", en: "Saturday, 9:00 am – 1:00 pm" },
    venue: "Masjid Al Taqua", address: "11A Jalan Bilal, off Bedok Road",
    fee: 15,
    image: "assets/poster-syafie.jpg"
  }
];

const MARHALAH = [
  { s: "adab",     type: { ms: "Kursus Khas Permulaan", en: "Foundation Course" }, title: { ms: "Adab Penuntut Ilmu", en: "Etiquette of the Seeker of Knowledge" } },
  { s: "tauhid",   type: { ms: "Kursus Lanjutan", en: "Advanced Course" }, title: { ms: "Asas-asas Ilmu Tauhid", en: "Foundations of Tauhid" } },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Aqidatul Awam", en: "Aqidat al-Awam" }, author: "Imam Ahmad al-Marzuqi" },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Tanwirul Qulub — Ketuhanan (Ilahiyyat)", en: "Tanwir al-Qulub — Divinity (Ilahiyyat)" }, author: "Syeikh Muhammad Amin al-Kurdi" },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Tanwirul Qulub — Kenabian (Nubuwwat)", en: "Tanwir al-Qulub — Prophethood (Nubuwwat)" }, author: "Syeikh Muhammad Amin al-Kurdi" },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Tanwirul Qulub — Alam Ghaib (Sam'iyyat)", en: "Tanwir al-Qulub — The Unseen (Sam'iyyat)" }, author: "Syeikh Muhammad Amin al-Kurdi" },
  { s: "fiqh",     type: { ms: "Kursus Permulaan", en: "Introductory Course" }, title: { ms: "Asas-asas Ilmu Fiqh — al-Mabadi' al-'Asyarah", en: "Foundations of Fiqh — al-Mabadi' al-'Asyarah" } },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Taharah", en: "al-Mukhtasar al-Latif — Purification" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Solat", en: "al-Mukhtasar al-Latif — Prayer" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Zakat", en: "al-Mukhtasar al-Latif — Zakat" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Puasa", en: "al-Mukhtasar al-Latif — Fasting" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Haji", en: "al-Mukhtasar al-Latif — Hajj" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "tasawwuf", type: { ms: "Kursus Permulaan", en: "Introductory Course" }, title: { ms: "Asas-asas Ilmu Tasawwuf — al-Mabadi' al-'Asyarah", en: "Foundations of Tasawwuf — al-Mabadi' al-'Asyarah" } },
  { s: "tasawwuf", type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Bidayatul Hidayah", en: "Bidayat al-Hidayah" }, author: "Imam Abu Hamid al-Ghazali" }
];

const WHY = [
  { icon: "layers",   ms: ["Ilmu tersusun, guru yang sama", "Ilmu dipelajari secara tersusun, daripada asas kepada peringkat yang lebih mendalam dengan bimbingan guru yang sama."],
                      en: ["Structured learning, one teacher", "Knowledge is built step by step, from the basics to deeper levels, under the guidance of the same teacher."] },
  { icon: "book",     ms: ["Nota & visual yang mudah difahami", "Inti perbahasan daripada beberapa kitab utama dirumuskan menjadi buku, nota dan visual yang mudah difahami."],
                      en: ["Clear notes & visuals", "The core discussions of several major texts are distilled into course books, notes and easy-to-follow visuals."] },
  { icon: "calendar", ms: ["Sebulan Belajar, Sebulan Rehat", "Memberi ruang untuk menghadam, mengulang kaji dan mengamalkan ilmu sebelum meneruskan ke tahap berikutnya."],
                      en: ["One month study, one month rest", "Time to absorb, revise and practise what was learnt before moving on to the next level."] },
  { icon: "video",    ms: ["Rakaman video untuk ulang kaji", "Rakaman pengajian disediakan supaya penuntut boleh merujuk pada bila-bila masa dan mengulang bahagian yang terlepas."],
                      en: ["Video recordings to revise", "Every session is recorded so students can revisit lessons any time and catch up on anything missed."] },
  { icon: "award",    ms: ["Sijil Penyertaan", "Sijil Penyertaan akan diberikan setiap kali selesai sebuah marhalah, InsyaAllah."],
                      en: ["Certificate of Participation", "A certificate is awarded on completing each marhalah (stage), InsyaAllah."] }
];
